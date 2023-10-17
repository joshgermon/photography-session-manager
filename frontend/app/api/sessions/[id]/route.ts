import { db } from "@/db/client";
import { session } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export const revalidate = true;

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const path = request.nextUrl.searchParams.get("path");

  console.log(path);
  const id = Number(params.id);
  await db.delete(session).where(eq(session.id, id));
  return new Response(null, { status: 204 });
}
