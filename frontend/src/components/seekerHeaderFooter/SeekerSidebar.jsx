import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../api/axios";
import {
  FaHome,
  FaBriefcase,
  FaBookmark,
  FaFileAlt,
  FaUserCircle,
  FaTimes,
} from "react-icons/fa";

export default function SeekerSidebar({ isOpen, setIsOpen }) {
  const [userImg, setUserImg] = useState(null);

  const user = JSON.parse(localStorage.getItem("user")) || {
    username: "Job Seeker",
    role: "Job Seeker",
  };

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await api.get("/profile/");
        setUserImg(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchProfile();
  }, []);

  const menuClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
      isActive
        ? "bg-blue-50 text-blue-600 shadow-sm"
        : "text-slate-600 hover:bg-slate-100 hover:text-blue-600"
    }`;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-72 bg-white border-r border-slate-200 shadow-sm
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Header */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-200">
          <h1 className="text-3xl font-bold text-slate-800">
            JobPortal
          </h1>

          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-xl text-slate-600"
          >
            <FaTimes />
          </button>
        </div>

        {/* Profile */}
        <div className="py-8 flex flex-col items-center border-b border-slate-200">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-100 shadow">
            <img
              src={
                userImg?.profile_image
                  ? `${api.defaults.baseURL}${userImg.profile_image}`
                  : "/images/profile.png"
              }
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          <h2 className="mt-4 text-xl font-semibold text-slate-800">
            {user.username}
          </h2>

          <p className="text-slate-500 mt-1">{user.role}</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-5 py-6 space-y-2">
          <NavLink
            to="/seeker/dashboard"
            className={menuClass}
            onClick={() => setIsOpen(false)}
          >
            <FaHome />
            Dashboard
          </NavLink>

          <NavLink
            to="/seeker/jobs"
            className={menuClass}
            onClick={() => setIsOpen(false)}
          >
            <FaBriefcase />
            Browse Jobs
          </NavLink>

          <NavLink
            to="/seeker/notifications"
            className={menuClass}
            onClick={() => setIsOpen(false)}
          >
            <FaBookmark />
            Notifications
          </NavLink>

          <NavLink
            to="/seeker/applications"
            className={menuClass}
            onClick={() => setIsOpen(false)}
          >
            <FaFileAlt />
            My Applications
          </NavLink>

          <NavLink
            to="/seeker/profile"
            className={menuClass}
            onClick={() => setIsOpen(false)}
          >
            <FaUserCircle />
            My Profile
          </NavLink>
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-200 px-6 py-5">
          <p className="text-sm text-slate-400 text-center">
            Job Seeker Portal
          </p>

          <p className="text-xs text-slate-400 text-center mt-1">
            Version 1.0
          </p>
        </div>
      </aside>
    </>
  );
}




