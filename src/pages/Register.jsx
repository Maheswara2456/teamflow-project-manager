import "./../styles/Auth.css";

import { useState, useEffect } from "react";

import {
  createUserWithEmailAndPassword,
} from "firebase/auth";

import {
  doc,
  setDoc,
} from "firebase/firestore";

import { auth, db } from "../firebase/firebase";

import {
  useNavigate,
  Link,
} from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const [role, setRole] =
    useState("member");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    if (auth.currentUser) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      const user = userCredential.user;

      await setDoc(
        doc(db, "users", user.uid),
        {
          name,
          email,
          role,
          createdAt:
            new Date().toISOString(),
        }
      );

      alert("Registration Successful ✅");

      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">
      {/* LEFT SECTION */}

      <div className="auth-left">
        <div className="logo-box">
          ⚡ TeamFlow
        </div>

        <h1>
          Organize smarter.
          <br />

          <span>
            Collaborate faster.
          </span>

          <br />

          Achieve together.
        </h1>

        <p>
          The modern productivity
          workspace designed for
          students and teams to manage
          projects, tasks, deadlines,
          and collaboration easily.
        </p>

        <div className="auth-features">
          <div className="feature-card">
            ✅ Track tasks and deadlines
          </div>

          <div className="feature-card">
            👥 Collaborate with your
            team
          </div>

          <div className="feature-card">
            📁 Manage multiple projects
          </div>

          <div className="feature-card">
            🔥 Firebase Authentication
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}

      <div className="auth-right">
        <form
          onSubmit={handleRegister}
          className="auth-form"
        >
          <div className="form-top">
            <div className="demo-badge">
              🚀 TeamFlow Workspace
            </div>

            <h2>Create Account</h2>

            <p className="auth-subtitle">
              Start your productivity
              journey today.
            </p>
          </div>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
          >
            <option value="member">
              Member
            </option>

            <option value="admin">
              Admin
            </option>
          </select>

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

          <p className="switch-auth">
            Already have an account?

            <Link to="/">
              {" "}
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;