export const categories = [
  { slug: "general-knowledge", name: "General knowledge" },
  { slug: "software-engineering", name: "Software engineering" },
  { slug: "computer-science", name: "Computer science" },
  { slug: "artificial-intelligence", name: "Artificial intelligence" },
  { slug: "cybersecurity", name: "Cybersecurity" },
  { slug: "science", name: "Science" },
  { slug: "history", name: "History" },
  { slug: "economics", name: "Economics" },
  { slug: "health", name: "Health" },
  { slug: "productivity", name: "Productivity" },
  { slug: "languages", name: "Languages" },
  { slug: "music", name: "Music" },
  { slug: "cinema", name: "Cinema" },
  { slug: "sports", name: "Sports" },
  { slug: "psychology", name: "Psychology" },
  { slug: "geography", name: "Geography" },
  { slug: "art", name: "Art" },
  { slug: "literature", name: "Literature" },
  { slug: "philosophy", name: "Philosophy" },
  { slug: "mathematics", name: "Mathematics" },
  { slug: "business", name: "Business" },
  { slug: "nature", name: "Nature" },
  { slug: "space", name: "Space" }
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];
