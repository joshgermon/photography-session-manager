ALTER TABLE "session_package" DROP CONSTRAINT "session_package_session_type_id_sessionType_session_type_id_fk";
--> statement-breakpoint
ALTER TABLE "sessionType" RENAME TO "session_type";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session_package" ADD CONSTRAINT "session_package_session_type_id_session_type_session_type_id_fk" FOREIGN KEY ("session_type_id") REFERENCES "session_type"("session_type_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
