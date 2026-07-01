import clsx from "clsx";
import { motion } from "framer-motion";
import { CONDITION_FILTERS } from "../../types/spot";
import { useAppStore } from "../../store/useAppStore";
import { ACCENT_FALLBACK } from "../../constants";

export function FilterChips() {
  const selectedFilters = useAppStore((s) => s.selectedFilters);
  const toggleFilter = useAppStore((s) => s.toggleFilter);

  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar px-5 -mx-5">
      {CONDITION_FILTERS.map((filter) => {
        const active = selectedFilters.includes(filter);
        return (
          <motion.button
            key={filter}
            onClick={() => toggleFilter(filter)}
            animate={{ scale: active ? 1.06 : 1 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className={clsx(
              "shrink-0 rounded-full px-3.5 py-1.5 text-[12px] font-medium border whitespace-nowrap",
              active ? "border-transparent" : "text-zp-sub border-zp-line",
            )}
            style={
              active
                ? { backgroundColor: `${ACCENT_FALLBACK}22`, color: ACCENT_FALLBACK, borderColor: `${ACCENT_FALLBACK}66` }
                : undefined
            }
          >
            {filter}
          </motion.button>
        );
      })}
    </div>
  );
}
