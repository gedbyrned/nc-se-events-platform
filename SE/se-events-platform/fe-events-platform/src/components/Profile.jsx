import React, { useEffect, useState } from "react";
import { getProfile } from "../utils/Api";

const Profile = ({ token }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (token) {
      getProfile(token)
        .then((data) => setProfile(data))
        .catch((err) => console.error("Error fetching profile:", err));
    }
  }, [token]);

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div>
      <h1>Welcome, {profile.username}</h1>
      <p>Email: {profile.email}</p>
    </div>
  );
};

export default Profile;
