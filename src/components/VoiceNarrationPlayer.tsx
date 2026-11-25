import { useState } from 'react';
import { Volume2, Square, RotateCcw, Loader2, FileText, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { NARRATION_TRACKS } from '../data/homeContent';
import { NarrationTrackId } from '../types';

interface VoiceNarrationPlayerProps {
  activeTrackId: NarrationTrackId;
  isLoading: boolean;
  isPlaying: boolean;
  error: string | null;
  progress: number;
  onSelectTrack: (trackId: NarrationTrackId) => void;
  onPlay: (trackId?: NarrationTrackId) => void;
  onStop: () => void;
  onReplay: () => void;
}

export function VoiceNarrationPlayer({
  activeTrackId,
  isLoading,
  isPlaying,
  error,
  progress,
  onSelectTrack,
  onPlay,
  onStop,
  onReplay,
}: VoiceNarrationPlayerProps) {
  const [showTranscript, setShowTranscript] = useState(true);
  const currentTrack =
    NARRATION_TRACKS.find((track) => track.id === activeTrackId) || NARRATION_TRACKS[0];

  return (
    <div
      id="panel-suara-ai"
      className="cartoon-card rounded-3xl bg-white p-5 sm:p-7"
      aria-label="Kawalan Suara AI Cikgu"
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#83C9F4] border-2 border-[#29466B]">
              <Volume2 className="h-6 w-6 text-[#29466B]" />
            </div>
            <div>
              <h3 className="font-display text-lg sm:text-xl font-extrabold text-[#29466B]">
                Suara AI Cikgu Maya (Bahasa Melayu)
              </h3>
              <p className="text-sm font-semibold text-[#29466B]/75">
                Pilih topik penerangan dan tekan butang untuk mendengar suara guru secara mesra.
              </p>
            </div>
          </div>

          {isPlaying && (
            <div className="flex items-center gap-2 self-start sm:self-center rounded-xl bg-[#ECF9F0] border-2 border-[#A8DDB5] px-3 py-1.5">
              <div className="flex items-end gap-1 h-4" aria-hidden="true">
                <span className="w-1 bg-[#29466B] rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-2.5" />
                <span className="w-1 bg-[#29466B] rounded-full animate-[pulse_0.6s_ease-in-out_infinite_0.2s] h-4" />
                <span className="w-1 bg-[#29466B] rounded-full animate-[pulse_0.9s_ease-in-out_infinite_0.4s] h-3" />
              </div>
              <span className="font-display text-xs font-extrabold text-[#29466B]">
                Sedang Dimainkan
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3" role="tablist" aria-label="Pilihan audio penerangan">
          {NARRATION_TRACKS.map((track, idx) => {
            const selected = track.id === activeTrackId;
            return (
              <button
                key={track.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => onSelectTrack(track.id)}
                className={`rounded-2xl px-4 py-3 text-left transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[#29466B] ${
                  selected
                    ? 'bg-[#83C9F4]/35 border-2 border-[#29466B] shadow-[0_3px_0_#29466B]'
                    : 'bg-[#FFF8E8] border-2 border-[#29466B]/12 hover:border-[#29466B]/35'
                }`}
              >
                <span className="block font-display text-xs font-extrabold text-[#29466B]/65">
                  Audio {idx + 1}
                </span>
                <span className="block font-display text-sm sm:text-base font-extrabold text-[#29466B]">
                  {track.title}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            disabled={isLoading}
            onClick={() => onPlay(activeTrackId)}
            className="cartoon-btn inline-flex min-h-[44px] items-center justify-center gap-2 rounded-2xl bg-[#FFD966] px-5 py-2.5 font-display text-sm sm:text-base font-extrabold text-[#29466B] cursor-pointer disabled:opacity-70 disabled:cursor-wait whitespace-nowrap"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Menjana Suara...</span>
              </>
            ) : (
              <>
                <Volume2 className="h-5 w-5" />
                <span>Dengar Penerangan</span>
              </>
            )}
          </button>

          <button
            type="button"
            disabled={!isPlaying && !isLoading}
            onClick={onStop}
            className="cartoon-btn inline-flex min-h-[44px] items-center justify-center gap-2 rounded-2xl bg-[#FF8585] px-4 py-2.5 font-display text-sm sm:text-base font-extrabold text-[#29466B] cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed whitespace-nowrap"
          >
            <Square className="h-4 w-4 fill-current" />
            <span>Berhenti</span>
          </button>

          <button
            type="button"
            disabled={isLoading}
            onClick={onReplay}
            className="cartoon-btn inline-flex min-h-[44px] items-center justify-center gap-2 rounded-2xl bg-[#A8DDB5] px-4 py-2.5 font-display text-sm sm:text-base font-extrabold text-[#29466B] cursor-pointer disabled:opacity-70 disabled:cursor-wait whitespace-nowrap"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Ulang Semula</span>
          </button>

          <button
            type="button"
            onClick={() => setShowTranscript((prev) => !prev)}
            className="ml-auto inline-flex min-h-[44px] items-center gap-1.5 rounded-xl px-3 py-2 font-display text-sm font-bold text-[#29466B] hover:bg-[#FFF8E8] cursor-pointer whitespace-nowrap"
          >
            <FileText className="h-4 w-4" />
            <span>{showTranscript ? 'Sembunyikan Teks' : 'Baca Teks'}</span>
            {showTranscript ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>

        {(isPlaying || progress > 0) && (
          <div className="space-y-1.5">
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#FFF8E8] border border-[#29466B]/15">
              <div
                className="h-full rounded-full bg-[#83C9F4] transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="flex items-start gap-2.5 rounded-2xl border-2 border-[#FF8585] bg-[#FFECEC] p-3.5 text-sm font-semibold text-[#29466B]"
          >
            <AlertCircle className="h-5 w-5 shrink-0 text-[#29466B] mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {showTranscript && (
          <div className="rounded-2xl bg-[#FFF8E8] border-2 border-[#29466B]/10 p-4">
            <p className="font-display text-xs font-extrabold text-[#29466B]/70 mb-1">
              {currentTrack.title} · {currentTrack.subtitle}
            </p>
            <p className="text-sm sm:text-base font-semibold leading-relaxed text-[#29466B]">
              “{currentTrack.script}”
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
