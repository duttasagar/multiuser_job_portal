import { useEffect, useState } from "react";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaFilePdf,
  FaCalendarAlt,
  FaBriefcase,
} from "react-icons/fa";

import { getMyApplications } from "../../services/applicationService";

export default function MyApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    loadApplications();
  }, []);


  const loadApplications = async () => {
    try {
      const data = await getMyApplications();
      setApplications(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "applied":
        return "bg-blue-100 text-blue-700";
      case "reviewing":
        return "bg-yellow-100 text-yellow-700";
      case "shortlisted":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-5">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          My Applications
        </h1>

        {applications.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-12 text-center text-gray-500">
            No applications found.
          </div>
        ) : (
          <div className="grid gap-6">
            {applications.map((app) => (
              <div
                key={app.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition duration-300 border border-gray-100 overflow-hidden"
              >
                {/* Header */}
                
                {/* <div className="flex justify-between items-center p-6 border-b bg-gray-50">
                  <div className="flex items-center gap-5">

                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">
                        {app.job_title}
                      </h2>

                      <p className="text-gray-600 font-medium">
                        {app.company_name}
                      </p>

                      <div className="flex items-center gap-2 text-gray-500 mt-1">
                        <FaMapMarkerAlt />
                        {app.company_location}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold capitalize ${getStatusColor(
                      app.status
                    )}`}
                  >
                    {app.status}
                  </span>
                </div> */}

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 p-4 sm:p-6 border-b bg-gray-50">
  <div className="flex items-start gap-4">
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
        {app.job_title}
      </h2>

      <p className="text-gray-600 font-medium">
        {app.company_name}
      </p>

      <div className="flex items-center gap-2 text-gray-500 mt-1 text-sm sm:text-base">
        <FaMapMarkerAlt />
        {app.company_location}
      </div>
    </div>
  </div>

  <span
    className={`self-start sm:self-auto px-4 py-2 rounded-full text-sm font-semibold capitalize ${getStatusColor(
      app.status
    )}`}
  >
    {app.status}
  </span>
</div>

                {/* Body */}
                <div className="grid md:grid-cols-2 gap-8 p-6">

                  <div className="space-y-4">

                    <div className="flex items-center gap-3">
                      <FaEnvelope className="text-blue-600" />
                      <span>{app.company_email}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <FaPhone className="text-green-600" />
                      <span>{app.company_phone}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <FaGlobe className="text-purple-600" />
                      <a
                        href={app.company_website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {app.company_website}
                      </a>
                    </div>

                    <div className="flex items-center gap-3">
                      <FaEnvelope className="text-red-500" />
                      <span>{app.user_email}</span>
                    </div>

                  </div>

                  <div className="space-y-4">

                    <div className="flex items-center gap-3">
                      <FaCalendarAlt className="text-orange-500" />
                      <span>
                        {new Date(app.applied_at).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <FaBriefcase className="text-indigo-600" />
                      <span>{app.job_title}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <FaFilePdf className="text-red-600" />

                      <a
                        href={app.resume}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-blue-600 hover:underline"
                      >
                        View Resume
                      </a>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}