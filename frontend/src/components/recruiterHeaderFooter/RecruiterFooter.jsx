import { Link } from "react-router-dom";
import {
  FaGithub,
  FaLinkedin,
  FaGlobe,
} from "react-icons/fa";

export default function RecruiterFooter() {
  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="max-w-full px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-5">

          {/* Left */}
          <div className="text-center lg:text-left">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()}{" "}
              <span className="font-semibold text-slate-700">
                JobPortal
              </span>
              . All rights reserved.
            </p>
          </div>

          {/* Center */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <Link
              to="/privacy"
              className="text-sm text-slate-500 hover:text-blue-600 transition"
            >
              Privacy
            </Link>

            <Link
              to="/terms"
              className="text-sm text-slate-500 hover:text-blue-600 transition"
            >
              Terms
            </Link>

            <Link
              to="/contact"
              className="text-sm text-slate-500 hover:text-blue-600 transition"
            >
              Contact
            </Link>
          </div>

          {/* Right */}
          <div className="flex items-center justify-center gap-5">
            <a
              href="#"
              className="text-slate-500 hover:text-blue-600 transition"
            >
              <FaGlobe size={18} />
            </a>

            <a
              href="#"
              className="text-slate-500 hover:text-blue-600 transition"
            >
              <FaGithub size={18} />
            </a>

            <a
              href="#"
              className="text-slate-500 hover:text-blue-600 transition"
            >
              <FaLinkedin size={18} />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}



