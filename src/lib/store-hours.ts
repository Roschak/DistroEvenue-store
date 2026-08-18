export interface DayHours {
  day: string;
  open: string;
  close: string;
}

export const WEEKLY_HOURS: DayHours[] = [
  { day: "MON", open: "09:00", close: "21:00" },
  { day: "TUE", open: "09:00", close: "21:00" },
  { day: "WED", open: "09:00", close: "21:00" },
  { day: "THU", open: "09:00", close: "21:00" },
  { day: "FRI", open: "13:00", close: "21:00" },
  { day: "SAT", open: "09:00", close: "21:00" },
  { day: "SUN", open: "09:00", close: "21:00" },
];

/** minutes since midnight per weekday (0 = Sunday). */
const MINUTES: Record<number, { open: number; close: number }> = {
  0: { open: 9 * 60, close: 21 * 60 },
  1: { open: 9 * 60, close: 21 * 60 },
  2: { open: 9 * 60, close: 21 * 60 },
  3: { open: 9 * 60, close: 21 * 60 },
  4: { open: 9 * 60, close: 21 * 60 },
  5: { open: 13 * 60, close: 21 * 60 },
  6: { open: 9 * 60, close: 21 * 60 },
};

export interface StoreStatus {
  open: boolean;
  label: "OPEN NOW" | "CLOSED";
  message: string;
  today: DayHours;
  minutesUntilClose?: number;
}

/**
 * Dynamically computes whether the store is open, in the
 * Asia/Jakarta timezone, from configured business hours.
 */
export function getStoreStatus(now: Date = new Date()): StoreStatus {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Jakarta",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });
  const parts = fmt.formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";

  const dayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  const day = dayMap[get("weekday")] ?? 0;
  const hour = parseInt(get("hour"), 10) || 0;
  const minute = parseInt(get("minute"), 10) || 0;
  const nowMin = hour * 60 + minute;

  const { open, close } = MINUTES[day];
  const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const today =
    WEEKLY_HOURS.find((h) => h.day === dayNames[day]) ?? WEEKLY_HOURS[0];

  const isOpen = nowMin >= open && nowMin < close;

  if (isOpen) {
    const minutesUntilClose = close - nowMin;
    const h = Math.floor(minutesUntilClose / 60);
    const m = minutesUntilClose % 60;
    const suffix = h > 0 ? `${h}h ${m}m` : `${m}m`;
    return {
      open: true,
      label: "OPEN NOW",
      message: `Closes at ${today.close} · ${suffix} left`,
      today,
      minutesUntilClose,
    };
  }

  if (nowMin < open) {
    const h = Math.floor((open - nowMin) / 60);
    const m = (open - nowMin) % 60;
    const suffix = h > 0 ? `${h}h ${m}m` : `${m}m`;
    return {
      open: false,
      label: "CLOSED",
      message: `Opens at ${today.open} · in ${suffix}`,
      today,
    };
  }

  return {
    open: false,
    label: "CLOSED",
    message: `Opens tomorrow at 09:00`,
    today,
  };
}
