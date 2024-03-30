import React from "react";
import "./css/RaiseIssue.css"; // Import CSS file for styling
import Annoyed from "./assets/Annoyed-cuate.svg";
import disputeHandlerData from "../src/contractArtifacts/disputeHandler.json";
import biddingData from "../src/contractArtifacts/Bidding.json";
import masterData from "../src/contractArtifacts/Master.json";
import { masterAddress } from "../src/contractArtifacts/contractAddresses.js";
const ethers = require("ethers");





const RaiseIssue = () => {

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  async function handleRaiseIssue(event) {

    event.preventDefault();
    const projectId = document.getElementById("projectID").value;
    const problemDescription = document.getElementById("problemDescription").value;

    const disputeHandlerAbi = disputeHandlerData.abi;
    const disputeHandlerByteCode = disputeHandlerData.bytecode;

    const disputeHandlerFactory = new ethers.ContractFactory(disputeHandlerAbi, disputeHandlerByteCode, signer);
    const disputeHandlerContract = await disputeHandlerFactory.deploy(projectId, problemDescription);
    console.log("Dispute Handler Contract deployed");
    const disputeHandlerAddress = await disputeHandlerContract.address;
    console.log("Current Deployed Dispute Handler Contract Address : ", disputeHandlerAddress);
  }



  return (
    <div className="raise-issue-container">
      <h1 className="raise-issue-heading">
        Did Something <span>Went </span>Wrong?
      </h1>
      <div className="raise-issue-content">
        <div className="raise-issue-left">
          <img src={Annoyed} alt="Issue Illustration" />
        </div>
        <div className="raise-issue-right">
          <h2>
            Tell <span>US</span> about it & <span> OUR</span> team will look
            <span> UPON </span> it for you
          </h2>
          <form className="raise-issue-form">
            <label htmlFor="projectName">Project ID:</label>
            <input type="text" id="projectID" name="projectName" />
            <label htmlFor="problemDescription">Problem Description:</label>
            <textarea
              id="problemDescription"
              name="problemDescription"
              rows="4"
            />
            <button className="raise-issue-button" onClick={handleRaiseIssue}>Raise Issue</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RaiseIssue;
