import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ErrorState from "./components/ErrorState/ErrorState";
import TopNav from "./components/Navbar/TopNav";
import About from "./pages/About/About";
import Home from "./pages/Home/Home";
import Video from "./pages/Video/Video";

const App = () => {
  const [sidebar, setSidebar] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <TopNav setSidebar={setSidebar} setSearchTerm={setSearchTerm} />

      <div className="app-content">
        <Routes>
          <Route
            path="/"
            element={<Home sidebar={sidebar} searchTerm={searchTerm} />}
          />
          <Route path="/video/:categoryId/:videoId" element={<Video />} />
          <Route path="/about" element={<About />} />
          <Route
            path="*"
            element={
              <ErrorState
                title="Page not found"
                message="The address you entered doesn't exist in TableTube."
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
