CREATE TABLE IF NOT EXISTS "orders" (
	"order_id" serial PRIMARY KEY NOT NULL,
	"customer_id" text,
	"employee_id" integer,
	"order_date" timestamp,
	"required_date" timestamp,
	"shipped_date" timestamp,
	"ship_via" integer,
	"freight" numeric,
	"ship_name" text,
	"ship_address" text,
	"ship_city" text,
	"ship_region" text,
	"ship_postal_code" text,
	"ship_country" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders_details" (
	"order_id" integer,
	"product_id" integer,
	"unit_price" numeric,
	"quantity" integer,
	"discount" numeric
);
