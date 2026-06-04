import Parser from 'rss-parser';
import * as cheerio from 'cheerio';
import { extractStartupData } from './llm_extractor.js';
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, '../graveyard.db');

const parser = new Parser();
const db = new Database(dbPath);

// Feeds to check for AI startup failures
const FEEDS = [
  'https://techcrunch.com/category/artificial-intelligence/feed/',
  'https://news.google.com/rss/search?q=%22AI+startup%22+%22shuts+down%22+OR+%22closes+doors%22+OR+%22bankrupt%22&hl=en-US&gl=US&ceid=US:en'
];

async function fetchArticleText(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    
    // Attempt to extract main article text, removing scripts, navs, etc.
    $('script, style, nav, header, footer, iframe, aside').remove();
    const text = $('body').text().replace(/\s+/g, ' ').trim();
    return text.substring(0, 10000); // Limit to 10k chars for LLM context
  } catch (e) {
    console.error(`Failed to fetch ${url}:`, e);
    return '';
  }
}

function insertIntoDb(startup: any, sourceUrl: string) {
  try {
    const insert = db.prepare(`
      INSERT INTO startups (
        id, name, slug, one_line_epitaph, one_line_summary,
        founded_year, shut_down_year, total_raised_usd, last_stage,
        hq_city, hq_country, hq_country_code, region,
        primary_category, business_model, failure_reasons, primary_failure_reason, death_type,
        post_mortem_text, founder_quote, counterintuitive_lesson, pattern_tags,
        source_urls, status, featured, published_at
      ) VALUES (
        @id, @name, @slug, @one_line_epitaph, @one_line_summary,
        @founded_year, @shut_down_year, @total_raised_usd, @last_stage,
        @hq_city, @hq_country, @hq_country_code, @region,
        @primary_category, @business_model, @failure_reasons, @primary_failure_reason, @death_type,
        @post_mortem_text, @founder_quote, @counterintuitive_lesson, @pattern_tags,
        @source_urls, @status, @featured, @published_at
      )
      ON CONFLICT(slug) DO NOTHING
    `);

    insert.run({
      id: crypto.randomUUID(),
      name: startup.name || 'Unknown',
      slug: startup.slug || crypto.randomUUID(),
      one_line_epitaph: startup.one_line_epitaph || null,
      one_line_summary: startup.one_line_summary || null,
      founded_year: startup.founded_year || null,
      shut_down_year: startup.shut_down_year || new Date().getFullYear(),
      total_raised_usd: startup.total_raised_usd || 0,
      last_stage: startup.last_stage || 'Unknown',
      hq_city: startup.hq_city || null,
      hq_country: startup.hq_country || null,
      hq_country_code: startup.hq_country_code || null,
      region: startup.region || null,
      primary_category: startup.primary_category || 'AI Other',
      business_model: startup.business_model || null,
      failure_reasons: JSON.stringify(startup.failure_reasons || []),
      primary_failure_reason: startup.primary_failure_reason || null,
      death_type: startup.death_type || 'Unknown',
      post_mortem_text: startup.post_mortem_text || null,
      founder_quote: startup.founder_quote || null,
      counterintuitive_lesson: startup.counterintuitive_lesson || null,
      pattern_tags: JSON.stringify(startup.pattern_tags || []),
      source_urls: JSON.stringify([sourceUrl]),
      status: 'draft', // Requires manual review before publishing
      featured: 0,
      published_at: null
    });
    console.log(`Successfully saved ${startup.name} to database as draft.`);
  } catch (e) {
    console.error('Database insert failed:', e);
  }
}

async function runDailyIngest() {
  console.log('Starting daily ingestion pipeline...');

  for (const feedUrl of FEEDS) {
    try {
      console.log(`Checking feed: ${feedUrl}`);
      const feed = await parser.parseURL(feedUrl);
      
      // Only process recent items (last 24 hours) or all if testing
      const recentItems = feed.items.slice(0, 5); // Limit to top 5 for pipeline execution

      for (const item of recentItems) {
        if (!item.link) continue;
        
        // Simple keyword filter to save LLM calls
        const titleLower = item.title?.toLowerCase() || '';
        const descLower = item.contentSnippet?.toLowerCase() || '';
        const combined = titleLower + ' ' + descLower;
        
        const isFailure = combined.includes('shut down') || 
                          combined.includes('shutting down') || 
                          combined.includes('closes doors') || 
                          combined.includes('acquired') || 
                          combined.includes('bankrupt') ||
                          combined.includes('runs out of money');
                          
        if (!isFailure) {
          continue; // Skip articles not about shutdowns
        }

        console.log(`Found potential failure: ${item.title}`);
        console.log(`Fetching article: ${item.link}`);
        
        const text = await fetchArticleText(item.link);
        if (text.length < 500) {
          console.log('Article too short, skipping.');
          continue;
        }

        console.log('Sending to Ollama (Gemma) for extraction...');
        // Change 'gemma' to the exact model name running in Ollama if needed
        const extractedData = await extractStartupData(text, 'gemma');
        
        if (extractedData && extractedData.name && extractedData.slug) {
          console.log(`Extracted data for: ${extractedData.name}`);
          insertIntoDb(extractedData, item.link);
        } else {
          console.log('Failed to extract valid startup data from article.');
        }
      }
    } catch (e) {
      console.error(`Error processing feed ${feedUrl}:`, e);
    }
  }

  console.log('Daily ingestion complete.');
  db.close();
}

// Allow running directly
if (import.meta.url.startsWith('file:')) {
  const currentFilePath = fileURLToPath(import.meta.url);
  if (process.argv[1] === currentFilePath) {
    runDailyIngest().catch(console.error);
  }
}
