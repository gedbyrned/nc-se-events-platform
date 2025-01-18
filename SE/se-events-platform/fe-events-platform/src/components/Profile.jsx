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

      {profile.user_type !== "staff" && (
        <>
          <h2>Events You're Attending:</h2>
          {profile.events.length > 0 ? (
            <ul>
              {profile.events.map((event) => (
                <li key={event.event_id}>
                  <h3>{event.event_name}</h3>
                  <p>{event.description}</p>
                  <p>
                    <strong>Location:</strong> {event.location}
                  </p>
                  <p>
                    <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>You are not attending any events.</p>
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
