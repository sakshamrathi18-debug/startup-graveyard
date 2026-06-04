import { Startup } from '../src/types/database';

const OLLAMA_API = 'http://localhost:11434/api/generate';
const MODEL = 'gemma:4b'; // As mentioned by user: "I have ulama installed and gemma 4 e4b in it"
// Note: user said "gemma 4 e4b", but the model name in Ollama is typically "gemma" or "gemma:2b" / "gemma:7b". I will use "gemma" by default. 

const SCHEMA_PROMPT = `
You are an expert financial analyst and data extractor. 
Extract the following information about the failed startup from the provided article text.
Return the result strictly as a valid JSON object matching this TypeScript interface, with no markdown formatting or other text:

interface StartupExtraction {
  name: string; // The startup name
  slug: string; // lowercase, url-friendly version of name
  one_line_epitaph: string; // A short, witty 1-line reason for death
  one_line_summary: string; // Factual 1-sentence summary of what they did and why they died
  founded_year: number | null;
  shut_down_year: number;
  total_raised_usd: number; // e.g. 5000000 (just the number)
  last_stage: "Pre-seed" | "Seed" | "Series A" | "Series B" | "Series C+" | "Bootstrap" | "Unknown";
  hq_city: string | null;
  hq_country: string | null;
  hq_country_code: string | null; // e.g. "US"
  region: "North America" | "Europe" | "Asia" | "South America" | "Africa" | "Oceania" | "Middle East" | null;
  primary_category: "AI Consumer" | "AI B2B SaaS" | "AI Healthcare" | "AI Fintech" | "AI Education" | "AI Legal" | "AI Infra" | "AI Hardware" | "AI Media" | "AI Other";
  business_model: "B2C" | "B2B" | "B2B2C" | "Marketplace" | "SaaS" | "API" | "Hardware" | "Other" | null;
  failure_reasons: string[]; // Select from: "distribution", "runway", "unit-economics", "wrong-icp", "no-pmf", "over-expansion", "regulatory", "founder-conflict", "competition", "technical-failure", "market-timing", "talent", "culture", "pricing", "burn-rate", "pivot-burn", "fraud", "other"
  primary_failure_reason: string; // The primary reason from the list above
  death_type: "Shut down" | "Acquired (acqui-hire)" | "Pivoted away" | "Bankrupt" | "Stealth" | "Unknown";
  post_mortem_text: string; // A 150-300 word summary of why they failed based on the article
  founder_quote: string | null; // Any quote from founders, if present
  counterintuitive_lesson: string | null; // A non-obvious lesson from their failure
  pattern_tags: string[]; // 3-4 short tags like "#healthcare", "#runway"
}

If any data is not present in the article, use null for nullable fields or make a best-guess estimate if reasonable. If total raised is unknown, use 0.

CRITICAL: Some articles might be false positives (e.g., "DeepSeek closes the gap" or "Anthropic acquired a company"). If the article is about a healthy, living company, or does NOT describe a startup failing, shutting down, going bankrupt, or having a distress-sale/acqui-hire, you MUST return a JSON object with name: "FALSE_POSITIVE", slug: "false-positive", and death_type: "Unknown". Do NOT extract healthy companies.

ONLY return JSON.

ARTICLE TEXT:
`;

export async function extractStartupData(articleText: string, modelName: string = 'gemma'): Promise<Partial<Startup> | null> {
  const prompt = SCHEMA_PROMPT + articleText;

  try {
    const response = await fetch(OLLAMA_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: modelName,
        prompt: prompt,
        stream: false,
        format: 'json', // Ollama supports strict JSON output
      }),
    });

    if (!response.ok) {
      console.error('Ollama API error:', response.status, response.statusText);
      return null;
    }

    const data = await response.json();
    let jsonString = data.response;
    
    // Sometimes LLMs wrap JSON in markdown blocks even when told not to
    jsonString = jsonString.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const extractedData = JSON.parse(jsonString);
    return extractedData;
  } catch (error) {
    console.error('Error extracting data with LLM:', error);
    return null;
  }
}
