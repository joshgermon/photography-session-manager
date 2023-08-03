import { db } from "@/db/client";
import { NextResponse } from "next/server";

export async function GET() {
  const sessionTypes = await db.query.sessionType.findMany({
    with: { packages: true },
  });
  return NextResponse.json(sessionTypes);
}
