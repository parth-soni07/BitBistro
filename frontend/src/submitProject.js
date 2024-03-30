import React, { useState } from "react";
import "./css/postProjectStyles.css";
import Done from "./assets/Done-rafiki.png";
import escrowData from "../src/contractArtifacts/Escrow.json";
import biddingData from "../src/contractArtifacts/Bidding.json";
import { masterAddress } from "../src/contractArtifacts/contractAddresses.js";
const ethers = require("ethers");




const PostProject = () => {
  const [jobId, setJobId] = useState("");
  const [note, setNote] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [deadline, setDeadline] = useState("");

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  async function handleSubmit(event) {
    event.preventDefault();

    console.log("Job ID:", event.target.jobId.value);
    console.log("Project Link:", event.target.projectLink.value);
    console.log("Video Link:", event.target.videoLink.value);
    console.log("Note:", event.target.note.value);

    const escrowAbi = escrowData.abi;
    const biddingContract = new ethers.Contract(event.target.jobId.value , biddingData.abi, signer);
    console.log("Bidding Contract Created");
    const escrowAddress = await biddingContract.escrowAddress;
    console.log("Escrow Address:", escrowAddress);
    const escrowContract = new ethers.Contract(escrowAddress, escrowAbi, signer);
    console.log("Escrow Contract Created");
    try {
      await escrowContract.submitProject(event.target.projectLink.value, event.target.videoLink.value, event.target.note.value);
      console.log("Project Submitted Successfully");
    } catch (error) {
      console.log("Error submitting project:", error);
    }
  };

  return (
    <div className="post-project-container">
      <div className="submit-project-left">
        <h1>
          Done with the <span className="span-h1"> WORK ?</span>
        </h1>{" "}
        <h2>
          {" "}
          Submit <span className="span-h2"> IT </span>here
        </h2>
        <form className="project-form" onSubmit={handleSubmit}>
          <label htmlFor="deadline" className="altert-time">
            Days Left for Deadline: 4
          </label>
          <label htmlFor="jobId">Job ID:</label>
          <input
            type="text"
            id="jobId"
            name="jobId"
            value={jobId}
            onChange={(event) => setJobId(event.target.value)}
            placeholder="Enter Job ID"
          />
          <label htmlFor="projectLink">Project Link:</label>
          <input
            type="text"
            id="projectLink"
            name="projectLink"
            value={projectLink}
            onChange={(event) => setProjectLink(event.target.value)}
            placeholder="Enter project link"
          />
          <label htmlFor="videoLink">Video Demonstration Link:</label>
          <input
            type="text"
            id="videoLink"
            name="videoLink"
            value={videoLink}
            onChange={(event) => setVideoLink(event.target.value)}
            placeholder="Enter video link"
          />
          <label htmlFor="note">Leave a Note:</label>
          <textarea
            id="note"
            name="note"
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="Write your note here..."
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="submit-project-right">
        {/* Section Right */}
        <img src={Done} alt="Issue Illustration" />
      </div>
    </div>
  );
};

export default PostProject;
