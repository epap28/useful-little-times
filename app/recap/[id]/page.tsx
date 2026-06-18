import { SiteHeader } from "@/components/SiteHeader";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";

function asStringArray(value: unknown) {
  return Array.isArray(value) ? value.filter((entry): entry is string => typeof entry === "string") : [];
}

export default async function RecapPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireUser();
  const { id } = await params;
  const recap = await prisma.recap.findFirst({
    where: {
      id,
      userId: user.id
    }
  });

  if (!recap) {
    notFound();
  }

  const questions = asStringArray(recap.questions);

  return (
    <>
      <SiteHeader user={user} />
      <main className="shell stack">
        <section className="panel stack">
          <p className="kicker">Recap</p>
          <h1 className="page-title">{recap.title}</h1>
          <p className="lead">{recap.summary}</p>
          <div className="note">
            Your brain remembers better when it retrieves information instead of just rereading it. This quick recap
            helps strengthen what you saw without adding more load.
          </div>
          <div className="stack">
            <h2 className="section-title">Recall questions</h2>
            <ul className="history-list">
              {questions.map((question) => (
                <li className="history-item" key={question}>
                  {question}
                </li>
              ))}
            </ul>
          </div>
          <Link className="button-primary" href="/dashboard">
            Back to little moments
          </Link>
        </section>
      </main>
    </>
  );
}
