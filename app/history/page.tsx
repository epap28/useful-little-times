import { SiteHeader } from "@/components/SiteHeader";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import Link from "next/link";

export default async function HistoryPage() {
  const user = await requireUser();
  const [interactions, recaps] = await Promise.all([
    prisma.userItemInteraction.findMany({
      where: { userId: user.id },
      include: {
        learningItem: {
          include: {
            category: true
          }
        },
        activityItem: true
      },
      orderBy: { shownAt: "desc" },
      take: 40
    }),
    prisma.recap.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" }
    })
  ]);

  return (
    <>
      <SiteHeader user={user} />
      <main className="shell workspace">
        <section className="panel stack">
          <p className="kicker">History</p>
          <h1 className="page-title">What you saw recently</h1>
          <ul className="history-list">
            {interactions.map((interaction) => (
              <li className="history-item" key={interaction.id}>
                <strong>{interaction.learningItem?.title ?? interaction.activityItem?.title ?? "Little moment"}</strong>
                <p className="muted">
                  {interaction.learningItem?.category.name ?? "Movement"} · {interaction.shownAt.toLocaleString()} ·{" "}
                  {interaction.feedback ? interaction.feedback.toLowerCase().replaceAll("_", " ") : "no feedback yet"}
                </p>
              </li>
            ))}
          </ul>
          {interactions.length === 0 ? <p className="muted">No cards yet. Start from the home screen.</p> : null}
        </section>
        <aside className="panel stack">
          <p className="kicker">Recaps</p>
          <h2 className="section-title">Saved memory checks</h2>
          <ul className="history-list">
            {recaps.map((recap) => (
              <li className="history-item" key={recap.id}>
                <Link href={`/recap/${recap.id}`}>
                  <strong>{recap.title}</strong>
                </Link>
                <p className="muted">{recap.createdAt.toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        </aside>
      </main>
    </>
  );
}
