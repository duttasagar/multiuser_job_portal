import { useEffect, useState } from "react";
import { getProfile } from "../../services/profileService";
import ProfileView from "../../components/profile/ProfileView";
import ProfileForm from "../../components/profile/ProfileForm";

export default function Job_Seeker_Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const loadProfile = async () => {
    try {
      const res = await getProfile();

      setProfile(res.data);
    } catch (err) {
      if (err.response?.status === 404) {
        setProfile(null);
      } else {
        console.log(err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10">
        Loading...
      </div>
    );
  }

  return (
    <>
      {profile ? (
        <ProfileView
          profile={profile}
           loadProfile={loadProfile}
          setShowForm={setShowForm}
        />
      ) : (
        <div className="bg-white rounded-xl shadow p-10 text-center">

          <h2 className="text-2xl font-bold mb-3">
            Complete Your Profile
          </h2>

          <p className="text-gray-600 mb-6">
            Create your profile before applying for jobs.
          </p>

          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-5 py-2 rounded"
          >
            Create Profile
          </button>

        </div>
      )}

      {showForm && (
        <ProfileForm
          profile={profile}
          loadProfile={loadProfile}
          setShowForm={setShowForm}
          
        />
      )}
    </>
  );
}