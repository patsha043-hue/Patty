/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { SetInduksiPage } from './components/SetInduksiPage';
import { KenaliKataAdjektifPage } from './components/KenaliKataAdjektifPage';
import { MisiPembelajaranPage } from './components/MisiPembelajaranPage';
import { PembinaAyatKreatifPage } from './components/PembinaAyatKreatifPage';
import { PenutupPage } from './components/PenutupPage';
import { RuangGuruPage } from './components/RuangGuruPage';
import { PlaceholderPage } from './components/PlaceholderPage';
import { useVoiceNarration } from './hooks/useVoiceNarration';
import { PageRoute } from './types';

export default function App() {
  const [activeRoute, setActiveRoute] = useState<PageRoute>(PageRoute.HOME);
  const narration = useVoiceNarration();

  const handleNavigate = (route: PageRoute) => {
    if (route !== PageRoute.HOME) {
      narration.stop();
    }
    setActiveRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FFF8E8] text-[#29466B]">
      <Navbar activeRoute={activeRoute} onNavigate={handleNavigate} />

      <main className="flex flex-1 flex-col">
        {activeRoute === PageRoute.HOME ? (
          <HomePage onNavigate={handleNavigate} narration={narration} />
        ) : activeRoute === PageRoute.SET_INDUKSI ? (
          <SetInduksiPage onNavigate={handleNavigate} />
        ) : activeRoute === PageRoute.KENALI_KATA_ADJEKTIF ? (
          <KenaliKataAdjektifPage onNavigate={handleNavigate} />
        ) : activeRoute === PageRoute.MISI_PEMBELAJARAN ? (
          <MisiPembelajaranPage onNavigate={handleNavigate} />
        ) : activeRoute === PageRoute.KUIZ_PENTAKSIRAN ? (
          <PembinaAyatKreatifPage onNavigate={handleNavigate} />
        ) : activeRoute === PageRoute.PENUTUP ? (
          <PenutupPage onNavigate={handleNavigate} />
        ) : activeRoute === PageRoute.RUANG_GURU ? (
          <RuangGuruPage onNavigate={handleNavigate} />
        ) : (
          <PlaceholderPage route={activeRoute} onNavigate={handleNavigate} />
        )}
      </main>

      <footer className="border-t-2 border-[#29466B]/10 bg-white py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">
          <p className="font-display text-sm font-extrabold text-[#29466B]">
            Keselamatan di Jalan Raya: Jom Kenali Kata Adjektif!
          </p>
          <p className="text-xs sm:text-sm font-semibold text-[#29466B]/70">
            Laman Pembelajaran Digital Interaktif (OPD) · Bahasa Melayu Tahun 2
          </p>
        </div>
      </footer>
    </div>
  );
}
