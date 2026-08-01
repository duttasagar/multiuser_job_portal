import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { X, UploadCloud } from "lucide-react";

import { createCompany, updateCompany } from "../../services/companyService";

const initialState = {
  company_name: "",
  website: "",
  email: "",
  phone: "",
  location: "",
  description: "",
};

export default function CompanyForm({
  isOpen,
  onClose,
  selectedCompany,
  loadCompanies,
}) {
  const companyRef = useRef(null);

  const [formData, setFormData] = useState(initialState);

  const [logo, setLogo] = useState(null);

  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedCompany) {
      setFormData({
        company_name: selectedCompany.company_name || "",
        website: selectedCompany.website || "",
        email: selectedCompany.email || "",
        phone: selectedCompany.phone || "",
        location: selectedCompany.location || "",
        description: selectedCompany.description || "",
      });

      setPreview(selectedCompany.logo || "");
      setLogo(null);
    } else {
      setFormData(initialState);
      setLogo(null);
      setPreview("");
    }

    setErrors({});
  }, [selectedCompany, isOpen]);

  useEffect(() => {
    if (isOpen) {
      companyRef.current?.focus();
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleLogo = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size should be less than 2MB.");
      return;
    }

    setLogo(file);

    setPreview(URL.createObjectURL(file));
  };

  const handleClose = () => {
    if (loading) return;

    setFormData(initialState);
    setLogo(null);
    setPreview("");
    setErrors({});

    onClose();
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.company_name.trim()) {
      newErrors.company_name = "Company name is required.";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required.";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
    }

    if (
      formData.email &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (formData.website && !/^https?:\/\/.+/i.test(formData.website)) {
      newErrors.website = "Website must start with http:// or https://";
    }

    if (formData.phone && !/^[0-9]{10,15}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must contain 10 to 15 digits.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the highlighted errors.");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();

      data.append("company_name", formData.company_name);
      data.append("website", formData.website);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("location", formData.location);
      data.append("description", formData.description);

      if (logo) {
        data.append("logo", logo);
      }

      if (selectedCompany) {
        await updateCompany(selectedCompany.id, data);

        toast.success("Company updated successfully.");
      } else {
        await createCompany(data);

        toast.success("Company created successfully.");
      }

      await loadCompanies();

      handleClose();
    } catch (error) {
      console.error(error);

      if (error.response?.data?.errors) {
        const backendErrors = {};

        Object.entries(error.response.data.errors).forEach(
          ([field, messages]) => {
            backendErrors[field] = Array.isArray(messages)
              ? messages[0]
              : messages;
          },
        );

        setErrors(backendErrors);

        toast.error("Please correct the highlighted fields.");
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
      } else if (error.code === "ERR_NETWORK") {
        toast.error("Unable to connect to the server.");
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && !loading) {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [loading]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl max-h-[90vh] rounded-2xl bg-white shadow-2xl flex flex-col"
      >
        {/* Header */}

        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-slate-50 px-8 py-5">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              {selectedCompany ? "Edit Company" : "Add Company"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Enter your company details below.
            </p>
          </div>

          <button
            onClick={handleClose}
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-slate-200 transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* Form */}

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Name */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Company Name
                <span className="text-red-500"> *</span>
              </label>

              <input
                ref={companyRef}
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                placeholder="Google Pvt Ltd"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />

              {errors.company_name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.company_name}
                </p>
              )}
            </div>

            {/* Website */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Website
              </label>

              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://company.com"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />

              {errors.website && (
                <p className="mt-1 text-sm text-red-500">{errors.website}</p>
              )}
            </div>

            {/* Email */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Company Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="hr@company.com"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />

              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Phone */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Phone Number
              </label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="9876543210"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />

              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
              )}
            </div>

            {/* Location */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Location
                <span className="text-red-500"> *</span>
              </label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Bangalore, India"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />

              {errors.location && (
                <p className="mt-1 text-sm text-red-500">{errors.location}</p>
              )}
            </div>

            {/* Logo */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Company Logo
              </label>

              <label className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 hover:border-blue-500 transition">
                <UploadCloud size={30} className="text-blue-600" />

                <p className="mt-2 text-sm text-slate-500">
                  Click to upload logo
                </p>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogo}
                  className="hidden"
                />
              </label>

              <div className="mt-4">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-24 w-24 rounded-lg border object-cover"
                  />
                ) : (
                  <div className="flex h-24 w-24 items-center justify-center rounded-lg border border-dashed border-slate-300 text-xs text-slate-400">
                    No Logo
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Description */}

          <div className="mt-6">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Company Description
              <span className="text-red-500"> *</span>
            </label>

            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Write a brief description about your company..."
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none resize-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />

            {errors.description && (
              <p className="mt-1 text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          {/* Footer */}

          <div className="sticky bottom-0 bg-white mt-8 flex items-center justify-end gap-4 border-t border-slate-200 px-8 py-5">
            <button
              type="button"
              disabled={loading}
              onClick={handleClose}
              className="rounded-lg border border-slate-300 px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="min-w-[180px] rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="h-5 w-5 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-20"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />

                    <path
                      className="opacity-100"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  Saving...
                </span>
              ) : selectedCompany ? (
                "Update Company"
              ) : (
                "Create Company"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
