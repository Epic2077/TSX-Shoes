import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export default function Cn(...input: ClassValue[]) {
  return twMerge(clsx(input));
}
