import React from "react";
import { Select as RACSelect, ComboBox as RACComboBox, SelectValue, FieldError, Popover, ListBox, SelectProps, ValidationResult } from "react-aria-components";
import { cn } from "@/lib/utils";
import { Label } from "./label";
import { Button } from "./button";
import { LuChevronDown } from "react-icons/lu";

type CustomSelectProps<T extends object> = Omit<SelectProps<T>, 'children'> & {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  items?: Iterable<T>;
  children: React.ReactNode | ((item: T) => React.ReactNode);
};

type ComboBoxProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Select<T extends object>(
  { label, className, description, errorMessage, children, items, ...props }:
    CustomSelectProps<T>
) {
  return (
    <RACSelect className={cn("m-0", className)} {...props} >
      <Label>{label}</Label>
      <Button variant="ghost" className="flex h-10 w-full rounded-md text-left font-normal border border-input bg-surface px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
        <SelectValue className="flex-1 truncate placeholder-shown:text-base-500" />
        <span aria-hidden="true"><LuChevronDown /></span>
      </Button>
      {description && <p slot="description">{description}</p>}
      <FieldError>{errorMessage}</FieldError>
      <Popover className="max-h-60 w-[--trigger-width] overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black/5 entering:animate-in entering:fade-in exiting:animate-out exiting:fade-out">
        <ListBox className="max-h-[300px] overflow-y-auto p-1 overflow-x-hidden" items={items}>
          {children}
        </ListBox>
      </Popover>
    </RACSelect>
  );
}

export const ComboBox = React.forwardRef<HTMLInputElement, ComboBoxProps>(
  (props, ref) => {
    const { type, className, ...otherProps } = props;

    return (
      <RACComboBox
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-surface px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...otherProps}
      />
    );
  },
);

ComboBox.displayName = "ComboBox";
