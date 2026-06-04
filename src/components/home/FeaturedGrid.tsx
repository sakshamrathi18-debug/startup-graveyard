import Link from "next/link";
import { getFeaturedStartups } from "@/data/startups";
import { formatMoney } from "@/lib/utils/format";
import { CompanyLogo } from "@/components/ui/CompanyLogo";
import styles from "./FeaturedGrid.module.css";

export function FeaturedGrid() {
  const featured = getFeaturedStartups();
  
  if (featured.length === 0) return null;

  const leadStory = featured[0];
  const otherStories = featured.slice(1, 4); // Take up to 3 more

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.sectionTitle}>FEATURED POST-MORTEMS</h2>
          <div className={styles.headerRule} />
        </header>

        <div className={styles.grid}>
          {/* Lead Story - spans full width or majority on desktop */}
          <Link href={`/startups/${leadStory.slug}`} className={styles.leadCard}>
            <div className={styles.leadContent}>
              <div className={styles.cardHeader}>
                <span className="badge badge-red">{leadStory.primary_category}</span>
                <span className={styles.metaData}>
                  Died {leadStory.shut_down_year} · <span className="money">{formatMoney(leadStory.total_raised_usd)}</span> raised
                </span>
              </div>
              <h3 className={styles.leadTitle}>{leadStory.name}</h3>
              <p className={styles.leadEpitaph}>"{leadStory.one_line_epitaph}"</p>
              <p className={styles.leadSummary}>{leadStory.one_line_summary}</p>
            </div>
            <div className={styles.leadImage}>
               <CompanyLogo name={leadStory.name} slug={leadStory.slug} size="large" />
            </div>
          </Link>

          {/* Secondary Stories - 3 column grid below */}
          <div className={styles.secondaryGrid}>
            {otherStories.map((startup) => (
              <Link key={startup.id} href={`/startups/${startup.slug}`} className={styles.secondaryCard}>
                <div className={styles.secondaryLogo}>
                   <CompanyLogo name={startup.name} slug={startup.slug} size="small" />
                </div>
                <div className={styles.cardHeader}>
                  <span className="badge">{startup.primary_category}</span>
                </div>
                <h3 className={styles.secondaryTitle}>{startup.name}</h3>
                <p className={styles.secondaryEpitaph}>{startup.one_line_epitaph}</p>
                <div className={styles.secondaryMeta}>
                  {startup.shut_down_year} · <span className="money">{formatMoney(startup.total_raised_usd)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
