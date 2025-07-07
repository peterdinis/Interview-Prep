import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const pool = new Pool({
	connectionString: process.env.DATABASE_URL!,
	application_name: "InterviewPrep",
});

export const db = drizzle(pool, { schema });
