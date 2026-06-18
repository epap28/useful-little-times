/// <reference types="@cloudflare/workers-types" />

import { selectRecommendation } from "../../lib/recommendation";
import type { Feedback, PreferenceStatus } from "../../lib/domain";
import { createOpaqueToken, hashPassword, hashToken, verifyPassword } from "./security";

type UserRow = {
  id: string;
  email: string;
  name: string | null;
};

type CategoryRow = {
  id: string;
  slug: string;
  name: string;
};

type PreferenceRow = {
  category_id: string;
  slug: string;
  name: string;
  status: PreferenceStatus;
};

type LearningItemRow = {
  id: string;
  slug: string;
  title: string;
  category_id: string;
  category_slug: string;
  category_name: string;
  card_type: string;
  content: string;
  explanation: string;
  prompt: string | null;
  answer: string | null;
  answer_options: string | null;
  mnemonic: string | null;
  analogy: string | null;
  approved: number;
};

type SourceRow = {
  id: string;
  title: string;
  url: string;
  publisher: string | null;
};

type ActivityRow = {
  id: string;
  slug: string;
  title: string;
  home_version: string;
  office_version: string;
  remote_version: string | null;
  why: string;
  safety_note: string;
};

type InteractionRow = {
  id: string;
  user_id: string;
  kind: "LEARNING" | "ACTIVITY";
  learning_item_id: string | null;
  activity_item_id: string | null;
  shown_at: string;
  feedback: Feedback | null;
  quiz_answer: string | null;
  quiz_correct: number | null;
  batch_number: number;
};

type RecapRow = {
  id: string;
  batch_number: number;
  title: string;
  summary: string;
  questions: string;
  item_ids: string;
  activity_ids: string;
  created_at: string;
};

function json(data: unknown, status = 200, env?: Env) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders(env)
    }
  });
}

