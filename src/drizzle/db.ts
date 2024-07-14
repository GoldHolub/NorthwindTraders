// src/db.ts
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schemas from './schema.js';
import dotenv from 'dotenv';

dotenv.config();
const client = postgres(process.env.DATABASE_URL!);
//const client = postgres('postgres://postgres:787898@localhost:5432/northwind');
export const db = drizzle(client, {
    schema: schemas, logger: true
});
