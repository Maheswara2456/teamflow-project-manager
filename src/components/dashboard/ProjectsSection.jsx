import "../../styles/dashboard/ProjectsSection.css";

import {
  useEffect,
  useState,
} from "react";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

import {
  auth,
  db,
} from "../../firebase/firebase";

/* COMPONENTS */

import EmptyProjects from "../projects/EmptyProjects";
import ProjectCard from "../projects/ProjectCard";
import ProjectsHeader from "../projects/ProjectsHeader";
import ProjectModal from "../projects/ProjectModal";

/* =====================================================
   ICONS
===================================================== */

const projectIcons = [
  "🚀",
  "📁",
  "💡",
  "⚡",
  "🧠",
  "🎯",
];

/* =====================================================
   COMPONENT
===================================================== */

function ProjectsSection() {

  const [projects, setProjects] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [showModal, setShowModal] =
    useState(false);

  const [projectData, setProjectData] =
    useState({
      title: "",
      desc: "",
    });

  /* =====================================================
     FETCH PROJECTS
  ===================================================== */

  useEffect(() => {

    const user =
      auth.currentUser;

    if (!user) {

      setLoading(false);

      return;

    }

    const projectsQuery =
      query(
        collection(
          db,
          "projects"
        ),
        where(
          "createdBy",
          "==",
          user.uid
        )
      );

    const unsubscribe =
      onSnapshot(
        projectsQuery,
        (snapshot) => {

          const projectList =
            snapshot.docs.map(
              (item) => ({
                id: item.id,
                ...item.data(),
              })
            );

          setProjects(
            projectList
          );

          setLoading(false);

        },
        (error) => {

          console.log(error);

          setLoading(false);

        }
      );

    return () =>
      unsubscribe();

  }, []);

  /* =====================================================
     HANDLE INPUT
  ===================================================== */

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    setProjectData(
      (prev) => ({
        ...prev,
        [name]: value,
      })
    );

  };

  /* =====================================================
     ADD PROJECT
  ===================================================== */

  const handleAddProject =
    async () => {

      const cleanTitle =
        projectData.title.trim();

      const cleanDesc =
        projectData.desc.trim();

      if (
        !cleanTitle ||
        !cleanDesc
      ) {

        alert(
          "Please fill all fields"
        );

        return;

      }

      /* DUPLICATE TITLE CHECK */

      const titleExists =
        projects.some(
          (project) =>

            project.title
              ?.toLowerCase()
              .trim() ===

            cleanTitle
              .toLowerCase()
              .trim()
        );

      if (titleExists) {

        alert(
          "Project title already exists"
        );

        return;

      }

      /* DUPLICATE DESCRIPTION CHECK */

      const descExists =
        projects.some(
          (project) =>

            project.desc
              ?.toLowerCase()
              .trim() ===

            cleanDesc
              .toLowerCase()
              .trim()
        );

      if (descExists) {

        alert(
          "Project description already exists"
        );

        return;

      }

      try {

        const randomIcon =
          projectIcons[
            Math.floor(
              Math.random() *
              projectIcons.length
            )
          ];

        await addDoc(

          collection(
            db,
            "projects"
          ),

          {

            title: cleanTitle,

            desc: cleanDesc,

            icon: randomIcon,

            progress: 0,

            status: "Active",

            createdBy:
              auth.currentUser.uid,

            createdAt:
              serverTimestamp(),

          }
        );

        /* RESET FORM */

        setProjectData({
          title: "",
          desc: "",
        });

        setShowModal(false);

        alert(
          "Project Created Successfully"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Failed to create project"
        );

      }
    };

  /* =====================================================
     DELETE PROJECT
  ===================================================== */

  const handleDeleteProject =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this project?"
        );

      if (!confirmDelete)
        return;

      try {

        await deleteDoc(
          doc(
            db,
            "projects",
            id
          )
        );

      } catch (error) {

        console.log(error);

      }
    };

  /* =====================================================
     CLOSE MODAL
  ===================================================== */

  const closeModal = () => {

    setShowModal(false);

  };

  /* =====================================================
     UI
  ===================================================== */

  return (

    <section className="projects-section">

      {/* HEADER */}

      <ProjectsHeader
        setShowModal={
          setShowModal
        }
      />

      {/* MODAL */}

      {showModal && (

        <ProjectModal
          closeModal={
            closeModal
          }
          projectData={
            projectData
          }
          handleChange={
            handleChange
          }
          handleAddProject={
            handleAddProject
          }
        />

      )}

      {/* PROJECT LIST */}

      <div className="projects-list">

        {loading ||
        projects.length === 0 ? (

          <EmptyProjects
            loading={loading}
          />

        ) : (

          projects.map(
            (project) => (

              <ProjectCard
                key={project.id}
                project={project}
                handleDeleteProject={
                  handleDeleteProject
                }
              />

            )
          )

        )}

      </div>

    </section>
  );
}

export default ProjectsSection;