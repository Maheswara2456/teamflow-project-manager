import "../../styles/projectDetails/EditProjectModal.css";

import {
  useState,
} from "react";

import {
  doc,
  updateDoc,
} from "firebase/firestore";

import {
  db,
} from "../../firebase/firebase";

function EditProjectModal({

  closeModal,
  project,

}) {

  /* =========================================
     FORM STATE
  ========================================= */

  const [
    formData,
    setFormData,
  ] = useState({

    overview:
      project?.overview || "",

    category:
      project?.category || "",

    manager:
      project?.manager || "",

    deadline:
      project?.deadline || "",

    progress:
      project?.progress || 0,

    status:
      project?.status || "Active",

    priority:
      project?.priority || "Medium",

    teamSize:
      project?.teamSize || "",

    client:
      project?.client || "",

    budget:
      project?.budget || "",

    techStack:
      project?.techStack || "",

  });

  /* =========================================
     HANDLE INPUT CHANGE
  ========================================= */

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });

  };

  /* =========================================
     SAVE PROJECT
  ========================================= */

  const handleSave = async (e) => {

    e.preventDefault();

    try {

      const projectRef = doc(
        db,
        "projects",
        project.id
      );

      await updateDoc(
        projectRef,
        {

          overview:
            formData.overview,

          category:
            formData.category,

          manager:
            formData.manager,

          deadline:
            formData.deadline,

          progress:
            Number(
              formData.progress
            ),

          status:
            formData.status,

          priority:
            formData.priority,

          teamSize:
            Number(
              formData.teamSize
            ),

          client:
            formData.client,

          budget:
            formData.budget,

          techStack:
            formData.techStack,

        }
      );

      closeModal();

    } catch (error) {

      console.log(
        "Update Error:",
        error
      );

    }

  };

  return (

    <div className="edit-project-overlay">

      <div className="edit-project-modal">

        {/* =========================================
           HEADER
        ========================================= */}

        <div className="edit-project-header">

          <h2>
            Edit Project
          </h2>

          <button
            onClick={closeModal}
          >
            ✕
          </button>

        </div>

        {/* =========================================
           FORM
        ========================================= */}

        <form
          className="edit-project-form"
          onSubmit={handleSave}
        >

          {/* OVERVIEW */}

          <div className="edit-input-group">

            <label>
              Project Overview
            </label>

            <textarea

              name="overview"

              value={
                formData.overview
              }

              onChange={
                handleChange
              }

              placeholder="Write project overview..."

            ></textarea>

          </div>

          {/* CATEGORY */}

          <div className="edit-input-group">

            <label>
              Category
            </label>

            <input

              type="text"

              name="category"

              value={
                formData.category
              }

              onChange={
                handleChange
              }

              placeholder="Research & Development"

            />

          </div>

          {/* MANAGER */}

          <div className="edit-input-group">

            <label>
              Project Manager
            </label>

            <input

              type="text"

              name="manager"

              value={
                formData.manager
              }

              onChange={
                handleChange
              }

              placeholder="Mahesh Admin"

            />

          </div>

          {/* DEADLINE */}

          <div className="edit-input-group">

            <label>
              Deadline
            </label>

            <input

              type="date"

              name="deadline"

              value={
                formData.deadline
              }

              onChange={
                handleChange
              }

            />

          </div>

          {/* PROGRESS */}

          <div className="edit-input-group">

            <label>
              Progress
            </label>

            <input

              type="number"

              name="progress"

              value={
                formData.progress
              }

              onChange={
                handleChange
              }

              placeholder="70"

            />

          </div>

          {/* STATUS */}

          <div className="edit-input-group">

            <label>
              Status
            </label>

            <select

              name="status"

              value={
                formData.status
              }

              onChange={
                handleChange
              }

            >

              <option>
                Active
              </option>

              <option>
                Completed
              </option>

              <option>
                Pending
              </option>

              <option>
                In Progress
              </option>

            </select>

          </div>

          {/* PRIORITY */}

          <div className="edit-input-group">

            <label>
              Priority
            </label>

            <select

              name="priority"

              value={
                formData.priority
              }

              onChange={
                handleChange
              }

            >

              <option>
                High
              </option>

              <option>
                Medium
              </option>

              <option>
                Low
              </option>

            </select>

          </div>

          {/* TEAM MEMBERS */}

          <div className="edit-input-group">

            <label>
              Team Members
            </label>

            <input

              type="number"

              name="teamSize"

              value={
                formData.teamSize
              }

              onChange={
                handleChange
              }

              placeholder="8"

            />

          </div>

          {/* CLIENT */}

          <div className="edit-input-group">

            <label>
              Client
            </label>

            <input

              type="text"

              name="client"

              value={
                formData.client
              }

              onChange={
                handleChange
              }

              placeholder="QN Group"

            />

          </div>

          {/* BUDGET */}

          <div className="edit-input-group">

            <label>
              Budget
            </label>

            <input

              type="text"

              name="budget"

              value={
                formData.budget
              }

              onChange={
                handleChange
              }

              placeholder="₹2,50,000"

            />

          </div>

          {/* TECH STACK */}

          <div className="edit-input-group">

            <label>
              Tech Stack
            </label>

            <input

              type="text"

              name="techStack"

              value={
                formData.techStack
              }

              onChange={
                handleChange
              }

              placeholder="React + Firebase"

            />

          </div>

          {/* =========================================
             BUTTONS
          ========================================= */}

          <div className="edit-project-actions">

            <button
              type="button"
              className="cancel-btn"
              onClick={closeModal}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-btn"
            >
              Save Changes
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditProjectModal;