import React, {useContext, useEffect, useState} from "react";
import {Link, NavLink, useLocation} from "react-router-dom";
import Headroom from "react-headroom";
import "./Header.scss";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import StyleContext from "../../contexts/StyleContext";
import {greeting, gameDevSection, videoPortfolioSection} from "../../portfolio";

function Header() {
  const {isDark} = useContext(StyleContext);
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const viewGameDev = gameDevSection.display;
  const viewVideoPortfolio = videoPortfolioSection.display;

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <Headroom>
      <header className={isDark ? "dark-menu header" : "header"}>
        <Link to="/" className="logo">
          <span className="grey-color"> &lt;</span>
          <span className="logo-name">{greeting.username}</span>
          <span className="grey-color">/&gt;</span>
        </Link>
        <button
          className="menu-icon"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          onClick={() => setMenuOpen(open => !open)}
        >
          <span className={isDark ? "navicon navicon-dark" : "navicon"}></span>
        </button>
        <ul
          id="primary-navigation"
          className={`${isDark ? "dark-menu " : ""}menu ${
            menuOpen ? "menu-open" : ""
          }`}
        >
          <li>
            <NavLink to="/" end>
              Home
            </NavLink>
          </li>
          {viewGameDev && (
            <li>
              <NavLink to="/game-dev">Projects</NavLink>
            </li>
          )}
          {viewVideoPortfolio && (
            <li>
              <NavLink to="/videos">Videos</NavLink>
            </li>
          )}
          <li>
            <NavLink to="/awards">Awards</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
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
