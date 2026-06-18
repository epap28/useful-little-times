import { RecapClient } from "@/components/RecapClient";
import { SiteHeader } from "@/components/SiteHeader";
import { Suspense } from "react";

export default function RecapPage() {
  return (
    <>
      <SiteHeader />
      <Suspense
        fallback={
          <main className="shell stack">
            <section className="panel stack">
              <p className="kicker">Recap</p>
              <h1 className="page-title">Little recap</h1>
            </section>
          </main>
        }
      >
        <RecapClient />
      </Suspense>
    </>
  );
}
