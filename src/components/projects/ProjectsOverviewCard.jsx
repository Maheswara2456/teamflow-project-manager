import "../../styles/projects/ProjectsOverviewCard.css";

import {
  Link,
} from "react-router-dom";

function ProjectsOverviewCard({

  project,

}) {

  return (

    <Link
      to={`/project/${project.id}`}
      className="project-overview-link"
    >

      <div className="project-overview-card">

        {/* TOP */}

        <div className="project-card-top">

          {/* ICON */}

          <div className="project-card-icon">

            {project.icon || "📁"}

          </div>

          {/* STATUS */}

          <div className="project-card-status">

            {project.status || "Active"}

          </div>

        </div>

        {/* CONTENT */}

        <div className="project-card-content">

          <h2>

            {project.title}

          </h2>

          <p>

            {project.desc}

          </p>

        </div>

        {/* FOOTER */}

        <div className="project-card-footer">

          {/* PROGRESS */}

          <div className="project-progress-wrapper">

            <div className="project-progress-bar">

              <div
                className="project-progress-fill"
                style={{
                  width:
                    project.progress || "0%",
                }}
              ></div>

            </div>

            <span>

              {project.progress || "0%"}

            </span>

          </div>

          {/* OPEN */}

          <button>

            Open Project

          </button>

        </div>

      </div>

    </Link>
  );
}

export default ProjectsOverviewCard;