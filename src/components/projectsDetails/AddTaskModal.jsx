import "../../styles/projectDetails/AddTaskModal.css";

import {
  useState,
} from "react";

import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import {
  db,
} from "../../firebase/firebase";

function AddTaskModal({

  closeModal,
  projectId,

}) {

  /* =====================================================
     STATES
  ===================================================== */

  const [
    title,
    setTitle,
  ] = useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [
    assignedTo,
    setAssignedTo,
  ] = useState("");

  const [
    deadline,
    setDeadline,
  ] = useState("");

  const [
    status,
    setStatus,
  ] = useState("Pending");

  const [
    priority,
    setPriority,
  ] = useState("Medium");

  const [
    progress,
    setProgress,
  ] = useState(0);

  const [
    loading,
    setLoading,
  ] = useState(false);

  /* =====================================================
     CREATE TASK
  ===================================================== */

  const handleCreateTask =
    async (e) => {

      e.preventDefault();

      /* VALIDATION */

      if (
        !title ||
        !description
      ) {

        alert(
          "Please fill all required fields."
        );

        return;

      }

      try {

        setLoading(true);

        await addDoc(

          collection(
            db,
            "tasks"
          ),

          {

            projectId,

            title:
              title.trim(),

            description:
              description.trim(),

            assignedTo:
              assignedTo.trim(),

            deadline,

            status,

            priority,

            progress:
              Number(progress),

            createdAt:
              serverTimestamp(),

          }

        );

        /* CLOSE MODAL */

        closeModal();

      } catch (error) {

        console.log(error);

        alert(
          "Failed to create task."
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div className="task-modal-overlay">

      <div className="task-modal">

        {/* =====================================================
           HEADER
        ===================================================== */}

        <div className="task-modal-header">

          <h2>
            Create Task
          </h2>

          <button
            onClick={closeModal}
          >
            ✕
          </button>

        </div>

        {/* =====================================================
           FORM
        ===================================================== */}

        <form

          className="task-form"

          onSubmit={
            handleCreateTask
          }

        >

          {/* TITLE */}

          <div className="task-input-group">

            <label>
              Task Title
            </label>

            <input
              type="text"

              placeholder="Design Dashboard UI"

              value={title}

              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }

              required
            />

          </div>

          {/* DESCRIPTION */}

          <div className="task-input-group">

            <label>
              Description
            </label>

            <textarea

              placeholder="Write task details..."

              value={description}

              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }

              required

            ></textarea>

          </div>

          {/* ASSIGNED */}

          <div className="task-input-group">

            <label>
              Assigned To
            </label>

            <input
              type="text"

              placeholder="Mahesh"

              value={assignedTo}

              onChange={(e) =>
                setAssignedTo(
                  e.target.value
                )
              }

            />

          </div>

          {/* DEADLINE */}

          <div className="task-input-group">

            <label>
              Deadline
            </label>

            <input
              type="date"

              value={deadline}

              onChange={(e) =>
                setDeadline(
                  e.target.value
                )
              }

            />

          </div>

          {/* STATUS */}

          <div className="task-input-group">

            <label>
              Status
            </label>

            <select

              value={status}

              onChange={(e) =>
                setStatus(
                  e.target.value
                )
              }

            >

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

          {/* PRIORITY */}

          <div className="task-input-group">

            <label>
              Priority
            </label>

            <select

              value={priority}

              onChange={(e) =>
                setPriority(
                  e.target.value
                )
              }

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

          {/* PROGRESS */}

          <div className="task-input-group">

            <label>
              Progress
            </label>

            <input
              type="number"

              placeholder="70"

              min="0"

              max="100"

              value={progress}

              onChange={(e) =>
                setProgress(
                  e.target.value
                )
              }

            />

          </div>

          {/* =====================================================
             BUTTONS
          ===================================================== */}

          <div className="task-modal-actions">

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

              disabled={loading}
            >

              {loading
                ? "Creating..."
                : "Create Task"}

            </button>

          </div>

        </form>

      </div>

    </div>

  );

}

export default AddTaskModal;