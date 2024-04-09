"use client";

import { useQuery } from "@tanstack/react-query";

async function getOfferings() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/v1/offerings`,
  );
  const data = await res.json();
  return data.data;
}

export default function Packages() {
  const query = useQuery({ queryKey: ["offerings"], queryFn: getOfferings });

  if (query.isLoading) return "Loading...";
  if (query.error) return "An error has occurred: " + query.error.message;

  const allOfferings = query.data;

  return (
    <main className="flex flex-col space-y-6">
      <div className="">
        <div className="pb-5">
          <h2 className="font-medium text-xl text-base">
            Create your Packages
          </h2>
          <p className="text-base-300">
            This is your list of packages and offerings where you can manage
            them.
          </p>
        </div>
        <div className="py-4 flex space-x-6">
          {allOfferings.map((o) => (
            <div className="w-full border border-base-900 px-4 py-4 rounded">
              <h2 className="font-medium text-lg text-base">{o.name}</h2>
              <p className="text-sm text-base-300">{o.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
