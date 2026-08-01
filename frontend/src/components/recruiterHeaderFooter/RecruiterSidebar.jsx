import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRecruiterProfile } from "../../services/recruiterProfileService";
import api from "../../api/axios";
import {
  FaHome,
  FaBuilding,
  FaBriefcase,
  FaUsers,
  FaUserCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function RecruiterSidebar() {
  const BASE_URL = api.defaults.baseURL;

  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [profileImage, setProfileImage] = useState(null);
  const [profileName, setProfileName] = useState(
    user.username || "Recruiter"
  );

  const [isOpen, setIsOpen] = useState(false);

  const menuClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
      isActive
        ? "bg-blue-600 text-white shadow-md"
        : "text-slate-600 hover:bg-slate-100 hover:text-blue-600"
    }`;

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getRecruiterProfile();

        setProfileName(data.full_name || user.username);

        if (data.profile_image) {
          setProfileImage(`${BASE_URL}${data.profile_image}`);
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadProfile();
  }, []);

  const menus = [
    {
      name: "Dashboard",
      icon: <FaHome />,
      path: "/recruiter/dashboard",
    },
    {
      name: "Companies",
      icon: <FaBuilding />,
      path: "/recruiter/companies",
    },
    {
      name: "Manage Jobs",
      icon: <FaBriefcase />,
      path: "/recruiter/jobs",
    },
    {
      name: "Applications",
      icon: <FaUsers />,
      path: "/recruiter/applications",
    },
    {
      name: "My Profile",
      icon: <FaUserCircle />,
      path: "/recruiter/recruiterProfile",
    },
  ];

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-3 rounded-lg shadow-lg"
      >
        <FaBars size={20} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed
          left-0
          top-0
          z-50
          w-72
          h-screen
          bg-white
          border-r
          border-slate-200
          shadow-lg
          flex
          flex-col
          transition-transform
          duration-300
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Header */}
        <div className="h-20 flex items-center justify-between px-8 border-b border-slate-200">
          <h1 className="text-3xl font-bold text-blue-600">
            JobPortal
          </h1>

          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-slate-600 hover:text-red-500"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* Profile */}
        <div className="py-8 flex flex-col items-center border-b border-slate-200">
          <img
            src={
              profileImage ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                profileName
              )}&size=200`
            }
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
          />

          <h2 className="mt-4 text-xl font-semibold text-slate-800 text-center px-4">
            {profileName}
          </h2>

          <span className="mt-2 px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700 capitalize">
            {user.role}
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-5 py-6 space-y-2 overflow-y-auto">

                    {menus.map((menu) => (
            <NavLink
              key={menu.path}
              to={menu.path}
              className={menuClass}
              onClick={() => setIsOpen(false)}
            >
              <span className="text-lg">{menu.icon}</span>
              <span>{menu.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-200 p-5 text-center">
          <p className="text-sm text-slate-500 font-medium">
            Recruiter Portal
          </p>

          <p className="text-xs text-slate-400 mt-1">
            © 2026 JobPortal
          </p>
        </div>
      </aside>
    </>
  );
}





