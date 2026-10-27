import "./About.css";
import feather from "../../assets/feather.gif";
import puritySeal from "../../assets/purity_seal.webp";

function About() {
  return (
    <div className="about">
      <div className="about-content">
        <div
          className="seal"
          style={{ backgroundImage: `url(${puritySeal})` }}
          aria-hidden="true"
        />

        <img
          src={feather}
          alt=""
          className="feather"
          aria-hidden="true"
        />

        <div className="about-inner">
          <h1>About TableTube</h1>

          <section>
            <p>
              TableTube is a Warhammer-inspired YouTube experience built for
              fans of tabletop gaming. Explore videos about gaming,
              entertainment, music, and lore, or search for your favorite
              content, all in one place dedicated to the hobby.
            </p>
          </section>

          <section>
            <h2>How It Works</h2>
            <p>
              Videos are fetched using the YouTube Data API and played through
              YouTube's embedded player. Each video page includes channel
              information, top-rated comments, and related videos.
            </p>
          </section>

          <section>
            <h2>Technology</h2>
            <p>
              TableTube is built with React, React Router, and Vite. To make
              efficient use of the YouTube API's daily quota, searches are
              debounced, ongoing requests are cancelled when a new search
              begins, and results are cached for 15 minutes. If the quota is
              exceeded, a clear error message is displayed while previously
              cached results remain available.
            </p>
          </section>

          <section>
            <h2>Design</h2>
            <p>
              Inspired by the dark, atmospheric world of Warhammer, TableTube
              combines muted colors, thematic icons, and parchment-inspired
              elements to create a distinctive browsing experience.
            </p>
          </section>

          <section>
            <p className="disclaimer">
              TableTube is a fan project and is not affiliated with or endorsed
              by Games Workshop or YouTube. Warhammer and Warhammer 40,000 are
              trademarks of Games Workshop.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default About;
