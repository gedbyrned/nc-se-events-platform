import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import "../styles/style.css";

const GoogleCalendarLogin = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Access Token:", tokenResponse.access_token);
      setIsLoading(true);

      try {
        const response = await axios.get(
          "https://www.googleapis.com/calendar/v3/calendars/primary/events",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
            params: {
              maxResults: 5,
              orderBy: "startTime",
              singleEvents: true,
              timeMin: new Date().toISOString(),
            },
          }
        );

        console.log("Calendar Events:", response.data.items);

        setEvents(response.data.items);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError("Failed to load calendar events. Please try again later.");
        console.error("Error fetching calendar events:", error);
      }
    },
    onError: () => {
      setError("Login failed. Please try again.");
      console.error("Login Failed");
    },
    scope: "https://www.googleapis.com/auth/calendar.events.readonly",
    ux_mode: "popup",
  });

  return (
    <div className="google-calendar-login">
      <button
        className="google-login"
        onClick={() => handleLogin()}
        aria-label="Login with Google to access your calendar"
      >
        Login with Google
      </button>

      <button
        className="secondary-btn"
        onClick={() => window.open("https://calendar.google.com", "_blank")}
        style={{ marginTop: "20px" }}
        aria-label="Open Google Calendar in a new tab"
      >
        Add Events to Your Google Calendar
      </button>

      <br />
      <br />

      {isLoading && (
        <div role="status" aria-live="polite">
          <p>Loading your calendar events...</p>
        </div>
      )}

      {error && (
        <div role="alert" aria-live="assertive">
          <p style={{ color: "red" }}>{error}</p>
        </div>
      )}

      {events.length > 0 && (
        <div className="events-list">
          <h4>Next 5 Upcoming Events on your Google Calendar:</h4>
          <ul>
            {events.map((event, index) => (
              <li key={index}>
                <strong>{event.summary}</strong>
                <span>
                  {new Date(
                    event.start.dateTime || event.start.date
                  ).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GoogleCalendarLogin;
