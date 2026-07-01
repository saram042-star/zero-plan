import type { ReactNode } from "react";
import clsx from "clsx";

interface BadgeProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Badge({ children, className, style }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide",
        className,
      )}
      style={style}
    >
      {children}
    </span>
  );
}

export function PriceBadge({ className }: { className?: string }) {
  return (
    <Badge className={clsx("bg-zp-text text-black font-black", className)}>₩0</Badge>
  );
}

export function CategoryBadge({ category, accentColor }: { category: string; accentColor?: string }) {
  return (
    <Badge
      className="backdrop-blur-md border"
      style={{
        backgroundColor: accentColor ? `${accentColor}26` : "rgba(255,255,255,0.08)",
        borderColor: accentColor ? `${accentColor}66` : "rgba(255,255,255,0.2)",
        color: accentColor ?? "#F5F5F5",
      }}
    >
      {category}
    </Badge>
  );
}

export function ReservationBadge({ required }: { required: boolean }) {
  return (
    <Badge
      className={clsx(
        "border",
        required
          ? "bg-white/10 border-white/25 text-zp-text"
          : "bg-white/5 border-white/10 text-zp-sub",
      )}
    >
      {required ? "예약 필요" : "예약 불필요"}
    </Badge>
  );
}

export function IndoorBadge({ indoor }: { indoor: boolean }) {
  return (
    <Badge className="bg-white/5 border border-white/10 text-zp-sub">
      {indoor ? "실내" : "야외"}
    </Badge>
  );
}
