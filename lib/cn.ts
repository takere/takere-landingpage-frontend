import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  extend: {
    // `text-u-N` is our scaled font-size utility (app/globals.css); without this
    // tailwind-merge would read it as a text colour and drop e.g. `text-white`.
    classGroups: { "font-size": [{ "text-u": [(v: string) => /^\d+(\.\d+)?$/.test(v)] }] },
  },
});

/** Join class names, letting later Tailwind classes override earlier conflicting ones. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
