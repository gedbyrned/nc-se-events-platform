import React, { useState } from "react";
import { addEvent } from "../utils/Api";
import "../styles/style.css";

const NewEvent = ({ addNewEvent }) => {
  const [newEvent, setNewEvent] = useState({
    event_name: "",
    description: "",
    location: "",
    start_time: "",
    end_time: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (
      !newEvent.event_name ||
      !newEvent.description ||
      !newEvent.location ||
      !newEvent.start_time ||
      !newEvent.end_time
    ) {
      setError("Please fill out all fields.");
      return;
    }

    const token = localStorage.getItem("authToken");

    if (!token) {
      setError("User is not authenticated. Please log in first.");
      return;
    }

    setIsLoading(true);

    addNewEvent(newEvent);

    addEvent(newEvent, token)
      .then((createdEvent) => {
        setNewEvent({
          event_name: "",
          description: "",
          location: "",
          start_time: "",
          end_time: "",
        });
        setIsLoading(false);
        setSuccess("Event created successfully!");
      })
      .catch((err) => {
        setIsLoading(false);
        setError("Failed to create event. Please try again.");
        console.error("Error creating event:", err);
      });
  };

  return (
    <form onSubmit={handleFormSubmit} aria-labelledby="newEventForm">
      {error && (
        <p role="alert" style={{ color: "red" }}>
          {error}
        </p>
      )}

      {success && (
        <p role="status" style={{ color: "green" }}>
          {success}
        </p>
      )}

      <fieldset>
        <legend id="newEventForm">Create a New Event</legend>

        <label htmlFor="event_name">
          Event Name:
          <input
            type="text"
            id="event_name"
            name="event_name"
            value={newEvent.event_name}
            onChange={handleInputChange}
            required
            aria-required="true"
          />
        </label>
        <br />

        <label htmlFor="description">
          Description:
          <input
            type="text"
            id="description"
            name="description"
            value={newEvent.description}
            onChange={handleInputChange}
            required
            aria-required="true"
          />
        </label>
        <br />

        <label htmlFor="location">
          Location:
          <input
            type="text"
            id="location"
            name="location"
            value={newEvent.location}
            onChange={handleInputChange}
            required
            aria-required="true"
          />
        </label>
        <br />

        <label htmlFor="start_time">
          Start Time:
          <input
            type="datetime-local"
            id="start_time"
            name="start_time"
            value={newEvent.start_time}
            onChange={handleInputChange}
            required
            aria-required="true"
          />
        </label>
        <br />

        <label htmlFor="end_time">
          End Time:
          <input
            type="datetime-local"
            id="end_time"
            name="end_time"
            value={newEvent.end_time}
            onChange={handleInputChange}
            required
            aria-required="true"
          />
        </label>
        <br />
      </fieldset>

      {isLoading ? (
        <p>Creating event...</p>
      ) : (
        <button
          type="submit"
          aria-label="Submit the event form to create an event"
        >
          Add Event
        </button>
      )}
    </form>
  );
};

export default NewEvent;
