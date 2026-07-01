import { Reorder, useDragControls } from "framer-motion";
import type { Spot } from "../../types/spot";
import { useAppStore } from "../../store/useAppStore";
import { CategoryBadge, PriceBadge } from "../common/Badge";
import { ChevronDownIcon, ChevronUpIcon, ClockIcon, GripIcon, XIcon } from "../icons";

interface PlanListItemProps {
  id: string;
  spot: Spot;
  index: number;
  total: number;
}

export function PlanListItem({ id, spot, index, total }: PlanListItemProps) {
  const dragControls = useDragControls();
  const movePlanItem = useAppStore((s) => s.movePlanItem);
  const removeFromPlan = useAppStore((s) => s.removeFromPlan);
  const openDetail = useAppStore((s) => s.openDetail);

  const isFirst = index === 0;
  const isLast = index === total - 1;

  return (
    <Reorder.Item value={id} dragListener={false} dragControls={dragControls} className="relative">
      {!isLast && (
        <div className="absolute left-[27px] top-[52px] bottom-[-13px] w-px border-l border-dashed border-zp-line" />
      )}
      <div className="relative flex items-center gap-3 rounded-2xl bg-zp-surface border border-zp-line p-3">
        <div className="flex flex-col items-center gap-1.5 shrink-0">
          <span
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-black"
            style={{ backgroundColor: spot.accentColor }}
          >
            {index + 1}
          </span>
          <div className="flex flex-col">
            <button
              disabled={isFirst}
              onClick={() => movePlanItem(id, "up")}
              className="text-zp-sub disabled:opacity-20"
              aria-label="순서 위로"
            >
              <ChevronUpIcon size={14} />
            </button>
            <button
              disabled={isLast}
              onClick={() => movePlanItem(id, "down")}
              className="text-zp-sub disabled:opacity-20"
              aria-label="순서 아래로"
            >
              <ChevronDownIcon size={14} />
            </button>
          </div>
        </div>

        <button onClick={() => openDetail(id)} className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
          <img src={spot.imageUrl} alt={spot.title} className="absolute inset-0 w-full h-full object-cover" />
        </button>

        <button onClick={() => openDetail(id)} className="flex-1 min-w-0 text-left">
          <div className="flex items-center gap-1.5 flex-wrap">
            <CategoryBadge category={spot.category} accentColor={spot.accentColor} />
            <PriceBadge />
          </div>
          <p className="font-bold text-sm text-zp-text truncate mt-1.5">{spot.title}</p>
          <div className="flex items-center gap-1 text-[12px] text-zp-sub mt-0.5">
            <ClockIcon size={12} />
            <span className="truncate">{spot.openHours}</span>
          </div>
        </button>

        <div className="flex flex-col items-center gap-3 shrink-0">
          <button onClick={() => removeFromPlan(id)} className="text-zp-sub" aria-label="삭제">
            <XIcon size={17} />
          </button>
          <div
            onPointerDown={(e) => dragControls.start(e)}
            className="cursor-grab active:cursor-grabbing text-zp-sub touch-none"
          >
            <GripIcon size={17} />
          </div>
        </div>
      </div>
    </Reorder.Item>
  );
}
