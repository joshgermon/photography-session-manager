import { db } from "@/db/client";
import { client } from "@/db/schema";
import { eq, ilike, or } from "drizzle-orm";

const DEFAULT_PAGE_LIMIT = 50;
const DEFAULT_FILTER_LIMIT = 10;

export async function getCustomer(id: number) {
  const customer = await db
    .selectDistinct()
    .from(client)
    .where(eq(client.id, id));
  return customer[0];
}

export async function getClients(filter?: { name?: string; limit?: number }) {
  const nameFilter = filter?.name;
  const filterLimit = filter?.limit ?? DEFAULT_FILTER_LIMIT;

  if (nameFilter) {
    const filteredClients = await db
      .select()
      .from(client)
      .where(
        or(
          ilike(client.firstName, `${nameFilter}%`),
          ilike(client.lastName, `${nameFilter}%`),
        ),
      )
      .orderBy(client.firstName, client.lastName)
      .limit(filterLimit);
    return filteredClients;
  }

  const clients = await db.select().from(client).limit(DEFAULT_PAGE_LIMIT);
  return clients;
}

export async function createClient(clientData: any) {
  console.log(clientData);
  const newClientId = await db
    .insert(client)
    .values(clientData)
    .returning({ id: client.id });
  return newClientId;
}
