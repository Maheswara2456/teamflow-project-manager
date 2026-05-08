import "../../styles/layout/Sidebar.css";

import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import { signOut } from "firebase/auth";

import { auth } from "../../firebase/firebase";

/* ======================================================
   NAVIGATION ITEMS
====================================================== */

const navItems = [

  {
    path: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },

  {
    path: "/projects",
    label: "Projects",
    icon: FolderKanban,
  },

  {
    path: "/tasks",
    label: "Tasks",
    icon: CheckSquare,
  },

  {
    path: "/team",
    label: "Team",
    icon: Users,
  },

  {
    path: "/analytics",
    label: "Analytics",
    icon: BarChart3,
  },

  {
    path: "/settings",
    label: "Settings",
    icon: Settings,
  },
];

/* ======================================================
   SIDEBAR
====================================================== */

function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}) {

  const navigate =
    useNavigate();

  /* ======================================================
     LOGOUT
  ====================================================== */

  const handleLogout =
    async () => {

      try {

        await signOut(auth);

        navigate("/");

      } catch (error) {

        console.log(error);

      }
    };

  return (

    <aside
      className={
        sidebarOpen
          ? "sidebar open"
          : "sidebar"
      }
    >

      {/* ======================================================
          TOP SECTION
      ====================================================== */}

      <div className="sidebar-wrapper">

        {/* HEADER */}

        <div className="sidebar-top">

          <button
            className="menu-btn"
            onClick={() =>
              setSidebarOpen(
                !sidebarOpen
              )
            }
          >

            <Menu size={22} />

          </button>

          {sidebarOpen && (

            <div className="sidebar-brand">

              <div className="brand-icon">
                ✦
              </div>

              <h1 className="sidebar-logo">
                TeamFlow
              </h1>

            </div>
          )}

        </div>

        {/* ======================================================
            NAVIGATION
        ====================================================== */}

        <nav className="sidebar-links">

          {navItems.map(
            (item) => {

              const Icon =
                item.icon;

              return (

                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({
                    isActive,
                  }) =>
                    isActive
                      ? "active"
                      : ""
                  }
                >

                  <Icon size={21} />

                  {sidebarOpen && (

                    <span className="link-text">

                      {item.label}

                    </span>
                  )}

                </NavLink>
              );
            }
          )}

        </nav>

      </div>

      {/* ======================================================
          BOTTOM SECTION
      ====================================================== */}

      <div className="sidebar-bottom">

        <button
          className="logout-btn"
          onClick={handleLogout}
        >

          <LogOut size={21} />

          {sidebarOpen && (

            <span className="logout-text">

              Logout

            </span>
          )}

        </button>

      </div>

    </aside>
  );
}

export default Sidebar;