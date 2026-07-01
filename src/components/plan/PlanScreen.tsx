import { Reorder, motion } from "framer-motion";
import { useAppStore } from "../../store/useAppStore";
import { getSpotById } from "../../data/spotIndex";
import { useTabRevealKey } from "../../hooks/useTabRevealKey";
import { PlanListItem } from "./PlanListItem";
import { EmptyState } from "../common/EmptyState";
import { RouteIcon } from "../icons";
import { SAVINGS_PER_SPOT } from "../../constants";

export function PlanScreen() {
  const savedPlans = useAppStore((s) => s.savedPlans);
  const reorderPlan = useAppStore((s) => s.reorderPlan);
  const sortPlanByRoute = useAppStore((s) => s.sortPlanByRoute);
  const setSelectedTab = useAppStore((s) => s.setSelectedTab);
  const revealKey = useTabRevealKey("plan");

  const ids = savedPlans.map((p) => p.spotId);
  const total = ids.length;
  const savings = total * SAVINGS_PER_SPOT;

  if (total === 0) {
    return (
      <div key={revealKey} className="h-full flex flex-col">
        <div className="px-5 pt-5 safe-top shrink-0">
          <p className="text-[11px] tracking-[0.2em] text-zp-sub font-semibold">ZERO PLAN</p>
          <h1 className="text-xl font-black text-zp-text mt-0.5">오늘의 0원 플랜</h1>
        </div>
        <div className="flex-1 flex items-center justify-center px-5">
          <EmptyState
            icon={<RouteIcon size={24} />}
            title="아직 저장한 장소가 없어요"
            description={"오늘의 추천이나 탐색에서\n마음에 드는 무료 장소를 저장해보세요."}
            action={
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => setSelectedTab("today")}
                  className="rounded-full bg-zp-text text-black font-bold text-sm px-5 py-3"
                >
                  오늘의 추천 보기
                </button>
                <button
                  onClick={() => setSelectedTab("explore")}
                  className="rounded-full bg-white/8 border border-zp-line text-zp-text font-bold text-sm px-5 py-3"
                >
                  탐색하기
                </button>
              </div>
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div key={revealKey} className="h-full overflow-y-auto no-scrollbar">
      <div className="px-5 pt-5 safe-top pb-24 space-y-5">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[11px] tracking-[0.2em] text-zp-sub font-semibold">ZERO PLAN</p>
          <h1 className="text-xl font-black text-zp-text mt-0.5">오늘의 0원 플랜</h1>
        </motion.div>

        <div className="rounded-3xl bg-zp-surface border border-zp-line p-5 space-y-4">
          <p className="text-sm text-zp-sub leading-relaxed">
            저장한 무료 장소를 하루 코스로 연결해보세요.
          </p>
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-2xl bg-white/5 border border-zp-line p-3 text-center">
              <p className="text-[11px] text-zp-sub">저장 장소</p>
              <p className="text-lg font-black text-zp-text mt-1">{total}곳</p>
            </div>
            <div className="rounded-2xl bg-white/5 border border-zp-line p-3 text-center">
              <p className="text-[11px] text-zp-sub">예상 지출</p>
              <p className="text-lg font-black text-zp-text mt-1">₩0</p>
            </div>
            <div className="rounded-2xl bg-white/5 border border-zp-line p-3 text-center">
              <p className="text-[11px] text-zp-sub">예상 절약</p>
              <p className="text-lg font-black text-zp-text mt-1">{savings.toLocaleString()}원</p>
            </div>
          </div>
          <button
            onClick={sortPlanByRoute}
            disabled={total < 2}
            className="w-full rounded-full bg-zp-text text-black font-bold text-sm py-3 disabled:opacity-40"
          >
            동선 순으로 정리
          </button>
        </div>

        <Reorder.Group axis="y" values={ids} onReorder={reorderPlan} className="space-y-3">
          {ids.map((id, i) => {
            const spot = getSpotById(id);
            if (!spot) return null;
            return <PlanListItem key={id} id={id} spot={spot} index={i} total={total} />;
          })}
        </Reorder.Group>
      </div>
    </div>
  );
}
