"use client";

import { useEffect, useState, useCallback } from "react";
import { SoundManager } from "@/lib/SoundManager";
import { cn } from "@/lib/utils";
import { Volume2, VolumeX } from "lucide-react";

/**
 * SoundProvider — Ambient music controller.
 *
 * - Bottom-left "Sound: On/Off" text toggle
 * - Ambient background music (ambient.mp3) with fade-in/out
 * - No click/hover/scroll sounds — music only
 */
export function SoundProvider() {
  const [enabled, setEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Toggle sound
  const handleToggle = useCallback(async () => {
    if (!SoundManager.initialized) {
      await SoundManager.init();
      setEnabled(true);
      return;
    }

    SoundManager.toggle();
    setEnabled(SoundManager.enabled);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={handleToggle}
      data-sound-toggle
      className={cn(
        "fixed bottom-6 left-6 z-[60]",
        "flex items-center gap-2",
        "px-3 py-2 rounded-sm",
        "text-xs font-mono uppercase tracking-widest",
        "transition-all duration-300",
        "backdrop-blur-sm",
        "group",
        "border",
        enabled
          ? "text-foreground/70 border-foreground/20 bg-foreground/5 hover:text-foreground hover:border-foreground/40"
          : "text-foreground/40 border-foreground/10 bg-background/50 hover:text-foreground/60 hover:border-foreground/20"
      )}
      title={enabled ? "Sound ON — Click to mute" : "Sound OFF — Click to enable"}
      aria-label={enabled ? "Mute sound" : "Enable sound"}
    >
      {enabled ? (
        <Volume2 className="w-3.5 h-3.5" />
      ) : (
        <VolumeX className="w-3.5 h-3.5" />
      )}
      <span>
        Sound: {enabled ? "On" : "Off"}
      </span>
    </button>
  );
}
