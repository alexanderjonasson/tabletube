import { Link } from "react-router-dom";
import { useVideos } from "../../hooks/useVideos";
import { formatCount, formatTimeAgo } from "../../utils/format";
import ErrorState from "../ErrorState/ErrorState";
import "./VideoGrid.css";

const VideoGrid = ({ query }) => {
  const { videos, loading, error } = useVideos(query, 25);

  if (loading) {
    return <div className="feed">Loading the Astronomicon...</div>;
  }

  if (error) {
    return (
      <div className="feed">
        <ErrorState title="Something went wrong" message={error} />
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="feed">
        <ErrorState
          title="No results found"
          message="Try searching for something less heretical."
        />
      </div>
    );
  }

  return (
    <div className="feed">
      {videos.map((item) => (
        <Link
          key={item.id}
          to={`/video/${item.snippet.categoryId}/${item.id}`}
          className="card">
          <img src={item.snippet.thumbnails?.medium?.url} alt="" />
          <h2>{item.snippet.title}</h2>
          <h3>{item.snippet.channelTitle}</h3>
          <p>
            {formatCount(item.statistics?.viewCount)} views &bull;{" "}
            {formatTimeAgo(item.snippet.publishedAt)}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default VideoGrid;
