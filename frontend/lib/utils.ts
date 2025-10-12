import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const PROJECT_ID = "393bebdb7cdf37789da23a1b4d2b5a0b"
export const APP_NAME = "YieldFi"
export const APP_DESCRIPTION = 'Bringing defi to everyone'