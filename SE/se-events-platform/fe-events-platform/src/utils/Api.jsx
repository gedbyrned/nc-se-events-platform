import axios from "axios";

const eventsPlatformApi = axios.create({
  baseURL: "http://localhost:5431/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getEvents = () => {
  return eventsPlatformApi.get("events")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Resources could not be retrieved:", error);
    });
};

export const authenticateUser = (credentials) => {
  return eventsPlatformApi.post("auth", credentials)
    .then((response) => {
      // Check if the response contains the token
      if (response.data.token) {
        // Store the token in localStorage after successful login
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
      .then((response) => {
        return response.data}) 
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
  


  