const PREFIX = "tabletube:";
const TTL_MS = 15 * 60 * 1000;

const memory = new Map();

function readEntry(fullKey) {
  if (memory.has(fullKey)) {
    return memory.get(fullKey);
  }

  try {
    const entry = JSON.parse(localStorage.getItem(fullKey));

    if (entry) {
      memory.set(fullKey, entry);
    }

    return entry;
  } catch {
    return null;
  }
}

// Returns the stored value, or null if it is missing or too old.
// With allowStale, old values are returned too (used as a fallback on errors).
export function getCached(key, { allowStale = false } = {}) {
  const entry = readEntry(PREFIX + key);

  if (!entry || entry.value === undefined) {
    return null;
  }

  const isFresh = Date.now() - entry.timestamp <= TTL_MS;

  return isFresh || allowStale ? entry.value : null;
}

export function setCached(key, value) {
  const entry = { timestamp: Date.now(), value };

  memory.set(PREFIX + key, entry);

  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(entry));
  } catch {
    // localStorage can be full or blocked, the in-memory cache is enough then
  }
}
