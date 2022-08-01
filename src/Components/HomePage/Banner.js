import React from "react";
import { EmojiTransportation, TrendingUp, LocalMall } from "@material-ui/icons";

import "../../css/HomePage/Banner.css";

export default function Banner() {
  return (
    <div className="banner-container">
      <h1>Market Size and Consumer Demograpic Data For</h1>
      <div className="features">
        <div className="feature">
          <EmojiTransportation
            style={{
              color: "#bd02c7",
              backgroundColor: "#b1eafa",
              borderRadius: "4px",
              fontSize: "60px",
            }}
          />
          <div className="text">
            <span className="number">12 Cities</span>
            <span className="sub">Divided Into Small Neighbourhoods.</span>
          </div>
        </div>
        <div className="feature">
          <TrendingUp
            style={{
              color: "#bd02c7",
              backgroundColor: "#b1eafa",
              fontSize: "60px",
              borderRadius: "4px",
            }}
          />
          <div className="text">
            <span className="number">50+</span>
            <span className="sub">Retail Categories Market Size.</span>
          </div>
        </div>
        <div className="feature">
          <LocalMall
            style={{
              color: "#bd02c7",
              backgroundColor: "#b1eafa",
              fontSize: "60px",
              borderRadius: "4px",
            }}
          />
          <div className="text">
            <span className="number">70+</span>
            <span className="sub">Mall Catchments.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
