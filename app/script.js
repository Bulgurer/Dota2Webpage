
const STRATZ_API_KEY = CONFIG.STRATZ_API_KEY; // Temporary solution to access the API key from config.js

const buttonNewHero = document.querySelector('#button-new-hero');
const heroImage = document.querySelector('#hero-image');
const heroName = document.querySelector('#hero-name');
const heroDescription = document.querySelector('#hero-description');

buttonNewHero.onclick = pickNewHero;

const stratz = 'https://api.stratz.com/api/v1/Hero';
const stratzHeaders = new Headers({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + STRATZ_API_KEY,
    UserAgent: 'STRATZ_API'
});

const openDota = 'https://api.opendota.com/api/heroes';

const cloudflare = 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/';


function pickNewHero() {
    let newHero = getNewHeroStratz();
    console.log(newHero);
    changeHeroImage(newHero);
    changeHeroName(newHero);
    changeHeroDescription(newHero);
}

function getNewHeroStratz() {
    return fetch(stratz, {headers: stratzHeaders})
                    .then(response => response.json())
                    .then((data) => {
                        keys = Object.keys(data);
                        return data[keys[Math.floor(Math.random() * (keys.length - 2)) + 1]]}) // +1 to avoid the first key which is a null hero and -2 to avoid the last key which is a dummy hero.
                    .catch(error => console.log(error));
                }

function getNewHero() {
    return fetch(openDota)
                    .then(response => response.json())
                    .then(data => data[Math.floor(Math.random() * data.length)]);
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