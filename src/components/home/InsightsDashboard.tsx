import { getStats, getIndianStats } from "@/data/stats";
import { formatMoney } from "@/lib/utils/format";
import styles from "./InsightsDashboard.module.css";

export function InsightsDashboard() {
  const stats = getStats();
  const indianStats = getIndianStats();
  
  if (!stats) return null;

  return (
    <section className={styles.section} aria-label="Indian AI Insights">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>INDIAN MARKET INSIGHTS</h2>
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
                {indianStats.averageLifespan} <span className={styles.cardUnit}>years</span>
              </div>
              <p className={styles.cardDescription}>Average time from founding to shutdown for Indian AI startups.</p>
            </div>
            
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardLabel}>Indian Capital Vaporized</span>
              </div>
              <div className={styles.cardValue}>
                {formatMoney(indianStats.totalCapitalLost)}
              </div>
              <p className={styles.cardDescription}>Sum of all known funding raised by tracked failed Indian startups.</p>
            </div>
            
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardLabel}>Deadliest Indian AI Domains</span>
              </div>
              <ul className={styles.list} style={{ marginTop: 'var(--space-md)' }}>
                {indianStats.topDomains.length > 0 ? (
                  indianStats.topDomains.map((domain, i) => (
                    <li key={i} className={styles.listItem}>
                      <span className={styles.listName}>{domain.category}</span>
                      <span className={styles.listCount}>{formatMoney(domain.capital)} lost</span>
                    </li>
                  ))
                ) : (
                  <li className={styles.listItem}>
                    <span className={styles.listName}>No domain data populated yet.</span>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Top Reasons and 2026 Casualties */}
          <div className={styles.listsContainer}>
            <div className={styles.listCard}>
              <h3 className={styles.listTitle}>Top Reasons Indian Startups Fail</h3>
              <ul className={styles.list}>
                {indianStats.topReasons.length > 0 ? (
                  indianStats.topReasons.map((item, i) => (
                    <li key={i} className={styles.listItem}>
                      <span className={styles.listName}>{item.reason}</span>
                      <span className={styles.listCount}>{item.count} startups</span>
                    </li>
                  ))
                ) : (
                  <li className={styles.listItem}>
                    <span className={styles.listName}>No failure reason data yet.</span>
                  </li>
                )}
              </ul>
            </div>

            <div className={styles.listCard}>
              <h3 className={styles.listTitle}>Class of 2026: Recent Casualties</h3>
              <ul className={styles.list}>
                {indianStats.casualties2026.length > 0 ? (
                  indianStats.casualties2026.map((startup, i) => (
                    <li key={i} className={styles.listItem}>
                      <span className={styles.listName}>{startup.name}</span>
                      <span className={styles.listCount}>{startup.reason || 'Unknown'}</span>
                    </li>
                  ))
                ) : (
                  <li className={styles.listItem}>
                    <span className={styles.listName}>No 2026 Indian casualties recorded yet.</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
