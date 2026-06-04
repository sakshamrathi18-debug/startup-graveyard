export type StartupStatus = 'draft' | 'in_review' | 'published' | 'archived';
export type DeathType = 'Shut down' | 'Acquired (acqui-hire)' | 'Pivoted away' | 'Bankrupt' | 'Stealth' | 'Unknown';
export type LastStage = 'Pre-seed' | 'Seed' | 'Series A' | 'Series B' | 'Series C+' | 'Bootstrap' | 'Unknown';
export type PrimaryCategory =
  | 'AI Consumer' | 'AI B2B SaaS' | 'AI Healthcare' | 'AI Fintech'
  | 'AI Education' | 'AI Legal' | 'AI Infra' | 'AI Hardware'
  | 'AI Media' | 'AI Other';
export type BusinessModel = 'B2C' | 'B2B' | 'B2B2C' | 'Marketplace' | 'SaaS' | 'API' | 'Hardware' | 'Other';
export type Region = 'North America' | 'Europe' | 'Asia' | 'South America' | 'Africa' | 'Oceania' | 'Middle East';

export type FailureReason =
  | 'distribution' | 'runway' | 'unit-economics' | 'wrong-icp'
  | 'no-pmf' | 'over-expansion' | 'regulatory' | 'founder-conflict'
  | 'competition' | 'technical-failure' | 'market-timing' | 'talent'
  | 'culture' | 'pricing' | 'burn-rate' | 'pivot-burn' | 'fraud' | 'other';

export interface Startup {
  id: string;
  name: string;
  slug: string;
  one_line_epitaph: string | null;
  one_line_summary: string | null;

  founded_year: number | null;
  founded_date: string | null;
  shut_down_date: string | null;
  shut_down_year: number | null;

  total_raised_usd: number;
  last_stage: LastStage | null;
  burn_rate_monthly_usd: number | null;
  runway_at_death_months: number | null;

  hq_city: string | null;
  hq_country: string | null;
  hq_country_code: string | null;
  hq_lat: number | null;
  hq_lng: number | null;
  region: Region | null;

  primary_category: PrimaryCategory | null;
  sub_category: string | null;
  business_model: BusinessModel | null;
  target_audience: string | null;

  failure_reasons: FailureReason[];
  primary_failure_reason: FailureReason | null;
  death_type: DeathType | null;

  post_mortem_text: string | null;
  founder_quote: string | null;
  counterintuitive_lesson: string | null;

  pattern_tags: string[];

  source_urls: string[];
  source_quality_score: number | null;

  ai_confidence_score: number | null;
  status: StartupStatus;
  featured: boolean;

  created_at: string;
  updated_at: string;
  published_at: string | null;
}

export interface Source {
  id: string;
  startup_id: string;
  url: string;
  source_type: 'News' | 'Founder interview' | 'Crunchbase' | 'Wikipedia' | 'Tweet' | 'Blog post' | 'Podcast' | 'Other';
  title: string | null;
  author: string | null;
  published_date: string | null;
  credibility_score: number | null;
  excerpt: string | null;
}

export interface PatternCluster {
  id: string;
  cluster_name: string;
  cluster_slug: string;
  description: string | null;
  category: string | null;
  region: string | null;
  year_range: string | null;
  startup_count: number;
  total_capital_lost_usd: number;
  avg_runway_months: number | null;
  common_failure_reasons: FailureReason[];
  top_pattern_tags: string[];
  key_lessons: string[];
  created_at: string;
  updated_at: string;
}

export interface NewsletterIssue {
  id: string;
  issue_number: number;
  subject_line: string;
  preview_text: string | null;
  published_date: string | null;
  status: 'draft' | 'scheduled' | 'sent';
  featured_startups: string[];
  pattern_of_week_id: string | null;
  quote_of_the_week: string | null;
  counterintuitive_take: string | null;
  subscriber_count: number | null;
  open_rate: number | null;
  click_rate: number | null;
  body_html: string | null;
  created_at: string;
  sent_at: string | null;
}

export interface Submission {
  id: string;
  startup_name: string;
  submitter_email: string | null;
  submitter_name: string | null;
  source_url: string | null;
  notes: string | null;
  status: 'pending' | 'approved' | 'rejected' | 'duplicate';
  assigned_startup_id: string | null;
  created_at: string;
}
