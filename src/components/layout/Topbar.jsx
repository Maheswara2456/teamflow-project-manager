import "../../styles/layout/Topbar.css";

import {
  Bell,
  Search,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

function Topbar({
  sidebarOpen,
  userData,
}) {

  const navigate =
    useNavigate();

  const profileImage =
    userData?.photoURL ||
    "https://i.pravatar.cc/150?img=12";

  const userName =
    userData?.name || "Mahesh";

  const userRole =
    userData?.role || "Admin";

  return (

    <header
      className={`topbar ${
        sidebarOpen
          ? "expanded"
          : ""
      }`}
    >

      {/* LEFT */}

      <div className="topbar-left">

        <h1>Dashboard</h1>

        <p>
          Welcome back 👋 Manage your
          workflow efficiently.
        </p>

      </div>

      {/* RIGHT */}

      <div className="topbar-right">

        {/* SEARCH */}

        <div className="search-box">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search..."
          />

        </div>

        {/* NOTIFICATION */}

        <button
          className="icon-btn"
          aria-label="Notifications"
        >

          <Bell size={18} />

        </button>

        {/* PROFILE */}

        <button
          type="button"
          className="profile-box"
          onClick={() =>
            navigate("/profile")
          }
        >

          <div className="profile-avatar">

            <img
              src={profileImage}
              alt={userName}
            />

          </div>

          <div className="profile-info">

            <h4>{userName}</h4>

            <span>{userRole}</span>

          </div>

        </button>

      </div>

    </header>
  );
}

export default Topbar;