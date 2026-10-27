const relativeTime = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

const TIME_UNITS = [
  ["year", 365 * 24 * 60 * 60],
  ["month", 30 * 24 * 60 * 60],
  ["week", 7 * 24 * 60 * 60],
  ["day", 24 * 60 * 60],
  ["hour", 60 * 60],
  ["minute", 60],
];

// 1500 -> "1K", 2300000 -> "2M"
export function formatCount(value) {
  const count = Number(value);

  if (Number.isNaN(count)) {
    return "";
  }

  if (count >= 1000000) {
    return `${Math.floor(count / 1000000)}M`;
  }

  if (count >= 1000) {
    return `${Math.floor(count / 1000)}K`;
  }

  return String(count);
}

// "2024-05-01T10:00:00Z" -> "2 years ago"
export function formatTimeAgo(dateString) {
  const seconds = (new Date(dateString).getTime() - Date.now()) / 1000;

  for (const [unit, unitSeconds] of TIME_UNITS) {
    if (Math.abs(seconds) >= unitSeconds) {
      return relativeTime.format(Math.round(seconds / unitSeconds), unit);
    }
  }

  return relativeTime.format(Math.round(seconds), "second");
}
