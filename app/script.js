const buttonNewHero = document.querySelector('#button-new-hero');
const heroImage = document.querySelector('#hero-image');
buttonNewHero.onclick = pickNewHero;

function pickNewHero() {
    changeHeroImage();
    changeHeroName()
}

function changeHeroImage() {
    fetch('https://api.opendota.com/api/heroes')
        .then(response => response.json())
        .then(data => {
            const randomHero = data[Math.floor(Math.random() * data.length)];
            heroImage.src = `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${randomHero.name.replace('npc_dota_hero_', '')}.png`;
            console.log("🚀 ~ pickNewHero ~ data:", data);
        });
}