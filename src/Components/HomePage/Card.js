import React, { Component } from "react";
import { Link } from "react-router-dom";
import Arrow from "@material-ui/icons/ArrowForward";

class Card extends Component {
  render() {
    return (
      <Link
        className="link-card"
        to={`/${this.props.link}`}
        style={{ minHeight: "none" }}
      >
        {!this.props.imgOnRight && (
          <img className="card-image" src={this.props.img}></img>
        )}
        <div>
          <div className="cardLine"></div>
          <div className={this.props.headingClass}>
            <h3>{this.props.heading}</h3>
          </div>
          <div className="cardBody">
            <p className="product-description">{this.props.body}</p>
            <a className="product-link">{this.props.linkText}</a>
            <Arrow className="link-arrow" />
          </div>
        </div>
        {this.props.imgOnRight && (
          <img className="card-image" src={this.props.img}></img>
        )}
      </Link>
    );
  }
}

export default Card;
