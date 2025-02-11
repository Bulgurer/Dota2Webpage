
const STRATZ_API_KEY = CONFIG.STRATZ_API_KEY; // Temporary solution to access the API key from config.js

const buttonNewHero = document.querySelector('#button-new-hero');
const heroImage = document.querySelector('#hero-image');
const heroName = document.querySelector('#hero-name');
const heroDescription = document.querySelector('#hero-description');
const heroSection = document.querySelector('#hero-section');

buttonNewHero.onclick = pickNewHero;

const stratz = 'https://api.stratz.com/api/v1/Hero';
const stratzHeaders = new Headers({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + STRATZ_API_KEY,
    UserAgent: 'STRATZ_API'
});

const cloudflare = 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/';


function pickNewHero() {
    let newHero = getNewHeroStratz();
    console.log(newHero);
    changeHeroImage(newHero);
    changeHeroName(newHero);
    changeHeroDescription(newHero);
    changeHeroSectionColor(newHero);
}

function getNewHeroStratz() {
    return fetch(stratz, {headers: stratzHeaders})
                    .then(response => response.json())
                    .then((data) => {
                        keys = Object.keys(data);
                        return data[keys[Math.floor(Math.random() * (keys.length - 2)) + 1]]}) // +1 to avoid the first key which is a null hero and -2 to avoid the last key which is a dummy hero.
                    .catch(error => console.log(error));
                }

function changeHeroImage(newHero) {
    newHero.then(data => {
        heroImage.src = cloudflare + data.shortName + '.png';
    });
}

function changeHeroName(newHero) {
    newHero.then(data => {
        heroName.textContent = data.displayName;
    });
}

function changeHeroDescription(newHero) {
    newHero.then(data => {
        heroDescription.innerHTML = data.language.hype.replace(/<b>|<\/b>/g, '');
    });
}

function changeHeroSectionColor(newHero) {
    let color;
    let orientation = '180deg';
    let green = '#008000';
    let blue = '#1E90FF';
    let red = '#7C0A02';
    newHero.then(data => {
        switch(data.stat.heroPrimaryAttribute) {
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
                heroSection.style.backgroundImage = getCssValuePrefix() + 'linear-gradient('
                + orientation + ', ' + red + ', ' + blue + ', ' + green + ')';
                break;
            
        }
        heroSection.style.background = color;
        
        // Setting the gradient with the proper prefix
        
    });
}

function getCssValuePrefix()
{
    var rtrnVal = '';//default to standard syntax
    var prefixes = ['-o-', '-ms-', '-moz-', '-webkit-'];

    // Create a temporary DOM object for testing
    var dom = document.createElement('div');

    for (var i = 0; i < prefixes.length; i++)
    {
        // Attempt to set the style
        dom.style.background = prefixes[i] + 'linear-gradient(#000000, #ffffff)';

        // Detect if the style was successfully set
        if (dom.style.background)
        {
            rtrnVal = prefixes[i];
        }
    }

    dom = null;
    delete dom;

    return rtrnVal;
}
