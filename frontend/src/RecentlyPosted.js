import React, { useState, useEffect } from "react";
import "./css/recentlyPostedStyles.css";
import masterData from "../src/contractArtifacts/Master.json";
import biddingData from "../src/contractArtifacts/Bidding.json";
import { masterAddress } from "../src/contractArtifacts/contractAddresses.js";
const ethers = require("ethers");

const RecentlyPosted = () => {
  const [uploadedProjects, setUploadedProjects] = useState([]);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [projectDataArray, setProjectDataArray] = useState([]);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  useEffect(() => {
    getProjects();
  }, []); // Empty dependency array means this effect will run only once when the component mounts

  async function getProjects() {
    const masterAbi = masterData.abi;
    const masterContract = new ethers.Contract(
      masterAddress,
      masterAbi,
      signer
    );

    try {
      const allProjects = await masterContract.getAllProjects();
      setUploadedProjects(allProjects);
      const data = await getAllProjectData(allProjects);
      setProjectDataArray(data);
    } catch (error) {
      console.log("Error fetching projects:", error);
    }
  }

  async function getAllProjectData(allProjects) {
    const projectDataArray = [];

    for (let index = 0; index < allProjects.length; index++) {
      const projectId = allProjects[index];
      console.log("Fetching data for project with ID:", projectId);

      try {
        const biddingContract = new ethers.Contract(
          projectId,
          biddingData.abi,
          signer
        );
        const projectName = await biddingContract.projectName();
        const projectDescription = await biddingContract.projectDescription();
        const projectMetrics = await biddingContract.projectMetrics();

        const projectData = {
          id: projectId,
          name: projectName,
          description: projectDescription,
          metrics: projectMetrics,
        };

        projectDataArray.push(projectData);
        console.log("Fetched data for project:", projectData);
      } catch (error) {
        console.log("Error fetching data for project:", projectId, error);
      }
    }

    return projectDataArray;
  }

  const handlePrevClick = () => {
    if (scrollIndex > 0) {
      setScrollIndex(scrollIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (scrollIndex < projectDataArray.length - 3) {
      setScrollIndex(scrollIndex + 1);
    }
  };

  const handlePostBid = (event) => {
    // Prevent default form submission behavior
    event.preventDefault();
    // Call the getProjects function or any other action you want here
    getProjects();
  };

  return (
    <div id="recently-posted" className="recently-posted-container">
      <div className="recently-posted-header">
        <div className="heading-text">
          <h1>
            Recently Posted
            <span>Works</span>
          </h1>
        </div>
        <div className="navigation-buttons">
          <button onClick={handlePrevClick}>&#8249;</button>
          <button onClick={handleNextClick}>&#8250;</button>
        </div>
      </div>
      <div className="card-container">
        {projectDataArray.slice(scrollIndex, scrollIndex + 3).map((project) => (
          <div
            className="card"
            key={project.id}
            style={{
              padding: "20px",
              height: "350px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div
              className="form_Content"
              style={{
                height: "250px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <h3 className="card-title" style={{ height: "30px" }}>
                {project.name}
              </h3>
              <p className="card-description" style={{ height: "80px" }}>
                {project.description}
              </p>
              <p className="card-metrics" style={{ height: "140px" }}>
                {project.metrics}
              </p>
            </div>
            <div className="form_post_bid">
              <form
                className="recent-card-form"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <input
                  type="number"
                  placeholder="Bid Amount eg- $100"
                  style={{
                    padding: "5px 5px",
                    borderRadius: "7px",
                    outline: "none",
                    offset: "none",
                    border: "1px solid",
                  }}
                />
                <button className="recent-post-button" onClick={handlePostBid}>
                  Post Bid
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyPosted;
