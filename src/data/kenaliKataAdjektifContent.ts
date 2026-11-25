import { AdjectiveTypeDetail } from '../types';

export const LANGKAH1_INTRO_IMAGE = '/src/assets/images/langkah1_ejen_intro_1795610393259.jpg';
export const PASSAGE_IMAGE_PATH = '/assets/aistudio/gambar_3e48cd3d.png';

export const LANGKAH1_PADLET_URL =
  'https://padlet.com/unishoo004/jawapan-s025rn81im4fg9xhzoil';
export const LANGKAH1_PADLET_EMBED_URL =
  'https://padlet.com/embed/s025rn81im4fg9xhzoil';

export const ADJECTIVE_TYPES_DETAILED: AdjectiveTypeDetail[] = [
  {
    id: 'sifat',
    number: 1,
    title: 'Kata Adjektif Sifat',
    shortDesc: 'Menerangkan sifat atau keadaan sesuatu.',
    examples: ['cermat', 'selamat', 'sibuk'],
    detailedDesc:
      'Menerangkan keadaan atau perlakuan pengguna jalan raya, seperti berjalan dengan cermat.',
    roadSafetySentence: 'Aina dan abangnya berjalan dengan cermat di tepi jalan raya.',
    highlightedWord: 'cermat',
    moreExamples: ['patuh', 'gembira', 'penting'],
    cardBg: 'bg-[#ECF9F0]',
    accentBg: 'bg-[#A8DDB5]',
  },
  {
    id: 'warna',
    number: 2,
    title: 'Kata Adjektif Warna',
    shortDesc: 'Menerangkan warna sesuatu benda.',
    examples: ['merah', 'biru', 'hijau'],
    detailedDesc:
      'Menyatakan warna lampu isyarat, kenderaan, papan tanda, atau pakaian murid.',
    roadSafetySentence: 'Sebuah kereta merah berhenti di hadapan lintasan belang.',
    highlightedWord: 'merah',
    moreExamples: ['hitam', 'kuning', 'putih'],
    cardBg: 'bg-[#FFECEC]',
    accentBg: 'bg-[#FF8585]',
  },
  {
    id: 'ukuran',
    number: 3,
    title: 'Kata Adjektif Ukuran',
    shortDesc: 'Menerangkan saiz atau ukuran.',
    examples: ['panjang', 'besar', 'kecil'],
    detailedDesc:
      'Menerangkan saiz, panjang, lebar, atau tinggi sesuatu objek di jalan raya.',
    roadSafetySentence: 'Aina berhenti apabila tiba di lintasan belang yang panjang.',
    highlightedWord: 'panjang',
    moreExamples: ['pendek', 'lebar', 'tinggi'],
    cardBg: 'bg-[#FFF6DA]',
    accentBg: 'bg-[#FFD966]',
  },
  {
    id: 'bentuk',
    number: 4,
    title: 'Kata Adjektif Bentuk',
    shortDesc: 'Menerangkan rupa atau bentuk.',
    examples: ['bulat', 'lurus', 'bujur'],
    detailedDesc:
      'Menerangkan rupa permukaan papan tanda atau laluan keselamatan di jalan raya.',
    roadSafetySentence: 'Di tepi jalan terdapat papan tanda berbentuk bulat.',
    highlightedWord: 'bulat',
    moreExamples: ['segi tiga', 'segi empat', 'rata'],
    cardBg: 'bg-[#EAF6FD]',
    accentBg: 'bg-[#83C9F4]',
  },
  {
    id: 'waktu',
    number: 5,
    title: 'Kata Adjektif Waktu',
    shortDesc: 'Menerangkan masa atau waktu.',
    examples: ['pagi', 'awal', 'segera'],
    detailedDesc:
      'Menerangkan waktu atau tempoh berlakunya sesuatu peristiwa dengan jelas.',
    roadSafetySentence: 'Pada waktu pagi, Aina berjalan ke sekolah bersama abangnya.',
    highlightedWord: 'pagi',
    moreExamples: ['lewat', 'lama', 'baharu'],
    cardBg: 'bg-[#ECF9F0]',
    accentBg: 'bg-[#A8DDB5]',
  },
];

export const ORIGINAL_PASSAGE_TITLE = 'KESELAMATAN DI JALAN RAYA';

export const ORIGINAL_PASSAGE_PARAGRAPHS: string[] = [
  'Pada waktu pagi, Aina berjalan ke sekolah bersama abangnya. Aina memakai baju seragam berwarna biru dan kasut hitam. Mereka berjalan dengan cermat kerana jalan raya sangat sibuk.',
  'Apabila tiba di lintasan belang yang panjang, Aina berhenti di tepi jalan. Dia melihat lampu isyarat berwarna merah. Sebuah kereta merah berhenti di hadapan mereka. Aina menunggu sehingga lampu pejalan kaki berwarna hijau.',
  'Di tepi jalan, terdapat papan tanda berbentuk bulat yang mengingatkan pengguna supaya berhati-hati. Selepas memastikan jalan raya selamat, Aina dan abangnya melintas dengan berhati-hati. Mereka tidak berlari atau bermain di jalan raya.',
  'Mereka berasa gembira kerana dapat tiba di sekolah dengan selamat. Keselamatan di jalan raya sangat penting. Kita mestilah sentiasa patuh kepada peraturan jalan raya agar semua orang selamat.',
];
