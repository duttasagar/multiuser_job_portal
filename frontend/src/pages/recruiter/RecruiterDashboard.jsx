import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  FaBuilding,
  FaBriefcase,
  FaUsers,
  FaCheckCircle,
  FaArrowRight,
  FaPlus,
} from "react-icons/fa";

import { getDashboard } from "../../services/recruiterDashboardService";

export default function RecruiterDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboard();
      setDashboard(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }

  const stats = [
    {
      title: "Total Jobs",
      value: dashboard?.stats?.jobs || 0,
      icon: <FaBriefcase />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Companies",
      value: dashboard?.stats?.companies || 0,
      icon: <FaBuilding />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Applications",
      value: dashboard?.stats?.applications || 0,
      icon: <FaUsers />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Shortlisted",
      value: dashboard?.stats?.shortlisted || 0,
      icon: <FaCheckCircle />,
      color: "bg-amber-100 text-amber-600",
    },
  ];

  return (
    <div className="space-y-6 lg:space-y-8">

      {/* Welcome */}
      <div className="bg-white rounded-2xl border shadow-sm p-5 sm:p-6 lg:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold break-words">
          Welcome back, {user?.username} 👋
        </h1>

        <p className="text-sm sm:text-base text-gray-500 mt-2">
          Manage your jobs and applications.
        </p>
      </div>

      {/* Stats */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-2xl border shadow-sm p-5 lg:p-6 hover:shadow-md transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">
                  {item.title}
                </p>

                <h2 className="text-2xl lg:text-3xl font-bold mt-2">
                  {item.value}
                </h2>
              </div>

              <div
                className={`w-12 h-12 lg:w-14 lg:h-14 rounded-xl flex items-center justify-center text-xl lg:text-2xl ${item.color}`}
              >
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div> */}

      {/* Stats */}
<div className="grid grid-cols-4 gap-2 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4 xl:gap-6">
  {stats.map((item) => (
    <div
      key={item.title}
      className="bg-white rounded-xl border shadow-sm p-2 sm:p-5 lg:p-6 hover:shadow-md transition"
    >
      <div className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[10px] sm:text-sm text-gray-500 leading-tight">
            {item.title}
          </p>

          <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold mt-1 sm:mt-2">
            {item.value}
          </h2>
        </div>

        <div
          className={`mt-2 sm:mt-0 w-8 h-8 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-lg flex items-center justify-center text-sm sm:text-xl lg:text-2xl ${item.color}`}
        >
          {item.icon}
        </div>
      </div>
    </div>
  ))}
</div>

      {/* Recent Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Recent Jobs */}
        <div className="bg-white rounded-2xl border shadow-sm p-5 lg:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
            <h2 className="font-semibold text-lg sm:text-xl">
              Recent Jobs
            </h2>

            <Link
              to="/recruiter/jobs"
              className="text-blue-600 flex items-center gap-2 hover:text-blue-700"
            >
              View All
              <FaArrowRight />
            </Link>
          </div>

          <div className="space-y-3">
            {dashboard?.recent_jobs?.length > 0 ? (
              dashboard.recent_jobs.map((job) => (
                <div
                  key={job.id}
                  className="border rounded-xl p-4 hover:shadow-md transition"
                >
                  <h3 className="font-semibold break-words">
                    {job.title}
                  </h3>

                  <p className="text-sm text-gray-500 break-words">
                    {job.location}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No jobs found.</p>
            )}
          </div>
        </div>

        {/* Recent Applications */}
        <div className="bg-white rounded-2xl border shadow-sm p-5 lg:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
            <h2 className="font-semibold text-lg sm:text-xl">
              Recent Applications
            </h2>

            <Link
              to="/recruiter/applications"
              className="text-blue-600 flex items-center gap-2 hover:text-blue-700"
            >
              View All
              <FaArrowRight />
            </Link>
          </div>

          <div className="space-y-3">
            {dashboard?.recent_applications?.length > 0 ? (
              dashboard.recent_applications.map((app) => (
                <div
                  key={app.id}
                  className="border rounded-xl p-4 hover:shadow-md transition"
                >
                  <h3 className="font-semibold break-words">
                    {app.user__username}
                  </h3>

                  <p className="text-sm text-gray-500 break-words">
                    {app.job__title}
                  </p>

                  <span className="inline-block mt-2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                    {app.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">
                No applications found.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border shadow-sm p-5 lg:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-5">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <Link
            to="/recruiter/companies"
            className="border rounded-xl p-5 hover:bg-blue-50 hover:shadow-md transition flex items-center justify-center gap-2 text-center"
          >
            <FaPlus />
            Add Company
          </Link>

          <Link
            to="/recruiter/jobs"
            className="border rounded-xl p-5 hover:bg-blue-50 hover:shadow-md transition flex items-center justify-center gap-2 text-center"
          >
            <FaPlus />
            Post Job
          </Link>

          <Link
            to="/recruiter/applications"
            className="border rounded-xl p-5 hover:bg-blue-50 hover:shadow-md transition flex items-center justify-center gap-2 text-center"
          >
            <FaUsers />
            Applications
          </Link>

          <Link
            to="/recruiter/recruiterProfile"
            className="border rounded-xl p-5 hover:bg-blue-50 hover:shadow-md transition flex items-center justify-center gap-2 text-center"
          >
            <FaPlus />
            Profile
          </Link>
        </div>
      </div>
    </div>
  );
}


