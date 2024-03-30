import React, { useState, useEffect } from "react";
import "./css/recentlyPostedStyles.css";
import masterData from "../src/contractArtifacts/Master.json";
import biddingData from "../src/contractArtifacts/Bidding.json";
import { masterAddress } from "../src/contractArtifacts/contractAddresses.js";
import { encrypt, decrypt } from "./scripts/encrypt.js";
const ethers = require("ethers");

const RecentlyPosted = () => {
  const [uploadedProjects, setUploadedProjects] = useState([]);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [projectDataArray, setProjectDataArray] = useState([]);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  useEffect(() => {
    getProjects();
  }, []);




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
        const isBidPlaced = await biddingContract.hasPlacedBid(signer.getAddress());

        const projectData = {
          id: projectId,
          name: projectName,
          description: projectDescription,
          metrics: projectMetrics,
          isBidPlaced: isBidPlaced
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

  const handlePostBid = async (event, projectID) => {
    // Prevent default form submission behavior
    event.preventDefault();

    // Retrieve bid amount and secret key from form inputs
    const form = event.currentTarget.closest('form');
    const bidAmount = parseFloat(form.querySelector("#bidAmountInput").value);
    const secretKey = form.querySelector("#secretKeyInput").value;
    const toBidContract = new ethers.Contract(projectID, biddingData.abi, signer);
    const encryptedBidAmount = encrypt(bidAmount, secretKey);
    console.log("Encrypted Bid:", encryptedBidAmount);
    try {
      const bid = await toBidContract.placeBid(encryptedBidAmount);
      console.log("Bid placed successfully");
    } catch (error) {
      console.log("Error placing bid:", error);
    }
  };

  const handleRevealBid = async (event, projectID) => {
    // Prevent default form submission behavior
    event.preventDefault();

    // Retrieve bid amount and secret key from form inputs
    const form = event.currentTarget.closest('form');
    const bidAmount = parseFloat(form.querySelector("#bidAmountInput").value);
    const secretKey = form.querySelector("#secretKeyInput").value;

    const toBidContract = new ethers.Contract(projectID, biddingData.abi, signer);

    try {
      // Retrieve the stored encrypted bid from the blockchain
      const storedEncryptedBid = await toBidContract.encryptedBids(signer.getAddress());

      // Encrypt the bid amount with the provided secret key
      const encryptedBidAmount = encrypt(bidAmount, secretKey);

      // Decrypt both the stored encrypted bid and the new encrypted bid
      const storedDecryptedBid = decrypt(storedEncryptedBid, secretKey).toString();
      const newDecryptedBid = decrypt(encryptedBidAmount, secretKey).toString();

      // Check if both decrypted bids match
      if (storedDecryptedBid === newDecryptedBid) {
        // If they match, reveal the bid
        const bid = await toBidContract.revealBid(bidAmount);
        console.log("Bid Revealed successfully");
      } else {
        // If they don't match, log an error
        console.log("Error: Encrypted Bid does not match the stored Encrypted Bid");
      }
    } catch (error) {
      console.log("Error revealing bid:", error);
    }
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
          <div className="card" key={project.id}>
            <div className="card-content">
              <h3 className="card-title">{project.name}</h3>
              <p className="card-description">{project.description}</p>
              <p className="card-metrics">{project.metrics}</p>
              <form className="recent-card-form">
                <input type="number" placeholder="Bid Amount" id="bidAmountInput" />
                <input type="text" placeholder="Secret Key" id="secretKeyInput" />
                {project.isBidPlaced ? (
                  <button className="recent-post-button" onClick={(event) => handleRevealBid(event, project.id)}>
                    Reveal Bid
                  </button>
                ) : (
                  <button className="recent-post-button" onClick={(event) => handlePostBid(event, project.id)}>
                    Post Bid
                  </button>
                )}
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyPosted;
