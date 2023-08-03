import * as schema from "./schema";
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

const client = new Client();

const connection = await client.connect();
export const db = drizzle(client, { schema });
