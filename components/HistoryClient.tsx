"use client";

import type { Route } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getHistory, getToken } from "@/lib/api-client";
import type { HistoryResponse } from "@/lib/domain";

export function HistoryClient() {
  const router = useRouter();
  const [history, setHistory] = useState<HistoryResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!getToken()) {
      router.push("/auth");
      return;
    }
    getHistory()
      .then(setHistory)
      .catch((caught) => setError(caught instanceof Error ? caught.message : "Could not load history."));
  }, [router]);

  return (
    <main className="shell workspace">
      <section className="panel stack">
        <p className="kicker">History</p>
        <h1 className="page-title">What you saw recently</h1>
        {error ? <p className="message">{error}</p> : null}
        <ul className="history-list">
          {history?.interactions.map((interaction) => (
            <li className="history-item" key={interaction.id}>
              <strong>{interaction.learningItem?.title ?? interaction.activityItem?.title ?? "Little moment"}</strong>
              <p className="muted">
                {interaction.learningItem?.category.name ?? "Movement"} - {new Date(interaction.shownAt).toLocaleString()} -{" "}
                {interaction.feedback ? interaction.feedback.toLowerCase().replaceAll("_", " ") : "no feedback yet"}
              </p>
            </li>
          ))}
        </ul>
        {history && history.interactions.length === 0 ? <p className="muted">No cards yet. Start from the home screen.</p> : null}
      </section>
      <aside className="panel stack">
        <p className="kicker">Recaps</p>
        <h2 className="section-title">Saved memory checks</h2>
        <ul className="history-list">
          {history?.recaps.map((recap) => (
            <li className="history-item" key={recap.id}>
              <Link href={`/recap?id=${encodeURIComponent(recap.id)}` as Route}>
                <strong>{recap.title}</strong>
              </Link>
              <p className="muted">{new Date(recap.createdAt).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      </aside>
    </main>
  );
}
