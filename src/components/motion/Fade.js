import React from "react";

/**
 * Lightweight drop-in replacement for react-reveal/Fade.
 * The old library triggers deprecated lifecycle warnings in React strict mode.
 * For now we keep the tree shape stable and can reintroduce motion later
 * through a modern implementation if needed.
 */
export function Fade({children}) {
  return <>{children}</>;
}

export default Fade;