function corsHeaders(env?: Env) {
  return {
    "Access-Control-Allow-Origin": env?.ALLOWED_ORIGIN || "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400"
  };
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function requireString(value: unknown, label: string) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${label} is required.`);
  }
  return value.trim();
}

async function readJson(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return {};
  }
  return (await request.json()) as Record<string, unknown>;
}

function parseJsonArray(value: string | null) {
  if (!value) {
    return [];
  }
  const parsed = JSON.parse(value) as unknown;
  return Array.isArray(parsed) ? parsed.filter((entry): entry is string => typeof entry === "string") : [];
}

async function getCurrentUser(request: Request, env: Env) {
  const authorization = request.headers.get("authorization") || "";
  const token = authorization.startsWith("Bearer ") ? authorization.slice("Bearer ".length) : "";
  if (!token) {
    return null;
  }
  const tokenHash = await hashToken(token);
  const row = await env.DB.prepare(
    `SELECT users.id, users.email, users.name
     FROM sessions
     JOIN users ON users.id = sessions.user_id
     WHERE sessions.token_hash = ? AND sessions.expires_at > ?`
  )
    .bind(tokenHash, new Date().toISOString())
    .first<UserRow>();
  return row ?? null;
}

async function requireUser(request: Request, env: Env) {
  const user = await getCurrentUser(request, env);
  if (!user) {
    throw new Response(JSON.stringify({ error: "Authentication required." }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders(env)
      }
    });
  }
  return user;
}

async function userPayload(env: Env, user: UserRow) {
  const preferences = await env.DB.prepare(
    `SELECT categories.id AS category_id, categories.slug, categories.name, user_preferences.status
     FROM user_preferences
     JOIN categories ON categories.id = user_preferences.category_id
     WHERE user_preferences.user_id = ?
     ORDER BY categories.name`
  )
    .bind(user.id)
    .all<PreferenceRow>();

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    preferences: preferences.results.map((preference) => ({
      status: preference.status,
      category: {
        id: preference.category_id,
        slug: preference.slug,
        name: preference.name
      }
    }))
  };
}

async function createSession(env: Env, userId: string) {
  const token = createOpaqueToken();
  const tokenHash = await hashToken(token);
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString();
  await env.DB.prepare("INSERT INTO sessions (id, user_id, token_hash, expires_at) VALUES (?, ?, ?, ?)")
    .bind(crypto.randomUUID(), userId, tokenHash, expiresAt)
    .run();
  return token;
}

async function handleSignUp(request: Request, env: Env) {
  const body = await readJson(request);
  const email = normalizeEmail(requireString(body.email, "Email"));
  const password = requireString(body.password, "Password");
  const name = typeof body.name === "string" && body.name.trim() ? body.name.trim() : null;

  if (password.length < 8) {
    return json({ error: "Use a password of at least 8 characters." }, 400, env);
  }

  const existing = await env.DB.prepare("SELECT id FROM users WHERE email = ?").bind(email).first<{ id: string }>();
  if (existing) {
    return json({ error: "An account already exists for this email." }, 409, env);
  }

  const id = crypto.randomUUID();
  const passwordHash = await hashPassword(password);
  await env.DB.prepare("INSERT INTO users (id, email, name, password_hash) VALUES (?, ?, ?, ?)")
    .bind(id, email, name, passwordHash)
    .run();
  const user = await env.DB.prepare("SELECT id, email, name FROM users WHERE id = ?").bind(id).first<UserRow>();
  if (!user) {
    return json({ error: "Could not create account." }, 500, env);
  }
  const token = await createSession(env, user.id);
  return json({ token, user: await userPayload(env, user) }, 201, env);
}

async function handleSignIn(request: Request, env: Env) {
  const body = await readJson(request);
  const email = normalizeEmail(requireString(body.email, "Email"));
  const password = requireString(body.password, "Password");
  const row = await env.DB.prepare("SELECT id, email, name, password_hash FROM users WHERE email = ?")
    .bind(email)
    .first<UserRow & { password_hash: string }>();
  if (!row || !(await verifyPassword(password, row.password_hash))) {
    return json({ error: "Email or password is incorrect." }, 401, env);
  }
  const token = await createSession(env, row.id);
  return json({ token, user: await userPayload(env, row) }, 200, env);
}

async function handleMe(request: Request, env: Env) {
  const user = await requireUser(request, env);
  return json({ user: await userPayload(env, user) }, 200, env);
}

async function handlePreferences(request: Request, env: Env) {
  const user = await requireUser(request, env);
  const body = await readJson(request);
  const preferred = Array.isArray(body.preferred) ? body.preferred.map(String) : [];
  const avoided = Array.isArray(body.avoided) ? body.avoided.map(String) : [];
  const categories = await env.DB.prepare("SELECT id, slug FROM categories").all<CategoryRow>();
  const categoryBySlug = new Map(categories.results.map((category) => [category.slug, category]));

  await env.DB.prepare("DELETE FROM user_preferences WHERE user_id = ?").bind(user.id).run();
  for (const slug of [...new Set([...preferred, ...avoided])]) {
    const category = categoryBySlug.get(slug);
    if (!category) {
      continue;
    }
    const status: PreferenceStatus = preferred.includes(slug) ? "PREFERRED" : "AVOIDED";
    await env.DB.prepare("INSERT INTO user_preferences (id, user_id, category_id, status) VALUES (?, ?, ?, ?)")
      .bind(crypto.randomUUID(), user.id, category.id, status)
      .run();
  }

  return json({ user: await userPayload(env, user) }, 200, env);
}

async function getCurrentBatchNumber(env: Env, userId: string) {
  const row = await env.DB.prepare("SELECT COUNT(*) AS count FROM recaps WHERE user_id = ?").bind(userId).first<{ count: number }>();
  return (row?.count ?? 0) + 1;
}

async function learningItemPayload(env: Env, itemId: string) {
  const row = await env.DB.prepare(
    `SELECT learning_items.*, categories.slug AS category_slug, categories.name AS category_name
     FROM learning_items
     JOIN categories ON categories.id = learning_items.category_id
     WHERE learning_items.id = ?`
  )
    .bind(itemId)
    .first<LearningItemRow>();
  if (!row) {
    return null;
  }
  const sources = await env.DB.prepare(
    `SELECT sources.id, sources.title, sources.url, sources.publisher
     FROM learning_item_sources
     JOIN sources ON sources.id = learning_item_sources.source_id
     WHERE learning_item_sources.learning_item_id = ?
     ORDER BY sources.title`
  )
    .bind(itemId)
    .all<SourceRow>();
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: {
      id: row.category_id,
      slug: row.category_slug,
      name: row.category_name
    },
    cardType: row.card_type,
    content: row.content,
    explanation: row.explanation,
    prompt: row.prompt,
    answer: row.answer,
    answerOptions: parseJsonArray(row.answer_options),
    mnemonic: row.mnemonic,
    analogy: row.analogy,
    sources: sources.results
  };
}

async function activityItemPayload(env: Env, itemId: string) {
  const row = await env.DB.prepare("SELECT * FROM activity_items WHERE id = ?").bind(itemId).first<ActivityRow>();
  if (!row) {
    return null;
  }
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    homeVersion: row.home_version,
    officeVersion: row.office_version,
    remoteVersion: row.remote_version,
    why: row.why,
    safetyNote: row.safety_note
  };
}

async function interactionPayload(env: Env, interactionId: string) {
  const row = await env.DB.prepare("SELECT * FROM user_item_interactions WHERE id = ?").bind(interactionId).first<InteractionRow>();
  if (!row) {
    return null;
  }
  return {
    id: row.id,
    kind: row.kind,
    shownAt: row.shown_at,
    feedback: row.feedback,
    quizAnswer: row.quiz_answer,
    quizCorrect: row.quiz_correct === null ? null : row.quiz_correct === 1,
    batchNumber: row.batch_number,
    learningItem: row.learning_item_id ? await learningItemPayload(env, row.learning_item_id) : null,
    activityItem: row.activity_item_id ? await activityItemPayload(env, row.activity_item_id) : null
  };
}

async function handleLaunch(request: Request, env: Env) {
  const user = await requireUser(request, env);
  const preferences = await env.DB.prepare(
    `SELECT categories.slug, user_preferences.status
     FROM user_preferences
     JOIN categories ON categories.id = user_preferences.category_id
     WHERE user_preferences.user_id = ?`
  )
    .bind(user.id)
    .all<{ slug: string; status: PreferenceStatus }>();
  const learningItems = await env.DB.prepare(
    `SELECT learning_items.id, learning_items.slug, learning_items.card_type, learning_items.approved,
            categories.slug AS category_slug
     FROM learning_items
     JOIN categories ON categories.id = learning_items.category_id
     WHERE learning_items.approved = 1`
  ).all<{ id: string; slug: string; card_type: string; approved: number; category_slug: string }>();
  const activityItems = await env.DB.prepare("SELECT id, slug FROM activity_items").all<{ id: string; slug: string }>();
  const interactions = await env.DB.prepare(
    `SELECT user_item_interactions.kind, user_item_interactions.learning_item_id, user_item_interactions.activity_item_id,
            user_item_interactions.feedback, user_item_interactions.quiz_correct, user_item_interactions.shown_at,
            categories.slug AS category_slug, learning_items.card_type
     FROM user_item_interactions
     LEFT JOIN learning_items ON learning_items.id = user_item_interactions.learning_item_id
     LEFT JOIN categories ON categories.id = learning_items.category_id
     WHERE user_item_interactions.user_id = ?
     ORDER BY user_item_interactions.shown_at ASC
     LIMIT 100`
  )
    .bind(user.id)
    .all<{
      kind: "LEARNING" | "ACTIVITY";
      learning_item_id: string | null;
      activity_item_id: string | null;
      feedback: Feedback | null;
      quiz_correct: number | null;
      shown_at: string;
      category_slug: string | null;
      card_type: string | null;
    }>();

  const recommendation = selectRecommendation({
    preferredCategorySlugs: preferences.results.filter((preference) => preference.status === "PREFERRED").map((preference) => preference.slug),
    avoidedCategorySlugs: preferences.results.filter((preference) => preference.status === "AVOIDED").map((preference) => preference.slug),
    learningItems: learningItems.results.map((item) => ({
      id: item.id,
      slug: item.slug,
      categorySlug: item.category_slug,
      cardType: item.card_type,
      approved: item.approved === 1
    })),
    activityItems: activityItems.results,
    interactions: interactions.results.map((interaction) => ({
      kind: interaction.kind,
      learningItemId: interaction.learning_item_id,
      activityItemId: interaction.activity_item_id,
      categorySlug: interaction.category_slug,
      cardType: interaction.card_type,
      feedback: interaction.feedback,
      quizCorrect: interaction.quiz_correct === null ? null : interaction.quiz_correct === 1,
      shownAt: new Date(interaction.shown_at)
    }))
  });

  const id = crypto.randomUUID();
  const batchNumber = await getCurrentBatchNumber(env, user.id);
  if (recommendation.kind === "ACTIVITY") {
    await env.DB.prepare(
      "INSERT INTO user_item_interactions (id, user_id, kind, activity_item_id, batch_number) VALUES (?, ?, 'ACTIVITY', ?, ?)"
    )
      .bind(id, user.id, recommendation.item.id, batchNumber)
      .run();
  } else {
    await env.DB.prepare(
      "INSERT INTO user_item_interactions (id, user_id, kind, learning_item_id, batch_number) VALUES (?, ?, 'LEARNING', ?, ?)"
    )
      .bind(id, user.id, recommendation.item.id, batchNumber)
      .run();
  }

  return json({ interaction: await interactionPayload(env, id) }, 201, env);
}

async function handleFeedback(request: Request, env: Env, interactionId: string) {
  const user = await requireUser(request, env);
  const body = await readJson(request);
  const feedback = requireString(body.feedback, "Feedback") as Feedback;
  const quizAnswer = typeof body.quizAnswer === "string" && body.quizAnswer.trim() ? body.quizAnswer.trim() : null;
  const interaction = await env.DB.prepare(
    `SELECT user_item_interactions.*, learning_items.answer
     FROM user_item_interactions
     LEFT JOIN learning_items ON learning_items.id = user_item_interactions.learning_item_id
     WHERE user_item_interactions.id = ? AND user_item_interactions.user_id = ?`
  )
    .bind(interactionId, user.id)
    .first<InteractionRow & { answer: string | null }>();
  if (!interaction) {
    return json({ error: "Interaction not found." }, 404, env);
  }

  const quizCorrect =
    interaction.answer && quizAnswer ? interaction.answer.trim().toLowerCase() === quizAnswer.trim().toLowerCase() : null;
  await env.DB.prepare(
    "UPDATE user_item_interactions SET feedback = ?, quiz_answer = ?, quiz_correct = ? WHERE id = ? AND user_id = ?"
  )
    .bind(feedback, quizAnswer, quizCorrect === null ? null : quizCorrect ? 1 : 0, interactionId, user.id)
    .run();
  return json({ interaction: await interactionPayload(env, interactionId) }, 200, env);
}

function makeQuestion(title: string, prompt: string | null) {
  return prompt || `What is one useful thing you remember from "${title}"?`;
}

async function handleCreateRecap(request: Request, env: Env) {
  const user = await requireUser(request, env);
  const batchNumber = await getCurrentBatchNumber(env, user.id);
  const interactions = await env.DB.prepare(
    `SELECT user_item_interactions.*, learning_items.title, learning_items.prompt, categories.name AS category_name,
            activity_items.title AS activity_title
     FROM user_item_interactions
     LEFT JOIN learning_items ON learning_items.id = user_item_interactions.learning_item_id
     LEFT JOIN categories ON categories.id = learning_items.category_id
     LEFT JOIN activity_items ON activity_items.id = user_item_interactions.activity_item_id
     WHERE user_item_interactions.user_id = ? AND user_item_interactions.batch_number = ?
     ORDER BY user_item_interactions.shown_at ASC`
  )
    .bind(user.id, batchNumber)
    .all<InteractionRow & { title: string | null; prompt: string | null; category_name: string | null; activity_title: string | null }>();

  if (interactions.results.length === 0) {
    return json({ error: "No interactions are available for the current recap." }, 400, env);
  }

  const learning = interactions.results.filter((interaction) => interaction.learning_item_id && interaction.title);
  const activity = interactions.results.filter((interaction) => interaction.activity_item_id);
  const categories = [...new Set(learning.map((interaction) => interaction.category_name).filter(Boolean))];
  const questions = learning.slice(0, 4).map((interaction) => makeQuestion(interaction.title || "this card", interaction.prompt));
  const interestingTitles = learning
    .filter((interaction) => interaction.feedback === "INTERESTING")
    .map((interaction) => interaction.title)
    .filter(Boolean);
  const itemIds = learning.map((interaction) => interaction.learning_item_id).filter(Boolean);
  const activityIds = activity.map((interaction) => interaction.activity_item_id).filter(Boolean);
  const summaryParts = [
    `You saw ${learning.length} learning card${learning.length === 1 ? "" : "s"}`,
    activity.length > 0 ? `${activity.length} movement reset${activity.length === 1 ? "" : "s"}` : null,
    categories.length > 0 ? `across ${categories.join(", ")}` : null
  ].filter(Boolean);
  const summary = `${summaryParts.join(" ")}. ${
    interestingTitles.length > 0
      ? `Worth revisiting: ${interestingTitles.join(", ")}.`
      : "Pick one idea that felt useful and retrieve it once before moving on."
  }`;
  const recapId = crypto.randomUUID();

  await env.DB.prepare(
    `INSERT INTO recaps (id, user_id, batch_number, title, summary, questions, item_ids, activity_ids)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(user_id, batch_number) DO UPDATE SET
       title = excluded.title,
       summary = excluded.summary,
       questions = excluded.questions,
       item_ids = excluded.item_ids,
       activity_ids = excluded.activity_ids`
  )
    .bind(
      recapId,
      user.id,
      batchNumber,
      `Little recap #${batchNumber}`,
      summary,
      JSON.stringify(questions),
      JSON.stringify(itemIds),
      JSON.stringify(activityIds)
    )
    .run();

  const recap = await env.DB.prepare("SELECT * FROM recaps WHERE user_id = ? AND batch_number = ?")
    .bind(user.id, batchNumber)
    .first<RecapRow>();
  return json({ recap: recap ? recapPayload(recap) : null }, 201, env);
}

