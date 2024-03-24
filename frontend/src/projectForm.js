import React, { useState } from "react";
import "./css/projectForm.css";
import Owner from "./assets/Freelancer-cuate.png";

const ProjectForm = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleButtonClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`project-container ${isFlipped ? "flipped" : ""}`}>
      <div className="project-card project-front">
        <img src={Owner} alt="Right Image" className="section-image" />
        <button className="post-project-button" onClick={handleButtonClick}>
          Post Project
        </button>
      </div>
      <div className="project-card project-back">
        <form className="project-form">
          <input type="text" placeholder="Project Name" />
          <textarea placeholder="Project Description"></textarea>
          <button className="post-button">Post</button>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;