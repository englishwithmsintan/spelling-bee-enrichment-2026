// Human Voice Engine for Grade 4 ESL Spelling Bee & Review
// Provides natural, high-quality audio for Mock Test listening, vocabulary, stories, and pronunciation

export function isAbortError(err: any): boolean {
  if (!err) return false;
  const name = err.name || '';
  const message = String(err.message || err);
  return (
    name === 'AbortError' ||
    message.includes('interrupted by a call to pause') ||
    message.includes('play() request was interrupted') ||
    message.includes('canceled')
  );
}

class HumanVoiceEngine {
  private currentAudio: HTMLAudioElement | null = null;
  private isSpeaking: boolean = false;
  private activeUtterances: Set<SpeechSynthesisUtterance> = new Set();
  private bestVoice: SpeechSynthesisVoice | null = null;
  private voicesLoaded: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.initVoices();
      if (typeof window.speechSynthesis.onvoiceschanged !== 'undefined') {
        window.speechSynthesis.onvoiceschanged = () => {
          this.initVoices();
        };
      }
    }
  }

  private initVoices(): SpeechSynthesisVoice | null {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;

    this.voicesLoaded = true;

    // Score English voices based on natural pronunciation quality
    const scored = voices
      .filter(v => v.lang.startsWith('en'))
      .map(v => {
        let score = 0;
        const name = v.name.toLowerCase();
        const lang = v.lang.toLowerCase();

        // High quality neural / natural voices
        if (name.includes('natural') || name.includes('neural') || name.includes('online')) score += 100;
        if (name.includes('google') && (lang.includes('us') || lang.includes('gb'))) score += 90;
        if (name.includes('samantha') || name.includes('karen') || name.includes('daniel') || name.includes('serena') || name.includes('moira') || name.includes('ava') || name.includes('allison')) score += 80;
        if (name.includes('microsoft') || name.includes('apple') || name.includes('siri')) score += 60;
        if (lang === 'en-us') score += 40;
        if (lang === 'en-gb') score += 35;
        if (v.default) score += 15;

        // Penalize robotic sounding synthesizers
        if (name.includes('espeak') || name.includes('compact') || name.includes('zira') || name.includes('david')) score -= 40;
        return { voice: v, score };
      })
      .sort((a, b) => b.score - a.score);

    if (scored.length > 0) {
      this.bestVoice = scored[0].voice;
    } else {
      // Any English voice
      const anyEn = voices.find(v => v.lang.startsWith('en'));
      if (anyEn) this.bestVoice = anyEn;
    }
    return this.bestVoice;
  }

  public stop() {
    if (this.currentAudio) {
      const audio = this.currentAudio;
      (audio as any).__isCancelled = true;
      this.currentAudio = null;
      try {
        audio.pause();
        audio.currentTime = 0;
      } catch (_) {
        // Safe ignore
      }
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (_) {
        // Safe ignore
      }
    }

    this.activeUtterances.clear();
    this.isSpeaking = false;
  }

  public isBusy(): boolean {
    return this.isSpeaking;
  }

  /**
   * Check if text matches pre-recorded studio recordings
   */
  private getStudioAudioUrl(text: string): string | null {
    const t = text.toLowerCase();
    if (t.includes('homes around the world') && (t.includes('mongolia') || t.includes('stilt house') || t.includes('yurt'))) {
      return '/audio/listening.mp3';
    }
    if (t.includes('eco-house on the hill') || (t.includes('baggins') && t.includes('solar panels') && t.includes('rainwater'))) {
      return '/audio/ecohouse.mp3';
    }
    if (t.includes('colosseum') && (t.includes('rome') || t.includes('gladiators') || t.includes('ancient'))) {
      return '/audio/colosseum.mp3';
    }
    if (t.includes('my dream home is a cosy eco-house') || (t.includes('dream home') && t.includes('solar panels to make clean electricity'))) {
      return '/audio/model_essay.mp3';
    }
    if (t.includes('in a hole in the ground there lived a hobbit') || (t.includes('hobbit') && t.includes('porthole') && t.includes('brass knob'))) {
      return '/audio/hobbit.mp3';
    }
    return null;
  }

  /**
   * Speaks a single word with clear pronunciation
   */
  public speakWord(word: string, options?: { onStart?: () => void; onEnd?: () => void; rate?: number }): Promise<void> {
    return this.speak(word, { rate: options?.rate || 0.88, ...options });
  }

  /**
   * Speaks a full sentence with natural pacing
   */
  public speakSentence(sentence: string, options?: { onStart?: () => void; onEnd?: () => void; rate?: number }): Promise<void> {
    return this.speak(sentence, { rate: options?.rate || 0.94, ...options });
  }

  /**
   * Speaks word twice with a clear pause in between (official spelling bee / dictation protocol)
   */
  public async speakWordTwice(
    word: string,
    options?: { onStart?: () => void; onEnd?: () => void; rate?: number }
  ): Promise<void> {
    try {
      this.stop();
      this.isSpeaking = true;
      options?.onStart?.();

      // First reading
      await this.speakDirect(word, { rate: options?.rate || 0.86 });

      // Pause between readings (700ms)
      await new Promise(resolve => setTimeout(resolve, 700));

      // Second reading
      await this.speakDirect(word, { rate: options?.rate || 0.86 });
    } finally {
      this.isSpeaking = false;
      options?.onEnd?.();
    }
  }

  /**
   * General speak method
   */
  public async speak(
    text: string,
    options?: {
      onStart?: () => void;
      onEnd?: () => void;
      rate?: number;
      preferSynthesis?: boolean;
    }
  ): Promise<void> {
    try {
      this.stop();
      if (!text || !text.trim()) return;

      const trimmed = text.trim();
      this.isSpeaking = true;

      // 1. Check for studio recording first
      const studioUrl = this.getStudioAudioUrl(trimmed);
      if (studioUrl) {
        await this.playAudioUrl(studioUrl, options);
        return;
      }

      // 2. Speak using the browser's native speech synthesis engine
      await this.speakDirect(trimmed, options);
    } catch (err) {
      if (!isAbortError(err)) {
        console.warn('Speech playback notification:', err);
      }
      this.isSpeaking = false;
      options?.onEnd?.();
    }
  }

  /**
   * Direct speech synthesis implementation with anti-freeze and voice selection
   */
  private speakDirect(
    text: string,
    options?: { onStart?: () => void; onEnd?: () => void; rate?: number }
  ): Promise<void> {
    return new Promise(async (resolve) => {
      if (typeof window === 'undefined') {
        resolve();
        return;
      }

      // If speech synthesis is not supported, fallback to AudioContext chime notification
      if (!('speechSynthesis' in window)) {
        this.fallbackTone();
        options?.onStart?.();
        setTimeout(() => {
          options?.onEnd?.();
          resolve();
        }, 400);
        return;
      }

      try {
        // Resume synthesis if paused (common Chrome issue)
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }

        // Cancel previous utterances to avoid queue jamming
        window.speechSynthesis.cancel();

        // Chrome quirk: brief pause after cancel prevents dropping the subsequent utterance
        await new Promise(r => setTimeout(r, 40));

        const utterance = new SpeechSynthesisUtterance(text);

        // Keep reference in active set to prevent Chrome's Garbage Collection bug
        this.activeUtterances.add(utterance);

        // Ensure voice is populated
        let voice = this.bestVoice;
        if (!voice) {
          voice = this.initVoices();
        }
        if (voice) {
          utterance.voice = voice;
          utterance.lang = voice.lang || 'en-US';
        } else {
          utterance.lang = 'en-US';
        }

        utterance.rate = options?.rate || 0.88;
        utterance.pitch = 1.0;

        let hasResolved = false;
        const cleanup = () => {
          if (hasResolved) return;
          hasResolved = true;
          this.activeUtterances.delete(utterance);
          options?.onEnd?.();
          resolve();
        };

        utterance.onstart = () => {
          this.isSpeaking = true;
          options?.onStart?.();
        };

        utterance.onend = () => {
          cleanup();
        };

        utterance.onerror = (e) => {
          // 'canceled' or 'interrupted' is normal when user switches words
          if (e.error !== 'canceled' && e.error !== 'interrupted') {
            console.warn('Speech synthesis utterance error:', e.error);
          }
          cleanup();
        };

        // Safety timeout in case browser gets stuck or drops events
        const timeoutMs = Math.max(3000, text.length * 150);
        const timer = setTimeout(() => {
          if (this.activeUtterances.has(utterance)) {
            cleanup();
          }
        }, timeoutMs);

        // Chrome speech keep-alive: if utterance is long, resume every 3s
        const keepAlive = setInterval(() => {
          if (!this.activeUtterances.has(utterance)) {
            clearInterval(keepAlive);
            clearTimeout(timer);
          } else if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
          }
        }, 2000);

        window.speechSynthesis.speak(utterance);

        // Explicitly resume right after speak
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
      } catch (err) {
        console.warn('Speech synthesis invocation exception:', err);
        options?.onEnd?.();
        resolve();
      }
    });
  }

  /**
   * Plays an audio URL with callbacks and error recovery
   */
  public playAudioUrl(
    url: string,
    options?: { onStart?: () => void; onEnd?: () => void; rate?: number }
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const audio = new Audio(url);
        this.currentAudio = audio;
        (audio as any).__isCancelled = false;

        if (options?.rate) {
          audio.playbackRate = options.rate;
        }

        let hasFinished = false;
        const complete = (cleanly: boolean, err?: any) => {
          if (hasFinished) return;
          hasFinished = true;
          this.isSpeaking = false;
          if (this.currentAudio === audio) {
            this.currentAudio = null;
          }
          options?.onEnd?.();
          if (cleanly) {
            resolve();
          } else {
            reject(err);
          }
        };

        audio.onplay = () => {
          if ((audio as any).__isCancelled) return;
          this.isSpeaking = true;
          options?.onStart?.();
        };

        audio.onended = () => {
          complete(true);
        };

        audio.onerror = (e) => {
          if ((audio as any).__isCancelled) {
            complete(true);
            return;
          }
          complete(false, e);
        };

        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            if ((audio as any).__isCancelled || isAbortError(err)) {
              complete(true);
              return;
            }
            complete(false, err);
          });
        }
      } catch (err) {
        if (isAbortError(err)) {
          this.isSpeaking = false;
          this.currentAudio = null;
          options?.onEnd?.();
          resolve();
        } else {
          this.isSpeaking = false;
          this.currentAudio = null;
          options?.onEnd?.();
          reject(err);
        }
      }
    });
  }

  /**
   * Fallback tone generator in case speech synthesis is unavailable
   */
  private fallbackTone() {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch (_) {
      // Ignore
    }
  }
}

export const humanVoice = new HumanVoiceEngine();
