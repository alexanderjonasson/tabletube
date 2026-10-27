import { useState } from "react";
import "./Home.css";
import CategoryNav from "../../components/Sidebar/CategoryNav";
import VideoGrid from "../../components/Feed/VideoGrid";
import { getCategoryById } from "../../data/categories";

const Home = ({ sidebar, searchTerm }) => {
  const [categoryId, setCategoryId] = useState("home");

  const query = searchTerm || getCategoryById(categoryId).query;

  return (
    <>
      <CategoryNav
        sidebar={sidebar}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
      />
      <div className={`container ${sidebar ? "" : "large-container"}`}>
        <VideoGrid query={query} />
      </div>
    </>
  );
};

export default Home;
