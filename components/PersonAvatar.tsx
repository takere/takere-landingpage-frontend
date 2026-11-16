import { AvatarRoot } from "@heroui/react/avatar";
import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * HeroUI Avatar shell around a server-rendered next/image.
 * HeroUI's AvatarImage (Radix) only mounts the <img> on the client after it loads,
 * which keeps photos out of the static HTML that crawlers and image search read.
 */
export default function PersonAvatar({ src, name, size, className }: { src: string; name: string; size: number; className?: string }) {
  return (
    <AvatarRoot className={cn("shrink-0", className)}>
      <Image src={src} alt={name} width={size} height={size} className="avatar__image size-full object-cover" />
    </AvatarRoot>
  );
}
