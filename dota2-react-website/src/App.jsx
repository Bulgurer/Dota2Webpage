import { useState, useEffect } from "react";
import "./App.css";
import HeroSection from "./components/HeroSection.jsx";

import env from "react-dotenv";

export default function App() {
  const [currentHero, setCurrentHero] = useState({
    image: "https://img.icons8.com/color/512/dota.png", // Default hero image
    name: "Dota 2", // Default hero name
    description: "Click the 'New hero' button to get started!", // Default hero description
    attribute: "DEF", // Default hero attribute
  });
  const [history, setHistory] = useState([currentHero]);

  function handleClick() {
    console.log("New hero button clicked");
    let newHeroPromise = getNewHeroStratz();
    newHeroPromise.then((data) => {
      let newImage =
        window.env.REACT_APP_HERO_IMAGES_URL + data.shortName + ".png"; // New hero image
      let newName = data.displayName; // New hero name
      let newDescription = data.language.hype.replace(/<b>|<\/b>/g, ""); // New hero description
      let newAttribute = data.stats.primaryAttributeEnum; // New hero attribute
      let newHero = {
        // New hero object
        image: newImage,
        name: newName,
        description: newDescription,
        attribute: newAttribute,
      };
      setHistory([...history, newHero]); //Add new hero to history
      setCurrentHero(newHero); // Set new hero as current hero
      console.log(currentHero);
      console.log(history);
    });
  }

  return (
    <main id="main" className="centeredVertical">
      <header>
        <h1 id="title">Dota 2 Hero Viewer</h1>
      </header>
      <div id="hero-sections">
        <HeroSection currentHero={currentHero} onButtonClick={handleClick} />
      </div>
    </main>
  );
}

function getNewHeroStratz() {
  return fetch("https://api.stratz.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + window.env.REACT_APP_STRATZ_API_KEY,
      UserAgent: "STRATZ_API",
    },
    body: JSON.stringify({
      query: `{
        constants{
          heroes{
            displayName
            shortName
            language{
              hype
            }
            stats{
              primaryAttributeEnum
            }
          }
        }
      }`,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      let heroes = data.data.constants.heroes;
      return heroes[Math.floor(Math.random() * (heroes.length - 1))];
    })
    .catch((error) => console.log(error));
}
