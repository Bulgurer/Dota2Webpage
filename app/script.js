const buttonNewHero = document.querySelector('#button-new-hero');
const heroImage = document.querySelector('#hero-image');
buttonNewHero.onclick = pickNewHero;

function pickNewHero() {
    let newHero = getNewHero();
    console.log(newHero);
    changeHeroImage(newHero);
    //changeHeroName()
}

function getNewHero() {
    return fetch('https://api.opendota.com/api/heroes')
                    .then(response => response.json())
                    .then(data => {
                        return data[Math.floor(Math.random() * data.length)]});
}

function changeHeroImage(randomHero) {
    randomHero.then(data => {
        console.log(data);
        heroImage.src = `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${data.name.replace('npc_dota_hero_', '')}.png`;
    });
}