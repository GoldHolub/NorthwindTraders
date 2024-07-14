CREATE TABLE IF NOT EXISTS "shippers" (
	"shipper_id" integer PRIMARY KEY NOT NULL,
	"company_name" text,
	"phone" text
);
--> statement-breakpoint
DROP TABLE "sql_logs";