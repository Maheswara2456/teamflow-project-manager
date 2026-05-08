import "../../styles/projectDetails/ProjectDetailsPanel.css";

function ProjectDetailsPanel({

  project,

}) {

  return (

    <section className="project-details-panel">

      {/* HEADER */}

      <div className="details-panel-header">

        <div>

          <h2>
            Project Details
          </h2>

          <p>
            Complete project information and management details.
          </p>

        </div>

       
      </div>

      {/* GRID */}

      <div className="details-grid">

        {/* MANAGER */}

        <div className="detail-card">

          <span>
            👤 Project Manager
          </span>

          <h3>
            {project?.manager || "Not Added"}
          </h3>

        </div>

        {/* CATEGORY */}

        <div className="detail-card">

          <span>
            📂 Category
          </span>

          <h3>
            {project?.category || "Not Added"}
          </h3>

        </div>

        {/* DEADLINE */}

        <div className="detail-card">

          <span>
            📅 Deadline
          </span>

          <h3>
            {project?.deadline || "Not Added"}
          </h3>

        </div>

        {/* PRIORITY */}

        <div className="detail-card">

          <span>
            🚀 Priority
          </span>

          <h3 className={`priority-${project?.priority?.toLowerCase()}`}>

            {project?.priority || "Medium"}

          </h3>

        </div>

        {/* TEAM SIZE */}

        <div className="detail-card">

          <span>
            👥 Team Members
          </span>

          <h3>
            {project?.teamSize || "0"} Members
          </h3>

        </div>

        {/* CLIENT */}

        <div className="detail-card">

          <span>
            🏢 Client
          </span>

          <h3>
            {project?.client || "Internal"}
          </h3>

        </div>

        {/* BUDGET */}

        <div className="detail-card">

          <span>
            💰 Budget
          </span>

          <h3>
            {project?.budget || "Not Added"}
          </h3>

        </div>

        {/* STACK */}

        <div className="detail-card">

          <span>
            ⚡ Tech Stack
          </span>

          <h3>
            {project?.techStack || "React + Firebase"}
          </h3>

        </div>

      </div>

    </section>

  );

}

export default ProjectDetailsPanel;