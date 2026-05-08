import "../../styles/projects/ProjectsHeader.css";
function ProjectsHeader({
  setShowModal,
}) {

  return (

    <div className="section-header">

      <div>

        <span className="section-label">
          Workspace
        </span>

        <h2>
          Active Projects
        </h2>

      </div>

      <button
        className="section-btn"
        onClick={() =>
          setShowModal(true)
        }
      >
        Add Project
      </button>

    </div>
  );
}

export default ProjectsHeader;