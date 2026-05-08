import "../../styles/projects/projectsGrid.css";

import ProjectsOverviewCard from "./ProjectsOverviewCard";

import EmptyProjects from "./EmptyProjects";

function ProjectsGrid({
  projects,
}) {

  return (

    <div className="projects-grid">

      {projects.length === 0 ? (

        <EmptyProjects />

      ) : (

        projects.map((project) => (

          <ProjectsOverviewCard
            key={project.id}
            project={project}
          />

        ))
      )}

    </div>
  );
}

export default ProjectsGrid;