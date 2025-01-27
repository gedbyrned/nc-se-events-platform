import React, { useState } from "react";
import { authenticateUser } from "../utils/Api";
import "../styles/style.css";

const SignIn = ({ setToken }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage("");
    setIsLoading(true);

    authenticateUser(credentials)
      .then((response) => {
        setMessage("Login successful!");
        setToken(response.data.token);
        setIsLoading(false);
      })
      .catch((err) => {
        setMessage(`Error: ${err.response?.data?.message || err.message}`);
        setIsLoading(false);
      });
  };

  return (
    <div style={styles.container}>
      <h2 id="signInHeader">Sign In</h2>

      <form onSubmit={handleSubmit} aria-labelledby="signInHeader">
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
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
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
            aria-required="true"
          />
        </div>
        <br />
        <div>
          <button
            type="submit"
            aria-label="Sign in to your account"
            disabled={isLoading}
          >
            {isLoading ? <div className="spinner"></div> : "Sign In"}
          </button>
        </div>
      </form>

      {message && (
        <div role="alert" aria-live="assertive">
          <p>{message}</p>
        </div>
      )}
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

export default SignIn;
