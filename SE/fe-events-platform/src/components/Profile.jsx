import React, { useEffect, useState } from "react";
import { getProfile } from "../utils/Api";
import GoogleCalendarLogin from "./GoogleCalendarLogin";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";

const Profile = ({ token }) => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setIsLoading(true);
      setError("");
      getProfile(token)
        .then((data) => {
          setProfile(data);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          setError("Failed to load profile. Please try again later.");
          console.error("Error fetching profile:", err);
        });
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  if (isLoading)
    return (
      <p role="status" aria-live="polite">
        Loading profile...
      </p>
    );

  if (error)
    return (
      <p style={{ color: "red" }} role="alert">
        {error}
      </p>
    );

  return (
    <div className="profile-container">
      <h1 id="profileHeader">Welcome, {profile.username}</h1>
      <p>
        <strong>Email:</strong> {profile.email}
      </p>
      <p>
        <strong>Profile Type:</strong> {profile.user_type}
      </p>

      {profile.user_type !== "staff" && (
        <>
          <br />
          <h2 id="attendingEventsHeader">Events You're Attending:</h2>
          <br />
          {profile.events.length > 0 ? (
            <ul aria-labelledby="attendingEventsHeader">
              {profile.events.map((event) => (
                <li key={event.event_id} role="listitem">
                  <h3>{event.event_name}</h3>
                  <p>{event.description}</p>
                  <p>
                    <strong>Location:</strong> {event.location}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(event.start_time).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Time:</strong> {new Date(event.start_time).toLocaleTimeString()} - {new Date(event.end_time).toLocaleTimeString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No events to display. You are not attending any events.</p>
          )}
        </>
      )}

      <br />
      {profile.user_type === "user" && (
        <div
          className="calendar-container"
          role="region"
          aria-labelledby="calendarLogin"
        >
          <h3 id="calendarLogin">Link Your Google Calendar</h3>
          <GoogleCalendarLogin />
        </div>
      )}

      <br />
      <button
        onClick={handleLogout}
        style={{ backgroundColor: "red", color: "white" }}
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
