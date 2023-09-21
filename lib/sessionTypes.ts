import { db } from "@/db/client";
import { SessionType, SessionPackage } from "@/db/schema";

export async function getSessionTypes() {
  const sessionTypes = await db.query.sessionType.findMany({
    with: { packages: true },
  });
  return sessionTypes;
}

export type SessionTypesWithPackages = SessionType & {
  packages: SessionPackage[];
};
