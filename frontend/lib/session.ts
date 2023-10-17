import { db } from "@/db/client";
import {
  Client,
  Session,
  SessionPackage,
  SessionType,
  session,
  sessionPackage,
  sessionType,
} from "@/db/schema";
import { useQueryClient } from "@tanstack/react-query";
import { eq } from "drizzle-orm";

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

export async function getSessionPackage(id: number) {
  const result = await db
    .selectDistinct()
    .from(sessionPackage)
    .where(eq(sessionPackage.id, id))
    .leftJoin(sessionType, eq(sessionType.id, sessionPackage.sessionTypeId));
  return result[0];
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

export async function deleteSession(id: number) {}
