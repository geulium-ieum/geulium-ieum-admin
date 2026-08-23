import { clsx, type ClassValue } from "clsx"
import ky from "ky";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const http = ky.create({
  prefix: process.env.API_URL || process.env.NEXT_PUBLIC_API_URL,
});
