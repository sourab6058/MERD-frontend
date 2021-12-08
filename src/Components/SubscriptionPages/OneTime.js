import React, { useState } from "react";
import NavTwo from "../NavTwo";
import Footer from "../Footer";

import "../../css/SubscriptionPages/OneTime.css";

export default function OneTime() {
  const [email, setEmail] = useState("");
  return (
    <>
      <NavTwo />
      <div style={{ minHeight: "80vh" }} className="main">
        <div className="one-time-sub-form" align="center">
          We understand you do not want to subscribe. Kindly leave your email id
          and we will connect with you for a special, one-off offer.
          <div className="input-form">
            <input
              type="email"
              className="email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <span className="btn-white">Submit</span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
