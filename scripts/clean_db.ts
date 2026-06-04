import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, '../graveyard.db');
const db = new Database(dbPath);

console.log("Cleaning false positives from database...");

// Explicitly delete known healthy companies that got caught by loose heuristics
const falsePositives = [
  '%deepseek%',
  '%anthropic%',
  '%builder%',
  '%openai%',
  '%google%',
  'false-positive'
];

let deletedCount = 0;
for (const pattern of falsePositives) {
  const result = db.prepare(`DELETE FROM startups WHERE slug LIKE ?`).run(pattern);
  deletedCount += result.changes;
}

// Delete anything that accidentally matched "closes" but isn't dead
const heuristicResult = db.prepare(`DELETE FROM startups WHERE name LIKE '%DeepSeek%' OR name LIKE '%Builder.ai%' OR name LIKE '%Anthropic%'`).run();
deletedCount += heuristicResult.changes;

console.log(`Deleted ${deletedCount} false positive startups.`);
db.close();
