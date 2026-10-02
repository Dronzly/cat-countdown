export interface SavedCountdown {
  target: number; // epoch ms of exam
  startedAt: number; // epoch ms when countdown was set
}

const STORAGE_KEY = "cat-countdown";

export function loadCountdown(): SavedCountdown | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const v = JSON.parse(raw);
    if (typeof v?.target === "number" && typeof v?.startedAt === "number") return v;
  } catch {
    /* ignore corrupt data */
  }
  return null;
}

export function saveCountdown(c: SavedCountdown) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
}

export function clearCountdown() {
  localStorage.removeItem(STORAGE_KEY);
}

export interface TimeParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
}

export function getRemaining(target: number, now: number): TimeParts {
  const diff = Math.max(0, target - now);
  const total = Math.floor(diff / 1000);
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
    done: diff <= 0,
  };
}

/** Parse "YYYY-MM-DD" + "HH:MM" as local time. */
export function toLocalTimestamp(date: string, time: string): number {
  const [y = 0, m = 1, d = 1] = date.split("-").map(Number);
  const [hh = 0, mm = 0] = time.split(":").map(Number);
  return new Date(y, m - 1, d, hh, mm, 0, 0).getTime();
}
