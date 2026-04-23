import React from "react";
import {Link} from "react-router-dom";
import "./Button.scss";

export default function Button({text, className, href, newTab}) {
  const isHashRoute =
    typeof href === "string" && (href.startsWith("#") || href.includes("#"));
  const isInternalRoute =
    typeof href === "string" && href.startsWith("/") && !newTab && !isHashRoute;

  return (
    <div className={className}>
      {isInternalRoute ? (
        <Link className="main-button" to={href}>
          {text}
        </Link>
      ) : (
        <a
          className="main-button"
          href={href}
          target={newTab ? "_blank" : undefined}
          rel={newTab ? "noreferrer" : undefined}
        >
          {text}
        </a>
      )}
    </div>
  );
}
