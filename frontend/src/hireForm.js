import React, { useState } from "react";
import "./css/hireForm.css";
import Freelancer from "./assets/Freelancer-bro.png";
const handleHireFreelancerClick = () => {
  const recentlyPostedSection = document.getElementById("recently-posted");
  if (recentlyPostedSection) {
    recentlyPostedSection.scrollIntoView({ behavior: "smooth" });
  } 
};

const HireForm = () => {
  return (
    <div className="project-container">
      <div className="project-card project-front">
        <img src={Freelancer} alt="Left Image" className="left-section-image" />
        <div className="button-div">
          {" "}
          <button
            className="hire-freelancer-button"
            onClick={handleHireFreelancerClick}
          >
            Hire Freelancer
          </button>
        </div>
      </div>
    </div>
  );
};

export default HireForm;
