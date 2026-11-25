import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink, Gamepad2 } from 'lucide-react';
import { CABARAN3_HERO_IMAGE, CANVA_GAME_URL } from '../data/pembinaAyatContent';
import { PageRoute } from '../types';
import { CartoonImage } from './CartoonImage';

interface PembinaAyatKreatifPageProps {
  onNavigate: (route: PageRoute) => void;
}

const GAME_INSTRUCTIONS = [
  'Klik butang MULA PERMAINAN untuk membuka permainan digital.',
  'Baca soalan berkaitan kata adjektif dan keselamatan di jalan raya dengan teliti.',
  'Pilih jawapan yang paling tepat dengan pantas sebelum masa tamat.',
];

export function PembinaAyatKreatifPage({ onNavigate }: PembinaAyatKreatifPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      className="flex flex-col"
    >
      {/* 1. Bahagian Tajuk Halaman */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#83C9F4]/35 via-[#EDF7FD] to-[#FFF8E8] border-b-2 border-[#29466B]/10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-stretch gap-8 px-4 py-10 sm:px-6 md:py-14 lg:grid-cols-12 lg:gap-10 lg:px-8">
          <div className="flex flex-col justify-center gap-4 lg:col-span-6">
            <p className="font-display text-sm font-extrabold tracking-wide text-[#29466B]/80">
              Fasa 5 · Langkah 3 · Keselamatan di Jalan Raya
            </p>

            <h1 className="font-display text-4xl font-black leading-tight text-[#29466B] sm:text-5xl [text-wrap:balance]">
              MISI EJEN KATA ADJEKTIF
            </h1>

            <p className="font-display text-xl sm:text-2xl font-black text-[#29466B]/85">
              CABARAN 3 – EJEN PANTAS
            </p>

            <p className="max-w-xl text-base font-semibold leading-relaxed text-[#29466B]/90 sm:text-lg">
              Klik butang di bawah untuk memulakan permainan. Baca setiap soalan dengan teliti dan
              pilih jawapan kata adjektif yang betul dengan pantas!
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={CANVA_GAME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="cartoon-btn inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-2xl bg-[#FFD966] px-6 py-3 font-display text-base font-black text-[#29466B] whitespace-nowrap"
              >
                <Gamepad2 className="h-5 w-5" />
                <span>MULA PERMAINAN</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="flex items-stretch lg:col-span-6">
            <div className="cartoon-card w-full overflow-hidden rounded-3xl bg-white p-2.5 sm:p-3">
              <CartoonImage
                src={CABARAN3_HERO_IMAGE}
                alt="Ilustrasi kartun murid Tahun 2 bersedia menyahut Cabaran 3 Ejen Pantas keselamatan di jalan raya"
                fallbackTitle="Misi Ejen Kata Adjektif: Cabaran 3 – Ejen Pantas"
                className="h-full min-h-[260px] w-full rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Arahan & Pautan Permainan Digital Canva */}
      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="cartoon-card rounded-3xl bg-[#FFF6DA] p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="font-display text-sm font-extrabold text-[#29466B]/70">
                CABARAN 3 – EJEN PANTAS
              </p>
              <h2 className="mt-1 font-display text-2xl font-black text-[#29466B] sm:text-3xl [text-wrap:balance]">
                Arahan Permainan: MISI EJEN KATA ADJEKTIF
              </h2>

              <ul className="mt-4 space-y-2.5">
                {GAME_INSTRUCTIONS.map((instruction, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 rounded-2xl bg-white/85 border border-[#29466B]/12 px-4 py-3 text-sm sm:text-base font-bold text-[#29466B]"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#29466B]" />
                    <span>{instruction}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={CANVA_GAME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cartoon-btn inline-flex min-h-[54px] shrink-0 items-center justify-center gap-2.5 self-start rounded-2xl bg-[#FFD966] px-7 py-3.5 font-display text-base sm:text-lg font-black text-[#29466B] whitespace-nowrap lg:self-center"
            >
              <Gamepad2 className="h-5 w-5" />
              <span>MULA PERMAINAN</span>
              <ExternalLink className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* 3. Butang Navigasi */}
      <section className="mx-auto w-full max-w-7xl px-4 pt-2 pb-16 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => onNavigate(PageRoute.MISI_PEMBELAJARAN)}
            className="cartoon-btn inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 font-display text-sm sm:text-base font-extrabold text-[#29466B] cursor-pointer whitespace-nowrap"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Kembali ke Langkah 2</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate(PageRoute.PENUTUP)}
            className="cartoon-btn inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-[#FFD966] px-6 py-3 font-display text-sm sm:text-base font-black text-[#29466B] cursor-pointer whitespace-nowrap"
          >
            <span>Teruskan ke Penutup</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </motion.div>
  );
}
