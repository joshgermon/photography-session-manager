import { db } from "@/db/client";
import { client } from "@/db/schema";
import { ilike, or } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

const DEFAULT_PAGE_LIMIT = 50;
const DEFAULT_FILTER_LIMIT = 10;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const nameFilter = searchParams.get("filter");
  const filterLimit = Number(searchParams.get("limit")) ?? DEFAULT_FILTER_LIMIT;

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
    return NextResponse.json(filteredClients);
  }

  const clients = await db.select().from(client).limit(DEFAULT_PAGE_LIMIT);
  return NextResponse.json(clients);
}

export async function POST(request: Request) {
  const newClient = await request.json();
  console.log(newClient);
  const newClientId = await db
    .insert(client)
    .values(newClient)
    .returning({ id: client.id });
  revalidateTag("clients");
  return NextResponse.json(newClientId);
}
