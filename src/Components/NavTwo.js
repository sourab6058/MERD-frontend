import React from "react";
import { Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import "../css/Navbar.css";

export default function NavTwo() {
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
          <a id="subscribe" className="menu-item" href="">
            Subscribe
          </a>
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
          <a href="_blank">Subscribe</a>
        </li>
        <li>
          <a href="_blank">FAQ</a>
        </li>
        <li>
          <a href="_blank">Retail Articles</a>
        </li>
        <li>
          <a href="_blank">Contact Us</a>
        </li>
      </ul>
      {/* <a className="sign-in-links" href="_blank">
        Sign Up
      </a> */}
      <a className="sign-in-links" href="_blank">
        Sign In
      </a>
    </nav>
  );
}
