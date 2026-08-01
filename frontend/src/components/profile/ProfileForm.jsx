import { useEffect, useState } from "react";
import { createProfile, updateProfile } from "../../services/profileService";

export default function ProfileForm({ profile, loadProfile, setShowForm }) {
  const [formData, setFormData] = useState({
    address: "",
    education: "",
    experience: "",
    skills: "",
    linkedin: "",
    github: "",
    portfolio: "",
    resume: null,
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        address: profile.address || "",
        education: profile.education || "",
        experience: profile.experience || "",
        skills: profile.skills || "",
        linkedin: profile.linkedin || "",
        github: profile.github || "",
        portfolio: profile.portfolio || "",
        resume: null,
      });
    }
  }, [profile]);


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

    const data = new FormData();

    Object.keys(formData).forEach((key) => {

      if (key === "resume") {

        if (formData.resume instanceof File) {
          data.append("resume", formData.resume);
        }

      } else {

        if (formData[key] !== "") {
          data.append(key, formData[key]);
        }

      }

    });


    console.log("Sending FormData");

    for (let pair of data.entries()) {
      console.log(pair[0], pair[1]);
    }


    if (profile) {
      await updateProfile(data);
    } else {
      await createProfile(data);
    }


    await loadProfile();
    setShowForm(false);


  } catch (err) {

    console.log(
      err.response?.data || err
    );

  }
};
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 overflow-y-auto py-10">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl p-8 relative">


        <button
          onClick={() => setShowForm(false)}
          className="absolute right-6 top-4 text-3xl font-bold hover:text-red-500"
        >
          ×
        </button>


        <h2 className="text-3xl font-bold mb-8">
          {profile ? "Edit Profile" : "Create Profile"}
        </h2>


        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >


          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>

            <input
              type="text"
              value={profile?.username || ""}
              disabled
              className="w-full border rounded-md px-3 py-2 bg-gray-100"
            />
          </div>


          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>

            <input
              type="email"
              value={profile?.email || ""}
              disabled
              className="w-full border rounded-md px-3 py-2 bg-gray-100"
            />
          </div>


          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>

            <input
              type="text"
              value={profile?.full_name || ""}
              className="w-full border rounded-md px-3 py-2 bg-gray-100"
            />
          </div>


          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>

            <input
              type="text"
              value={profile?.phone || ""}
              disabled
              className="w-full border rounded-md px-3 py-2 bg-gray-100"
            />
          </div>


          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>

            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
              className="w-full border rounded-md px-3 py-2"
            />
          </div>


          {/* Education */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Education
            </label>

            <textarea
              name="education"
              rows="2"
              value={formData.education}
              onChange={handleChange}
              placeholder="Bachelor's, Master's..."
              className="w-full border rounded-md px-3 py-2"
            />
          </div>


          {/* Experience */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Experience
            </label>

            <textarea
              name="experience"
              rows="2"
              value={formData.experience}
              onChange={handleChange}
              placeholder="Describe your experience"
              className="w-full border rounded-md px-3 py-2"
            />
          </div>


          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skills
            </label>

            <textarea
              name="skills"
              rows="2"
              value={formData.skills}
              onChange={handleChange}
              placeholder="React, Django, Python..."
              className="w-full border rounded-md px-3 py-2"
            />
          </div>


          {/* LinkedIn */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              LinkedIn
            </label>

            <input
              type="url"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/username"
              className="w-full border rounded-md px-3 py-2"
            />
          </div>


          {/* Github */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Github
            </label>

            <input
              type="url"
              name="github"
              value={formData.github}
              onChange={handleChange}
              placeholder="https://github.com/username"
              className="w-full border rounded-md px-3 py-2"
            />
          </div>


          {/* Portfolio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Portfolio
            </label>

            <input
              type="url"
              name="portfolio"
              value={formData.portfolio}
              onChange={handleChange}
              placeholder="https://portfolio.com"
              className="w-full border rounded-md px-3 py-2"
            />
          </div>


          {/* Resume */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Resume
            </label>

            <input
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            />

            {profile?.resume && (
              <p className="text-xs text-green-600 mt-1">
                Resume uploaded ✓
              </p>
            )}
          </div>



          <div className="md:col-span-2 flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-gray-300 rounded-md"
            >
              Cancel
            </button>


            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              {profile ? "Update Profile" : "Create Profile"}
            </button>

          </div>


        </form>

      </div>

    </div>
  );
}