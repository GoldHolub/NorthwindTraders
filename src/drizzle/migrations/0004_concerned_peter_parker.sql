CREATE TABLE IF NOT EXISTS "sql_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_id" text NOT NULL,
	"query" text NOT NULL,
	"params" jsonb NOT NULL,
	"duration_ms" integer NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP
);
