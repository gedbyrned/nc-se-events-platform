import React, { useState } from "react";
import { addEvent } from "../utils/Api";
import '../styles/style.css';

const NewEvent = ({ addNewEvent }) => {
  const [newEvent, setNewEvent] = useState({
    event_name: "",
    description: "",
    location: "",
    start_time: "",
    end_time: "",
  });
  const [error, setError] = useState("");

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError(""); // Reset error messages

    // Retrieve the token from localStorage
    const token = localStorage.getItem("authToken");

    if (!token) {
      setError("User is not authenticated. Please log in first.");
      return;
    }

    // Optimistically update the events list by adding the new event before the API call completes
    addNewEvent(newEvent);

    // Make the API call to add the event
    addEvent(newEvent, token)
      .then((createdEvent) => {
        setNewEvent({
          event_name: "",
          description: "",
          location: "",
          start_time: "",
          end_time: "",
        }); // Reset form fields after successful event creation
      })
      .catch((err) => {
        console.error("Error creating event:", err);
        setError("Failed to create event. Please try again.");
      });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      {/* Display errors */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <label>
        Event Name:
        <input
          type="text"
          name="event_name"
          value={newEvent.event_name}
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
          value={newEvent.description}
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
          value={newEvent.location}
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
          value={newEvent.start_time}
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
          value={newEvent.end_time}
          onChange={handleInputChange}
          required
        />
      </label>
      <br />
      <br />
      <button type="submit">Add Event</button>
    </form>
  );
};

export default NewEvent;
