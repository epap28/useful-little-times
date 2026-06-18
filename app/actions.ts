"use server";

import { Feedback, PreferenceStatus } from "@prisma/client";
import { redirect } from "next/navigation";
import { categories } from "@/data/categories";
import {
  clearSession,
  createSession,
  hashPassword,
  normalizeEmail,
  requireUser,
  verifyPassword
} from "@/lib/auth";
import { prisma } from "@/lib/db";
import { createRecapForCurrentBatch } from "@/lib/recap";
import { createRecommendedInteraction } from "@/lib/recommendation-service";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function redirectWithAuthError(message: string): never {
  redirect(`/auth?error=${encodeURIComponent(message)}`);
}

export async function signUpAction(formData: FormData) {
  const name = getString(formData, "name");
  const email = normalizeEmail(getString(formData, "email"));
  const password = getString(formData, "password");

  if (!email || password.length < 8) {
    redirectWithAuthError("Use a valid email and a password of at least 8 characters.");
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    redirectWithAuthError("An account already exists for this email.");
  }

  const user = await prisma.user.create({
    data: {
      email,
      name: name || null,
      passwordHash: hashPassword(password)
    }
  });

  await createSession(user.id);
  redirect("/settings?welcome=true");
}

export async function signInAction(formData: FormData) {
  const email = normalizeEmail(getString(formData, "email"));
  const password = getString(formData, "password");
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !verifyPassword(password, user.passwordHash)) {
    redirectWithAuthError("Email or password is incorrect.");
  }

  await createSession(user.id);
  redirect("/dashboard");
}

export async function signOutAction() {
  await clearSession();
  redirect("/");
}

export async function savePreferencesAction(formData: FormData) {
  const user = await requireUser();
  const preferred = new Set(formData.getAll("preferred").map(String));
  const avoided = new Set(formData.getAll("avoided").map(String));
  const validSlugs = new Set(categories.map((category) => category.slug));

  await prisma.userPreference.deleteMany({
    where: { userId: user.id }
  });

  for (const slug of validSlugs) {
    const status = preferred.has(slug)
      ? PreferenceStatus.PREFERRED
      : avoided.has(slug)
        ? PreferenceStatus.AVOIDED
        : null;

    if (!status) {
      continue;
    }

    const category = await prisma.category.findUnique({ where: { slug } });
    if (category) {
      await prisma.userPreference.create({
        data: {
          userId: user.id,
          categoryId: category.id,
          status
        }
      });
    }
  }

  redirect("/dashboard");
}

export async function launchMomentAction() {
  const user = await requireUser();
  const interaction = await createRecommendedInteraction(user.id);
  redirect(`/dashboard?interaction=${interaction.id}`);
}

export async function recordFeedbackAction(formData: FormData) {
  const user = await requireUser();
  const interactionId = getString(formData, "interactionId");
  const feedback = getString(formData, "feedback") as Feedback;
  const quizAnswer = getString(formData, "quizAnswer");

  const interaction = await prisma.userItemInteraction.findFirst({
    where: {
      id: interactionId,
      userId: user.id
    },
    include: {
      learningItem: true
    }
  });

  if (!interaction) {
    redirect("/dashboard");
  }

  const correctAnswer = interaction.learningItem?.answer?.trim().toLowerCase();
  const normalizedAnswer = quizAnswer.trim().toLowerCase();
  const quizCorrect = correctAnswer && normalizedAnswer ? correctAnswer === normalizedAnswer : undefined;

  await prisma.userItemInteraction.update({
    where: { id: interaction.id },
    data: {
      feedback,
      quizAnswer: quizAnswer || undefined,
      quizCorrect
    }
  });

  redirect(`/dashboard?interaction=${interaction.id}`);
}

export async function showAnotherAction(formData: FormData) {
  const user = await requireUser();
  const interactionId = getString(formData, "interactionId");

  if (interactionId) {
    await prisma.userItemInteraction.updateMany({
      where: {
        id: interactionId,
        userId: user.id
      },
      data: {
        feedback: Feedback.SHOW_ANOTHER
      }
    });
  }

  const interaction = await createRecommendedInteraction(user.id);
  redirect(`/dashboard?interaction=${interaction.id}`);
}

export async function endSessionAction() {
  const user = await requireUser();
  const recap = await createRecapForCurrentBatch(user.id);
  redirect(`/recap/${recap.id}`);
}
