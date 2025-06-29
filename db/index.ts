import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
	host: "localhost",
	port: 5432,
	user: "your_username",
	password: "your_password",
	database: "your_database_name",
});

export const db = drizzle(pool);