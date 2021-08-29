import React, { Component } from 'react';

class Nav extends Component {
    render() {

        let Logo = require('../img/logo.png');
        return (
            <div className="Nav">
                <div className="navbar">
                    <div className="logoContainer">
                        <img src={Logo} className="logoImg" alt="Logo of the company"/>
                    </div>


                    <ul className="navlinks">
                        <li className="activeLink"><a href="_blank">Home</a></li>
                        <li><a href="_blank">About Us</a></li>
                        <li><a href="/projects">Products</a></li>
                        <li><a href="/projects">Knowledge Centre</a></li>
                        <li><a href="_blank">Subscribe</a></li>
                        <li><a href="_blank">FAQ</a></li>
                        <li><a href="_blank">Terms & Conditions</a></li>
                    </ul>

                    <div className="navicons">
                        <a href="_blank"><span className="fa fa-search" aria-hidden="true"></span> </a>
                        <a href="_blank"><span className="fa fa-user" aria-hidden="true"></span> </a>
                    </div>
                </div>

                <ul className="mobileNavLinks">
                    <li className="activeLink"><a href="_blank">Home</a></li>
                    <li><a href="_blank">About Us</a></li>
                    <li><a href="/projects">Products</a></li>
                    <li><a href="/projects">Knowledge Centre</a></li>
                    <li><a href="_blank">Subscribe</a></li>
                    <li><a href="_blank">FAQ</a></li>
                    <li><a href="_blank">Terms & Conditions</a></li>
                </ul>

                <div className="login" id="login">
                    <a href="_blank" className="loginLinks">Sign up for our demo</a>
                    <a href="_blank" className="loginLinks">Sign up for our newsletter</a>
                </div>
            </div>
        );
    }
}

export default Nav;