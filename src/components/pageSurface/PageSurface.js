import React from "react";
import {getPageIdentity} from "../../config/pageIdentity";
import "./PageSurface.scss";

export default function PageSurface({pageKey, className = "", children}) {
  const identity = getPageIdentity(pageKey);
  const surfaceClassName = [identity.pageClassName, className]
    .filter(Boolean)
    .join(" ");

  return <div className={surfaceClassName}>{children}</div>;
}
