import "../../styles/projects/ProjectCard.css";

import {
  doc,
  updateDoc,
} from "firebase/firestore";

import {
  db,
} from "../../firebase/firebase";

function ProjectCard({

  project,

  handleDeleteProject,

}) {

  /* =====================================================
     UPDATE STATUS
  ===================================================== */

  const handleStatusChange =
    async (e) => {

      try {

        const newStatus =
          e.target.value;

        await updateDoc(

          doc(
            db,
            "projects",
            project.id
          ),

          {
            status:
              newStatus,
          }
        );

      } catch (error) {

        console.log(
          "Status Update Error:",
          error
        );
      }
    };

  return (

    <div className="project-card">

      {/* LEFT */}

      <div className="project-left">

        {/* ICON */}

        <div className="project-icon">

          {project.icon || "🚀"}

        </div>

        {/* CONTENT */}

        <div className="project-content">

          <h4>

            {project.title}

          </h4>

          <p>

            {project.desc}

          </p>

          {/* PROGRESS */}

          <div className="project-progress">

            <div className="progress-bar">

              <div
                className="progress-fill"
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

        </div>

      </div>

      {/* RIGHT */}

      <div className="project-right">

        {/* STATUS SELECT */}

        <select
          className="project-status-select"
          value={
            project.status || "Active"
          }
          onChange={
            handleStatusChange
          }
        >

          <option value="Active">
            Active
          </option>

          <option value="Pending">
            Pending
          </option>

          <option value="In Progress">
            In Progress
          </option>

          <option value="Completed">
            Completed
          </option>

        </select>

        {/* DELETE */}

        <button
          className="delete-project-btn"
          onClick={() =>
            handleDeleteProject(
              project.id
            )
          }
        >

          Delete

        </button>

      </div>

    </div>
  );
}

export default ProjectCard;