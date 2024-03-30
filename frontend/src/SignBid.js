import { React, useState, useEffect } from "react";
import "./css/signBidStyles.css";
import biddingData from "../src/contractArtifacts/Bidding.json";
import masterData from "../src/contractArtifacts/Master.json";
import { masterAddress } from "../src/contractArtifacts/contractAddresses.js";
const ethers = require("ethers");

const SignBid = () => {
  const [projectDataArray, setProjectDataArray] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const masterAbi = masterData.abi;
      const masterContract = new ethers.Contract(masterAddress, masterAbi, signer);

      try {
        const allProjects = await masterContract.getAllProjects();
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
        const owner = await biddingContract.owner();
        const winner = await biddingContract.winner();
        const loggedInUser = await signer.getAddress();
        console.log("Owner:", owner);
        console.log("Winner:", winner);
        console.log("loggedInUser:", loggedInUser);
        if (biddingContract.winner) {
          if (owner === loggedInUser) {
            const projectName = await biddingContract.projectName();
            const projectDescription = await biddingContract.projectDescription();
            const projectMetrics = await biddingContract.projectMetrics();
            const winningBid = await biddingContract.winningBid;

            const projectData = {
              id: projectId,
              name: projectName,
              description: projectDescription,
              metrics: projectMetrics,
              stakeAmount: winningBid,
              role: 'Owner'
            };
            projectDataArray.push(projectData);
          } else if (winner === await signer.getAddress()) {
            const projectName = await biddingContract.projectName();
            const projectDescription = await biddingContract.projectDescription();
            const projectMetrics = await biddingContract.projectMetrics();
            const winningBid = await biddingContract.winningBid();
            console.log("Winning Bid:", winningBid.toString());
            console.log("Winning Bid:", (5 * parseInt(winningBid)) / 100);
            const projectData = {
              id: projectId,
              name: projectName,
              description: projectDescription,
              metrics: projectMetrics,
              winningBid: winningBid.toString(),
              stakeAmount:  (5 * parseInt(winningBid)) / 100,
              role: 'Freelancer'
            };
            projectDataArray.push(projectData);
          }
        }
      } catch (error) {
        console.log("Error fetching data for project:", projectId, error);
      }
    }

    return projectDataArray;
  }


  return (
    <div className="sign-bid-container">
      <h1>Sign Bid</h1>
      <div className="project-cards">
        {projectDataArray.map((project) => (
          <div className="bid-project-card" key={project.id}>
            <h2 className="project-name">{project.name}</h2>
            <p className="project-description">{project.description}</p>
            <p className="project-metrics">{project.metrics}</p>
            {/* <p className="current-bid">Current Bid: {project.currentBid}</p> */}
            <p className="owner-stake">
              Winning Bid : {project.winningBid}
            </p>
            <button className="sign-button">{project.role === 'Owner' ? 'Sign and Stake as a Owner : ' : 'Sign and Stake as a Freelancer : '} {project.stakeAmount}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SignBid;
