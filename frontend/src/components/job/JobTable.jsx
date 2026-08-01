import { FaEdit, FaTrash } from "react-icons/fa";

export default function JobTable({ jobs, onEdit, onDelete }) {
  return (
    <>
      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-4"
          >
            <h3 className="text-lg font-semibold text-slate-800">
              {job.title}
            </h3>

            <div className="mt-3 space-y-2 text-sm text-gray-600">
              <p>
                <span className="font-medium">Company:</span>{" "}
                {job.company_name}
              </p>

              <p>
                <span className="font-medium">Location:</span>{" "}
                {job.location}
              </p>

              <p>
                <span className="font-medium">Vacancies:</span>{" "}
                {job.vacancies}
              </p>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => onEdit(job)}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100"
              >
                <FaEdit />
                Edit
              </button>

              <button
                onClick={() => onDelete(job.id)}
                className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100"
              >
                <FaTrash />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-xl shadow border border-gray-200">
        <table className="w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Company</th>
              <th className="p-4 text-left">Location</th>
              <th className="p-4 text-center">Vacancies</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {jobs.map((job) => (
              <tr
                key={job.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-4">{job.title}</td>

                <td className="p-4">{job.company_name}</td>

                <td className="p-4">{job.location}</td>

                <td className="p-4 text-center">{job.vacancies}</td>

                <td className="p-4">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => onEdit(job)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => onDelete(job.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {jobs.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-8 text-gray-500"
                >
                  No jobs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}










// import { FaEdit, FaTrash } from "react-icons/fa";

// export default function JobTable({ jobs, onEdit, onDelete }) {
//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full bg-white shadow rounded">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="p-3">Title</th>

//             <th className="p-3">Company</th>

//             <th className="p-3">Location</th>

//             <th className="p-3">Vacancies</th>

//             <th className="p-3">Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {jobs.map((job) => (
//             <tr key={job.id} className="border-b">
//               <td className="p-3">{job.title}</td>

//               <td className="p-3">{job.company_name}</td>

//               <td className="p-3">{job.location}</td>

//               <td className="p-3">{job.vacancies}</td>

//               <td className="p-3 flex gap-3">
//                 <button onClick={() => onEdit(job)} className="text-blue-600">
//                   <FaEdit />
//                 </button>

//                 <button
//                   onClick={() => onDelete(job.id)}
//                   className="text-red-600"
//                 >
//                   <FaTrash />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
