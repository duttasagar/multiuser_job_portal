import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
// import VerifyOTP from "../components/auth/VerifyOTP";
import VerifyOTP from "../pages/auth/VerifyOTP";
import Dashboard from "../pages/seeker/SeekerDashboard";
import ProtectedRoute from "./ProtectedRoute";
import ForgotPassword from "../pages/auth/ForgotPassword";
import VerifyResetOTP from "../pages/auth/VerifyResetOTP";
import ResetPassword from "../pages/auth/ResetPassword";
import Companies from "../pages/recruiter/Companies";
import RecruiterLayout from "../layouts/RecruiterLayout";
import SeekerLayout from "../layouts/SeekerLayout";
import RecruiterDashboard from "../pages/recruiter/RecruiterDashboard";
import SeekerDashboard from "../pages/seeker/SeekerDashboard";
import Jobs from "../pages/recruiter/Jobs";
import Profile from "../pages/seeker/Job_Seeker_Profile";
import FindJobs from "../pages/seeker/FindJobs";
import JobDetails from "../components/job/JobDetails";
import Job_Seeker_Profile from "../pages/seeker/Job_Seeker_Profile";
import MyApplications from "../components/applications/MyApplications";
import CandidateApplications from "../pages/recruiter/CandidateApplications";
import RecruiterProfile from "../pages/recruiter/RecruiterProfile";
import Notifications from "../pages/seeker/Notifications";
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-reset-otp" element={<VerifyResetOTP />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Protected Routes */}
      {/* Recruiter */}

      <Route element={<ProtectedRoute allowedRole="recruiter" />}>
        <Route element={<RecruiterLayout />}>
          <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
          <Route path="/recruiter/companies" element={<Companies />} />
          <Route path="/recruiter/jobs" element={<Jobs />} />
          <Route path="/recruiter/profile" element={<Profile />} />
          <Route
            path="/recruiter/applications"
            element={<CandidateApplications />}
          />
          <Route
            path="/recruiter/recruiterProfile"
            element={<RecruiterProfile />}
          />
        </Route>
      </Route>

      {/* Protected Routes */}
      {/* JobSeeker */}

      <Route element={<ProtectedRoute allowedRole="job_seeker" />}>
        <Route element={<SeekerLayout />}>
          <Route path="/seeker/dashboard" element={<SeekerDashboard />} />
          <Route path="/seeker/jobs" element={<FindJobs />} />
          {/* <Route path="/seeker/jobs/:id" element={<JobDetails />} /> */}
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/seeker/profile" element={<Job_Seeker_Profile />} />
          <Route path="/seeker/applications" element={<MyApplications />} />
          <Route path="/seeker/notifications" element={<Notifications />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
