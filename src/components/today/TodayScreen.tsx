import { motion } from "framer-motion";
import { useAppStore } from "../../store/useAppStore";
import { getSpotById } from "../../data/spotIndex";
import { useTabRevealKey } from "../../hooks/useTabRevealKey";
import { SwipeCardStack } from "./SwipeCardStack";
import { AccentGlowBackground } from "./AccentGlowBackground";

export function TodayScreen() {
  const recommendationOrder = useAppStore((s) => s.recommendationOrder);
  const currentRecommendationIndex = useAppStore((s) => s.currentRecommendationIndex);
  const currentSpotId = recommendationOrder[currentRecommendationIndex];
  const currentSpot = currentSpotId ? getSpotById(currentSpotId) : undefined;
  const accentColor = currentSpot?.accentColor ?? "#D9FF3F";
  const revealKey = useTabRevealKey("today");

  return (
    <div key={revealKey} className="relative h-full flex flex-col overflow-hidden">
      <AccentGlowBackground color={accentColor} />

      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="px-5 pt-5 safe-top flex items-center justify-between shrink-0"
      >
        <div>
          <p className="text-[11px] tracking-[0.2em] text-zp-sub font-semibold">ZERO PLAN</p>
          <h1 className="text-xl font-black text-zp-text mt-0.5">오늘의 추천</h1>
        </div>
        <div
          className="w-9 h-9 rounded-full border border-zp-line flex items-center justify-center text-[13px] font-bold"
          style={{ color: accentColor }}
        >
          0원
        </div>
      </motion.header>

      <div className="flex-1 min-h-0">
        <SwipeCardStack />
      </div>
    </div>
  );
}
