import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatToCamelCase(str: string) {
    return str
        .replace(/[^\w\s]/g, "")
        .trim()
        .split(/\s+/)
        .map((w, i) =>
            i === 0
                ? w.toLowerCase()
                : w[0].toUpperCase() + w.slice(1).toLowerCase()
        )
        .join("");
}
