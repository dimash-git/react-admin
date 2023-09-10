import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function unixToDate(unix_timestamp: number) {
  // Convert the Unix timestamp to a Date object
  var date = new Date(unix_timestamp * 1000);

  var day = "0" + date.getDate();
  var month = "0" + (date.getMonth() + 1);
  var year = date.getFullYear();

  // Format the date as "dd.mm.yyyy"
  var formattedDate = day.slice(-2) + "." + month.slice(-2) + "." + year;

  return formattedDate;
}
