import { Outlet } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import SeekerHeader from "../components/seekerHeaderFooter/SeekerHeader";
import SeekerSidebar from "../components/seekerHeaderFooter/SeekerSidebar";
import SeekerFooter from "../components/seekerHeaderFooter/SeekerFooter";

export default function SeekerLayout() {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");

    navigate("/");
  };


  return (
    <div className="min-h-screen bg-slate-50">

      {/* Sidebar */}
      <SeekerSidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />


      {/* Desktop Header */}
      <SeekerHeader setIsOpen={setIsOpen} />


      {/* Mobile Header */}
      <header
        className="
        lg:hidden
        fixed
        top-0
        left-0
        right-0
        h-16
        bg-white
        border-b
        border-slate-200
        shadow-sm
        flex
        items-center
        justify-between
        px-4
        z-40
        "
      >

        {/* Hamburger */}
        <button
          onClick={() => setIsOpen(true)}
          className="
          text-2xl
          text-slate-700
          "
        >
          <FaBars />
        </button>


        {/* Logo */}
        <h1
          className="
          text-lg
          font-bold
          text-slate-800
          "
        >
          JobPortal
        </h1>


        {/* Logout */}
        <button
          onClick={handleLogout}
          className="
          flex
          items-center
          gap-1
          text-red-600
          font-medium
          "
        >
          <FaSignOutAlt />

          <span className="hidden sm:inline">
            Logout
          </span>

        </button>

      </header>



      {/* Main Content */}
      <div
        className="
        lg:ml-72
        lg:pt-20
        pt-16
        min-h-screen
        flex
        flex-col
        "
      >

        <main
          className="
          flex-1
          p-4
          md:p-6
          "
        >
          <Outlet />
        </main>


        <SeekerFooter />

      </div>

    </div>
  );
}