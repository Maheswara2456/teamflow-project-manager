import "../../styles/projects/EmptyProjects.css";
function EmptyProjects({
  loading,
}) {

  return (

    <p className="empty-projects">

      {loading
        ? "Loading Projects..."
        : "No Projects Added Yet"}

    </p>
  );
}

export default EmptyProjects;