import { motion } from "framer-motion";
import type { Spot } from "../../types/spot";
import { useAppStore } from "../../store/useAppStore";
import { CategoryBadge, IndoorBadge, PriceBadge, ReservationBadge } from "../common/Badge";
import { ClockIcon, HeartIcon, MapPinIcon } from "../icons";

export function SpotListItem({ spot }: { spot: Spot }) {
  const isSaved = useAppStore((s) => s.isSaved(spot.id));
  const togglePlan = useAppStore((s) => s.togglePlan);
  const openDetail = useAppStore((s) => s.openDetail);

  return (
    <div className="rounded-3xl bg-zp-surface border border-zp-line overflow-hidden">
      <button
        onClick={() => openDetail(spot.id)}
        className="relative block w-full aspect-[16/10] text-left"
      >
        <img
          src={spot.imageUrl}
          alt={spot.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
        <div className="absolute top-3 inset-x-3 flex items-center justify-between">
          <CategoryBadge category={spot.category} accentColor={spot.accentColor} />
          <PriceBadge />
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-lg font-bold text-white leading-snug">{spot.title}</h3>
        </div>
      </button>

      <div className="p-4 space-y-3">
        <div className="flex items-center gap-1.5 text-[13px] text-zp-sub">
          <MapPinIcon size={14} />
          <span>
            {spot.locationName} · {spot.district}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[13px] text-zp-sub">
          <ClockIcon size={14} />
          <span>{spot.openHours}</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <ReservationBadge required={spot.reservationRequired} />
          <IndoorBadge indoor={spot.indoor} />
          {spot.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full px-2.5 py-1 text-[11px] font-medium text-zp-sub bg-white/5 border border-zp-line"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 pt-1">
          <motion.button
            onClick={() => togglePlan(spot.id)}
            whileTap={{ scale: 0.85 }}
            animate={isSaved ? { scale: [1, 1.25, 1] } : { scale: 1 }}
            transition={{ duration: 0.32 }}
            className="w-11 h-11 shrink-0 rounded-full border border-zp-line flex items-center justify-center"
            style={{
              backgroundColor: isSaved ? `${spot.accentColor}26` : "transparent",
              color: isSaved ? spot.accentColor : "#F5F5F5",
            }}
            aria-label="0원 플랜에 저장"
          >
            <HeartIcon size={18} filled={isSaved} />
          </motion.button>
          <button
            onClick={() => openDetail(spot.id)}
            className="flex-1 rounded-full bg-white/8 border border-zp-line py-2.5 text-sm font-semibold text-zp-text"
          >
            자세히 보기
          </button>
        </div>
      </div>
    </div>
  );
}
