import styles from "./page.module.css";

export const metadata = {
  title: "Submit a Startup | Startup Graveyard",
  description: "Submit a failed AI startup to the graveyard.",
};

export default function SubmitPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Submit to the Graveyard</h1>
        <p className={styles.subtitle}>
          Help us document the history of AI failures. We verify all submissions using public reporting.
        </p>
      </header>

      <div className={styles.content}>
        <div className="callout">
          <p>
            <strong>Note:</strong> We only accept submissions for real companies that raised significant capital or had significant cultural impact. We do not accept submissions for side projects or unlaunched ideas.
          </p>
        </div>

        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="name">Startup Name *</label>
            <input type="text" id="name" className={styles.input} required placeholder="e.g. Olive AI" disabled />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="url">Company URL (or Crunchbase)</label>
            <input type="url" id="url" className={styles.input} placeholder="https://..." disabled />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="year">Year Shut Down *</label>
            <input type="number" id="year" className={styles.input} required placeholder="e.g. 2024" disabled />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="reason">Primary Reason for Failure *</label>
            <select id="reason" className={styles.select} required disabled>
              <option value="">Select a reason...</option>
              <option value="unit-economics">Unit Economics</option>
              <option value="no-pmf">No Product-Market Fit</option>
              <option value="competition">Competition</option>
              <option value="burn-rate">Burn Rate / Runway</option>
              <option value="technical-failure">Technical Failure</option>
              <option value="regulatory">Regulatory Issues</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="source">Source Article URL *</label>
            <input type="url" id="source" className={styles.input} required placeholder="News article confirming shutdown" disabled />
            <p className={styles.helpText}>We need at least one credible public source (e.g. TechCrunch, Bloomberg, founder blog).</p>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="notes">Additional Context</label>
            <textarea id="notes" className={styles.textarea} rows={4} placeholder="What went wrong?" disabled></textarea>
          </div>

          <button type="button" className={`btn ${styles.submitBtn}`} disabled>
            Submit for Review (Coming Soon)
          </button>
        </form>
      </div>
    </div>
  );
}
