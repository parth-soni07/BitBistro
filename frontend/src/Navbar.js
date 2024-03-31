import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";

export default function Navbar(params) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="logo">FreLanCircle</h1>
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
        </ul>
      </div>
      <div className="navbar-right">
        <ConnectButton />
      </div>
    </nav>
  );
}
