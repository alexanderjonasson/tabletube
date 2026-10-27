import "./VideoPlayer.css";
import like from "../../assets/like.png";
import user_profile from "../../assets/user_profile.jpg";
import { useVideoDetails } from "../../hooks/useVideoDetails";
import { formatCount, formatTimeAgo } from "../../utils/format";
import ErrorState from "../ErrorState/ErrorState";

const VideoPlayer = ({ videoId }) => {
  const { video, channel, comments, error, loading } =
    useVideoDetails(videoId);

  const subscribers = channel?.statistics?.subscriberCount;
  const commentCount = video?.statistics?.commentCount;
  const channelThumbnail = channel?.snippet?.thumbnails?.default?.url;

  return (
    <div className="play-video">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        title="YouTube video player"
      />

      {!loading && !video && (
        <ErrorState
          title="Couldn't load the video details"
          message={error || "The video may still play above."}
        />
      )}

      {video && (
        <>
          <h3>{video.snippet.title}</h3>

          <div className="play-video-info">
            <p>
              {formatCount(video.statistics?.viewCount)} views &bull;{" "}
              {formatTimeAgo(video.snippet.publishedAt)}
            </p>

            <div>
              <span>
                <img src={like} alt="" />
                {formatCount(video.statistics?.likeCount)}
              </span>
            </div>
          </div>

          <hr />

          <div className="publisher">
            {channelThumbnail && <img src={channelThumbnail} alt="" />}

            <div>
              <p>{video.snippet.channelTitle}</p>
              {subscribers && <span>{formatCount(subscribers)} subscribers</span>}
            </div>

            <a
              className="channel-link"
              href={`https://www.youtube.com/channel/${video.snippet.channelId}`}
              target="_blank"
              rel="noreferrer">
              View channel
            </a>
          </div>

          <div className="vid-description">
            <p>{video.snippet.description.slice(0, 200)}</p>
            <hr />

            {commentCount && <h4>{formatCount(commentCount)} comments</h4>}

            {comments.map((item) => {
              const comment = item.snippet.topLevelComment.snippet;

              return (
                <div key={item.id} className="comment">
                  <img
                    src={comment.authorProfileImageUrl || user_profile}
                    alt=""
                  />
                  <div>
                    <h3>
                      {comment.authorDisplayName}
                      <span>{formatTimeAgo(comment.publishedAt)}</span>
                    </h3>
                    <p>{comment.textDisplay}</p>
                    <div className="comment-action">
                      <img src={like} alt="" />
                      <span>{formatCount(comment.likeCount)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default VideoPlayer;
