import { useEffect, useState } from "react";
import { searchVideos } from "../api/youtube";

export function useVideos(query, maxResults) {
  // Stores which query the result belongs to, so loading can be derived
  // instead of being set manually in the effect
  const [result, setResult] = useState({ query: null, videos: [], error: "" });

  useEffect(() => {
    const controller = new AbortController();

    searchVideos(query, maxResults, controller.signal)
      .then((videos) => setResult({ query, videos, error: "" }))
      .catch((error) => {
        if (error.name === "AbortError") {
          return;
        }

        setResult({ query, videos: [], error: error.message });
      });

    return () => controller.abort();
  }, [query, maxResults]);

  return {
    videos: result.videos,
    error: result.error,
    loading: result.query !== query,
  };
}
