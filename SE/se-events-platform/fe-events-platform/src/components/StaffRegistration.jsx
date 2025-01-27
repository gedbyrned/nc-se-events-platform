import React, { useState } from "react";
import { registerUser } from "../utils/Api";
import "../styles/style.css";

const StaffRegistration = ({ navigateToLogin }) => {
  const [template, setTemplate] = useState({
    username: "",
    password: "",
    email: "",
    user_type: "staff",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (prop, value) => {
    setTemplate((current) => {
      return { ...current, [prop]: value };
    });
  };

  const handleStaffRegistration = () => {
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    registerUser(template)
      .then((response) => {
        console.log("Staff Registration Successful", response.data);
        setSuccessMessage("Registration successful! Please log in.");
        navigateToLogin();
      })
      .catch((error) => {
        setErrorMessage(
          "An error occurred during registration. Please try again."
        );
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div style={styles.container} aria-labelledby="registrationFormHeading">
      <h2 id="registrationFormHeading">Staff Registration</h2>

      {successMessage && (
        <div role="alert" aria-live="assertive" style={{ color: "green" }}>
          <p>{successMessage}</p>
        </div>
      )}

      {errorMessage && (
        <div role="alert" aria-live="assertive" style={{ color: "red" }}>
          <p>{errorMessage}</p>
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleStaffRegistration();
        }}
      >
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={template.username}
            onChange={(e) => handleChange("username", e.target.value)}
            required
            aria-required="true"
          />
        </div>
        <br />
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={template.password}
            onChange={(e) => handleChange("password", e.target.value)}
            required
            aria-required="true"
          />
        </div>
        <br />
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={template.email}
            onChange={(e) => handleChange("email", e.target.value)}
            required
            aria-required="true"
          />
        </div>
        <br />
        <button
          type="submit"
          aria-label="Create Staff Account"
          disabled={isLoading}
        >
          {isLoading ? <div className="spinner"></div> : "Create Staff Account"}
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

export default StaffRegistration;
