import { db } from "@/db/client";
import { session } from "@/db/schema";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  const sessions = await db.query.session.findMany({
    with: {
      sessionPackage: { with: { sessionType: true } },
      client: true,
    },
  });
  return NextResponse.json(sessions);
}

export async function POST(request: Request) {
  const newSession = await request.json();
  delete newSession.sessionTypeId;
  console.log(newSession);
  const newSessionId = await db
    .insert(session)
    .values(newSession)
    .returning({ id: session.id });
  revalidateTag("sessions");
  return NextResponse.json(newSessionId);
}
