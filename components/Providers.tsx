"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { RouterProvider } from "react-aria-components";

declare module "react-aria-components" {
  interface RouterConfig {
    routerOptions: NonNullable<Parameters<ReturnType<typeof useRouter>["push"]>[1]>;
  }
}

/** Lets HeroUI/React Aria components with an `href` (Link, Tabs, …) navigate client-side. */
export default function Providers({ children }: { children: ReactNode }) {
  const router = useRouter();
  return <RouterProvider navigate={(path, options) => router.push(path, options)}>{children}</RouterProvider>;
}
