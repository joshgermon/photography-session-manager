import { db } from "@/db/client";
import { session } from "@/db/schema";
import { sendBookingConfirmationEmail } from "@/lib/notifier";
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
  const newSessionId = await db
    .insert(session)
    .values(newSession)
    .returning({ id: session.id });

  // sendBookingConfirmationEmail(newSession);

  return NextResponse.json(newSessionId);
}
