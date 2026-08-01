import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaUser,
  FaBriefcase,
  FaBuilding,
  FaMapMarkerAlt,
  FaFileAlt,
} from "react-icons/fa";
import { updateApplicationStatus } from "../../services/applicationService";

import { getRecruiterApplications } from "../../services/applicationService";

export default function CandidateApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadApplications = async () => {
    try {
      const data = await getRecruiterApplications();
      setApplications(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await updateApplicationStatus(id, status);

      toast.success("Status Updated");

      loadApplications();
    } catch (error) {
      console.log(error);

      toast.error("Unable to Update");
    }
  };

  const statusColor = {
    applied: "bg-blue-100 text-blue-700",
    reviewing: "bg-yellow-100 text-yellow-700",
    shortlisted: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        Loading Applications...
      </div>
    );
  }

return (
  <div className="space-y-6 p-4 sm:p-6">
    {/* Header */}
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
        Candidate Applications
      </h1>

      <p className="text-sm sm:text-base text-slate-500 mt-2">
        Review all applications received for your job postings.
      </p>
    </div>

    {applications.length === 0 ? (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm py-16 text-center text-slate-500">
        No applications received yet.
      </div>
    ) : (
      <>
        {/* ================= MOBILE ================= */}
        <div className="md:hidden space-y-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="bg-white rounded-xl border border-slate-200 shadow-sm p-4"
            >
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <FaUser />
                    {app.applicant_name}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {app.applicant_email}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <FaBriefcase className="text-blue-600" />
                  {app.job_title}
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <FaBuilding />
                  {app.company_name}
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <FaMapMarkerAlt className="text-red-500" />
                  {app.company_location}
                </div>

                <div>
                  {app.resume ? (
                    <a
                      href={`http://127.0.0.1:8000${app.resume}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600"
                    >
                      <FaFileAlt />
                      View Resume
                    </a>
                  ) : (
                    <span className="text-slate-400 text-sm">
                      No Resume
                    </span>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Status
                  </label>

                  <select
                    value={app.status}
                    onChange={(e) =>
                      handleStatusChange(app.id, e.target.value)
                    }
                    className="mt-1 w-full border rounded-lg p-2"
                  >
                    <option value="applied">Applied</option>
                    <option value="reviewing">Reviewing</option>
                    <option value="shortlisted">Shortlisted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                <p className="text-sm text-slate-500">
                  Applied:{" "}
                  {new Date(app.applied_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ================= DESKTOP ================= */}
        <div className="hidden md:block bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-100">
                <tr className="text-left">
                  <th className="px-6 py-4">Candidate</th>
                  <th className="px-6 py-4">Job</th>
                  <th className="px-6 py-4">Company</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Resume</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Applied On</th>
                </tr>
              </thead>

              <tbody>
                {applications.map((app) => (
                  <tr
                    key={app.id}
                    className="border-t hover:bg-slate-50 transition"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <FaUser className="text-slate-500" />
                        {app.applicant_name}
                      </div>

                      <p className="text-sm text-slate-500 mt-1">
                        {app.applicant_email}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <FaBriefcase className="text-blue-600" />
                        {app.job_title}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <FaBuilding />
                        {app.company_name}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-red-500" />
                        {app.company_location}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      {app.resume ? (
                        <a
                          href={`http://127.0.0.1:8000${app.resume}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-blue-600"
                        >
                          <FaFileAlt />
                          View Resume
                        </a>
                      ) : (
                        <span className="text-slate-400">
                          No Resume
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <select
                        value={app.status}
                        onChange={(e) =>
                          handleStatusChange(app.id, e.target.value)
                        }
                        className="border rounded-lg px-3 py-2"
                      >
                        <option value="applied">Applied</option>
                        <option value="reviewing">Reviewing</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>

                    <td className="px-6 py-4">
                      {new Date(app.applied_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    )}
  </div>
);
}
