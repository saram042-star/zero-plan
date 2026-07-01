import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Category, ConditionFilter } from "../types/spot";
import { mockSpots } from "../data/mockSpots";
import { shuffle } from "../utils/array";
import { sortByNearestNeighbor } from "../utils/geo";
import type { TabKey } from "../constants";

export interface PlanEntry {
  spotId: string;
  addedAt: string;
}

interface AppState {
  selectedTab: TabKey;
  setSelectedTab: (tab: TabKey) => void;

  selectedCategory: Category | "전체";
  setSelectedCategory: (category: Category | "전체") => void;

  selectedFilters: ConditionFilter[];
  toggleFilter: (filter: ConditionFilter) => void;
  clearFilters: () => void;

  searchQuery: string;
  setSearchQuery: (query: string) => void;

  savedPlans: PlanEntry[];
  isSaved: (spotId: string) => boolean;
  togglePlan: (spotId: string) => void;
  removeFromPlan: (spotId: string) => void;
  movePlanItem: (spotId: string, direction: "up" | "down") => void;
  reorderPlan: (spotIds: string[]) => void;
  sortPlanByRoute: () => void;

  selectedItemForDetail: string | null;
  openDetail: (spotId: string) => void;
  closeDetail: () => void;

  toastMessage: string | null;
  showToast: (message: string) => void;

  currentRecommendationIndex: number;
  recommendationOrder: string[];
  saveCurrentRecommendation: () => void;
  skipCurrentRecommendation: () => void;
  resetRecommendations: () => void;
}

let toastTimeout: ReturnType<typeof setTimeout> | undefined;

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      selectedTab: "today",
      setSelectedTab: (tab) => set({ selectedTab: tab }),

      selectedCategory: "전체",
      setSelectedCategory: (category) => set({ selectedCategory: category }),

      selectedFilters: [],
      toggleFilter: (filter) =>
        set((state) => ({
          selectedFilters: state.selectedFilters.includes(filter)
            ? state.selectedFilters.filter((f) => f !== filter)
            : [...state.selectedFilters, filter],
        })),
      clearFilters: () => set({ selectedFilters: [], searchQuery: "" }),

      searchQuery: "",
      setSearchQuery: (query) => set({ searchQuery: query }),

      savedPlans: [],
      isSaved: (spotId) => get().savedPlans.some((p) => p.spotId === spotId),
      togglePlan: (spotId) => {
        const alreadySaved = get().isSaved(spotId);
        if (alreadySaved) {
          get().removeFromPlan(spotId);
          get().showToast("0원 플랜에서 제거했어요");
        } else {
          set((state) => ({
            savedPlans: [...state.savedPlans, { spotId, addedAt: new Date().toISOString() }],
          }));
          get().showToast("오늘의 0원 플랜에 저장했어요");
        }
      },
      removeFromPlan: (spotId) =>
        set((state) => ({
          savedPlans: state.savedPlans.filter((p) => p.spotId !== spotId),
        })),
      movePlanItem: (spotId, direction) =>
        set((state) => {
          const index = state.savedPlans.findIndex((p) => p.spotId === spotId);
          if (index === -1) return state;
          const targetIndex = direction === "up" ? index - 1 : index + 1;
          if (targetIndex < 0 || targetIndex >= state.savedPlans.length) return state;

          const next = [...state.savedPlans];
          [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
          return { savedPlans: next };
        }),
      reorderPlan: (spotIds) =>
        set((state) => {
          const bySpotId = new Map(state.savedPlans.map((p) => [p.spotId, p]));
          const next = spotIds.map((id) => bySpotId.get(id)).filter((p): p is PlanEntry => Boolean(p));
          return { savedPlans: next };
        }),
      sortPlanByRoute: () => {
        const { savedPlans } = get();
        const spotById = new Map(mockSpots.map((s) => [s.id, s]));
        const points = savedPlans
          .map((p) => spotById.get(p.spotId))
          .filter((s): s is (typeof mockSpots)[number] => Boolean(s))
          .map((s) => ({ id: s.id, lat: s.lat, lng: s.lng }));

        const ordered = sortByNearestNeighbor(points);
        get().reorderPlan(ordered.map((p) => p.id));
        get().showToast("가까운 순서로 0원 플랜을 정리했어요");
      },

      selectedItemForDetail: null,
      openDetail: (spotId) => set({ selectedItemForDetail: spotId }),
      closeDetail: () => set({ selectedItemForDetail: null }),

      toastMessage: null,
      showToast: (message) => {
        if (toastTimeout) clearTimeout(toastTimeout);
        set({ toastMessage: message });
        toastTimeout = setTimeout(() => set({ toastMessage: null }), 2400);
      },

      currentRecommendationIndex: 0,
      recommendationOrder: shuffle(mockSpots.map((s) => s.id)),
      saveCurrentRecommendation: () => {
        const { recommendationOrder, currentRecommendationIndex } = get();
        const spotId = recommendationOrder[currentRecommendationIndex];
        if (spotId && !get().isSaved(spotId)) {
          set((state) => ({
            savedPlans: [...state.savedPlans, { spotId, addedAt: new Date().toISOString() }],
          }));
          get().showToast("오늘의 0원 플랜에 저장했어요");
        }
        set((state) => ({
          currentRecommendationIndex: state.currentRecommendationIndex + 1,
        }));
      },
      skipCurrentRecommendation: () =>
        set((state) => ({
          currentRecommendationIndex: state.currentRecommendationIndex + 1,
        })),
      resetRecommendations: () =>
        set({
          recommendationOrder: shuffle(mockSpots.map((s) => s.id)),
          currentRecommendationIndex: 0,
        }),
    }),
    {
      name: "zero-plan-storage",
      partialize: (state) => ({ savedPlans: state.savedPlans }),
    },
  ),
);
