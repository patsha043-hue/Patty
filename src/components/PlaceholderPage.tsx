import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Construction, Home } from 'lucide-react';
import { NAV_ITEMS } from '../data/homeContent';
import { PageRoute } from '../types';

interface PlaceholderPageProps {
  route: PageRoute;
  onNavigate: (route: PageRoute) => void;
}

export function PlaceholderPage({ route, onNavigate }: PlaceholderPageProps) {
  const stepIndex = NAV_ITEMS.findIndex((s) => s.id === route);
  const currentIndex = stepIndex >= 0 ? stepIndex : NAV_ITEMS.length - 1;
  const currentItem = NAV_ITEMS[currentIndex];
  const prevItem = currentIndex > 0 ? NAV_ITEMS[currentIndex - 1] : NAV_ITEMS[0];
  const nextItem =
    currentIndex < NAV_ITEMS.length - 1 ? NAV_ITEMS[currentIndex + 1] : null;

  return (
    <motion.section
      key={route}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center px-4 py-14 sm:px-6 lg:px-8"
    >
      <div className="cartoon-card rounded-3xl bg-white p-8 sm:p-12 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFD966] border-2 border-[#29466B]">
          <Construction className="h-8 w-8 text-[#29466B]" />
        </div>

        <p className="font-display text-sm font-extrabold text-[#29466B]/70">
          Fasa {currentIndex + 1} · Rangka Awal
        </p>

        <h1 className="mt-2 font-display text-3xl font-black text-[#29466B] sm:text-4xl">
          {currentItem.label}
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-base font-semibold leading-relaxed text-[#29466B]/85 sm:text-lg">
          {currentItem.shortDesc}
        </p>

        <div className="mx-auto mt-6 max-w-lg rounded-2xl bg-[#FFF8E8] border-2 border-[#29466B]/12 p-4">
          <p className="text-sm font-bold text-[#29466B]/85">
            Halaman ini disediakan sebagai rangka navigasi bagi fasa seterusnya. Kandungan penuh
            akan dibangunkan pada fasa berikutnya.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate(prevItem.id)}
            className="cartoon-btn inline-flex min-h-[44px] items-center gap-2 rounded-2xl bg-white px-5 py-2.5 font-display text-sm sm:text-base font-extrabold text-[#29466B] cursor-pointer whitespace-nowrap"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{prevItem.label}</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate(PageRoute.HOME)}
            className="cartoon-btn inline-flex min-h-[44px] items-center gap-2 rounded-2xl bg-[#83C9F4] px-5 py-2.5 font-display text-sm sm:text-base font-black text-[#29466B] cursor-pointer whitespace-nowrap"
          >
            <Home className="h-4 w-4" />
            <span>Kembali ke Halaman Utama</span>
          </button>

          {nextItem && (
            <button
              type="button"
              onClick={() => onNavigate(nextItem.id)}
              className="cartoon-btn inline-flex min-h-[44px] items-center gap-2 rounded-2xl bg-[#FFD966] px-5 py-2.5 font-display text-sm sm:text-base font-extrabold text-[#29466B] cursor-pointer whitespace-nowrap"
            >
              <span>{nextItem.label}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </motion.section>
  );
}
