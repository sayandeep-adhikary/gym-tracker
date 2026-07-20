/**
 * Streak & weekly-activity helpers derived from the persisted workout history.
 * Shared by the home streak card and the progress dashboard so both always
 * agree on the numbers.
 */

/** Short weekday labels, Monday-first. */
export const WEEK_LABELS = ["M", "T", "W", "T", "F", "S", "S"] as const;

/** Format a `Date` as a local `YYYY-MM-DD` string. */
export function toISODate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

/** The Monday (00:00 local) of the week containing `date`. */
export function startOfWeek(date: Date): Date {
  const result = new Date(date);
  const offset = (result.getDay() + 6) % 7; // Monday = 0
  result.setDate(result.getDate() - offset);
  result.setHours(0, 0, 0, 0);
  return result;
}

/**
 * The current streak: consecutive days (ending today, or yesterday if today
 * isn't logged yet) that have a completed workout. A `resetDate` (inclusive)
 * stops the count, so "Reset streak" in settings zeroes it.
 */
export function computeStreak(
  dates: Set<string>,
  resetDate: string | null,
): number {
  const cursor = new Date();
  if (!dates.has(toISODate(cursor))) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  while (true) {
    const iso = toISODate(cursor);
    if (!dates.has(iso)) break;
    if (resetDate && iso <= resetDate) break;
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

/** The longest run of consecutive logged days in the whole history. */
export function computeBestStreak(dates: Set<string>): number {
  if (dates.size === 0) return 0;
  const sorted = [...dates].sort();
  let best = 1;
  let run = 1;
  for (let i = 1; i < sorted.length; i += 1) {
    const prev = new Date(`${sorted[i - 1]}T00:00:00`);
    const current = new Date(`${sorted[i]}T00:00:00`);
    const diffDays = Math.round(
      (current.getTime() - prev.getTime()) / 86_400_000,
    );
    if (diffDays === 1) {
      run += 1;
      best = Math.max(best, run);
    } else if (diffDays > 1) {
      run = 1;
    }
  }
  return best;
}

/** One entry per day of the current week, marking which days were trained. */
export function weekActivity(
  dates: Set<string>,
): Array<{ label: string; done: boolean; isToday: boolean }> {
  const weekStart = startOfWeek(new Date());
  const todayIso = toISODate(new Date());
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + index);
    const iso = toISODate(date);
    return {
      label: WEEK_LABELS[index] ?? "",
      done: dates.has(iso),
      isToday: iso === todayIso,
    };
  });
}
