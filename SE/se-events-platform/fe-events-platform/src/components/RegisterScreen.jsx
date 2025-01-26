import React, { useState } from "react";
import UserRegistration from "./UserRegistration";
import StaffRegistration from "./StaffRegistration";
import '../styles/style.css';

const RegisterScreen = ({ navigateToLogin }) => {
  const [isStaff, setIsStaff] = useState(false); // Toggle between staff and user registration

  return (
    <div style={styles.container}>
      {!isStaff ? (
        <UserRegistration navigateToLogin={navigateToLogin} />
      ) : (
        <StaffRegistration navigateToLogin={navigateToLogin} />
      )}

      <button onClick={() => setIsStaff(!isStaff)}>
        {isStaff ? "Register as User" : "Register as Staff"}
      </button>
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
