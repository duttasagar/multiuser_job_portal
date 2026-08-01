import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSignOutAlt,
  FaBell,
  FaUserCircle,
  FaBars,
} from "react-icons/fa";

import { getNotifications } from "../../services/notificationService";

export default function SeekerHeader({ setIsOpen }) {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (error) {
      console.log(error);
    }
  };


  const unread = notifications.filter(
    (item) => !item.is_read
  ).length;


  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");

    navigate("/");
  };


  return (
    <header
      className="
      fixed
      top-0
      left-0
      lg:left-72
      right-0
      h-20
      bg-white
      border-b
      border-slate-200
      shadow-sm
      z-40
      "
    >

      <div
        className="
        h-full
        px-4
        lg:px-8
        flex
        items-center
        justify-between
        "
      >


        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(true)}
          className="
          lg:hidden
          text-2xl
          text-slate-700
          "
        >
          <FaBars />
        </button>



        {/* Title */}
        <div className="hidden sm:block">

          <h1
            className="
            text-xl
            lg:text-3xl
            font-bold
            text-slate-800
            "
          >
            Job Seeker Dashboard
          </h1>


          <p
            className="
            hidden
            xl:block
            text-sm
            text-slate-500
            mt-1
            "
          >
            Discover jobs, track applications and manage your profile.
          </p>

        </div>



        {/* Mobile Logo */}
        <h1
          className="
          sm:hidden
          text-lg
          font-bold
          text-slate-800
          "
        >
          JobPortal
        </h1>




        {/* Right Section */}
        <div
          className="
          flex
          items-center
          gap-2
          lg:gap-5
          "
        >


          {/* Notification */}
          <button
            onClick={() => navigate("/seeker/notifications")}
            className="
            relative
            p-2
            rounded-full
            text-slate-600
            hover:bg-slate-100
            "
          >

            <FaBell size={20}/>


            {unread > 0 && (
              <span
                className="
                absolute
                -top-1
                -right-1
                min-w-5
                h-5
                rounded-full
                bg-red-600
                text-white
                text-xs
                flex
                items-center
                justify-center
                "
              >
                {unread}
              </span>
            )}

          </button>




          {/* Profile */}
          <button
            onClick={() => navigate("/seeker/profile")}
            className="
            flex
            items-center
            gap-2
            "
          >

            <div
              className="
              w-9
              h-9
              rounded-full
              bg-blue-100
              flex
              items-center
              justify-center
              text-blue-600
              "
            >
              <FaUserCircle size={24}/>
            </div>


            <div className="hidden md:block">
              <p className="text-sm font-semibold">
                Job Seeker
              </p>

              <p className="text-xs text-slate-500">
                Profile
              </p>
            </div>

          </button>





          {/* Logout */}
          <button
            onClick={handleLogout}
            className="
            flex
            items-center
            gap-2
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-3
            lg:px-5
            py-2
            rounded-lg
            "
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


