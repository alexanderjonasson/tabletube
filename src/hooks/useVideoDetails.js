import { useEffect, useState } from "react";
import { getChannel, getComments, getVideo } from "../api/youtube";

const EMPTY = { video: null, channel: null, comments: [], error: "" };

// Channel and comments are extra information. If they fail (for example when
// comments are disabled) the video is shown anyway.
function optional(promise, fallback) {
  return promise.catch((error) => {
    if (error.name === "AbortError") {
      throw error;
    }

    return fallback;
  });
}

export function useVideoDetails(videoId) {
  const [details, setDetails] = useState({ videoId: null, ...EMPTY });

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    async function load() {
      try {
        const commentsPromise = optional(getComments(videoId, signal), []);
        const video = await getVideo(videoId, signal);

        if (!video) {
          throw new Error("Video not found.");
        }

        const channelPromise = optional(
          getChannel(video.snippet.channelId, signal),
          null,
        );

        const [channel, comments] = await Promise.all([
          channelPromise,
          commentsPromise,
        ]);

        setDetails({ videoId, video, channel, comments, error: "" });
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }

        setDetails({ videoId, ...EMPTY, error: error.message });
      }
    }

    load();

    return () => controller.abort();
  }, [videoId]);

  if (details.videoId !== videoId) {
    return { ...EMPTY, loading: true };
  }

  return { ...details, loading: false };
}
