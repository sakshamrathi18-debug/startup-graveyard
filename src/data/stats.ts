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

export interface IndianStats {
  totalStartups: number;
  totalCapitalLost: number;
  averageLifespan: number;
  topReasons: { reason: string; count: number }[];
  casualties2026: { name: string; slug: string; reason: string }[];
  topDomains: { category: string; count: number; capital: number }[];
}

export function getIndianStats(): IndianStats {
  if (!db) {
    return { totalStartups: 0, totalCapitalLost: 0, averageLifespan: 0, topReasons: [], casualties2026: [], topDomains: [] };
  }

  const baseQuery = "FROM startups WHERE status = 'published' AND hq_country = 'India'";
  
  const totalStmt = db.prepare(`SELECT COUNT(*) as count ${baseQuery}`);
  const capitalStmt = db.prepare(`SELECT SUM(total_raised_usd) as total ${baseQuery}`);
  const lifespanStmt = db.prepare(`SELECT AVG(shut_down_year - founded_year) as avgLifespan ${baseQuery} AND founded_year IS NOT NULL AND shut_down_year IS NOT NULL AND founded_year > 1990`);
  const topReasonsStmt = db.prepare(`SELECT primary_failure_reason as reason, COUNT(*) as count ${baseQuery} AND primary_failure_reason IS NOT NULL GROUP BY primary_failure_reason ORDER BY count DESC LIMIT 3`);
  const casualties2026Stmt = db.prepare(`SELECT name, slug, primary_failure_reason as reason ${baseQuery} AND shut_down_year = 2026 ORDER BY total_raised_usd DESC LIMIT 5`);
  const topDomainsStmt = db.prepare(`SELECT primary_category as category, COUNT(*) as count, SUM(total_raised_usd) as capital ${baseQuery} AND primary_category IS NOT NULL GROUP BY primary_category ORDER BY capital DESC LIMIT 4`);

  try {
    const totalResult = totalStmt.get() as { count: number };
    const capitalResult = capitalStmt.get() as { total: number };
    const lifespanResult = lifespanStmt.get() as { avgLifespan: number };
    const topReasons = topReasonsStmt.all() as { reason: string; count: number }[];
    const casualties2026 = casualties2026Stmt.all() as { name: string; slug: string; reason: string }[];
    const topDomains = topDomainsStmt.all() as { category: string; count: number; capital: number }[];

    return {
      totalStartups: totalResult?.count || 0,
      totalCapitalLost: capitalResult?.total || 0,
      averageLifespan: lifespanResult?.avgLifespan ? Math.round(lifespanResult.avgLifespan * 10) / 10 : 0,
      topReasons,
      casualties2026,
      topDomains
    };
  } catch (e) {
    console.error("Failed to fetch Indian stats", e);
    return { totalStartups: 0, totalCapitalLost: 0, averageLifespan: 0, topReasons: [], casualties2026: [], topDomains: [] };
  }
}
