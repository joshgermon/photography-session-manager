import { useQueryClient } from "@tanstack/react-query";
import { TrashIcon } from "lucide-react";

export function DeleteButton(props: { id: number }) {
  const queryClient = useQueryClient();

  return (
    <TrashIcon
      color="#9e9e9e"
      size={18}
      onClick={async () => {
        await fetch(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/v1/sessions/${props.id}`,
          { method: "DELETE" },
        );
        queryClient.invalidateQueries({ queryKey: ["sessions"] });
      }}
    />
  );
}
