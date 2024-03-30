import React from "react";
import "./css/signBidStyles.css";

const SignBid = () => {
  // Sample data for sign bid projects
  const signBidProjects = [
    {
      id: 1,
      name: "Project Name 1",
      description: "Description of Project 1 goes here.",
      metrics: "Metrics of Project 1",
      currentBid: "$100",
      ownerStake: "$50",
    },
    {
      id: 2,
      name: "Project Name 2",
      description: "Description of Project 2 goes here.",
      metrics: "Metrics of Project 2",
      currentBid: "$150",
      ownerStake: "$75",
    },
  ];

  return (
    <div className="sign-bid-container">
      <h1>Sign Bid</h1>
      <div className="project-cards">
        {signBidProjects.map((project) => (
          <div className="bid-project-card" key={project.id}>
            <h2 className="project-name">{project.name}</h2>
            <p className="project-description">{project.description}</p>
            <p className="project-metrics">{project.metrics}</p>
            <p className="current-bid">Current Bid: {project.currentBid}</p>
            <p className="owner-stake">Owner Stake: {project.ownerStake}</p>
            <button className="sign-button">Sign</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SignBid;
