"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import styles from "../app/site.module.scss";
import {siteMeta} from "../lib/site";

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className={styles.siteHeader}>
      <div className={styles.shell}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.brand}>
            Echo Chen
          </Link>
          <nav className={styles.siteNav} aria-label="Primary">
            {siteMeta.navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${
                  pathname === item.href ? styles.navLinkActive : ""
                }`.trim()}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
