import "../styles/projects/ProjectsPage.css";

import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

import {
  onAuthStateChanged,
} from "firebase/auth";

import {
  auth,
  db,
} from "../firebase/firebase";

/* COMPONENTS */

import Sidebar from "../components/layout/Sidebar";

import Topbar from "../components/layout/Topbar";

import ProjectsTopbar from "../components/projects/projectsTopbar";

import ProjectsFilters from "../components/projects/ProjectsFilters";

import ProjectsGrid from "../components/projects/ProjectsGrid";

function Projects() {

  /* =====================================================
     NAVIGATE
  ===================================================== */

  const navigate =
    useNavigate();

  /* =====================================================
     STATES
  ===================================================== */

  const [
    sidebarOpen,
    setSidebarOpen,
  ] = useState(false);

  const [
    projects,
    setProjects,
  ] = useState([]);

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    activeFilter,
    setActiveFilter,
  ] = useState("All");

  const [
    loading,
    setLoading,
  ] = useState(true);

  /* =====================================================
     FETCH PROJECTS
  ===================================================== */

  useEffect(() => {

    let unsubscribeProjects;

    const unsubscribeAuth =
      onAuthStateChanged(
        auth,
        (user) => {

          /* USER NOT LOGGED IN */

          if (!user) {

            navigate("/login");

            setProjects([]);

            setLoading(false);

            return;
          }

          /* FIREBASE QUERY */

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

          /* REALTIME FETCH */

          unsubscribeProjects =
            onSnapshot(
              projectsQuery,
              (snapshot) => {

                const projectsData =
                  [];

                snapshot.forEach(
                  (doc) => {

                    projectsData.push({

                      id: doc.id,

                      ...doc.data(),
                    });

                  }
                );

                setProjects(
                  projectsData
                );

                setLoading(false);

              },
              (error) => {

                console.log(
                  "Firebase Error:",
                  error
                );

                setLoading(false);

              }
            );
        }
      );

    /* CLEANUP */

    return () => {

      unsubscribeAuth();

      if (
        unsubscribeProjects
      ) {

        unsubscribeProjects();

      }
    };

  }, [navigate]);

  /* =====================================================
     FILTER LOGIC
  ===================================================== */

  const filteredProjects =
    projects.filter(
      (project) => {

        /* SEARCH */

        const matchesSearch =

          project.title
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            );

        /* FILTER */

        const projectStatus =

          project.status
            ?.toLowerCase()
            .trim();

        const selectedFilter =

          activeFilter
            .toLowerCase()
            .trim();

        const matchesFilter =

          activeFilter ===
          "All"

            ? true

            : projectStatus ===
              selectedFilter;

        return (
          matchesSearch &&
          matchesFilter
        );
      }
    );

  /* =====================================================
     UI
  ===================================================== */

  return (

    <div className="projects-page-layout">

      {/* SIDEBAR */}

      <Sidebar
        sidebarOpen={
          sidebarOpen
        }
        setSidebarOpen={
          setSidebarOpen
        }
      />

      {/* MAIN */}

      <main
        className={

          sidebarOpen

            ? "projects-main expanded"

            : "projects-main"
        }
      >

        {/* TOPBAR */}

        <Topbar
          sidebarOpen={
            sidebarOpen
          }
          setSidebarOpen={
            setSidebarOpen
          }
        />

        {/* CONTENT */}

        <div className="projects-page-content">

          {/* HERO */}

          <div className="projects-hero-wrapper">

            <ProjectsTopbar
              search={search}
              setSearch={
                setSearch
              }
            />

          </div>

          {/* FILTERS */}

          <div className="projects-filter-wrapper">

            <ProjectsFilters
              activeFilter={
                activeFilter
              }
              setActiveFilter={
                setActiveFilter
              }
            />

          </div>

          {/* LOADING */}

          {loading ? (

            <h2 className="loading-text">

              Loading Projects...

            </h2>

          ) : (

            <div className="projects-grid-wrapper">

              <ProjectsGrid
                projects={
                  filteredProjects
                }
              />

            </div>

          )}

        </div>

      </main>

    </div>
  );
}

export default Projects;