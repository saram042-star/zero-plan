import type { ConditionFilter, Spot } from "../types/spot";
import { isThisWeekAvailable, isTodayAvailable } from "./date";

type FilterPredicate = (spot: Spot, today: Date) => boolean;

export const FILTER_PREDICATES: Record<ConditionFilter, FilterPredicate> = {
  오늘가능: (spot, today) => isTodayAvailable(spot.startDate, spot.endDate, today),
  이번주: (spot, today) => isThisWeekAvailable(spot.startDate, spot.endDate, today),
  실내: (spot) => spot.indoor,
  야외: (spot) => !spot.indoor,
  혼자가능: (spot) => spot.soloFriendly,
  예약: (spot) => spot.reservationRequired,
  조용한: (spot) => spot.activeType === "조용한",
  활동적인: (spot) => spot.activeType === "활동적인",
  문화생활: (spot) => spot.activeType === "문화생활",
  포토제닉: (spot) => spot.activeType === "사진명소" || spot.tags.includes("포토제닉"),
};

export function matchesFilters(spot: Spot, filters: ConditionFilter[], today = new Date()): boolean {
  return filters.every((filter) => FILTER_PREDICATES[filter](spot, today));
}

export function matchesSearch(spot: Spot, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const haystack = [spot.title, spot.district, spot.locationName, spot.category, ...spot.tags]
    .join(" ")
    .toLowerCase();
  return haystack.includes(q);
}
