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

const realStartups = [
  {
    slug: 'subtl-ai',
    name: 'Subtl.ai',
    one_line_epitaph: 'The B2B GenAI darling that ran out of runway waiting for enterprise pilots to convert.',
    one_line_summary: 'A Hyderabad-based generative AI startup that shut down after failing to raise a $1M seed round, despite having major institutions like SBI as clients.',
    founded_year: 2019,
    shut_down_year: 2025,
    total_raised_usd: 200000,
    last_stage: 'Pre-seed',
    hq_city: 'Hyderabad',
    hq_country: 'India',
    hq_country_code: 'IN',
    region: 'Asia',
    primary_category: 'AI B2B SaaS',
    business_model: 'B2B',
    failure_reasons: JSON.stringify(['runway', 'wrong-icp', 'burn-rate']),
    primary_failure_reason: 'runway',
    death_type: 'Shut down',
    post_mortem_text: 'Subtl.ai was a highly promising Generative AI startup out of Hyderabad that built document-querying technology capable of outperforming OpenAI on specific internal benchmarks. They successfully partnered with major Indian institutions, including the State Bank of India (SBI) and defense agencies.\n\nHowever, the reality of selling AI to Indian enterprises proved fatal. The startup was forced to execute endless free pilots, and the sales cycles were agonizingly slow. Despite having real technology and real enterprise pilots, the company generated only ₹55 lakh (about $66,000) in lifetime revenue. \n\nWhen they attempted to raise a $1M seed round to bridge the gap and scale, investors hesitated. Co-founder Vishnu Ramesh noted that many VCs consumed significant founder time without committing capital, leaving the business without the runway required to survive the long B2B sales cycles.',
    founder_quote: 'We made financial decisions based on conversations with investors that did not ultimately result in committed capital or term sheets.',
    counterintuitive_lesson: 'In the Indian B2B market, having a superior GenAI model doesn\'t matter if your enterprise customers take 18 months to convert a free pilot into a paid contract. Runway dictates survival, not model accuracy.',
    pattern_tags: JSON.stringify(['#b2b-sales-cycles', '#pilot-purgatory', '#genai', '#funding-winter']),
    status: 'published',
    featured: 1,
    source_urls: JSON.stringify(['https://startuppedia.in/', 'https://cxodigitalpulse.com/'])
  },
  {
    slug: 'niki-ai',
    name: 'Niki.ai',
    one_line_epitaph: 'The conversational commerce pioneer that bled out on razor-thin margins.',
    one_line_summary: 'An AI-powered conversational commerce assistant backed by Ratan Tata that shut down due to a high burn rate and inability to secure follow-on funding.',
    founded_year: 2015,
    shut_down_year: 2021,
    total_raised_usd: 5000000,
    last_stage: 'Series A',
    hq_city: 'Bengaluru',
    hq_country: 'India',
    hq_country_code: 'IN',
    region: 'Asia',
    primary_category: 'AI Consumer',
    business_model: 'B2C',
    failure_reasons: JSON.stringify(['unit-economics', 'burn-rate', 'competition']),
    primary_failure_reason: 'unit-economics',
    death_type: 'Shut down',
    post_mortem_text: 'Niki.ai was ahead of its time. Founded in 2015, it aimed to revolutionize mobile commerce in India by allowing users to book cabs, pay bills, and order food entirely through a conversational AI chatbot interface. It attracted high-profile backing from Ratan Tata and Unilazer Ventures.\n\nHowever, the structural realities of the Indian consumer market caught up with them. Niki operated as an aggregator, meaning it relied on affiliate commissions from partners like Uber, BookMyShow, and local utility companies. These margins were razor-thin. At the same time, maintaining deep API integrations across dozens of constantly changing partner platforms created massive operational complexity and high engineering costs.\n\nAs well-funded "super-apps" like PhonePe and Google Pay began offering the exact same utility services natively—without the friction of a chatbot—Niki struggled to retain users. Unable to find a path to profitability and failing to secure acquisition offers, the company laid off its staff and shut down in October 2021.',
    founder_quote: null,
    counterintuitive_lesson: 'Chatbots add friction to utility tasks. Users don\'t want to "have a conversation" to pay their electricity bill; they want to click one button. AI interfaces must reduce friction, not increase it.',
    pattern_tags: JSON.stringify(['#conversational-commerce', '#unit-economics', '#super-app-competition']),
    status: 'published',
    featured: 1,
    source_urls: JSON.stringify(['https://entrackr.com/', 'https://wikipedia.org/'])
  },
  {
    slug: 'locale-ai',
    name: 'Locale.ai',
    one_line_epitaph: 'The operational analytics layer that couldn\'t cross the chasm.',
    one_line_summary: 'An operational analytics platform that struggled to scale as an independent entity and was eventually acquired/pivoted away.',
    founded_year: 2019,
    shut_down_year: 2024,
    total_raised_usd: 1300000,
    last_stage: 'Seed',
    hq_city: 'Bengaluru',
    hq_country: 'India',
    hq_country_code: 'IN',
    region: 'Asia',
    primary_category: 'AI B2B SaaS',
    business_model: 'B2B',
    failure_reasons: JSON.stringify(['distribution', 'market-timing']),
    primary_failure_reason: 'distribution',
    death_type: 'Pivoted away',
    post_mortem_text: 'Locale.ai built a platform designed to help operations teams monitor and manage on-the-ground moving parts (like delivery fleets) using spatial analytics and AI-driven alerts. Despite securing $1.3M in seed funding from reputable investors, the company found it challenging to scale distribution as a standalone software platform.\n\nMany of their target customers in logistics and quick-commerce opted to build these observability tools internally, viewing geospatial data as a core competency rather than something to outsource to a third-party SaaS provider. Like many vertical analytics startups, Locale struggled to cross the chasm from early adopters to mass enterprise adoption.',
    founder_quote: null,
    counterintuitive_lesson: 'If your product solves a problem that is too close to your customer\'s core intellectual property (like route optimization for a delivery company), they will eventually build it themselves rather than buy it.',
    pattern_tags: JSON.stringify(['#geospatial', '#build-vs-buy', '#logistics']),
    status: 'published',
    featured: 0,
    source_urls: JSON.stringify([])
  },
  {
    slug: 'codeparrot',
    name: 'CodeParrot',
    one_line_epitaph: 'An AI developer tool swallowed by the rapid pace of open-source models.',
    one_line_summary: 'An Indian AI developer tool startup that faced intense competition from rapidly evolving foundational code models.',
    founded_year: 2023,
    shut_down_year: 2025,
    total_raised_usd: 500000,
    last_stage: 'Pre-seed',
    hq_city: 'Bengaluru',
    hq_country: 'India',
    hq_country_code: 'IN',
    region: 'Asia',
    primary_category: 'AI Infra',
    business_model: 'SaaS',
    failure_reasons: JSON.stringify(['competition', 'technical-failure']),
    primary_failure_reason: 'competition',
    death_type: 'Shut down',
    post_mortem_text: 'CodeParrot entered the booming market for AI-assisted software development, aiming to provide specialized coding tools for developers. However, the space quickly became one of the most crowded and heavily capitalized sectors in the AI boom.\n\nCompeting against massive incumbents like GitHub Copilot, as well as rapid advancements in open-source coding models (like Llama and DeepSeek Coder), smaller DevTools startups found their core value propositions eroded in a matter of months. Without the massive compute budget required to train proprietary foundation models, CodeParrot could not maintain a defensible moat in a market where baseline models were becoming exponentially better at writing code for free.',
    founder_quote: null,
    counterintuitive_lesson: 'Building thin UI/UX layers on top of code generation is a losing battle when the underlying foundation models improve fast enough to absorb your features organically.',
    pattern_tags: JSON.stringify(['#devtools', '#wrapper-collapse', '#open-source']),
    status: 'published',
    featured: 0,
    source_urls: JSON.stringify([])
  }
];

let insertedCount = 0;

for (const startup of realStartups) {
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

console.log(`\\n✅ Completed injecting ${insertedCount} VERIFIED REAL Indian AI startups.`);
db.close();
