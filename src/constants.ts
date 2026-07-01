export const ACCENT_FALLBACK = "#D9FF3F";

export const BASE_BG = "#0E0E0E";

export const TABS = [
  { key: "today", label: "오늘의 추천" },
  { key: "explore", label: "탐색" },
  { key: "plan", label: "오늘의 0원 플랜" },
] as const;

export type TabKey = (typeof TABS)[number]["key"];

export const SAVINGS_PER_SPOT = 8000;
