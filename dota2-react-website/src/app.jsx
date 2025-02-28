import "./app.css";
import HeroSection from "./components/heroSection.jsx";

export default function App() {
  return (
    <main id="main">
      <header>
        <h1 id="title" className="centered">
          Dota 2 Hero Viewer
        </h1>
      </header>
      <HeroSection />
    </main>
  );
}
