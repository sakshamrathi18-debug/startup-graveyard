import Database from 'better-sqlite3';
import path from 'path';

// Get the DB path relative to the project root
const dbPath = path.join(process.cwd(), 'graveyard.db');

let db: Database.Database | null = null;

try {
  db = new Database(dbPath, { readonly: true });
} catch (e) {
  console.warn("Could not connect to database for stats.");
}

export interface Stats {
  totalStartups: number;
  totalCapitalLost: number;
  countryCount: number;
  averageLifespan: number;
  topCategories: { category: string; count: number }[];
  capitalByCategory: { category: string; capital: number }[];
}

export function getStats(): Stats {
  if (!db) {
    return {
      totalStartups: 0,
      totalCapitalLost: 0,
      countryCount: 0,
      averageLifespan: 0,
      topCategories: [],
      capitalByCategory: []
    };
  }

  const totalStmt = db.prepare("SELECT COUNT(*) as count FROM startups WHERE status = 'published'");
  const capitalStmt = db.prepare("SELECT SUM(total_raised_usd) as total FROM startups WHERE status = 'published'");
  const countryStmt = db.prepare("SELECT COUNT(DISTINCT hq_country) as count FROM startups WHERE status = 'published'");
  const lifespanStmt = db.prepare("SELECT AVG(shut_down_year - founded_year) as avgLifespan FROM startups WHERE status = 'published' AND founded_year IS NOT NULL AND shut_down_year IS NOT NULL AND founded_year > 1990");
  
  const topCatStmt = db.prepare("SELECT primary_category as category, COUNT(*) as count FROM startups WHERE status = 'published' GROUP BY primary_category ORDER BY count DESC LIMIT 5");
  const capitalCatStmt = db.prepare("SELECT primary_category as category, SUM(total_raised_usd) as capital FROM startups WHERE status = 'published' GROUP BY primary_category ORDER BY capital DESC LIMIT 5");

  try {
    const totalResult = totalStmt.get() as { count: number };
    const capitalResult = capitalStmt.get() as { total: number };
    const countryResult = countryStmt.get() as { count: number };
    const lifespanResult = lifespanStmt.get() as { avgLifespan: number };
    const topCategories = topCatStmt.all() as { category: string; count: number }[];
    const capitalByCategory = capitalCatStmt.all() as { category: string; capital: number }[];

    return {
      totalStartups: totalResult.count || 0,
      totalCapitalLost: capitalResult.total || 0,
      countryCount: countryResult.count || 0,
      averageLifespan: lifespanResult?.avgLifespan ? Math.round(lifespanResult.avgLifespan * 10) / 10 : 0,
      topCategories,
      capitalByCategory
    };
  } catch (e) {
    console.error("Failed to fetch stats", e);
    return {
      totalStartups: 0,
      totalCapitalLost: 0,
      countryCount: 0,
      averageLifespan: 0,
      topCategories: [],
      capitalByCategory: []
    };
  }
}
