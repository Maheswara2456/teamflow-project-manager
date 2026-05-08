import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import {
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "./firebase/firebase";

/* AUTH */

import Login from "./pages/Login";
import Register from "./pages/Register";

/* MAIN PAGES */

import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import CreateProject from "./pages/CreateProject";
import Profile from "./pages/Profile";

/* ======================================================
   TEMP PAGES
====================================================== */

const TempPage = ({ title }) => {

  return (

    <div className="temp-page">

      <h1>
        {title} Page Coming Soon
      </h1>

    </div>
  );
};

/* ======================================================
   PROTECTED ROUTE
====================================================== */

function ProtectedRoute({
  user,
  children,
}) {

  return user

    ? children

    : <Navigate to="/" />;
}

/* ======================================================
   APP
====================================================== */

function App() {

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  /* ======================================================
     AUTH CHECK
  ====================================================== */

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(

        auth,

        (currentUser) => {

          setUser(currentUser);

          setLoading(false);
        }
      );

    return unsubscribe;

  }, []);

  /* ======================================================
     LOADING SCREEN
  ====================================================== */

  if (loading) {

    return (

      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
          fontWeight: "700",
          background: "#edf2ee",
          color: "#0f172a",
        }}
      >

        Loading...

      </div>
    );
  }

  /* ======================================================
     ROUTES
  ====================================================== */

  return (

    <BrowserRouter>

      <Routes>

        {/* AUTH */}

        <Route
          path="/"
          element={
            user
              ? (
                <Navigate to="/dashboard" />
              )
              : <Login />
          }
        />

        <Route
          path="/register"
          element={
            user
              ? (
                <Navigate to="/dashboard" />
              )
              : <Register />
          }
        />

        {/* DASHBOARD */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* PROJECTS */}

        <Route
          path="/projects"
          element={
            <ProtectedRoute user={user}>
              <Projects />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-project"
          element={
            <ProtectedRoute user={user}>
              <CreateProject />
            </ProtectedRoute>
          }
        />

        <Route
          path="/project/:id"
          element={
            <ProtectedRoute user={user}>
              <ProjectDetails />
            </ProtectedRoute>
          }
        />

        {/* PROFILE */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute user={user}>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* TEMP PAGES */}

        <Route
          path="/tasks"
          element={
            <ProtectedRoute user={user}>
              <TempPage title="Tasks" />
            </ProtectedRoute>
          }
        />

        <Route
          path="/team"
          element={
            <ProtectedRoute user={user}>
              <TempPage title="Team" />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute user={user}>
              <TempPage title="Analytics" />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute user={user}>
              <TempPage title="Settings" />
            </ProtectedRoute>
          }
        />

        {/* FALLBACK */}

        <Route
          path="*"
          element={<Navigate to="/" />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;