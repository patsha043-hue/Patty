import { motion } from 'motion/react';
import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  Calendar,
  Compass,
  Flag,
  GraduationCap,
  Home,
  Layers,
  ListChecks,
  PenTool,
  Search,
  ShieldCheck,
  Signpost,
  Sparkles,
  Target,
  Volume2,
} from 'lucide-react';
import {
  ADJECTIVE_CATEGORIES,
  HERO_IMAGE_PATH,
  INTRO_IMAGE_PATH,
  LEARNING_JOURNEY_STEPS,
  LEARNING_OBJECTIVES,
} from '../data/homeContent';
import { NarrationTrackId, PageRoute } from '../types';
import { CartoonImage } from './CartoonImage';
import { VoiceNarrationPlayer } from './VoiceNarrationPlayer';

interface HomePageProps {
  onNavigate: (route: PageRoute) => void;
  narration: {
    activeTrackId: NarrationTrackId;
    isLoading: boolean;
    isPlaying: boolean;
    error: string | null;
    progress: number;
    selectTrack: (trackId: NarrationTrackId) => void;
    playTrack: (trackId?: NarrationTrackId) => Promise<void>;
    stop: () => void;
    replay: () => Promise<void>;
  };
}

function ObjectiveIcon({ name }: { name: 'search' | 'layers' | 'pen' }) {
  if (name === 'search') return <Search className="h-5 w-5 text-[#29466B]" />;
  if (name === 'layers') return <Layers className="h-5 w-5 text-[#29466B]" />;
  return <PenTool className="h-5 w-5 text-[#29466B]" />;
}

function JourneyIcon({
  name,
}: {
  name: 'home' | 'sparkles' | 'book' | 'flag' | 'award' | 'briefcase';
}) {
  switch (name) {
    case 'home':
      return <Home className="h-6 w-6 text-[#29466B]" />;
    case 'sparkles':
      return <Sparkles className="h-6 w-6 text-[#29466B]" />;
    case 'book':
      return <BookOpen className="h-6 w-6 text-[#29466B]" />;
    case 'flag':
      return <Flag className="h-6 w-6 text-[#29466B]" />;
    case 'award':
      return <Award className="h-6 w-6 text-[#29466B]" />;
    case 'briefcase':
      return <Briefcase className="h-6 w-6 text-[#29466B]" />;
  }
}

