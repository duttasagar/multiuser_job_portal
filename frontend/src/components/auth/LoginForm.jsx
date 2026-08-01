import { useState } from "react";
import { login } from "../../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginForm = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await login(formData);

      localStorage.setItem("access", response.access);
      localStorage.setItem("refresh", response.refresh);
      localStorage.setItem("user", JSON.stringify(response.user));

      toast.success(response.message);

      setTimeout(() => {
        if (response.user.role === "recruiter") {
          navigate("/recruiter/dashboard");
        } else {
          navigate("/seeker/dashboard");
        }
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
          general: data?.message || "Login failed.",
        });
      }

      toast.error(data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Heading */}
      <div className="max-w-md mx-auto text-center mb-8">
        <h2 className="text-3xl font-bold text-black">
          Welcome Back
        </h2>

        <p className="mt-2 text-base text-gray-500">
          Sign in to continue to your Job Portal account.
        </p>
      </div>

      {/* Form Card */}
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
        {errors.general && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-base font-medium text-gray-700">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full rounded-lg px-4 py-3 text-base outline-none transition focus:ring-2 ${
                errors.email
                  ? "border border-red-500 focus:ring-red-200"
                  : "border border-gray-300 focus:border-black focus:ring-gray-300"
              }`}
            />

            {errors.email && (
              <p className="mt-2 text-sm text-red-600">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-base font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full rounded-lg px-4 py-3 text-base outline-none transition focus:ring-2 ${
                errors.password
                  ? "border border-red-500 focus:ring-red-200"
                  : "border border-gray-300 focus:border-black focus:ring-gray-300"
              }`}
            />

            {errors.password && (
              <p className="mt-2 text-sm text-red-600">
                {errors.password}
              </p>
            )}
          </div>

          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-gray-600 hover:text-black hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-base font-semibold text-white transition ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-black hover:bg-gray-800"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <svg
                  className="h-5 w-5 animate-spin"
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
                Signing In...
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="mt-8 border-t pt-6 text-center">
          <p className="text-base text-gray-600">
            Don't have an account?
          </p>

          <Link
            to="/register"
            className="inline-block mt-4 px-8 py-3 bg-black text-white rounded-lg text-base font-semibold hover:bg-gray-800 transition"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

















// import { useState } from "react";
// import { login } from "../../services/authService";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const LoginForm = () => {
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });

//     setErrors({
//       ...errors,
//       [e.target.name]: "",
//       general: "",
//     });
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   setLoading(true);

//   //   try {
//   //     const response = await login(formData);

//   //     localStorage.setItem("access", response.access);
//   //     localStorage.setItem("refresh", response.refresh);
//   //     localStorage.setItem("user", JSON.stringify(response.user));

//   //     toast.success(response.message);

//   //     setTimeout(() => {
//   //       navigate("/dashboard");
//   //     }, 1000);
//   //   } catch (error) {
//   //     toast.error(error.response?.data?.message || "Login Failed");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const newErrors = {};

//     // Email Validation
//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required.";
//     } else if (
//       !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
//     ) {
//       newErrors.email = "Enter a valid email address.";
//     }

//     // Password Validation
//     if (!formData.password) {
//       newErrors.password = "Password is required.";
//     }

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await login(formData);
//       console.log("LOGIN RESPONSE:", response);

//       localStorage.setItem("access", response.access);
//       localStorage.setItem("refresh", response.refresh);
//       localStorage.setItem("user", JSON.stringify(response.user));

//       toast.success(response.message);

//       setTimeout(() => {
//         if (response.user.role === "recruiter") {
//           navigate("/recruiter/dashboard");
//         } else {
//           navigate("/seeker/dashboard");
//         }
//       }, 1000);
//     } catch (error) {
//       const data = error.response?.data;

//       if (data?.field) {
//         setErrors((prev) => ({
//           ...prev,
//           [data.field]: data.message,
//         }));
//       } else {
//         setErrors({
//           general: data?.message || "Login failed.",
//         });
//       }

//       toast.error(data?.message || "Login failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full max-w-xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200 p-10">
//       <div className="text-center mb-10">
//         <h2 className="text-4xl font-bold text-black">Welcome Back</h2>

//         <p className="text-gray-500 mt-3">
//           Sign in to continue to your Job Portal account.
//         </p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label className="block mb-2 font-medium text-gray-700">
//             Email Address
//           </label>

//           <input
//             type="email"
//             name="email"
//             placeholder="Enter your email"
//             value={formData.email}
//             onChange={handleChange}
//             // className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-300"
//             className={`w-full rounded-lg px-4 py-3 outline-none transition focus:ring-2 ${
//               errors.email
//                 ? "border border-red-500 focus:ring-red-200"
//                 : "border border-gray-300 focus:border-black focus:ring-gray-300"
//             }`}
//           />
//           {errors.email && (
//             <p className="mt-1 text-sm text-red-600">{errors.email}</p>
//           )}
//         </div>

//         <div>
//           <label className="block mb-2 font-medium text-gray-700">
//             Password
//           </label>

//           <input
//             type="password"
//             name="password"
//             placeholder="Enter your password"
//             value={formData.password}
//             onChange={handleChange}
//             // className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-300"
//             className={`w-full rounded-lg px-4 py-3 outline-none transition focus:ring-2 ${
//               errors.password
//                 ? "border border-red-500 focus:ring-red-200"
//                 : "border border-gray-300 focus:border-black focus:ring-gray-300"
//             }`}
//           />
//           {errors.password && (
//             <p className="mt-1 text-sm text-red-600">{errors.password}</p>
//           )}
//         </div>

//         <div className="flex justify-end">
//           <Link
//             to="/forgot-password"
//             className="text-sm font-medium text-gray-600 hover:text-black hover:underline"
//           >
//             Forgot Password?
//           </Link>
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full py-3 rounded-lg font-semibold text-white transition ${
//             loading
//               ? "bg-gray-500 cursor-not-allowed"
//               : "bg-black hover:bg-gray-800"
//           }`}
//         >
//           {loading ? (
//             <div className="flex justify-center items-center gap-2">
//               <svg
//                 className="animate-spin h-5 w-5"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                 />

//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
//                 />
//               </svg>
//               Signing In...
//             </div>
//           ) : (
//             "Login"
//           )}
//         </button>
//       </form>

//       <div className="mt-8 border-t pt-6 text-center">
//         <p className="text-gray-600">Don't have an account?</p>

//         <Link
//           to="/register"
//           className="inline-block mt-4 px-8 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition"
//         >
//           Create Account
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;
