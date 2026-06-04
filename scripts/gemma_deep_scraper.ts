import * as cheerio from 'cheerio';
import { extractStartupData } from './llm_extractor.js';
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, '../graveyard.db');
const db = new Database(dbPath);

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function fetchArticleText(url: string): Promise<string> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    
    const html = await response.text();
    const $ = cheerio.load(html);
    
    $('script, style, nav, header, footer, iframe, aside').remove();
    const text = $('body').text().replace(/\s+/g, ' ').trim();
    return text.substring(0, 15000); 
  } catch (e) {
    console.error(`  [!] Failed to fetch ${url}`);
    return '';
  }
}

function insertIntoDb(startup: any, sourceUrl: string) {
  const sanitize = (val: any) => {
    if (val === undefined) return null;
    if (typeof val === 'boolean') return val ? 1 : 0;
    return val;
  };

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
      ON CONFLICT(slug) DO UPDATE SET 
        total_raised_usd = excluded.total_raised_usd,
        primary_failure_reason = excluded.primary_failure_reason,
        post_mortem_text = excluded.post_mortem_text,
        one_line_summary = excluded.one_line_summary,
        one_line_epitaph = excluded.one_line_epitaph,
        founder_quote = excluded.founder_quote
    `);

    insert.run({
      id: crypto.randomUUID(),
      name: sanitize(startup.name) || 'Unknown',
      slug: sanitize(startup.slug) || crypto.randomUUID(),
      one_line_epitaph: sanitize(startup.one_line_epitaph),
      one_line_summary: sanitize(startup.one_line_summary),
      founded_year: sanitize(startup.founded_year),
      shut_down_year: sanitize(startup.shut_down_year) || new Date().getFullYear(),
      total_raised_usd: sanitize(startup.total_raised_usd) || 0,
      last_stage: sanitize(startup.last_stage) || 'Unknown',
      hq_city: sanitize(startup.hq_city),
      hq_country: sanitize(startup.hq_country),
      hq_country_code: sanitize(startup.hq_country_code),
      region: sanitize(startup.region),
      primary_category: sanitize(startup.primary_category) || 'AI Other',
      business_model: sanitize(startup.business_model),
      failure_reasons: JSON.stringify(startup.failure_reasons || []),
      primary_failure_reason: sanitize(startup.primary_failure_reason),
      death_type: sanitize(startup.death_type) || 'Unknown',
      post_mortem_text: sanitize(startup.post_mortem_text),
      founder_quote: sanitize(startup.founder_quote),
      counterintuitive_lesson: sanitize(startup.counterintuitive_lesson),
      pattern_tags: JSON.stringify(startup.pattern_tags || []),
      source_urls: JSON.stringify([sourceUrl]),
      status: 'published', 
      featured: 0,
      published_at: new Date().toISOString()
    });
    console.log(`  [+] Successfully enriched ${startup.name} with deep AI data!`);
  } catch (e) {
    console.error('  [!] Database insert failed:', e);
  }
}

async function runDeepGemmaScraper() {
  console.log(`Starting DEEP AI EXTRACTION using local Gemma model...\n`);

  for (let page = 1; page <= 20; page++) {
    console.log(`=== Processing Page: ${page} ===`);
    const url = `https://techcrunch.com/category/artificial-intelligence/page/${page}/`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) break;
      
      const html = await response.text();
      const $ = cheerio.load(html);
      
      const articleLinks: string[] = [];
      $('a').each((i, el) => {
        const href = $(el).attr('href');
        if (href && href.includes('techcrunch.com/') && href.split('/').length > 5) {
          if (!articleLinks.includes(href)) articleLinks.push(href);
        }
      });
      
      for (const link of articleLinks) {
        const urlLower = link.toLowerCase();
        const isFailure = urlLower.includes('shut') || urlLower.includes('bankrupt') || urlLower.includes('closes') || urlLower.includes('acquired') || urlLower.includes('pivot');
        if (!isFailure) continue;
        
        console.log(`\n-> Analyzing article: ${link}`);
        const text = await fetchArticleText(link);
        
        console.log('  [*] Passing to local Gemma model for deep extraction of financial and post-mortem data...');
        // Using the user's exact model name: gemma4:e4b
        const extractedData = await extractStartupData(text, 'gemma4:e4b');
        
        if (extractedData && extractedData.name && extractedData.slug) {
          insertIntoDb(extractedData, link);
        } else {
          console.log('  [-] Gemma failed to extract valid data.');
        }

        await sleep(2000); 
      }
    } catch (e) {
      console.error(`[!] Failed to process page ${page}:`, e);
    }
  }

  console.log('\n✅ DEEP EXTRACTION COMPLETE.');
  db.close();
}

// Run directly
if (import.meta.url.startsWith('file:')) {
  const currentFilePath = fileURLToPath(import.meta.url);
  if (process.argv[1] === currentFilePath) {
    runDeepGemmaScraper().catch(console.error);
  }
}
