import React from "react";
import {Link} from "react-router-dom";
import PageSurface from "../pageSurface/PageSurface";
import "./ArchiveYearPage.scss";

export default function ArchiveYearPage({
  pageKey,
  eyebrow,
  title,
  subtitle,
  backHref,
  backLabel,
  isLoading = false,
  loadingMessage = "Loading...",
  emptyMessage = "",
  hasItems = false,
  children
}) {
  return (
    <PageSurface
      pageKey={pageKey}
      className={`page-container archive-year-page archive-year-page--${pageKey}`}
    >
      <section className="archive-year-page__hero">
        {eyebrow && <p className="archive-year-page__eyebrow">{eyebrow}</p>}
        <h1 className="archive-year-page__title">{title}</h1>
        {subtitle && <p className="archive-year-page__subtitle">{subtitle}</p>}
        <Link to={backHref} className="archive-year-page__back">
          {backLabel}
        </Link>
      </section>

      {isLoading ? (
        <div className="archive-year-page__empty">
          <p>{loadingMessage}</p>
        </div>
      ) : !hasItems ? (
        <div className="archive-year-page__empty">
          <p>{emptyMessage}</p>
        </div>
      ) : (
        children
      )}
    </PageSurface>
  );
}
