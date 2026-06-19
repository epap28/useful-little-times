"use client";

import { ArrowRight, Brain, CheckCircle2, ExternalLink, Lightbulb, Sparkles } from "lucide-react";
import type { Feedback, LearningItem } from "@/lib/domain";
import { categoryThemeStyle } from "@/lib/category-theme";

type LearningCardProps = {
  interactionId: string;
  item: LearningItem;
  feedback: Feedback | null;
  quizCorrect: boolean | null;
  onFeedback: (feedback: Feedback, quizAnswer?: string) => void;
  onAnother: () => void;
  busy?: boolean;
  preview?: boolean;
};

function labelForCardType(cardType: string) {
  return cardType
    .toLowerCase()
    .split("_")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

export function LearningCard({ item, feedback, quizCorrect, onFeedback, onAnother, busy = false, preview = false }: LearningCardProps) {
  return (
    <article
      className={`card learning-card themed-card ${preview ? "preview-card" : ""}`}
      style={categoryThemeStyle(item.category.slug)}
      aria-label="Learning card"
    >
      <div className="card-header">
        <div>
          <p className="kicker">{item.category.name}</p>
          <h1 className="card-title">{item.title}</h1>
        </div>
        <span className="pill theme-pill">
          <Brain size={15} aria-hidden />
          {labelForCardType(item.cardType)}
        </span>
      </div>
      <div className="card-body">
        {item.prompt ? (
          <div className="note">
            <strong>Try first:</strong> {item.prompt}
          </div>
        ) : null}

        <p className="fact">{item.content}</p>
        <p className="muted">{item.explanation}</p>

        {item.analogy ? (
          <div className="note">
            <Lightbulb size={17} aria-hidden /> <strong>Analogy:</strong> {item.analogy}
          </div>
        ) : null}

        {item.mnemonic ? (
          <div className="note">
            <Sparkles size={17} aria-hidden /> <strong>Memory trick:</strong> {item.mnemonic}
          </div>
        ) : null}

        {item.answerOptions.length > 0 && preview ? (
          <div className="compact-stack">
            <strong>Mini quiz</strong>
            {item.answerOptions.map((option) => (
              <span className="quiz-option-preview" key={option}>
                {option}
              </span>
            ))}
          </div>
        ) : item.answerOptions.length > 0 ? (
          <form
            className="compact-stack"
            onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const quizAnswer = String(formData.get("quizAnswer") || "");
              onFeedback("INTERESTING", quizAnswer);
            }}
          >
            <strong>Mini quiz</strong>
            {item.answerOptions.map((option) => (
              <label className="choice-row" key={option}>
                <span>{option}</span>
                <input name="quizAnswer" type="radio" value={option} required />
              </label>
            ))}
            <button className="button-secondary" type="submit" disabled={busy}>
              <CheckCircle2 size={17} aria-hidden />
              Check answer
            </button>
            {quizCorrect !== null ? (
              <p className={quizCorrect ? "pill" : "message"}>{quizCorrect ? "Correct. Nice retrieval." : "Not quite. Retrieval still helps."}</p>
            ) : null}
          </form>
        ) : null}

        <div>
          <strong>Sources</strong>
          <ul className="source-list">
            {item.sources.map((source) => (
              <li key={source.url}>
                <a href={source.url} target="_blank" rel="noreferrer">
                  {source.title}
                  <ExternalLink size={13} aria-hidden />
                </a>
                {source.publisher ? <span className="muted"> - {source.publisher}</span> : null}
              </li>
            ))}
          </ul>
        </div>

        {feedback ? <p className="pill theme-pill">Saved feedback: {feedback.toLowerCase().replaceAll("_", " ")}</p> : null}

        {preview ? null : (
          <div className="row" aria-label="Feedback controls">
            <button className="button-quiet" type="button" disabled={busy} onClick={() => onFeedback("NOT_RELEVANT")}>
              Not relevant
            </button>
            <button className="button-secondary" type="button" disabled={busy} onClick={onAnother}>
              Next one
              <ArrowRight size={17} aria-hidden />
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
