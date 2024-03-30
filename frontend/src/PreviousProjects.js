import React, { useState, useEffect } from "react";
import "./css/previouslyPostedStyles.css";
import biddingData from "../src/contractArtifacts/Bidding.json";
import masterData from "../src/contractArtifacts/Master.json";
import { masterAddress } from "../src/contractArtifacts/contractAddresses.js";
const ethers = require("ethers");

const PreviouslyPosted = () => {
  const [projectDataArray, setProjectDataArray] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const masterAbi = masterData.abi;
      const masterContract = new ethers.Contract(masterAddress, masterAbi, signer);

      try {
        const allProjects = await masterContract.getProjectsByOwner(signer.getAddress());
        const projectDataArray = await getAllProjectData(allProjects, signer);
        setProjectDataArray(projectDataArray);
      } catch (error) {
        console.log("Error fetching projects:", error);
      }
    }

    fetchData();
  }, []);

  async function getAllProjectData(allProjects, signer) {
    const projectDataArray = [];

    for (let index = 0; index < allProjects.length; index++) {
      const projectId = allProjects[index];
      console.log("Fetching data for project with ID:", projectId);

      try {
        const biddingContract = new ethers.Contract(projectId, biddingData.abi, signer);
        const projectName = await biddingContract.projectName();
        const projectDescription = await biddingContract.projectDescription();
        const projectMetrics = await biddingContract.projectMetrics();
        const isBiddingPaused = await biddingContract.biddingPaused();
        const numberOfBids = await biddingContract.getNumBidsPlaced();

        const projectData = {
          id: projectId,
          name: projectName,
          description: projectDescription,
          metrics: projectMetrics,
          numberOfBids: numberOfBids.toString(),
          isBiddingPaused: isBiddingPaused
        };

        projectDataArray.push(projectData);
        console.log("Fetched data for project:", projectData);
      } catch (error) {
        console.log("Error fetching data for project:", projectId, error);
      }
    }

    return projectDataArray;
  }

  async function toggleBiddingStatus(event, projectId) {
    event.preventDefault();

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const biddingContract = new ethers.Contract(projectId, biddingData.abi, signer);

    try {
      const isBiddingPaused = await biddingContract.biddingPaused();
      if (isBiddingPaused) {
        // Resume bidding
        await biddingContract.resumeBidding();
      } else {
        // Pause bidding
        await biddingContract.pauseBidding();
      }
      // Update project data array with the updated bidding status
      const updatedProjectDataArray = projectDataArray.map(project => {
        if (project.id === projectId) {
          return { ...project, isBiddingPaused: !isBiddingPaused };
        }
        return project;
      });
      setProjectDataArray(updatedProjectDataArray);
    } catch (error) {
      console.log("Error toggling bidding status:", error);
    }
  }

  async function computeWinningBid(event, projectId) {
    event.preventDefault();

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const biddingContract = new ethers.Contract(projectId, biddingData.abi, signer);

    try {
      await biddingContract.computeWinner();
      console.log("Winner calculated");
      // Add a delay of 1 second (adjust as needed)
      setTimeout(async () => {
        const winner = await biddingContract.winner();
        console.log("Winner of the project:", winner);
        const winningBid = await biddingContract.winningBid();
        console.log("Winning bid amount:", winningBid.toString());
      }, 5000); // 1000 milliseconds = 1 second
    } catch (error) {
      console.error("Error computing winning bid:", error);
    }

  }

  return (
    <div className="previously-posted-container">
      <h1 className="heading">
        Your Listed <span className="span-h1">Work</span>
      </h1>
      <div className="project-cards">
        {projectDataArray.map((project) => (
          <div className="prev-project-card" key={project.id}>
            <div className="h2-div">
              <h2 className="project-name">{project.name}</h2>
            </div>
            <p className="project-description">{project.description}</p>
            <p className="project-metrics">{project.metrics}</p>
            <p className="project-metrics">Number of Bidders: {project.numberOfBids}</p>
            <div className="button-container">
              <button className="archive-button" onClick={(event) => toggleBiddingStatus(event, project.id)}>
                {project.isBiddingPaused ? "Resume" : "Pause"} Bidding
              </button>
              <button className="compute-bid-button" onClick={(event) => computeWinningBid(event, project.id)}>
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
