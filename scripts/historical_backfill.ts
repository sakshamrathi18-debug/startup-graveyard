import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
// We'll also add a bunch of historical ones here programmatically

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, '../graveyard.db');
const db = new Database(dbPath);

// Some additional historical data to bulk up the database
const historicalAdditions = [
  {
    id: crypto.randomUUID(),
    name: 'Kite',
    slug: 'kite',
    one_line_epitaph: 'The AI coding assistant that flew too close to the sun.',
    one_line_summary: 'Kite built an AI-powered code completion tool but failed to monetize before running out of capital.',
    founded_year: 2014,
    shut_down_year: 2022,
    total_raised_usd: 17000000,
    last_stage: 'Series A',
    hq_city: 'San Francisco',
    hq_country: 'United States',
    hq_country_code: 'US',
    region: 'North America',
    primary_category: 'AI Infra',
    business_model: 'SaaS',
    failure_reasons: JSON.stringify(['no-pmf', 'unit-economics']),
    primary_failure_reason: 'no-pmf',
    death_type: 'Shut down',
    post_mortem_text: 'Kite was one of the earliest pioneers in AI-assisted coding. Despite a strong technical team and a product that worked reasonably well for its time, developers were hesitant to pay for a tool that only slightly improved productivity. The company struggled to find product-market fit and a viable business model before the advent of massive LLMs like GitHub Copilot completely changed the competitive landscape.',
    counterintuitive_lesson: 'Being too early to a market can be just as fatal as being too late.',
    pattern_tags: JSON.stringify(['#early-market', '#monetization']),
    source_urls: JSON.stringify(['https://techcrunch.com/2022/11/17/kite-an-ai-coding-assistant-startup-shuts-down/']),
    status: 'published',
    featured: 1
  },
  {
    id: crypto.randomUUID(),
    name: 'Skydio (Consumer Division)',
    slug: 'skydio-consumer',
    one_line_epitaph: 'Consumer autonomous drones clipped by enterprise pivot.',
    one_line_summary: 'Skydio pioneered AI consumer drones but shut down its consumer business to focus entirely on enterprise and military.',
    founded_year: 2014,
    shut_down_year: 2023,
    total_raised_usd: 570000000,
    last_stage: 'Series E',
    hq_city: 'San Mateo',
    hq_country: 'United States',
    hq_country_code: 'US',
    region: 'North America',
    primary_category: 'AI Hardware',
    business_model: 'B2C',
    failure_reasons: JSON.stringify(['competition', 'unit-economics']),
    primary_failure_reason: 'competition',
    death_type: 'Pivoted away',
    post_mortem_text: 'While the company Skydio still exists and thrives in enterprise, its much-loved consumer division (Skydio 2, 2+) was shut down. The consumer drone market is notoriously difficult, heavily dominated by DJI which can manufacture at significantly lower costs. Despite having superior AI-driven autonomous tracking, Skydio could not make the consumer unit economics work against fierce Chinese competition.',
    counterintuitive_lesson: 'Superior AI software cannot always overcome structural hardware manufacturing disadvantages.',
    pattern_tags: JSON.stringify(['#hardware', '#dji-dominance']),
    source_urls: JSON.stringify(['https://www.theverge.com/2023/8/10/23827599/skydio-consumer-drones-shut-down-enterprise']),
    status: 'published',
    featured: 0
  },
  {
    id: crypto.randomUUID(),
    name: 'Nauto (Acquired)',
    slug: 'nauto',
    one_line_epitaph: 'AI dashcams absorbed into the corporate machine.',
    one_line_summary: 'Nauto raised massive capital for AI fleet safety but struggled to dominate and was quietly acquired.',
    founded_year: 2015,
    shut_down_year: 2023,
    total_raised_usd: 173000000,
    last_stage: 'Series B',
    hq_city: 'Palo Alto',
    hq_country: 'United States',
    hq_country_code: 'US',
    region: 'North America',
    primary_category: 'AI B2B SaaS',
    business_model: 'B2B',
    failure_reasons: JSON.stringify(['competition', 'market-timing']),
    primary_failure_reason: 'competition',
    death_type: 'Acquired (acqui-hire)',
    post_mortem_text: 'Nauto was a high-flying AI dashcam startup that raised from SoftBank and Greylock. However, the fleet management space became intensely competitive with players like Samsara dominating. Nauto struggled to achieve the massive scale expected of its valuation and was quietly acquired by Otonomo/Urgent.ly in a distressed/consolidation move.',
    counterintuitive_lesson: 'AI features are often quickly commoditized by incumbent hardware/platform players.',
    pattern_tags: JSON.stringify(['#commoditization', '#softbank']),
    source_urls: JSON.stringify([]),
    status: 'published',
    featured: 0
  },
  {
    id: crypto.randomUUID(),
    name: 'Fuzzy',
    slug: 'fuzzy',
    one_line_epitaph: 'AI pet health overwhelmed by real-world logistics.',
    one_line_summary: 'Fuzzy attempted to revolutionize pet care with telemedicine and AI but collapsed under operational costs.',
    founded_year: 2016,
    shut_down_year: 2023,
    total_raised_usd: 80000000,
    last_stage: 'Series C',
    hq_city: 'San Francisco',
    hq_country: 'United States',
    hq_country_code: 'US',
    region: 'North America',
    primary_category: 'AI Consumer',
    business_model: 'B2C',
    failure_reasons: JSON.stringify(['burn-rate', 'unit-economics']),
    primary_failure_reason: 'burn-rate',
    death_type: 'Shut down',
    post_mortem_text: 'Fuzzy Pet Health raised $80M to build a digital veterinary clinic. The company burned through cash trying to acquire customers in a highly competitive and low-margin D2C pet space. Despite AI triage features, the core business required human vets, breaking the venture-scale software margins they pitched.',
    counterintuitive_lesson: 'Slapping AI onto a service-heavy business doesn\'t magically grant it software margins.',
    pattern_tags: JSON.stringify(['#d2c', '#margin-compression']),
    source_urls: JSON.stringify([]),
    status: 'published',
    featured: 0
  }
];

