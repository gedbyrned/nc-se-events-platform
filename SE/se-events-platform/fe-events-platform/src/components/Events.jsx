import React, { useEffect, useState } from 'react';
import { getEvents, signUpForEvent, getProfile } from '../utils/Api';
import NewEvent from './NewEvent';
import UpdateEvent from './UpdateEvent';
import DeleteEvent from './DeleteEvent';  // Import DeleteEvent component

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const [signUpError, setSignUpError] = useState('');
  const [isStaff, setIsStaff] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    getEvents()
      .then((data) => {
        setEvents(data);
      })
      .catch((err) => {
        console.error('Error fetching events:', err);
        setError('Failed to load events. Please try again later.');
      });

    const token = localStorage.getItem('authToken');
    if (token) {
      getProfile(token)
        .then((user) => {
          if (user.user_type === 'staff') {
            setIsStaff(true);
          } else if (user.user_type === 'user') {
            setIsUser(true);
          }
        })
        .catch((err) => {
          console.error('Error fetching user profile:', err);
          setError('Failed to fetch user profile. Please try again.');
        });
    }
  }, []);

  const handleAttendClick = (eventId) => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      setSignUpError('You must be logged in to sign up for events.');
      return;
    }

    signUpForEvent(eventId, token)
      .then(() => {
        console.log(`Successfully signed up for event with ID: ${eventId}`);
        setSignUpError('');
      })
      .catch((error) => {
        setSignUpError('Failed to sign up for the event. Please try again.');
        console.error('Error signing up for event:', error);
      });
  };

  const addNewEvent = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  const handleUpdateEvent = (updatedEvent) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.event_id === updatedEvent.event_id ? updatedEvent : event
      )
    );
    setEditingEvent(null); // Close the update form
  };

  const handleDeleteEvent = (eventId) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.event_id !== eventId));
  };

  const openUpdateEvent = (event) => {
    setEditingEvent(event); // Set the event to be edited
  };

  const closeUpdateEvent = () => {
    setEditingEvent(null); // Close the update form
  };

  return (
    <div style={styles.container}>
          {isStaff && !editingEvent && (
        <div>
          <h2>Add a New Event</h2>
          <NewEvent addNewEvent={addNewEvent} />
        </div>
      )}
      <h1>Events List</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {signUpError && <p style={{ color: 'red' }}>{signUpError}</p>}

      {editingEvent ? (
        <UpdateEvent
          event={editingEvent}
          closeUpdateEvent={closeUpdateEvent}
          updateEvent={handleUpdateEvent}
        />
      ) : events.length > 0 ? (
        <ul>
          {events.map((event) => (
            <li key={event.event_id}>
              <h2>{event.event_name}</h2>
              <p>{event.description}</p>
              <p>
                <strong>Location:</strong> {event.location}
              </p>
              <p>
                <strong>Date:</strong> {new Date(event.start_time).toLocaleDateString()}
              </p>

              {isUser && (
                <button onClick={() => handleAttendClick(event.event_id)}>
                  Attend Event
                </button>
              )}
              {isStaff && (
                <>
                  <button onClick={() => openUpdateEvent(event)}>Edit Event</button>
                  <DeleteEvent eventId={event.event_id} onDelete={handleDeleteEvent} />
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