import React, { useState } from "react";
import "./css/projectForm.css";
import Owner from "./assets/Freelancer-cuate.png";
import biddingData from "../src/contractArtifacts/Bidding.json";
import masterData from "../src/contractArtifacts/Master.json";
import { masterAddress } from "../src/contractArtifacts/contractAddresses.js";
const ethers = require("ethers");

const ProjectForm = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [biddingContractAddress, setbiddingContractAddress] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectMetrics, setProjectMetrics] = useState("");

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  // Master Contract
  const masterAbi = masterData.abi;
  const masterContract = new ethers.Contract(masterAddress, masterAbi, signer);

  async function deployContract(event) {
    console.log("Project Name:", projectName);
    console.log("Project Description:", projectDescription);
    console.log("Project Metrics:", projectMetrics);

    event.preventDefault();
    console.log("Deploying Project Bidding Contract...");

    try {
      const biddingAbi = biddingData.abi;
      const biddingByteCode = biddingData.bytecode;
      const biddingContractFactory = new ethers.ContractFactory(
        biddingAbi,
        biddingByteCode,
        signer
      );
      const biddingContract = await biddingContractFactory.deploy(
        projectName,
        projectDescription,
        projectMetrics
      );
      console.log("Bidding Contract deployed");
      setbiddingContractAddress(await biddingContract.address);
      console.log(
        "Current Deployed Bidding Contract Address : ",
        biddingContractAddress
      );
      console.log("Bidding Contract adding to Master...");
      const signerAddress = await signer.getAddress();
      await masterContract.addProject(signerAddress, biddingContractAddress);
      console.log(
        "Bidding Contract Successfully added to Master with address : ",
        biddingContractAddress
      );
    } catch (error) {
      console.log("error >>>>>>>>>>>>>>>>>>>>>>>>>>>:", error);
    }
  }

  const handleButtonClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`project-container ${isFlipped ? "flipped" : ""}`}>
      <div className={`project-card project-front ${isFlipped ? "front" : ""}`}>
        <img src={Owner} alt="Right Image" className="right-section-image" />
        <div className="button_div">
          <button className="post-project-button" onClick={handleButtonClick}>
            Post Project
          </button>
        </div>
      </div>

      <div className={`project-card project-back ${isFlipped ? "" : "front"}`}>
        <h1
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          Explain The Project Idea
        </h1>

        <form className="project-form" onSubmit={deployContract}>
          <input
            type="text"
            placeholder="Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <textarea
            style={{ height: "50px" }}
            placeholder="Project Description"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          />
          <textarea
            style={{ height: "100px" }}
            placeholder="Project Metrics"
            value={projectMetrics}
            onChange={(e) => setProjectMetrics(e.target.value)}
          />
          <button
            className="post-button"
            style={{
              marginTop: "20px",
              fontSize: "20px",
              padding: "10px 35px",
            }}
            type="submit"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
