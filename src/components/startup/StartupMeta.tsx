import { Startup } from "@/types/database";
import { formatMoney } from "@/lib/utils/format";
import styles from "./StartupMeta.module.css";

interface Props {
  startup: Startup;
}

export function StartupMeta({ startup }: Props) {
  return (
    <aside className={styles.sidebar}>
      <h3 className={styles.title}>FACT SHEET</h3>
      <div className={styles.rule} />

      <div className={styles.table}>
        <div className={styles.row}>
          <span className={styles.label}>Death Type</span>
          <span className={styles.value}>{startup.death_type}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Business Model</span>
          <span className={styles.value}>{startup.business_model}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>HQ</span>
          <span className={styles.value}>{startup.hq_city}, {startup.hq_country_code}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Region</span>
          <span className={styles.value}>{startup.region}</span>
        </div>
        
        <div className={styles.divider} />
        
        <div className={styles.row}>
          <span className={styles.label}>Founded</span>
          <span className={styles.valueNum}>{startup.founded_year || "Unknown"}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Shut Down</span>
          <span className={styles.valueNum}>{startup.shut_down_year || "Unknown"}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Last Stage</span>
          <span className={styles.value}>{startup.last_stage}</span>
        </div>
        
        <div className={styles.divider} />
        
        <div className={styles.row}>
          <span className={styles.label}>Total Raised</span>
          <span className={`${styles.valueNum} money`}>{formatMoney(startup.total_raised_usd)}</span>
        </div>
      </div>

      {startup.pattern_tags && startup.pattern_tags.length > 0 && (
        <div className={styles.tagsSection}>
          <h4 className={styles.tagsTitle}>Associated Patterns</h4>
          <div className={styles.tags}>
            {startup.pattern_tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
