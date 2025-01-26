import React, { useState } from "react";
import { registerUser } from "../utils/Api"; // Import the registerUser function from api.jsx
import '../styles/style.css';

const UserRegistration = ({ navigateToLogin }) => {
  const [template, setTemplate] = useState({
    username: "",
    password: "",
    email: "",
    user_type: "user", // Default to 'user'
  });

  const handleChange = (prop, value) => {
    setTemplate((current) => {
      return { ...current, [prop]: value };
    });
  };

  const handleUserRegistration = () => {
    // Call the registerUser function from api.jsx
    registerUser(template)
      .then((response) => {
        console.log("User Registration Successful", response.data);
        navigateToLogin(); // Redirect to login after registration
      })
      .catch((error) => {
        alert("Registration Error: An error occurred during registration");
        console.error(error);
      });
  };

  return (
    <div style={styles.container}>
      <h2>User Registration</h2>
      <label>Username:</label>
      <input
        type="text"
        value={template.username}
        onChange={(e) => handleChange("username", e.target.value)}
      />
      <label>Password:</label>
      <input
        type="password"
        value={template.password}
        onChange={(e) => handleChange("password", e.target.value)}
      />
      <label>Email:</label>
      <input
        type="email"
        value={template.email}
        onChange={(e) => handleChange("email", e.target.value)}
      />
      <button onClick={handleUserRegistration}>Create Account</button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    textAlign: "center",
  },
};

export default UserRegistration;
