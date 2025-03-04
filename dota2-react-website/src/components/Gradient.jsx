const Gradient = () => {
  let color;
  let orientation = "180deg";
  let green = "#008000";
  let blue = "#1E90FF";
  let red = "#7C0A02";
  return <div className="gradient"></div>;
};

/**
 * Function to update the hero section color based on the hero's primary attribute.
 * @param {Promise} newHero - A promise that resolves to a random hero object from the Stratz API.
 */
function changeHeroSectionColor(newHero) {
  let color;
  let orientation = "180deg";
  let green = "#008000";
  let blue = "#091279";
  let red = "#7C0A02";
  newHero.then((data) => {
    switch (data.stat.heroPrimaryAttribute) {
      case 0: // Strength
        color = red;
        break;
      case 1: // Universal
        color = green;
        break;
      case 2: // Intelligence
        color = blue;
        break;
      case 3: // Agility
        heroSection.style.backgroundImage =
          getCssValuePrefix() +
          "linear-gradient(" +
          orientation +
          ", " +
          red +
          ", " +
          blue +
          ", " +
          green +
          ")";
        break;
    }
    heroSection.style.background = color;

    // Setting the gradient with the proper prefix
  });
}

/**
 * function to get the appropriate CSS linear-gradient prefix for the current browser.
 * @returns {string} - The appropriate CSS linear-gradient prefix for the current browser.
 */
function getCssValuePrefix() {
  var rtrnVal = ""; //default to standard syntax
  var prefixes = ["-o-", "-ms-", "-moz-", "-webkit-"];

  // Create a temporary DOM object for testing
  var dom = document.createElement("div");

  for (var i = 0; i < prefixes.length; i++) {
    // Attempt to set the style
    dom.style.background = prefixes[i] + "linear-gradient(#000000, #ffffff)";

    // Detect if the style was successfully set
    if (dom.style.background) {
      rtrnVal = prefixes[i];
    }
  }

  dom = null;
  delete dom;

  return rtrnVal;
}
