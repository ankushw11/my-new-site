"use client";

import dynamic from "next/dynamic";

// ═══════════════════════════════════════════════════════════════════════════════
// CLIENT-ONLY COMPONENTS — loaded with ssr: false to prevent hydration mismatches
// These components use browser-only APIs (mouse events, window, document)
// and must NOT be server-side rendered.
// ═══════════════════════════════════════════════════════════════════════════════

const KCursor = dynamic(
  () => import("@/components/Hero/KCursor").then((mod) => ({ default: mod.KCursor })),
  { ssr: false }
);

const GridOverlay = dynamic(
  () => import("@/components/ui/GridOverlay").then((mod) => ({ default: mod.GridOverlay })),
  { ssr: false }
);

const RGBShiftOverlay = dynamic(
  () => import("@/components/effects/RGBShiftOverlay").then((mod) => ({ default: mod.RGBShiftOverlay })),
  { ssr: false }
);

const AmbientBackground = dynamic(
  () => import("@/components/effects/AmbientBackground").then((mod) => ({ default: mod.AmbientBackground })),
  { ssr: false }
);

const SoundProvider = dynamic(
  () => import("@/components/ui/SoundProvider").then((mod) => ({ default: mod.SoundProvider })),
  { ssr: false }
);

/**
 * Renders all client-only overlay/effect components.
 * This wrapper is imported in layout.tsx (a Server Component)
 * and ensures none of these components are server-rendered.
 */
export function ClientOnlyComponents() {
  return (
    <>
      <KCursor />
      <GridOverlay />
      <RGBShiftOverlay enabled={true} maxShift={10} />
      <SoundProvider />
      <AmbientBackground />
      <div className="noise-overlay" aria-hidden="true" />
    </>
  );
}
