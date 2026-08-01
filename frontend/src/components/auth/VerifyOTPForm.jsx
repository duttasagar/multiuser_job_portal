import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { verify_OTP } from "../../services/authService";
import { toast } from "react-toastify";

const VerifyOTPForm = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("verifyEmail");
  const [errors, setErrors] = useState({});
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log("Verify button clicked");

  //   if (otp.length !== 6) {
  //     toast.error("Please enter a valid 6-digit OTP");
  //     return;
  //   }

  //   setLoading(true);

  //   try {
  //     console.log("Email:", email);
  //     console.log("OTP:", otp);

  //     const response = await verify_OTP({
  //       email,
  //       otp,
  //     });

  //     toast.success(response.message);

  //     localStorage.removeItem("verifyEmail");
  //     console.log("Redirecting...");
  //     navigate("/");
  //   } catch (error) {
  //     console.log(error.response.data);
  //     toast.error(error.response?.data?.message || "OTP Verification Failed");

  //     toast.error(error.response?.data?.message || "OTP Verification Failed");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!otp.trim()) {
      newErrors.otp = "OTP is required.";
    } else if (!/^\d{6}$/.test(otp)) {
      newErrors.otp = "Please enter a valid 6-digit OTP.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await verify_OTP({
        email,
        otp,
      });

      toast.success(response.message);

      localStorage.removeItem("verifyEmail");

      navigate("/");
    } catch (error) {
      const data = error.response?.data;

      if (data?.field) {
        setErrors((prev) => ({
          ...prev,
          [data.field]: data.message,
        }));
      } else {
        setErrors({
          general: data?.message || "OTP verification failed.",
        });
      }

      toast.error(data?.message || "OTP verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[500px] bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-black rounded-full flex items-center justify-center">
            <span className="text-white text-2xl">✉</span>
          </div>

          <h2 className="text-3xl font-bold text-black">Verify Email</h2>

          <p className="text-gray-500 mt-2">
            Enter the verification code sent to
          </p>

          <p className="font-semibold text-black break-all mt-1">{email}</p>
        </div>
        {errors.general && (
          <div className="mb-6 rounded-lg border border-red-300 bg-red-50 p-3 text-red-700">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* <input
            type="text"
            value={otp}
            maxLength={6}
            onChange={(e) => {
              setOtp(e.target.value.replace(/\D/g, ""));
              setErrors({
                ...errors,
                otp: "",
                general: "",
              });
            }}
            placeholder="Enter 6-digit OTP"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center text-2xl tracking-[0.5em] font-semibold outline-none focus:ring-2 focus:ring-black focus:border-black transition"
          /> */}

          <input
            type="text"
            value={otp}
            maxLength={6}
            placeholder="Enter 6-digit OTP"
            onChange={(e) => {
              setOtp(e.target.value.replace(/\D/g, ""));
              setErrors({
                ...errors,
                otp: "",
                general: "",
              });
            }}
            className={`w-full px-4 py-3 rounded-lg text-center text-2xl tracking-[0.5em] font-semibold outline-none transition focus:ring-2 ${
              errors.otp
                ? "border border-red-500 focus:ring-red-200"
                : "border border-gray-300 focus:ring-black focus:border-black"
            }`}
          />

          {errors.otp && (
            <p className="mt-2 text-sm text-red-600 text-left">{errors.otp}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center py-3 rounded-lg text-white font-semibold transition ${
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
                Verifying...
              </>
            ) : (
              "Verify OTP"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            className="text-gray-500 hover:text-black text-sm transition"
          >
            Resend OTP
          </button>
        </div>

        <div className="mt-4 text-center">
          <Link to="/" className="text-black font-medium hover:underline">
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTPForm;
