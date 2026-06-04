import Database from 'better-sqlite3';
import path from 'path';

// This file must only be imported in Server Components or API routes
const dbPath = path.resolve(process.cwd(), 'graveyard.db');
export const db = new Database(dbPath, { readonly: true });
