import React from "react";

import "../../css/HomePage/howtovid.css";

export default function HowToVideo() {
  return (
    <div className="howtovid">
      <h3 className="mb-3 text-white">
        Watch How To Take Full Advantage of the Website.
      </h3>
      <iframe
        className="vid"
        src="https://www.youtube.com/embed/ahy5o5nT4oI"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
        title="video"
        height="320"
        width="480"
      />
    </div>
  );
}
