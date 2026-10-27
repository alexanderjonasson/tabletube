import { Link } from "react-router-dom";
import "./CategoryNav.css";
import blog from "../../assets/blog_icon.webp";
import candleSkull from "../../assets/candle_skull.gif";
import darkangel from "../../assets/darkangel.png";
import entertainment from "../../assets/entertainment_icon.png";
import gaming from "../../assets/gaming_icon.png";
import greyknight from "../../assets/greyknight.png";
import home from "../../assets/home_icon.png";
import majorkill from "../../assets/majorkill.png";
import music from "../../assets/music_icon.png";
import terminator from "../../assets/terminator.png";
import worldeater from "../../assets/worldeater.png";
import { MAIN_CATEGORIES, THEME_CATEGORIES } from "../../data/categories";

const ICONS = {
  home,
  gaming,
  entertainment,
  music,
  lore: blog,
  "titan-lore": greyknight,
  majorkill,
  "macragge-news": terminator,
  "the-rock-lore": darkangel,
  "heretical-lore": worldeater,
};

const CategoryButton = ({ category, active, onSelect }) => (
  <button
    type="button"
    className={`side-link ${active ? "active" : ""}`}
    aria-label={category.label}
    aria-current={active ? "true" : undefined}
    onClick={() => onSelect(category.id)}>
    <img src={ICONS[category.id]} alt="" />
    <span>{category.label}</span>
  </button>
);

const CandleMarker = () => (
  <div className="side-link candle-only" aria-hidden="true">
    <img src={candleSkull} alt="" />
  </div>
);

const CategoryNav = ({ sidebar, categoryId, setCategoryId }) => {
  return (
    <div className={`sidebar ${sidebar ? "" : "small-sidebar"}`}>
      <div className="shortcut-links">
        {MAIN_CATEGORIES.map((category) => (
          <CategoryButton
            key={category.id}
            category={category}
            active={categoryId === category.id}
            onSelect={setCategoryId}
          />
        ))}
      </div>

      <div className="sub-list">
        <Link to="/about" className="about-big-btn">
          About TableTube
        </Link>

        <CandleMarker />

        {THEME_CATEGORIES.map((category) => (
          <CategoryButton
            key={category.id}
            category={category}
            active={categoryId === category.id}
            onSelect={setCategoryId}
          />
        ))}

        <CandleMarker />
      </div>
    </div>
  );
};

export default CategoryNav;
