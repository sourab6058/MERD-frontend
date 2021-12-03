import React, { Component } from "react";
import Nav from "./Nav";
import NavTwo from "./NavTwo";
import Band from "./HomePage/Band";
import AboutUs from "./HomePage/AboutUs";
import Cards from "./HomePage/Cards";
import Footer from "./Footer";
import HeroMap from "./HomePage/HeroMap";
import Hero from "./HomePage/Hero";
import CookieDialog from "./CookieDialog";

class HomePage extends Component {
  state = {
    dialogOpen: true,
  };
  handleClose = () => {
    this.setState({ dialogOpen: false });
  };
  render() {
    return (
      <div className="Mainclass">
        {/* {this.state.dialogOpen && (
          <CookieDialog handleClose={this.handleClose} />
        )} */}
        <NavTwo />
        <Hero />
        <Cards />
        <Band />
        <Footer />
      </div>
    );
  }
}

export default HomePage;
