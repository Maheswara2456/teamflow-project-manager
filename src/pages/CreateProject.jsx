import "../styles/projects/CreateProject.css";

import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import {
  auth,
  db,
} from "../firebase/firebase";

/* =====================================================
   PROJECT ICONS
===================================================== */

const projectIcons = [

  {
    value: "🚀",
    label: "Startup",
  },

  {
    value: "⚡",
    label: "Productivity",
  },

  {
    value: "💻",
    label: "Software",
  },

  {
    value: "📱",
    label: "Mobile App",
  },

  {
    value: "🎨",
    label: "Design",
  },

  {
    value: "🧠",
    label: "AI Project",
  },

  {
    value: "☁️",
    label: "Cloud System",
  },

  {
    value: "📊",
    label: "Analytics",
  },

  {
    value: "🔒",
    label: "Security",
  },

  {
    value: "🛒",
    label: "Ecommerce",
  },

  {
    value: "🏥",
    label: "Healthcare",
  },

  {
    value: "🎓",
    label: "Education",
  },

];

/* =====================================================
   COMPONENT
===================================================== */

function CreateProject() {

  const navigate =
    useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({

      title: "",

      description: "",

      overview: "",

      category: "",

      client: "",

      manager: "",

      techStack: "",

      teamSize: 1,

      budget: "",

      deadline: "",

      priority: "Medium",

      status: "Active",

      progress: 0,

      icon: "⚡",

    });

  /* =====================================================
     HANDLE INPUT
  ===================================================== */

  const handleChange =
    (e) => {

      const {
        name,
        value,
      } = e.target;

      setFormData(
        (prev) => ({

          ...prev,

          [name]: value,

        })
      );
    };

  /* =====================================================
     CREATE PROJECT
  ===================================================== */

  const handleCreateProject =
    async (e) => {

      e.preventDefault();

      const requiredFields = [

        "title",
        "description",
        "overview",
        "category",
        "client",
        "manager",
        "techStack",
        "deadline",

      ];

      const hasEmptyField =
        requiredFields.some(
          (field) =>

            !formData[field]
              ?.toString()
              .trim()
        );

      if (hasEmptyField) {

        alert(
          "Please fill all required fields"
        );

        return;

      }

      try {

        setLoading(true);

        await addDoc(

          collection(
            db,
            "projects"
          ),

          {

            title:
              formData.title.trim(),

            desc:
              formData.description.trim(),

            overview:
              formData.overview.trim(),

            category:
              formData.category.trim(),

            client:
              formData.client.trim(),

            manager:
              formData.manager.trim(),

            techStack:
              formData.techStack.trim(),

            teamSize:
              Number(
                formData.teamSize
              ),

            budget:
              formData.budget.trim(),

            deadline:
              formData.deadline,

            priority:
              formData.priority,

            status:
              formData.status,

            progress:
              Number(
                formData.progress
              ),

            icon:
              formData.icon,

            createdBy:
              auth.currentUser.uid,

            createdAt:
              serverTimestamp(),

          }
        );

        alert(
          "Project Created Successfully"
        );

        navigate("/projects");

      } catch (error) {

        console.log(error);

        alert(
          "Failed To Create Project"
        );

      } finally {

        setLoading(false);

      }
    };

  return (

    <div className="create-project-page">

      <div className="create-project-card">

        {/* HEADER */}

        <div className="create-project-header">

          <h1>
            Create New Project
          </h1>

          <p>
            Build, organize, and manage your project workflow using realtime cloud tracking.
          </p>

        </div>

        {/* FORM */}

        <form
          onSubmit={
            handleCreateProject
          }
        >

          <div className="create-form-grid">

            {/* TITLE */}

            <div className="create-input-group full-width">

              <label>
                Project Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />

            </div>

            {/* DESCRIPTION */}

            <div className="create-input-group full-width">

              <label>
                Short Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
              />

            </div>

            {/* OVERVIEW */}

            <div className="create-input-group full-width">

              <label>
                Project Overview
              </label>

              <textarea
                name="overview"
                className="overview-textarea"
                value={formData.overview}
                onChange={handleChange}
              />

            </div>

            {/* CATEGORY */}

            <div className="create-input-group">

              <label>
                Category
              </label>

              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />

            </div>

            {/* CLIENT */}

            <div className="create-input-group">

              <label>
                Client / Organization
              </label>

              <input
                type="text"
                name="client"
                value={formData.client}
                onChange={handleChange}
              />

            </div>

            {/* MANAGER */}

            <div className="create-input-group">

              <label>
                Project Manager
              </label>

              <input
                type="text"
                name="manager"
                value={formData.manager}
                onChange={handleChange}
              />

            </div>

            {/* TECH STACK */}

            <div className="create-input-group">

              <label>
                Tech Stack
              </label>

              <input
                type="text"
                name="techStack"
                value={formData.techStack}
                onChange={handleChange}
              />

            </div>

            {/* TEAM SIZE */}

            <div className="create-input-group">

              <label>
                Team Size
              </label>

              <input
                type="number"
                name="teamSize"
                min="1"
                value={formData.teamSize}
                onChange={handleChange}
              />

            </div>

            {/* BUDGET */}

            <div className="create-input-group">

              <label>
                Budget
              </label>

              <input
                type="text"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
              />

            </div>

            {/* DEADLINE */}

            <div className="create-input-group">

              <label>
                Deadline
              </label>

              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
              />

            </div>

            {/* PRIORITY */}

            <div className="create-input-group">

              <label>
                Priority
              </label>

              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >

                <option>
                  Low
                </option>

                <option>
                  Medium
                </option>

                <option>
                  High
                </option>

              </select>

            </div>

            {/* STATUS */}

            <div className="create-input-group">

              <label>
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >

                <option>
                  Active
                </option>

                <option>
                  Pending
                </option>

                <option>
                  In Progress
                </option>

                <option>
                  Completed
                </option>

              </select>

            </div>

            {/* PROGRESS */}

            <div className="create-input-group">

              <label>
                Progress %
              </label>

              <input
                type="number"
                name="progress"
                min="0"
                max="100"
                value={formData.progress}
                onChange={handleChange}
              />

            </div>

            {/* ICON */}

            <div className="create-input-group">

              <label>
                Project Icon
              </label>

              <select
                name="icon"
                value={formData.icon}
                onChange={handleChange}
              >

                {projectIcons.map(
                  (icon) => (

                    <option
                      key={icon.value}
                      value={icon.value}
                    >

                      {icon.value}
                      {" "}
                      {icon.label}

                    </option>
                  )
                )}

              </select>

            </div>

          </div>

          {/* BUTTONS */}

          <div className="create-project-buttons">

            <button
              type="button"
              className="cancel-project-btn"
              onClick={() =>
                navigate("/dashboard")
              }
            >

              Cancel

            </button>

            <button
              type="submit"
              className="create-project-btn"
            >

              {loading
                ? "Creating..."
                : "Create Project"}

            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default CreateProject;