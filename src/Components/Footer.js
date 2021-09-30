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
      <Link to="/" className="merd-logo">
        <span className="merd-name">Middle east retail data</span>
        <span className="merd-moto">accurate.instant.detailed.affordable</span>
      </Link>
      <ul className="footer-links">
        <li>
          <Link className="footer-link">Contact Us</Link>
          <Dot style={dotStyle}></Dot>
        </li>
        <li>
          <Link className="footer-link">FAQ</Link>
          <Dot style={dotStyle}></Dot>
        </li>
        <li>
          <Link className="footer-link">Privacy Policy</Link>
          <Dot style={dotStyle}></Dot>
        </li>
        <li>
          <Link className="footer-link">Cookie Policy</Link>
          <Dot style={dotStyle}></Dot>
        </li>
        <li>
          <Link className="footer-link">Terms of use</Link>
        </li>
      </ul>
      <ul className="social-media-links">
        <li>
          <Link className="sm-container">
            <Facebook />
          </Link>
        </li>
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
        <li>
          <Link className="sm-container">
            <YouTube />
          </Link>
        </li>
        <li>
          <Link className="sm-container">
            <Instagram />
          </Link>
        </li>
      </ul>
      <span className="rights">
        All rights reserved 2021 (MIDDLE EAST RETAIL DATA)
      </span>
    </div>
  );
};

export default Footer;
