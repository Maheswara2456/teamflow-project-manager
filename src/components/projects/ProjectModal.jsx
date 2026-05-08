import "../../styles/projects/ProjectModal.css";
function ProjectModal({

  closeModal,

  projectData,

  handleChange,

  handleAddProject,

}) {

  return (

    <div
      className="project-modal-overlay"
      onClick={closeModal}
    >

      <div
        className="project-modal"
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        {/* TOP */}

        <div className="project-modal-top">

          <h3>
            Create New Project
          </h3>

          <button
            className="close-modal-btn"
            onClick={closeModal}
          >
            ✕
          </button>

        </div>

        {/* INPUT */}

        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={projectData.title}
          onChange={handleChange}
        />

        {/* TEXTAREA */}

        <textarea
          name="desc"
          placeholder="Project Description"
          value={projectData.desc}
          onChange={handleChange}
        ></textarea>

        {/* ACTIONS */}

        <div className="project-modal-actions">

          <button
            className="cancel-btn"
            onClick={closeModal}
          >
            Cancel
          </button>

          <button
            className="create-btn"
            onClick={handleAddProject}
          >
            Create Project
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProjectModal;