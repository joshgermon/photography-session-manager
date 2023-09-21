import { db } from "@/db/client";
import {
  Client,
  Session,
  SessionPackage,
  SessionType,
  session,
} from "@/db/schema";

export type SessionData = Session & {
  client: Client;
  sessionPackage: (SessionPackage & { sessionType: SessionType }) | null;
};

export async function getSessions(): Promise<SessionData[]> {
  const sessions = await db.query.session.findMany({
    with: {
      sessionPackage: { with: { sessionType: true } },
      client: true,
    },
  });
  return sessions;
}

export async function createSession(newSession: any) {
  delete newSession.sessionTypeId;
  console.log(newSession);
  const newSessionId = await db
    .insert(session)
    .values(newSession)
    .returning({ id: session.id });
  return newSessionId;
}
