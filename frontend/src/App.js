import React, { useState, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import "./css/App.css"; // Import CSS file for styling
import SubmitWorks from "./submitProject";
import Issues from "./RaiseIssue";
import Vote from "./Vote";
import SignBid from "./SignBid";
import PreviousProjects from "./PreviousProjects";
import "@rainbow-me/rainbowkit/styles.css";
import {
  RainbowKitProvider,
  getDefaultConfig,
  Button, // Import Rainbow Kit Button component
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { sepolia } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import RecentlyPosted from "./RecentlyPosted";
import ProjectForm from "./projectForm";
import HireForm from "./hireForm";


const Botanix = {
  id: 3636,
  name: "Botanix",
  iconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
  iconBackground: "#fff",
  nativeCurrency: { name: "Botanix", symbol: "BTC", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://node.botanixlabs.dev/"] },
  },
  blockExplorers: {
    default: { name: "Botanix", url: "https://blockscout.botanixlabs.dev/" },
  },
};

const queryClient = new QueryClient();

const config = getDefaultConfig({
  appName: "BitGigs",
  projectId: "b85ade4fb7f47c87f0e8a969594cfda0",
  chains: [sepolia, Botanix],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const HomePage = () => {
  return (
    <div>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <div className="container">
                    <nav className="navbar">
                      <div className="navbar-left">
                        <h1 className="logo">FreLanCircle</h1>
                        <ul className="nav-links">
                          <li>
                            <Link to="/">Home</Link> {/* Path for Home page */}
                          </li>
                          <li>
                            <Link to="/issues">Issues</Link>{" "}
                            {/* Path for Issues page */}
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
                            <Link to="/vote">Vote</Link>{" "}
                            {/* Path for Submit Work page */}
                          </li>
                        </ul>
                      </div>
                      <div className="navbar-right">
                        <ConnectButton />
                      </div>
                    </nav>

                    <div className="main-content">
                      <div className="left-section">
                        <HireForm />
                      </div>
                      <div className="right-section">
                        <ProjectForm />
                      </div>
                    </div>
                    <RecentlyPosted />
                  </div>
                }
              />
              <Route exact path="/submit-work" element={<SubmitWorks />} />
              <Route exact path="/issues" element={<Issues />} />
              <Route
                exact
                path="posted-projects"
                element={<PreviousProjects />}
              />
              <Route exact path="/vote" element={<Vote />} />
              <Route exact path="/sign-work" element={<SignBid />} />
            </Routes>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </div>
  );
};

export default HomePage;
