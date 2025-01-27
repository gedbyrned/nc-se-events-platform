import React, { useState } from "react";
import UserRegistration from "./UserRegistration";
import StaffRegistration from "./StaffRegistration";
import "../styles/style.css";

const RegisterScreen = ({ navigateToLogin }) => {
  const [isStaff, setIsStaff] = useState(false);

  return (
    <div style={styles.container}>
      <h1 id="registerScreenHeader">
        Register for the Community Events Platform
      </h1>

      <div aria-live="polite">
        {!isStaff ? (
          <UserRegistration navigateToLogin={navigateToLogin} />
        ) : (
          <StaffRegistration navigateToLogin={navigateToLogin} />
        )}

        <button
          onClick={() => setIsStaff(!isStaff)}
          aria-label={
            isStaff
              ? "Switch to user registration"
              : "Switch to staff registration"
          }
        >
          {isStaff ? "Register as User" : "Register as Staff"}
        </button>
      </div>
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

export default RegisterScreen;
