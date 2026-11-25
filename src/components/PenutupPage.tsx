import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Award,
  BookOpenCheck,
  Briefcase,
  ExternalLink,
  Home,
  Maximize2,
  Minimize2,
  RotateCw,
  ShieldCheck,
  Sparkles,
  Trophy,
} from 'lucide-react';
import {
  PENUTUP_CELEBRATION_IMAGE,
  PENUTUP_CROSSING_IMAGE,
  RECAP_ADJECTIVES,
  WAYGROUND_QUIZ_URL,
} from '../data/penutupContent';
import { PageRoute } from '../types';
import { AdjectiveTypeCartoonIcon } from './CartoonIllustrations';
import { CartoonImage } from './CartoonImage';

interface PenutupPageProps {
  onNavigate: (route: PageRoute) => void;
}

export function PenutupPage({ onNavigate }: PenutupPageProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      className="flex flex-col"
    >
      {/* 1. Bahagian Tajuk Halaman Penutup */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#83C9F4]/35 via-[#EDF7FD] to-[#FFF8E8] border-b-2 border-[#29466B]/10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-stretch gap-8 px-4 py-10 sm:px-6 md:py-14 lg:grid-cols-12 lg:gap-10 lg:px-8">
          <div className="flex flex-col justify-center gap-5 lg:col-span-6">
            <p className="font-display text-sm font-extrabold tracking-wide text-[#29466B]/80">
              Fasa 6 · Penutup Pembelajaran
            </p>

            <h1 className="font-display text-4xl font-black leading-tight text-[#29466B] sm:text-5xl [text-wrap:balance]">
              Tahniah! Kamu Telah Menamatkan Misi Kata Adjektif!
            </h1>

            <p className="max-w-xl text-base font-semibold leading-relaxed text-[#29466B]/90 sm:text-lg">
              Syabas! Kamu telah mempelajari lima jenis kata adjektif. Sekarang, mari uji kefahaman
              kamu melalui kuiz interaktif!
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={WAYGROUND_QUIZ_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="cartoon-btn inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-2xl bg-[#FFD966] px-6 py-3 font-display text-base font-black text-[#29466B] whitespace-nowrap"
              >
                <Trophy className="h-5 w-5" />
                <span>MULA KUIZ SEKARANG!</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="flex items-stretch lg:col-span-6">
            <div className="cartoon-card w-full overflow-hidden rounded-3xl bg-white p-2.5 sm:p-3">
              <CartoonImage
                src={PENUTUP_CELEBRATION_IMAGE}
                alt="Ilustrasi kartun murid gembira dan bersemangat meraikan kejayaan menamatkan aktiviti pembelajaran"
                fallbackTitle="Tahniah, Murid Hebat!"
                className="h-full min-h-[260px] w-full rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Aktiviti Pengukuhan: Kuiz Interaktif (Wayground) */}
      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="cartoon-card rounded-3xl bg-white p-4 sm:p-6 lg:p-8">
          <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-3 flex items-center gap-2.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FF8585] border-2 border-[#29466B]/20">
                  <Award className="h-6 w-6 text-[#29466B]" />
                </div>
                <p className="font-display text-sm font-extrabold text-[#29466B]/75">
                  Aktiviti Pengukuhan · Kuiz Interaktif Wayground
                </p>
              </div>

              <h2 className="font-display text-2xl font-black text-[#29466B] sm:text-3xl [text-wrap:balance]">
                Misi Terakhir: Uji Minda Kamu!
              </h2>

              <p className="mt-2 text-base font-semibold leading-relaxed text-[#29466B]/90 sm:text-lg">
                Jawab soalan kuiz berkaitan kata adjektif yang telah kamu pelajari. Baca setiap
                soalan dengan teliti dan pilih jawapan yang paling tepat.
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
                href={WAYGROUND_QUIZ_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="cartoon-btn inline-flex min-h-[44px] items-center justify-center gap-2 rounded-2xl bg-[#FFD966] px-5 py-2 font-display text-sm sm:text-base font-black text-[#29466B] whitespace-nowrap"
              >
                <Trophy className="h-4 w-4" />
                <span>MULA KUIZ SEKARANG!</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div
            className={`relative w-full overflow-hidden rounded-2xl border-2 border-[#29466B]/18 bg-[#FFF8E8] ${
              isExpanded ? 'h-[82vh] min-h-[680px]' : 'h-[620px] sm:h-[700px] lg:h-[760px]'
            }`}
          >
            <iframe
              key={iframeKey}
              src={WAYGROUND_QUIZ_URL}
              title="Kuiz Interaktif Kata Adjektif Wayground"
              allow="fullscreen; clipboard-write"
              referrerPolicy="strict-origin-when-cross-origin"
              className="h-full w-full border-0"
            />
          </div>

          <div className="mt-4 flex flex-col items-start justify-between gap-3 rounded-2xl bg-[#FFF8E8] border-2 border-[#29466B]/10 p-4 sm:flex-row sm:items-center">
            <p className="text-sm font-bold text-[#29466B]/85">
              Jika paparan kuiz di atas tidak dimuatkan oleh pelayar, sila tekan butang di sebelah
              untuk membuka dalam tab baharu.
            </p>
            <a
              href={WAYGROUND_QUIZ_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cartoon-btn inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-2xl bg-[#FFD966] px-5 py-2.5 font-display text-sm font-black text-[#29466B] whitespace-nowrap"
            >
              <Trophy className="h-4 w-4" />
              <span>MULA KUIZ SEKARANG!</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 3. Rumusan Pembelajaran */}
      <section className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="cartoon-card rounded-3xl bg-white p-6 sm:p-8 lg:p-10">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#A8DDB5] border-2 border-[#29466B]/20">
              <BookOpenCheck className="h-6 w-6 text-[#29466B]" />
            </div>
            <div>
              <p className="font-display text-sm font-extrabold text-[#29466B]/70">
                Rumusan Pembelajaran
              </p>
              <h2 className="font-display text-2xl font-black text-[#29466B] sm:text-3xl [text-wrap:balance]">
                Jom Ingat Semula!
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {RECAP_ADJECTIVES.map((item) => (
              <article
                key={item.id}
                className={`cartoon-card-interactive flex flex-col items-center rounded-3xl ${item.cardBg} p-5 text-center`}
              >
                <div className="mb-4">
                  <AdjectiveTypeCartoonIcon type={item.id} />
                </div>
                <h3 className="font-display text-lg font-black leading-snug text-[#29466B]">
                  {item.title}
                </h3>
                <p className="mt-2 font-display text-sm sm:text-base font-extrabold text-[#29466B]/85">
                  {item.examples}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Penutup Sosial */}
      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="cartoon-card overflow-hidden rounded-3xl bg-gradient-to-r from-[#A8DDB5]/50 via-[#ECF9F0] to-[#FFF6DA] p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <div className="overflow-hidden rounded-2xl border-2 border-[#29466B]/14 bg-white">
                <CartoonImage
                  src={PENUTUP_CROSSING_IMAGE}
                  alt="Ilustrasi kartun murid melintas jalan raya dengan betul di lintasan belang serta mematuhi lampu isyarat"
                  fallbackTitle="Keselamatan di Jalan Raya Tanggungjawab Bersama"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 lg:col-span-6">
              <div className="inline-flex items-center gap-2 font-display text-sm font-extrabold text-[#29466B]/75">
                <ShieldCheck className="h-5 w-5" />
                <span>Pesanan Keselamatan & Penghargaan</span>
              </div>

              <h2 className="font-display text-3xl font-black text-[#29466B] sm:text-4xl [text-wrap:balance]">
                Syabas, Hebatnya Kamu!
              </h2>

              <p className="text-base font-semibold leading-relaxed text-[#29466B]/90 sm:text-lg">
                Kamu telah berjaya menyelesaikan semua aktiviti pembelajaran. Teruskan menggunakan
                kata adjektif dalam pertuturan dan penulisan harian. Ingat, keselamatan di jalan
                raya ialah tanggungjawab kita bersama!
              </p>

              <div className="inline-flex items-center gap-2 font-display text-sm font-extrabold text-[#29466B]/80 pt-1">
                <Sparkles className="h-4 w-4" />
                <span>Pengguna Jalan Raya Bijak, Murid Bahasa Melayu Cemerlang</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Butang Navigasi Akhir */}
      <section className="mx-auto w-full max-w-7xl px-4 pt-2 pb-16 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => onNavigate(PageRoute.HOME)}
            className="cartoon-btn inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3 font-display text-sm sm:text-base font-extrabold text-[#29466B] cursor-pointer whitespace-nowrap"
          >
            <Home className="h-4 w-4" />
            <span>Kembali ke Halaman Utama</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate(PageRoute.RUANG_GURU)}
            className="cartoon-btn inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-[#83C9F4] px-6 py-3 font-display text-sm sm:text-base font-black text-[#29466B] cursor-pointer whitespace-nowrap"
          >
            <Briefcase className="h-4 w-4" />
            <span>Ke Ruang Guru</span>
          </button>
        </div>
      </section>
    </motion.div>
  );
}
