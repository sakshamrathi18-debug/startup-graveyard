import { patterns } from "@/data/patterns";
import Link from "next/link";
import { formatMoney } from "@/lib/utils/format";
import styles from "./page.module.css";

export const metadata = {
  title: "Failure Patterns | Startup Graveyard",
  description: "Identify the systemic patterns behind why AI startups fail.",
};

export default function PatternsPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Failure Patterns</h1>
        <p className={styles.subtitle}>
          History doesn't repeat itself, but it rhymes. Here are the systemic patterns we've identified across {patterns.length} major failure clusters.
        </p>
      </header>

      <div className={styles.grid}>
        {patterns.map((pattern) => (
          <div key={pattern.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.clusterName}>{pattern.cluster_name}</h2>
              <span className={styles.meta}>
                {pattern.startup_count} Startups · <span className="money">{formatMoney(pattern.total_capital_lost_usd)}</span> Lost
              </span>
            </div>

            <p className={styles.desc}>{pattern.description}</p>

            <div className={styles.lessons}>
              <h3 className={styles.lessonsTitle}>Key Lessons</h3>
              <ul className={styles.lessonsList}>
                {pattern.key_lessons.map((lesson, idx) => (
                  <li key={idx} className={styles.lessonItem}>{lesson}</li>
                ))}
              </ul>
            </div>

            <div className={styles.tags}>
              {pattern.top_pattern_tags.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>

            {/* In a fuller implementation, this would link to a filtered archive page */}
            <div className={styles.footer}>
              <Link href={`/startups?search=${encodeURIComponent(pattern.cluster_name)}`} className="btn">
                View Related Startups →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
