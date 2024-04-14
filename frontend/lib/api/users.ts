import { cookies } from "next/headers";

export async function userHasValidSession() {
  console.log(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/v1/auth/session`);
  const res = await fetch(
    `http://api:3333/v1/auth/session`,
    { headers: { Cookie: cookies().toString() } }
  );
  return res.ok
}
