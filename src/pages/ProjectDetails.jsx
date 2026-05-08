import "./../styles/projectDetails/ProjectDetails.css";

import ProjectHero from "../components/projectsDetails/ProjectHero";

import ProjectOverview from "../components/projectsDetails/ProjectOverview";

import ProjectDetailsPanel from "../components/projectsDetails/ProjectDetailsPanel";

import ProjectTasks from "../components/projectsDetails/ProjectTasks";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import {
  doc,
  onSnapshot,
} from "firebase/firestore";

import {
  db,
} from "../firebase/firebase";

function ProjectDetails() {

  /* =====================================================
     GET PROJECT ID
  ===================================================== */

  const { id } = useParams();

  /* =====================================================
     PROJECT STATE
  ===================================================== */

  const [
    project,
    setProject,
  ] = useState(null);

  /* =====================================================
     REALTIME FETCH PROJECT
  ===================================================== */

  useEffect(() => {

    const unsubscribe =
      onSnapshot(

        doc(
          db,
          "projects",
          id
        ),

        (docSnap) => {

          if (
            docSnap.exists()
          ) {

            setProject({

              id:
                docSnap.id,

              ...docSnap.data(),

            });

          } else {

            console.log(
              "Project not found"
            );

          }

        }

      );

    return () =>
      unsubscribe();

  }, [id]);

  /* =====================================================
     LOADING
  ===================================================== */

  if (!project) {

    return (

      <div className="project-loading">

        Loading Project...

      </div>

    );

  }

  /* =====================================================
     UI
  ===================================================== */

  return (

    <div className="project-details-page">

      {/* =====================================================
         TOP SECTION
      ===================================================== */}

      <div className="project-top-section">

        {/* HERO */}

        <ProjectHero
          project={project}
        />

        {/* OVERVIEW */}

        <ProjectOverview
          project={project}
        />

        {/* DETAILS PANEL */}

        <ProjectDetailsPanel
          project={project}
        />

        {/* TASKS */}

        <ProjectTasks
          projectId={project?.id}
        />

      </div>

    </div>

  );

}

export default ProjectDetails;