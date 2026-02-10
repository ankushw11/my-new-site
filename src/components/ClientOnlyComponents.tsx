"use client";

import { useState, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════════════════════
// CLIENT-ONLY COMPONENTS — rendered only AFTER hydration completes
// Uses useEffect + mounted state to guarantee:
//   1. Server render: returns null (no DOM)
//   2. Client hydration pass: returns null (matches server)
//   3. Post-hydration (useEffect fires): renders actual components
// This prevents the "insertBefore" hydration mismatch error that occurred
// with next/dynamic ssr:false (which still participates in React tree
// reconciliation during hydration).
// ═══════════════════════════════════════════════════════════════════════════════

import { KCursor } from "@/components/Hero/KCursor";
import { GridOverlay } from "@/components/ui/GridOverlay";
import { RGBShiftOverlay } from "@/components/effects/RGBShiftOverlay";
import { AmbientBackground } from "@/components/effects/AmbientBackground";
import { SoundProvider } from "@/components/ui/SoundProvider";

/**
 * Renders all client-only overlay/effect components.
 * Components are only mounted after hydration is complete (useEffect),
 * ensuring zero server/client DOM mismatch.
 */
export function ClientOnlyComponents() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR and initial hydration, render nothing.
  // After hydration (useEffect fires), render the client-only components.
  if (!mounted) {
    return null;
  }

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
