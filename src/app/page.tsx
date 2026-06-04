import { HeroSection } from "@/components/home/HeroSection";
import { InsightsDashboard } from "@/components/home/InsightsDashboard";
import { FeaturedGrid } from "@/components/home/FeaturedGrid";
import { LatestFeed } from "@/components/home/LatestFeed";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.home}>
      <HeroSection />
      <InsightsDashboard />
      <FeaturedGrid />
      <LatestFeed />
      
      {/* Newsletter CTA Placeholder */}
      <section className={styles.newsletterSection}>
        <div className={styles.newsletterContainer}>
          <div className="callout">
            <h2 className={styles.newsletterTitle}>Get Post-Mortems in Your Inbox</h2>
            <p className={styles.newsletterDesc}>
              Join 10,000+ founders and investors reading our weekly analysis of startup failures. 
              Learn from their mistakes so you don't repeat them.
            </p>
            <div className={styles.newsletterForm}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className={styles.input}
                disabled
              />
              <button className="btn" disabled>Subscribe (Coming Soon)</button>
            </div>
            <p className={styles.newsletterNote}>Newsletter functionality is currently being built.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
