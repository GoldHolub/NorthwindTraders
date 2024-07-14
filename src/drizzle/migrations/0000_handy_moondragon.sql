CREATE TABLE IF NOT EXISTS "employee" (
	"id" serial PRIMARY KEY NOT NULL,
	"employee_id" text,
	"last_name" text,
	"first_name" text,
	"title" text,
	"title_of_courtesy" text,
	"birth_date" timestamp,
	"hire_date" timestamp,
	"address" text,
	"city" text,
	"region" text,
	"postal_code" text,
	"country" text,
	"home_phone" text,
	"extension" text,
	"notes" text,
	"reports_to" text
);
