import { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Hand,
  Heart,
  Lightbulb,
  MessageCircleQuestion,
  Palette,
  PlayCircle,
  Ruler,
  Shapes,
  Sparkles,
} from 'lucide-react';
import {
  ADJECTIVE_INTRO_CARDS,
  MOVEMENT_CARDS,
  SET_INDUKSI_INTRO_IMAGE,
  STIMULUS_QUESTIONS,
  YOUTUBE_EMBED_URL,
} from '../data/setInduksiContent';
import { PageRoute } from '../types';
import { CartoonImage } from './CartoonImage';

interface SetInduksiPageProps {
  onNavigate: (route: PageRoute) => void;
}

function AdjectiveCategoryIcon({
  name,
}: {
  name: 'heart' | 'palette' | 'ruler' | 'shapes' | 'clock';
}) {
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

function MovementCardIcon({ direction }: { direction: 'stop' | 'left' | 'right' }) {
  if (direction === 'stop') return <Hand className="h-5 w-5 text-[#29466B]" />;
  if (direction === 'left') return <ArrowLeft className="h-5 w-5 text-[#29466B]" />;
  return <ArrowRight className="h-5 w-5 text-[#29466B]" />;
}

export function SetInduksiPage({ onNavigate }: SetInduksiPageProps) {
  const [practicedMoves, setPracticedMoves] = useState<Record<string, boolean>>({});

  const scrollToVideo = () => {
    const videoSection = document.getElementById('aktiviti-video');
    if (videoSection) {
      videoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const togglePracticedMove = (id: string) => {
    setPracticedMoves((prev) => ({ ...prev, [id]: !prev[id] }));
  };

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
              Set Induksi · Keselamatan di Jalan Raya
            </p>

            <h1 className="font-display text-4xl font-black leading-tight text-[#29466B] sm:text-5xl [text-wrap:balance]">
              Jom Mulakan Pengembaraan Kita!
            </h1>

            <p className="max-w-xl text-base font-semibold leading-relaxed text-[#29466B]/90 sm:text-lg">
              Hai murid-murid! Sebelum kita belajar tentang kata adjektif, mari kita terokai dahulu
              dunia keselamatan di jalan raya. Bersedia untuk menyanyi dan melakukan pergerakan yang
              menyeronokkan?
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={scrollToVideo}
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
                src={SET_INDUKSI_INTRO_IMAGE}
                alt="Ilustrasi kartun 2D murid berada di kawasan lintasan belang, lampu isyarat dan papan tanda jalan raya"
                fallbackTitle="Pengenalan Set Induksi Jalan Raya"
                className="h-full min-h-[260px] w-full rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Aktiviti 1: Mari Menonton dan Menyanyi! */}
      <section id="aktiviti-video" className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-2">
          <p className="font-display text-sm font-extrabold text-[#29466B]/70">
            Aktiviti Video & Pergerakan
          </p>
          <h2 className="font-display text-2xl font-black text-[#29466B] sm:text-3xl [text-wrap:balance]">
            Aktiviti 1: Mari Menonton dan Menyanyi!
          </h2>
          <p className="max-w-3xl text-base font-semibold leading-relaxed text-[#29466B]/90 sm:text-lg">
            Perhatikan video lagu keselamatan jalan raya yang dipaparkan. Mari kita menyanyi
            bersama-sama sambil melakukan pergerakan mudah!
          </p>
        </div>

        {/* Pemain Video YouTube Terbenam */}
        <div className="cartoon-card overflow-hidden rounded-3xl bg-white p-3 sm:p-5">
          <div className="mb-3 flex items-center justify-between gap-3 px-1">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF8585] border-2 border-[#29466B]/20">
                <PlayCircle className="h-5 w-5 text-[#29466B]" />
              </div>
              <div>
                <p className="font-display text-base font-black text-[#29466B]">
                  Video Lagu Keselamatan Jalan Raya
                </p>
                <p className="text-xs font-bold text-[#29466B]/70">
                  Tekan butang main pada video untuk menonton dan menyanyi bersama
                </p>
              </div>
            </div>
          </div>

          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border-2 border-[#29466B]/15 bg-[#29466B]/5">
            <iframe
              src={YOUTUBE_EMBED_URL}
              title="Video Lagu Keselamatan Jalan Raya"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        </div>

        {/* Tiga Kad Pergerakan */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {MOVEMENT_CARDS.map((card) => {
            const isPracticed = Boolean(practicedMoves[card.id]);
            return (
              <motion.article
                key={card.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.18 }}
                className={`cartoon-card flex flex-col justify-between overflow-hidden rounded-3xl ${card.cardBg} p-5`}
              >
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-display text-xl font-black text-[#29466B]">{card.title}</h3>
                    <motion.div
                      animate={
                        card.direction === 'stop'
                          ? { scale: [1, 1.08, 1] }
                          : card.direction === 'left'
                            ? { x: [0, -4, 0] }
                            : { x: [0, 4, 0] }
                      }
                      transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${card.accentBg} border-2 border-[#29466B]/20`}
                    >
                      <MovementCardIcon direction={card.direction} />
                    </motion.div>
                  </div>

                  <div className="mb-4 overflow-hidden rounded-2xl border-2 border-[#29466B]/14 bg-white">
                    <CartoonImage
                      src={card.imageSrc}
                      alt={card.imageAlt}
                      fallbackTitle={card.title}
                      className="aspect-square w-full object-cover"
                    />
                  </div>

                  <p className="text-base font-bold leading-relaxed text-[#29466B]">
                    {card.instruction}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => togglePracticedMove(card.id)}
                  aria-pressed={isPracticed}
                  className={`mt-5 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-2xl px-4 py-2.5 font-display text-sm font-black transition-colors cursor-pointer border-2 border-[#29466B] ${
                    isPracticed
                      ? 'bg-[#A8DDB5] text-[#29466B]'
                      : 'bg-white text-[#29466B] hover:bg-[#FFD966]/40'
                  }`}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>{isPracticed ? 'Hebat! Sudah Dilakukan' : 'Saya Sudah Lakukan'}</span>
                </button>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* 3. Pengenalan Kata Adjektif */}
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="cartoon-card rounded-3xl bg-white p-6 sm:p-8 lg:p-10">
          <div className="mb-8 flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FFD966] border-2 border-[#29466B]/20">
                <Lightbulb className="h-5 w-5 text-[#29466B]" />
              </div>
              <p className="font-display text-sm font-extrabold text-[#29466B]/75">
                Penghubung Tajuk Pembelajaran
              </p>
            </div>

            <h2 className="font-display text-2xl font-black text-[#29466B] sm:text-3xl [text-wrap:balance]">
              Tahukah Kamu? Kita Akan Belajar Kata Adjektif!
            </h2>

            <p className="max-w-4xl text-base font-semibold leading-relaxed text-[#29466B]/90 sm:text-lg">
              Hebat, murid-murid! Kita telah belajar tentang keselamatan di jalan raya. Sekarang,
              mari kita kenali perkataan yang digunakan untuk menerangkan sifat, warna, ukuran,
              bentuk dan waktu sesuatu benda atau keadaan. Perkataan ini dikenali sebagai kata
              adjektif.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {ADJECTIVE_INTRO_CARDS.map((item) => (
              <div
                key={item.number}
                className={`cartoon-card-interactive flex flex-col justify-between rounded-3xl ${item.cardBg} p-5`}
              >
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.iconBg} border-2 border-[#29466B]/18`}
                    >
                      <AdjectiveCategoryIcon name={item.iconName} />
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
      </section>

      {/* 4. Soalan Rangsangan Guru (Paparan Soalan Sahaja) */}
      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-2">
          <p className="font-display text-sm font-extrabold text-[#29466B]/70">
            Aktiviti Soal Jawab
          </p>
          <h2 className="font-display text-2xl font-black text-[#29466B] sm:text-3xl [text-wrap:balance]">
            Cuba Jawab Soalan Cikgu!
          </h2>
          <p className="max-w-2xl text-base font-semibold text-[#29466B]/85">
            Perhatikan gambar dan bincangkan jawapan bagi setiap soalan berikut secara lisan bersama
            cikgu.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {STIMULUS_QUESTIONS.map((q) => (
            <article
              key={q.id}
              className={`cartoon-card-interactive flex flex-col rounded-3xl ${q.cardBg} p-5`}
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="font-display text-lg font-black text-[#29466B] tabular-nums">
                  Soalan {q.number}
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white border-2 border-[#29466B]/15">
                  <MessageCircleQuestion className="h-5 w-5 text-[#29466B]" />
                </div>
              </div>

              <div className="mb-4 overflow-hidden rounded-2xl border-2 border-[#29466B]/14 bg-white">
                <CartoonImage
                  src={q.imageSrc}
                  alt={q.imageAlt}
                  fallbackTitle={`Soalan ${q.number}`}
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>

              <h3 className="font-display text-lg font-black leading-snug text-[#29466B]">
                {q.question}
              </h3>
            </article>
          ))}
        </div>
      </section>

      {/* 5. Penutup Set Induksi */}
      <section className="mx-auto w-full max-w-7xl px-4 pt-4 pb-16 sm:px-6 lg:px-8">
        <div className="cartoon-card rounded-3xl bg-gradient-to-r from-[#A8DDB5]/55 via-[#ECF9F0] to-[#83C9F4]/50 p-8 sm:p-12 text-center">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFD966] border-2 border-[#29466B]">
              <Sparkles className="h-7 w-7 text-[#29466B]" />
            </div>

            <h2 className="font-display text-3xl font-black text-[#29466B] sm:text-4xl [text-wrap:balance]">
              Hebat! Kamu Sudah Bersedia!
            </h2>

            <p className="text-base font-semibold leading-relaxed text-[#29466B]/90 sm:text-lg">
              Syabas, murid-murid! Kita telah menyanyi dan melakukan pergerakan berkaitan keselamatan
              di jalan raya. Sekarang, mari kita teruskan pengembaraan untuk mengenali lima jenis
              kata adjektif dengan lebih mendalam!
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate(PageRoute.KENALI_KATA_ADJEKTIF)}
                className="cartoon-btn inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-2xl bg-[#FFD966] px-8 py-3.5 font-display text-lg font-black text-[#29466B] cursor-pointer whitespace-nowrap"
              >
                <span>Teruskan Pembelajaran</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
