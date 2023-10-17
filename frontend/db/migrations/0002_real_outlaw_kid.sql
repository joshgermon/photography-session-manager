CREATE TABLE IF NOT EXISTS "offering" (
	"offering_id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"base_unit_amount" integer NOT NULL,
	"currency_code" text DEFAULT 'AUD',
	"created_at" date DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "client_session" (
	"session_id" serial PRIMARY KEY NOT NULL,
	"client_id" integer NOT NULL,
	"offering_id" integer,
	"session_date" date NOT NULL,
	"duration" integer NOT NULL,
	"location" text,
	"created_at" date DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "client_session" ADD CONSTRAINT "client_session_client_id_client_client_id_fk" FOREIGN KEY ("client_id") REFERENCES "client"("client_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "client_session" ADD CONSTRAINT "client_session_offering_id_offering_offering_id_fk" FOREIGN KEY ("offering_id") REFERENCES "offering"("offering_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
