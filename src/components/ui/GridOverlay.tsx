"use client";

import { cn } from "@/lib/utils";

interface GridOverlayProps {
  className?: string;
  visible?: boolean;
}

export function GridOverlay({ className, visible = true }: GridOverlayProps) {
  if (!visible) return null;

  return (
    <div
      className={cn("grid-overlay", className)}
      aria-hidden="true"
    />
  );
}
