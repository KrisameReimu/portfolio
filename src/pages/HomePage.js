import React from "react";
import HomeSummary from "../containers/homeSummary/HomeSummary";
import ManuscriptHero from "../containers/manuscriptHero/ManuscriptHero";
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
