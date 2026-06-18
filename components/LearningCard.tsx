import type { CardType, Feedback } from "@prisma/client";
import { Brain, CheckCircle2, ExternalLink, Lightbulb, Repeat2, Sparkles } from "lucide-react";
import { recordFeedbackAction, showAnotherAction } from "@/app/actions";

type Source = {
  source: {
    title: string;
    url: string;
    publisher: string | null;
  };
};

type LearningCardProps = {
  interactionId: string;
  item: {
    title: string;
    cardType: CardType;
    content: string;
    explanation: string;
    prompt: string | null;
    answer: string | null;
    answerOptions: unknown;
    mnemonic: string | null;
    analogy: string | null;
    category: {
      name: string;
    };
    sources: Source[];
  };
  feedback: Feedback | null;
  quizCorrect: boolean | null;
};

function labelForCardType(cardType: CardType) {
  return cardType
    .toLowerCase()
    .split("_")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

function getAnswerOptions(answerOptions: unknown) {
  return Array.isArray(answerOptions) ? answerOptions.filter((option): option is string => typeof option === "string") : [];
}

export function LearningCard({ interactionId, item, feedback, quizCorrect }: LearningCardProps) {
  const answerOptions = getAnswerOptions(item.answerOptions);

  return (
    <article className="card learning-card" aria-label="Learning card">
      <div className="card-header">
        <div>
          <p className="kicker">{item.category.name}</p>
          <h1 className="card-title">{item.title}</h1>
        </div>
        <span className="pill">
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

        {answerOptions.length > 0 ? (
          <form action={recordFeedbackAction} className="compact-stack">
            <input type="hidden" name="interactionId" value={interactionId} />
            <input type="hidden" name="feedback" value="INTERESTING" />
            <strong>Mini quiz</strong>
            {answerOptions.map((option) => (
              <label className="choice-row" key={option}>
                <span>{option}</span>
                <input name="quizAnswer" type="radio" value={option} required />
              </label>
            ))}
            <button className="button-secondary" type="submit">
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
            {item.sources.map(({ source }) => (
              <li key={source.url}>
                <a href={source.url} target="_blank" rel="noreferrer">
                  {source.title}
                  <ExternalLink size={13} aria-hidden />
                </a>
                {source.publisher ? <span className="muted"> · {source.publisher}</span> : null}
              </li>
            ))}
          </ul>
        </div>

        {feedback ? <p className="pill">Saved feedback: {feedback.toLowerCase().replaceAll("_", " ")}</p> : null}

        <div className="row" aria-label="Feedback controls">
          <FeedbackButton interactionId={interactionId} feedback="INTERESTING" label="Interesting" />
          <FeedbackButton interactionId={interactionId} feedback="KNEW_THIS" label="I knew this" />
          <FeedbackButton interactionId={interactionId} feedback="NOT_RELEVANT" label="Not relevant" />
          <form action={showAnotherAction}>
            <input type="hidden" name="interactionId" value={interactionId} />
            <button className="button-quiet" type="submit">
              <Repeat2 size={17} aria-hidden />
              Show me another
            </button>
          </form>
        </div>
      </div>
    </article>
  );
}

function FeedbackButton({
  interactionId,
  feedback,
  label
}: {
  interactionId: string;
  feedback: Feedback;
  label: string;
}) {
  return (
    <form action={recordFeedbackAction}>
      <input type="hidden" name="interactionId" value={interactionId} />
      <input type="hidden" name="feedback" value={feedback} />
      <button className="button-quiet" type="submit">
        {label}
      </button>
    </form>
  );
}
