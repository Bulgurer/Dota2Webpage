export default function HeroSection({
  image = "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/antimage.png",
  name = "AM",
  description = "dasfmaf",
}) {
  return (
    <section id="hero-section" className="centered">
      <img id="hero-image" src={image} alt="Hero Image" />
      <h2 id="hero-name" className="text-white">
        {name}
      </h2>
      <p id="hero-description" className="text-white">
        {description}
      </p>
      <button id="button-new-hero" className="btn">
        New hero
      </button>
    </section>
  );
}
