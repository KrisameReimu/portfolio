import Link from "next/link";
import styles from "../app/site.module.scss";
import {siteMeta} from "../lib/site";

export default function SiteHeader() {
  return (
    <header className={styles.siteHeader}>
      <div className={styles.shell}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.brand}>
            Echo Chen
          </Link>
          <nav className={styles.siteNav} aria-label="Primary">
            {siteMeta.navItems.map(item => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
