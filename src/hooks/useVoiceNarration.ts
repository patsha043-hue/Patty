import { useCallback, useEffect, useRef, useState } from 'react';
import { NARRATION_TRACKS } from '../data/homeContent';
import { NarrationTrackId } from '../types';

interface UseVoiceNarrationReturn {
  activeTrackId: NarrationTrackId;
  isLoading: boolean;
  isPlaying: boolean;
  error: string | null;
  progress: number;
  selectTrack: (trackId: NarrationTrackId) => void;
  playTrack: (trackId?: NarrationTrackId) => Promise<void>;
  stop: () => void;
  replay: () => Promise<void>;
}

const NO_SUPPORT_MESSAGE =
  'Pelayar anda tidak menyokong ciri pembacaan suara terbina dalam. Sila baca teks penerangan di bawah atau gunakan pelayar moden seperti Chrome atau Edge.';

const NO_MALAY_VOICE_MESSAGE =
  'Suara Bahasa Melayu (ms-MY) tidak tersedia pada peranti atau pelayar ini. Sila pasang pek suara Bahasa Melayu dalam tetapan peranti atau pelayar anda, atau baca teks penerangan yang disediakan di bawah.';

function normalizeLang(lang: string): string {
  return lang.trim().toLowerCase().replace(/_/g, '-');
}

function preferFemaleVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice {
  const preferred = voices.find((voice) =>
    /yasmin|maya|female|woman|perempuan|wanita|google bahasa melayu/i.test(voice.name)
  );
  return preferred ?? voices[0];
}

function findMalayVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  if (voices.length === 0) return null;

  const exactMsMy = voices.filter((voice) => normalizeLang(voice.lang) === 'ms-my');
  if (exactMsMy.length > 0) {
    return preferFemaleVoice(exactMsMy);
  }

  const anyMalayTag = voices.filter((voice) => {
    const lang = normalizeLang(voice.lang);
    return lang === 'ms' || lang.startsWith('ms-');
  });
  if (anyMalayTag.length > 0) {
    return preferFemaleVoice(anyMalayTag);
  }

  const namedMalay = voices.filter(
    (voice) =>
      /\bmalay\b|\bbahasa melayu\b|\bmelayu\b/i.test(voice.name) &&
      !/malayalam/i.test(voice.name)
  );
  if (namedMalay.length > 0) {
    return preferFemaleVoice(namedMalay);
  }

  return null;
}

function getSpeechSynthesisSafe(): SpeechSynthesis | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return null;
  }
  return window.speechSynthesis;
}

