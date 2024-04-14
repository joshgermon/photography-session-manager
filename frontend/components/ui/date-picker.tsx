import { Label } from "./label";
import { Button } from "./button";
import {
  DatePicker as RACDatePicker,
  DateInput,
  Group,
  Heading,
  CalendarCell,
  CalendarGrid,
  Calendar,
  Dialog,
  Popover,
  DateSegment,
  CalendarGridHeader,
  CalendarHeaderCell,
  CalendarGridBody,
  DateValue,
  ValidationResult,
  DatePickerProps,
} from "react-aria-components";
import { LuCalendarDays, LuChevronLeft, LuChevronRight } from "react-icons/lu";

interface CustomDatePickerProps<T extends DateValue>
  extends DatePickerProps<T> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function DatePicker<T extends DateValue>({
  label,
  description,
  errorMessage,
  ...props
}: CustomDatePickerProps<T>) {
  return (
    <RACDatePicker {...props} >
      <Label>Date of Session</Label>
      <Group className="flex rounded-lg bg-surface border border-base-900 bg-opacity-90 focus-within:bg-opacity-100 transition focus-visible:ring-2 focus-visible:ring-primary">
        <Button
          variant="ghost"
          className="h-full border-base-900 bg-transparent rounded-r-lg"
        >
          <LuCalendarDays size={21} color="#707070" />
        </Button>
        <DateInput className="flex h-10 w-full rounded-none border-none border-input bg-surface px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
          {(segment) => (
            <DateSegment className="rounded-sm focus:bg-primary-hover focus:text-base-300 caret-transparent placeholder-shown:italic" segment={segment} />
          )}
        </DateInput>
      </Group>
      <Popover
        placement="bottom start"
        className="max-h-60 w-[--trigger-width] overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black/5 entering:animate-in entering:fade-in exiting:animate-out exiting:fade-out"
      >
        <Dialog className="bg-white shadow-md rounded-lg p-4">
          <Calendar className="text-center text-base-300">
            <header className="flex justify-between items-center mb-4">
              <Button variant="ghost" slot="previous" className="text-gray-600">
                <LuChevronLeft />
              </Button>
              <Heading className="font-medium" />
              <Button variant="ghost" slot="next" className="text-gray-600">
                <LuChevronRight />
              </Button>
            </header>
            <CalendarGrid className="text-sm" weekdayStyle="short">
              <CalendarGridHeader>
                {(day) => (
                  <CalendarHeaderCell className="text-xs text-gray-500 font-medium">
                    {day}
                  </CalendarHeaderCell>
                )}
              </CalendarGridHeader>
              <CalendarGridBody>
                {(date) => (
                  <CalendarCell
                    date={date}
                    className="p-2 rounded-md text-sm aria-disabled:opacity-50 aria-selected:bg-primary aria-selected:text-white"
                  />
                )}
              </CalendarGridBody>
            </CalendarGrid>
          </Calendar>
        </Dialog>
      </Popover>
    </RACDatePicker>
  );
}
