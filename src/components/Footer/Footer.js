import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container text-center">
        © {new Date().getFullYear()} Tennis Mate. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
