import { Link } from "react-router-dom";
import "./RelatedVideos.css";
import { getRelatedQuery } from "../../data/categories";
import { useVideos } from "../../hooks/useVideos";
import { formatCount } from "../../utils/format";

const RelatedVideos = ({ categoryId, currentVideoId }) => {
  const { videos } = useVideos(getRelatedQuery(categoryId), 12);

  return (
    <div className="recommended">
      {videos
        .filter((item) => item.id !== currentVideoId)
        .map((item) => (
          <Link
            key={item.id}
            to={`/video/${item.snippet.categoryId}/${item.id}`}
            className="side-video-list">
            <img src={item.snippet.thumbnails?.medium?.url} alt="" />
            <div className="vid-info">
              <h4>{item.snippet.title}</h4>
              <p>{item.snippet.channelTitle}</p>
              <p>{formatCount(item.statistics?.viewCount)} views</p>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default RelatedVideos;