function recapPayload(row: RecapRow) {
  return {
    id: row.id,
    batchNumber: row.batch_number,
    title: row.title,
    summary: row.summary,
    questions: parseJsonArray(row.questions),
    itemIds: parseJsonArray(row.item_ids),
    activityIds: parseJsonArray(row.activity_ids),
    createdAt: row.created_at
  };
}

async function handleHistory(request: Request, env: Env) {
  const user = await requireUser(request, env);
  const rows = await env.DB.prepare(
    `SELECT user_item_interactions.*
     FROM user_item_interactions
     WHERE user_item_interactions.user_id = ?
     ORDER BY shown_at DESC
     LIMIT 40`
  )
    .bind(user.id)
    .all<InteractionRow>();
  const interactions = [];
  for (const row of rows.results) {
    interactions.push(await interactionPayload(env, row.id));
  }
  const recaps = await env.DB.prepare("SELECT * FROM recaps WHERE user_id = ? ORDER BY created_at DESC")
    .bind(user.id)
    .all<RecapRow>();
  return json(
    {
      interactions: interactions.filter(Boolean),
      recaps: recaps.results.map(recapPayload)
    },
    200,
    env
  );
}

async function handleGetRecap(request: Request, env: Env, recapId: string) {
  const user = await requireUser(request, env);
  const recap = await env.DB.prepare("SELECT * FROM recaps WHERE id = ? AND user_id = ?").bind(recapId, user.id).first<RecapRow>();
  if (!recap) {
    return json({ error: "Recap not found." }, 404, env);
  }
  return json({ recap: recapPayload(recap) }, 200, env);
}

