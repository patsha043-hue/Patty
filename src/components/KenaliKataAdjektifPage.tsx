import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Maximize2,
  Minimize2,
  RotateCw,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import {
  ADJECTIVE_TYPES_DETAILED,
  LANGKAH1_INTRO_IMAGE,
  LANGKAH1_PADLET_EMBED_URL,
  LANGKAH1_PADLET_URL,
  ORIGINAL_PASSAGE_PARAGRAPHS,
  ORIGINAL_PASSAGE_TITLE,
  PASSAGE_IMAGE_PATH,
} from '../data/kenaliKataAdjektifContent';
import { AdjectiveTypeDetail, PageRoute } from '../types';
import { AdjectiveTypeCartoonIcon } from './CartoonIllustrations';
import { CartoonImage } from './CartoonImage';

interface KenaliKataAdjektifPageProps {
  onNavigate: (route: PageRoute) => void;
}

export function KenaliKataAdjektifPage({ onNavigate }: KenaliKataAdjektifPageProps) {
  const [selectedAdjective, setSelectedAdjective] = useState<AdjectiveTypeDetail>(
    ADJECTIVE_TYPES_DETAILED[0]
  );

  // Guided reading state for Misi 1 (no AI audio/voice)
  const [isReadingMode, setIsReadingMode] = useState(false);
  const [activeParagraph, setActiveParagraph] = useState(0);

  // Zoom modal state for original RPH passage poster
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);

  // Padlet embed controls for Misi 2
  const [iframeKey, setIframeKey] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

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

  const handleStartReading = () => {
    setIsReadingMode(true);
    setActiveParagraph(0);
    const card = document.getElementById('ruang-bacaan-petikan');
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      className="flex flex-col"
    >
      {/* 1. Bahagian Tajuk & Pengenalan Halaman */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#83C9F4]/35 via-[#EDF7FD] to-[#FFF8E8] border-b-2 border-[#29466B]/10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-stretch gap-8 px-4 py-10 sm:px-6 md:py-14 lg:grid-cols-12 lg:gap-10 lg:px-8">
          <div className="flex flex-col justify-center gap-5 lg:col-span-6">
            <p className="font-display text-sm font-extrabold tracking-wide text-[#29466B]/80">
              Fasa 3 · Bahasa Melayu Tahun 2
            </p>

            <h1 className="font-display text-3xl font-black leading-tight text-[#29466B] sm:text-5xl [text-wrap:balance]">
              LANGKAH 1: JOM KENALI KATA ADJEKTIF!
            </h1>

            <p className="max-w-xl text-base font-semibold leading-relaxed text-[#29466B]/90 sm:text-lg">
              Selamat datang, ejen kata adjektif! Hari ini kita akan membaca petikan tentang
              keselamatan di jalan raya dan mencari kata adjektif yang terdapat di dalamnya.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => scrollToSection('misi-1-petikan')}
                className="cartoon-btn inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-2xl bg-[#FFD966] px-6 py-3 font-display text-base font-black text-[#29466B] cursor-pointer whitespace-nowrap"
              >
                <span>Mulakan Misi</span>
                <ArrowDown className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex items-stretch lg:col-span-6">
            <div className="cartoon-card w-full overflow-hidden rounded-3xl bg-white p-2.5 sm:p-3">
              <CartoonImage
                src={LANGKAH1_INTRO_IMAGE}
                alt="Ilustrasi kartun 2D dua orang murid ejen kata adjektif memegang kanta pembesar dan buku di kawasan keselamatan jalan raya"
                fallbackTitle="Ejen Kata Adjektif"
                className="h-full min-h-[260px] w-full rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Pengenalan Kata Adjektif */}
      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="cartoon-card rounded-3xl bg-white p-6 sm:p-8 lg:p-10">
          <div className="mb-7 flex flex-col gap-2">
            <h2 className="font-display text-2xl font-black text-[#29466B] sm:text-3xl [text-wrap:balance]">
              Kenali Lima Jenis Kata Adjektif
            </h2>
            <p className="max-w-3xl text-base font-semibold leading-relaxed text-[#29466B]/90 sm:text-lg">
              Kata adjektif ialah perkataan yang menerangkan sifat atau keadaan sesuatu.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {ADJECTIVE_TYPES_DETAILED.map((item) => {
              const isSelected = selectedAdjective.id === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedAdjective(item)}
                  aria-pressed={isSelected}
                  className={`cartoon-card-interactive flex flex-col justify-between rounded-3xl ${item.cardBg} p-5 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#29466B] ${
                    isSelected ? 'ring-3 ring-[#29466B]' : ''
                  }`}
                >
                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <span className="font-display text-lg font-black text-[#29466B]/60 tabular-nums">
                        0{item.number}
                      </span>
                      <span className="font-display text-xs font-extrabold text-[#29466B]/75">
                        {isSelected ? 'Dipilih' : 'Pilih'}
                      </span>
                    </div>

                    <div className="mb-4 flex justify-center">
                      <AdjectiveTypeCartoonIcon type={item.id} />
                    </div>

                    <h3 className="font-display text-lg font-black leading-snug text-[#29466B]">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm font-semibold text-[#29466B]/85">{item.shortDesc}</p>
                  </div>

                  <p className="mt-4 border-t border-[#29466B]/10 pt-3 font-display text-sm font-black text-[#29466B]">
                    {item.examples.join(' · ')}
                  </p>
                </button>
              );
            })}
          </div>

          <div
            aria-live="polite"
            className={`mt-5 flex flex-col items-start justify-between gap-3 rounded-2xl border-2 border-[#29466B]/14 ${selectedAdjective.cardBg} px-5 py-4 sm:flex-row sm:items-center`}
          >
            <div>
              <p className="font-display text-xs font-extrabold text-[#29466B]/70">
                Contoh {selectedAdjective.title}
              </p>
              <p className="mt-0.5 font-display text-base sm:text-lg font-black text-[#29466B]">
                “{selectedAdjective.roadSafetySentence}”
              </p>
            </div>
            <p className="shrink-0 font-display text-sm font-extrabold text-[#29466B]">
              Kata adjektif:{' '}
              <span className="underline decoration-2">{selectedAdjective.highlightedWord}</span>
            </p>
          </div>
        </div>
      </section>

      {/* 3. MISI 1: BACA DAN FAHAMI PETIKAN */}
      <section id="misi-1-petikan" className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="cartoon-card rounded-3xl bg-white p-5 sm:p-8 lg:p-10">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h2 className="font-display text-2xl font-black text-[#29466B] sm:text-3xl [text-wrap:balance]">
                MISI 1: BACA DAN FAHAMI PETIKAN
              </h2>
              <p className="mt-2 text-base font-semibold leading-relaxed text-[#29466B]/90">
                Baca petikan ini bersama-sama guru. Perhatikan perkataan yang menerangkan sifat,
                warna, ukuran, bentuk dan waktu.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={handleStartReading}
                className="cartoon-btn inline-flex min-h-[44px] items-center justify-center gap-2 rounded-2xl bg-[#83C9F4] px-5 py-2.5 font-display text-sm sm:text-base font-black text-[#29466B] cursor-pointer whitespace-nowrap"
              >
                <BookOpen className="h-4 w-4" />
                <span>Baca Petikan</span>
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('misi-2-padlet')}
                className="cartoon-btn inline-flex min-h-[44px] items-center justify-center gap-2 rounded-2xl bg-[#FFD966] px-5 py-2.5 font-display text-sm sm:text-base font-black text-[#29466B] cursor-pointer whitespace-nowrap"
              >
                <span>Teruskan Misi</span>
                <ArrowDown className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12">
            {/* Ruang Bacaan Petikan Asal */}
            <div
              id="ruang-bacaan-petikan"
              className="flex flex-col justify-between rounded-3xl border-2 border-[#29466B]/16 bg-[#FFF8E8] p-5 sm:p-8 lg:col-span-7"
            >
              <div>
                <div className="mb-5 flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#29466B]/10 pb-4">
                  <h3 className="font-display text-xl sm:text-2xl font-black tracking-wide text-[#29466B]">
                    {ORIGINAL_PASSAGE_TITLE}
                  </h3>
                  {isReadingMode && (
                    <span className="font-display text-xs sm:text-sm font-black text-[#29466B] tabular-nums">
                      Perenggan {activeParagraph + 1} / {ORIGINAL_PASSAGE_PARAGRAPHS.length}
                    </span>
                  )}
                </div>

                <div className="space-y-4">
                  {ORIGINAL_PASSAGE_PARAGRAPHS.map((paragraph, index) => {
                    const isCurrent = isReadingMode && activeParagraph === index;
                    const isDimmed = isReadingMode && activeParagraph !== index;
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          if (isReadingMode) setActiveParagraph(index);
                        }}
                        className={`rounded-2xl p-4 transition-all duration-200 ${
                          isCurrent
                            ? 'bg-white border-2 border-[#29466B] shadow-sm'
                            : isDimmed
                              ? 'bg-white/45 border-2 border-transparent opacity-60 cursor-pointer hover:opacity-85'
                              : 'bg-white/85 border-2 border-[#29466B]/10'
                        }`}
                      >
                        <p className="text-base sm:text-lg font-bold leading-relaxed text-[#29466B]">
                          {paragraph}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {isReadingMode && (
                <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t-2 border-[#29466B]/10 pt-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={activeParagraph === 0}
                      onClick={() => setActiveParagraph((p) => Math.max(0, p - 1))}
                      className="cartoon-btn inline-flex min-h-[40px] items-center gap-1 rounded-xl bg-white px-3.5 py-1.5 font-display text-sm font-extrabold text-[#29466B] cursor-pointer disabled:opacity-45"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span>Sebelum</span>
                    </button>
                    <button
                      type="button"
                      disabled={activeParagraph === ORIGINAL_PASSAGE_PARAGRAPHS.length - 1}
                      onClick={() =>
                        setActiveParagraph((p) =>
                          Math.min(ORIGINAL_PASSAGE_PARAGRAPHS.length - 1, p + 1)
                        )
                      }
                      className="cartoon-btn inline-flex min-h-[40px] items-center gap-1 rounded-xl bg-[#A8DDB5] px-3.5 py-1.5 font-display text-sm font-black text-[#29466B] cursor-pointer disabled:opacity-45"
                    >
                      <span>Seterusnya</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsReadingMode(false)}
                    className="inline-flex min-h-[40px] items-center rounded-xl border-2 border-[#29466B]/20 bg-white px-3.5 py-1.5 font-display text-xs sm:text-sm font-extrabold text-[#29466B] cursor-pointer hover:bg-[#FFD966]/35"
                  >
                    Papar Semua
                  </button>
                </div>
              )}
            </div>

            {/* Poster Petikan Asal */}
            <div className="flex flex-col justify-between rounded-3xl border-2 border-[#29466B]/16 bg-[#EAF6FD]/60 p-4 sm:p-5 lg:col-span-5">
              <div>
                <div className="mb-3 flex items-center justify-end">
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
                  aria-label="Klik untuk besarkan gambar petikan asal Keselamatan di Jalan Raya"
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

      {/* 4. MISI 2: KONGSIKAN JAWAPAN KAMU! (Padlet) */}
      <section id="misi-2-padlet" className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="cartoon-card rounded-3xl bg-white p-4 sm:p-6 lg:p-8">
          <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <h2 className="font-display text-2xl font-black text-[#29466B] sm:text-3xl [text-wrap:balance]">
                MISI 2: KONGSIKAN JAWAPAN KAMU!
              </h2>
              <p className="mt-2 text-base font-semibold leading-relaxed text-[#29466B]/90">
                Tulis kata adjektif yang kamu temukan dalam petikan pada Padlet. Bincangkan jawapan
                bersama pasangan sebelum menghantarnya.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => setIframeKey((k) => k + 1)}
                className="cartoon-btn inline-flex min-h-[44px] items-center gap-2 rounded-2xl bg-[#FFF8E8] px-4 py-2 font-display text-sm font-extrabold text-[#29466B] cursor-pointer whitespace-nowrap"
              >
                <RotateCw className="h-4 w-4" />
                <span>Muat Semula</span>
              </button>

              <button
                type="button"
                onClick={() => setIsExpanded((prev) => !prev)}
                className="cartoon-btn inline-flex min-h-[44px] items-center gap-2 rounded-2xl bg-[#83C9F4] px-4 py-2 font-display text-sm font-extrabold text-[#29466B] cursor-pointer whitespace-nowrap"
              >
                {isExpanded ? (
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
                href={LANGKAH1_PADLET_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="cartoon-btn inline-flex min-h-[44px] items-center gap-2 rounded-2xl bg-[#FFD966] px-5 py-2 font-display text-sm sm:text-base font-black text-[#29466B] whitespace-nowrap"
              >
                <span>Buka Padlet dan Hantar Jawapan</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div
            className={`relative w-full overflow-hidden rounded-2xl border-2 border-[#29466B]/18 bg-[#FFF8E8] ${
              isExpanded ? 'h-[82vh] min-h-[680px]' : 'h-[600px] sm:h-[680px] lg:h-[740px]'
            }`}
          >
            <iframe
              key={iframeKey}
              src={LANGKAH1_PADLET_EMBED_URL}
              title="Papan Padlet Kongsikan Jawapan Kata Adjektif"
              allow="camera; microphone; geolocation; clipboard-write"
              referrerPolicy="strict-origin-when-cross-origin"
              className="h-full w-full border-0"
            />
          </div>

          <div className="mt-4 flex flex-col items-start justify-between gap-3 rounded-2xl bg-[#FFF8E8] border-2 border-[#29466B]/10 p-4 sm:flex-row sm:items-center">
            <p className="text-sm font-bold text-[#29466B]/85">
              Tekan butang di sebelah untuk membuka Padlet dalam tab baharu dan menghantar jawapan
              kamu.
            </p>
            <a
              href={LANGKAH1_PADLET_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cartoon-btn inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-2xl bg-[#FFD966] px-5 py-2.5 font-display text-sm font-black text-[#29466B] whitespace-nowrap"
            >
              <span>Buka Padlet dan Hantar Jawapan</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 5. Penutup Langkah 1 & Navigasi */}
      <section className="mx-auto w-full max-w-7xl px-4 pt-6 pb-16 sm:px-6 lg:px-8">
        <div className="cartoon-card rounded-3xl bg-gradient-to-r from-[#83C9F4]/40 via-[#EDF7FD] to-[#A8DDB5]/45 p-6 sm:p-10">
          <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl font-black text-[#29466B] sm:text-3xl [text-wrap:balance]">
                Tahniah, Ejen Kata Adjektif!
              </h2>
              <p className="mt-2 text-base font-semibold leading-relaxed text-[#29466B]/90 sm:text-lg">
                Kamu telah selesai membaca petikan Keselamatan di Jalan Raya dan berkongsi kata
                adjektif bersama pasangan di Padlet. Jom teruskan ke misi seterusnya!
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => onNavigate(PageRoute.SET_INDUKSI)}
                className="cartoon-btn inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 font-display text-sm sm:text-base font-extrabold text-[#29466B] cursor-pointer whitespace-nowrap"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Kembali ke Set Induksi</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate(PageRoute.MISI_PEMBELAJARAN)}
                className="cartoon-btn inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-[#FFD966] px-6 py-3 font-display text-sm sm:text-base font-black text-[#29466B] cursor-pointer whitespace-nowrap"
              >
                <span>Teruskan ke Langkah 2</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
