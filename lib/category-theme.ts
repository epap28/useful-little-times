import type { CSSProperties } from "react";

type CategoryTheme = {
  accent: string;
  soft: string;
  surface: string;
  border: string;
};

const fallbackTheme: CategoryTheme = {
  accent: "#2563eb",
  soft: "#dbeafe",
  surface: "#f8fbff",
  border: "#bfdbfe"
};

const themes: Record<string, CategoryTheme> = {
  "general-knowledge": { accent: "#0f766e", soft: "#ccfbf1", surface: "#f0fdfa", border: "#99f6e4" },
  "software-engineering": { accent: "#2563eb", soft: "#dbeafe", surface: "#eff6ff", border: "#bfdbfe" },
  "computer-science": { accent: "#4f46e5", soft: "#e0e7ff", surface: "#eef2ff", border: "#c7d2fe" },
  "artificial-intelligence": { accent: "#7c3aed", soft: "#ede9fe", surface: "#f5f3ff", border: "#ddd6fe" },
  cybersecurity: { accent: "#be123c", soft: "#ffe4e6", surface: "#fff1f2", border: "#fecdd3" },
  science: { accent: "#0891b2", soft: "#cffafe", surface: "#ecfeff", border: "#a5f3fc" },
  history: { accent: "#b45309", soft: "#fef3c7", surface: "#fffbeb", border: "#fde68a" },
  economics: { accent: "#15803d", soft: "#dcfce7", surface: "#f0fdf4", border: "#bbf7d0" },
  health: { accent: "#db2777", soft: "#fce7f3", surface: "#fdf2f8", border: "#fbcfe8" },
  productivity: { accent: "#ea580c", soft: "#ffedd5", surface: "#fff7ed", border: "#fed7aa" },
  languages: { accent: "#9333ea", soft: "#f3e8ff", surface: "#faf5ff", border: "#e9d5ff" },
  music: { accent: "#c026d3", soft: "#fae8ff", surface: "#fdf4ff", border: "#f5d0fe" },
  cinema: { accent: "#dc2626", soft: "#fee2e2", surface: "#fef2f2", border: "#fecaca" },
  sports: { accent: "#16a34a", soft: "#dcfce7", surface: "#f0fdf4", border: "#bbf7d0" },
  psychology: { accent: "#7e22ce", soft: "#f3e8ff", surface: "#faf5ff", border: "#e9d5ff" },
  geography: { accent: "#0284c7", soft: "#e0f2fe", surface: "#f0f9ff", border: "#bae6fd" },
  art: { accent: "#e11d48", soft: "#ffe4e6", surface: "#fff1f2", border: "#fecdd3" },
  literature: { accent: "#854d0e", soft: "#fef3c7", surface: "#fefce8", border: "#fde68a" },
  philosophy: { accent: "#475569", soft: "#e2e8f0", surface: "#f8fafc", border: "#cbd5e1" },
  mathematics: { accent: "#0369a1", soft: "#e0f2fe", surface: "#f0f9ff", border: "#bae6fd" },
  business: { accent: "#0f766e", soft: "#ccfbf1", surface: "#f0fdfa", border: "#99f6e4" },
  nature: { accent: "#65a30d", soft: "#ecfccb", surface: "#f7fee7", border: "#d9f99d" },
  space: { accent: "#4338ca", soft: "#e0e7ff", surface: "#eef2ff", border: "#c7d2fe" }
};

export function categoryThemeStyle(slug: string): CSSProperties {
  const theme = themes[slug] ?? fallbackTheme;
  return {
    "--theme-accent": theme.accent,
    "--theme-soft": theme.soft,
    "--theme-surface": theme.surface,
    "--theme-border": theme.border
  } as CSSProperties;
}
