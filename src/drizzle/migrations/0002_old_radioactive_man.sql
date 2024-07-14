CREATE TABLE IF NOT EXISTS "customer" (
	"customer_id" text PRIMARY KEY NOT NULL,
	"company_name" text,
	"contact_name" text,
	"contact_title" text,
	"address" text,
	"city" text,
	"region" text,
	"postal_code" text,
	"country" text,
	"phone" text,
	"fax" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "supplier" (
	"id" serial PRIMARY KEY NOT NULL,
	"supplier_id" integer,
	"company_name" text,
	"contact_name" text,
	"contact_title" text,
	"address" text,
	"city" text,
	"region" text,
	"postal_code" text,
	"country" text,
	"phone" text,
	"fax" text,
	"home_page" text
);
