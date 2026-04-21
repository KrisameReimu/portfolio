import React, {useContext, useEffect, useState} from "react";
import {Link, NavLink, useLocation} from "react-router-dom";
import Headroom from "react-headroom";
import "./Header.scss";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import StyleContext from "../../contexts/StyleContext";
import {greeting} from "../../portfolio";
import {primaryNavRoutes} from "../../config/routes";

function Header() {
  const {isDark} = useContext(StyleContext);
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

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
          {primaryNavRoutes.map(route => (
            <li key={route.path}>
              <NavLink to={route.path} end={route.path === "/"}>
                {route.navLabel}
              </NavLink>
            </li>
          ))}
          <li>
            <ToggleSwitch />
          </li>
        </ul>
      </header>
    </Headroom>
  );
}

export default Header;