export function useVoiceNarration(): UseVoiceNarrationReturn {
  const [activeTrackId, setActiveTrackId] = useState<NarrationTrackId>(NarrationTrackId.WELCOME);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const playbackIdRef = useRef(0);
  const progressTimerRef = useRef<number | null>(null);
  const speakDelayTimerRef = useRef<number | null>(null);

  const clearTimers = useCallback(() => {
    if (progressTimerRef.current !== null) {
      window.clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
    if (speakDelayTimerRef.current !== null) {
      window.clearTimeout(speakDelayTimerRef.current);
      speakDelayTimerRef.current = null;
    }
  }, []);

  const cancelSpeech = useCallback(() => {
    clearTimers();
    utteranceRef.current = null;
    const synth = getSpeechSynthesisSafe();
    if (synth) {
      synth.cancel();
    }
  }, [clearTimers]);

  useEffect(() => {
    const synth = getSpeechSynthesisSafe();
    if (!synth) return;

    const syncVoices = () => {
      const loaded = synth.getVoices();
      if (loaded.length > 0) {
        voicesRef.current = loaded;
      }
    };

    syncVoices();

    if (typeof synth.addEventListener === 'function') {
      synth.addEventListener('voiceschanged', syncVoices);
    } else {
      synth.onvoiceschanged = syncVoices;
    }

    const handleBeforeUnload = () => {
      synth.cancel();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      playbackIdRef.current++;
      cancelSpeech();
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (typeof synth.removeEventListener === 'function') {
        synth.removeEventListener('voiceschanged', syncVoices);
      } else if (synth.onvoiceschanged === syncVoices) {
        synth.onvoiceschanged = null;
      }
    };
  }, [cancelSpeech]);

  const waitForVoices = useCallback((synth: SpeechSynthesis): Promise<SpeechSynthesisVoice[]> => {
    const immediate = synth.getVoices();
    if (immediate.length > 0) {
      voicesRef.current = immediate;
      return Promise.resolve(immediate);
    }

    if (voicesRef.current.length > 0) {
      return Promise.resolve(voicesRef.current);
    }

    return new Promise((resolve) => {
      let settled = false;

      const finish = (voices: SpeechSynthesisVoice[]) => {
        if (settled) return;
        settled = true;
        if (typeof synth.removeEventListener === 'function') {
          synth.removeEventListener('voiceschanged', onVoicesChanged);
        }
        window.clearInterval(pollId);
        window.clearTimeout(timeoutId);
        if (voices.length > 0) {
          voicesRef.current = voices;
        }
        resolve(voices);
      };

      const onVoicesChanged = () => {
        const loaded = synth.getVoices();
        if (loaded.length > 0) {
          finish(loaded);
        }
      };

      if (typeof synth.addEventListener === 'function') {
        synth.addEventListener('voiceschanged', onVoicesChanged);
      }

      const pollId = window.setInterval(() => {
        const loaded = synth.getVoices();
        if (loaded.length > 0) {
          finish(loaded);
        }
      }, 100);

      const timeoutId = window.setTimeout(() => {
        finish(synth.getVoices());
      }, 1200);
    });
  }, []);

  const playTrack = useCallback(
    async (targetTrackId?: NarrationTrackId) => {
      const trackToPlay = targetTrackId ?? activeTrackId;
      setActiveTrackId(trackToPlay);
      setError(null);

      const synth = getSpeechSynthesisSafe();
      if (!synth || typeof SpeechSynthesisUtterance === 'undefined') {
        setIsLoading(false);
        setIsPlaying(false);
        setProgress(0);
        setError(NO_SUPPORT_MESSAGE);
        return;
      }

      const track = NARRATION_TRACKS.find((item) => item.id === trackToPlay);
      const scriptText = track?.script?.trim() ?? '';
      if (!scriptText) {
        setIsLoading(false);
        setIsPlaying(false);
        setProgress(0);
        setError('Teks penerangan tidak dijumpai.');
        return;
      }

      const currentPlaybackId = ++playbackIdRef.current;
      const wasActive = synth.speaking || synth.pending;
      cancelSpeech();

      let voices = synth.getVoices();
      if (voices.length === 0 && voicesRef.current.length > 0) {
        voices = voicesRef.current;
      }

      if (voices.length === 0) {
        setIsLoading(true);
        voices = await waitForVoices(synth);
        if (currentPlaybackId !== playbackIdRef.current) {
          return;
        }
        setIsLoading(false);
      }

      const malayVoice = findMalayVoice(voices);
      if (!malayVoice) {
        setIsLoading(false);
        setIsPlaying(false);
        setProgress(0);
        setError(NO_MALAY_VOICE_MESSAGE);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(scriptText);
      utterance.voice = malayVoice;
      utterance.lang = malayVoice.lang || 'ms-MY';
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      utteranceRef.current = utterance;

      let receivedBoundary = false;

      const startFallbackProgress = () => {
        const estimatedDurationMs = Math.max(3000, Math.round((scriptText.length / 13) * 1000));
        const startedAt = Date.now();
        progressTimerRef.current = window.setInterval(() => {
          if (currentPlaybackId !== playbackIdRef.current || receivedBoundary) {
            return;
          }
          const elapsed = Date.now() - startedAt;
          const pct = Math.min(96, Math.max(2, Math.round((elapsed / estimatedDurationMs) * 100)));
          setProgress(pct);
        }, 250);
      };

      utterance.onstart = () => {
        if (currentPlaybackId !== playbackIdRef.current) return;
        setIsLoading(false);
        setIsPlaying(true);
        setProgress((prev) => (prev > 0 ? prev : 2));
        startFallbackProgress();
      };

      utterance.onboundary = (event) => {
        if (currentPlaybackId !== playbackIdRef.current) return;
        if (typeof event.charIndex === 'number' && scriptText.length > 0) {
          receivedBoundary = true;
          const endIndex = event.charIndex + (event.charLength || 0);
          const pct = Math.min(99, Math.max(2, Math.round((endIndex / scriptText.length) * 100)));
          setProgress(pct);
        }
      };

      utterance.onend = () => {
        if (currentPlaybackId !== playbackIdRef.current) return;
        clearTimers();
        utteranceRef.current = null;
        setIsLoading(false);
        setIsPlaying(false);
        setProgress(100);
      };

      utterance.onerror = (event) => {
        if (currentPlaybackId !== playbackIdRef.current) return;
        clearTimers();
        utteranceRef.current = null;
        setIsLoading(false);
        setIsPlaying(false);

        if (event.error === 'canceled' || event.error === 'interrupted') {
          return;
        }

        if (event.error === 'language-unavailable' || event.error === 'voice-unavailable') {
          setError(NO_MALAY_VOICE_MESSAGE);
          return;
        }

        setError(
          'Suara tidak dapat dimainkan oleh pelayar buat masa ini. Sila cuba semula atau baca teks penerangan di bawah.'
        );
      };

      const startSpeaking = () => {
        if (currentPlaybackId !== playbackIdRef.current) return;
        setIsPlaying(true);
        setProgress(0);
        if (synth.paused) {
          synth.resume();
        }
        synth.speak(utterance);
      };

      if (wasActive) {
        speakDelayTimerRef.current = window.setTimeout(startSpeaking, 50);
      } else {
        startSpeaking();
      }
    },
    [activeTrackId, cancelSpeech, clearTimers, waitForVoices]
  );

  const stop = useCallback(() => {
    playbackIdRef.current++;
    cancelSpeech();
    setIsLoading(false);
    setIsPlaying(false);
    setProgress(0);
  }, [cancelSpeech]);

  const replay = useCallback(async () => {
    await playTrack(activeTrackId);
  }, [activeTrackId, playTrack]);

  const selectTrack = useCallback(
    (trackId: NarrationTrackId) => {
      if (trackId !== activeTrackId) {
        stop();
        setActiveTrackId(trackId);
        setError(null);
      }
    },
    [activeTrackId, stop]
  );

  return {
    activeTrackId,
    isLoading,
    isPlaying,
    error,
    progress,
    selectTrack,
    playTrack,
    stop,
    replay,
  };
}
