import React, { Component } from "react";

import NavTwo from "./NavTwo";
import Band from "./HomePage/Band";
import Cards from "./HomePage/Cards";
import Footer from "./Footer";
import Hero from "./HomePage/Hero";
import Banner from "./HomePage/Banner";
import CookieDialog from "./CookieDialog";
import getUserDetail from "../utils/getUserDetail";

const SESSION_API = "https://merd.online/user-details/?sid=";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subscribed: false,
      cookieDialogOpen: false,
      acceptCookies: true,
    };
  }

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
      this.setState({ cookieDialogOpen: true });
      document.cookie = `user-details=${userDetails}`;
      this.setState({ subscribed: true });
      // window.history.replaceState({}, document.title, "/");
      if (localStorage.getItem("selectionsMade")) {
        window.location = "https://data.merd.online/dashboard";
      }
    } else {
      const user = getUserDetail();
      if (user.username) {
        this.setState({ subscribed: true, cookieDialogOpen: false });
      } else {
        const details = document.cookie;
        const cookieList = details.split(";");
        const reqdCookie = cookieList.find((cookie) =>
          cookie.includes("acceptCookies")
        );
        if (!reqdCookie) this.setState({ cookieDialogOpen: true });
      }
    }
  };
  handleCookies = (acceptCookies) => {
    this.setState({ acceptCookies, cookieDialogOpen: false });
    if (acceptCookies) {
      document.cookie = `acceptCookies=true`;
      console.log("Accept COOkies");
    }
  };

  render() {
    return (
      <div className="Mainclass">
        <CookieDialog
          open={this.state.cookieDialogOpen}
          handleClose={this.handleCookies}
        />
        <NavTwo />
        <Hero subscribed={this.state.subscribed} />
        <Banner />
        <Band bandRef={this.bandRef} />
        <Cards productsRef={this.productsRef} />
        <Footer />
      </div>
    );
  }
}

export default HomePage;
