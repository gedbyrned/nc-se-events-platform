import React, { useState } from "react";
import { deleteEvent } from "../utils/Api";
import "../styles/style.css";

const DeleteEvent = ({ eventId, onDelete }) => {
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setError("You must be logged in to delete events.");
      return;
    }

    setIsDeleting(true);
    deleteEvent(eventId, token)
      .then(() => {
        setIsDeleting(false);
        onDelete(eventId);
      })
      .catch((error) => {
        setIsDeleting(false);
        setError("Failed to delete event. Please try again later.");
        console.error("Error deleting event:", error);
      });
  };

  return (
    <div>
      {isDeleting ? (
        <p>Deleting event...</p>
      ) : (
        <button
          onClick={handleDelete}
          style={{ backgroundColor: "red", color: "white" }}
        >
          Delete Event
        </button>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default DeleteEvent;
