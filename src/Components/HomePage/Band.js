import React, { Component } from "react";
import Aos from "aos";

import "aos/dist/aos.css"

import "../../css/HomePage/Band.css";

class Band extends Component {
  state={
    scrolledPast:false,
  }
  componentDidMount(){
    Aos.init({duration:1000,});
    this.setState({scrolledPast:true});
  }
  render() {
    return (
      <div data-aos="fade-up" className="band">
        <span data-aos="fade-left" className="services">Our Services</span>
        <p className="serviceshead">
          In a world of Big Data and bigger platforms to analyze such data, the
          Middle East is still in a relatively nascent stage of evolution when
          it comes to data availability. Add to that the region is nothing short
          of a melting pot of cultures, nationalities and hence behavior,
          understanding retail metrics is sacrosanct to the success of any brand
          out there, or looking to enter the market.{" "}
        </p>
        <p className="serviceshead2">
          Middle East Retail Data is the platform for accurate, instant,
          detailed and affordable retail and consumer data.{" "}
        </p>
        <a href="_blank">
          <h3 className="serviceslink">DOWNLOAD OUR BROCHURE</h3>
        </a>
      </div>
    );
  }
}

export default Band;
