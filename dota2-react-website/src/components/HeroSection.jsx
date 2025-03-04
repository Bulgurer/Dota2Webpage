import { useState, useEffect } from "react";
import "./HeroSection.css";
import env from "react-dotenv";

export default function HeroSection({ image, name, description }) {
  const [currentHero, setCurrentHero] = useState({
    image: image,
    name: name,
    description: description,
    attribute: 1,
  });
  const [history, setHistory] = useState([currentHero]);
  const [colors, setColors] = useState({
    color3: "#7C0A02",
    color2: "#091279",
    color1: "#008000",
  });

  function handleClick() {
    console.log("New hero button clicked");
    let newHeroPromise = getNewHeroStratz();
    newHeroPromise.then((data) => {
      let newImage =
        window.env.REACT_APP_CLOUDFLARE_URL + data.shortName + ".png"; // New hero image
      let newName = data.displayName; // New hero name
      let newDescription = data.language.hype.replace(/<b>|<\/b>/g, ""); // New hero description
      let newAttribute = data.stat.heroPrimaryAttribute; // New hero attribute
      let newHero = {
        // New hero object
        image: newImage,
        name: newName,
        description: newDescription,
        attribute: newAttribute,
      };
      setHistory([...history, newHero]); //Add new hero to history
      setCurrentHero(newHero); // Set new hero as current hero
      handleColors(newHero.attribute); // Change hero section color
      console.log(currentHero);
      console.log(history);
    });
  }

  function handleColors(attribute) {
    let newColors;
    let green = "#008000";
    let blue = "#091279";
    let red = "#7C0A02";
    switch (attribute) {
      case 0: // Strength
        newColors = { color3: red, color2: red, color1: red };
        break;
      case 1: // Agility
        newColors = { color3: green, color2: green, color1: green };
        break;
      case 2: // Intelligence
        newColors = { color3: blue, color2: blue, color1: blue };
        break;
      case 3: // Universal
        newColors = { color3: green, color2: blue, color1: red };
        break;
    }
    setColors(newColors);
  }

  function getNewHeroStratz() {
    console.log(window.env.REACT_APP_STRATZ_HERO_URL);
    return fetch(window.env.REACT_APP_STRATZ_HERO_URL, {
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "Bearer " + window.env.REACT_APP_STRATZ_API_KEY,
        UserAgent: "STRATZ_API",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        let keys = Object.keys(data);
        return data[keys[Math.floor(Math.random() * (keys.length - 2)) + 1]];
      })
      .catch((error) => console.log(error));
  }

  return (
    <section
      id="hero-section"
      className="centered"
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
      <NewHeroButton onButtonClick={handleClick} />
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
