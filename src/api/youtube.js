import { getCached, setCached } from "../utils/cache";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = "https://youtube.googleapis.com/youtube/v3";

function getErrorMessage(status, data) {
  const reason = data?.error?.errors?.[0]?.reason;
  const message = data?.error?.message;

  if (status === 403) {
    if (reason === "quotaExceeded") {
      return "The API quota has been reached. Please try again later.";
    }

    if (reason === "accessNotConfigured") {
      return "The YouTube API is not enabled for this key.";
    }

    if (reason === "forbidden") {
      return "Access denied (403). Check the API key restrictions.";
    }

    return message || "403: Access denied. Check the API key and quota.";
  }

  return message || `API error: ${status}`;
}

async function request(endpoint, params, signal) {
  if (!API_KEY) {
    throw new Error("API key missing. Create a .env file, see the README.");
  }

  const query = new URLSearchParams({ ...params, key: API_KEY });

  let response;

  try {
    response = await fetch(`${BASE_URL}/${endpoint}?${query}`, { signal });
  } catch (error) {
    // Cancelled requests are passed on so the caller can ignore them
    if (error.name === "AbortError") {
      throw error;
    }

    throw new Error(
      "Couldn't reach YouTube. Check your internet connection.",
    );
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(getErrorMessage(response.status, data));
  }

  return data;
}

// Returns a cached value if there is one. Otherwise loads it, caches it, and
// falls back to an older cached value if the request fails (for example when
// the API quota has been used up).
async function withCache(cacheKey, load) {
  const cached = getCached(cacheKey);

  if (cached) {
    return cached;
  }

  try {
    const value = await load();
    const isEmpty =
      value === null || (Array.isArray(value) && value.length === 0);

    if (!isEmpty) {
      setCached(cacheKey, value);
    }

    return value;
  } catch (error) {
    if (error.name === "AbortError") {
      throw error;
    }

    const stale = getCached(cacheKey, { allowStale: true });

    if (stale) {
      return stale;
    }

    throw error;
  }
}

// Searches, then fetches full details (statistics etc.) for the hits.
export function searchVideos(query, maxResults, signal) {
  const cacheKey = `search:${query.toLowerCase().trim()}:${maxResults}`;

  return withCache(cacheKey, async () => {
    const searchData = await request(
      "search",
      { part: "snippet", type: "video", maxResults, q: query },
      signal,
    );

    const ids = (searchData?.items ?? [])
      .map((item) => item.id?.videoId)
      .filter(Boolean)
      .join(",");

    if (!ids) {
      return [];
    }

    const videosData = await request(
      "videos",
      { part: "snippet,statistics", id: ids },
      signal,
    );

    return videosData?.items ?? [];
  });
}

export function getVideo(videoId, signal) {
  return withCache(`video:${videoId}`, async () => {
    const data = await request(
      "videos",
      { part: "snippet,statistics", id: videoId },
      signal,
    );

    return data?.items?.[0] ?? null;
  });
}

export function getChannel(channelId, signal) {
  return withCache(`channel:${channelId}`, async () => {
    const data = await request(
      "channels",
      { part: "snippet,statistics", id: channelId },
      signal,
    );

    return data?.items?.[0] ?? null;
  });
}

// Comments sorted by most likes. plainText gives text without HTML tags.
export function getComments(videoId, signal) {
  return withCache(`comments:${videoId}`, async () => {
    const data = await request(
      "commentThreads",
      { part: "snippet", maxResults: 25, videoId, textFormat: "plainText" },
      signal,
    );

    return [...(data?.items ?? [])].sort(
      (a, b) =>
        b.snippet.topLevelComment.snippet.likeCount -
        a.snippet.topLevelComment.snippet.likeCount,
    );
  });
}
