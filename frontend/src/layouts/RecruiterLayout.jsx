import { Outlet } from "react-router-dom";
import RecruiterHeader from "../components/recruiterHeaderFooter/RecruiterHeader";
import RecruiterSidebar from "../components/recruiterHeaderFooter/RecruiterSidebar";
import RecruiterFooter from "../components/recruiterHeaderFooter/RecruiterFooter";

export default function RecruiterLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <RecruiterSidebar />

      {/* Header */}
      <RecruiterHeader />

      {/* Main Content */}
      <div className="flex flex-col min-h-screen lg:ml-72">
        <main className="flex-1 pt-20 px-4 sm:px-6 lg:px-8 pb-6">
          <Outlet />
        </main>

        <RecruiterFooter />
      </div>
    </div>
  );
}


