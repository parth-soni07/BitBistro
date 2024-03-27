import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./css/App.css"; // Import CSS file for styling
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
import RaiseIssue from "./RaiseIssue";

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
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <div className="container">
            <nav className="navbar">
              <div className="navbar-left">
                <h1 className="logo">FreLanCircle</h1>
                <ul className="nav-links">
                  <li>
                    <a href="#">Home</a>
                  </li>
                  <li>
                    <a href="#"> Issues </a>
                  </li>
                  <li>
                    <a href="#">Contact</a>
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
            <RaiseIssue />
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default HomePage;
