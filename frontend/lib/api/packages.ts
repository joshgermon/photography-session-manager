export type SessionType = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  packages: Package[]
}

export type Package = {
  id: number;
  name: string;
  durationInMinutes: number;
  price: string;
  createdAt: string;
};

export async function getSessionTypesAndPackages() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/v1/offerings`,
  );
  const data = await res.json();
  return data.data as SessionType[];
}
