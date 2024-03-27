import React, { useState } from "react";
import "./css/hireForm.css";
import Freelancer from "./assets/Freelancer-bro.png";

const HireForm = () => {
  return (
    <div className="project-container">
      <div className="project-card project-front">
        <img src={Freelancer} alt="Left Image" className="left-section-image" />
        <button className="hire-freelancer-button">Hire Freelancer</button>
      </div>
    </div>
  );
};

export default HireForm;
