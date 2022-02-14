import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { slide as BurgerMenu } from "react-burger-menu";

import getUserDetail from "../utils/getUserDetail";

import "../css/Navbar.css";
import { Button, Dropdown, Menu } from "antd";

export default function NavTwo({ scrollToBand, scrollToProducts }) {
  const [username, setUsername] = useState();
  useEffect(() => {
    const user = getUserDetail();
    if (user.username) setUsername(user.username);
  });
  function handleLogout() {
    document.cookie =
      " user-details" + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    window.location.href = "https://merd.online/logout/";
  }
  const usermenu = (
    <Menu>
      <Menu.Item>
        <a rel="noopener noreferrer" href="https://merd.online/account/">
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
      <div className="bgm" >
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
          <Link id="faq" className="menu-item" to="/faq" >
            FAQ
          </Link>
          <Link id="cu" className="menu-item" to="/contactus">
            Contact Us
          </Link>
        </BurgerMenu>
      </div>
      
      <Link to="/" className="cmp-logo">
        <span className="cpm-name">middle east retail data</span>

        <span className="sub-text">ACCURATE.INSTANT.DETAILED.AFFORDABLE</span>
      </Link>
      <ul>
        <li>
          <a onClick={scrollToBand}>About</a>
        </li>
        <li>
          <Link onClick={scrollToProducts}>Products</Link>
        </li>
        <li>
          <Link to="/subscribe">Subscribe</Link>
        </li>
        <li>
          <Link to="/faq">FAQ</Link>
        </li>
        <li>
          <Link to="/contactus">Contact Us</Link>
        </li>
      </ul>
      {!username ? (
        <Button className="sign-in-links" href="https://merd.online/login/">
          Sign In
        </Button>
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
