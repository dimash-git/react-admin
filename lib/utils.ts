import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function unixToReadableDate(unix_timestamp: number) {
  // Convert the Unix timestamp to a Date object
  var date = new Date(unix_timestamp * 1000);

  var day = "0" + date.getDate();
  var month = "0" + (date.getMonth() + 1);
  var year = date.getFullYear();

  // Format the date as "dd.mm.yyyy"
  var formattedDate = day.slice(-2) + "." + month.slice(-2) + "." + year;

  return formattedDate;
}

export function readableDate(date: Date) {
  var day = "0" + date.getDate();
  var month = "0" + (date.getMonth() + 1);
  var year = date.getFullYear();

  // Format the date as "dd.mm.yyyy"
  var formattedDate = day.slice(-2) + "." + month.slice(-2) + "." + year;

  return formattedDate;
}

export function dateToUnix(date: Date) {
  return Math.floor(date.getTime() / 1000);
}

export function fileToBase64(file: File) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("No file provided"));
      return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {
      // The result property contains the base64-encoded string
      const base64String = event?.target?.result;
      resolve(base64String);
    };

    reader.readAsDataURL(file);
  });
}

export async function getFileFromUrl(url: string) {
  const response = await fetch(url);
  const blob = await response.blob();
  const mimeType =
    response.headers.get("Content-Type") || "application/octet-stream";

  // Generate a random filename
  const filename =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  // return { blob, filename, mimeType };
  return new File([blob], filename, { type: mimeType });
}
