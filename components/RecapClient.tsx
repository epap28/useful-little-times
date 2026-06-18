"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getRecap, getToken } from "@/lib/api-client";
import type { Recap } from "@/lib/domain";

export function RecapClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const recapId = searchParams.get("id");
  const [recap, setRecap] = useState<Recap | null>(null);
  const [error, setError] = useState<string | null>(null);
  const visibleError = recapId ? error : "Missing recap id.";

  useEffect(() => {
    if (!getToken()) {
      router.push("/auth");
      return;
    }
    if (!recapId) {
      return;
    }
    getRecap(recapId)
      .then((response) => setRecap(response.recap))
      .catch((caught) => setError(caught instanceof Error ? caught.message : "Could not load recap."));
  }, [router, recapId]);

  return (
    <main className="shell stack">
      <section className="panel stack">
        <p className="kicker">Recap</p>
        <h1 className="page-title">{recap?.title ?? "Little recap"}</h1>
        {visibleError ? <p className="message">{visibleError}</p> : null}
        {recap ? (
          <>
            <p className="lead">{recap.summary}</p>
            <div className="note">
              Your brain remembers better when it retrieves information instead of just rereading it. This quick recap
              helps strengthen what you saw without adding more load.
            </div>
            <div className="stack">
              <h2 className="section-title">Recall questions</h2>
              <ul className="history-list">
                {recap.questions.map((question) => (
                  <li className="history-item" key={question}>
                    {question}
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : null}
        <Link className="button-primary" href="/dashboard">
          Back to little moments
        </Link>
      </section>
    </main>
  );
}
