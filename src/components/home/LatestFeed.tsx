import Link from "next/link";
import { getPublishedStartups } from "@/data/startups";
import { formatMoney } from "@/lib/utils/format";
import styles from "./LatestFeed.module.css";

export function LatestFeed() {
  // Get all startups, sort by shut_down_year descending
  const allStartups = getPublishedStartups().sort((a, b) => {
    // If year is null, put it at the end
    if (!a.shut_down_year) return 1;
    if (!b.shut_down_year) return -1;
    return b.shut_down_year - a.shut_down_year;
  });

  // Only show first 8 on the homepage feed
  const displayStartups = allStartups.slice(0, 8);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.sectionTitle}>THE GRAVEYARD ARCHIVE</h2>
          <div className={styles.headerRule} />
        </header>

        <div className={styles.feedList}>
          {displayStartups.map((startup) => (
            <Link key={startup.id} href={`/startups/${startup.slug}`} className={styles.feedRow}>
              <div className={styles.yearCol}>
                {startup.shut_down_year || "Unknown"}
              </div>
              <div className={styles.mainCol}>
                <h3 className={styles.startupName}>{startup.name}</h3>
                <p className={styles.summary}>{startup.one_line_summary}</p>
              </div>
              <div className={styles.categoryCol}>
                <span className="badge">{startup.primary_category}</span>
              </div>
              <div className={styles.moneyCol}>
                <span className="money">{formatMoney(startup.total_raised_usd)}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className={styles.viewAll}>
          <Link href="/startups" className="btn">
            Browse Full Archive ({allStartups.length} entries) →
          </Link>
        </div>
      </div>
    </section>
  );
}
