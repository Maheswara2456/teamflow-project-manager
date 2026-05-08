import "../../styles/dashboard/HeroSection.css";

import { useNavigate } from "react-router-dom";

function HeroSection({ userData }) {

  const navigate = useNavigate();

  const userName =
    userData?.name ||
    userData?.username ||
    "User";

  return (

    <section className="hero-section">

      <div className="hero-bg-blur"></div>

      <div className="hero-light"></div>

      {/* LEFT CONTENT */}

      <div className="hero-left">

        <div className="hero-badge">

          <span>⚡</span>

          <p>Productivity Platform</p>

        </div>

        <h1 className="hero-title">

          Welcome back,

          <span> {userName}</span>

        </h1>

        <p className="hero-description">

          Work smart, collaborate faster, and manage
          projects, tasks, and teams inside one
          modern productivity workspace.

        </p>

        <div className="hero-buttons">

          <button
            className="hero-primary-btn"
            onClick={() =>
              navigate("/create-project")
            }
          >
            Create Project
          </button>

          <button
            className="hero-secondary-btn"
            onClick={() =>
              navigate("/projects")
            }
          >
            Explore Projects
          </button>

        </div>

      </div>

      {/* RIGHT VISUAL */}

      <div className="hero-right">

        <div className="water-glow"></div>

        <div className="cube-floor"></div>

        {/* MAIN CUBE */}

        <div className="cube cube-main">

          <div className="cube-face front"></div>
          <div className="cube-face back"></div>
          <div className="cube-face left"></div>
          <div className="cube-face right"></div>
          <div className="cube-face top"></div>

        </div>

        {/* SMALL CUBE */}

        <div className="cube cube-small">

          <div className="cube-face front"></div>
          <div className="cube-face back"></div>
          <div className="cube-face left"></div>
          <div className="cube-face right"></div>
          <div className="cube-face top"></div>

        </div>

        {/* OUTLINE CUBE */}

        <div className="cube cube-outline">

          <div className="cube-face front"></div>
          <div className="cube-face back"></div>
          <div className="cube-face left"></div>
          <div className="cube-face right"></div>
          <div className="cube-face top"></div>

        </div>

      </div>

    </section>
  );
}

export default HeroSection;