import React from "react";
import { Link } from "react-router-dom";
import Dot from "@material-ui/icons/FiberManualRecord";
import {
  Facebook,
  LinkedIn,
  Twitter,
  YouTube,
  Instagram,
} from "@material-ui/icons";

import "../css/Footer.css";

const dotStyle = {
  fontSize: "1rem",
  color: "#A1A1A1",
};

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="merd-logo-container">
        <Link to="/" className="merd-logo" >
        <span className="merd-name">Middle east retail data</span>
        <span className="merd-moto">accurate.instant.detailed.affordable</span>
      </Link>
        </div>
      
      
      <ul className="footer-links">
      <div className="footer-links-container">
        
        <li>
        <div className="footer-link-div">
          <span className="footer-link-title">Products/Services</span>
          <Link className="footer-link">Demographic Information</Link>
          <Link className="footer-link">Detailed Market Size</Link>
          <Link className="footer-link">Catchment Analysis</Link>
          <Link className="footer-link">City Reports</Link>
          <Link className="footer-link">Tourist Reports</Link>
          </div>
        </li>
        
        <li>
        <div className="footer-link-div">
        <span className="footer-link-title">Company</span>
          <Link className="footer-link">About</Link>
          <Link className="footer-link">FAQ</Link>
          <Link className="footer-link">Retail Articles</Link>
          </div>
        </li>
        <li>
        <div className="footer-link-div">
        <span className="footer-link-title">Users</span>
          <Link className="footer-link">Subscribe</Link>
          <Link className="footer-link">Sign In</Link>
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
      <hr className="footer-hr"/>
      <span className="rights">
        All rights reserved 2022 (MIDDLE EAST RETAIL DATA)
      </span>
      </div>
    
  );
};

export default Footer;
