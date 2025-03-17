import { useState, useEffect } from "react";
import "./App.css";
import HeroSection from "./components/HeroSection.jsx";

import env from "react-dotenv";
import SkillBuild from "./components/SkillBuild.jsx";

const DEBUG_MODE = true; //  use for when you want the button to only ever return a specific hero.
const DEBUG_HERO_ID = 96; // the id of the hero you want to debug

export default function App() {
  const [IDButtonClicked, setIDButtonClicked] = useState(0); // 0 is the default, if a button is given the identifier of 0 it will be ignored
  useEffect(() => {
    if (IDButtonClicked) {
      handleClick();
    }
  }, [IDButtonClicked, setIDButtonClicked]);
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
        setAllHeroIds(heroIds); // for some reason the hero ids jump around in value, array.length - 1 is NOT the same as the highest ID
      })
      .catch((error) => console.log(error));
  }, []);

  const [currentHero, setCurrentHero] = useState({
    id: 0, // Default hero id
    image: "https://img.icons8.com/color/512/dota.png", // Default hero image
    name: "Dota 2", // Default hero name
    description: "Click the 'New hero' button to get started!", // Default hero description
    attribute: "DEF", // Default hero attribute
    abilitiesInfo: null, // Default info on hero abilities (slot, ability)
  });
  const [history, setHistory] = useState([currentHero]);
  // if (DEBUG_MODE) {

  //   let newHero = setNewHero(
  //     DEBUG_HERO_ID,
  //     allHeroIds.findIndex((element) => element === DEBUG_HERO_ID)
  //   );
  //   setCurrentHero(newHero); // Set new hero as current hero
  // }

  function handleClick() {
    let newHeroIDIndex;
    switch (IDButtonClicked) {
      case 1: //Previous Hero Button
        if (currentHero.idIndex === 0) {
          newHeroIDIndex = allHeroIds.length - 1;
        } //if at start of list, loop around to end of list
        else newHeroIDIndex = currentHero.idIndex - 1; // previous index
        break;
      case 2: //Random Hero Button
        newHeroIDIndex = Math.floor(Math.random() * (allHeroIds.length - 1)); // Select random index in list
        break;
      case 3: //Next Hero Button
        if (currentHero.idIndex === allHeroIds.length - 1) {
          newHeroIDIndex = 0;
        } //if at end of list, loop around to start of list
        else newHeroIDIndex = currentHero.idIndex + 1; // next index
        break;
    }
    setIDButtonClicked(0); //Resetting the id of the button clicked so that the buttons actually work
    let newHeroID = allHeroIds[newHeroIDIndex];
    console.log("-".repeat(100));
    let newHero = setNewHero(newHeroID, newHeroIDIndex);
    newHero.then((data) => {
      setHistory([...history, data]); //Add new hero to history
      setCurrentHero(data); // Set new hero as current hero
    });
  }

  return (
    <main id="main" className="centeredVertical">
      <header>
        <h1 id="title">Dota 2 Hero Viewer</h1>
      </header>
      <div id="hero-sections">
        <HeroSection
          currentHero={currentHero}
          onButtonClick={setIDButtonClicked}
          inDebugMode={DEBUG_MODE}
        />
      </div>
      <div id="build" className="centeredHorizontal">
        <SkillBuild abilitiesInfo={currentHero.abilitiesInfo} />
      </div>
    </main>
  );
}

function setNewHero(newHeroID, newHeroIDIndex) {
  let newHeroPromise = getNewHeroStratz(newHeroID);
  console.log("newHeroID: " + newHeroID);
  console.log("newHeroIDIndex: " + newHeroIDIndex);
  return newHeroPromise.then((data) => {
    let newImage =
      window.env.REACT_APP_HERO_IMAGES_URL + data.shortName + ".png"; // New hero image
    let newName = data.displayName; // New hero name
    let newDescription = data.language.hype.replace(/<b>|<\/b>/g, ""); // New hero description
    let newAttribute = data.stats.primaryAttributeEnum; // New hero attribute
    let newAbilitiesInfo = data.abilities; // New hero abilities
    let newHero = {
      // New hero object
      id: newHeroID,
      idIndex: newHeroIDIndex,
      image: newImage,
      name: newName,
      description: newDescription,
      attribute: newAttribute,
      abilitiesInfo: newAbilitiesInfo,
    };
    return newHero;
  });
}

function getNewHeroStratz(newHeroId) {
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
            abilities{
              slot
              ability {
                id
                language{
                  attributes
                }
                name
                stat{
                  isInnate
                  isGrantedByShard
                  isGrantedByScepter
                }
              }
            }
          }
        }
      }`,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data.data.constants.hero;
    })
    .catch((error) => console.log(error));
}
