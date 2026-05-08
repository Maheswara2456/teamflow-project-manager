import "../../styles/dashboard/StatsCards.css";

import {
  useEffect,
  useState,
} from "react";

import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import {
  auth,
  db,
} from "../../firebase/firebase";

function StatsCards() {

  const [stats, setStats] =
    useState({
      totalProjects: 0,
      totalTasks: 0,
      pendingTasks: 0,
    });

  /* =====================================================
     FETCH DASHBOARD STATS
  ===================================================== */

  useEffect(() => {

    const unsubscribeAuth =
      auth.onAuthStateChanged(
        (user) => {

          if (!user) return;

          /* ================= PROJECTS ================= */

          const projectsQuery =
            query(
              collection(
                db,
                "projects"
              ),
              where(
                "createdBy",
                "==",
                user.uid
              )
            );

          const unsubscribeProjects =
            onSnapshot(
              projectsQuery,
              (snapshot) => {

                setStats(
                  (prev) => ({
                    ...prev,
                    totalProjects:
                      snapshot.size,
                  })
                );

              }
            );

          /* ================= TASKS ================= */

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

                const tasks =
                  snapshot.docs.map(
                    (doc) =>
                      doc.data()
                  );

                const pendingTasks =
                  tasks.filter(
                    (task) =>
                      task.status?.toLowerCase() !==
                      "completed"
                  ).length;

                setStats(
                  (prev) => ({
                    ...prev,
                    totalTasks:
                      tasks.length,
                    pendingTasks,
                  })
                );

              }
            );

          return () => {

            unsubscribeProjects();

            unsubscribeTasks();

          };
        }
      );

    return () =>
      unsubscribeAuth();

  }, []);

  /* =====================================================
     CARD DATA
  ===================================================== */

  const cards = [

    {
      icon: "📁",
      title: "Total Projects",
      value:
        stats.totalProjects,
      info:
        "Live Firebase Projects",
    },

    {
      icon: "✅",
      title: "Total Tasks",
      value:
        stats.totalTasks,
      info:
        "Realtime Task Tracking",
    },

    {
      icon: "⏳",
      title: "Pending Tasks",
      value:
        stats.pendingTasks,
      info:
        "Need Attention",
    },

  ];

  return (

    <section className="stats-grid">

      {cards.map(
        (card) => (

          <div
            className="stats-card"
            key={card.title}
          >

            <div className="stats-light"></div>

            <div className="stats-top">

              <div className="stats-icon">
                {card.icon}
              </div>

            </div>

            <h3 className="stats-title">
              {card.title}
            </h3>

            <h1 className="stats-value">
              {card.value}
            </h1>

            <p className="stats-info">
              {card.info}
            </p>

          </div>
        )
      )}

    </section>
  );
}

export default StatsCards;