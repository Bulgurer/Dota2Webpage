import "./App.css";
import HeroSection from "./components/HeroSection.jsx";

export default function App() {
  const defaultHeroImage =
    "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/antimage.png";
  const defaultHeroName = "Anti-Mage";
  const defaultHeroDescription = "I am Antimage. I am the solution.";
  return (
    <main id="main">
      <header>
        <h1 id="title" className="centered">
          Dota 2 Hero Viewer
        </h1>
      </header>
      <HeroSection
        image={defaultHeroImage}
        name={defaultHeroName}
        description={defaultHeroDescription}
      />
    </main>
  );
}
