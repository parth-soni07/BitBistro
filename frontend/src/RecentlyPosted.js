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
    const masterContract = new ethers.Contract(masterAddress, masterAbi, signer);

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
        const biddingContract = new ethers.Contract(projectId, biddingData.abi, signer);
        const projectName = await biddingContract.projectName();
        const projectDescription = await biddingContract.projectDescription();
        const projectMetrics = await biddingContract.projectMetrics();

        const projectData = {
          id: projectId,
          name: projectName,
          description: projectDescription,
          metrics: projectMetrics
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
    <div className="recently-posted-container">
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
          <div className="card" key={project.id}>
            <div className="card-content">
              <h3 className="card-title">{project.name}</h3>
              <p className="card-description">{project.description}</p>
              <p className="card-metrics">{project.metrics}</p>
              <form className="recent-card-form">
                <input type="number" placeholder="Bid Amount" />
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
