import React, { Component } from "react";
import { Link } from "react-router-dom";
import Arrow from "@material-ui/icons/ArrowForward";

class Card extends Component {
  render() {
    return (
      <div className="relative">
        <Link to={`/${this.props.link}`}
          style={{ minHeight: "none" }} className="link-card  " id={`Products-${this.props.link}`}>

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
              <Link

                to={`/${this.props.link}`}
                style={{ minHeight: "none" }}
              >
                <a className="product-link">{this.props.linkText}</a>
              </Link>

              <Arrow className="link-arrow" />
            </div>
          </div>
          {this.props.imgOnRight && (
            <img className="card-image" src={this.props.img}></img>
          )}
        </Link>
        {
          this.props.seeMore == "none" ? "" :
            this.props.imgOnRight ?
            <div className=" top-2/3 z-20 absolute">
            <a
              className="product-link flex gap-3"
              href={`#Products-${this.props.seeMore}`}
            // onClick={() => window.location.replace(`/${this.props.link}`)}
            >See More
              <i class="fa-solid fa-arrow-down self-center"></i>
            </a>
          </div> : 
          <div className=" top-2/3 z-20 left-1/2 absolute">
            <a
              className="product-link flex gap-3"
              href={`#Products-${this.props.seeMore}`}
            // onClick={() => window.location.replace(`/${this.props.link}`)}
            >See More
              <i class="fa-solid fa-arrow-down self-center"></i>
            </a>
          </div>
             
        }
      </div>
    );
  }
}

export default Card;
