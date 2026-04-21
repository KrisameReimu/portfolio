export function openHeroTarget({
  target,
  navigate,
  currentPathname = window.location.pathname
}) {
  if (!target) return;

  if (/^https?:\/\//.test(target)) {
    window.open(target, "_blank", "noopener,noreferrer");
    return;
  }

  if (target.startsWith("#")) {
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({behavior: "smooth", block: "start"});
    }
    return;
  }

  if (target.startsWith("/")) {
    const [pathname, hash] = target.split("#");
    if (hash && pathname === currentPathname) {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({behavior: "smooth", block: "start"});
        return;
      }
    }

    navigate(target);
  }
}
