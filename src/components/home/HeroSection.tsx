import { getStats } from "@/data/stats";
import { formatMoney } from "@/lib/utils/format";
import styles from "./HeroSection.module.css";

export function HeroSection() {
  const stats = getStats();

  return (
    <section className={styles.hero}>
        <div className={styles.content}>
          <h1 className={styles.headline}>
            The Indian AI Graveyard
          </h1>
          <p className={styles.subtitle}>
            A definitive record of why Indian founders struggle with artificial intelligence. 
            Tracing the billions lost and the startups that didn't make it.
          </p>

        <div className={styles.statsRibbon}>
          <div className={styles.stat}>
            <span className={styles.statValue}>{stats.totalStartups}</span>
            <span className={styles.statLabel}>Startups</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statValue}>{formatMoney(stats.totalCapitalLost)}</span>
            <span className={styles.statLabel}>Capital Lost</span>
          </div>
        </div>
      </div>
    </section>
  );
}
