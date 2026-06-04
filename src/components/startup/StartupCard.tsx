import Link from "next/link";
import { Startup } from "@/types/database";
import { formatMoney } from "@/lib/utils/format";
import styles from "./StartupCard.module.css";

interface Props {
  startup: Startup;
}

export function StartupCard({ startup }: Props) {
  return (
    <Link href={`/startups/${startup.slug}`} className={styles.card}>
      <div className={styles.header}>
        <span className="badge">{startup.primary_category}</span>
        <span className={styles.year}>{startup.shut_down_year || "Unknown"}</span>
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.name}>{startup.name}</h3>
        <p className={styles.epitaph}>"{startup.one_line_epitaph}"</p>
      </div>
      
      <div className={styles.footer}>
        <div className={styles.meta}>
          <span className={styles.label}>Raised</span>
          <span className="money">{formatMoney(startup.total_raised_usd)}</span>
        </div>
        <div className={styles.meta}>
          <span className={styles.label}>Region</span>
          <span className={styles.value}>{startup.region}</span>
        </div>
      </div>
    </Link>
  );
}
