import React, { useState, useEffect } from "react";
import "./css/previouslyPostedStyles.css";
import biddingData from "../src/contractArtifacts/Bidding.json";
import masterData from "../src/contractArtifacts/Master.json";
import escrowData from "../src/contractArtifacts/Escrow.json";
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
        console.log("All projects by owner fetched");
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
        console.log("Bidding contract created for project:", projectId);
        const projectName = await biddingContract.projectName();
        const projectDescription = await biddingContract.projectDescription();
        const projectMetrics = await biddingContract.projectMetrics();
        const isBiddingPaused = await biddingContract.biddingPaused();
        const numberOfBids = await biddingContract.getNumBidsPlaced();
        const escrowAddress = await biddingContract.escrowAddress();
        console.log("escrowAddress:", escrowAddress);
        console.log("Fetched data for project:", projectId);

        let additionalData = {};

        if (escrowAddress != "0x0000000000000000000000000000000000000000") {
          const escrowabi = escrowData.abi;
          const escrowContract = new ethers.Contract(escrowAddress, escrowabi, signer);
          const isProjectSubmitted = await escrowContract.projectSubmitted();
          console.log("Is project submitted:", isProjectSubmitted);

          if (isProjectSubmitted) {
            const codelink = await escrowContract.codeLink();
            const assetsLink = await escrowContract.assetsLink();
            const comments = await escrowContract.comments();

            additionalData = {
              codelink,
              assetsLink,
              comments
            };
          }
        }

        const projectData = {
          id: projectId,
          name: projectName,
          description: projectDescription,
          metrics: projectMetrics,
          numberOfBids: numberOfBids.toString(),
          isBiddingPaused: isBiddingPaused,
          ...additionalData
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

  async function triggerRaiseDispute(event, projectId) { 
    console.log("Raise Dispute");
  }

  async function ApproveProject(event, projectId) {
    console.log("Approve Project");
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
            {project.codelink ? ( // Check if submitted data is available
              <>
                <p className="project-description">Code Link: {project.codelink}</p>
                <p className="project-description">Assets Link: {project.assetsLink}</p>
                <p className="project-description">Comments: {project.comments}</p>
                <div className="button-container">
                  <button className="archive-button" onClick={(event) => triggerRaiseDispute(event, project.id)}>
                    Raise Dispute
                  </button>
                  <button className="compute-bid-button" onClick={(event) => ApproveProject(event, project.id)}>
                    Approve Submitted Project
                  </button>
                </div>
              </>
            ) : ( // Fallback to project data
              <>
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
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );

};

export default PreviouslyPosted;
