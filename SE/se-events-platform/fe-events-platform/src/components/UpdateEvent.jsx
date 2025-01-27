import React, { useState } from "react";
import { updateEvent } from "../utils/Api";

const UpdateEvent = ({ event, closeUpdateEvent }) => {
  const [updatedEvent, setUpdatedEvent] = useState({
    event_name: event.event_name,
    description: event.description,
    location: event.location,
    start_time: event.start_time,
    end_time: event.end_time,
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsLoading(true);

    const token = localStorage.getItem("authToken");

    if (!token) {
      setError("You must be logged in to update the event.");
      setIsLoading(false);
      return;
    }

    updateEvent(event.event_id, updatedEvent, token)
      .then((updatedEventData) => {
        console.log("Event updated successfully:", updatedEventData);
        setSuccessMessage("Event updated successfully!");
        closeUpdateEvent();
      })
      .catch((err) => {
        setError("Failed to update the event. Please try again.");
        console.error("Error updating event:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="update-event-form" aria-labelledby="updateEventFormHeading">
      <h2 id="updateEventFormHeading">Update Event</h2>

      {successMessage && (
        <div role="alert" aria-live="assertive" style={{ color: "green" }}>
          <p>{successMessage}</p>
        </div>
      )}

      {error && (
        <div role="alert" aria-live="assertive" style={{ color: "red" }}>
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="event_name">Event Name:</label>
          <input
            type="text"
            name="event_name"
            id="event_name"
            value={updatedEvent.event_name}
            onChange={handleInputChange}
            required
            aria-required="true"
          />
        </div>
        <br />
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            name="description"
            id="description"
            value={updatedEvent.description}
            onChange={handleInputChange}
            required
            aria-required="true"
          />
        </div>
        <br />
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            name="location"
            id="location"
            value={updatedEvent.location}
            onChange={handleInputChange}
            required
            aria-required="true"
          />
        </div>
        <br />
        <div>
          <label htmlFor="start_time">Start Time:</label>
          <input
            type="datetime-local"
            name="start_time"
            id="start_time"
            value={updatedEvent.start_time}
            onChange={handleInputChange}
            required
            aria-required="true"
          />
        </div>
        <br />
        <div>
          <label htmlFor="end_time">End Time:</label>
          <input
            type="datetime-local"
            name="end_time"
            id="end_time"
            value={updatedEvent.end_time}
            onChange={handleInputChange}
            required
            aria-required="true"
          />
        </div>
        <br />
        <button type="submit" aria-label="Update Event" disabled={isLoading}>
          {isLoading ? <div className="spinner"></div> : "Update Event"}
        </button>
        <button type="button" onClick={closeUpdateEvent} aria-label="Cancel">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateEvent;
