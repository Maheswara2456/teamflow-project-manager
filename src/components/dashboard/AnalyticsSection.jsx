import "../../styles/dashboard/AnalyticsSection.css";

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

function AnalyticsSection() {

  const [analytics, setAnalytics] =
    useState({

      totalTasks: 0,

      completedTasks: 0,

      productivity: 0,

    });

  /* =====================================================
     FETCH TASK ANALYTICS
  ===================================================== */

  useEffect(() => {

    const user =
      auth.currentUser;

    if (!user) return;

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

    const unsubscribe =
      onSnapshot(
        tasksQuery,
        (snapshot) => {

          const tasks =
            snapshot.docs.map(
              (doc) =>
                doc.data()
            );

          const totalTasks =
            tasks.length;

          const completedTasks =
            tasks.filter(
              (task) =>

                task.status ===
                "completed"
            ).length;

          const productivity =
            totalTasks > 0

              ? Math.round(
                  (
                    completedTasks /
                    totalTasks
                  ) * 100
                )

              : 0;

          setAnalytics({

            totalTasks,

            completedTasks,

            productivity,

          });

        },
        (error) => {

          console.log(error);

        }
      );

    return () =>
      unsubscribe();

  }, []);

  /* =====================================================
     CHART DATA
  ===================================================== */

  const productivity =
    analytics.productivity;

  const chartData = [

    {
      day: "Mon",
      value:
        productivity > 0
          ? productivity - 12
          : 10,
    },

    {
      day: "Tue",
      value:
        productivity > 0
          ? productivity - 8
          : 20,
    },

    {
      day: "Wed",
      value:
        productivity > 0
          ? productivity - 5
          : 35,
    },

    {
      day: "Thu",
      value:
        productivity > 0
          ? productivity
          : 50,
    },

    {
      day: "Fri",
      value:
        productivity > 0
          ? productivity - 3
          : 40,
    },

    {
      day: "Sat",
      value:
        productivity > 0
          ? productivity - 10
          : 25,
    },

  ];

  /* =====================================================
     UI
  ===================================================== */

  return (

    <section className="analytics-section">

      {/* HEADER */}

      <div className="section-header">

        <div>

          <span className="section-label">
            Insights
          </span>

          <h2>
            Weekly Productivity
          </h2>

        </div>

        <button className="section-btn">
          Analytics
        </button>

      </div>

      {/* TOP */}

      <div className="analytics-top">

        <div className="analytics-info">

          <h1>
            {analytics.productivity}%
          </h1>

          <p>
            Overall Productivity
          </p>

        </div>

        <div className="analytics-badge">

          {analytics.completedTasks}
          {" "}
          Completed /
          {" "}
          {analytics.totalTasks}
          {" "}
          Tasks

        </div>

      </div>

      {/* CHART */}

      <div className="analytics-chart">

        {chartData.map(
          (item) => {

            const safeValue =
              Math.max(
                item.value,
                5
              );

            const height =
              safeValue * 2;

            return (

              <div
                className="chart-column"
                key={item.day}
              >

                {/* VALUE */}

                <span className="chart-value">

                  {safeValue}%

                </span>

                {/* BAR */}

                <div className="chart-bar-wrapper">

                  <div
                    className="chart-bar"
                    style={{
                      height:
                        `${height}px`,
                    }}
                  ></div>

                </div>

                {/* DAY */}

                <span className="chart-day">

                  {item.day}

                </span>

              </div>
            );
          }
        )}

      </div>

    </section>
  );
}

export default AnalyticsSection;