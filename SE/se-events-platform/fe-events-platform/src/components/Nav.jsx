import React from 'react';
import { Link } from 'react-router-dom';

const NAV = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/sign-in">Sign In</Link></li>
        <li><Link to="/sign-up">Sign Up</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </nav>
  );
};

export default NAV;
