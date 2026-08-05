import { FaEdit, FaTrash, FaGlobe } from "react-icons/fa";
import { deleteCompany } from "../../services/companyService";
import toast from "react-hot-toast";
import api from "../../api/axios";

export default function CompanyTable({
  companies,
  loading,
  onEdit,
  loadCompanies,
}) {
  // const BASE_URL = "http://127.0.0.1:8000";
  const BASE_URL = api.defaults.baseURL.replace(/\/$/, "");
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this company?",
    );

    if (!confirmDelete) return;

    try {
      await deleteCompany(id);

      toast.success("Company deleted successfully.");

      loadCompanies();
    } catch (error) {
      console.log(error);

      toast.error("Unable to delete company.");
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-10 text-center">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>

        <p className="mt-4 text-slate-500">Loading companies...</p>
      </div>
    );
  }

  if (companies.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-12 text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-3xl">
          🏢
        </div>

        <h2 className="mt-5 text-2xl font-semibold text-slate-700">
          No Companies Found
        </h2>

        <p className="mt-2 text-slate-500">
          Click <b>Add Company</b> to create your first company.
        </p>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-2xl shadow border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px]">
          <thead className="bg-slate-800 text-white">
            <tr className="text-left">
              <th className="px-6 py-4 w-16">#</th>
              <th className="px-6 py-4 w-[320px]">Company</th>
              <th className="px-6 py-4">Website</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Phone No.</th>
              <th className="px-6 py-4">description</th>

              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Created</th>
              <th className="px-6 py-4 text-center w-48">Actions</th>
            </tr>
          </thead>

          <tbody>
            {companies.map((company, index) => (
              <tr
                key={company.id}
                className="border-b border-slate-100 hover:bg-slate-50 transition"
              >
                <td className="px-6 py-5 font-semibold text-slate-500">
                  {index + 1}
                </td>

                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    {company.logo ? (
                      <img
                        src={
                          company.logo.startsWith("http")
                            ? company.logo
                            : `${BASE_URL}${company.logo}`
                        }
                        alt={company.company_name}
                        className="w-16 h-16 rounded-xl object-cover border"
                        onError={(e) => {
                          e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            company.company_name,
                          )}&size=200&background=f1f5f9&color=475569`;
                        }}
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-slate-100 border flex items-center justify-center text-xs font-semibold text-slate-500">
                        No Logo
                      </div>
                    )}

                    <div>
                      <h3 className="font-semibold text-slate-800 text-lg">
                        {company.company_name}
                      </h3>

                      <p className="text-sm text-slate-500">
                        Registered Company
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-5">
                  {company.website ? (
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
                    >
                      <FaGlobe />
                      Visit Website
                    </a>
                  ) : (
                    <span className="text-slate-400">Not Available</span>
                  )}
                </td>

                <td className="px-6 py-5 text-slate-600">
                  {company.email || "-"}
                </td>

                <td className="px-6 py-5">
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm">
                    {company.phone}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <span
                    title={company.description}
                    className="inline-block max-w-xs truncate rounded-lg bg-blue-50 px-3 py-1 text-sm text-blue-700"
                  >
                    {company.description}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm">
                    {company.location}
                  </span>
                </td>

                <td className="px-6 py-5 text-slate-600">
                  {new Date(company.created_at).toLocaleDateString()}
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => onEdit(company)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
                    >
                      <FaEdit />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(company.id)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
                    >
                      <FaTrash />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
