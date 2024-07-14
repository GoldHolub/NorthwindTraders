CREATE TABLE IF NOT EXISTS "product" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer,
	"product_name" text,
	"supplier_id" integer,
	"category_id" integer,
	"quantity_per_unit" text,
	"unit_price" numeric,
	"units_in_stock" integer,
	"units_on_order" integer,
	"reorder_level" integer,
	"discontinued" integer
);
