import * as schema from "./schema";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

export const client = new Pool();

export const db = drizzle(client, { schema });
