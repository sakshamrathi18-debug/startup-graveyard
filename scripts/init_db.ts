import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, '../graveyard.db');

// Ensure db directory exists
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

console.log(`Initializing database at ${dbPath}...`);
const db = new Database(dbPath);

// Create startups table
db.exec(`
  CREATE TABLE IF NOT EXISTS startups (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    one_line_epitaph TEXT,
    one_line_summary TEXT,
    
    founded_year INTEGER,
    founded_date TEXT,
    shut_down_date TEXT,
    shut_down_year INTEGER,
    
    total_raised_usd INTEGER DEFAULT 0,
    last_stage TEXT,
    burn_rate_monthly_usd INTEGER,
    runway_at_death_months INTEGER,
    
    hq_city TEXT,
    hq_country TEXT,
    hq_country_code TEXT,
    region TEXT,
    
    primary_category TEXT,
    business_model TEXT,
    
    failure_reasons TEXT, -- Stored as JSON string array
    primary_failure_reason TEXT,
    death_type TEXT,
    
    post_mortem_text TEXT,
    founder_quote TEXT,
    counterintuitive_lesson TEXT,
    pattern_tags TEXT, -- Stored as JSON string array
    
    source_urls TEXT, -- Stored as JSON string array
    
    status TEXT DEFAULT 'draft',
    featured INTEGER DEFAULT 0,
    
    published_at TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
`);

console.log("Database initialized successfully!");
db.close();
