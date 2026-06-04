import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStartupBySlug, getPublishedStartups } from "@/data/startups";
import { StartupHero } from "@/components/startup/StartupHero";
import { PostMortem } from "@/components/startup/PostMortem";
import { StartupMeta } from "@/components/startup/StartupMeta";
import { FailureReasons } from "@/components/startup/FailureReasons";
import styles from "./page.module.css";

// Generate static routes for all published startups
export function generateStaticParams() {
  const startups = getPublishedStartups();
  return startups.map((startup) => ({
    slug: startup.slug,
  }));
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const slug = (await params).slug;
  const startup = getStartupBySlug(slug);
  
  if (!startup) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: `${startup.name} Post-Mortem`,
    description: startup.one_line_summary || undefined,
    openGraph: {
      title: `${startup.name} Post-Mortem | Startup Graveyard`,
      description: startup.one_line_summary || undefined,
      type: "article",
      publishedTime: startup.published_at || undefined,
      authors: ["Startup Graveyard"],
    },
  };
}

export default async function StartupPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const startup = getStartupBySlug(slug);

  if (!startup) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <StartupHero startup={startup} />
      
      <div className={styles.layout}>
        <main className={styles.mainContent}>
          {startup.post_mortem_text && (
            <PostMortem text={startup.post_mortem_text} />
          )}
          
          {startup.counterintuitive_lesson && (
            <div className="callout">
              <h3 className={styles.lessonTitle}>Counterintuitive Lesson</h3>
              <p className={styles.lessonText}>{startup.counterintuitive_lesson}</p>
            </div>
          )}

          {startup.source_urls && startup.source_urls.length > 0 && (
            <div className={styles.sources}>
              <h3 className={styles.sourcesTitle}>Sources & Further Reading</h3>
              <ul className={styles.sourcesList}>
                {startup.source_urls.map((url, i) => (
                  <li key={i}>
                    <a href={url} target="_blank" rel="noopener noreferrer" className={styles.sourceLink}>
                      {new URL(url).hostname} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </main>
        
        <aside className={styles.sidebar}>
          <StartupMeta startup={startup} />
          <FailureReasons startup={startup} />
        </aside>
      </div>
    </div>
  );
}
