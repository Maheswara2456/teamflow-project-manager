import "../../styles/projects/ProjectsTopbar.css";

function ProjectsTopbar({

  search,

  setSearch,

}) {

  return (

    <div className="projects-topbar">

      {/* LEFT */}

      <div className="projects-topbar-left">

        <span className="projects-label">
          Workspace
        </span>

        <h1>
          Explore Projects
        </h1>

        <p>
          Manage, search, and explore all your realtime Firebase projects.
        </p>

      </div>

      {/* RIGHT */}

      <div className="projects-topbar-right">

        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

      </div>

    </div>
  );
}

export default ProjectsTopbar;