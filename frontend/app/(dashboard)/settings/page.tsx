import { Button, ButtonLink } from "@/components/ui/button";

export default async function Settings({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
} ) {

  if (searchParams?.code) {
    console.log("GOOGLE SIGN IN COMPLETE**");
    const code = searchParams.code as string;

    const authParams = new URLSearchParams();
    authParams.append('code', code);
    const authGoogleEndpoint = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/v1/auth/gcal?${authParams.toString()}`;
    console.log(authGoogleEndpoint);
    const res = await fetch(authGoogleEndpoint);
    if (res.ok) {
      console.log("OK");
    }
    console.log("FAIL");
  }

  const redirectUri = encodeURIComponent('http://localhost:3000/settings');
  const responseType = 'code';
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const scope = encodeURIComponent('https://www.googleapis.com/auth/calendar');
  const state = "googleSignIn=true";

  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=${responseType}&scope=${scope}&redirect_uri=${redirectUri}&client_id=${clientId}&state=${state}`;

  return (
    <main className="flex flex-col space-y-4">
      <header className="flex justify-between items-center pb-4">
        <div>
          <h2 className="font-semibold text-lg text-base-200">
            Your Settings
          </h2>
          <p className="text-base-300 text-sm">
            This is your list of bookings where you can manage them.
          </p>
        </div>
      </header>
      <div className="flex space-x-2">
        <Button className="bg-base-900">General</Button>
        <Button variant="ghost">Account</Button>
        <Button variant="ghost">Other</Button>
      </div>
      <div className="flex-col space-y-2">
        <div className="rounded-lg border border-base-border bg-surface text-base">
          <div className="p-4">
            <h2 className="font-semibold">General</h2>
            <p className="text-base-300 text-sm">
              This is your list of bookings where you can manage them.
            </p>
            <div className="p-4">
              <ButtonLink href={googleAuthUrl}>Connect your Google Calendar</ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
