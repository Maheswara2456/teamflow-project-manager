import "../../styles/projectDetails/ProjectOverview.css";

import {
  useState,
} from "react";

import EditProjectModal from "./EditProjectModal";

function ProjectOverview({ project }) {

  const [showEditModal, setShowEditModal] =
    useState(false);

  /* =====================================================
     PROJECT DATA
  ===================================================== */

  const overview =
    project?.overview;

  let techStack =
    project?.techStack;

  /* =====================================================
     TECH STACK FORMAT
  ===================================================== */

  if (
    typeof techStack === "string"
  ) {

    techStack =
      techStack
        .split(",")
        .map(
          (item) =>
            item.trim()
        );

  }

  if (
    !Array.isArray(
      techStack
    )
  ) {

    techStack = [
      "React",
      "Firebase",
      "Dashboard",
    ];

  }

  return (

    <>

      {/* =====================================================
         OVERVIEW CARD
      ===================================================== */}

      <section className="project-overview-card">

        {/* HEADER */}

        <div className="project-overview-header">

          <div>

            <h2>
              Project Overview
            </h2>

            <p>
              Complete overview and project summary.
            </p>

          </div>

          <button
            className="overview-edit-btn"
            onClick={() =>
              setShowEditModal(true)
            }
          >

            {overview
              ? "Edit Overview"
              : "+ Add Overview"}

          </button>

        </div>

        {/* =====================================================
           OVERVIEW CONTENT
        ===================================================== */}

        {overview ? (

          <div className="project-overview-content">

            <p>
              {overview}
            </p>

          </div>

        ) : (

          <div className="empty-overview-box">

            <h3>
              No Overview Added
            </h3>

            <p>
              Add project overview,
              goals, architecture,
              modules, and workflow.
            </p>

            <button
              onClick={() =>
                setShowEditModal(true)
              }
            >

              Add Overview

            </button>

          </div>

        )}

        {/* =====================================================
           TECH STACK
        ===================================================== */}

        <div className="project-tech-stack">

          {techStack.map(
            (
              item,
              index
            ) => (

              <span
                key={index}
              >

                {item}

              </span>
            )
          )}

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

export default ProjectOverview;