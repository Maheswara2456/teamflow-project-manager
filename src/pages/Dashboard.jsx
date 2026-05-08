import "../styles/dashboard/DashboardLayout.css";

import {
  useEffect,
  useState,
} from "react";

import {
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import {
  auth,
  db,
} from "../firebase/firebase";

import {
  useNavigate,
} from "react-router-dom";

/* ================= LAYOUT ================= */

import Sidebar from "../components/layout/Sidebar";

import Topbar from "../components/layout/Topbar";

/* ================= DASHBOARD ================= */

import HeroSection from "../components/dashboard/HeroSection";

import StatsCards from "../components/dashboard/StatsCards";

import ProjectsSection from "../components/dashboard/ProjectsSection";

import TasksSection from "../components/dashboard/TasksSection";

import AnalyticsSection from "../components/dashboard/AnalyticsSection";

function Dashboard() {

  /* =====================================================
     NAVIGATE
  ===================================================== */

  const navigate =
    useNavigate();

  /* =====================================================
     STATES
  ===================================================== */

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    userData,
    setUserData,
  ] = useState(null);

  const [
    sidebarOpen,
    setSidebarOpen,
  ] = useState(false);

  /* =====================================================
     AUTH CHECK
  ===================================================== */

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(

        auth,

        async (user) => {

          /* USER NOT FOUND */

          if (!user) {

            navigate("/");

            return;
          }

          try {

            /* FIRESTORE USER */

            const docRef =
              doc(
                db,
                "users",
                user.uid
              );

            const docSnap =
              await getDoc(
                docRef
              );

            /* USER EXISTS */

            if (
              docSnap.exists()
            ) {

              setUserData({

                uid: user.uid,

                email: user.email,

                ...docSnap.data(),

              });

            } else {

              /* FALLBACK USER */

              setUserData({

                uid: user.uid,

                name:
                  user.displayName ||
                  "User",

                email:
                  user.email,

              });
            }

          } catch (error) {

            console.log(
              "Dashboard Error:",
              error
            );

          } finally {

            setLoading(false);

          }
        }
      );

    return () =>
      unsubscribe();

  }, [navigate]);

  /* =====================================================
     LOGOUT
  ===================================================== */

  const handleLogout =
    async () => {

      try {

        await signOut(auth);

        navigate("/");

      } catch (error) {

        console.log(
          "Logout Error:",
          error
        );

      }
    };

  /* =====================================================
     LOADING SCREEN
  ===================================================== */

  if (loading) {

    return (

      <div className="loading-screen">

        Loading Dashboard...

      </div>
    );
  }

  /* =====================================================
     SAFETY CHECK
  ===================================================== */

  if (!userData) {

    return (

      <div className="loading-screen">

        User Data Not Found

      </div>
    );
  }

  /* =====================================================
     MAIN UI
  ===================================================== */

  return (

    <div className="dashboard-layout">

      {/* ================= SIDEBAR ================= */}

      <Sidebar
        sidebarOpen={
          sidebarOpen
        }
        setSidebarOpen={
          setSidebarOpen
        }
        handleLogout={
          handleLogout
        }
      />

      {/* ================= MAIN ================= */}

      <main
        className={

          sidebarOpen

            ? "dashboard-main expanded"

            : "dashboard-main"
        }
      >

        {/* ================= TOPBAR ================= */}

        <Topbar
          sidebarOpen={
            sidebarOpen
          }
          setSidebarOpen={
            setSidebarOpen
          }
          userData={
            userData
          }
        />

        {/* ================= CONTENT ================= */}

        <div className="dashboard-content">

          {/* HERO */}

          <HeroSection
            userData={
              userData
            }
          />

          {/* STATS */}

          <StatsCards
            userData={
              userData
            }
          />

          {/* GRID */}

          <div className="dashboard-grid">

            <ProjectsSection
              userData={
                userData
              }
            />

            <TasksSection
              userData={
                userData
              }
            />

          </div>

          {/* ANALYTICS */}

          <AnalyticsSection
            userData={
              userData
            }
          />

        </div>

      </main>

    </div>
  );
}

export default Dashboard;