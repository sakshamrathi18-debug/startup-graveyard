import Link from "next/link";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.topRule} />
      <div className={styles.container}>
        <div className={styles.masthead}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoText}>STARTUP GRAVEYARD</span>
          </Link>
          <p className={styles.tagline}>Independent Analysis on the Collapse of AI Ventures</p>
        </div>
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="/startups" className={styles.navLink}>Archive</Link>
          <Link href="/patterns" className={styles.navLink}>Patterns</Link>
          <Link href="/submit" className={styles.navLink}>Submit</Link>
          <Link href="/about" className={styles.navLink}>About</Link>
        </nav>
      </div>
      <div className={styles.bottomRule} />
    </header>
  );
}
