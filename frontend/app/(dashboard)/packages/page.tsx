"use client";

import { ButtonLink } from "@/components/ui/button";
import { getSessionTypesAndPackages } from "@/lib/api/packages";
import { useQuery } from "@tanstack/react-query";
import { LuPackage } from "react-icons/lu";

export default function Packages() {
  const query = useQuery({ queryKey: ["offerings"], queryFn: getSessionTypesAndPackages });

  if (query.isLoading) return "Loading...";
  if (query.error) return "An error has occurred: " + query.error.message;

  const sessionTypes = query.data;

  return (
    <main className="flex flex-col space-y-6">
        <header className="flex justify-between items-center">
          <div>
            <h2 className="font-semibold text-lg text-base-200">
              Manage Your Packages
            </h2>
            <p className="text-base-300 text-sm">
              This is your list of bookings where you can manage them.
            </p>
          </div>
        </header>
        <div className="py-4 flex flex-col space-y-4 w-full">
          {sessionTypes?.length ? sessionTypes.map((st) => (
          <div className="rounded-lg border border-base-border bg-surface text-base w-full">
            <div className="flex flex-col lg:flex-row px-5 py-5 space-x-4 text-sm">
              <div className="flex-1 flex flex-col">
                <p className="font-semibold text-base-200"> {st.name} </p>
                <p className="text-base-500">{st.description}</p>
              </div>

              <div className="flex-1 flex justify-end space-x-2">
                <ButtonLink href={`session-types/${st.id}`} variant="outline">
                  Edit
                </ButtonLink>
              </div>
            </div>
          </div>
          )) :(
          <div className="rounded-lg border border-base-border bg-surface text-base w-full px-4 py-10 flex justify-center">
            <div className="text-center flex flex-col items-center space-y-4 justify-center">
              <div className="bg-base-900 rounded-full w-fit p-3">
                <LuPackage size={32} color="#333333"/>
              </div>
              <h3 className="font-semibold text-lg">You have no Session Types</h3>
            <p className="text-base-300 text-sm">There are no session types created.<br/>You can create one above to begin.</p>
            </div>
          </div>
          ) }
        </div>
    </main>
  );
}
