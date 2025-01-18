import React, { useEffect, useState } from "react";
import { getEvents, signUpForEvent } from "../utils/Api";

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(null);
  const [signedUpEvents, setSignedUpEvents] = useState([]);

  useEffect(() => {
    getEvents()
      .then((data) => {
        setEvents(data);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
      });
  }, []);

  const handleAttendClick = (eventId) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("You need to be logged in to sign up for events.");
      return;
    }

    setLoading(eventId);
    signUpForEvent(eventId, token)
      .then(() => {
        setSignedUpEvents((prev) => [...prev, eventId]);
        alert("You have successfully signed up for the event!");
      })
      .catch((error) => {
        console.error("Failed to sign up for the event:", error);
        alert(error.response?.data?.error || "Failed to sign up for the event.");
      })
      .finally(() => setLoading(null));
  };

  return (
    <div>
      <h1>Events List</h1>
      {events.length > 0 ? (
        <ul>
          {events.map((event) => (
            <li key={event.event_id}>
              <h2>{event.event_name}</h2>
              <p>{event.description}</p>
              <p>
                <strong>Location:</strong> {event.location}
              </p>
              <p>
                <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
              </p>
              <button
                onClick={() => handleAttendClick(event.event_id)}
                disabled={
                  signedUpEvents.includes(event.event_id) || loading === event.event_id
                }
              >
                {loading === event.event_id
                  ? "Signing up..."
                  : signedUpEvents.includes(event.event_id)
                  ? "Signed Up"
                  : "Attend Event"}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No events found.</p>
      )}
    </div>
  );
};

export default EventsList;
