import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";

import getUserDetail from "../utils/getUserDetail";

import "../css/Navbar.css";

export default function NavTwo() {
  const [username, setUsername] = useState();
  useEffect(() => {
    const userDetails = localStorage.getItem("user-details");
    if (userDetails) {
      const user = getUserDetail(userDetails);
      setUsername(user.username);
    }
  });
  return (
    <nav className="nav-container">
      <div className="bgm">
        <Menu>
          <a id="about" className="menu-item" href="/">
            About
          </a>
          <a id="products" className="menu-item" href="">
            Products
          </a>
          <Link id="subscribe" className="menu-item" to="/subscribe">
            Subscribe
          </Link>
          <a id="faq" className="menu-item" href="">
            FAQ
          </a>
          <a id="ra" className="menu-item" href="">
            Retail Articles
          </a>
          <a id="cu" className="menu-item" href="">
            Contact Us
          </a>
        </Menu>
      </div>
      <Link to="/" className="cmp-logo">
        <span className="cpm-name">middle east retail data</span>
        <br />
        <span className="sub-text">
          ACCURATE. INSTANT. DETAILED. AFFORDABLE
        </span>
      </Link>
      <ul>
        <li>
          <a href="_blank">About</a>
        </li>
        <li>
          <a href="/projects">Products</a>
        </li>
        <li>
          <Link to="/subscribe">Subscribe</Link>
        </li>
        <li>
          <a href="_blank">FAQ</a>
        </li>
        <li>
          <a href="_blank">Retail Articles</a>
        </li>
        <li>
          <Link to="/contactus">Contact Us</Link>
        </li>
      </ul>
      {!username ? (
        <a
          className="sign-in-links"
          href="https://hosting.digifyworks.com/merd/login/?redirect_to=https%3A%2F%2Fhosting.digifyworks.com%2Fmerd%2F"
        >
          Sign In
        </a>
      ) : (
        <a
          className="sign-in-links"
          href="https://hosting.digifyworks.com/merd/"
        >
          {username}
        </a>
      )}
    </nav>
  );
}
