import { getStats } from "@/data/stats";
import { formatMoney } from "@/lib/utils/format";
import styles from "./InsightsDashboard.module.css";

export function InsightsDashboard() {
  const stats = getStats();
  
  if (!stats) return null;

  return (
    <section className={styles.section} aria-label="Database Insights">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>GRAVEYARD INSIGHTS</h2>
          <div className={styles.headerRule} />
        </div>

        <div className={styles.grid}>
          {/* Overview Stats */}
          <div className={styles.overviewCards}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardLabel}>Average Lifespan</span>
              </div>
              <div className={styles.cardValue}>
                {stats.averageLifespan} <span className={styles.cardUnit}>years</span>
              </div>
              <p className={styles.cardDescription}>Average time from founding to shutdown.</p>
            </div>
            
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardLabel}>Total Capital Vaporized</span>
              </div>
              <div className={styles.cardValue}>
                {formatMoney(stats.totalCapitalLost)}
              </div>
              <p className={styles.cardDescription}>Sum of all known funding raised by tracked failed startups.</p>
            </div>
          </div>

          {/* Top Categories Lists */}
          <div className={styles.listsContainer}>
            <div className={styles.listCard}>
              <h3 className={styles.listTitle}>Highest Failure Rate by Category</h3>
              <ul className={styles.list}>
                {stats.topCategories.map((item, i) => (
                  <li key={i} className={styles.listItem}>
                    <span className={styles.listName}>{item.category}</span>
                    <span className={styles.listCount}>{item.count} shut down</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.listCard}>
              <h3 className={styles.listTitle}>Most Capital Lost by Category</h3>
              <ul className={styles.list}>
                {stats.capitalByCategory.map((item, i) => (
                  <li key={i} className={styles.listItem}>
                    <span className={styles.listName}>{item.category}</span>
                    <span className={styles.listCount}>{formatMoney(item.capital)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
