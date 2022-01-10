import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { slide as BurgerMenu } from "react-burger-menu";

import getUserDetail from "../utils/getUserDetail";

import "../css/Navbar.css";
import { Button, Dropdown, Menu } from "antd";

export default function NavTwo({ scrollToBand, scrollToProducts }) {
  const [username, setUsername] = useState();
  useEffect(() => {
    const userDetails = localStorage.getItem("user-details");
    if (userDetails) {
      const user = getUserDetail(userDetails);
      setUsername(user.username);
    }
  });
  function handleLogout() {
    localStorage.removeItem("user-details");
    window.location.href = " https://merd.online/logout/";
  }
  const usermenu = (
    <Menu>
      <Menu.Item>
        <a rel="noopener noreferrer" href="https://merd.online/">
          View Account
        </a>
      </Menu.Item>
      <Menu.Item>
        <Link to="/subscribe-more">Subscribe More</Link>
      </Menu.Item>
      <Menu.Item>
        <a rel="noopener noreferrer" onClick={handleLogout}>
          Log Out
        </a>
      </Menu.Item>
    </Menu>
  );
  return (
    <nav className="nav-container">
      <div className="bgm">
        <BurgerMenu>
          <a id="about" className="menu-item">
            About
          </a>
          <a id="products" className="menu-item">
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
        </BurgerMenu>
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
          <a onClick={scrollToBand}>About</a>
        </li>
        <li>
          <a onClick={scrollToProducts}>Products</a>
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
        <a className="sign-in-links" href="https://merd.online/login/">
          Sign In
        </a>
      ) : (
        <Dropdown
          overlay={usermenu}
          placement="bottomLeft"
          className="sign-in-links"
        >
          <Button className="sign-in-links">
            {username.length > 11 ? username.substring(0, 11) : username}
          </Button>
        </Dropdown>
      )}
    </nav>
  );
}
