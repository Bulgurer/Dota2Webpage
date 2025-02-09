const buttonNewHero = document.querySelector('#button-new-hero');
const heroImage = document.querySelector('#hero-image');
buttonNewHero.onclick = pickNewHero;

function pickNewHero() {
    heroImage.src = "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/axe.png";
}