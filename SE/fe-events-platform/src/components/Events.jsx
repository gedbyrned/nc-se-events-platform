import React, { useEffect, useState } from "react";
import { getEvents, signUpForEvent, getProfile } from "../utils/Api";
import NewEvent from "./NewEvent";
import UpdateEvent from "./UpdateEvent";
import DeleteEvent from "./DeleteEvent";

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [signUpError, setSignUpError] = useState("");
  const [isStaff, setIsStaff] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    getEvents()
      .then((data) => {
        setEvents(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setError("Failed to load events. Please try again later.");
        setIsLoading(false);
      });

    const token = localStorage.getItem("authToken");
    if (token) {
      getProfile(token)
        .then((user) => {
          if (user.user_type === "staff") {
            setIsStaff(true);
          } else if (user.user_type === "user") {
            setIsUser(true);
          }
          setProfileLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching user profile:", err);
          setError("Failed to fetch user profile. Please try again.");
          setProfileLoading(false);
        });
    } else {
      setProfileLoading(false);
    }
  }, []);

  const handleAttendClick = (eventId) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setSignUpError("You must be logged in to sign up for events.");
      return;
    }

    signUpForEvent(eventId, token)
      .then(() => {
        console.log(`Successfully signed up for event with ID: ${eventId}`);
        setSignUpError("");
        setSuccessMessage("Successfully signed up for the event!");
      })
      .catch((error) => {
        setSignUpError("You are already signed up for this event.");
        console.error("Error signing up for event:", error);
      });
  };

  return (
    <div style={styles.container}>
      {isStaff && !editingEvent && (
        <div>
          <h2 id="addEventHeader">Add a New Event</h2>
          <NewEvent addNewEvent={(newEvent) => setEvents([...events, newEvent])} />
        </div>
      )}

      <h1 id="eventsListHeader">Events List</h1>

      {successMessage && (
        <div role="alert" aria-live="assertive" style={{ color: "green" }}>
          <p>{successMessage}</p>
        </div>
      )}

      {error && (
        <div role="alert" aria-live="assertive">
          <p style={{ color: "red" }}>{error}</p>
        </div>
      )}
      {signUpError && (
        <div role="alert" aria-live="assertive">
          <p style={{ color: "red" }}>{signUpError}</p>
        </div>
      )}

      {isLoading && <p>Loading events...</p>}
      {profileLoading && <p>Loading profile...</p>}

      {editingEvent ? (
        <UpdateEvent
          event={editingEvent}
          closeUpdateEvent={() => setEditingEvent(null)}
          updateEvent={(updatedEvent) => {
            setEvents(events.map((event) =>
              event.event_id === updatedEvent.event_id ? updatedEvent : event
            ));
            setEditingEvent(null);
            setSuccessMessage("Event updated successfully!");
          }}
        />
      ) : events.length > 0 ? (
        <ul aria-labelledby="eventsListHeader">
          {events.map((event) => (
            <li key={event.event_id} role="listitem">
              <h2>{event.event_name}</h2>
              <p>{event.description}</p>
              <p>
                <strong>Location:</strong> {event.location}
              </p>
              <p>
                <strong>Date:</strong> {new Date(event.start_time).toLocaleDateString()} {" "}
              </p>
              <p>
                <strong>Time:</strong> {new Date(event.start_time).toLocaleTimeString()} - {new Date(event.end_time).toLocaleTimeString()}
              </p>

              {isUser && (
                <button
                  onClick={() => handleAttendClick(event.event_id)}
                  aria-label={`Sign up for ${event.event_name}`}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Attend Event"}
                </button>
              )}

              {isStaff && (
                <>
                  <button
                    onClick={() => setEditingEvent(event)}
                    aria-label={`Edit ${event.event_name}`}
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Edit Event"}
                  </button>
                  <DeleteEvent
                    eventId={event.event_id}
                    onDelete={(eventId) => setEvents(events.filter((event) => event.event_id !== eventId))}
                    aria-label={`Delete ${event.event_name}`}
                  />
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No events found.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
};

export default EventsList;
