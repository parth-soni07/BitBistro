// RaiseIssue.js

import React from "react";
import "./css/RaiseIssue.css"; // Import CSS file for styling
import Annoyed from "./assets/Annoyed-cuate.svg";
const RaiseIssue = () => {
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
            <label htmlFor="projectName">Project Name:</label>
            <input type="text" id="projectName" name="projectName" />
            <label htmlFor="problemDescription">Problem Description:</label>
            <textarea
              id="problemDescription"
              name="problemDescription"
              rows="4"
            />
            <button className="raise-issue-button">Raise Issue</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RaiseIssue;
