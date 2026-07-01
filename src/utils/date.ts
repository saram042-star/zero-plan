function toDateOnly(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function isTodayAvailable(startDate: string, endDate: string, today = new Date()): boolean {
  const t = toDateOnly(today).getTime();
  const start = toDateOnly(new Date(startDate)).getTime();
  const end = toDateOnly(new Date(endDate)).getTime();
  return start <= t && t <= end;
}

export function isThisWeekAvailable(startDate: string, endDate: string, today = new Date()): boolean {
  const t0 = toDateOnly(today);
  const weekEnd = new Date(t0);
  weekEnd.setDate(weekEnd.getDate() + 7);
  const start = toDateOnly(new Date(startDate)).getTime();
  const end = toDateOnly(new Date(endDate)).getTime();
  return start <= weekEnd.getTime() && end >= t0.getTime();
}

/** 상설전시처럼 2년 이상 이어지는 일정은 "상설"로 표기 */
export function isLongRunning(startDate: string, endDate: string): boolean {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  return end - start > 1000 * 60 * 60 * 24 * 365 * 1.5;
}

export function formatDateRange(startDate: string, endDate: string): string {
  if (isLongRunning(startDate, endDate)) return "상설 운영";
  if (startDate === endDate) return formatMonthDay(startDate);
  return `${formatMonthDay(startDate)} - ${formatMonthDay(endDate)}`;
}

function formatMonthDay(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}.${d.getDate()}`;
}
