import React, { useState } from "react";
import { registerUser } from "../utils/Api";
import "../styles/style.css";

const UserRegistration = ({ navigateToLogin }) => {
  const [template, setTemplate] = useState({
    username: "",
    password: "",
    email: "",
    user_type: "user",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (prop, value) => {
    setTemplate((current) => {
      return { ...current, [prop]: value };
    });
  };

  const handleUserRegistration = () => {
    setError("");
    setSuccessMessage("");
    setIsLoading(true);

    registerUser(template)
      .then((response) => {
        console.log("User Registration Successful", response.data);
        setSuccessMessage("Registration successful! Please log in.");
        navigateToLogin();
      })
      .catch((error) => {
        setError("An error occurred during registration. Please try again.");
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div style={styles.container} aria-labelledby="userRegistrationFormHeading">
      <h2 id="userRegistrationFormHeading">User Registration</h2>

      {successMessage && (
        <div role="alert" aria-live="assertive" style={{ color: "green" }}>
          <p>{successMessage}</p>
        </div>
      )}

      {error && (
        <div role="alert" aria-live="assertive" style={{ color: "red" }}>
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            value={template.username}
            onChange={(e) => handleChange("username", e.target.value)}
            required
            aria-required="true"
            aria-describedby="usernameHelp"
          />
          <br />
          <small id="usernameHelp">Enter a unique username.</small>
        </div>
        <br />
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={template.password}
            onChange={(e) => handleChange("password", e.target.value)}
            required
            aria-required="true"
            aria-describedby="passwordHelp"
          />
          <br />
          <small id="passwordHelp">Password must be impossible to guess.</small>
        </div>
        <br />
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={template.email}
            onChange={(e) => handleChange("email", e.target.value)}
            required
            aria-required="true"
            aria-describedby="emailHelp"
          />
          <br />
          <small id="emailHelp">
            We'll never share your email with anyone else.
          </small>
        </div>
        <br />
        <button
          type="button"
          onClick={handleUserRegistration}
          aria-label="Create User Account"
          disabled={isLoading}
        >
          {isLoading ? <div className="spinner"></div> : "Create Account"}
        </button>
      </form>
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
