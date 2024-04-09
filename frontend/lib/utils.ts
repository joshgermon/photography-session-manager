import { type ClassValue, clsx } from "clsx";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
} from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimeDifference(targetDate: Date) {
  const currentDate = new Date();

  // Calculate the differences
  const daysDifference = differenceInDays(currentDate, targetDate);
  const hoursDifference = differenceInHours(currentDate, targetDate);
  const minutesDifference = differenceInMinutes(currentDate, targetDate);

  // Construct the desired strings
  const formatInDays =
    daysDifference > 0
      ? `In ${daysDifference} day${daysDifference === 1 ? "" : "s"}`
      : `${Math.abs(daysDifference)} day${daysDifference === -1 ? "" : "s"} ago`;
  const formatInHours =
    hoursDifference > 0
      ? `In ${hoursDifference} hour${hoursDifference === 1 ? "" : "s"}`
      : `${Math.abs(hoursDifference)} hour${hoursDifference === -1 ? "" : "s"} ago`;
  const formatInMinutes =
    minutesDifference > 0
      ? `In ${minutesDifference} minute${minutesDifference === 1 ? "" : "s"}`
      : `${Math.abs(minutesDifference)} minute${minutesDifference === -1 ? "" : "s"} ago`;

  // Choose the appropriate format based on the magnitude of difference
  if (Math.abs(daysDifference) > 0) {
    return formatInDays;
  } else if (Math.abs(hoursDifference) > 0) {
    return formatInHours;
  } else {
    return formatInMinutes;
  }
}
