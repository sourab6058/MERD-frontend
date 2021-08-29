import React from "react";
import Carousel from "react-material-ui-carousel";
const facts = [
  "Hello.",
  "How are you.",
  "Can I help you.",
  "Do you know.",
  "These are not random facts.",
  "Nothing makes sense.",
];

export default function FactsLoader() {
  return (
    <div>
      <Carousel
        interval={1000}
        timeout={100}
        animation="slide"
        swipe={false}
        indicators={false}
        navButtonsAlwaysInvisible={true}
        stopAutoPlayOnHover={false}
      >
        {facts.map((fact) => (
          <h3 style={{ color: "white" }}>{fact}</h3>
        ))}
      </Carousel>
    </div>
  );
}
