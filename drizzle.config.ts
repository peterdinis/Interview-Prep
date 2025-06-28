import { defineConfig } from "drizzle-kit";

// TODO: Before deploy change for postgresql

export default defineConfig({
	out: "./drizzle",
	schema: "./db/schema.ts",
	dialect: "sqlite",
	dbCredentials: {
		url: "sqlite.db",
	},
});
