import React, { useEffect, useState } from "react";
import { getProfile } from "../utils/Api";
import GoogleCalendarLogin from "./GoogleCalendarLogin";
import '../styles/style.css';

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
    <div className="profile-container">
      <h1>Welcome, {profile.username}</h1>
      <p>Email: {profile.email}</p>
      <p><strong>Profile Type:</strong> {profile.user_type}</p>

      {profile.user_type !== "staff" && (
        <>
          <h2>Events You're Attending:</h2>
          {profile.events.length > 0 ? (
            <ul>
              {profile.events.map((event) => (
                <li key={event.event_id}>
                  <h3>{event.event_name}</h3>
                  <p>{event.description}</p>
                  <p><strong>Location:</strong> {event.location}</p>
                  <p><strong>Date:</strong> {new Date(event.start_time).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>You are not attending any events.</p>
          )}
        </>
      )}

      <div className="calendar-container">
        <h2>Access Your Google Calendar</h2>
        <GoogleCalendarLogin />
      </div>
    </div>
  );
};

export default Profile;
