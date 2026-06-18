import type { CategorySlug } from "./categories";
import type { CardType } from "../lib/domain";

export const cardTypes = [
  "QUICK_FACT",
  "MINI_EXPLANATION",
  "ANALOGY",
  "ACTIVE_RECALL",
  "MINI_QUIZ",
  "MNEMONIC",
  "DID_YOU_KNOW",
  "EXPLAIN_BACK",
  "MISCONCEPTION",
  "ONE_EXAMPLE"
] as const;

export type LearningSeedItem = {
  slug: string;
  title: string;
  categorySlug: CategorySlug;
  cardType: CardType;
  content: string;
  explanation: string;
  prompt?: string;
  answer?: string;
  answerOptions?: string[];
  mnemonic?: string;
  analogy?: string;
  sources: Array<{
    title: string;
    url: string;
    publisher?: string;
  }>;
};

export const learningItems: LearningSeedItem[] = [
  {
    slug: "javascript-event-loop",
    title: "JavaScript waits in line",
    categorySlug: "software-engineering",
    cardType: "ANALOGY",
    content: "The JavaScript event loop lets one thread juggle callbacks by taking queued work when the call stack is clear.",
    explanation: "That is why a timeout, a promise callback, and a click handler can feel asynchronous even though normal JavaScript execution is single-threaded.",
    analogy: "Think of the call stack as a cashier and the task queue as people waiting their turn.",
    sources: [
      {
        title: "Concurrency model and Event Loop",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop",
        publisher: "MDN Web Docs"
      }
    ]
  },
  {
    slug: "css-flexbox-main-cross-axis",
    title: "Flexbox has two axes",
    categorySlug: "software-engineering",
    cardType: "QUICK_FACT",
    content: "In flexbox, the main axis follows `flex-direction`, and the cross axis runs perpendicular to it.",
    explanation: "`justify-content` works along the main axis, while `align-items` works along the cross axis. Many layout bugs are just axis confusion.",
    sources: [
      {
        title: "Basic concepts of flexbox",
        url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox",
        publisher: "MDN Web Docs"
      }
    ]
  },
  {
    slug: "http-safe-methods",
    title: "GET should be safe",
    categorySlug: "computer-science",
    cardType: "MISCONCEPTION",
    content: "A common misconception: any HTTP endpoint can mutate data if the app wants it to.",
    explanation: "HTTP defines safe methods such as GET as read-oriented. Keeping GET side-effect-free helps caching, crawlers, previews, and user trust.",
    prompt: "Which method should you avoid using for a destructive action?",
    answer: "GET",
    sources: [
      {
        title: "HTTP request methods",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods",
        publisher: "MDN Web Docs"
      }
    ]
  },
  {
    slug: "owasp-broken-access-control",
    title: "Access control is not UI control",
    categorySlug: "cybersecurity",
    cardType: "MINI_EXPLANATION",
    content: "Hiding a button is not the same as protecting an action.",
    explanation: "Broken access control happens when server-side authorization is missing or inconsistent. The server must check what the current user is allowed to do.",
    sources: [
      {
        title: "OWASP Top 10: Broken Access Control",
        url: "https://owasp.org/Top10/A01_2021-Broken_Access_Control/",
        publisher: "OWASP"
      }
    ]
  },
  {
    slug: "postgres-transactions",
    title: "Transactions bundle promises",
    categorySlug: "computer-science",
    cardType: "ONE_EXAMPLE",
    content: "A database transaction can make multiple operations succeed or fail together.",
    explanation: "For example, moving money between accounts should debit one account and credit another as one unit, not as two fragile independent writes.",
    sources: [
      {
        title: "PostgreSQL Tutorial: Transactions",
        url: "https://www.postgresql.org/docs/current/tutorial-transactions.html",
        publisher: "PostgreSQL"
      }
    ]
  },
  {
    slug: "react-state-memory",
    title: "React state is component memory",
    categorySlug: "software-engineering",
    cardType: "ACTIVE_RECALL",
    content: "React state stores information that should survive a re-render.",
    explanation: "Use state for values that affect rendering and change over time, such as an open panel, selected tab, or form input.",
    prompt: "Before revealing: what kind of value belongs in React state?",
    answer: "A value that affects rendering and changes over time.",
    sources: [
      {
        title: "State: A Component's Memory",
        url: "https://react.dev/learn/state-a-components-memory",
        publisher: "React"
      }
    ]
  },
  {
    slug: "nasa-planets-order",
    title: "Mars is the fourth planet",
    categorySlug: "space",
    cardType: "MINI_QUIZ",
    content: "The inner planets are Mercury, Venus, Earth, and Mars.",
    explanation: "Mars is fourth from the Sun, sitting just beyond Earth in the inner solar system.",
    prompt: "Which planet is fourth from the Sun?",
    answer: "Mars",
    answerOptions: ["Venus", "Earth", "Mars", "Jupiter"],
    sources: [
      {
        title: "Planets",
        url: "https://science.nasa.gov/solar-system/planets/",
        publisher: "NASA Science"
      }
    ]
  },
  {
    slug: "webb-infrared",
    title: "Webb sees in infrared",
    categorySlug: "space",
    cardType: "DID_YOU_KNOW",
    content: "The James Webb Space Telescope is optimized for infrared astronomy.",
    explanation: "Infrared light helps Webb study cool objects, dust-obscured regions, and very distant galaxies whose light has shifted toward longer wavelengths.",
    sources: [
      {
        title: "James Webb Space Telescope",
        url: "https://science.nasa.gov/mission/webb/",
        publisher: "NASA Science"
      }
    ]
  },
  {
    slug: "photosynthesis-stores-energy",
    title: "Photosynthesis stores sunlight",
    categorySlug: "science",
    cardType: "MINI_EXPLANATION",
    content: "Photosynthesis converts light energy into chemical energy stored in sugars.",
    explanation: "Plants, algae, and some bacteria use this process to build energy-rich molecules from carbon dioxide and water.",
    sources: [
      {
        title: "Photosynthesis",
        url: "https://www.britannica.com/science/photosynthesis",
        publisher: "Encyclopaedia Britannica"
      }
    ]
  },
  {
    slug: "who-movement-guidelines",
    title: "Some movement beats none",
    categorySlug: "health",
    cardType: "QUICK_FACT",
    content: "The World Health Organization emphasizes that any physical activity is better than none.",
    explanation: "That makes tiny movement breaks a sensible default: they do not need to be intense to be useful.",
    sources: [
      {
        title: "Physical activity",
        url: "https://www.who.int/news-room/fact-sheets/detail/physical-activity",
        publisher: "World Health Organization"
      }
    ]
  },
  {
    slug: "testing-effect",
    title: "Retrieval strengthens memory",
    categorySlug: "psychology",
    cardType: "EXPLAIN_BACK",
    content: "Trying to recall information can strengthen learning more than simply rereading it.",
    explanation: "This is often called retrieval practice or the testing effect. A small question after a fact can make the fact stick better.",
    prompt: "Explain it back in one sentence: why does a quick recap help?",
    answer: "Because retrieval practice strengthens memory.",
    sources: [
      {
        title: "Retrieval Practice Produces Memory Benefits",
        url: "https://www.apa.org/science/about/psa/2016/06/learning-memory",
        publisher: "American Psychological Association"
      }
    ]
  },
  {
    slug: "spaced-repetition-gap",
    title: "Spacing creates useful forgetting",
    categorySlug: "psychology",
    cardType: "MNEMONIC",
    content: "Spaced repetition works by revisiting information after a gap, not immediately forever.",
    explanation: "A little delay makes recall effortful, and effortful recall is part of why the memory gets stronger.",
    mnemonic: "Gap, grasp, grow: leave a gap, try to grasp it, let memory grow.",
    sources: [
      {
        title: "Organizing Instruction and Study to Improve Student Learning",
        url: "https://ies.ed.gov/ncee/wwc/PracticeGuide/1",
        publisher: "Institute of Education Sciences"
      }
    ]
  },
  {
    slug: "classical-logic-validity",
    title: "Validity is about structure",
    categorySlug: "philosophy",
    cardType: "MINI_EXPLANATION",
    content: "In logic, validity means the conclusion follows from the premises by form, not that the premises are actually true.",
    explanation: "An argument can be valid with false premises. Soundness requires both validity and true premises.",
    sources: [
      {
        title: "Classical Logic",
        url: "https://plato.stanford.edu/entries/logic-classical/",
        publisher: "Stanford Encyclopedia of Philosophy"
      }
    ]
  },
  {
    slug: "einstein-photoelectric-effect",
    title: "Einstein's Nobel was for light quanta",
    categorySlug: "history",
    cardType: "DID_YOU_KNOW",
    content: "Albert Einstein received the 1921 Nobel Prize in Physics for work connected to the photoelectric effect.",
    explanation: "That work helped establish the idea that light energy can be exchanged in discrete packets.",
    sources: [
      {
        title: "The Nobel Prize in Physics 1921",
        url: "https://www.nobelprize.org/prizes/physics/1921/summary/",
        publisher: "Nobel Prize"
      }
    ]
  },
  {
    slug: "opportunity-cost",
    title: "Every choice spends an alternative",
    categorySlug: "economics",
    cardType: "ANALOGY",
    content: "Opportunity cost is the value of the best alternative you give up when choosing something.",
    explanation: "It is not always money. Time, attention, and flexibility can all be part of the cost.",
    analogy: "Choosing one tab to read closes the tiny door to reading another tab right now.",
    sources: [
      {
        title: "Opportunity Cost",
        url: "https://www.investopedia.com/terms/o/opportunitycost.asp",
        publisher: "Investopedia"
      }
    ]
  },
  {
    slug: "python-list-comprehension",
    title: "Comprehensions make lists from patterns",
    categorySlug: "software-engineering",
    cardType: "ONE_EXAMPLE",
    content: "A Python list comprehension builds a list by applying an expression to each item in an iterable.",
    explanation: "`[x * x for x in range(5)]` creates `[0, 1, 4, 9, 16]` in one readable expression.",
    sources: [
      {
        title: "Data Structures",
        url: "https://docs.python.org/3/tutorial/datastructures.html",
        publisher: "Python documentation"
      }
    ]
  },
  {
    slug: "ai-training-inference",
    title: "Training and inference are different jobs",
    categorySlug: "artificial-intelligence",
    cardType: "MINI_EXPLANATION",
    content: "Training teaches a model patterns from data; inference uses a trained model to produce an output.",
    explanation: "A helpful mental split: training changes model weights, while inference normally just uses them.",
    sources: [
      {
        title: "Machine Learning Glossary",
        url: "https://developers.google.com/machine-learning/glossary",
        publisher: "Google for Developers"
      }
    ]
  },
  {
    slug: "semantic-html-buttons",
    title: "Use buttons for actions",
    categorySlug: "software-engineering",
    cardType: "QUICK_FACT",
    content: "A real `<button>` gives keyboard and accessibility behavior that a clickable `<div>` does not provide by default.",
    explanation: "Semantic HTML is often the shortest path to a more accessible interface.",
    sources: [
      {
        title: "The Button element",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button",
        publisher: "MDN Web Docs"
      }
    ]
  },
  {
    slug: "box-breathing",
    title: "Box breathing gives a simple rhythm",
    categorySlug: "health",
    cardType: "MNEMONIC",
    content: "Box breathing uses equal counts for inhale, hold, exhale, and hold again.",
    explanation: "The pattern can give attention a calm structure, especially during a brief reset.",
    mnemonic: "Four sides of a box: breathe in, hold, breathe out, hold.",
    sources: [
      {
        title: "Relaxation techniques: Breath control helps quell errant stress response",
        url: "https://www.health.harvard.edu/mind-and-mood/relaxation-techniques-breath-control-helps-quell-errant-stress-response",
        publisher: "Harvard Health Publishing"
      }
    ]
  },
  {
    slug: "source-credibility",
    title: "A source is part of the fact",
    categorySlug: "general-knowledge",
    cardType: "ACTIVE_RECALL",
    content: "A useful fact becomes more trustworthy when you know where it came from.",
    explanation: "For micro-learning, a source is not decoration. It lets users check context, date, and credibility.",
    prompt: "Before revealing: why should every learning card include a source?",
    answer: "Because sources make facts checkable and trustworthy.",
    sources: [
      {
        title: "Evaluating Information: Applying the CRAAP Test",
        url: "https://guides.library.cornell.edu/evaluate_sources",
        publisher: "Cornell University Library"
      }
    ]
  }
];
