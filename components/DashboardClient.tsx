"use client";

import { ArrowRight, CheckCircle2, RotateCw } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ActivityCard } from "@/components/ActivityCard";
import { LearningCard } from "@/components/LearningCard";
import { createRecap, getMe, getToken, launchMoment, recordFeedback } from "@/lib/api-client";
import type { Feedback, Interaction, User } from "@/lib/domain";

export function DashboardClient() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [interaction, setInteraction] = useState<Interaction | null>(null);
  const [batchCount, setBatchCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!getToken()) {
      router.push("/auth");
      return;
    }

    getMe()
      .then(({ user: loadedUser }) => setUser(loadedUser))
      .catch((caught) => setError(caught instanceof Error ? caught.message : "Could not load account."));
  }, [router]);

  const preferredCount = useMemo(
    () => user?.preferences.filter((preference) => preference.status === "PREFERRED").length ?? 0,
    [user]
  );
  const progress = Math.min(batchCount, 10);

  async function launch() {
    setError(null);
    setBusy(true);
    try {
      const response = await launchMoment();
      setInteraction(response.interaction);
      setBatchCount(response.interaction.batchNumber === 1 ? batchCount + 1 : batchCount + 1);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not launch a card.");
    } finally {
      setBusy(false);
    }
  }

  async function feedback(feedbackValue: Feedback, quizAnswer?: string) {
    if (!interaction) {
      return;
    }
    setError(null);
    setBusy(true);
    try {
      const response = await recordFeedback({
        interactionId: interaction.id,
        feedback: feedbackValue,
        quizAnswer
      });
      setInteraction(response.interaction);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not save feedback.");
    } finally {
      setBusy(false);
    }
  }

  async function another() {
    if (interaction) {
      await feedback("SHOW_ANOTHER");
    }
    await launch();
  }

  async function endSession() {
    setError(null);
    setBusy(true);
    try {
      const response = await createRecap();
      router.push(`/recap?id=${encodeURIComponent(response.recap.id)}` as Route);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not create recap.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="shell workspace">
      <section className="stack">
        <div className="spread">
          <div>
            <p className="kicker">Ready when your tools are</p>
            <h1 className="section-title">Hi{user?.name ? `, ${user.name}` : ""}. Want one useful thing?</h1>
          </div>
          <span className="pill">
            <CheckCircle2 size={15} aria-hidden />
            {batchCount} this batch
          </span>
        </div>

        {error ? <p className="message">{error}</p> : null}

        {preferredCount < 3 ? (
          <div className="message">
            Choose at least 3 preferred domains so recommendations have room to interleave.
            <Link href="/settings"> Update preferences</Link>
          </div>
        ) : null}

        {interaction?.learningItem ? (
          <LearningCard
            interactionId={interaction.id}
            item={interaction.learningItem}
            feedback={interaction.feedback}
            quizCorrect={interaction.quizCorrect}
            onFeedback={feedback}
            onAnother={another}
            busy={busy}
          />
        ) : interaction?.activityItem ? (
          <ActivityCard
            item={interaction.activityItem}
            feedback={interaction.feedback}
            onFeedback={feedback}
            onAnother={another}
            busy={busy}
          />
        ) : (
          <div className="panel stack">
            <p className="kicker">Tiny waiting moments</p>
            <h2 className="page-title">One click is enough.</h2>
            <p className="lead">
              No browsing, no timer, no heavy menu. Click once and get a sourced learning card or a tiny movement reset.
            </p>
            <button className="button-primary big-launch" type="button" onClick={launch} disabled={busy}>
              I have several minutes
              <ArrowRight size={20} aria-hidden />
            </button>
          </div>
        )}
      </section>

      <aside className="panel stack">
        <div>
          <p className="kicker">Batch recap</p>
          <h2 className="section-title">{progress}/10 little things</h2>
        </div>
        <div className="progress-bar" aria-label={`${progress} out of 10 uses toward the next recap`}>
          <div className="progress-fill" style={{ width: `${progress * 10}%` }} />
        </div>
        <p className="muted">
          Recaps help memory because your brain strengthens information when it retrieves it. This is not about cramming
          more. It is about making a small useful moment stick.
        </p>
        {batchCount >= 10 ? <p className="message">You have seen 10 little things. Want a quick recap?</p> : null}
        <div className="compact-stack">
          <button className="button-secondary" type="button" onClick={launch} disabled={busy}>
            <RotateCw size={17} aria-hidden />
            Show another
          </button>
          {batchCount > 0 ? (
            <button className="button-quiet" type="button" onClick={endSession} disabled={busy}>
              End work session
            </button>
          ) : null}
        </div>
      </aside>
    </main>
  );
}
