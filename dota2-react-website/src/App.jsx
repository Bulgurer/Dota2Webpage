import { useState, useEffect } from "react";
import "./App.css";
import HeroSection from "./components/HeroSection.jsx";

import env from "react-dotenv";
import SkillBuild from "./components/SkillBuild.jsx";

export default function App() {
  const [allHeroIds, setAllHeroIds] = useState([]);

  useEffect(() => {
    fetch("https://api.stratz.com/graphql", {
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
              id
            }
          }
        }`,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        let heroes = data.data.constants.heroes;
        let heroIds = heroes.map((hero) => hero.id);
        console.log(heroIds);
        setAllHeroIds(heroIds); // for some reason the hero ids jump around in value, array.length - 1 is NOT the same as the highest ID
      })
      .catch((error) => console.log(error));
  }, []);

  const [currentHero, setCurrentHero] = useState({
    id: null, // Default hero id
    image: "https://img.icons8.com/color/512/dota.png", // Default hero image
    name: "Dota 2", // Default hero name
    description: "Click the 'New hero' button to get started!", // Default hero description
    attribute: "DEF", // Default hero attribute
  });
  const [history, setHistory] = useState([currentHero]);

  function handleClick() {
    let newHeroId =
      allHeroIds[Math.floor(Math.random() * (allHeroIds.length - 1))];
    console.log("-".repeat(100));
    let newHeroPromise = getNewHeroStratz(newHeroId);
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
      <div id="build" className="centeredHorizontal">
        <SkillBuild />
      </div>
    </main>
  );
}

function getNewHeroStratz(newHeroId) {
  console.log("The new Hero ID is: " + newHeroId);
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
          hero(id:${newHeroId}){
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
      console.log(data.data.constants.hero);
      return data.data.constants.hero;
    })
    .catch((error) => console.log(error));
}
