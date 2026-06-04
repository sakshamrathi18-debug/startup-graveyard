import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, '../graveyard.db');
const db = new Database(dbPath);

console.log("Purging all non-Indian startups from the database...");

// Purge all startups where hq_country is NOT 'India'
const result = db.prepare(`DELETE FROM startups WHERE hq_country != 'India' OR hq_country IS NULL`).run();

console.log(`Deleted ${result.changes} non-Indian startups.`);

// Verify remaining count
const remaining = db.prepare(`SELECT COUNT(*) as count FROM startups`).get() as { count: number };
console.log(`Remaining startups (Indian): ${remaining.count}`);

db.close();
