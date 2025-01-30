import React from "react";
import { Link } from "react-router-dom";
import "../styles/style.css";

const Nav = () => {
  return (
    <nav className="nav" role="navigation" aria-label="Main Navigation">
      <ul>
        <li>
          <Link to="/home" aria-label="Go to Home page">
            Home
          </Link>
        </li>
        <li>
          <Link to="/sign-in" aria-label="Go to Sign In page">
            Sign In
          </Link>
        </li>
        <li>
          <Link to="/sign-up" aria-label="Go to Sign Up page">
            Sign Up
          </Link>
        </li>
        <li>
          <Link to="/profile" aria-label="Go to Profile page">
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
