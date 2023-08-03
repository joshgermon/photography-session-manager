CREATE TABLE IF NOT EXISTS "client" (
	"client_id" serial PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text,
	"email_address" text,
	"mobile_number" text,
	CONSTRAINT "client_email_address_unique" UNIQUE("email_address"),
	CONSTRAINT "client_mobile_number_unique" UNIQUE("mobile_number")
);
