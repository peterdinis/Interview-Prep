import { mongoMigrateCli } from 'mongo-migrate-ts';
import { db } from './db';

mongoMigrateCli({
  uri: process.env.DATABASE_URL!,
  database: "interviewprep",
  migrationsDir: __dirname,
  migrationsCollection: 'migrations',
});