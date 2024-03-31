import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";
import { React, useState, useEffect } from "react";
import tokenData from "../src/contractArtifacts/token.json";
import { tokenContractAddress } from "./contractArtifacts/contractAddresses"; 
const ethers = require("ethers");

export default function Navbar(params) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const tokenAbi = tokenData.abi;
  const tokenAddress = tokenContractAddress; // Renamed to avoid conflict
  const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, signer);

  const getTokenBalance = async () => {
    try {
      const balance = await tokenContract.balanceOf(await signer.getAddress());
      console.log("tokenBalance:", balance.toString());
      return balance;
    } catch (error) {
      console.error("Error fetching token balance:", error);
      return ethers.BigNumber.from(0); // Return a default value or handle error as necessary
    }
  };

  const [tokenBalance, setTokenBalance] = useState(ethers.BigNumber.from(0));

  useEffect(() => {
    getTokenBalance().then(balance => setTokenBalance(balance));
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="logo">Bit Bistro</h1>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link> {/* Path for Home page */}
          </li>
          <li>
            <Link to="/issues">Issues</Link> {/* Path for Issues page */}
          </li>
          <li>
            <Link to="/submit-work">Submit Work</Link>{" "}
            {/* Path for Submit Work page */}
          </li>
          <li>
            <Link to="/posted-projects">Posted Projects</Link>{" "}
            {/* Path for Submit Work page */}
          </li>
          <li>
            <Link to="/sign-work">Sign Work</Link>{" "}
            {/* Path for Submit Work page */}
          </li>
          <li>
            <Link to="/vote">Vote</Link> {/* Path for Submit Work page */}
          </li>
          <li>tokenBalance: {tokenBalance.toString()}</li>
        </ul>
      </div>
      <div className="navbar-right">
        <ConnectButton />
      </div>
    </nav>
  );
}
