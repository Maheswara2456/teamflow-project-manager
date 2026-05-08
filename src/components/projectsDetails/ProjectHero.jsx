import "../../styles/projectDetails/ProjectHero.css";

import {
  useState,
} from "react";

import EditProjectModal from "./EditProjectModal";

function ProjectHero({ project }) {

  const [showEditModal, setShowEditModal] =
    useState(false);

  /* =====================================================
     PROJECT DATA
  ===================================================== */

  const title =
    project?.title ||
    "Untitled Project";

  const description =
    project?.desc ||
    "No description available.";

  const status =
    project?.status ||
    "Active";

  const progress =
    project?.progress ?? 0;

  const icon =
    project?.icon || "📁";

  const projectId =
    project?.id || "No ID";

  /* =====================================================
     STATUS CLASS
  ===================================================== */

  const statusClass =
    status
      ?.toLowerCase()
      ?.replace(/\s/g, "");

  return (

    <>

      {/* =====================================================
         HERO SECTION
      ===================================================== */}

      <section className="project-hero">

        {/* BACKGROUND GLOW */}

        <div className="project-hero-glow"></div>

        {/* =====================================================
           LEFT CONTENT
        ===================================================== */}

        <div className="project-hero-left">

          {/* ICON */}

          <div className="project-hero-icon">

            {icon}

          </div>

          {/* TEXT CONTENT */}

          <div className="project-hero-content">

            <h1>
              {title}
            </h1>

            <p>
              {description}
            </p>

            {/* META */}

            <div className="project-meta">

              <span
                className={`project-status-badge ${statusClass}`}
              >

                ● {status}

              </span>

              <span>

                🆔 {projectId}

              </span>

            </div>

          </div>

        </div>

        {/* =====================================================
           RIGHT CONTENT
        ===================================================== */}

        <div className="project-hero-right">

          {/* ACTION BUTTONS */}

          <div className="project-hero-buttons">

            <button>
              Share
            </button>

            <button
              onClick={() =>
                setShowEditModal(true)
              }
            >
              Edit Project
            </button>

            <button className="add-task-btn">
              + Add Task
            </button>

          </div>

          {/* PROGRESS */}

          <div
            className="project-progress-circle"
            style={{
              background:
                `conic-gradient(
                  #5ea966 0% ${progress}%,
                  #edf1ed ${progress}% 100%
                )`,
            }}
          >

            <div className="circle">

              <h2>
                {progress}%
              </h2>

              <p>
                Overall Progress
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
         EDIT MODAL
      ===================================================== */}

      {showEditModal && (

        <EditProjectModal
          project={project}
          closeModal={() =>
            setShowEditModal(false)
          }
        />

      )}

    </>
  );
}

export default ProjectHero;