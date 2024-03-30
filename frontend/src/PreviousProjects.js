import React from "react";
import "./css/previouslyPostedStyles.css";

const PreviouslyPosted = () => {
  // Sample data for previously posted projects
  const previouslyPostedProjects = [
    {
      id: 1,
      name: "Project Name 1",
      description: "Description of Project 1 goes here.",
      metrics: "Metrics of Project 1",
    },
    {
      id: 2,
      name: "Project Name 2",
      description: "Description of Project 2 goes hereeeeeeee",
      metrics: "Metrics of Project 2",
    },
  ];

  return (
    <div className="previously-posted-container">
      <h1 className="heading">
        Your Listed <span className="span-h1">Work</span>
      </h1>
      <div className="project-cards">
        {previouslyPostedProjects.map((project) => (
          <div className="prev-project-card" key={project.id}>
            <div className="h2-div">
              <h2 className="project-name">{project.name}</h2>
            </div>
            <p className="project-description">{project.description}</p>
            <p className="project-metrics">{project.metrics}</p>
            <div className="button-container">
              <button className="archive-button">Archive Work</button>
              <button className="compute-bid-button">
                Compute Winning Bid
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviouslyPosted;
