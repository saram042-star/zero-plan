import type { Spot } from "../../types/spot";
import { CategoryBadge, PriceBadge, ReservationBadge } from "../common/Badge";
import { ClockIcon, MapPinIcon } from "../icons";
import { formatDateRange } from "../../utils/date";

export function PosterCard({ spot }: { spot: Spot }) {
  return (
    <div className="relative w-full h-full rounded-3xl overflow-hidden bg-zp-surface">
      <img
        src={spot.imageUrl}
        alt={spot.title}
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />

      <div className="absolute top-4 inset-x-4 flex items-start justify-between gap-2">
        <CategoryBadge category={spot.category} accentColor={spot.accentColor} />
        <PriceBadge />
      </div>

      <div className="absolute top-14 left-4">
        <ReservationBadge required={spot.reservationRequired} />
      </div>

      <div className="absolute bottom-0 inset-x-0 p-5 pb-6 space-y-2.5">
        <p className="text-[11px] font-semibold tracking-wide text-white/60">
          {formatDateRange(spot.startDate, spot.endDate)}
        </p>
        <h2 className="text-[28px] leading-[1.15] font-black text-white">{spot.title}</h2>
        <div className="flex items-center gap-1.5 text-[13px] text-white/80">
          <MapPinIcon size={14} />
          <span>
            {spot.locationName} · {spot.district}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[13px] text-white/65">
          <ClockIcon size={14} />
          <span>{spot.openHours}</span>
        </div>
        <p className="text-[13px] text-white/85 pt-2.5 mt-1 border-t border-white/15 leading-relaxed">
          {spot.recommendedReason}
        </p>
      </div>
    </div>
  );
}
