import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/axios";
import { createProfile, updateProfile } from "../../services/profileService";

export default function ProfileView({ profile, loadProfile }) {
  const BASE_URL = api.defaults.baseURL;

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    full_name: "",
    email: "",
    phone: "",
    address: "",
    education: "",
    experience: "",
    skills: "",
    linkedin: "",
    github: "",
    portfolio: "",
    resume: null,
    profile_image: null,
  });

  useEffect(() => {
    if (!profile) return;

    setFormData({
      username: profile.username || "",
      full_name: profile.full_name || "",
      email: profile.email || "",
      phone: profile.phone || "",
      address: profile.address || "",
      education: profile.education || "",
      experience: profile.experience || "",
      skills: profile.skills || "",
      linkedin: profile.linkedin || "",
      github: profile.github || "",
      portfolio: profile.portfolio || "",
      resume: null,
      profile_image: null,
    });
  }, [profile]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     setSaving(true);

  //     const data = new FormData();

  //     Object.keys(formData).forEach((key) => {
  //       if (
  //         (key === "resume" || key === "profile_image") &&
  //         formData[key] instanceof File
  //       ) {
  //         data.append(key, formData[key]);
  //       } else if (
  //         key !== "resume" &&
  //         key !== "profile_image" &&
  //         formData[key] !== ""
  //       ) {
  //         data.append(key, formData[key]);
  //       }
  //     });

  //     if (profile?.id) {
  //       await updateProfile(data);
  //       toast.success("Profile updated successfully");
  //     } else {
  //       await createProfile(data);
  //       toast.success("Profile created successfully");
  //     }

  //     setEditing(false);

  //     // await loadProfile();
  //   } catch (err) {
  //     console.log(err.response?.data || err);
  //     toast.error("Failed to save profile");
  //   } finally {
  //     setSaving(false);
  //   }
  // };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        setSaving(true);

        const data = new FormData();

        Object.keys(formData).forEach((key) => {
            if (
                (key === "resume" || key === "profile_image") &&
                formData[key] instanceof File
            ) {
                data.append(key, formData[key]);
            } else if (
                key !== "resume" &&
                key !== "profile_image"
            ) {
                data.append(key, formData[key]);
            }
        });

        if (profile?.id) {
            await updateProfile(data);
            toast.success("Profile updated successfully");
        } else {
            await createProfile(data);
            toast.success("Profile created successfully");
        }

        // Fetch updated profile from backend
        await loadProfile();

        // Exit edit mode
        setEditing(false);

    } catch (err) {
        console.log(err.response?.data || err);
        toast.error("Failed to save profile");
    } finally {
        setSaving(false);
    }
};
  
  const handleCancel = () => {
    setFormData({
      username: profile.username || "",
      full_name: profile.full_name || "",
      email: profile.email || "",
      phone: profile.phone || "",
      address: profile?.address || "",
      education: profile?.education || "",
      experience: profile?.experience || "",
      skills: profile?.skills || "",
      linkedin: profile?.linkedin || "",
      github: profile?.github || "",
      portfolio: profile?.portfolio || "",
      resume: null,
      profile_image: null,
    });

    setEditing(false);
  };

  const profileImage =
    formData.profile_image instanceof File
      ? URL.createObjectURL(formData.profile_image)
      : profile?.profile_image
        ? `${BASE_URL}${profile.profile_image}`
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(
            profile?.full_name || profile?.username || "User",
          )}&background=f3f4f6&color=2563eb&size=300`;

  const resumeLink = profile?.resume ? `${BASE_URL}${profile.resume}` : null;

  const profileFields = [
    {
      name: "username",
      label: "Username",
      type: "text",
      readonly: true,
    },
    {
      name: "full_name",
      label: "Full Name",
      type: "text",
      readonly: true,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      readonly: true,
    },
    {
      name: "phone",
      label: "Phone",
      type: "text",
      readonly: true,
    },
    {
      name: "address",
      label: "Address",
      multiline: false,
    },
    {
      name: "education",
      label: "Education",
      multiline: true,
    },
    {
      name: "experience",
      label: "Experience",
      multiline: true,
    },
    {
      name: "skills",
      label: "Skills",
      multiline: true,
    },
    {
      name: "linkedin",
      label: "LinkedIn",
      multiline: false,
    },
    {
      name: "github",
      label: "GitHub",
      multiline: false,
    },
    {
      name: "portfolio",
      label: "Portfolio",
      multiline: false,
    },
    {
      name: "resume",
      label: "Resume",
      multiline: false,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-2">
      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="h-20 bg-gradient-to-b from-gray-100 to-white"></div>

          {/* Profile Content */}
          <div className="px-6 pb-6">
            {/* Profile Image */}
            <div className="flex justify-center -mt-10">
              <div className="relative">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover bg-white"
                />

                {editing && (
                  <>
                    <label
                      htmlFor="profile_image"
                      className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center cursor-pointer hover:bg-blue-700"
                    >
                      📷
                    </label>

                    <input
                      id="profile_image"
                      type="file"
                      name="profile_image"
                      accept="image/*"
                      onChange={handleChange}
                      className="hidden"
                    />
                  </>
                )}
              </div>
            </div>

            {/* User Info */}
            <div className="text-center mt-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {profile?.full_name || profile?.username}
              </h2>

              <p className="text-gray-500 text-sm mt-1">{profile?.email}</p>

              <p className="text-gray-500 text-sm">
                {profile?.phone || "Phone not provided"}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-3 mt-5">
              {!editing ? (
                <button
                  type="button"
                  onClick={() => setEditing(true)}
                  className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </>
              )}
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {profileFields.map((field) => (
                <div
                  key={field.name}
                  className="bg-gray-50 border border-gray-200 rounded-xl p-4"
                >
                  <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
                    {field.label}
                  </p>

                  {/* Resume */}
                  {field.name === "resume" ? (
                    editing ? (
                      <div>
                        <input
                          type="file"
                          name="resume"
                          accept=".pdf,.doc,.docx"
                          onChange={handleChange}
                          className="w-full text-sm"
                        />

                        {resumeLink && (
                          <a
                            href={resumeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-green-600 mt-2 inline-block"
                          >
                            Current Resume
                          </a>
                        )}
                      </div>
                    ) : resumeLink ? (
                      <a
                        href={resumeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View Resume
                      </a>
                    ) : (
                      <span className="text-gray-400">Not Uploaded</span>
                    )
                  ) : editing ? (
                    field.multiline ? (
                      <textarea
                        rows={3}
                        name={field.name}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                        readOnly={field.readonly}
                        className={`w-full rounded-lg border px-3 py-2 resize-none ${
                          field.readonly
                            ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                            : "border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        }`}
                      />
                    ) : (
                      <input
                        type={field.type || "text"}
                        name={field.name}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                        readOnly={field.readonly}
                        className={`w-full rounded-lg border px-3 py-2 ${
                          field.readonly
                            ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                            : "border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        }`}
                      />
                    )
                  ) : (
                    <div className="break-words">
                      {field.name === "linkedin" && profile?.linkedin ? (
                        <a
                          href={profile.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Open LinkedIn
                        </a>
                      ) : field.name === "github" && profile?.github ? (
                        <a
                          href={profile.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Open GitHub
                        </a>
                      ) : field.name === "portfolio" && profile?.portfolio ? (
                        <a
                          href={profile.portfolio}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Visit Portfolio
                        </a>
                      ) : (
                        profile?.[field.name] || (
                          <span className="text-gray-400">Not Provided</span>
                        )
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
