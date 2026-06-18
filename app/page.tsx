import { ArrowRight, Clock, Sparkles } from "lucide-react";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="shell hero">
        <section className="stack">
          <p className="kicker">Micro-learning for idle moments</p>
          <h1>Useful Little Times</h1>
          <p>
            Tiny waiting moments are perfect for one useful idea. Learn a little, recall a little, and stop before
            your brain gets overloaded.
          </p>
          <div className="row">
            <Link className="button-primary" href="/auth">
              <Sparkles size={18} aria-hidden />
              I have several minutes
              <ArrowRight size={18} aria-hidden />
            </Link>
            <span className="pill">
              <Clock size={15} aria-hidden />
              No timer, no pressure
            </span>
          </div>
        </section>
        <aside className="panel stack" aria-label="What the app does">
          <p className="kicker">The rhythm</p>
          <h2 className="section-title">One button. One useful thing. A gentle recap after ten.</h2>
          <p className="muted">
            The app mixes sourced facts, recall prompts, small quizzes, analogies, and occasional movement cards so
            idle time feels useful without becoming another productivity chore.
          </p>
        </aside>
      </main>
    </>
  );
}
