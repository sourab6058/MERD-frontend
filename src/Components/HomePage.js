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

const SESSION_API = "https://hosting.digifyworks.com/merd/user-details/?sid=";

class HomePage extends Component {
  state = {
    dialogOpen: true,
  };
  handleClose = () => {
    this.setState({ dialogOpen: false });
  };
  componentDidMount = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const sid = queryParams.get("sid");
    if (sid) {
      console.log(sid);
      fetch(SESSION_API + sid, {
        mode: "no-cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.error(err));
    } else {
      console.log("No Params");
    }
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
