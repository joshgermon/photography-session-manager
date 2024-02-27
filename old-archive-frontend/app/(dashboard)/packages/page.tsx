"use client";

import { useQuery } from "@tanstack/react-query";

async function getPackages() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/v1/offerings`,
  );
  const data = await res.json();
  return data;
}

export default function Sessions() {
  const query = useQuery({ queryKey: ["packages"], queryFn: getPackages });
  if (query.isLoading) return "Loading...";
  if (query.error) return "An error has occurred: " + query.error.message;
  const packages = query.data;

  return (
    <div className="w-100">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-1">Your Packages</h2>
        <p className="text-gray-500">
          This is your home dashboard where you can manage everything.
        </p>
      </div>
      {packages.length > 0 ? (
        packages.data?.map((pkg) => (
          <div key={pkg.id} className="rounded-lg">
            <h3>{pkg.name}</h3>
          </div>
        ))
      ) : (
        <p className="text-gray-500">
          You do not have any session types. Add one above.
        </p>
      )}
      <div className=""></div>
    </div>
  );
}
