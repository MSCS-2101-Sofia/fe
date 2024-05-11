import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="container d-flex justify-content-between align-items-center">
        <h1>Tennis Mate</h1>
        <nav>
          <Link to="/" className="link">
            Home
          </Link>
          <Link to="/users" className="link">
            Players match
          </Link>
          <Link to="/signin" className="link">
            Sign In
          </Link>
          <Link to="/signup" className="link">
            Sign Up
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
