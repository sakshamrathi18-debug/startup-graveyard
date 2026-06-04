import styles from "./page.module.css";
import { getStats } from "@/data/stats";
import { formatMoney } from "@/lib/utils/format";

export const metadata = {
  title: "About | Startup Graveyard",
  description: "The methodology behind the Startup Graveyard.",
};

export default function AboutPage() {
  const stats = getStats();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>About the Graveyard</h1>
        <p className={styles.subtitle}>
          Documenting the deaths of AI startups so the next generation doesn't repeat them.
        </p>
      </header>

      <main className={styles.content}>
        <div className="prose">
          <p className={styles.lead}>
            The AI industry is obsessed with the future, but it has a terrible memory. 
            We built the Startup Graveyard because failure is a more rigorous teacher than success.
          </p>

          <div className={styles.statsBox}>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Current Body Count</span>
              <span className={styles.statValue}>{stats.totalStartups}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Total Capital Lost</span>
              <span className="money">{formatMoney(stats.totalCapitalLost)}</span>
            </div>
          </div>

          <h2>Why We Built This</h2>
          <p>
            When an AI startup raises a massive round, it makes headlines. When that same startup 
            quietly shuts down two years later, it barely makes a ripple. This survivorship bias 
            creates a distorted view of the market, where founders and investors repeat the same 
            mistakes because the failures are swept under the rug.
          </p>
          <p>
            The Graveyard is an attempt to balance the ledger. By performing public post-mortems 
            on failed AI companies, we hope to extract the counterintuitive lessons that can only 
            be learned when things go wrong.
          </p>

          <h2>Our Methodology</h2>
          <p>
            We only list real startups that had significant funding, traction, or cultural impact. 
            We do not include side projects, unlaunched ideas, or "vaporware" that never had a 
            chance to begin with.
          </p>
          <p>
            All of our data is sourced from public reporting. We rely on credible tech journalism 
            (TechCrunch, Bloomberg, The Verge), financial databases (Crunchbase, PitchBook), and 
            statements directly from the founders. We do not use speculative or unverified rumors.
          </p>

          <h2>The Team</h2>
          <p>
            We are a small team of researchers, developers, and AI optimists who believe that the 
            best way to build the future is to honestly examine the past.
          </p>
        </div>
      </main>
    </div>
  );
}
