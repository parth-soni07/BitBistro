import React, { useState, useEffect } from "react";
import "./css/previouslyPostedStyles.css";
import disputeData from "../src/contractArtifacts/disputeHandler.json";
import biddingData from "../src/contractArtifacts/Bidding.json";
import escrowData from "../src/contractArtifacts/Escrow.json";
import masterData from "../src/contractArtifacts/Master.json";
const ethers = require("ethers");

const Vote = () => {
  const [projectDataArray, setProjectDataArray] = useState([]);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  useEffect(() => {
    async function fetchData() {
      try {
        const masterAbi = masterData.abi;
        // const masterContract = new ethers.Contract(masterData.address, masterAbi, signer);

        // const contractAddresses = await masterContract.getDisputeHandlers();
        const contractAddresses = ["0x111ea7AC6cA7bA8786968c97F511548a61060aeb"];

        const projectData = await Promise.all(
          contractAddresses.map(async (address) => {
            const disputehandlercontractabi = disputeData.abi;
            const disputehandlercontract = new ethers.Contract(address, disputehandlercontractabi, signer);

            const projectID = await disputehandlercontract.projectId();
            const problemDescription = await disputehandlercontract.problemDescription();

            const biddingcontractabi = biddingData.abi;
            const biddingcontract = new ethers.Contract(projectID, biddingcontractabi, signer);

            const name = await biddingcontract.projectName();
            const description = await biddingcontract.projectDescription();
            const metrics = await biddingcontract.projectMetrics();
            const escrowaddress = await biddingcontract.escrowAddress();
            const escrowcontractabi = escrowData.abi;
            const escrowcontract = new ethers.Contract(escrowaddress, escrowcontractabi, signer);
            const codelink = await escrowcontract.codeLink();

            return {
              address: address,
              name: name,
              description: description,
              metrics: metrics,
              problemDescription: problemDescription,
              codeLink: codelink,
            };
          })
        );

        setProjectDataArray(projectData);
      } catch (error) {
        console.error("Error fetching project data:", error);
        // Handle error here
      }
    }

    fetchData();
  }, []);

  const handleClick = async (handlerAddress, voteType) => {
    try {
      const disputehandlercontractabi = disputeData.abi;
      const disputehandlercontract = new ethers.Contract(handlerAddress, disputehandlercontractabi, signer);

      const voteValue = voteType === "positive" ? true : false;
      await disputehandlercontract.vote(voteValue);

      console.log("Vote successful");
      // Optionally, you can update the UI or perform any other actions after voting
    } catch (error) {
      console.error("Error voting:", error);
      // Handle error here
    }
  };

  return (
    <div className="previously-posted-container">
      <h1 className="heading">
        DAO <span className="span-h1">Voting</span>
      </h1>
      <div className="project-cards">
        {projectDataArray.map((project, index) => (
          <div className="prev-project-card" key={index}>
            <div className="h2-div">
              <h2 className="project-name">{project.name}</h2>
            </div>
            <p className="project-description">
              <span>Project Description: </span>
              {project.description}
            </p>
            <p className="project-metrics">
              <span>Project Metrics:</span> {project.metrics}
            </p>
            <p>Problem: {project.problemDescription}</p>
            <p>Link: {project.codeLink}</p>

            <div className="button-container">
              <button className="negative-button" onClick={() => handleClick(project.address, "negative")}>
                Negative (In favor of Owner)
              </button>
              <button className="positive-button" onClick={() => handleClick(project.address, "positive")}>
                Positive (In favor of Freelancer)
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vote;