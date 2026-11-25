export const MISI_INTRO_IMAGE = '/src/assets/images/misi_ejen_intro_1794924617043.jpg';
export const MISI_SUCCESS_IMAGE = '/src/assets/images/misi_ejen_berjaya_1794924616764.jpg';

export const EJEN_GAME_URL = 'https://misi-ejen-kata-adjektif-2.ai.studio/';
export const KUMPULAN_BAIK_PADLET_URL =
  'https://padlet.com/gipgp24311962/bina-ayat-s024ekm3pxmgtgi32ph3';
export const KUMPULAN_BAIK_PADLET_EMBED_URL = 'https://padlet.com/embed/s024ekm3pxmgtgi32ph3';

export interface FokusKataAdjektifItem {
  number: number;
  name: string;
  shortHint: string;
  cardBg: string;
  iconBg: string;
  iconName: 'heart' | 'palette' | 'ruler' | 'shapes' | 'clock';
}

export const FOKUS_KATA_ADJEKTIF: FokusKataAdjektifItem[] = [
  {
    number: 1,
    name: 'Kata Adjektif Sifat',
    shortHint: 'Menerangkan sifat atau keadaan',
    cardBg: 'bg-[#ECF9F0]',
    iconBg: 'bg-[#A8DDB5]',
    iconName: 'heart',
  },
  {
    number: 2,
    name: 'Kata Adjektif Warna',
    shortHint: 'Menerangkan warna sesuatu benda',
    cardBg: 'bg-[#FFECEC]',
    iconBg: 'bg-[#FF8585]',
    iconName: 'palette',
  },
  {
    number: 3,
    name: 'Kata Adjektif Ukuran',
    shortHint: 'Menerangkan saiz atau panjang',
    cardBg: 'bg-[#FFF6DA]',
    iconBg: 'bg-[#FFD966]',
    iconName: 'ruler',
  },
  {
    number: 4,
    name: 'Kata Adjektif Bentuk',
    shortHint: 'Menerangkan rupa atau bentuk',
    cardBg: 'bg-[#EAF6FD]',
    iconBg: 'bg-[#83C9F4]',
    iconName: 'shapes',
  },
  {
    number: 5,
    name: 'Kata Adjektif Waktu',
    shortHint: 'Menerangkan masa atau waktu',
    cardBg: 'bg-[#ECF9F0]',
    iconBg: 'bg-[#A8DDB5]',
    iconName: 'clock',
  },
];

export interface GroupOverviewCard {
  id: 'kumpulan-asas' | 'kumpulan-sederhana' | 'kumpulan-baik';
  level: string;
  title: string;
  description: string;
  cardBg: string;
  iconBg: string;
  iconName: 'search' | 'gamepad' | 'pen';
}

export const GROUP_OVERVIEW_CARDS: GroupOverviewCard[] = [
  {
    id: 'kumpulan-asas',
    level: 'Kumpulan Asas',
    title: 'Cari dan Senaraikan',
    description:
      'Lihat gambar petikan Keselamatan di Jalan Raya dan senaraikan lima kata adjektif.',
    cardBg: 'bg-[#ECF9F0]',
    iconBg: 'bg-[#A8DDB5]',
    iconName: 'search',
  },
  {
    id: 'kumpulan-sederhana',
    level: 'Kumpulan Sederhana',
    title: 'Lengkapkan Ayat',
    description:
      'Buka pautan permainan digital Cabaran 2 – Ejen Bijak dan lengkapkan ayat dengan kata adjektif.',
    cardBg: 'bg-[#FFF6DA]',
    iconBg: 'bg-[#FFD966]',
    iconName: 'gamepad',
  },
  {
    id: 'kumpulan-baik',
    level: 'Kumpulan Baik',
    title: 'Bina Ayat',
    description:
      'Buka pautan Padlet dan bina sekurang-kurangnya tiga ayat gramatis berdasarkan gambar.',
    cardBg: 'bg-[#EAF6FD]',
    iconBg: 'bg-[#83C9F4]',
    iconName: 'pen',
  },
];

export interface AsasWorksheetItem {
  id: 'sifat' | 'warna' | 'ukuran' | 'bentuk' | 'waktu';
  number: number;
  label: string;
  clue: string;
  placeholder: string;
  acceptedAnswers: string[];
  sampleAnswer: string;
  bg: string;
}

export const ASAS_WORKSHEET_ITEMS: AsasWorksheetItem[] = [
  {
    id: 'sifat',
    number: 1,
    label: 'Kata Adjektif Sifat',
    clue: 'Petunjuk: Bagaimanakah cara Aina berjalan atau keadaan jalan raya?',
    placeholder: 'Taip satu kata adjektif sifat...',
    acceptedAnswers: ['cermat', 'sibuk', 'selamat', 'gembira', 'penting', 'patuh', 'berhati-hati'],
    sampleAnswer: 'cermat',
    bg: 'bg-[#ECF9F0]',
  },
  {
    id: 'warna',
    number: 2,
    label: 'Kata Adjektif Warna',
    clue: 'Petunjuk: Apakah warna baju, kasut, kereta atau lampu isyarat?',
    placeholder: 'Taip satu kata adjektif warna...',
    acceptedAnswers: ['biru', 'hitam', 'merah', 'hijau'],
    sampleAnswer: 'merah',
    bg: 'bg-[#FFECEC]',
  },
  {
    id: 'ukuran',
    number: 3,
    label: 'Kata Adjektif Ukuran',
    clue: 'Petunjuk: Apakah perkataan yang menerangkan saiz lintasan belang?',
    placeholder: 'Taip satu kata adjektif ukuran...',
    acceptedAnswers: ['panjang'],
    sampleAnswer: 'panjang',
    bg: 'bg-[#FFF6DA]',
  },
  {
    id: 'bentuk',
    number: 4,
    label: 'Kata Adjektif Bentuk',
    clue: 'Petunjuk: Apakah rupa papan tanda di tepi jalan raya?',
    placeholder: 'Taip satu kata adjektif bentuk...',
    acceptedAnswers: ['bulat'],
    sampleAnswer: 'bulat',
    bg: 'bg-[#EAF6FD]',
  },
  {
    id: 'waktu',
    number: 5,
    label: 'Kata Adjektif Waktu',
    clue: 'Petunjuk: Bilakah Aina berjalan ke sekolah bersama abangnya?',
    placeholder: 'Taip satu kata adjektif waktu...',
    acceptedAnswers: ['pagi', 'waktu pagi'],
    sampleAnswer: 'pagi',
    bg: 'bg-[#ECF9F0]',
  },
];
