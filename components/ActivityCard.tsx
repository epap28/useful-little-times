import type { Feedback } from "@prisma/client";
import { Footprints, Repeat2, ShieldCheck } from "lucide-react";
import { recordFeedbackAction, showAnotherAction } from "@/app/actions";

type ActivityCardProps = {
  interactionId: string;
  item: {
    title: string;
    homeVersion: string;
    officeVersion: string;
    remoteVersion: string | null;
    why: string;
    safetyNote: string;
  };
  feedback: Feedback | null;
};

export function ActivityCard({ interactionId, item, feedback }: ActivityCardProps) {
  return (
    <article className="card learning-card" aria-label="Physical activity card">
      <div className="card-header">
        <div>
          <p className="kicker">Movement reset</p>
          <h1 className="card-title">{item.title}</h1>
        </div>
        <span className="pill">
          <Footprints size={15} aria-hidden />
          Body break
        </span>
      </div>
      <div className="card-body">
        <p className="fact">{item.homeVersion}</p>
        <div className="note">
          <strong>Office version:</strong> {item.officeVersion}
        </div>
        {item.remoteVersion ? (
          <div className="note">
            <strong>Remote-work version:</strong> {item.remoteVersion}
          </div>
        ) : null}
        <p className="muted">{item.why}</p>
        <div className="note">
          <ShieldCheck size={17} aria-hidden /> {item.safetyNote}
        </div>
        {feedback ? <p className="pill">Saved feedback: {feedback.toLowerCase().replaceAll("_", " ")}</p> : null}
        <div className="row">
          <form action={recordFeedbackAction}>
            <input type="hidden" name="interactionId" value={interactionId} />
            <input type="hidden" name="feedback" value="INTERESTING" />
            <button className="button-secondary" type="submit">
              Done
            </button>
          </form>
          <form action={showAnotherAction}>
            <input type="hidden" name="interactionId" value={interactionId} />
            <button className="button-quiet" type="submit">
              <Repeat2 size={17} aria-hidden />
              Show learning instead
            </button>
          </form>
        </div>
      </div>
    </article>
  );
}
