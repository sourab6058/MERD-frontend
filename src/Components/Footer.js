import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  LinkedIn,
  Twitter,
  YouTube,
  Instagram,
} from "@material-ui/icons";

import getUserDetail from "../utils/getUserDetail";

import "../css/Footer.css";

const dotStyle = {
  fontSize: "1rem",
  color: "#A1A1A1",
};

const Footer = () => {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const user = getUserDetail();
    setUser(user.username);
  });

  function handleLogout() {
    document.cookie =
      " user-details" + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    window.location.href = "https://merd.online/logout/";
  }
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="merd-logo-container">
          <Link to="/" className="merd-logo">
            <span className="merd-name ">Middle east retail data</span>
            <span className="merd-moto">
              accurate.instant.detailed.affordable
            </span>
          </Link>
        </div>

        <ul className="footer-links">
          <div className="footer-links-container">
            <li>
              <div className="footer-link-div">
                <Link to="/" className="footer-link-title">Products/Services</Link>
                <Link to="/demographic" className="footer-link">Demographic Information</Link>
                <Link to="/dashboard" className="footer-link">Detailed Market Size</Link>
                <Link to="/catchments" className="footer-link">Catchment Analysis</Link>
                <Link to="/cityreport" className="footer-link">City Reports</Link>
                <Link to="/touristreport" className="footer-link">Tourist Reports</Link>
              </div>
            </li>

            <li>
              <div className="footer-link-div">
                <span className="footer-link-title">Company</span>
                <Link to="/" className="footer-link">About</Link>
                <Link to='/faq' className="footer-link">FAQ</Link>

              </div>
            </li>
            <li>
              <div className="footer-link-div">
                <span className="footer-link-title">Users</span>
                {user ? (
                  <>
                    <Link className="footer-link" to="subscribe-more">
                      Subscribe More
                    </Link>
                    <a className="footer-link" onClick={handleLogout}>
                      Log Out
                    </a>
                  </>
                ) : (
                  <>
                    <a
                      className="footer-link"
                      href="https://merd.online/login/"
                    >
                      Sign In
                    </a>
                    <Link className="footer-link" to="subscribe">
                      Subscribe
                    </Link>
                  </>
                )}
              </div>
            </li>
            <li>
              <div className="footer-link-div">
                <span className="footer-link-title">Policies</span>
                <Link className="footer-link">Privacy</Link>
                <Link className="footer-link">Cookie</Link>
                <Link className="footer-link">Terms Of Use</Link>
              </div>
            </li>
          </div>
        </ul>
        <ul>
          <div className="social-media-div">
            <li>
              <Link className="sm-container">
                <LinkedIn />
              </Link>
            </li>
            <li>
              <Link className="sm-container">
                <Twitter />
              </Link>
            </li>
          </div>
        </ul>
      </div>
      <hr className="footer-hr" />
      <span className="rights">
        All rights reserved 2022 (MIDDLE EAST RETAIL DATA)
      </span>
    </div>
  );
};

export default Footer;
