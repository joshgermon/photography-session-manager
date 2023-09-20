import { db } from "@/db/client";
import { SessionType, SessionPackage } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  const sessionTypes = await db.query.sessionType.findMany({
    with: { packages: true },
  });
  return NextResponse.json(sessionTypes);
}

export type SessionTypesWithPackages = SessionType & {
  packages: SessionPackage[];
};
