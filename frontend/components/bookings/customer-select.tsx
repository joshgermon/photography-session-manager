import { useDebounce } from "@/lib/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { forwardRef, useState } from "react";
import {
  ComboBox,
  Group,
  Key,
  ListBox,
  ListBoxItem,
  Popover,
} from "react-aria-components";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Customer } from "@/app/(dashboard)/customers/page";
import { Label } from "../ui/label";
import { LuChevronsUpDown } from "react-icons/lu";

async function getFilteredCustomers() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/v1/customers`,
  );
  const data = await res.json();
  return data.data as Customer[];
}

/** ================== IMPORTANT NOTE =======================
 * Currently this component is a bit of a mess
 * it needs to be completely redesigned and reconsidered
 * especially considering it's loading all Customers
 * and then filtering them on the client combobox
 * which obviously isn't great */


export const CustomerSelectInput = forwardRef(({ onSelect, ...props }, ref) => {
  const [filterText, setFilterText] = useState("");
  const [customer, setCustomer] = useState<number | null>(null);

  // Debounce the user input
  const debounceDelay = 150;
  const debouncedFilter = useDebounce<string>(filterText, debounceDelay);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["customers"],
    queryFn: () => getFilteredCustomers(),
  });

  function handleFilter(value: string) {
    setFilterText(value);
  }

  function handleSelect(customerID: Key) {
    if (customerID) {
      const cst = data?.find((cx) => cx.id === customerID);
      onSelect(customerID);
      setFilterText(cst ? `${cst?.firstName} ${cst?.lastName}` : "");
      setCustomer(customerID.valueOf() as number);
    }
  }

  return (
    <ComboBox
      className="group flex flex-col"
      inputValue={filterText}
      onInputChange={handleFilter}
      selectedKey={customer}
      onSelectionChange={handleSelect}
      menuTrigger="focus"
      shouldFocusWrap
      defaultItems={data}
    >
      <Label>Customer</Label>
      <Group className="flex rounded-lg bg-surface border border-base-900 bg-opacity-90 focus-within:bg-opacity-100 transition focus-visible:ring-2 focus-visible:ring-primary">
        <Input className="rounded-none border-none" placeholder="Select customer" />
        <Button
          variant="ghost"
          className="h-full border-base-900 bg-transparent rounded-r-lg"
        >
          <LuChevronsUpDown size={21} color="#707070" />
        </Button>
      </Group>
      <Popover className="max-h-60 w-[--trigger-width] overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black/5 entering:animate-in entering:fade-in exiting:animate-out exiting:fade-out">
        <ListBox
          className="max-h-[300px] overflow-y-auto p-1 overflow-x-hidden"
          items={data}
          renderEmptyState={() => "No items found."}
        >
          {(cx) => (
            <ListBoxItem
              id={cx.id}
              textValue={`${cx.firstName} ${cx.lastName}`}
              className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 selected:bg-primary focus-visible:ring-1 focus-visible:ring-primary"
            >
              {cx.firstName} {cx.lastName}
            </ListBoxItem>
          )}
        </ListBox>
      </Popover>
    </ComboBox>
  );
});

CustomerSelectInput.displayName = "CustomerSelectInput";
