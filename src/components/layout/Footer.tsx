import Link from "next/link";
import styles from "./Footer.module.css";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.topRule} />
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <h3 className={styles.brandName}>STARTUP GRAVEYARD</h3>
            <p className={styles.brandDesc}>
              Documenting the deaths of AI startups so the next generation doesn&apos;t repeat them.
            </p>
          </div>

          <div className={styles.links}>
            <h4 className={styles.linksTitle}>Navigate</h4>
            <Link href="/" className={styles.link}>Home</Link>
            <Link href="/startups" className={styles.link}>Archive</Link>
            <Link href="/patterns" className={styles.link}>Patterns</Link>
            <Link href="/submit" className={styles.link}>Submit a Startup</Link>
            <Link href="/about" className={styles.link}>About</Link>
          </div>

          <div className={styles.links}>
            <h4 className={styles.linksTitle}>Resources</h4>
            <Link href="/newsletter" className={styles.link}>Newsletter</Link>
            <Link href="/about" className={styles.link}>Methodology</Link>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} Startup Graveyard. Built with public data from credible sources.
          </p>
          <p className={styles.disclaimer}>
            All data sourced from public reporting — TechCrunch, Bloomberg, The Verge, Crunchbase, and founder statements.
          </p>
        </div>
      </div>
    </footer>
  );
}
