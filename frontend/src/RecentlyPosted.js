// RecentlyPosted.js

import React, { useState } from "react";
import "./css/recentlyPostedStyles.css"; // Import CSS file for styling

const RecentlyPosted = () => {
  // Sample data for cards
  const sampleProjects = [
    {
      id: 1,
      name: "Project Name 1",
      description: "Description of the project 1 goes here.",
      timeLeft: "2 days left",
      minBid: "$100",
    },
    {
      id: 2,
      name: "Project Name 2",
      description: "Description of the project 2 goes here.",
      timeLeft: "3 days left",
      minBid: "$150",
    },
    {
      id: 3,
      name: "Project Name 3",
      description: "Description of the project 3 goes here.",
      timeLeft: "5 days left",
      minBid: "$200",
    },
    {
      id: 4,
      name: "Project Name 4",
      description: "Description of the project 4 goes here.",
      timeLeft: "7 days left",
      minBid: "$250",
    },
    {
      id: 5,
      name: "Project Name 5",
      description: "Description of the project 5 goes here.",
      timeLeft: "10 days left",
      minBid: "$300",
    },
  ];

  const [scrollIndex, setScrollIndex] = useState(0);

  const handlePrevClick = () => {
    if (scrollIndex > 0) {
      setScrollIndex(scrollIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (scrollIndex < sampleProjects.length - 3) {
      setScrollIndex(scrollIndex + 1);
    }
  };

  return (
    <div className="recently-posted-container">
      <div className="recently-posted-header">
        {/* <div className="sub-heading">the latest freelance work</div> */}
        <div className="heading-text">
          <h1>
            Recently Posted
            <span>Works</span>
          </h1>
          {/* Different color for "Works" */}
        </div>
        <div className="navigation-buttons">
          <button onClick={handlePrevClick}>&#8249;</button>
          <button onClick={handleNextClick}>&#8250;</button>
        </div>
      </div>
      <div className="card-container">
        {sampleProjects.slice(scrollIndex, scrollIndex + 3).map((project) => (
          <div className="card" key={project.id}>
            <div className="card-content">
              <h3 className="card-title">{project.name}</h3>
              <p className="card-timeleft">{project.timeLeft}</p>
              <p className="card-description">{project.description}</p>
              <p className="card-min-bid">Minimum Bid: {project.minBid}</p>
              <form className="recent-card-form">
                <input type="number" placeholder="Bid Amount" />
                <button className="recent-post-button">Post Bid</button>
              </form>
              {/* <div className="apply-now-link">
                <a href="#" className="apply-now-link">
                  Apply Now
                </a>
              </div>*/}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyPosted;
