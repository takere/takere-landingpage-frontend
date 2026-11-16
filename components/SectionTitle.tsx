import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface Props {
  children: ReactNode;
  /** Page edge the green rule runs to. */
  edge?: "left" | "right" | "none";
  light?: boolean;
  as?: "h1" | "h2";
  className?: string;
}

const edgeClass = {
  left: "after:right-0 after:w-screen",
  right: "after:left-0 after:w-screen",
  none: "after:inset-x-0",
} as const;

/** Section heading with a green rule that runs off to one edge of the page. */
export default function SectionTitle({ children, edge = "left", light, as: Tag = "h2", className }: Props) {
  return (
    <Tag
      className={cn(
        "relative inline-block pb-1.5 font-display text-5xl leading-[1.3] font-bold",
        "after:absolute after:bottom-0 after:h-1 after:content-['']",
        "mobile:pb-0.5 mobile:text-u-27",
        light ? "text-white after:bg-white" : "text-ink after:bg-green",
        edgeClass[edge],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
