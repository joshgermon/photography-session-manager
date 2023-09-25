import { useQueryClient } from "@tanstack/react-query";
import { DeleteIcon } from "lucide-react";

export function DeleteButton(props: { id: number }) {
  const queryClient = useQueryClient();

  return (
    <DeleteIcon
      onClick={async () => {
        await fetch(`/api/sessions/${props.id}`, { method: "DELETE" });
        queryClient.invalidateQueries({ queryKey: ["sessions"] });
      }}
    />
  );
}
