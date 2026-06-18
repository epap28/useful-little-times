"use client";

import { Footprints, Repeat2, ShieldCheck } from "lucide-react";
import type { ActivityItem, Feedback } from "@/lib/domain";

type ActivityCardProps = {
  item: ActivityItem;
  feedback: Feedback | null;
  onFeedback: (feedback: Feedback) => void;
  onAnother: () => void;
  busy?: boolean;
};

export function ActivityCard({ item, feedback, onFeedback, onAnother, busy = false }: ActivityCardProps) {
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
          <button className="button-secondary" type="button" disabled={busy} onClick={() => onFeedback("INTERESTING")}>
            Done
          </button>
          <button className="button-quiet" type="button" disabled={busy} onClick={onAnother}>
            <Repeat2 size={17} aria-hidden />
            Show learning instead
          </button>
        </div>
      </div>
    </article>
  );
}
