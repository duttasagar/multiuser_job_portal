import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/axios";

import {
  getRecruiterProfile,
  createRecruiterProfile,
  updateRecruiterProfile,
} from "../../services/recruiterProfileService";

export default function RecruiterProfile() {
  // const BASE_URL = api.defaults.baseURL;
  const BASE_URL = api.defaults.baseURL.replace(/\/$/, "");
  const user = JSON.parse(localStorage.getItem("user"));

  const [loading, setLoading] = useState(true);

  const [profileExists, setProfileExists] = useState(false);

  const [editing, setEditing] = useState(false);

  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    profile_image: null,
    full_name: "",
    phone: "",
    designation: "",
    department: "",
    linkedin: "",
    company_name: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getRecruiterProfile();

      console.log("PROFILE DATA:", data);
      console.log("PROFILE IMAGE:", data.profile_image);
      console.log("BASE URL:", BASE_URL);

      setProfileExists(true);

      setFormData({
        profile_image: data.profile_image || null,
        full_name: data.full_name || "",
        phone: data.phone || "",
        designation: data.designation || "",
        department: data.department || "",
        linkedin: data.linkedin || "",
        company_name: data.company_name || "",
      });
    } catch (err) {
      if (err.response?.status === 404) {
        setProfileExists(false);
        setEditing(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const data = new FormData();

      // Only append non-empty fields
      if (formData.full_name) {
        data.append("full_name", formData.full_name);
      }

      if (formData.phone) {
        data.append("phone", formData.phone);
      }

      if (formData.designation) {
        data.append("designation", formData.designation);
      }

      if (formData.department) {
        data.append("department", formData.department);
      }

      if (formData.linkedin) {
        data.append("linkedin", formData.linkedin);
      }

      // Upload image only if a new file was selected
      if (formData.profile_image instanceof File) {
        data.append("profile_image", formData.profile_image);
      }

      if (profileExists) {
        await updateRecruiterProfile(data);
        toast.success("Profile updated");
      } else {
        await createRecruiterProfile(data);
        toast.success("Profile created");
      }

      await loadProfile();
      setEditing(false);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  // const imagePreview =
  //   formData.profile_image instanceof File
  //     ? URL.createObjectURL(formData.profile_image)
  //     : `https://ui-avatars.com/api/?name=${encodeURIComponent(
  //         formData.full_name || user?.username || "Recruiter",
  //       )}&size=300&background=f3f4f6&color=2563eb`;



  const getProfileImageUrl = () => {
  if (formData.profile_image instanceof File) {
    return URL.createObjectURL(formData.profile_image);
  }

  if (formData.profile_image) {
    return `${BASE_URL}${formData.profile_image}`;
  }

  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    formData.full_name || user?.username || "Recruiter"
  )}&background=2563eb&color=ffffff&size=300`;
};

  return (
    <div className="max-w-4xl mx-auto px-2">
      <form onSubmit={handleSubmit}>
        <div
          className="
bg-white
rounded-2xl
shadow-md
border
border-gray-200
overflow-hidden
"
        >
          {/* Header */}

          <div
            className="
h-24
bg-gradient-to-b
from-gray-100
to-white
"
          ></div>

          <div className="px-6 pb-8">
            {/* Image */}

            <div className="flex justify-center -mt-12">
              <div className="relative">
                {/* <img
                  alt="Profile"
                  className="
  w-28
  h-28
  rounded-full
  border-4
  border-white
  shadow-md
  object-cover
  "
                  src={
                    formData.profile_image instanceof File
                      ? URL.createObjectURL(formData.profile_image)
                      : formData.profile_image
                        ? `${BASE_URL}${formData.profile_image}`
                        : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            formData.full_name || user?.username || "User",
                          )}&background=2563eb&color=ffffff&size=300`
                  }
                /> */}




                <img
  alt="Profile"
  className="
    w-28
    h-28
    rounded-full
    border-4
    border-white
    shadow-md
    object-cover
  "
  src={getProfileImageUrl()}
  onError={(e) => {
    console.log("Image failed:", e.target.src);

    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      formData.full_name || user?.username || "Recruiter"
    )}&background=2563eb&color=ffffff&size=300`;
  }}
/>
                {editing && (
                  <label
                    className="
absolute
bottom-0
right-0
bg-blue-600
text-white
w-8
h-8
rounded-full
flex
items-center
justify-center
cursor-pointer
"
                  >
                    📷
                    <input
                      type="file"
                      name="profile_image"
                      accept="image/*"
                      onChange={handleChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* User Info */}

            <div className="text-center mt-4">
              <h2
                className="
text-2xl
font-bold
text-gray-800
"
              >
                {formData.full_name || user?.username}
              </h2>

              <p className="text-gray-500">{user?.email}</p>

              <span
                className="
inline-block
mt-3
px-4
py-1
rounded-full
bg-blue-100
text-blue-700
text-sm
"
              >
                Recruiter
              </span>
            </div>

            {/* Buttons */}

            <div className="flex justify-center gap-3 mt-6">
              {!editing ? (
                <button
                  type="button"
                  onClick={() => setEditing(true)}
                  className="
bg-blue-600
text-white
px-5
py-2
rounded-lg
"
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="
border
px-5
py-2
rounded-lg
"
                  >
                    Cancel
                  </button>

                  <button
                    disabled={saving}
                    className="
bg-blue-600
text-white
px-5
py-2
rounded-lg
"
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </>
              )}
            </div>

            {/* Details */}

            <div
              className="
grid
md:grid-cols-2
gap-4
mt-8
"
            >
              <Field
                label="Company Name"
                name="company_name"
                value={formData.company_name}
                editing={false}
              />
              <Field
                label="Full Name"
                name="full_name"
                value={formData.full_name}
                editing={editing}
                onChange={handleChange}
              />

              <Field
                label="Phone"
                name="phone"
                value={formData.phone}
                editing={editing}
                onChange={handleChange}
              />

              <Field
                label="Designation"
                name="designation"
                value={formData.designation}
                editing={editing}
                onChange={handleChange}
              />

              <Field
                label="Department"
                name="department"
                value={formData.department}
                editing={editing}
                onChange={handleChange}
              />

              <Field
                label="LinkedIn"
                name="linkedin"
                value={formData.linkedin}
                editing={editing}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

function Field({ label, name, value, editing, onChange }) {
  return (
    <div
      className="
bg-gray-50
border
border-gray-200
rounded-xl
p-4
"
    >
      <p
        className="
text-xs
uppercase
text-gray-500
mb-2
"
      >
        {label}
      </p>

      {editing ? (
        <input
          name={name}
          value={value}
          onChange={onChange}
          className="
w-full
border
rounded-lg
px-3
py-2
focus:ring-2
focus:ring-blue-500
outline-none
"
        />
      ) : (
        <p className="text-gray-800 break-words">
          {value || <span className="text-gray-400">Not Provided</span>}
        </p>
      )}
    </div>
  );
}
