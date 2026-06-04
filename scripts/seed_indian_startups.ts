import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, '../graveyard.db');
const db = new Database(dbPath);

const indianStartups = [
  {
    id: crypto.randomUUID(),
    name: 'Subtl.ai',
    slug: 'subtl-ai',
    one_line_epitaph: 'Outperformed global models but failed to find a sustainable enterprise pulse.',
    one_line_summary: 'Subtl.ai built highly accurate GenAI models for Indian institutions but ultimately succumbed to the massive capital requirements of the foundational model space.',
    founded_year: 2020,
    shut_down_year: 2024,
    total_raised_usd: 2000000, // Estimated
    last_stage: 'Seed',
    hq_city: 'Hyderabad',
    hq_country: 'India',
    hq_country_code: 'IN',
    region: 'Asia',
    primary_category: 'AI Infra',
    business_model: 'B2B',
    failure_reasons: JSON.stringify(['burn-rate', 'competition']),
    primary_failure_reason: 'burn-rate',
    death_type: 'Shut down',
    post_mortem_text: 'Subtl.ai was a promising Indian GenAI startup that built proprietary models capable of retrieving information securely from private enterprise documents. They gained significant traction working with massive institutions like the State Bank of India (SBI) and the Indian defense sector. Despite technical benchmarks that often outperformed global open-source models, the sheer compute cost and capital required to maintain and scale proprietary LLMs proved too high. It served as a stark reality check for Indian foundational model startups trying to compete against heavily funded global giants without a massive war chest.',
    counterintuitive_lesson: 'Superior technical benchmarks do not automatically translate to a sustainable business model in the capital-intensive GenAI space.',
    pattern_tags: JSON.stringify(['#genai', '#compute-costs', '#enterprise-sales']),
    source_urls: JSON.stringify([]),
    status: 'published',
    featured: 1
  },
  {
    id: crypto.randomUUID(),
    name: 'CodeParrot',
    slug: 'codeparrot',
    one_line_epitaph: 'An AI dev tool that got lost in the flock.',
    one_line_summary: 'CodeParrot attempted to build AI-driven testing and code generation but struggled with developer adoption and monetization.',
    founded_year: 2023,
    shut_down_year: 2024,
    total_raised_usd: 500000,
    last_stage: 'Pre-seed',
    hq_city: 'Bengaluru',
    hq_country: 'India',
    hq_country_code: 'IN',
    region: 'Asia',
    primary_category: 'AI B2B SaaS',
    business_model: 'SaaS',
    failure_reasons: JSON.stringify(['no-pmf', 'competition']),
    primary_failure_reason: 'no-pmf',
    death_type: 'Shut down',
    post_mortem_text: 'CodeParrot aimed to revolutionize developer workflows by using AI to generate code and tests directly from Figma files and existing codebases. While the space (AI coding assistants) is incredibly hot, it is also hyper-competitive, dominated by massive players like GitHub Copilot and Cursor. Startups in this space face a brutal "go-to-market gap." Developers are incredibly particular about their workflows, and convincing them to adopt a new, unproven tool over established giants proved too difficult. CodeParrot struggled to find the deep product-market fit needed to justify further venture funding.',
    counterintuitive_lesson: 'Developer tools require a 10x improvement to overcome the inertia of established workflows; marginal AI improvements are not enough.',
    pattern_tags: JSON.stringify(['#dev-tools', '#gtm-gap']),
    source_urls: JSON.stringify([]),
    status: 'published',
    featured: 0
  },
  {
    id: crypto.randomUUID(),
    name: 'Locale.ai',
    slug: 'locale-ai',
    one_line_epitaph: 'AI operational analytics that couldn\'t find its own direction.',
    one_line_summary: 'Locale.ai built AI-driven location analytics for operations teams but pivoted multiple times before shutting down.',
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
    failure_reasons: JSON.stringify(['wrong-icp', 'pivot-burn']),
    primary_failure_reason: 'wrong-icp',
    death_type: 'Shut down',
    post_mortem_text: 'Locale.ai started with a strong premise: giving operations teams (like food delivery and logistics companies) AI-powered geospatial analytics to optimize their fleets. Backed by Better Capital and prominent angels, they built a highly technical product. However, they found that their Ideal Customer Profile (ICP) was flawed; large logistics companies preferred building these tools in-house, while smaller companies couldn\'t afford the enterprise pricing. After multiple pivots trying to find a wedge into different markets, the company exhausted its runway.',
    counterintuitive_lesson: 'Selling complex AI tools to operations teams often competes directly with their internal data engineering departments.',
    pattern_tags: JSON.stringify(['#geospatial', '#build-vs-buy']),
    source_urls: JSON.stringify([]),
    status: 'published',
    featured: 0
  },
  {
    id: crypto.randomUUID(),
    name: 'Wuri',
    slug: 'wuri',
    one_line_epitaph: 'AI video generation that ran out of frames.',
    one_line_summary: 'Wuri attempted to tackle AI-driven video creation but failed to secure the massive funding needed to compete.',
    founded_year: 2022,
    shut_down_year: 2024,
    total_raised_usd: 0,
    last_stage: 'Bootstrap',
    hq_city: 'Mumbai',
    hq_country: 'India',
    hq_country_code: 'IN',
    region: 'Asia',
    primary_category: 'AI Media',
    business_model: 'SaaS',
    failure_reasons: JSON.stringify(['competition', 'runway']),
    primary_failure_reason: 'runway',
    death_type: 'Shut down',
    post_mortem_text: 'Wuri was part of the early wave of Indian startups attempting to crack AI video generation. However, the generative video space requires astronomical compute resources to train foundational models (as seen with OpenAI\'s Sora or Runway). Wuri found itself caught in a painful middle ground: relying on expensive APIs to generate content destroyed their unit economics, but they lacked the tens of millions of dollars required to train their own models from scratch. They quietly folded as the market consolidated around mega-funded players.',
    counterintuitive_lesson: 'In foundational generative AI, bootstrapping is nearly impossible due to the hard costs of GPU compute.',
    pattern_tags: JSON.stringify(['#video-gen', '#compute-barrier']),
    source_urls: JSON.stringify([]),
    status: 'published',
    featured: 0
  },
  {
    id: crypto.randomUUID(),
    name: 'Niki.ai',
    slug: 'niki-ai',
    one_line_epitaph: 'The conversational commerce pioneer that spoke too soon.',
    one_line_summary: 'Niki.ai pioneered AI chatbots for commerce in India but ultimately pivoted into a local language grocery app before being acquired in a distress sale.',
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
    failure_reasons: JSON.stringify(['market-timing', 'unit-economics']),
    primary_failure_reason: 'market-timing',
    death_type: 'Acquired (acqui-hire)',
    post_mortem_text: 'Niki.ai was years ahead of its time. Backed by Ratan Tata, they built an AI chatbot that allowed Indian users to pay bills, book cabs, and order food entirely through a conversational interface. However, in 2015-2018, Natural Language Processing (NLP) wasn\'t advanced enough to handle complex edge cases seamlessly, leading to high user drop-off rates. They eventually pivoted to targeting Tier 2/3 cities with voice-based grocery ordering, but struggled with the brutal unit economics of Indian quick commerce. They were eventually acquired in a distress sale, proving that being early to conversational AI was a costly endeavor.',
    counterintuitive_lesson: 'Consumer tolerance for AI errors is zero when it comes to financial transactions; the tech must be perfect, not just novel.',
    pattern_tags: JSON.stringify(['#chatbots', '#too-early', '#ratan-tata']),
    source_urls: JSON.stringify([]),
    status: 'published',
    featured: 1
  },
  {
    id: crypto.randomUUID(),
    name: 'FrontDeskAI',
    slug: 'frontdeskai',
    one_line_epitaph: 'The AI receptionist that couldn\'t book a profitable appointment.',
    one_line_summary: 'FrontDeskAI built automated answering and booking services for local businesses but struggled with churn.',
    founded_year: 2017,
    shut_down_year: 2022,
    total_raised_usd: 4000000,
    last_stage: 'Seed',
    hq_city: 'Bengaluru',
    hq_country: 'India',
    hq_country_code: 'IN',
    region: 'Asia',
    primary_category: 'AI B2B SaaS',
    business_model: 'SaaS',
    failure_reasons: JSON.stringify(['unit-economics', 'distribution']),
    primary_failure_reason: 'unit-economics',
    death_type: 'Shut down',
    post_mortem_text: 'FrontDeskAI targeted a massive, unsexy market: salons, spas, and gyms that missed calls and lost revenue. They built an AI receptionist (Sasha) that responded to texts and booked appointments. While the product worked, selling software to SMBs (Small and Medium Businesses) is notoriously difficult due to high customer acquisition costs (CAC) and high churn rates. Local business owners often preferred cheaper, human-in-the-loop virtual assistants from overseas rather than paying a premium for pure AI software.',
    counterintuitive_lesson: 'Selling AI to SMBs often fails because the cost to acquire the customer is higher than their lifetime value.',
    pattern_tags: JSON.stringify(['#smb', '#churn']),
    source_urls: JSON.stringify([]),
    status: 'published',
    featured: 0
  }
];

function runBackfill() {
  console.log('Starting Indian AI Startup backfill...');

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
      status = 'published',
      featured = excluded.featured
  `);

  let count = 0;

  for (const startup of indianStartups) {
    try {
      insert.run({
        ...startup,
        status: 'published'
      });
      count++;
    } catch (e) {
      console.error(`Failed to insert ${startup.name}:`, e);
    }
  }

  console.log(`Backfill complete. Inserted ${count} Indian startups.`);
  db.close();
}

runBackfill();
