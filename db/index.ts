import Database from "better-sqlite3";
import { drizzle, type BetterSQLite3Database } from "drizzle-orm/better-sqlite3";

// ✅ Create the DB instance and export it
const sqlite = new Database("sqlite.db");
export const db: BetterSQLite3Database = drizzle(sqlite);