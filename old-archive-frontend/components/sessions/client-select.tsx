import { useDebounce } from "@/hooks/debounce";
import { Input } from "../ui/input";
import { ChangeEvent, useEffect, useState } from "react";
import type { Client } from "@/db/schema";
import { IconX } from "@tabler/icons-react";

type ClientSelectProps = {
    onSelect: (id: number) => void;
};

export function ClientSelect(props: ClientSelectProps) {
    const [userInput, setUserInput] = useState("");
    const [suggestions, setSuggestions] = useState<Client[]>([]);
    const [active, setActive] = useState(0);
    const [selected, setSelected] = useState<Client | null>(null);
    const [showAutocomplete, setShowAutocomplete] = useState(false);

    // Debounce the user input
    const debounceDelay = 150;
    const debouncedInput = useDebounce<string>(userInput, debounceDelay);

    function onChange(e: ChangeEvent<HTMLInputElement>) {
        const input = e.target.value;
        setUserInput(input);
        if (input === "") {
            setShowAutocomplete(false);
        } else {
            setShowAutocomplete(true);
        }
    }

    function onSelect(item: Client) {
        props.onSelect(item.id);
        setShowAutocomplete(false);
        setUserInput(`${item.firstName} ${item.lastName}`);
        setSelected(item);
    }

    function reset() {
        setSelected(null);
        setUserInput("");
        setShowAutocomplete(false);
    }

    function onKeyDown(e: React.KeyboardEvent) {
        if (e.key === "ArrowDown" && active < suggestions.length - 1) {
            setActive(active + 1);
        } else if (e.key === "ArrowUp" && active > 0) {
            setActive(active - 1);
        } else if (e.key === "Enter") {
            onSelect(suggestions[active]);
        }
    }

    async function fetchSuggestions(input: string) {
        const filterClients = await fetch(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/v1/customers?search=${input}`,
        );
        const filteredClients = (await filterClients.json()).data as Client[];

        setSuggestions(filteredClients);
    }

    useEffect(() => {
        if (debouncedInput.length > 0) {
            fetchSuggestions(debouncedInput);
        }
    }, [debouncedInput]);

    return (
        <div className="relative">
            <div className="flex space-x-2 items-center">
                <Input
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={userInput}
                    type="text"
                    placeholder="Search Clients..."
                    disabled={Boolean(selected)}
                />
                {selected && <IconX onClick={reset} />}
            </div>
            {showAutocomplete && (
                <div className="absolute shadow-md rounded-md border bg-popover -bottom-2 left-0 border-b-input bg-white w-full transform translate-y-full">
                    {suggestions.length > 0 ? (
                        suggestions.map((item, i) => (
                            <div
                                tabIndex={0}
                                onClick={() => onSelect(item)}
                                onMouseEnter={() => setActive(i)}
                                className={`w-full px-3 py-2 text-sm text-gray-600 focus:bg-slate-200 hover:bg-slate-200 ${active === i && "bg-slate-200"
                                    }`}
                                key={item.id}
                            >
                                {item.firstName} {item.lastName}
                            </div>
                        ))
                    ) : (
                        <div className="w-full px-3 py-2 text-sm text-gray-600">
                            No items found.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
