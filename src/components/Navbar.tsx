import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '../data/homeContent';
import { PageRoute } from '../types';

interface NavbarProps {
  activeRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
}

function RoadSafetyLogo() {
  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0"
    >
      <rect x="2" y="2" width="36" height="36" rx="11" fill="#83C9F4" stroke="#29466B" strokeWidth="2.5" />
      <rect x="13" y="6" width="14" height="26" rx="6" fill="#29466B" />
      <circle cx="20" cy="12" r="3.2" fill="#FF8585" />
      <circle cx="20" cy="19.5" r="3.2" fill="#FFD966" />
      <circle cx="20" cy="27" r="3.2" fill="#A8DDB5" />
      <rect x="18" y="32" width="4" height="6" fill="#29466B" />
    </svg>
  );
}

export function Navbar({ activeRoute, onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSelect = (route: PageRoute) => {
    onNavigate(route);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b-2 border-[#29466B]/12 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => handleSelect(PageRoute.HOME)}
          className="flex items-center gap-3 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#29466B] rounded-xl cursor-pointer shrink-0"
        >
          <RoadSafetyLogo />
          <span className="font-display text-base sm:text-lg font-extrabold tracking-tight text-[#29466B] whitespace-nowrap shrink-0">
            Kata Adjektif Tahun 2
          </span>
        </button>

        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2" aria-label="Navigasi Utama">
          {NAV_ITEMS.map((item) => {
            const isActive = activeRoute === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`px-3 py-2 rounded-xl font-display text-sm font-bold whitespace-nowrap shrink-0 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#29466B] ${
                  isActive
                    ? 'bg-[#FFD966] text-[#29466B] border-2 border-[#29466B] shadow-[0_2px_0_#29466B]'
                    : 'text-[#29466B]/80 hover:text-[#29466B] hover:bg-[#83C9F4]/20 border-2 border-transparent'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
          className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-[#29466B]/20 bg-[#FFF8E8] text-[#29466B] lg:hidden cursor-pointer focus-visible:outline-2 focus-visible:outline-[#29466B]"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t-2 border-[#29466B]/10 bg-[#FFF8E8] px-4 py-3 lg:hidden">
          <nav className="flex flex-col gap-2" aria-label="Navigasi Mudah Alih">
            {NAV_ITEMS.map((item) => {
              const isActive = activeRoute === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left font-display text-base font-bold transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#FFD966] text-[#29466B] border-2 border-[#29466B]'
                      : 'bg-white text-[#29466B] border-2 border-[#29466B]/12 hover:bg-[#83C9F4]/15'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="text-xs font-extrabold">Aktif</span>}
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
