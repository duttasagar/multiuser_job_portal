import { useEffect, useState } from "react";
import {
  FaUserCheck,
  FaBriefcase,
  FaCalendarCheck,
  FaClipboardList,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { getMyApplications } from "../../services/applicationService";
import { getProfileCompletion } from "../../services/profileService";

export default function SeekerDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [applications, setApplications] = useState([]);
  const [completion, setCompletion] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadApplications = async () => {
    try {
      const data = await getMyApplications();
      setApplications(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const loadCompletion = async () => {
    try {
      const data = await getProfileCompletion();
      setCompletion(data.completion);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadApplications();
    loadCompletion();
  }, []);

  const stats = [
    {
      title: "Applied",
      value: applications.length,
      icon: <FaBriefcase />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Review",
      value: applications.filter((app) => app.status === "reviewing").length,
      icon: <FaClipboardList />,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Selected",
      value: applications.filter((app) => app.status === "shortlisted").length,
      icon: <FaCalendarCheck />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Profile",
      value: `${completion}%`,
      icon: <FaUserCheck />,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div
      className="
      h-[calc(100vh-5rem)]
      overflow-hidden
      space-y-5
      "
    >
      {/* Welcome */}

      <div
        className="
        bg-white
        rounded-2xl
        border
        border-slate-200
        shadow-sm
        p-6
        "
      >
        <h1
          className="
          text-2xl
          lg:text-3xl
          font-bold
          text-slate-800
          "
        >
          Welcome back, {user?.username} 👋
        </h1>

        <p
          className="
          text-slate-500
          mt-2
          "
        >
          You have applied for{" "}
          <span className="font-semibold text-blue-600">
            {applications.length}
          </span>{" "}
          jobs. Keep applying to increase your chances.
        </p>
      </div>

      {/* Stats Cards */}

      <div
        className="
        grid
        grid-cols-4
        gap-3
        "
      >
        {stats.map((item) => (
          <div
            key={item.title}
            className="
            bg-white
            rounded-xl
            border
            border-slate-200
            shadow-sm
            p-3
            "
          >
            <div
              className="
              flex
              justify-between
              items-center
              "
            >
              <div>
                <p
                  className="
                  text-xs
                  text-slate-500
                  "
                >
                  {item.title}
                </p>

                <h2
                  className="
                  text-xl
                  font-bold
                  text-slate-800
                  "
                >
                  {item.value}
                </h2>
              </div>

              <div
                className={`
                w-10
                h-10
                rounded-lg
                flex
                items-center
                justify-center
                ${item.color}
                `}
              >
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Profile Completion */}

      <div
        className="
        bg-white
        border
        border-slate-200
        rounded-2xl
        shadow-sm
        p-6
        "
      >
        <div
          className="
          flex
          items-center
          gap-8
          "
        >
          <div className="w-32">
            <CircularProgressbar value={completion} text={`${completion}%`} />
          </div>

          <div>
            <h2
              className="
              text-2xl
              font-bold
              text-slate-800
              "
            >
              Profile Completion
            </h2>

            <p
              className="
              text-slate-500
              mt-2
              "
            >
              Complete your profile to increase your chances of getting noticed
              by recruiters.
            </p>

            {/* <button
              className="
              mt-4
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-6
              py-2
              rounded-xl
              "
              onClick={() => navigate("/seeker/profile")}
            >
              Complete Profile
            </button> */}

            <button
  onClick={() => {
    if (completion < 100) {
      navigate("/seeker/profile");
    }
  }}
  disabled={completion === 100}
  className={`
    mt-4
    px-6
    py-2
    rounded-xl
    text-white
    transition

    ${
      completion === 100
        ? "bg-green-600 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700"
    }
  `}
>
  {completion === 100 ? "Completed" : "Complete Profile"}
</button>
          </div>
        </div>
      </div>

      {/* Recent Applications */}

      <div
        className="
        bg-white
        border
        border-slate-200
        rounded-2xl
        shadow-sm
        p-5
        h-[300px]
        flex
        flex-col
        "
      >
        <div
          className="
          flex
          justify-between
          items-center
          mb-4
          "
        >
          <h2
            className="
            text-xl
            font-bold
            text-slate-800
            "
          >
            Recent Applications
          </h2>
        </div>

        <div
          className="
          overflow-y-auto
          space-y-3
          pr-2
          "
        >
          {applications.length === 0 ? (
            <p
              className="
                text-center
                text-slate-500
                py-6
              "
            >
              No applications yet.
            </p>
          ) : (
            applications.slice(0, 10).map((app) => (
              <div
                key={app.id}
                className="
                  flex
                  justify-between
                  items-center
                  bg-slate-50
                  rounded-xl
                  p-4
                  "
              >
                <div>
                  <h3
                    className="
                      font-semibold
                      text-slate-800
                      "
                  >
                    {app.job_title}
                  </h3>

                  <p
                    className="
                      text-sm
                      text-slate-500
                      "
                  >
                    {app.company_name}
                  </p>
                </div>

                <span
                  className={`
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-semibold
                    capitalize

                    ${
                      app.status === "shortlisted"
                        ? "bg-green-100 text-green-700"
                        : app.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : app.status === "reviewing"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-blue-100 text-blue-700"
                    }

                    `}
                >
                  {app.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
