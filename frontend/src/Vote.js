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

      const masterAbi = masterData.abi;
      const masterAddress = masterData.address;
      const masterContract = new ethers.Contract(masterAddress, masterAbi, signer);

      const contractAddresses = await masterContract.getDisputeHandlers();



      // Create instances of the contracts using the addresses from the array
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
            name: name,
            description: description,
            metrics: metrics,
            problemDescription: problemDescription,
            codeLink: codelink,
          };
        })
      );

      // Set the project data array
      setProjectDataArray(projectData);
    }

    fetchData();
  }, []);

  const handleClick = async (projectId, voteType) => {

    const disputehandlercontractabi = disputeData.abi;
    const disputehandlercontractAddress = "0xD13B0B7490479726dE6b6A6de97633535057D98D";
    const disputehandlercontract = new ethers.Contract(disputehandlercontractAddress, disputehandlercontractabi, signer);

    try {
      if (voteType === "positive") {
        await disputehandlercontract.vote(true); // Assuming true represents a positive vote
      } else {
        await disputehandlercontract.vote(false); // Assuming false represents a negative vote
      }
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
        {projectDataArray.map((project) => (
          <div className="prev-project-card" key={project.id}>
            <div className="h2-div">
              <h2 className="project-name">{project.name}</h2>
            </div>
            <p className="project-description">
              <span>Project Description: </span>
              {project.description}
            </p>

            <p className="project-metrics">
              {" "}
              <span>Project Metrics:</span> {project.metrics}
            </p>
            <p>Problem: {project.problemDescription}</p>
            <p>Link: {project.codeLink}</p>

            <div className="button-container">
              <button className="negative-button" onClick={() => handleClick(project.id, "negative")}>
                Negative (In favor of Owner)
              </button>
              <button className="positive-button" onClick={() => handleClick(project.id, "positive")}>
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
