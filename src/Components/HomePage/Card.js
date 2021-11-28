import React, { Component } from "react";
import { Link } from "react-router-dom";

import Aos from "aos";

import "aos/dist/aos.css";

class Card extends Component {
  componentDidMount = () => {
    Aos.init({ duration: 1000 });
  };

  render() {
    return (
      <Link
        className="card"
        style={{ minHeight: "auto" }}
        data-aos={this.props.imgOnRight ? "fade-right" : "fade-left"}
        to={`/${this.props.link}`}
      >
        {!this.props.imgOnRight && (
          <img
            src={this.props.imgSrc}
            style={{ padding: 0, width: "500px", height: "auto" }}
          ></img>
        )}
        <div>
          <div className="cardLine"></div>
          <div className={this.props.headingClass}>
            <h3>{this.props.heading}</h3>
          </div>
          <div className="cardBody">
            <p>{this.props.body}</p>
          </div>
        </div>
        {this.props.imgOnRight && (
          <img
            src={this.props.imgSrc}
            style={{ padding: 0, width: "500px", height: "auto" }}
          ></img>
        )}
      </Link>
    );
  }
}

export default Card;
