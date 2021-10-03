import React, { Component } from "react";
import Nav from "./Nav";
import NavTwo from "./NavTwo";
import Band from "./HomePage/Band";
import AboutUs from "./HomePage/AboutUs";
import Cards from "./HomePage/Cards";
import Footer from "./Footer";
import HeroMap from "./HomePage/HeroMap";
import Hero from "./HomePage/Hero";

class HomePage extends Component {
  render() {
    return (
      <div className="Mainclass">
        <NavTwo />
        <Hero />
        <Band />
        <Cards />
        <Footer />
      </div>
    );
  }
}

export default HomePage;
