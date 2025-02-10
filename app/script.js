const buttonNewHero = document.querySelector('#button-new-hero');
const heroImage = document.querySelector('#hero-image');
const heroName = document.querySelector('#hero-name');
buttonNewHero.onclick = pickNewHero;

function pickNewHero() {
    let newHero = getNewHero();
    console.log(newHero);
    changeHeroImage(newHero);
    changeHeroName(newHero);
}

function getNewHero() {
    return fetch('https://api.opendota.com/api/heroes')
                    .then(response => response.json())
                    .then(data => {
                        return data[Math.floor(Math.random() * data.length)]});
}

function changeHeroImage(newHero) {
    newHero.then(data => {
        heroImage.src = `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${data.name.replace('npc_dota_hero_', '')}.png`;
    });
}

function changeHeroName(newHero) {
    newHero.then(data => {
        heroName.textContent = data.localized_name;
    })
}