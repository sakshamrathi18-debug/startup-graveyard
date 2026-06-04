import { Startup } from '../types/database';
import { db } from '../lib/db';

export function getPublishedStartups(): Startup[] {
  try {
    const stmt = db.prepare(`SELECT * FROM startups WHERE status = 'published' ORDER BY shut_down_year DESC`);
    const rows = stmt.all() as any[];
    
    // Parse JSON strings back to arrays
    return rows.map(row => ({
      ...row,
      failure_reasons: JSON.parse(row.failure_reasons || '[]'),
      pattern_tags: JSON.parse(row.pattern_tags || '[]'),
      source_urls: JSON.parse(row.source_urls || '[]'),
      featured: Boolean(row.featured)
    })) as Startup[];
  } catch (error) {
    console.error('Database query failed:', error);
    return [];
  }
}

export function getFeaturedStartups(): Startup[] {
  return getPublishedStartups().filter(s => s.featured);
}

export function getStartupBySlug(slug: string): Startup | undefined {
  return getPublishedStartups().find(s => s.slug === slug);
}
