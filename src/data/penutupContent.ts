export const PENUTUP_CELEBRATION_IMAGE = '/src/assets/images/penutup_tahniah_1794928302241.jpg';
export const PENUTUP_CROSSING_IMAGE = '/src/assets/images/penutup_lintasan_selamat_1794928302788.jpg';

export const WAYGROUND_QUIZ_URL = 'https://wayground.com/join?gc=06162419';

export interface RecapAdjectiveItem {
  id: 'sifat' | 'warna' | 'ukuran' | 'bentuk' | 'waktu';
  title: string;
  examples: string;
  cardBg: string;
}

export const RECAP_ADJECTIVES: RecapAdjectiveItem[] = [
  {
    id: 'sifat',
    title: 'Kata Adjektif Sifat',
    examples: 'cermat, selamat, berani',
    cardBg: 'bg-[#ECF9F0]',
  },
  {
    id: 'warna',
    title: 'Kata Adjektif Warna',
    examples: 'merah, biru, hijau',
    cardBg: 'bg-[#FFECEC]',
  },
  {
    id: 'ukuran',
    title: 'Kata Adjektif Ukuran',
    examples: 'besar, kecil, panjang',
    cardBg: 'bg-[#FFF6DA]',
  },
  {
    id: 'bentuk',
    title: 'Kata Adjektif Bentuk',
    examples: 'bulat, bujur, lurus',
    cardBg: 'bg-[#EAF6FD]',
  },
  {
    id: 'waktu',
    title: 'Kata Adjektif Waktu',
    examples: 'awal, lewat, segera',
    cardBg: 'bg-[#ECF9F0]',
  },
];
