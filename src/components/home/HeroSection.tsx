import { getStats } from "@/data/stats";
import { formatMoney } from "@/lib/utils/format";
import styles from "./HeroSection.module.css";

export function HeroSection() {
  const stats = getStats();

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.headline}>
          The Definitive Record of Failed AI Startups.
        </h1>
        <p className={styles.subtitle}>
          An investigative archive tracking the collapse of ambitious AI ventures—analyzing the missteps, the billions lost in capital, and the cautionary lessons left behind.
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
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statValue}>{stats.countryCount}</span>
            <span className={styles.statLabel}>Countries</span>
          </div>
        </div>
      </div>
    </section>
  );
}
