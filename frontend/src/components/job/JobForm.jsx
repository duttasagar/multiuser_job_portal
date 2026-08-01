import { useEffect, useState } from "react";

import { createJob, updateJob } from "../../services/jobService";

import { getCompanies } from "../../services/companyService";

import toast from "react-hot-toast";

export default function JobForm({ job, closeModal, loadJobs }) {
  const [companies, setCompanies] = useState([]);

  const [formData, setFormData] = useState({
    company: "",
    title: "",
    description: "",
    location: "",
    salary: "",
    experience: "",
    vacancies: 1,
    skills: "",
    job_type: "full_time",
    deadline: "",
    is_active: true,
  });





  useEffect(() => {
  const loadCompanies = async () => {
    try {
      const res = await getCompanies();

      console.log(res.data); // check response

      setCompanies(res.data.data || []);
    } catch (error) {
      console.log(error.response?.data);
      toast.error("Failed to load companies");
    }
  };

  loadCompanies();
}, []);

  // fill data while editing

  useEffect(() => {
    if (job) {
      setFormData({
        company: job.company || "",
        title: job.title || "",
        description: job.description || "",
        location: job.location || "",
        salary: job.salary || "",
        experience: job.experience || "",
        vacancies: job.vacancies || 1,
        skills: job.skills || "",
        job_type: job.job_type || "full_time",
        deadline: job.deadline || "",
        is_active: job.is_active,
      });
    }
  }, [job]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,

      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (job) {
        // update

        await updateJob(job.id, formData);

        toast.success("Job updated successfully");
      } else {
        // create

        await createJob(formData);

        toast.success("Job created successfully");
      }

      loadJobs();

      closeModal();
    } catch (error) {
      console.log(error.response?.data);

      toast.error("Something went wrong");
    }
  };

  return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div className="flex justify-between items-center">
//         <h2 className="text-xl font-bold">{job ? "Edit Job" : "Add Job"}</h2>

//         <button
//           type="button"
//           onClick={closeModal}
//           className="text-gray-500 text-xl"
//         >
//           ✕
//         </button>
//       </div>

//       {/* Company */}

//       <select
//         name="company"
//         value={formData.company}
//         onChange={handleChange}
//         className="w-full border p-2 rounded"
//         required
//       >
//         <option value="">Select Company</option>

//         {companies.map((company) => (
//           <option key={company.id} value={company.id}>
//             {company.company_name}
//           </option>
//         ))}
//       </select>

//       <input
//         name="title"
//         value={formData.title}
//         onChange={handleChange}
//         placeholder="Job Title"
//         className="w-full border p-2 rounded"
//         required
//       />

//       <textarea
//         name="description"
//         value={formData.description}
//         onChange={handleChange}
//         placeholder="Job Description"
//         rows="4"
//         className="w-full border p-2 rounded"
//         required
//       />

//       <input
//         name="location"
//         value={formData.location}
//         onChange={handleChange}
//         placeholder="Location"
//         className="w-full border p-2 rounded"
//         required
//       />

//       <input
//         name="salary"
//         value={formData.salary}
//         onChange={handleChange}
//         placeholder="Salary (Optional)"
//         className="w-full border p-2 rounded"
//       />

//       <input
//         name="experience"
//         value={formData.experience}
//         onChange={handleChange}
//         placeholder="Experience (eg. 2 years)"
//         className="w-full border p-2 rounded"
//         required
//       />

//       <input
//         type="number"
//         name="vacancies"
//         value={formData.vacancies}
//         onChange={handleChange}
//         placeholder="Vacancies"
//         min="1"
//         className="w-full border p-2 rounded"
//         required
//       />

//       <textarea
//         name="skills"
//         value={formData.skills}
//         onChange={handleChange}
//         placeholder="Skills (React, Django, Python)"
//         rows="3"
//         className="w-full border p-2 rounded"
//       />

//       <select
//         name="job_type"
//         value={formData.job_type}
//         onChange={handleChange}
//         className="w-full border p-2 rounded"
//       >
//         <option value="full_time">Full Time</option>

