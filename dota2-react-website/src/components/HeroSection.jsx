import { useState, useEffect } from "react";
import "./HeroSection.css";

const Colors = Object.freeze({
  GREEN: "#008000",
  BLUE: "#091279",
  RED: "#7C0A02",
  WHITE: "#FFFFFF",
  BLACK: "#000000",
});

const Attributes = Object.freeze({
  DEF: "DEF", // Default
  STR: "STR", // Strength
  AGI: "AGI", // Agility
  INT: "INT", // Intelligence
  UNI: "ALL", // Universal
});

export default function HeroSection({ currentHero, onButtonClick }) {
  const [colors, setColors] = useState({
    color3: Colors.BLACK,
    color2: Colors.BLACK,
    color1: Colors.BLACK,
  });
  useEffect(() => {
    handleColors(currentHero.attribute);
  }, [currentHero.attribute]);

  function handleColors(attribute) {
    let newColors;
    switch (attribute) {
      case Attributes.DEF: // Default
        newColors = {
          color3: Colors.BLACK,
          color2: Colors.BLACK,
          color1: Colors.BLACK,
        };
        break;
      case Attributes.STR: // Strength
        newColors = {
          color3: Colors.RED,
          color2: Colors.RED,
          color1: Colors.RED,
        };
        break;
      case Attributes.AGI: // Agility
        newColors = {
          color3: Colors.GREEN,
          color2: Colors.GREEN,
          color1: Colors.GREEN,
        };
        break;
      case Attributes.INT: // Intelligence
        newColors = {
          color3: Colors.BLUE,
          color2: Colors.BLUE,
          color1: Colors.BLUE,
        };
        break;
      case Attributes.UNI: // Universal
        newColors = {
          color3: Colors.GREEN,
          color2: Colors.BLUE,
          color1: Colors.RED,
        };
        break;
    }
    setColors(newColors);
  }

  return (
    <section
      id="hero-section"
      className="centeColors.REDVertical"
      style={{
        background: `linear-gradient(
        ${"90deg"}, 
        ${colors.color1}, 
        ${colors.color2},  
        ${colors.color3})`,
      }}
    >
      <img id="hero-image" src={currentHero.image} alt="Hero Image" />
      <h2 id="hero-name" className="text-white">
        {currentHero.name}
      </h2>
      <p id="hero-description" className="text-white">
        {currentHero.description}
      </p>
      <NewHeroButton onButtonClick={onButtonClick} />
    </section>
  );
}

function NewHeroButton({ onButtonClick }) {
  return (
    <button id="button-new-hero" className="btn" onClick={onButtonClick}>
      New hero
    </button>
  );
}
