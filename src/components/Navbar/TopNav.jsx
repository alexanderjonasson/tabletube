import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./TopNav.css";
import logo_icon from "../../assets/logga.webp";
import menue_icon from "../../assets/menue_icon.png";
import more_icon from "../../assets/more_icon.png";
import notification_icon from "../../assets/notification_icon.png";
import profile_icon from "../../assets/profile_icon.webp";
import search_icon from "../../assets/search_icon.png";
import upload_icon from "../../assets/upload_icon.png";

const SEARCH_DEBOUNCE_MS = 500;

const TopNav = ({ setSidebar, setSearchTerm }) => {
  const [value, setValue] = useState("");
  const timerRef = useRef(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  function applySearch(text) {
    setSearchTerm(text.trim());

    if (pathname !== "/") {
      navigate("/");
    }
  }

  function handleChange(event) {
    const next = event.target.value;

    setValue(next);
    clearTimeout(timerRef.current);

    if (next.trim() === "") {
      applySearch("");
      return;
    }

    timerRef.current = setTimeout(() => applySearch(next), SEARCH_DEBOUNCE_MS);
  }

  function handleSubmit(event) {
    event.preventDefault();
    clearTimeout(timerRef.current);
    applySearch(value);
  }

  function handleLogoClick() {
    clearTimeout(timerRef.current);
    setSearchTerm("");
    setValue("");
  }

  return (
    <nav className="flex-div">
      <div className="nav-left flex-div">
        <button
          type="button"
          className="menu-button"
          aria-label="Show or hide the sidebar"
          onClick={() => setSidebar((prev) => !prev)}>
          <img className="menu-icon" src={menue_icon} alt="" />
        </button>

        <Link to="/" onClick={handleLogoClick}>
          <img className="logo" src={logo_icon} alt="TableTube" />
        </Link>
      </div>

      <div className="nav-middle flex-div">
        <form className="search-box flex-div" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search"
            aria-label="Search"
            value={value}
            onChange={handleChange}
          />
          <button type="submit" aria-label="Search">
            <img src={search_icon} alt="" />
          </button>
        </form>
      </div>

      <div className="nav-right flex-div" aria-hidden="true">
        <img src={upload_icon} alt="" />
        <img src={more_icon} alt="" />
        <img src={notification_icon} alt="" />
        <img src={profile_icon} className="user-icon" alt="" />
      </div>
    </nav>
  );
};

export default TopNav;
