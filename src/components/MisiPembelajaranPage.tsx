import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  ExternalLink,
  Gamepad2,
  Heart,
  HelpCircle,
  Lightbulb,
  Maximize2,
  Minimize2,
  Palette,
  PenTool,
  RotateCcw,
  RotateCw,
  Ruler,
  Search,
  Shapes,
  Sparkles,
  X,
  XCircle,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { PASSAGE_IMAGE_PATH } from '../data/kenaliKataAdjektifContent';
import {
  ASAS_WORKSHEET_ITEMS,
  EJEN_GAME_URL,
  FOKUS_KATA_ADJEKTIF,
  GROUP_OVERVIEW_CARDS,
  KUMPULAN_BAIK_PADLET_EMBED_URL,
  KUMPULAN_BAIK_PADLET_URL,
  MISI_INTRO_IMAGE,
  MISI_SUCCESS_IMAGE,
} from '../data/misiPembelajaranContent';
import { PageRoute } from '../types';
import { CartoonImage } from './CartoonImage';

interface MisiPembelajaranPageProps {
  onNavigate: (route: PageRoute) => void;
}

type AsasAnswers = Record<'sifat' | 'warna' | 'ukuran' | 'bentuk' | 'waktu', string>;

const EMPTY_ASAS_ANSWERS: AsasAnswers = {
  sifat: '',
  warna: '',
  ukuran: '',
  bentuk: '',
  waktu: '',
};

function FocusIcon({ name }: { name: 'heart' | 'palette' | 'ruler' | 'shapes' | 'clock' }) {
  switch (name) {
    case 'heart':
      return <Heart className="h-6 w-6 text-[#29466B]" />;
    case 'palette':
      return <Palette className="h-6 w-6 text-[#29466B]" />;
    case 'ruler':
      return <Ruler className="h-6 w-6 text-[#29466B]" />;
    case 'shapes':
      return <Shapes className="h-6 w-6 text-[#29466B]" />;
    case 'clock':
      return <Clock className="h-6 w-6 text-[#29466B]" />;
  }
}

function GroupIcon({ name }: { name: 'search' | 'gamepad' | 'pen' }) {
  if (name === 'search') return <Search className="h-6 w-6 text-[#29466B]" />;
  if (name === 'gamepad') return <Gamepad2 className="h-6 w-6 text-[#29466B]" />;
  return <PenTool className="h-6 w-6 text-[#29466B]" />;
}

