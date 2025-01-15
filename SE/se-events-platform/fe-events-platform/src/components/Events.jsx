import React, { useEffect, useState } from 'react';
import { getEvents } from '../utils/Api';

const EventsList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents()
      .then((data) => {
        setEvents(data);
      })
      .catch((err) => {
        console.error('Error fetching events:', err);
      });
  }, []);

  const handleAttendClick = (eventId) => {
    console.log(`Attending event with ID: ${eventId}`);
  
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
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
              <button onClick={() => handleAttendClick(event.event_id)}>
                Attend Event
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
