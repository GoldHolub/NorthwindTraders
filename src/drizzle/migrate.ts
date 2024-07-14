import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from "postgres";
import dotenv from 'dotenv';

dotenv.config();
const migrationClient = postgres(process.env.DATABASE_URL!, {max: 1});
//const migrationClient = postgres('postgres://postgres:FSf5Qoi7hLdS7aP@northwindtraders-icy-dust-1929-db.flycast:5432', {max: 1});

async function main() {
    await migrate(drizzle(migrationClient), {
        migrationsFolder: './src/drizzle/migrations'
    });

    migrationClient.end();
}

main();
