import { Startup } from "@/types/database";
import { formatMoney } from "@/lib/utils/format";
import Link from "next/link";
import styles from "./StartupHero.module.css";

interface Props {
  startup: Startup;
}

export function StartupHero({ startup }: Props) {
  return (
    <div className={styles.hero}>
      <nav className={styles.breadcrumbs}>
        <Link href="/" className={styles.crumb}>Home</Link>
        <span className={styles.divider}>/</span>
        <Link href="/startups" className={styles.crumb}>Archive</Link>
        <span className={styles.divider}>/</span>
        <span className={styles.current}>{startup.name}</span>
      </nav>

      <div className={styles.headerGroup}>
        <h1 className={styles.name}>{startup.name}</h1>
        <p className={styles.epitaph}>"{startup.one_line_epitaph}"</p>
      </div>

      <div className={styles.metaBar}>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Founded</span>
          <span className={styles.metaValue}>{startup.founded_year || "Unknown"}</span>
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Died</span>
          <span className={styles.metaValue}>{startup.shut_down_year || "Unknown"}</span>
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Raised</span>
          <span className="money">{formatMoney(startup.total_raised_usd)}</span>
        </div>
        <div className={styles.metaItem}>
          <span className="badge">{startup.primary_category}</span>
        </div>
      </div>

      {startup.founder_quote && (
        <blockquote className={styles.quote}>
          <p className={styles.quoteText}>"{startup.founder_quote}"</p>
          <footer className={styles.quoteAuthor}>— Founder Quote</footer>
        </blockquote>
      )}
    </div>
  );
}