export function HomePage({ onNavigate, narration }: HomePageProps) {
  const handlePlayWelcome = () => {
    void narration.playTrack(NarrationTrackId.WELCOME);
    const panel = document.getElementById('panel-suara-ai');
    if (panel) {
      panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      className="flex flex-col"
    >
      {/* 1. Bahagian Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#83C9F4]/35 via-[#EDF7FD] to-[#FFF8E8] border-b-2 border-[#29466B]/10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-stretch gap-8 px-4 py-10 sm:px-6 md:py-14 lg:grid-cols-12 lg:gap-10 lg:px-8">
          <div className="flex flex-col justify-center gap-5 lg:col-span-6">
            <p className="font-display text-sm font-extrabold tracking-wide text-[#29466B]/80">
              Bahasa Melayu Tahun 2 · Tema Keselamatan
            </p>

            <h1 className="font-display text-4xl font-black leading-tight text-[#29466B] sm:text-5xl [text-wrap:balance]">
              Jom Belajar Kata Adjektif!
            </h1>

            <p className="max-w-xl text-base font-semibold leading-relaxed text-[#29466B]/90 sm:text-lg">
              Kenali dunia kata adjektif sambil meneroka amalan keselamatan di jalan raya. Belajar,
              bermain dan kuasai Bahasa Melayu dengan cara yang menyeronokkan!
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => onNavigate(PageRoute.SET_INDUKSI)}
                className="cartoon-btn inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-2xl bg-[#FFD966] px-6 py-3 font-display text-base font-black text-[#29466B] cursor-pointer whitespace-nowrap"
              >
                <span>Mulakan Pembelajaran</span>
                <ArrowRight className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={handlePlayWelcome}
                className="cartoon-btn inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 font-display text-base font-extrabold text-[#29466B] cursor-pointer whitespace-nowrap hover:bg-[#A8DDB5]/30"
              >
                <Volume2 className="h-5 w-5" />
                <span>Dengar Ucapan Alu-Aluan</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 flex items-stretch">
            <div className="cartoon-card w-full overflow-hidden rounded-3xl bg-white p-2.5 sm:p-3">
              <CartoonImage
                src={HERO_IMAGE_PATH}
                alt="Ilustrasi kartun 2D murid sekolah melintas lintasan belang dengan selamat di lampu isyarat dan papan tanda jalan raya"
                fallbackTitle="Suasana Keselamatan di Jalan Raya"
                className="h-full min-h-[260px] w-full rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Bahagian Pengenalan Pembelajaran + Panel Suara AI */}
      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="cartoon-card overflow-hidden rounded-3xl bg-white p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-full max-w-[290px] overflow-hidden rounded-3xl border-2 border-[#29466B]/14 bg-[#FFF8E8] p-2">
                <CartoonImage
                  src={INTRO_IMAGE_PATH}
                  alt="Ilustrasi kartun murid Tahun 2 memegang buku cerita dan pensel di tepi papan tanda keselamatan jalan raya"
                  fallbackTitle="Murid Tahun 2 & Buku Kata Adjektif"
                  className="aspect-square w-full rounded-2xl object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-8 flex flex-col gap-4">
              <p className="font-display text-sm font-extrabold text-[#29466B]/70">
                Pengenalan Pembelajaran
              </p>
              <h2 className="font-display text-2xl font-black text-[#29466B] sm:text-3xl [text-wrap:balance]">
                Selamat Datang ke Dunia Kata Adjektif!
              </h2>
              <p className="text-base font-semibold leading-relaxed text-[#29466B]/90 sm:text-lg">
                Dalam pembelajaran ini, murid akan mengenali kata adjektif melalui tema keselamatan
                di jalan raya. Murid akan belajar mengenal pasti, mengelaskan dan menggunakan kata
                adjektif dalam ayat berdasarkan konteks yang sesuai.
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => void narration.playTrack(NarrationTrackId.INTRO)}
                  className="cartoon-btn inline-flex min-h-[44px] items-center gap-2 rounded-2xl bg-[#A8DDB5] px-5 py-2.5 font-display text-sm sm:text-base font-extrabold text-[#29466B] cursor-pointer whitespace-nowrap"
                >
                  <Volume2 className="h-5 w-5" />
                  <span>Dengar Penerangan Pengenalan</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <VoiceNarrationPlayer
            activeTrackId={narration.activeTrackId}
            isLoading={narration.isLoading}
            isPlaying={narration.isPlaying}
            error={narration.error}
            progress={narration.progress}
            onSelectTrack={narration.selectTrack}
            onPlay={narration.playTrack}
            onStop={narration.stop}
            onReplay={narration.replay}
          />
        </div>
      </section>

      {/* 3. Bahagian Maklumat Pembelajaran */}
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-sm font-extrabold text-[#29466B]/70">
              Dokumen Kurikulum
            </p>
            <h2 className="font-display text-2xl font-black text-[#29466B] sm:text-3xl [text-wrap:balance]">
              Kenali Maklumat Pembelajaran
            </h2>
          </div>

          <button
            type="button"
            onClick={() => void narration.playTrack(NarrationTrackId.CURRICULUM_OBJECTIVES)}
            className="cartoon-btn inline-flex min-h-[44px] items-center gap-2 self-start rounded-2xl bg-white px-4 py-2 font-display text-sm font-extrabold text-[#29466B] cursor-pointer whitespace-nowrap hover:bg-[#83C9F4]/25"
          >
            <Volume2 className="h-4 w-4" />
            <span>Dengar Maklumat & Objektif</span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="cartoon-card-interactive rounded-3xl bg-white p-5">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#83C9F4]/40 border-2 border-[#29466B]/15">
              <BookOpen className="h-5 w-5 text-[#29466B]" />
            </div>
            <p className="font-display text-xs font-extrabold text-[#29466B]/65">Mata Pelajaran</p>
            <p className="mt-1 font-display text-lg font-black text-[#29466B]">Bahasa Melayu</p>
          </div>

          <div className="cartoon-card-interactive rounded-3xl bg-white p-5">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FFD966]/60 border-2 border-[#29466B]/15">
              <GraduationCap className="h-5 w-5 text-[#29466B]" />
            </div>
            <p className="font-display text-xs font-extrabold text-[#29466B]/65">Tahun</p>
            <p className="mt-1 font-display text-lg font-black text-[#29466B]">Tahun 2</p>
          </div>

          <div className="cartoon-card-interactive rounded-3xl bg-white p-5">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#A8DDB5]/60 border-2 border-[#29466B]/15">
              <ShieldCheck className="h-5 w-5 text-[#29466B]" />
            </div>
            <p className="font-display text-xs font-extrabold text-[#29466B]/65">Tema</p>
            <p className="mt-1 font-display text-lg font-black text-[#29466B]">Keselamatan</p>
          </div>

          <div className="cartoon-card-interactive rounded-3xl bg-white p-5">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FF8585]/45 border-2 border-[#29466B]/15">
              <Signpost className="h-5 w-5 text-[#29466B]" />
            </div>
            <p className="font-display text-xs font-extrabold text-[#29466B]/65">Tajuk</p>
            <p className="mt-1 font-display text-lg font-black text-[#29466B]">
              Keselamatan di Jalan Raya
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-12">
          <div className="cartoon-card-interactive rounded-3xl bg-[#EAF6FD] p-6 lg:col-span-5">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#83C9F4] border-2 border-[#29466B]/20">
                <Target className="h-5 w-5 text-[#29466B]" />
              </div>
              <h3 className="font-display text-lg font-black text-[#29466B]">
                Standard Kandungan (SK)
              </h3>
            </div>
            <p className="text-base font-bold leading-relaxed text-[#29466B]">
              5.1 Memahami fungsi dan menggunakan golongan kata mengikut konteks.
            </p>
          </div>

          <div className="cartoon-card-interactive rounded-3xl bg-[#ECF9F0] p-6 lg:col-span-7">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#A8DDB5] border-2 border-[#29466B]/20">
                <ListChecks className="h-5 w-5 text-[#29466B]" />
              </div>
              <h3 className="font-display text-lg font-black text-[#29466B]">
                Standard Pembelajaran (SP)
              </h3>
            </div>
            <p className="text-base font-bold leading-relaxed text-[#29466B]">
              5.1.3 Memahami, mengenal pasti dan menggunakan kata adjektif mengikut konteks:
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-5">
              {ADJECTIVE_CATEGORIES.map((cat) => (
                <div
                  key={cat.label}
                  className="rounded-2xl bg-white px-3 py-2.5 text-center border-2 border-[#29466B]/12"
                >
                  <span className="block font-display text-xs font-extrabold text-[#29466B]/65">
                    {cat.roman}
                  </span>
                  <span className="font-display text-sm font-black text-[#29466B]">
                    {cat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Bahagian Objektif Pembelajaran */}
      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="font-display text-sm font-extrabold text-[#29466B]/70">
            Sasaran Murid Tahun 2
          </p>
          <h2 className="font-display text-2xl font-black text-[#29466B] sm:text-3xl [text-wrap:balance]">
            Apa yang Akan Kamu Pelajari?
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {LEARNING_OBJECTIVES.map((obj) => (
            <article
              key={obj.number}
              className={`cartoon-card-interactive flex flex-col overflow-hidden rounded-3xl ${obj.themeBg} p-5`}
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="font-display text-2xl font-black text-[#29466B] tabular-nums">
                  {obj.number}
                </span>
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-2xl ${obj.themeAccent} border-2 border-[#29466B]/15`}
                >
                  <ObjectiveIcon name={obj.iconName} />
                </div>
              </div>

              <div className="mb-4 overflow-hidden rounded-2xl border-2 border-[#29466B]/12 bg-white">
                <CartoonImage
                  src={obj.imageSrc}
                  alt={obj.imageAlt}
                  fallbackTitle={obj.title}
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>

              <h3 className="font-display text-lg font-black text-[#29466B]">{obj.title}</h3>
              <p className="mt-2 text-sm sm:text-base font-semibold leading-relaxed text-[#29466B]/90">
                {obj.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* 5. Bahagian Perjalanan Pembelajaran */}
      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-sm font-extrabold text-[#29466B]/70">
              Peta Laluan Pembelajaran
            </p>
            <h2 className="font-display text-2xl font-black text-[#29466B] sm:text-3xl [text-wrap:balance]">
              Jom Terokai Perjalanan Pembelajaran!
            </h2>
          </div>
          <p className="flex items-center gap-2 font-display text-sm font-bold text-[#29466B]/75">
            <Compass className="h-4 w-4" />
            <span>Klik mana-mana langkah untuk meneroka halaman</span>
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {LEARNING_JOURNEY_STEPS.map((step) => {
            const isHome = step.route === PageRoute.HOME;
            return (
              <button
                key={step.stepNumber}
                type="button"
                onClick={() => onNavigate(step.route)}
                className="cartoon-card-interactive group flex flex-col justify-between rounded-3xl bg-white p-6 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#29466B]"
              >
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${step.accentBg} border-2 border-[#29466B]/20`}
                    >
                      <JourneyIcon name={step.iconName} />
                    </div>
                    <span className="font-display text-lg font-black text-[#29466B]/55 tabular-nums">
                      Langkah {step.stepNumber}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-black text-[#29466B] group-hover:underline">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base font-semibold leading-relaxed text-[#29466B]/85">
                    {step.description}
                  </p>
                </div>

                <div className="mt-5 flex items-center gap-1.5 font-display text-sm font-extrabold text-[#29466B]">
                  <span>{isHome ? 'Anda sedang berada di sini' : 'Lihat Halaman'}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 6. Bahagian Ajakan Memulakan Pembelajaran */}
      <section className="mx-auto w-full max-w-7xl px-4 pt-6 pb-16 sm:px-6 lg:px-8">
        <div className="cartoon-card relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#83C9F4]/55 via-[#EDF7FD] to-[#A8DDB5]/55 p-8 sm:p-12 text-center">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFD966] border-2 border-[#29466B]">
              <Calendar className="h-7 w-7 text-[#29466B]" />
            </div>

            <h2 className="font-display text-3xl font-black text-[#29466B] sm:text-4xl [text-wrap:balance]">
              Sudah Bersedia untuk Belajar?
            </h2>

            <p className="text-base font-semibold leading-relaxed text-[#29466B]/90 sm:text-lg">
              Jom mulakan pengembaraan kita untuk mengenali kata adjektif sambil belajar menjadi
              pengguna jalan raya yang bijak dan berhemah!
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate(PageRoute.SET_INDUKSI)}
                className="cartoon-btn inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-2xl bg-[#FFD966] px-8 py-3.5 font-display text-lg font-black text-[#29466B] cursor-pointer whitespace-nowrap"
              >
                <span>Jom Mula!</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
