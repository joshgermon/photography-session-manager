import { date, integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { InferModel, relations } from "drizzle-orm";

export const client = pgTable("client", {
  id: serial("client_id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name"),
  email: text("email_address").unique().notNull(),
  mobileNo: text("mobile_number").unique(),
});

export type Client = InferModel<typeof client>;

export const clientRelations = relations(client, ({ many }) => ({
  sessions: many(session),
}));

export const session = pgTable("client_session", {
  id: serial("session_id").primaryKey(),
  clientId: integer("client_id")
    .references(() => client.id)
    .notNull(),
  sessionPackageId: integer("session_package_id").references(
    () => sessionPackage.id,
  ),
  date: date("session_date").notNull(),
  location: text("location"),
  createdAt: date("created_at").defaultNow(),
});

export type Session = InferModel<typeof session>;

export const sessionRelations = relations(session, ({ one }) => ({
  client: one(client, {
    fields: [session.clientId],
    references: [client.id],
  }),
  sessionPackage: one(sessionPackage, {
    fields: [session.sessionPackageId],
    references: [sessionPackage.id],
  }),
}));

export const sessionType = pgTable("session_type", {
  id: serial("session_type_id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: date("created_at").defaultNow(),
});

export const sessionTypeRelations = relations(sessionType, ({ many }) => ({
  packages: many(sessionPackage),
}));

export type SessionType = InferModel<typeof sessionType>;

export const sessionPackage = pgTable("session_package", {
  id: serial("session_package_id").primaryKey(),
  name: text("name").notNull(),
  sessionTypeId: integer("session_type_id")
    .references(() => sessionType.id)
    .notNull(),
  durationInMinutes: integer("duration_in_minutes"),
  price: integer("price").notNull(),
  currencyCode: text("currency_code", { enum: ["AUD"] }).default("AUD"),
  createdAt: date("created_at").defaultNow(),
});

export const sessionPackageRelations = relations(sessionPackage, ({ one }) => ({
  sessionType: one(sessionType, {
    fields: [sessionPackage.sessionTypeId],
    references: [sessionType.id],
  }),
}));

export type SessionPackage = InferModel<typeof sessionPackage>;
