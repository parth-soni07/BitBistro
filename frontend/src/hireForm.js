import React, { useState } from "react";
import "./css/App.css";
import "./css/hireForm.css";
import Freelancer from "./assets/Freelancer-bro.png";

const HireForm = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleButtonClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`project-container ${isFlipped ? "flipped" : ""}`}>
      <div className="project-card project-front">
        <img src={Freelancer} alt="Left Image" className="section-image" />
        <button className="post-project-button" onClick={handleButtonClick}>
          Hire Freelancer
        </button>
      </div>
      <div className="project-card project-back">
        <form className="project-form">
          <input type="number" placeholder="Bid Amount" />
          <button className="post-button">Post Bid</button>
        </form>
      </div>
    </div>
  );
};

export default HireForm;
