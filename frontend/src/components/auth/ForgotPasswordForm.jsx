import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { forgotPassword } from "../../services/authService";

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   setLoading(true);

  //   try {
  //     const response = await forgotPassword({
  //       email,
  //     });

  //     toast.success(response.message);

  //     localStorage.setItem("resetEmail", email);

  //     setTimeout(() => {
  //       navigate("/verify-reset-otp");
  //     }, 1200);
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || "Something went wrong.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    // Email Validation
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await forgotPassword({ email });

      toast.success(response.message);

      localStorage.setItem("resetEmail", email);

      setTimeout(() => {
        navigate("/verify-reset-otp");
      }, 1200);
    } catch (error) {
      const data = error.response?.data;

      if (data?.field) {
        setErrors((prev) => ({
          ...prev,
          [data.field]: data.message,
        }));
      } else {
        setErrors({
          general: data?.message || "Something went wrong.",
        });
      }

      toast.error(data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[530px]  flex justify-center items-center px-4">
      <div className="bg-gray-100 rounded-2xl shadow-xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center mb-2">Forgot Password</h2>

        <p className="text-center text-gray-500 mb-8">
          Enter your email to receive an OTP.
        </p>
        {errors.general && (
          <div className="mb-6 rounded-lg border border-red-300 bg-red-50 p-3 text-red-700">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* <input
            type="email"
            placeholder="Email Address"
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-black outline-none"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors({
                ...errors,
                email: "",
                general: "",
              });
            }}
            required
          /> */}

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors({
                ...errors,
                email: "",
                general: "",
              });
            }}
            className={`w-full rounded-lg px-4 py-3 outline-none transition focus:ring-2 ${
              errors.email
                ? "border border-red-500 focus:ring-red-200"
                : "border border-gray-300 focus:ring-black"
            }`}
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}

          {/* <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold ${
              loading
                ? "bg-gray-500"
                : "bg-black hover:bg-gray-800"
            }`}
          >

            {loading ? "Sending OTP..." : "Send OTP"}

          </button> */}

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center py-3 rounded-lg font-semibold text-white transition ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-black hover:bg-gray-900"
            }`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />

                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Sending OTP...
              </>
            ) : (
              "Send OTP"
            )}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link
            to="/login"
            className="text-black font-semibold hover:underline"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
