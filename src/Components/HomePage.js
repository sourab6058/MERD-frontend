import React, { Component } from "react";

import NavTwo from "./NavTwo";
import Band from "./HomePage/Band";
import Cards from "./HomePage/Cards";
import Footer from "./Footer";
import Hero from "./HomePage/Hero";
import CookieDialog from "./CookieDialog";

const SESSION_API = "https://merd.online/user-details/?sid=";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.bandRef = React.createRef();
    this.productsRef = React.createRef();
    this.state = {
      subscribed: false,
    };
  }

  scrollToBand = () => {
    this.bandRef.current.scrollIntoView();
  };
  scrollToProducts = () => {
    this.productsRef.current.scrollIntoView();
  };

  componentDidMount = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const sid = queryParams.get("sid");
    let userDetails = queryParams.get("sub_str");
    if (sid) {
      console.log(sid);
      const link = document.createElement("a");
      link.href = SESSION_API + sid;
      link.click();
    } else if (userDetails) {
      document.cookie = `user-details=${userDetails}`;
      this.setState({ subscribed: true });
      window.history.pushState("homepage", "homepage", "#");
    } else {
      console.log("No Params");
    }
  };
  render() {
    return (
      <div className="Mainclass">
        <NavTwo
          scrollToBand={this.scrollToBand}
          scrollToProducts={this.scrollToProducts}
        />
        <Hero subscribed={this.state.subscribed} />
        <Band bandRef={this.bandRef} />
        <Cards  productsRef={this.productsRef} />
        <Footer />
      </div>
    );
  }
}

export default HomePage;
