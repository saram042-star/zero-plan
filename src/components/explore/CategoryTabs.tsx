import clsx from "clsx";
import { motion } from "framer-motion";
import { CATEGORIES, type Category } from "../../types/spot";
import { useAppStore } from "../../store/useAppStore";
import { ACCENT_FALLBACK } from "../../constants";

const OPTIONS: (Category | "전체")[] = ["전체", ...CATEGORIES];

export function CategoryTabs() {
  const selectedCategory = useAppStore((s) => s.selectedCategory);
  const setSelectedCategory = useAppStore((s) => s.setSelectedCategory);

  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar px-5 -mx-5">
      {OPTIONS.map((option) => {
        const active = selectedCategory === option;
        return (
          <motion.button
            key={option}
            onClick={() => setSelectedCategory(option)}
            animate={{ scale: active ? 1.05 : 1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 24 }}
            className={clsx(
              "shrink-0 rounded-full px-4 py-2 text-[13px] font-semibold border whitespace-nowrap",
              active ? "text-black border-transparent" : "text-zp-sub border-zp-line bg-white/5",
            )}
            style={active ? { backgroundColor: ACCENT_FALLBACK } : undefined}
          >
            {option}
          </motion.button>
        );
      })}
    </div>
  );
}
