import React, { useState } from "react";
import { registerUser } from "../utils/Api"; // Import the registerUser function from api.jsx
import '../styles/style.css';

const StaffRegistration = ({ navigateToLogin }) => {
  const [template, setTemplate] = useState({
    username: "",
    password: "",
    email: "",
    user_type: "staff", // Default to 'staff'
  });

  const handleChange = (prop, value) => {
    setTemplate((current) => {
      return { ...current, [prop]: value };
    });
  };

  const handleStaffRegistration = () => {
    registerUser(template)
      .then((response) => {
        console.log("Staff Registration Successful", response.data);
        navigateToLogin(); // Redirect to login after registration
      })
      .catch((error) => {
        alert("Registration Error: An error occurred during registration");
        console.error(error);
      });
  };

  return (
    <div style={styles.container} >
      <h2>Staff Registration</h2>
      <br />
      <label>Username:</label>
      <input
        type="text"
        value={template.username}
        onChange={(e) => handleChange("username", e.target.value)}
      />
      <br />
      <label>Password:</label>
      <input
        type="password"
        value={template.password}
        onChange={(e) => handleChange("password", e.target.value)}
      />
      <br />
      <label>Email:</label>
      <input
        type="email"
        value={template.email}
        onChange={(e) => handleChange("email", e.target.value)}
      />
      <br />
      <br />
      <button onClick={handleStaffRegistration}>Create Staff Account</button>
      <br />
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


export default StaffRegistration;
