import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword } from "../../services/authService";

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const email = localStorage.getItem("resetEmail");

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
      general: "",
    });
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (formData.password.length < 8) {
  //     toast.error("Password must be at least 8 characters.");
  //     return;
  //   }

  //   if (formData.password !== formData.confirmPassword) {
  //     toast.error("Passwords do not match.");
  //     return;
  //   }

  //   setLoading(true);

  //   try {
  //     const response = await resetPassword({
  //       email,
  //       password: formData.password,
  //     });

  //     toast.success(response.message);

  //     localStorage.removeItem("resetEmail");

  //     setTimeout(() => {
  //       navigate("/");
  //     }, 1200);
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || "Unable to reset password.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    // Password Validation
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    // Confirm Password Validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await resetPassword({
        email,
        password: formData.password,
      });

      toast.success(response.message);

      localStorage.removeItem("resetEmail");

      setTimeout(() => {
        navigate("/");
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
          general: data?.message || "Unable to reset password.",
        });
      }

      toast.error(data?.message || "Unable to reset password.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200 p-10 mb-16">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-black">Reset Password</h2>

        <p className="text-gray-500 mt-3">
          Create a strong new password for your account.
        </p>
      </div>
      {errors.general && (
        <div className="mb-6 rounded-lg border border-red-300 bg-red-50 p-3 text-red-700">
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            New Password
          </label>

          {/* <input
            type="password"
            name="password"
            placeholder="Enter new password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-300"
          /> */}
          <input
            type="password"
            name="password"
            placeholder="Enter new password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full rounded-lg px-4 py-3 outline-none transition focus:ring-2 ${
              errors.password
                ? "border border-red-500 focus:ring-red-200"
                : "border border-gray-300 focus:border-black focus:ring-gray-300"
            }`}
          />

          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Confirm Password
          </label>

          {/* <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-300"
          /> */}

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full rounded-lg px-4 py-3 outline-none transition focus:ring-2 ${
              errors.confirmPassword
                ? "border border-red-500 focus:ring-red-200"
                : "border border-gray-300 focus:border-black focus:ring-gray-300"
            }`}
          />

          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold text-white transition ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-black hover:bg-gray-800"
          }`}
        >
          {loading ? (
            <div className="flex justify-center items-center gap-2">
              <svg
                className="animate-spin h-5 w-5"
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
              Updating Password...
            </div>
          ) : (
            "Reset Password"
          )}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
