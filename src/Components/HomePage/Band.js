import React, { Component } from "react";
import axios from "axios";
import Aos from "aos";

import "aos/dist/aos.css";

import "../../css/HomePage/Band.css";

const DOWNLOAD_URL = "http://3.108.159.143:8000/brochurepdf/";

class Band extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    Aos.init({ duration: 1000 });
    this.setState({ scrolledPast: true });
  }

  downloadBlob = (blob, name) => {
    // Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
    const blobUrl = URL.createObjectURL(blob);

    // Create a link element
    const link = document.createElement("a");

    // Set link's href to point to the Blob URL
    console.log(blobUrl);
    link.href = blobUrl;
    link.download = name;

    // Append link to the body
    document.body.appendChild(link);

    // Dispatch click event on the link
    // This is necessary as link.click() does not work on the latest firefox
    link.dispatchEvent(
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      })
    );

    // Remove link from body
    document.body.removeChild(link);
  };

  downloadBrochure = () => {
    axios
      .get(DOWNLOAD_URL, {
        responseType: "blob",
      })
      .then((res) => {
        console.log(res);
        this.downloadBlob(res.data, "brochure.pdf");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="band" ref={this.props.bandRef}>
        <span className="services">
          Our Services
        </span>
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
        <span onClick={this.downloadBrochure} className="serviceslink">
          Download Our Brochure
        </span>
      </div>
    );
  }
}

export default Band;
