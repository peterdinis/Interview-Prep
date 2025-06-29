import { defineConfig } from "drizzle-kit";

export default defineConfig({
	out: "./drizzle",
	schema: "./db/schema.ts",
	dialect: "postgresql", // ✅ change from "sqlite" to "postgresql"
	dbCredentials: {
		host: "localhost",
		port: 5432,
		user: "your_username",
		password: "your_password",
		database: "your_database_name",
	},
});