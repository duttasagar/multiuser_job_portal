import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaBuilding,
  FaRegBookmark,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import applyJob, { getMyApplications } from "../../services/applicationService";
import toast from "react-hot-toast";

export default function BrowseJobs({ jobs = [], loading }) {
  const navigate = useNavigate();
  const [appliedJobs, setAppliedJobs] = useState({});

  const loadAppliedJobs = async () => {
    try {
      const applications = await getMyApplications();

      const applied = {};

      applications.forEach((application) => {
        applied[application.job] = true;
      });

      setAppliedJobs(applied);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadAppliedJobs();
  }, []);

  const handleApply = async (jobId) => {
    try {
      await applyJob(jobId);

      toast.success("Application submitted successfully");

      setAppliedJobs((prev) => ({
        ...prev,
        [jobId]: true,
      }));
    } catch (err) {
      toast.error(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Unable to apply",
      );
    }
  };

  if (loading) {
    return (
      <div
        className="
        text-center
        py-10
        text-base
        sm:text-lg
        font-medium
        text-gray-600
      "
      >
        Loading jobs...
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div
        className="
        text-center
        py-10
        text-gray-500
      "
      >
        No jobs available.
      </div>
    );
  }

  return (
    <div className="space-y-5 sm:space-y-6">
      {jobs.map((job) => (
        <div
          key={job.id}
          className="
            w-full
            bg-white
            border
            border-gray-200
            rounded-2xl
            shadow-sm
            hover:shadow-lg
            hover:border-indigo-200
            transition
            duration-300
            p-4
            sm:p-6
          "
        >
          {/* Top Section */}

          <div
            className="
              flex
              flex-col
              lg:flex-row
              lg:justify-between
              gap-5
            "
          >
            {/* Left Content */}

            <div className="flex-1">
              <h2
                className="
                  text-xl
                  sm:text-2xl
                  font-bold
                  text-gray-800
                  break-words
                "
              >
                {job.title}
              </h2>

              <div
                className="
                  flex
                  items-center
                  gap-2
                  mt-2
                  text-gray-600
                  text-sm
                  sm:text-base
                "
              >
                <FaBuilding className="text-gray-400" />

                <span className="font-medium">
                  {job.company_name || "Company Name"}
                </span>
              </div>

              {/* Badges */}

              <div
                className="
                  flex
                  flex-wrap
                  gap-2
                  mt-4
                "
              >
                <span
                  className="
                  flex
                  items-center
                  gap-2
                  px-3
                  py-2
                  rounded-full
                  bg-gray-100
                  text-gray-700
                  text-xs
                  sm:text-sm
                  "
                >
                  <FaMapMarkerAlt />

                  {job.location}
                </span>

                <span
                  className="
                  flex
                  items-center
                  gap-2
                  px-3
                  py-2
                  rounded-full
                  bg-indigo-50
                  text-indigo-700
                  text-xs
                  sm:text-sm
                  capitalize
                  "
                >
                  <FaBriefcase />

                  {job.job_type.replace("_", " ")}
                </span>
              </div>
            </div>

            {/* Right Side */}

            <div
              className="
                flex
                flex-row
                lg:flex-col
                justify-between
                lg:items-end
                gap-4
              "
            >
              {/* Save Button */}

              {/* <button
                className="
                  w-10
                  h-10
                  rounded-full
                  border
                  border-gray-200
                  flex
                  items-center
                  justify-center
                  text-gray-500
                  hover:text-indigo-600
                  hover:border-indigo-300
                  hover:bg-indigo-50
                "
              >
                <FaRegBookmark size={18} />
              </button> */}

              {/* Buttons */}

              <div
                className="
                  flex
                  flex-col
                  sm:flex-row
                  gap-3
                "
              >
                <button
                  disabled={appliedJobs[job.id]}
                  onClick={() => handleApply(job.id)}
                  className={`
                    px-5
                    py-2.5
                    rounded-xl
                    font-medium
                    text-sm
                    sm:text-base
                    text-white
                    transition

                    ${
                      appliedJobs[job.id]
                        ? "bg-green-600 cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-700"
                    }
                  `}
                >
                  {appliedJobs[job.id] ? "Applied" : "Apply Now"}
                </button>

                <button
                  onClick={() => navigate(`/jobs/${job.id}`)}
                  className="
                    px-5
                    py-2.5
                    rounded-xl
                    border
                    border-indigo-600
                    text-indigo-600
                    hover:bg-indigo-50
                    text-sm
                    sm:text-base
                  "
                >
                  View Details
                </button>
              </div>
            </div>
          </div>

          {/* Description */}

          <div
            className="
              mt-5
              pt-5
              border-t
              border-gray-100
            "
          >
            <p
              className="
                text-gray-600
                text-sm
                sm:text-base
                leading-6
                sm:leading-7
                line-clamp-3
              "
            >
              {job.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
