import React from "react";
import ManuscriptHero from "../sections/manuscriptHero/ManuscriptHero";
import HomeCuratedWorlds from "../sections/homeCuratedWorlds/HomeCuratedWorlds";
import "./HomePage.scss";

export default function HomePage() {
  return (
    <div className="home-page">
      <ManuscriptHero />
      <div className="home-page-content">
        <HomeCuratedWorlds />
      </div>
    </div>
  );
}
