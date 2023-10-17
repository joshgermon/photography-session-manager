CREATE TABLE IF NOT EXISTS "session_package" (
	"session_package_id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"session_type_id" integer NOT NULL,
	"duration_in_minutes" integer,
	"price" integer NOT NULL,
	"currency_code" text DEFAULT 'AUD',
	"created_at" date DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sessionType" (
	"session_type_id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"created_at" date DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "client_session" DROP CONSTRAINT "client_session_offering_id_offering_offering_id_fk";
--> statement-breakpoint
DROP TABLE "offering";--> statement-breakpoint
ALTER TABLE "client_session" RENAME COLUMN "offering_id" TO "session_package_id";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "client_session" ADD CONSTRAINT "client_session_session_package_id_session_package_session_package_id_fk" FOREIGN KEY ("session_package_id") REFERENCES "session_package"("session_package_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session_package" ADD CONSTRAINT "session_package_session_type_id_sessionType_session_type_id_fk" FOREIGN KEY ("session_type_id") REFERENCES "sessionType"("session_type_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
