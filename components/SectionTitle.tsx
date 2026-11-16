import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** Page edge the green rule runs to. */
  edge?: "left" | "right" | "none";
  light?: boolean;
  as?: "h1" | "h2";
  className?: string;
}

export default function SectionTitle({ children, edge = "left", light, as: Tag = "h2", className }: Props) {
  const classes = ["section-title", light && "light", className].filter(Boolean).join(" ");
  return (
    <Tag className={classes} data-edge={edge}>
      {children}
    </Tag>
  );
}
