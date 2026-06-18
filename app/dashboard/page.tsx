import { ActivityCard } from "@/components/ActivityCard";
import { LearningCard } from "@/components/LearningCard";
import { SiteHeader } from "@/components/SiteHeader";
import { endSessionAction, launchMomentAction } from "@/app/actions";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getCurrentBatchCount } from "@/lib/recommendation-service";
import { ArrowRight, CheckCircle2, RotateCw } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage({
  searchParams
}: {
  searchParams: Promise<{ interaction?: string }>;
}) {
  const user = await requireUser();
  const params = await searchParams;
  const preferredCount = user.preferences.filter((preference) => preference.status === "PREFERRED").length;
  const batchCount = await getCurrentBatchCount(user.id);
  const progress = Math.min(batchCount, 10);

  const interaction = params.interaction
    ? await prisma.userItemInteraction.findFirst({
        where: {
          id: params.interaction,
          userId: user.id
        },
        include: {
          learningItem: {
            include: {
              category: true,
              sources: {
                include: {
                  source: true
                }
              }
            }
          },
          activityItem: true
        }
      })
    : null;

  return (
    <>
      <SiteHeader user={user} />
      <main className="shell workspace">
        <section className="stack">
          <div className="spread">
            <div>
              <p className="kicker">Ready when your tools are</p>
              <h1 className="section-title">Hi{user.name ? `, ${user.name}` : ""}. Want one useful thing?</h1>
            </div>
            <span className="pill">
              <CheckCircle2 size={15} aria-hidden />
              {batchCount} this batch
            </span>
          </div>

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
            />
          ) : interaction?.activityItem ? (
            <ActivityCard interactionId={interaction.id} item={interaction.activityItem} feedback={interaction.feedback} />
          ) : (
            <div className="panel stack">
              <p className="kicker">Tiny waiting moments</p>
              <h2 className="page-title">One click is enough.</h2>
              <p className="lead">
                No browsing, no timer, no heavy menu. Click once and get a sourced learning card or a tiny movement reset.
              </p>
              <form action={launchMomentAction}>
                <button className="button-primary big-launch" type="submit">
                  I have several minutes
                  <ArrowRight size={20} aria-hidden />
                </button>
              </form>
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
            Recaps help memory because your brain strengthens information when it retrieves it. This is not about
            cramming more. It is about making a small useful moment stick.
          </p>
          {batchCount >= 10 ? <p className="message">You have seen 10 little things. Want a quick recap?</p> : null}
          <div className="compact-stack">
            <form action={launchMomentAction}>
              <button className="button-secondary" type="submit">
                <RotateCw size={17} aria-hidden />
                Show another
              </button>
            </form>
            {batchCount > 0 ? (
              <form action={endSessionAction}>
                <button className="button-quiet" type="submit">
                  End work session
                </button>
              </form>
            ) : null}
          </div>
        </aside>
      </main>
    </>
  );
}
