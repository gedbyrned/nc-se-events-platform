import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import "../styles/style.css"; // Import the updated CSS with dark theme

const GoogleCalendarLogin = () => {
  const [events, setEvents] = useState([]); // State to hold events

  const handleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Access Token:", tokenResponse.access_token);

      // Fetch events from Google Calendar
      try {
        const response = await axios.get(
          "https://www.googleapis.com/calendar/v3/calendars/primary/events",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
            params: {
              maxResults: 5, // Limit to 5 events
              orderBy: "startTime", // Order events by start time
              singleEvents: true, // Prevent recurring events from being expanded
              timeMin: new Date().toISOString(), // Only upcoming events
            },
          }
        );

        console.log("Calendar Events:", response.data.items);

        // Update the state with the events
        setEvents(response.data.items);
      } catch (error) {
        console.error("Error fetching calendar events:", error);
      }
    },
    onError: () => console.error("Login Failed"),
    scope: "https://www.googleapis.com/auth/calendar.events.readonly",
    ux_mode: "popup",
  });

  return (
    <div className="google-calendar-login">
      <button className="google-login" onClick={() => handleLogin()}>
        Login with Google
      </button>

      <button
        className="secondary-btn"
        onClick={() => window.open("https://calendar.google.com", "_blank")}
        style={{ marginTop: "20px" }}
      >
        Add Events to Your Google Calendar
      </button>
      <br />
      <br />
      {events.length > 0 && (
        <div className="events-list">
          <h4>Next 5 Upcoming Events on your Google Calendar:</h4>
          <ul>
            {events.map((event, index) => (
              <li key={index}>
                <strong>{event.summary}</strong>
                <span>
                  {new Date(event.start.dateTime || event.start.date).toLocaleString()}
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
