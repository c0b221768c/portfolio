import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...props: ClassValue[]) => (
    twMerge(clsx(props))
)