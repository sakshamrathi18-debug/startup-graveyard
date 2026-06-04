import Link from "next/link";
import styles from "./page.module.css";

export const metadata = {
  title: "Newsletter | Startup Graveyard",
  description: "Subscribe to our weekly analysis of startup failures.",
};

export default function NewsletterPage() {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.title}>The Autopsy Report</h1>
        <p className={styles.subtitle}>
          Every week, we break down one notable AI startup failure, dissecting the business model, the technical challenges, and the unit economics to find the real cause of death.
        </p>

        <div className={styles.formWrapper}>
          <div className="callout">
            <h2 className={styles.formTitle}>Subscribe to the Graveyard</h2>
            <div className={styles.form}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className={styles.input}
                disabled
              />
              <button className="btn" disabled>Subscribe (Coming Soon)</button>
            </div>
            <p className={styles.note}>Newsletter functionality is currently being built.</p>
          </div>
        </div>
      </div>

      <div className={styles.features}>
        <div className={styles.feature}>
          <h3 className={styles.featureTitle}>Deep Financial Analysis</h3>
          <p className={styles.featureDesc}>We look past the press releases to examine the unit economics and burn rates that actually killed the company.</p>
        </div>
        <div className={styles.feature}>
          <h3 className={styles.featureTitle}>Pattern Recognition</h3>
          <p className={styles.featureDesc}>See how failures cluster across industries and technologies to avoid making the same mistakes.</p>
        </div>
        <div className={styles.feature}>
          <h3 className={styles.featureTitle}>Zero Hype</h3>
          <p className={styles.featureDesc}>In an industry obsessed with the future, we take a sober look at the past. No VC fluff, just facts.</p>
        </div>
      </div>
    </div>
  );
}
