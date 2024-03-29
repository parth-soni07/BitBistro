import React, { useState } from "react";
import "./css/postProjectStyles.css";
import Done from "./assets/Done-rafiki.png";
const PostProject = () => {
  const [jobId, setJobId] = useState("");
  const [note, setNote] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add code to handle form submission
  };

  return (
    <div className="post-project-container">
      <div className="submit-project-left">
        <h1>
          Done with the <span className="span-h1"> WORK ?</span>
        </h1>{" "}
        <h2>
          {" "}
          Submit <span> IT </span>here
        </h2>
        <form className="project-form" onSubmit={handleSubmit}>
          <label htmlFor="deadline" className="altert-time">Days Left for Deadline: 4</label>
          <label htmlFor="jobId">Job ID:</label>
          <input
            type="text"
            id="jobId"
            name="jobId"
            value={jobId}
            onChange={(event) => setJobId(event.target.value)}
            placeholder="Enter Job ID"
          />
          <label htmlFor="note">Leave a Note:</label>
          <textarea
            id="note"
            name="note"
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="Write your note here..."
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