//         <option value="part_time">Part Time</option>

//         <option value="internship">Internship</option>

//         <option value="contract">Contract</option>
//       </select>

//       <div>
//         <label className="block mb-1">Application Deadline</label>

//         <input
//           type="date"
//           name="deadline"
//           value={formData.deadline}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         />
//       </div>

//       <label className="flex gap-2 items-center">
//         <input
//           type="checkbox"
//           name="is_active"
//           checked={formData.is_active}
//           onChange={handleChange}
//         />
//         Active Job
//       </label>

//       <button
//         type="submit"
//         className="
// w-full
// bg-blue-600
// text-white
// py-2
// rounded-lg
// hover:bg-blue-700
// "
//       >
//         {job ? "Update Job" : "Create Job"}
//       </button>
//     </form>

<form onSubmit={handleSubmit} className="space-y-5">
  {/* Header */}
  <div className="flex items-center justify-between">
    <h2 className="text-lg sm:text-2xl font-bold">
      {job ? "Edit Job" : "Add Job"}
    </h2>

    <button
      type="button"
      onClick={closeModal}
      className="text-gray-500 hover:text-gray-700 text-2xl"
    >
      ✕
    </button>
  </div>

  {/* Company */}
  <select
    name="company"
    value={formData.company}
    onChange={handleChange}
    className="w-full border rounded-lg p-3"
    required
  >
    <option value="">Select Company</option>

    {companies.map((company) => (
      <option key={company.id} value={company.id}>
        {company.company_name}
      </option>
    ))}
  </select>

  {/* Job Title */}
  <input
    name="title"
    value={formData.title}
    onChange={handleChange}
    placeholder="Job Title"
    className="w-full border rounded-lg p-3"
    required
  />

  {/* Description */}
  <textarea
    name="description"
    value={formData.description}
    onChange={handleChange}
    placeholder="Job Description"
    rows="4"
    className="w-full border rounded-lg p-3"
    required
  />

  {/* Two Column Fields */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <input
      name="location"
      value={formData.location}
      onChange={handleChange}
      placeholder="Location"
      className="w-full border rounded-lg p-3"
      required
    />

    <input
      name="salary"
      value={formData.salary}
      onChange={handleChange}
      placeholder="Salary (Optional)"
      className="w-full border rounded-lg p-3"
    />
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <input
      name="experience"
      value={formData.experience}
      onChange={handleChange}
      placeholder="Experience (e.g. 2 years)"
      className="w-full border rounded-lg p-3"
      required
    />

    <input
      type="number"
      name="vacancies"
      value={formData.vacancies}
      onChange={handleChange}
      placeholder="Vacancies"
      min="1"
      className="w-full border rounded-lg p-3"
      required
    />
  </div>

  {/* Skills */}
  <textarea
    name="skills"
    value={formData.skills}
    onChange={handleChange}
    placeholder="Skills (React, Django, Python)"
    rows="3"
    className="w-full border rounded-lg p-3"
  />

  {/* Job Type & Deadline */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <select
      name="job_type"
      value={formData.job_type}
      onChange={handleChange}
      className="w-full border rounded-lg p-3"
    >
      <option value="full_time">Full Time</option>
      <option value="part_time">Part Time</option>
      <option value="internship">Internship</option>
      <option value="contract">Contract</option>
    </select>

    <div>
      <label className="block text-sm font-medium mb-1">
        Application Deadline
      </label>

      <input
        type="date"
        name="deadline"
        value={formData.deadline}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        required
      />
    </div>
  </div>

  {/* Active */}
  <label className="flex items-center gap-2 text-sm sm:text-base">
    <input
      type="checkbox"
      name="is_active"
      checked={formData.is_active}
      onChange={handleChange}
    />
    Active Job
  </label>

  {/* Submit */}
  <button
    type="submit"
    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition"
  >
    {job ? "Update Job" : "Create Job"}
  </button>
</form>


  );
}
