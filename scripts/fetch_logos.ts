import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, '../graveyard.db');
const logosDir = path.resolve(__dirname, '../public/logos');

if (!fs.existsSync(logosDir)) {
  fs.mkdirSync(logosDir, { recursive: true });
}

const db = new Database(dbPath);

const downloadImage = (url: string, dest: string): Promise<boolean> => {
  return new Promise((resolve) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const file = fs.createWriteStream(dest);
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve(true);
        });
      } else {
        response.resume(); 
        resolve(false);
      }
    }).on('error', () => {
      fs.unlink(dest, () => {}); 
      resolve(false);
    });
  });
};

const fetchLogos = async () => {
  console.log("Starting logo ingestion...");
  
  const startups = db.prepare(`SELECT slug, name FROM startups WHERE hq_country = 'India'`).all() as {slug: string, name: string}[];
  
  const tlds = ['.in', '.ai', '.co.in', '.com', '.io', '.tech'];

  for (const startup of startups) {
    const destPath = path.join(logosDir, `${startup.slug}.png`);
    
    // Skip if we already downloaded it
    if (fs.existsSync(destPath)) {
      continue;
    }

    console.log(`\n-> Searching logo for ${startup.name}...`);
    let found = false;

    // We strip common stop words and try to form a domain
    const cleanName = startup.name.toLowerCase().replace(/[^a-z0-9]/g, '');

    for (const tld of tlds) {
      const url = `https://logo.clearbit.com/${cleanName}${tld}`;
      const success = await downloadImage(url, destPath);
      
      if (success) {
        console.log(`  [+] Found logo at ${cleanName}${tld}`);
        found = true;
        break;
      }
    }

    if (!found) {
      console.log(`  [-] Could not find logo. Will use CSS fallback.`);
    }

    // Small delay to avoid API rate limiting
    await new Promise(r => setTimeout(r, 200));
  }

  console.log("\n✅ LOGO INGESTION COMPLETE.");
  db.close();
};

fetchLogos().catch(console.error);
