export const preferenceStatuses = ["PREFERRED", "AVOIDED"] as const;
export type PreferenceStatus = (typeof preferenceStatuses)[number];

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
export type CardType = (typeof cardTypes)[number];

export const interactionKinds = ["LEARNING", "ACTIVITY"] as const;
export type InteractionKind = (typeof interactionKinds)[number];

export const feedbackValues = ["KNEW_THIS", "NOT_RELEVANT", "INTERESTING", "SHOW_ANOTHER", "TOO_EASY", "TOO_HARD"] as const;
export type Feedback = (typeof feedbackValues)[number];

export type Category = {
  id: string;
  slug: string;
  name: string;
};

export type Source = {
  id: string;
  title: string;
  url: string;
  publisher: string | null;
};

export type LearningItem = {
  id: string;
  slug: string;
  title: string;
  category: Category;
  cardType: CardType;
  content: string;
  explanation: string;
  prompt: string | null;
  answer: string | null;
  answerOptions: string[];
  mnemonic: string | null;
  analogy: string | null;
  sources: Source[];
};

export type ActivityItem = {
  id: string;
  slug: string;
  title: string;
  homeVersion: string;
  officeVersion: string;
  remoteVersion: string | null;
  why: string;
  safetyNote: string;
};

export type Interaction = {
  id: string;
  kind: InteractionKind;
  shownAt: string;
  feedback: Feedback | null;
  quizAnswer: string | null;
  quizCorrect: boolean | null;
  batchNumber: number;
  learningItem: LearningItem | null;
  activityItem: ActivityItem | null;
};

export type Preference = {
  category: Category;
  status: PreferenceStatus;
};

export type User = {
  id: string;
  email: string;
  name: string | null;
  preferences: Preference[];
};

export type Recap = {
  id: string;
  batchNumber: number;
  title: string;
  summary: string;
  questions: string[];
  itemIds: string[];
  activityIds: string[];
  createdAt: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};

export type HistoryResponse = {
  interactions: Interaction[];
  recaps: Recap[];
};
