/**
 * SoundManager — Ambient music controller.
 *
 * - Loads /ambient.mp3 (Lexin Music inspiring cinematic ambient)
 * - Fade-in from 0 → 0.2 over 3 seconds
 * - Seamless loop
 * - Toggle: fade out to 0 / fade in to 0.2
 * - AudioContext only initializes on user gesture
 */

class SoundManagerClass {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private ambientSource: AudioBufferSourceNode | null = null;
  private ambientGain: GainNode | null = null;
  private ambientBuffer: AudioBuffer | null = null;
  private _enabled = false;
  private _initialized = false;
  private _musicVolume = 0.2;

  get enabled() {
    return this._enabled;
  }

  get initialized() {
    return this._initialized;
  }

  /** Initialize AudioContext — must be called from a user gesture */
  async init() {
    if (this._initialized) return;

    try {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();

      // Master gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 1.0;
      this.masterGain.connect(this.ctx.destination);

      // Ambient gain (starts at 0, fades in)
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.value = 0;
      this.ambientGain.connect(this.masterGain);

      this._initialized = true;
      this._enabled = true;

      // Load and play ambient music
      await this.loadAndPlayAmbient();
    } catch (e) {
      console.warn("SoundManager: Web Audio API not available", e);
    }
  }

  /** Load /ambient.mp3 and start playing */
  private async loadAndPlayAmbient() {
    if (!this.ctx || !this.ambientGain) return;

    try {
      const response = await fetch("/ambient.mp3");
      if (!response.ok) throw new Error("No ambient.mp3 found");
      const arrayBuffer = await response.arrayBuffer();
      this.ambientBuffer = await this.ctx.decodeAudioData(arrayBuffer);

      // Create source and play
      this.ambientSource = this.ctx.createBufferSource();
      this.ambientSource.buffer = this.ambientBuffer;
      this.ambientSource.loop = true;
      this.ambientSource.connect(this.ambientGain);
      this.ambientSource.start();

      // Fade in from 0 → musicVolume over 3 seconds
      this.ambientGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.ambientGain.gain.linearRampToValueAtTime(
        this._musicVolume,
        this.ctx.currentTime + 3
      );
    } catch (e) {
      console.warn("SoundManager: Could not load ambient.mp3", e);
    }
  }

  /** Toggle sound on/off */
  toggle() {
    if (!this._initialized) return;
    this._enabled = !this._enabled;

    if (this._enabled) {
      this.fadeIn();
    } else {
      this.fadeOut();
    }
  }

  /** Fade music in to target volume over 3 seconds */
  private fadeIn() {
    if (!this.ctx || !this.ambientGain) return;

    // If source was stopped, recreate it
    if (!this.ambientSource && this.ambientBuffer) {
      this.ambientSource = this.ctx.createBufferSource();
      this.ambientSource.buffer = this.ambientBuffer;
      this.ambientSource.loop = true;
      this.ambientSource.connect(this.ambientGain);
      this.ambientSource.start();
    }

    const t = this.ctx.currentTime;
    this.ambientGain.gain.cancelScheduledValues(t);
    this.ambientGain.gain.setValueAtTime(this.ambientGain.gain.value, t);
    this.ambientGain.gain.linearRampToValueAtTime(this._musicVolume, t + 3);
  }

  /** Fade music out to 0 over 1.5 seconds */
  private fadeOut() {
    if (!this.ctx || !this.ambientGain) return;

    const t = this.ctx.currentTime;
    this.ambientGain.gain.cancelScheduledValues(t);
    this.ambientGain.gain.setValueAtTime(this.ambientGain.gain.value, t);
    this.ambientGain.gain.linearRampToValueAtTime(0, t + 1.5);
  }

  /** Clean up */
  destroy() {
    try {
      this.ambientSource?.stop();
    } catch {}
    if (this.ctx && this.ctx.state !== "closed") {
      this.ctx.close();
    }
    this._initialized = false;
    this._enabled = false;
  }
}

// Singleton
export const SoundManager = new SoundManagerClass();
