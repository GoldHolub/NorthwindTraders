import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  schema: "src/drizzle/schema.ts",
  out: './src/drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    //url: 'postgres://postgres:787898@localhost:5432/northwind',
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});