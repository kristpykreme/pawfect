import React from "react";
import Navbar from "../NavigationBar/Navbar";

function NotFound() {
  return (
    <div>
      <Navbar />
      <h1>NOT FOUND... sry invalid link</h1>


      <footer className="footer">
        <p className="footer-by">
          IT2002 App
        </p>
      </footer>
    </div>
  );
}

export default NotFound;
