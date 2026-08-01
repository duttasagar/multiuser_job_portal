import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

export default function RecruiterHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 lg:left-72 right-0 h-20 bg-white border-b border-slate-200 shadow-sm z-30">
      <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left */}
        <div className="min-w-0 ml-16 lg:ml-0">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 truncate">
            Recruiter Dashboard
          </h1>

          <p className="hidden sm:block text-sm text-slate-500 mt-1">
            Manage jobs, companies and applications.
          </p>
        </div>

        {/* Right */}
        <div className="flex items-center">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-5 py-2 rounded-lg transition"
          >
            <FaSignOutAlt />

            <span className="hidden sm:inline">
              Logout
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}



