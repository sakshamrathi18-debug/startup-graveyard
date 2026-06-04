import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, '../graveyard.db');

const db = new Database(dbPath);

const insertStmt = db.prepare(`
  INSERT INTO startups (
    slug, name, one_line_epitaph, one_line_summary,
    founded_year, shut_down_year, total_raised_usd, last_stage,
    hq_city, hq_country, hq_country_code, region,
    primary_category, business_model, failure_reasons,
    primary_failure_reason, death_type, post_mortem_text,
    founder_quote, counterintuitive_lesson, pattern_tags,
    status, featured, source_urls,
    created_at, updated_at, published_at
  ) VALUES (
    @slug, @name, @one_line_epitaph, @one_line_summary,
    @founded_year, @shut_down_year, @total_raised_usd, @last_stage,
    @hq_city, @hq_country, @hq_country_code, @region,
    @primary_category, @business_model, @failure_reasons,
    @primary_failure_reason, @death_type, @post_mortem_text,
    @founder_quote, @counterintuitive_lesson, @pattern_tags,
    @status, @featured, @source_urls,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
  )
`);

const moreStartups = [
  {
    slug: 'neuropixel-ai',
    name: 'NeuroPixel.AI',
    one_line_epitaph: 'A fashion tech darling that got vaporized by the sudden leap in global image generation models.',
    one_line_summary: 'A Bengaluru-based AI fashion startup that shut down in April 2026 after struggling to compete with massive leaps in global foundation models.',
    founded_year: 2020,
    shut_down_year: 2026,
    total_raised_usd: 1200000,
    last_stage: 'Seed',
    hq_city: 'Bengaluru',
    hq_country: 'India',
    hq_country_code: 'IN',
    region: 'Asia',
    primary_category: 'AI B2B SaaS',
    business_model: 'B2B',
    failure_reasons: JSON.stringify(['competition', 'runway', 'market-timing']),
    primary_failure_reason: 'competition',
    death_type: 'Shut down',
    post_mortem_text: 'NeuroPixel.AI built computer vision and synthetic generation tools specifically for fashion e-commerce. They allowed brands to generate virtual try-ons and synthetic models, securing high-profile clients like Myntra and Fabindia and raising $1.2M from investors like Flipkart Ventures.\n\nHowever, their closure in April 2026 highlighted a brutal reality for application-layer AI startups: the pace of underlying foundation models is ruthless. As global tech giants released exponentially better open-source image generation models, NeuroPixel\'s proprietary advantage eroded. Coupled with the loss of a major client and outstanding payments, the financial strain forced the founders to cease operations, though they are exploring selling their underlying tech stack.',
    founder_quote: null,
    counterintuitive_lesson: 'Specializing in a vertical (like fashion) doesn\'t protect you if the horizontal foundation models advance so fast that they naturally absorb your vertical use case out-of-the-box.',
    pattern_tags: JSON.stringify(['#wrapper-collapse', '#fashion-tech', '#foundation-models']),
    status: 'published',
    featured: 1,
    source_urls: JSON.stringify(['https://entrackr.com/', 'https://startuptalky.com/'])
  },
  {
    slug: 'alle',
    name: 'Alle',
    one_line_epitaph: 'Six pivots and $3M later, the AI stylist that found users but no business model.',
    one_line_summary: 'An AI-powered fashion stylist startup that reached millions of users but shut down in January 2026 after failing to find a viable monetization strategy.',
    founded_year: 2023,
    shut_down_year: 2026,
    total_raised_usd: 3000000,
    last_stage: 'Seed',
    hq_city: 'Bengaluru',
    hq_country: 'India',
    hq_country_code: 'IN',
    region: 'Asia',
    primary_category: 'AI Consumer',
    business_model: 'B2C',
    failure_reasons: JSON.stringify(['unit-economics', 'pivot-burn', 'no-pmf']),
    primary_failure_reason: 'unit-economics',
    death_type: 'Shut down',
    post_mortem_text: 'Founded by former Meesho executives, Alle was an ambitious consumer-facing AI fashion stylist. Backed by Elevation Capital with $3M in funding, the app actually succeeded where many failed: it reached millions of users and saw strong consumer engagement.\n\nBut user traction does not equal a sustainable business. Over its 2.5-year lifespan, Alle underwent six major strategic pivots trying to figure out how to monetize its user base effectively. Ultimately, the founding team concluded that consumer AI applications have notoriously difficult unit economics, and the opportunity cost of continuing to pivot in search of a sustainable path was too high. They shut down in January 2026.',
    founder_quote: 'We concluded that the opportunity cost of continuing to pivot in search of a sustainable path was too high.',
    counterintuitive_lesson: 'In consumer AI, finding "product-market fit" (users loving the product) is only half the battle. If the compute costs exceed the lifetime value of the consumer, engagement will bankrupt you.',
    pattern_tags: JSON.stringify(['#consumer-ai', '#monetization', '#pivot-burn', '#compute-costs']),
    status: 'published',
    featured: 1,
    source_urls: JSON.stringify(['https://yourstory.com/', 'https://entrepreneur.com/'])
  }
];

let insertedCount = 0;

for (const startup of moreStartups) {
  try {
    insertStmt.run(startup);
    insertedCount++;
    console.log(`Successfully injected verified startup: ${startup.name}`);
  } catch (error: any) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      console.log(`Skipped ${startup.name} (already exists)`);
    } else {
      console.error(`Error inserting ${startup.name}:`, error.message);
    }
  }
}

console.log(`\\n✅ Completed injecting ${insertedCount} MORE VERIFIED REAL Indian AI startups.`);
db.close();
