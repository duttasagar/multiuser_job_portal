import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJob } from "../../services/jobService";
import applyJob from "../../services/applicationService";
import { toast } from "react-toastify";

import {
  FaMapMarkerAlt,
  FaBuilding,
  FaBriefcase,
  FaMoneyBillWave,
  FaUsers,
} from "react-icons/fa";

export default function JobDetails() {
  const [applied, setApplied] = useState(false);
  const { id } = useParams();

  const [job, setJob] = useState(null);

  useEffect(() => {
    loadJob();
  }, []);

  const loadJob = async () => {
    const res = await getJob(id);
    setJob(res);
  };

  const handleApply = async (jobId) => {
    try {
      await applyJob(jobId);

      toast.success("Application submitted successfully");

      // Disable button after successful apply
      setApplied(true);
    } catch (err) {
      toast.error(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Unable to apply",
      );
    }
  };

  if (!job) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow border p-8">
        <h1 className="text-3xl font-bold">{job.title}</h1>

        <div className="flex items-center gap-2 mt-2 text-gray-600">
          <FaBuilding />
          {job.company_name}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="bg-gray-50 rounded-xl p-4">
            <FaMapMarkerAlt className="text-indigo-600 mb-2" />
            <p className="text-sm text-gray-500">Location</p>
            <p className="font-semibold">{job.location}</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <FaBriefcase className="text-indigo-600 mb-2" />
            <p className="text-sm text-gray-500">Job Type</p>
            <p className="font-semibold">{job.job_type}</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <FaMoneyBillWave className="text-indigo-600 mb-2" />
            <p className="text-sm text-gray-500">Salary</p>
            <p className="font-semibold">{job.salary}</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <FaUsers className="text-indigo-600 mb-2" />
            <p className="text-sm text-gray-500">Vacancies</p>
            <p className="font-semibold">{job.vacancies}</p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3">Skills Required</h2>

          <div className="flex flex-wrap gap-2">
            {job.skills.split(",").map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full"
              >
                {skill.trim()}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3">Job Description</h2>

          <p className="text-gray-600 leading-8">{job.description}</p>
        </div>

        <div className="mt-8">
          <button
            disabled={applied}
            onClick={() => handleApply(job.id)}
            className={`px-6 py-3 rounded-xl font-medium transition text-white
    ${
      applied
        ? "bg-green-600 cursor-not-allowed"
        : "bg-indigo-600 hover:bg-indigo-700"
    }`}
          >
            {applied ? "Applied" : "Apply Now"}
          </button>{" "}
        </div>
      </div>
    </div>
  );
}
