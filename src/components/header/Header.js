import React, {useContext} from "react";
import {Link} from "react-router-dom";
import Headroom from "react-headroom";
import "./Header.scss";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import StyleContext from "../../contexts/StyleContext";
import AuthContext from "../../contexts/AuthContext";
import {
  greeting,
  gameDevSection,
  videoPortfolioSection,
  photographySection
} from "../../portfolio";
import {writingShowcaseSection} from "../../containers/writingShowcase/WritingShowcase";

function Header() {
  const {isDark} = useContext(StyleContext);
  const {isLoggedIn, isOwner} = useContext(AuthContext);

  const viewGameDev = gameDevSection.display;
  const viewVideoPortfolio = videoPortfolioSection.display;
  const viewPhotography = photographySection.display;
  const viewWriting = writingShowcaseSection.display;

  return (
    <Headroom>
      <header className={isDark ? "dark-menu header" : "header"}>
        <Link to="/" className="logo">
          <span className="grey-color"> &lt;</span>
          <span className="logo-name">{greeting.username}</span>
          <span className="grey-color">/&gt;</span>
        </Link>
        <input className="menu-btn" type="checkbox" id="menu-btn" />
        <label
          className="menu-icon"
          htmlFor="menu-btn"
          style={{color: "white"}}
        >
          <span className={isDark ? "navicon navicon-dark" : "navicon"}></span>
        </label>
        <ul className={isDark ? "dark-menu menu" : "menu"}>
          <li>
            <Link to="/">Home</Link>
          </li>
          {viewGameDev && (
            <li>
              <Link to="/game-dev">Game Dev</Link>
            </li>
          )}
          {viewVideoPortfolio && (
            <li>
              <Link to="/videos">Videos</Link>
            </li>
          )}
          {viewPhotography && (
            <li>
              <Link to="/photos">Photography</Link>
            </li>
          )}
          {viewWriting && (
            <li>
              <Link to="/writing">Writing</Link>
            </li>
          )}
          {isOwner && (
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/community">Community</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/favorites">Favorites</Link>
            </li>
          )}
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <ToggleSwitch />
          </li>
        </ul>
      </header>
    </Headroom>
  );
}

export default Header;
