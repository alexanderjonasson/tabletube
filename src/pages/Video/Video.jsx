import { useParams } from "react-router-dom";
import "./Video.css";
import VideoPlayer from "../../components/PlayVideo/VideoPlayer";
import RelatedVideos from "../../components/Recommended/RelatedVideos";

const Video = () => {
  const { categoryId, videoId } = useParams();

  return (
    <div className="play-container">
      <VideoPlayer videoId={videoId} />
      <RelatedVideos categoryId={categoryId} currentVideoId={videoId} />
    </div>
  );
};

export default Video;
