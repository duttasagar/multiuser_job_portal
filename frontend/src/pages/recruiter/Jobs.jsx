import { useEffect, useState } from "react";

import JobTable from "../../components/job/JobTable";
import JobForm from "../../components/job/JobForm";

import { getJobs, deleteJob } from "../../services/jobService";

import toast from "react-hot-toast";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [selectedJob, setSelectedJob] = useState(null);

  const loadJobs = async () => {
    try {
      const data = await getJobs();

      setJobs(data);
    } catch (error) {
      toast.error("Failed to load jobs");
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this job?")) return;

    try {
      await deleteJob(id);

      toast.success("Job deleted");

      loadJobs();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const handleAdd = () => {
    setSelectedJob(null);

    setShowModal(true);
  };

  const handleEdit = (job) => {
    setSelectedJob(job);

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);

    setSelectedJob(null);
  };

return (
  <div className="p-4 sm:p-6">
    {/* Header */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
          My Jobs
        </h1>

        <p className="text-sm sm:text-base text-slate-500 mt-1">
          Manage all your posted jobs.
        </p>
      </div>

      <button
        onClick={handleAdd}
        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg transition"
      >
        + Add Job
      </button>
    </div>

    <JobTable
      jobs={jobs}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />

    {showModal && (
      <div className="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center p-3 sm:p-6">
        <div
          className="
            bg-white
            w-full
            max-w-3xl
            rounded-t-2xl
            sm:rounded-2xl
            shadow-xl
            max-h-[95vh]
            overflow-y-auto
            p-4
            sm:p-6
          "
        >
          <JobForm
            job={selectedJob}
            closeModal={closeModal}
            loadJobs={loadJobs}
          />
        </div>
      </div>
    )}
  </div>
);}