async function route(request: Request, env: Env) {
  const url = new URL(request.url);
  const path = url.pathname.replace(/\/$/, "") || "/";

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders(env) });
  }
  if (request.method === "GET" && path === "/health") {
    return json({ ok: true }, 200, env);
  }
  if (request.method === "POST" && path === "/auth/signup") {
    return handleSignUp(request, env);
  }
  if (request.method === "POST" && path === "/auth/signin") {
    return handleSignIn(request, env);
  }
  if (request.method === "GET" && path === "/me") {
    return handleMe(request, env);
  }
  if (request.method === "PUT" && path === "/preferences") {
    return handlePreferences(request, env);
  }
  if (request.method === "POST" && path === "/moments/launch") {
    return handleLaunch(request, env);
  }
  const feedbackMatch = path.match(/^\/interactions\/([^/]+)\/feedback$/);
  if (request.method === "POST" && feedbackMatch?.[1]) {
    return handleFeedback(request, env, feedbackMatch[1]);
  }
  if (request.method === "POST" && path === "/recaps") {
    return handleCreateRecap(request, env);
  }
  if (request.method === "GET" && path === "/history") {
    return handleHistory(request, env);
  }
  const recapMatch = path.match(/^\/recaps\/([^/]+)$/);
  if (request.method === "GET" && recapMatch?.[1]) {
    return handleGetRecap(request, env, recapMatch[1]);
  }
  return json({ error: "Not found." }, 404, env);
}

export default {
  async fetch(request, env) {
    try {
      return await route(request, env);
    } catch (caught) {
      if (caught instanceof Response) {
        return caught;
      }
      const message = caught instanceof Error ? caught.message : "Unexpected error.";
      return json({ error: message }, 500, env);
    }
  }
} satisfies ExportedHandler<Env>;
