import axios from "axios";

const eventsPlatformApi = axios.create({
  baseURL: "https://nc-se-events-platform.onrender.com/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getEvents = () => {
  return eventsPlatformApi
    .get("events")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Resources could not be retrieved:", error);
    });
};

export const authenticateUser = (credentials) => {
  return eventsPlatformApi
    .post("auth", credentials)
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
      }
      return response;
    })
    .catch((error) => {
      console.error("Authentication failed:", error);
      throw error;
    });
};

export const registerUser = (userData) => {
  return eventsPlatformApi.post("register", userData);
};

export const checkUsername = (username) => {
  return eventsPlatformApi.get(`check-username/${username}`);
};

export const getProfile = (token) => {
  return eventsPlatformApi
    .get("me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching profile:", error);
      throw error;
    });
};

export const signUpForEvent = (eventId, token) => {
  return eventsPlatformApi
    .post(
      "signup",
      { event_id: eventId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error signing up for event:", error);
      throw error;
    });
};

export const getGoogleCalendarEvents = (token) => {
  return eventsPlatformApi
    .get("google-calendar/events", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching Google Calendar events:", error);
      throw error;
    });
};

export const addEvent = (eventData, token) => {
  return eventsPlatformApi
    .post("events", eventData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error("Error creating event:", error);
      throw error;
    });
};

export const updateEvent = (eventId, eventData, token) => {
  return eventsPlatformApi
    .patch(`events/${eventId}`, eventData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log("Event updated successfully:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error updating event:", error);
      throw error;
    });
};

export const deleteEvent = (eventId, token) => {
  return eventsPlatformApi
    .delete(`events/${eventId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log("Event deleted successfully:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error deleting event:", error);
      throw error;
    });
};
