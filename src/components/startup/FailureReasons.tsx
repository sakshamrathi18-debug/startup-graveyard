import { Startup } from "@/types/database";
import { formatFailureReason } from "@/lib/utils/format";
import styles from "./FailureReasons.module.css";

interface Props {
  startup: Startup;
}

export function FailureReasons({ startup }: Props) {
  if (!startup.failure_reasons || startup.failure_reasons.length === 0) return null;

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>CAUSES OF DEATH</h3>
      <div className={styles.rule} />
      
      <div className={styles.reasonsList}>
        {startup.failure_reasons.map((reason) => {
          const isPrimary = reason === startup.primary_failure_reason;
          return (
            <div key={reason} className={styles.reasonItem}>
              <span className={`badge ${isPrimary ? 'badge-red' : ''}`}>
                {formatFailureReason(reason)}
                {isPrimary && " (Primary)"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
