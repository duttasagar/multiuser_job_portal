import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { verifyResetOTP } from "../../services/authService";

const VerifyResetOTPForm = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const email = localStorage.getItem("resetEmail");

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   setLoading(true);

  //   try {
  //     const response = await verifyResetOTP({
  //       email,
  //       otp,
  //     });

  //     toast.success(response.message);

  //     // store email for reset password page
  //     localStorage.setItem("resetEmail", email);

  //     setTimeout(() => {
  //       navigate("/reset-password");
  //     }, 1000);
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || "Invalid OTP");
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
      newErrors.otp = "OTP must be 6 digits.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await verifyResetOTP({
        email,
        otp,
      });

      toast.success(response.message);

      localStorage.setItem("resetEmail", email);

      setTimeout(() => {
        navigate("/reset-password");
      }, 1000);
    } catch (error) {
      const data = error.response?.data;

      if (data?.field) {
        setErrors((prev) => ({
          ...prev,
          [data.field]: data.message,
        }));
      } else {
        setErrors({
          general: data?.message || "Invalid OTP.",
        });
      }

      toast.error(data?.message || "Invalid OTP.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-[500px] flex items-center justify-center  px-4">
      <div className="bg-gray-100 rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-2">Verify OTP</h2>

        <p className="text-center text-gray-500 mb-6">
          Enter the OTP sent to your email.
        </p>
        {errors.general && (
          <div className="mb-6 rounded-lg border border-red-300 bg-red-50 p-3 text-red-700">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* <input
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
              setErrors({
                ...errors,
                otp: "",
                general: "",
              });
            }}
            maxLength={6}
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-black outline-none"
          /> */}
          <input
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            maxLength={6}
            onChange={(e) => {
              setOtp(e.target.value);
              setErrors({
                ...errors,
                otp: "",
                general: "",
              });
            }}
            className={`w-full rounded-lg px-4 py-3 outline-none transition focus:ring-2 ${
              errors.otp
                ? "border border-red-500 focus:ring-red-200"
                : "border border-gray-300 focus:ring-black"
            }`}
          />

          {errors.otp && (
            <p className="mt-1 text-sm text-red-600">{errors.otp}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold ${
              loading ? "bg-gray-500" : "bg-black hover:bg-gray-800"
            }`}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyResetOTPForm;
