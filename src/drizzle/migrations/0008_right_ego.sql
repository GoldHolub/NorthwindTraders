CREATE TABLE IF NOT EXISTS "ipv4_data" (
	"from_ip" text PRIMARY KEY NOT NULL,
	"to_ip" text NOT NULL,
	"country_code" text,
	"country_name" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ipv6_data" (
	"from_ip" text PRIMARY KEY NOT NULL,
	"to_ip" text NOT NULL,
	"country_code" text,
	"country_name" text,
	"region_name" text,
	"city_name" text
);
