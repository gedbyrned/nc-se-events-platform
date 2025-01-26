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

    const token = localStorage.getItem("authToken");

    if (!token) {
      setError("You must be logged in to update the event.");
      return;
    }

    updateEvent(event.event_id, updatedEvent, token)
      .then((updatedEventData) => {
        console.log("Event updated successfully:", updatedEventData);
        closeUpdateEvent();
      })
      .catch((err) => {
        setError("Failed to update the event. Please try again.");
        console.error("Error updating event:", err);
      });
  };

  return (
    <div className="update-event-form">
      <h2>Update Event</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleFormSubmit}>
        <label>
          Event Name:
          <input
            type="text"
            name="event_name"
            value={updatedEvent.event_name}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={updatedEvent.description}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={updatedEvent.location}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Start Time:
          <input
            type="datetime-local"
            name="start_time"
            value={updatedEvent.start_time}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          End Time:
          <input
            type="datetime-local"
            name="end_time"
            value={updatedEvent.end_time}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <button type="submit">Update Event</button>
        <button type="button" onClick={closeUpdateEvent}>Cancel</button>
      </form>
    </div>
  );
};

export default UpdateEvent;
