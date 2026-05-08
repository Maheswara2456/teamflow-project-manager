import "../../styles/dashboard/TasksSection.css";

import {
  useEffect,
  useState,
} from "react";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import {
  auth,
  db,
} from "../../firebase/firebase";

function TasksSection() {

  const [tasks, setTasks] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [showForm, setShowForm] =
    useState(false);

  const [taskData, setTaskData] =
    useState({
      title: "",
      desc: "",
      tag: "",
    });

  /* =====================================================
     FETCH TASKS
  ===================================================== */

  useEffect(() => {

    const unsubscribeAuth =
      auth.onAuthStateChanged(
        (user) => {

          if (!user) {

            setLoading(false);

            return;

          }

          const tasksQuery =
            query(
              collection(
                db,
                "tasks"
              ),
              where(
                "createdBy",
                "==",
                user.uid
              )
            );

          const unsubscribeTasks =
            onSnapshot(
              tasksQuery,
              (snapshot) => {

                const taskList =
                  snapshot.docs.map(
                    (item) => ({
                      id: item.id,
                      ...item.data(),
                    })
                  );

                setTasks(taskList);

                setLoading(false);

              },
              (error) => {

                console.log(error);

                setLoading(false);

              }
            );

          return () =>
            unsubscribeTasks();

        }
      );

    return () =>
      unsubscribeAuth();

  }, []);

  /* =====================================================
     HANDLE INPUT
  ===================================================== */

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    setTaskData(
      (prev) => ({
        ...prev,
        [name]: value,
      })
    );

  };

  /* =====================================================
     CREATE TASK
  ===================================================== */

  const addTask =
    async () => {

      const cleanTitle =
        taskData.title.trim();

      const cleanDesc =
        taskData.desc.trim();

      const cleanTag =
        taskData.tag.trim();

      if (
        !cleanTitle ||
        !cleanDesc ||
        !cleanTag
      ) {

        alert(
          "Please fill all fields"
        );

        return;

      }

      /* DUPLICATE CHECK */

      const taskExists =
        tasks.some(
          (task) =>

            task.title
              ?.toLowerCase()
              .trim() ===

            cleanTitle
              .toLowerCase()
              .trim()
        );

      if (taskExists) {

        alert(
          "Task already exists"
        );

        return;

      }

      try {

        await addDoc(

          collection(
            db,
            "tasks"
          ),

          {

            title: cleanTitle,

            desc: cleanDesc,

            tag: cleanTag,

            status: "pending",

            progress: 0,

            createdBy:
              auth.currentUser.uid,

            createdAt:
              serverTimestamp(),

          }
        );

        /* RESET FORM */

        setTaskData({
          title: "",
          desc: "",
          tag: "",
        });

        setShowForm(false);

        alert(
          "Task Created Successfully"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Failed to create task"
        );

      }
    };

  /* =====================================================
     DELETE TASK
  ===================================================== */

  const deleteTask =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this task?"
        );

      if (!confirmDelete)
        return;

      try {

        await deleteDoc(
          doc(
            db,
            "tasks",
            id
          )
        );

      } catch (error) {

        console.log(error);

      }
    };

  /* =====================================================
     UPDATE TASK STATUS
  ===================================================== */

  const updateTaskStatus =
    async (
      taskId,
      newStatus
    ) => {

      let progress = 0;

      if (
        newStatus ===
        "progress"
      ) {

        progress = 50;

      }

      if (
        newStatus ===
        "completed"
      ) {

        progress = 100;

      }

      try {

        const taskRef =
          doc(
            db,
            "tasks",
            taskId
          );

        await updateDoc(
          taskRef,
          {
            status: newStatus,
            progress,
          }
        );

      } catch (error) {

        console.log(error);

      }
    };

  /* =====================================================
     UI
  ===================================================== */

  return (

    <section className="tasks-section">

      {/* HEADER */}

      <div className="section-header">

        <div>

          <span className="section-label">
            Workflow
          </span>

          <h2>
            Recent Tasks
          </h2>

        </div>

        <button
          className="section-btn"
          onClick={() =>
            setShowForm(
              !showForm
            )
          }
        >

          {showForm
            ? "Close"
            : "Add Task"}

        </button>

      </div>

      {/* TASK FORM */}

      {showForm && (

        <div className="task-form">

          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={taskData.title}
            onChange={
              handleChange
            }
          />

          <input
            type="text"
            name="tag"
            placeholder="Task Tag"
            value={taskData.tag}
            onChange={
              handleChange
            }
          />

          <textarea
            name="desc"
            placeholder="Task Description"
            value={taskData.desc}
            onChange={
              handleChange
            }
          ></textarea>

          <button
            onClick={addTask}
          >
            Create Task
          </button>

        </div>
      )}

      {/* TASK LIST */}

      <div className="tasks-list">

        {loading ? (

          <p className="empty-tasks">
            Loading Tasks...
          </p>

        ) : tasks.length === 0 ? (

          <p className="empty-tasks">
            No Tasks Added Yet
          </p>

        ) : (

          tasks.map(
            (task) => (

              <div
                className="task-card"
                key={task.id}
              >

                {/* LEFT */}

                <div className="task-left">

                  <div
                    className={`task-status ${task.status}`}
                  ></div>

                  <div className="task-content">

                    <div className="task-top">

                      <h4>
                        {task.title}
                      </h4>

                      <span className="task-tag">
                        {task.tag}
                      </span>

                    </div>

                    <p>
                      {task.desc}
                    </p>

                    {/* PROGRESS */}

                    <div className="task-progress-wrapper">

                      <div className="task-progress-bar">

                        <div
                          className="task-progress-fill"
                          style={{
                            width: `${task.progress || 0}%`,
                          }}
                        ></div>

                      </div>

                      <span className="task-percent">

                        {task.progress || 0}%

                      </span>

                    </div>

                    {/* STATUS */}

                    <select
                      className="task-dropdown"
                      value={task.status}
                      onChange={(e) =>
                        updateTaskStatus(
                          task.id,
                          e.target.value
                        )
                      }
                    >

                      <option value="pending">
                        Pending
                      </option>

                      <option value="progress">
                        In Progress
                      </option>

                      <option value="completed">
                        Completed
                      </option>

                    </select>

                  </div>

                </div>

                {/* DELETE */}

                <button
                  className="delete-task-btn"
                  onClick={() =>
                    deleteTask(task.id)
                  }
                >
                  Delete
                </button>

              </div>
            )
          )

        )}

      </div>

    </section>
  );
}

export default TasksSection;