function runBackfill() {
  console.log('Starting historical backfill...');

  const insert = db.prepare(`
    INSERT INTO startups (
      id, name, slug, one_line_epitaph, one_line_summary,
      founded_year, shut_down_year, total_raised_usd, last_stage,
      hq_city, hq_country, hq_country_code, region,
      primary_category, business_model, failure_reasons, primary_failure_reason, death_type,
      post_mortem_text, counterintuitive_lesson, pattern_tags,
      source_urls, status, featured
    ) VALUES (
      @id, @name, @slug, @one_line_epitaph, @one_line_summary,
      @founded_year, @shut_down_year, @total_raised_usd, @last_stage,
      @hq_city, @hq_country, @hq_country_code, @region,
      @primary_category, @business_model, @failure_reasons, @primary_failure_reason, @death_type,
      @post_mortem_text, @counterintuitive_lesson, @pattern_tags,
      @source_urls, @status, @featured
    )
    ON CONFLICT(slug) DO UPDATE SET
      total_raised_usd = excluded.total_raised_usd,
      status = 'published'
  `);

  let count = 0;

  // Helper to sanitize for SQLite
  const sanitize = (val: any) => {
    if (val === undefined) return null;
    if (typeof val === 'boolean') return val ? 1 : 0;
    return val;
  };

  // Insert additional historical data
  for (const startup of historicalAdditions) {
    try {
      insert.run({
        ...startup,
        failure_reasons: JSON.stringify(startup.failure_reasons || '[]'),
        pattern_tags: JSON.stringify(startup.pattern_tags || '[]'),
        source_urls: JSON.stringify(startup.source_urls || '[]'),
      });
      count++;
    } catch (e) {
      console.error(`Failed to insert ${startup.name}:`, e);
    }
  }

  // Insert additional historical data
  for (const startup of historicalAdditions) {
    try {
      insert.run(startup);
      count++;
    } catch (e) {
      console.error(`Failed to insert ${startup.name}:`, e);
    }
  }

  console.log(`Backfill complete. Inserted/Updated ${count} startups.`);
  db.close();
}

// Run directly
if (import.meta.url.startsWith('file:')) {
  const currentFilePath = fileURLToPath(import.meta.url);
  if (process.argv[1] === currentFilePath) {
    runBackfill();
  }
}
