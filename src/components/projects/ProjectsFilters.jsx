import "../../styles/projects/ProjectsFilters.css";

function ProjectsFilters({

  activeFilter,

  setActiveFilter,

}) {

  const filters = [

    "All",

    "Active",

    "Completed",

    "Pending",

    "In Progress",
  ];

  return (

    <div className="projects-filters">

      {filters.map((filter) => (

        <button
          key={filter}
          className={
            activeFilter === filter
              ? "filter-btn active"
              : "filter-btn"
          }
          onClick={() =>
            setActiveFilter(filter)
          }
        >

          {filter}

        </button>
      ))}

    </div>
  );
}

export default ProjectsFilters;