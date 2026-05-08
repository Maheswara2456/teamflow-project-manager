import "../../styles/projectDetails/ProjectTasks.css";

import {
  useEffect,
  useState,
} from "react";

import {
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

import {
  db,
} from "../../firebase/firebase";

import AddTaskModal from "./AddTaskModal";

function ProjectTasks({

  projectId,

}) {

  /* =====================================================
     STATES
  ===================================================== */

  const [
    tasks,
    setTasks,
  ] = useState([]);

  const [
    showTaskModal,
    setShowTaskModal,
  ] = useState(false);

  const [
    searchTerm,
    setSearchTerm,
  ] = useState("");

  const [
    filterStatus,
    setFilterStatus,
  ] = useState("All");

  /* =====================================================
     FETCH TASKS
  ===================================================== */

  useEffect(() => {

    if (!projectId)
      return;

    const q =
      query(

        collection(
          db,
          "tasks"
        ),

        where(
          "projectId",
          "==",
          projectId
        )

      );

    const unsubscribe =
      onSnapshot(

        q,

        (snapshot) => {

          const taskList =
            snapshot.docs.map(

              (doc) => ({

                id:
                  doc.id,

                ...doc.data(),

              })

            );

          setTasks(
            taskList
          );

        }

      );

    return () =>
      unsubscribe();

  }, [projectId]);

  /* =====================================================
     FILTERED TASKS
  ===================================================== */

  const filteredTasks =
    tasks.filter((task) => {

      const matchesSearch =

        task.title
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||

        task.assignedTo
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const matchesFilter =

        filterStatus === "All"

          ? true

          : task.status ===
            filterStatus;

      return (
        matchesSearch &&
        matchesFilter
      );

    });

  /* =====================================================
     STATS
  ===================================================== */

  const completedTasks =
    tasks.filter(
      (task) =>
        task.status ===
        "Completed"
    ).length;

  const pendingTasks =
    tasks.filter(
      (task) =>
        task.status ===
        "Pending"
    ).length;

  const inProgressTasks =
    tasks.filter(
      (task) =>
        task.status ===
        "In Progress"
    ).length;

  /* =====================================================
     STATUS CLASS
  ===================================================== */

  const getStatusClass = (
    status
  ) => {

    if (!status)
      return "";

    return status
      .toLowerCase()
      .replace(/\s/g, "");

  };

  return (

    <>

      <section className="project-tasks-section">

        {/* =====================================================
           HEADER
        ===================================================== */}

        <div className="project-tasks-header">

          <div>

            <h2>
              Project Tasks
            </h2>

            <p>
              Monitor and manage
              project workflow.
            </p>

          </div>

          <button
            className="add-task-button"

            onClick={() =>
              setShowTaskModal(true)
            }
          >

            + Add Task

          </button>

        </div>

        {/* =====================================================
           STATS
        ===================================================== */}

        <div className="task-stats-grid">

          <div className="task-stat-card">

            <h4>
              Total Tasks
            </h4>

            <h2>
              {tasks.length}
            </h2>

          </div>

          <div className="task-stat-card">

            <h4>
              Completed
            </h4>

            <h2>
              {completedTasks}
            </h2>

          </div>

          <div className="task-stat-card">

            <h4>
              Pending
            </h4>

            <h2>
              {pendingTasks}
            </h2>

          </div>

          <div className="task-stat-card">

            <h4>
              In Progress
            </h4>

            <h2>
              {inProgressTasks}
            </h2>

          </div>

        </div>

        {/* =====================================================
           SEARCH + FILTER
        ===================================================== */}

        <div className="task-filter-bar">

          <input
            type="text"
            placeholder="Search tasks..."

            value={searchTerm}

            onChange={(e) =>
              setSearchTerm(
                e.target.value
              )
            }
          />

          <select
            value={filterStatus}

            onChange={(e) =>
              setFilterStatus(
                e.target.value
              )
            }
          >

            <option>
              All
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

        {/* =====================================================
           EMPTY STATE
        ===================================================== */}

        {filteredTasks.length === 0 ? (

          <div className="empty-task-box">

            <h3>
              No Tasks Found
            </h3>

            <p>
              Add project tasks,
              deadlines,
              and assigned members.
            </p>

            <button
              onClick={() =>
                setShowTaskModal(true)
              }
            >

              Create Task

            </button>

          </div>

        ) : (

          <div className="project-task-grid">

            {filteredTasks.map(

              (task) => (

                <div
                  key={task.id}
                  className="task-card"
                >

                  {/* TOP */}

                  <div className="task-card-top">

                    <div className="task-top-left">

                      <span
                        className={`task-status ${getStatusClass(task.status)}`}
                      >

                        ● {task.status}

                      </span>

                      <span className="task-priority">

                        {task.priority}

                      </span>

                    </div>

                    <div className="task-actions">

                      <button>
                        Edit
                      </button>

                      <button className="delete-task-btn">
                        Delete
                      </button>

                    </div>

                  </div>

                  {/* TITLE */}

                  <h3>

                    {task.title}

                  </h3>

                  {/* DESC */}

                  <p>

                    {task.description}

                  </p>

                  {/* INFO */}

                  <div className="task-info">

                    <div>

                      <h5>
                        Assigned
                      </h5>

                      <span>

                        {task.assignedTo}

                      </span>

                    </div>

                    <div>

                      <h5>
                        Deadline
                      </h5>

                      <span>

                        {task.deadline}

                      </span>

                    </div>

                  </div>

                  {/* PROGRESS */}

                  <div className="task-progress-wrapper">

                    <div className="task-progress-text">

                      <span>
                        Progress
                      </span>

                      <span>

                        {task.progress}%

                      </span>

                    </div>

                    <div className="task-progress-bar">

                      <div
                        className="task-progress-fill"

                        style={{
                          width:
                            `${task.progress}%`,
                        }}
                      ></div>

                    </div>

                  </div>

                </div>

              )

            )}

          </div>

        )}

      </section>

      {/* =====================================================
         MODAL
      ===================================================== */}

      {showTaskModal && (

        <AddTaskModal

          projectId={projectId}

          closeModal={() =>
            setShowTaskModal(false)
          }

        />

      )}

    </>

  );

}

export default ProjectTasks;