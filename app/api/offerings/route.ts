import { db } from "@/db/client";
import { offering } from "@/db/schema";
import { NextResponse } from "next/server";

const DEFAULT_PAGE_LIMIT = 20;

export async function GET(request: Request) {
  const offerings = await db.select().from(offering).limit(DEFAULT_PAGE_LIMIT);
  return NextResponse.json(offerings);
}
