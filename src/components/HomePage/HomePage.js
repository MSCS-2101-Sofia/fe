import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css"; // Make sure to import the CSS for styling

const HomePage = () => {
  // This example assumes you have a way to check if a user is logged in
  const isLoggedIn = false; // Replace with actual authentication check

  return (
    <div className="homepage container text-center mt-5">
      <div className="overlay">
        {" "}
        {isLoggedIn ? (
          <h1>Welcome back!</h1>
        ) : (
          <>
            <h1>Welcome to Tennis Mate</h1>
            <Link to="/signup" className="btn btn-primary m-2">
              Sign Up
            </Link>
            <Link to="/signin" className="btn btn-secondary m-2">
              Sign In
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
