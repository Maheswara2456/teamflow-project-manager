import "./../styles/Auth.css";

import {
  useState,
  useEffect,
} from "react";

import {
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../firebase/firebase";

import {
  useNavigate,
  Link,
} from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    if (auth.currentUser) {
      navigate("/dashboard");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">
      {/* LEFT SIDE */}
      <div className="auth-left">
        <h1>
          Welcome To
          <br />
          <span>TeamFlow</span>
        </h1>

        <p>
          Organize projects, track
          tasks, and collaborate with
          your student team using one
          modern productivity platform.
        </p>

        <div className="auth-features">
          <div>
            🚀 Smart Productivity
          </div>

          <div>
            🔥 Firebase Authentication
          </div>

          <div>
            📊 Dashboard Analytics
          </div>

          <div>
            👥 Team Collaboration
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="auth-right">
        <form
          onSubmit={handleLogin}
          className="auth-form"
        >
          <h2>Login</h2>

          <p className="auth-subtitle">
            Continue managing your
            workflow efficiently.
          </p>

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

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Logging In..."
              : "Login"}
          </button>

          <p className="switch-auth">
            Don’t have an account?
            <Link to="/register">
              {" "}
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;