import { useAppStore } from "../../store/useAppStore";
import { getSpotById } from "../../data/spotIndex";
import { BottomSheet } from "../common/BottomSheet";
import { CategoryBadge, IndoorBadge, PriceBadge, ReservationBadge } from "../common/Badge";
import { ExternalLinkIcon, HeartIcon, MapPinIcon, XIcon } from "../icons";
import { formatDateRange } from "../../utils/date";

export function SpotDetailSheet() {
  const selectedItemForDetail = useAppStore((s) => s.selectedItemForDetail);
  const closeDetail = useAppStore((s) => s.closeDetail);
  const isSaved = useAppStore((s) => (selectedItemForDetail ? s.isSaved(selectedItemForDetail) : false));
  const togglePlan = useAppStore((s) => s.togglePlan);

  const spot = selectedItemForDetail ? getSpotById(selectedItemForDetail) : undefined;

  return (
    <BottomSheet open={Boolean(spot)} onClose={closeDetail}>
      {spot && (
        <div className="pb-8">
          <div className="relative w-full aspect-[4/3]">
            <img src={spot.imageUrl} alt={spot.title} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <button
              onClick={closeDetail}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 backdrop-blur flex items-center justify-center text-white"
              aria-label="닫기"
            >
              <XIcon size={18} />
            </button>
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
              <CategoryBadge category={spot.category} accentColor={spot.accentColor} />
              <PriceBadge />
            </div>
          </div>

          <div className="px-5 pt-5 space-y-5">
            <div>
              <h2 className="text-2xl font-black text-zp-text leading-tight">{spot.title}</h2>
              <div className="flex items-center gap-1.5 text-sm text-zp-sub mt-2">
                <MapPinIcon size={15} />
                <span>{spot.locationName}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <InfoRow label="주소" value={spot.address} />
              <InfoRow label="운영 기간" value={formatDateRange(spot.startDate, spot.endDate)} />
              <InfoRow label="운영 시간" value={spot.openHours} />
              <InfoRow label="가격" value="₩0" accent={spot.accentColor} />
            </div>

            <div className="flex flex-wrap gap-1.5">
              <ReservationBadge required={spot.reservationRequired} />
              <IndoorBadge indoor={spot.indoor} />
              {spot.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full px-2.5 py-1 text-[11px] font-medium text-zp-sub bg-white/5 border border-zp-line"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="space-y-2">
              <p className="text-sm text-zp-text leading-relaxed">{spot.description}</p>
              <p
                className="text-sm leading-relaxed rounded-2xl border px-4 py-3"
                style={{ borderColor: `${spot.accentColor}55`, backgroundColor: `${spot.accentColor}14`, color: spot.accentColor }}
              >
                {spot.recommendedReason}
              </p>
            </div>

            <div className="flex gap-2 pt-1">
              <a
                href={spot.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 rounded-full bg-white/8 border border-zp-line py-3.5 text-sm font-semibold text-zp-text"
              >
                원본 페이지 보기
                <ExternalLinkIcon size={15} />
              </a>
              <button
                onClick={() => togglePlan(spot.id)}
                className="flex-1 flex items-center justify-center gap-1.5 rounded-full py-3.5 text-sm font-bold text-black"
                style={{ backgroundColor: isSaved ? "#F5F5F5" : spot.accentColor }}
              >
                <HeartIcon size={16} filled />
                {isSaved ? "0원 플랜에서 제거" : "0원 플랜에 추가"}
              </button>
            </div>
          </div>
        </div>
      )}
    </BottomSheet>
  );
}

function InfoRow({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div className="rounded-2xl bg-white/5 border border-zp-line px-3.5 py-3">
      <p className="text-[11px] text-zp-sub">{label}</p>
      <p className="text-sm font-bold mt-0.5 truncate" style={{ color: accent ?? "#F5F5F5" }}>
        {value}
      </p>
    </div>
  );
}
