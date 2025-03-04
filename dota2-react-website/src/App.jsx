import "./App.css";
import HeroSection from "./components/HeroSection.jsx";

export default function App() {
  const defaultHeroImage = "https://img.icons8.com/color/512/dota.png";
  const defaultHeroName = "Dota 2";
  const defaultHeroDescription = "Click the 'New hero' button to get started!";
  return (
    <main id="main" className="centeredVertical">
      <header>
        <h1 id="title">Dota 2 Hero Viewer</h1>
      </header>
      <div id="hero-sections">
        <HeroSection
          image={defaultHeroImage}
          name={defaultHeroName}
          description={defaultHeroDescription}
          attribute={-1}
        />
      </div>
    </main>
  );
}
