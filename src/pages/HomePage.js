import React from "react";
import Greeting from "../containers/greeting/Greeting";
import InteractiveFeatured from "../containers/interactiveFeatured/InteractiveFeatured";
import HomeSummary from "../containers/homeSummary/HomeSummary";
import "./HomePage.scss";

export default function HomePage() {
  return (
    <div className="home-page">
      <Greeting />
      <InteractiveFeatured />
      <HomeSummary />
    </div>
  );
}