export function MisiPembelajaranPage({ onNavigate }: MisiPembelajaranPageProps) {
  // Kumpulan Asas state
  const [asasAnswers, setAsasAnswers] = useState<AsasAnswers>(EMPTY_ASAS_ANSWERS);
  const [asasChecked, setAsasChecked] = useState(false);
  const [showAsasClues, setShowAsasClues] = useState(true);

  // Zoom modal for Kumpulan Asas passage image
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);

  // Kumpulan Sederhana game embed state
  const [gameIframeKey, setGameIframeKey] = useState(0);
  const [isGameExpanded, setIsGameExpanded] = useState(false);

  // Kumpulan Baik Padlet embed state
  const [padletIframeKey, setPadletIframeKey] = useState(0);
  const [isPadletExpanded, setIsPadletExpanded] = useState(false);

  useEffect(() => {
    if (!isZoomOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsZoomOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isZoomOpen]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Evaluate Kumpulan Asas
  const asasResults = ASAS_WORKSHEET_ITEMS.map((item) => {
    const val = asasAnswers[item.id].trim().toLowerCase();
    const isCorrect = val.length > 0 && item.acceptedAnswers.includes(val);
    return { id: item.id, isCorrect, isEmpty: val.length === 0 };
  });
  const asasScore = asasResults.filter((r) => r.isCorrect).length;
  const asasAllCorrect = asasChecked && asasScore === ASAS_WORKSHEET_ITEMS.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      className="flex flex-col"
    >
      {/* 1. Bahagian Pengenalan */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#83C9F4]/35 via-[#EDF7FD] to-[#FFF8E8] border-b-2 border-[#29466B]/10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-stretch gap-8 px-4 py-10 sm:px-6 md:py-14 lg:grid-cols-12 lg:gap-10 lg:px-8">
          <div className="flex flex-col justify-center gap-5 lg:col-span-6">
            <p className="font-display text-sm font-extrabold tracking-wide text-[#29466B]/80">
              Fasa 4 · Langkah 2 · Keselamatan di Jalan Raya
            </p>

            <h1 className="font-display text-3xl font-black leading-tight text-[#29466B] sm:text-5xl [text-wrap:balance]">
              Misi Ejen Kata Adjektif: Cabaran 2 – Ejen Bijak
            </h1>

            <p className="max-w-xl text-base font-semibold leading-relaxed text-[#29466B]/90 sm:text-lg">
              Selamat datang, Ejen Bijak! Pilih aktiviti mengikut kumpulan kamu dan lengkapkan
              cabaran kata adjektif bertemakan keselamatan di jalan raya.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => scrollToSection('pilih-kumpulan')}
                className="cartoon-btn inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-2xl bg-[#FFD966] px-6 py-3 font-display text-base font-black text-[#29466B] cursor-pointer whitespace-nowrap"
              >
                <span>Jom Mula!</span>
                <ArrowDown className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex items-stretch lg:col-span-6">
            <div className="cartoon-card w-full overflow-hidden rounded-3xl bg-white p-2.5 sm:p-3">
              <CartoonImage
                src={MISI_INTRO_IMAGE}
                alt="Ilustrasi kartun ejen muda memegang papan klip dan memerhatikan perkataan di kawasan keselamatan jalan raya"
                fallbackTitle="Misi Ejen Kata Adjektif: Cabaran 2 – Ejen Bijak"
                className="h-full min-h-[260px] w-full rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Fokus Pembelajaran & Pemilihan Kumpulan */}
      <section id="pilih-kumpulan" className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="cartoon-card mb-10 rounded-3xl bg-white p-6 sm:p-8 lg:p-10">
          <div className="mb-6 flex flex-col gap-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FFD966] border-2 border-[#29466B]/20">
                <Lightbulb className="h-5 w-5 text-[#29466B]" />
              </div>
              <p className="font-display text-sm font-extrabold text-[#29466B]/75">
                Fokus Pembelajaran Langkah 2
              </p>
            </div>

            <h2 className="font-display text-2xl font-black text-[#29466B] sm:text-3xl [text-wrap:balance]">
              Lima Jenis Kata Adjektif
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {FOKUS_KATA_ADJEKTIF.map((item) => (
              <div
                key={item.number}
                className={`cartoon-card-interactive flex flex-col justify-between rounded-3xl ${item.cardBg} p-5`}
              >
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.iconBg} border-2 border-[#29466B]/18`}
                    >
                      <FocusIcon name={item.iconName} />
                    </div>
                    <span className="font-display text-lg font-black text-[#29466B]/55 tabular-nums">
                      0{item.number}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-black text-[#29466B] leading-snug">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-sm font-semibold text-[#29466B]/85">{item.shortHint}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tiga Kad Pilihan Kumpulan */}
        <div className="mb-6 flex flex-col gap-2">
          <p className="font-display text-sm font-extrabold text-[#29466B]/70">
            Aktiviti Mengikut Aras Pencapaian Murid
          </p>
          <h2 className="font-display text-2xl font-black text-[#29466B] sm:text-3xl [text-wrap:balance]">
            Pilih Kumpulan Misi Kamu!
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {GROUP_OVERVIEW_CARDS.map((card) => {
            const isDone = card.id === 'kumpulan-asas' && asasAllCorrect;

            return (
              <article
                key={card.id}
                className={`cartoon-card-interactive flex flex-col justify-between rounded-3xl ${card.cardBg} p-6`}
              >
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${card.iconBg} border-2 border-[#29466B]/20`}
                    >
                      <GroupIcon name={card.iconName} />
                    </div>
                    <span className="font-display text-sm font-black text-[#29466B]/80">
                      {isDone ? 'Selesai' : card.level}
                    </span>
                  </div>

                  <p className="font-display text-xs font-extrabold text-[#29466B]/70">
                    {card.level}
                  </p>
                  <h3 className="mt-0.5 font-display text-xl font-black text-[#29466B]">
                    {card.title}
                  </h3>
                  <p className="mt-2.5 text-base font-semibold leading-relaxed text-[#29466B]/90">
                    {card.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => scrollToSection(card.id)}
                  className="cartoon-btn mt-5 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-2.5 font-display text-sm font-black text-[#29466B] cursor-pointer hover:bg-[#FFD966]"
                >
                  <span>Pergi ke Aktiviti</span>
                  <ArrowDown className="h-4 w-4" />
                </button>
              </article>
            );
          })}
        </div>
      </section>

      {/* 3. AKTIVITI 1: KUMPULAN ASAS – CARI DAN SENARAIKAN */}
      <section id="kumpulan-asas" className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="cartoon-card rounded-3xl bg-white p-5 sm:p-8 lg:p-10">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-display text-sm font-extrabold text-[#29466B]/70">
                Aktiviti 1 · Kumpulan Asas
              </p>
              <h2 className="font-display text-2xl font-black text-[#29466B] sm:text-3xl [text-wrap:balance]">
                Kumpulan Asas – Cari dan Senaraikan
              </h2>
              <p className="mt-2 max-w-3xl text-base font-semibold text-[#29466B]/90">
                Perhatikan gambar petikan “Keselamatan di Jalan Raya”. Kemudian, cari dan senaraikan
                lima kata adjektif pada lembaran kerja digital di sebelah.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowAsasClues((prev) => !prev)}
              className="cartoon-btn inline-flex min-h-[44px] shrink-0 items-center gap-2 self-start rounded-2xl bg-[#FFF6DA] px-4 py-2 font-display text-sm font-black text-[#29466B] cursor-pointer whitespace-nowrap"
            >
              <HelpCircle className="h-4 w-4" />
              <span>{showAsasClues ? 'Sembunyi Petunjuk' : 'Papar Petunjuk'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
            {/* Gambar Petikan Keselamatan di Jalan Raya */}
            <div className="rounded-3xl border-2 border-[#29466B]/16 bg-[#FFF8E8] p-4 sm:p-5 lg:col-span-6">
              <div className="mb-3 flex items-center justify-between gap-2">
                <p className="font-display text-base font-black text-[#29466B]">
                  Petikan: Keselamatan di Jalan Raya
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setZoomScale(1.25);
                    setIsZoomOpen(true);
                  }}
                  className="inline-flex min-h-[38px] items-center gap-1.5 rounded-xl border-2 border-[#29466B]/20 bg-white px-3 py-1.5 font-display text-xs font-black text-[#29466B] cursor-pointer hover:bg-[#FFD966]/40 whitespace-nowrap"
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                  <span>Zum Gambar</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  setZoomScale(1.25);
                  setIsZoomOpen(true);
                }}
                aria-label="Klik untuk besarkan gambar petikan Keselamatan di Jalan Raya"
                className="block w-full overflow-hidden rounded-2xl border-2 border-[#29466B]/14 bg-white cursor-zoom-in focus-visible:outline-2 focus-visible:outline-[#29466B]"
              >
                <CartoonImage
                  src={PASSAGE_IMAGE_PATH}
                  alt="Petikan bacaan asal bertajuk Keselamatan di Jalan Raya"
                  fallbackTitle="Petikan: Keselamatan di Jalan Raya"
                  className="h-auto w-full object-contain"
                />
              </button>
            </div>

            {/* Lembaran Kerja Digital 5 Kata Adjektif */}
            <div className="flex flex-col gap-4 lg:col-span-6">
              {ASAS_WORKSHEET_ITEMS.map((item) => {
                const res = asasResults.find((r) => r.id === item.id);
                return (
                  <div
                    key={item.id}
                    className={`rounded-2xl border-2 border-[#29466B]/14 ${item.bg} p-4`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <label
                        htmlFor={`asas-input-${item.id}`}
                        className="font-display text-base font-black text-[#29466B]"
                      >
                        <span className="tabular-nums">{item.number}.</span> {item.label}
                      </label>

                      {asasChecked && res && (
                        <span className="inline-flex items-center gap-1 font-display text-xs font-black text-[#29466B]">
                          {res.isCorrect ? (
                            <>
                              <CheckCircle2 className="h-4 w-4 text-[#1E6F43]" />
                              <span>Tepat!</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="h-4 w-4 text-[#B42318]" />
                              <span>Cuba semak</span>
                            </>
                          )}
                        </span>
                      )}
                    </div>

                    {showAsasClues && (
                      <p className="mt-1 text-xs sm:text-sm font-bold text-[#29466B]/80">
                        {item.clue}
                      </p>
                    )}

                    <input
                      id={`asas-input-${item.id}`}
                      type="text"
                      value={asasAnswers[item.id]}
                      onChange={(e) => {
                        setAsasAnswers((prev) => ({ ...prev, [item.id]: e.target.value }));
                        if (asasChecked) setAsasChecked(false);
                      }}
                      placeholder={item.placeholder}
                      className="mt-2 w-full rounded-xl border-2 border-[#29466B]/20 bg-white px-3.5 py-2.5 text-base font-bold text-[#29466B] placeholder:text-[#29466B]/45 focus:border-[#29466B] focus:outline-none"
                    />

                    {asasChecked && res && !res.isCorrect && (
                      <p className="mt-1.5 text-xs font-bold text-[#29466B]">
                        Panduan jawapan daripada petikan:{' '}
                        <span className="underline">{item.sampleAnswer}</span>
                      </p>
                    )}
                  </div>
                );
              })}

              {asasChecked && (
                <div
                  role="status"
                  className={`flex items-center gap-3 rounded-2xl border-2 p-4 ${
                    asasAllCorrect
                      ? 'border-[#A8DDB5] bg-[#ECF9F0]'
                      : 'border-[#FFD966] bg-[#FFF6DA]'
                  }`}
                >
                  <Sparkles className="h-5 w-5 shrink-0 text-[#29466B]" />
                  <p className="font-display text-sm sm:text-base font-black text-[#29466B] tabular-nums">
                    {asasAllCorrect
                      ? 'Syabas, Ejen Asas! Kelima-lima kata adjektif berjaya dikenal pasti (5/5).'
                      : `Bagus! Kamu berjaya menjawab ${asasScore}/5 dengan tepat. Cuba perbaiki jawapan yang lain!`}
                  </p>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setAsasChecked(true)}
                  className="cartoon-btn inline-flex min-h-[46px] items-center gap-2 rounded-2xl bg-[#FFD966] px-6 py-2.5 font-display text-base font-black text-[#29466B] cursor-pointer whitespace-nowrap"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Semak Jawapan</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setAsasAnswers(EMPTY_ASAS_ANSWERS);
                    setAsasChecked(false);
                  }}
                  className="cartoon-btn inline-flex min-h-[46px] items-center gap-2 rounded-2xl bg-white px-5 py-2.5 font-display text-base font-extrabold text-[#29466B] cursor-pointer whitespace-nowrap"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Cuba Lagi</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Zum Gambar Petikan Asal */}
      {isZoomOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Paparan besar petikan Keselamatan di Jalan Raya"
          className="fixed inset-0 z-50 flex flex-col bg-[#29466B]/85 p-3 sm:p-6 backdrop-blur-xs"
        >
          <div className="mx-auto mb-3 flex w-full max-w-5xl flex-wrap items-center justify-between gap-2 rounded-2xl bg-white px-4 py-2.5 border-2 border-[#29466B]">
            <p className="font-display text-sm sm:text-base font-black text-[#29466B] tabular-nums">
              Petikan: Keselamatan di Jalan Raya ({Math.round(zoomScale * 100)}%)
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setZoomScale((s) => Math.max(0.75, Number((s - 0.25).toFixed(2))))}
                aria-label="Kecilkan gambar"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[#29466B]/25 bg-[#FFF8E8] text-[#29466B] cursor-pointer hover:bg-[#FFD966]/40"
              >
                <ZoomOut className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setZoomScale((s) => Math.min(2.25, Number((s + 0.25).toFixed(2))))}
                aria-label="Besarkan gambar"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[#29466B]/25 bg-[#FFF8E8] text-[#29466B] cursor-pointer hover:bg-[#FFD966]/40"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsZoomOpen(false)}
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl border-2 border-[#29466B] bg-[#FF8585] px-3.5 py-1.5 font-display text-sm font-black text-[#29466B] cursor-pointer"
              >
                <X className="h-4 w-4" />
                <span>Tutup</span>
              </button>
            </div>
          </div>

          <div className="mx-auto flex-1 w-full max-w-5xl overflow-auto rounded-2xl bg-[#FFF8E8] p-4">
            <div className="flex min-h-full items-start justify-center">
              <img
                src={PASSAGE_IMAGE_PATH}
                alt="Petikan bacaan bertajuk Keselamatan di Jalan Raya dalam paparan besar"
                referrerPolicy="no-referrer"
                style={{ width: `${zoomScale * 100}%`, maxWidth: 'none' }}
                className="h-auto rounded-xl shadow-md"
              />
            </div>
          </div>
        </div>
      )}

      {/* 4. AKTIVITI 2: KUMPULAN SEDERHANA – LENGKAPKAN AYAT (PAPARAN PERMAINAN DIGITAL) */}
      <section
        id="kumpulan-sederhana"
        className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
      >
        <div className="cartoon-card rounded-3xl bg-white p-4 sm:p-6 lg:p-8">
          <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <p className="font-display text-sm font-extrabold text-[#29466B]/70">
                Aktiviti 2 · Kumpulan Sederhana
              </p>
              <h2 className="font-display text-2xl font-black text-[#29466B] sm:text-3xl [text-wrap:balance]">
                Kumpulan Sederhana – Lengkapkan Ayat
              </h2>
              <p className="mt-2 text-base font-semibold leading-relaxed text-[#29466B]/90">
                Mainkan permainan digital di bawah dan pilih kata adjektif yang paling sesuai untuk
                melengkapkan ayat.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => setGameIframeKey((k) => k + 1)}
                className="cartoon-btn inline-flex min-h-[44px] items-center gap-2 rounded-2xl bg-[#FFF8E8] px-4 py-2 font-display text-sm font-extrabold text-[#29466B] cursor-pointer whitespace-nowrap"
              >
                <RotateCw className="h-4 w-4" />
                <span>Muat Semula</span>
              </button>

              <button
                type="button"
                onClick={() => setIsGameExpanded((prev) => !prev)}
                className="cartoon-btn inline-flex min-h-[44px] items-center gap-2 rounded-2xl bg-[#83C9F4] px-4 py-2 font-display text-sm font-extrabold text-[#29466B] cursor-pointer whitespace-nowrap"
              >
                {isGameExpanded ? (
                  <>
                    <Minimize2 className="h-4 w-4" />
                    <span>Paparan Biasa</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="h-4 w-4" />
                    <span>Luaskan Paparan</span>
                  </>
                )}
              </button>

              <a
                href={EJEN_GAME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="cartoon-btn inline-flex min-h-[44px] items-center gap-2 rounded-2xl bg-[#FFD966] px-5 py-2 font-display text-sm sm:text-base font-black text-[#29466B] whitespace-nowrap"
              >
                <span>Mula Cabaran 2 – Ejen Bijak</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div
            className={`relative w-full overflow-hidden rounded-2xl border-2 border-[#29466B]/18 bg-[#FFF8E8] ${
              isGameExpanded ? 'h-[82vh] min-h-[680px]' : 'h-[620px] sm:h-[700px] lg:h-[760px]'
            }`}
          >
            <iframe
              key={gameIframeKey}
              src={EJEN_GAME_URL}
              title="Permainan Digital Misi Ejen Kata Adjektif Cabaran 2 Ejen Bijak"
              allow="fullscreen; clipboard-write"
              referrerPolicy="strict-origin-when-cross-origin"
              className="h-full w-full border-0"
            />
          </div>

          <div className="mt-4 flex flex-col items-start justify-between gap-3 rounded-2xl bg-[#FFF8E8] border-2 border-[#29466B]/10 p-4 sm:flex-row sm:items-center">
            <p className="text-sm font-bold text-[#29466B]/85">
              Jika paparan permainan di atas tidak dimuatkan oleh pelayar anda, tekan butang di
              sebelah untuk membuka permainan dalam tab baharu.
            </p>
            <a
              href={EJEN_GAME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cartoon-btn inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-2xl bg-[#FFD966] px-5 py-2.5 font-display text-sm font-black text-[#29466B] whitespace-nowrap"
            >
              <span>Mula Cabaran 2 – Ejen Bijak</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 5. AKTIVITI 3: KUMPULAN BAIK – BINA AYAT (PAPARAN PADLET) */}
      <section id="kumpulan-baik" className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="cartoon-card rounded-3xl bg-white p-4 sm:p-6 lg:p-8">
          <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <p className="font-display text-sm font-extrabold text-[#29466B]/70">
                Aktiviti 3 · Kumpulan Baik
              </p>
              <h2 className="font-display text-2xl font-black text-[#29466B] sm:text-3xl [text-wrap:balance]">
                Kumpulan Baik – Bina Ayat
              </h2>
              <p className="mt-2 text-base font-semibold leading-relaxed text-[#29466B]/90">
                Perhatikan gambar dan kata adjektif pada papan Padlet di bawah. Kemudian, bina
                sekurang-kurangnya tiga ayat gramatis berkaitan situasi dalam gambar.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => setPadletIframeKey((k) => k + 1)}
                className="cartoon-btn inline-flex min-h-[44px] items-center gap-2 rounded-2xl bg-[#FFF8E8] px-4 py-2 font-display text-sm font-extrabold text-[#29466B] cursor-pointer whitespace-nowrap"
              >
                <RotateCw className="h-4 w-4" />
                <span>Muat Semula</span>
              </button>

              <button
                type="button"
                onClick={() => setIsPadletExpanded((prev) => !prev)}
                className="cartoon-btn inline-flex min-h-[44px] items-center gap-2 rounded-2xl bg-[#83C9F4] px-4 py-2 font-display text-sm font-extrabold text-[#29466B] cursor-pointer whitespace-nowrap"
              >
                {isPadletExpanded ? (
                  <>
                    <Minimize2 className="h-4 w-4" />
                    <span>Paparan Biasa</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="h-4 w-4" />
                    <span>Luaskan Paparan</span>
                  </>
                )}
              </button>

              <a
                href={KUMPULAN_BAIK_PADLET_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="cartoon-btn inline-flex min-h-[44px] items-center gap-2 rounded-2xl bg-[#FFD966] px-5 py-2 font-display text-sm sm:text-base font-black text-[#29466B] whitespace-nowrap"
              >
                <span>Buka Padlet – Bina Ayat</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div
            className={`relative w-full overflow-hidden rounded-2xl border-2 border-[#29466B]/18 bg-[#FFF8E8] ${
              isPadletExpanded ? 'h-[82vh] min-h-[680px]' : 'h-[620px] sm:h-[700px] lg:h-[760px]'
            }`}
          >
            <iframe
              key={padletIframeKey}
              src={KUMPULAN_BAIK_PADLET_EMBED_URL}
              title="Papan Padlet Bina Ayat Kumpulan Baik"
              allow="camera; microphone; geolocation; clipboard-write"
              referrerPolicy="strict-origin-when-cross-origin"
              className="h-full w-full border-0"
            />
          </div>

          <div className="mt-4 flex flex-col items-start justify-between gap-3 rounded-2xl bg-[#FFF8E8] border-2 border-[#29466B]/10 p-4 sm:flex-row sm:items-center">
            <p className="text-sm font-bold text-[#29466B]/85">
              Jika papan Padlet tidak dipaparkan atau anda ingin paparan skrin penuh yang lebih
              selesa untuk menaip ayat, tekan butang di sebelah untuk membukanya dalam tab baharu.
            </p>
            <a
              href={KUMPULAN_BAIK_PADLET_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cartoon-btn inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-2xl bg-[#FFD966] px-5 py-2.5 font-display text-sm font-black text-[#29466B] whitespace-nowrap"
            >
              <span>Buka Padlet – Bina Ayat</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 6. Penutup Halaman & Navigasi ke Langkah 3 */}
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="cartoon-card overflow-hidden rounded-3xl bg-gradient-to-r from-[#A8DDB5]/50 via-[#ECF9F0] to-[#FFF6DA] p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-2xl border-2 border-[#29466B]/14 bg-white">
                <CartoonImage
                  src={MISI_SUCCESS_IMAGE}
                  alt="Ilustrasi kartun murid tersenyum bangga selepas berjaya menyelesaikan misi kata adjektif"
                  fallbackTitle="Misi Langkah 2 Selesai!"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 lg:col-span-7">
              <div className="inline-flex items-center gap-2 font-display text-sm font-extrabold text-[#29466B]/75">
                <Sparkles className="h-4 w-4" />
                <span>Rumusan Langkah 2 · Fasa 4</span>
              </div>

              <h2 className="font-display text-3xl font-black text-[#29466B] sm:text-4xl [text-wrap:balance]">
                Hebat, Ejen Bijak!
              </h2>

              <p className="max-w-xl text-base font-semibold leading-relaxed text-[#29466B]/90 sm:text-lg">
                Penggunaan kata adjektif sifat, warna, ukuran, bentuk dan waktu dalam ayat
                menjadikan penerangan tentang keselamatan di jalan raya lebih jelas, tepat dan
                menarik.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pt-2 pb-16 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => onNavigate(PageRoute.KENALI_KATA_ADJEKTIF)}
            className="cartoon-btn inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 font-display text-sm sm:text-base font-extrabold text-[#29466B] cursor-pointer whitespace-nowrap"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Kembali ke Langkah 1</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate(PageRoute.KUIZ_PENTAKSIRAN)}
            className="cartoon-btn inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-[#FFD966] px-6 py-3 font-display text-sm sm:text-base font-black text-[#29466B] cursor-pointer whitespace-nowrap"
          >
            <span>Teruskan ke Langkah 3</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </motion.div>
  );
}
