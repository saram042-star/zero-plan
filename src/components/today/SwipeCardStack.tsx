import { useEffect, useRef } from "react";
import { animate, motion, useMotionValue, useTransform, type PanInfo } from "framer-motion";
import { useAppStore } from "../../store/useAppStore";
import { getSpotById } from "../../data/spotIndex";
import { PosterCard } from "./PosterCard";
import { EmptyState } from "../common/EmptyState";
import { HeartIcon, SparkleIcon, XIcon } from "../icons";

const STACK_VISIBLE = 3;
const SWIPE_DISTANCE_THRESHOLD = 110;
const SWIPE_VELOCITY_THRESHOLD = 500;

export function SwipeCardStack() {
  const recommendationOrder = useAppStore((s) => s.recommendationOrder);
  const currentRecommendationIndex = useAppStore((s) => s.currentRecommendationIndex);
  const saveCurrentRecommendation = useAppStore((s) => s.saveCurrentRecommendation);
  const skipCurrentRecommendation = useAppStore((s) => s.skipCurrentRecommendation);
  const resetRecommendations = useAppStore((s) => s.resetRecommendations);
  const openDetail = useAppStore((s) => s.openDetail);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-320, 320], [-16, 16]);
  const cardOpacity = useTransform(x, [-600, -260, 0, 260, 600], [0, 1, 1, 1, 0]);
  const likeStampOpacity = useTransform(x, [20, 120], [0, 1]);
  const passStampOpacity = useTransform(x, [-120, -20], [1, 0]);

  const isExitingRef = useRef(false);

  useEffect(() => {
    x.set(0);
    isExitingRef.current = false;
  }, [currentRecommendationIndex, x]);

  const visibleSpots = recommendationOrder
    .slice(currentRecommendationIndex, currentRecommendationIndex + STACK_VISIBLE)
    .map((id) => getSpotById(id))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const total = recommendationOrder.length;

  function triggerExit(direction: "left" | "right") {
    if (isExitingRef.current) return;
    isExitingRef.current = true;
    animate(x, direction === "right" ? 640 : -640, {
      duration: 0.32,
      ease: "easeIn",
      onComplete: () => {
        if (direction === "right") saveCurrentRecommendation();
        else skipCurrentRecommendation();
      },
    });
  }

  function handleDragEnd(_: unknown, info: PanInfo) {
    if (isExitingRef.current) return;
    const passedDistance = Math.abs(info.offset.x) > SWIPE_DISTANCE_THRESHOLD;
    const passedVelocity = Math.abs(info.velocity.x) > SWIPE_VELOCITY_THRESHOLD;
    if (passedDistance || passedVelocity) {
      triggerExit(info.offset.x > 0 ? "right" : "left");
    } else {
      animate(x, 0, { type: "spring", stiffness: 400, damping: 32 });
    }
  }

  if (visibleSpots.length === 0) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 flex items-center justify-center">
          <EmptyState
            icon={<SparkleIcon size={26} />}
            title="오늘의 추천을 모두 확인했어요"
            description={"새로운 추천이 궁금하다면\n처음부터 다시 살펴볼 수 있어요."}
            action={
              <button
                onClick={resetRecommendations}
                className="mt-2 rounded-full bg-zp-text text-black font-bold text-sm px-6 py-3"
              >
                처음부터 다시 보기
              </button>
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="relative flex-1 px-5 pt-2 pb-3">
        <div className="pointer-events-none absolute top-2 left-5 z-20 select-none">
          <span className="text-5xl font-black text-white/90 tabular-nums">
            {String(currentRecommendationIndex + 1).padStart(2, "0")}
          </span>
          <span className="text-sm font-semibold text-white/40 ml-1">/ {String(total).padStart(2, "0")}</span>
        </div>

        <div className="relative w-full h-full">
          {visibleSpots.map((spot, i) => {
            const isTop = i === 0;
            return (
              <motion.div
                key={spot.id}
                className="absolute inset-0"
                style={{
                  zIndex: visibleSpots.length - i,
                  x: isTop ? x : 0,
                  rotate: isTop ? rotate : 0,
                  opacity: isTop ? cardOpacity : undefined,
                }}
                initial={false}
                animate={{
                  scale: 1 - i * 0.045,
                  y: i * 16,
                  opacity: isTop ? undefined : i === 2 ? 0.55 : 1,
                }}
                transition={{ type: "spring", stiffness: 320, damping: 30 }}
                drag={isTop ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.85}
                onDragEnd={isTop ? handleDragEnd : undefined}
                onTap={isTop ? () => openDetail(spot.id) : undefined}
              >
                <div className="w-full h-full aspect-[3/4]">
                  <PosterCard spot={spot} />
                </div>

                {isTop && (
                  <>
                    <motion.div
                      style={{ opacity: likeStampOpacity }}
                      className="absolute top-8 right-6 rotate-[-12deg] rounded-xl border-4 border-emerald-400 px-3 py-1 text-emerald-400 font-black text-xl tracking-wider"
                    >
                      SAVE
                    </motion.div>
                    <motion.div
                      style={{ opacity: passStampOpacity }}
                      className="absolute top-8 left-6 rotate-[12deg] rounded-xl border-4 border-white/60 px-3 py-1 text-white/60 font-black text-xl tracking-wider"
                    >
                      PASS
                    </motion.div>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-center gap-6 pb-4 pt-1">
        <button
          onClick={() => triggerExit("left")}
          className="w-14 h-14 rounded-full bg-white/8 border border-zp-line flex items-center justify-center text-zp-text active:scale-90 transition-transform"
          aria-label="넘기기"
        >
          <XIcon size={24} />
        </button>
        <button
          onClick={() => triggerExit("right")}
          className="w-16 h-16 rounded-full flex items-center justify-center text-black active:scale-90 transition-transform shadow-card"
          style={{ backgroundColor: visibleSpots[0]?.accentColor ?? "#F5F5F5" }}
          aria-label="0원 플랜에 저장"
        >
          <HeartIcon size={26} filled />
        </button>
      </div>
    </div>
  );
}
