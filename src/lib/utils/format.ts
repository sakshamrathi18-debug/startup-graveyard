/**
 * Utility functions for formatting data across the site
 */

/**
 * Format a USD amount into a human-readable string
 * e.g., 850000000 → "$850M", 1200000000 → "$1.2B", 5000000 → "$5M"
 */
export function formatMoney(amount: number): string {
  if (amount === 0) return '$0';
  if (amount >= 1_000_000_000) {
    const billions = amount / 1_000_000_000;
    return `$${billions % 1 === 0 ? billions.toFixed(0) : billions.toFixed(1)}B`;
  }
  if (amount >= 1_000_000) {
    const millions = amount / 1_000_000;
    return `$${millions % 1 === 0 ? millions.toFixed(0) : millions.toFixed(1)}M`;
  }
  if (amount >= 1_000) {
    const thousands = amount / 1_000;
    return `$${thousands % 1 === 0 ? thousands.toFixed(0) : thousands.toFixed(1)}K`;
  }
  return `$${amount.toLocaleString()}`;
}

/**
 * Format a date string or year into readable format
 * e.g., "2023-02-15" → "February 2023", or just a year → "2023"
 */
export function formatDate(dateStr: string | null): string {
  if (!dateStr) return 'Unknown';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

/**
 * Show years active range
 * e.g., (2012, 2023) → "2012–2023"
 */
export function yearsActive(founded: number | null, shutdown: number | null): string {
  if (!founded && !shutdown) return 'Unknown';
  if (founded && !shutdown) return `${founded}–present`;
  if (!founded && shutdown) return `?–${shutdown}`;
  return `${founded}–${shutdown}`;
}

/**
 * Format a failure reason slug into a readable label
 * e.g., "no-pmf" → "No PMF", "unit-economics" → "Unit Economics"
 */
export function formatFailureReason(reason: string): string {
  const map: Record<string, string> = {
    'distribution': 'Distribution',
    'runway': 'Runway',
    'unit-economics': 'Unit Economics',
    'wrong-icp': 'Wrong ICP',
    'no-pmf': 'No PMF',
    'over-expansion': 'Over-expansion',
    'regulatory': 'Regulatory',
    'founder-conflict': 'Founder Conflict',
    'competition': 'Competition',
    'technical-failure': 'Technical Failure',
    'market-timing': 'Market Timing',
    'talent': 'Talent',
    'culture': 'Culture',
    'pricing': 'Pricing',
    'burn-rate': 'Burn Rate',
    'pivot-burn': 'Pivot Burn',
    'fraud': 'Fraud',
    'other': 'Other',
  };
  return map[reason] || reason.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

/**
 * Format a category into a short label without "AI " prefix
 * e.g., "AI Healthcare" → "Healthcare"
 */
export function formatCategory(category: string | null): string {
  if (!category) return 'Unknown';
  return category.replace(/^AI\s+/i, '');
}

/**
 * Truncate text to a max length with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '…';
}

/**
 * Generate a relative time string
 * e.g., "2 years ago", "6 months ago"
 */
export function timeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 1) return 'Today';
  if (diffDays < 30) return `${diffDays}d ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
  return `${Math.floor(diffDays / 365)}y ago`;
}
