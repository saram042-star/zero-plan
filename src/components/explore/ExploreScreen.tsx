import { useMemo } from "react";
import { motion } from "framer-motion";
import { mockSpots } from "../../data/mockSpots";
import { useAppStore } from "../../store/useAppStore";
import { matchesFilters, matchesSearch } from "../../utils/filters";
import { useTabRevealKey } from "../../hooks/useTabRevealKey";
import { SearchBar } from "./SearchBar";
import { CategoryTabs } from "./CategoryTabs";
import { FilterChips } from "./FilterChips";
import { SpotListItem } from "./SpotListItem";
import { EmptyState } from "../common/EmptyState";
import { CompassIcon } from "../icons";

export function ExploreScreen() {
  const selectedCategory = useAppStore((s) => s.selectedCategory);
  const selectedFilters = useAppStore((s) => s.selectedFilters);
  const searchQuery = useAppStore((s) => s.searchQuery);
  const clearFilters = useAppStore((s) => s.clearFilters);
  const setSelectedCategory = useAppStore((s) => s.setSelectedCategory);
  const revealKey = useTabRevealKey("explore");

  const results = useMemo(() => {
    return mockSpots.filter((spot) => {
      if (selectedCategory !== "전체" && spot.category !== selectedCategory) return false;
      if (!matchesFilters(spot, selectedFilters)) return false;
      if (!matchesSearch(spot, searchQuery)) return false;
      return true;
    });
  }, [selectedCategory, selectedFilters, searchQuery]);

  return (
    <div key={revealKey} className="h-full overflow-y-auto no-scrollbar">
      <div className="px-5 pt-5 safe-top space-y-5 pb-4">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[11px] tracking-[0.2em] text-zp-sub font-semibold">ZERO PLAN</p>
          <h1 className="text-2xl font-black text-zp-text mt-1">오늘 돈 안 쓰고 뭐 할까?</h1>
        </motion.div>

        <SearchBar />
        <CategoryTabs />
        <FilterChips />

        <div className="rounded-2xl bg-zp-surface border border-zp-line px-4 py-3.5 flex items-center justify-between">
          <div>
            <p className="text-sm text-zp-sub">지금 즐길 수 있는 무료 프로그램</p>
            <p className="text-lg font-black text-zp-text mt-0.5">{results.length}개</p>
          </div>
          <span className="text-[11px] font-bold text-black bg-zp-text rounded-full px-3 py-1.5">
            전체 무료 ₩0
          </span>
        </div>
      </div>

      <div className="px-5 pb-10 space-y-4">
        {results.length === 0 ? (
          <EmptyState
            icon={<CompassIcon size={24} />}
            title="조건에 맞는 무료 프로그램이 없어요"
            description={"검색어나 필터를 조정해서\n다시 찾아볼까요?"}
            action={
              <button
                onClick={() => {
                  clearFilters();
                  setSelectedCategory("전체");
                }}
                className="mt-2 rounded-full bg-zp-text text-black font-bold text-sm px-6 py-3"
              >
                필터 초기화
              </button>
            }
          />
        ) : (
          results.map((spot, i) => (
            <motion.div
              key={spot.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: Math.min(i, 8) * 0.04 }}
            >
              <SpotListItem spot={spot} />
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
