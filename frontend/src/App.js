import React from "react";
import "./css/App.css"; // Import CSS file for styling
import RecentlyPosted from "./RecentlyPosted";
import ProjectForm from "./projectForm";
import HireForm from "./hireForm";
const HomePage = () => {
  return (
    <div className="container">
      <nav className="navbar">
        <div className="navbar-left">
          <h1 className="logo">FreLanCircle</h1>
          <ul className="nav-links">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>
        <div className="navbar-right">
          <button className="connect-button">Connect Metamask</button>
        </div>
      </nav>

      <div className="main-content">
        <div className="left-section">
          <HireForm />
        </div>
        <div className="right-section">
          <ProjectForm />
        </div>
      </div>
      <RecentlyPosted />
    </div>
  );
};

export default HomePage;
