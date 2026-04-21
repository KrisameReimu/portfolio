import React from "react";
import HomeSummary from "../sections/homeSummary/HomeSummary";
import ManuscriptHero from "../sections/manuscriptHero/ManuscriptHero";
import "./HomePage.scss";

export default function HomePage() {
  return (
    <div className="home-page">
      <ManuscriptHero />
      <div className="home-page-content">
        <HomeSummary />
      </div>
    </div>
  );
}
