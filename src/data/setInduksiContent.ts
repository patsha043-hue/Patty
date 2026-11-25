import { AdjectiveIntroCard, MovementCardData, StimulusQuestion } from '../types';

export const SET_INDUKSI_INTRO_IMAGE = '/src/assets/images/set_induksi_intro_1794916532825.jpg';

export const YOUTUBE_VIDEO_ID = 'AJzYocbgSg8';
export const YOUTUBE_EMBED_URL = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?rel=0`;

export const MOVEMENT_CARDS: MovementCardData[] = [
  {
    id: 'berhenti',
    cardNumber: 1,
    title: 'Kad 1: BERHENTI',
    instruction: 'Berhenti apabila melihat isyarat berhenti.',
    imageSrc: '/src/assets/images/kad_berhenti_1794916533566.jpg',
    imageAlt: 'Ilustrasi kartun murid mengangkat tangan sebagai isyarat berhenti',
    cardBg: 'bg-[#FFECEC]',
    accentBg: 'bg-[#FF8585]',
    direction: 'stop',
  },
  {
    id: 'lihat-kiri',
    cardNumber: 2,
    title: 'Kad 2: LIHAT KIRI',
    instruction: 'Pandang ke kiri sebelum melintas.',
    imageSrc: '/src/assets/images/kad_lihat_kiri_1794916534963.jpg',
    imageAlt: 'Ilustrasi kartun murid menoleh ke arah kiri sebelum melintas jalan',
    cardBg: 'bg-[#FFF6DA]',
    accentBg: 'bg-[#FFD966]',
    direction: 'left',
  },
  {
    id: 'lihat-kanan',
    cardNumber: 3,
    title: 'Kad 3: LIHAT KANAN',
    instruction: 'Pandang ke kanan sebelum melintas.',
    imageSrc: '/src/assets/images/kad_lihat_kanan_1794916534844.jpg',
    imageAlt: 'Ilustrasi kartun murid menoleh ke arah kanan sebelum melintas jalan',
    cardBg: 'bg-[#EAF6FD]',
    accentBg: 'bg-[#83C9F4]',
    direction: 'right',
  },
];

export const ADJECTIVE_INTRO_CARDS: AdjectiveIntroCard[] = [
  {
    number: 1,
    name: 'Kata Adjektif Sifat',
    shortHint: 'Menerangkan keadaan atau perangai',
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
    shortHint: 'Menerangkan saiz, panjang atau tinggi',
    cardBg: 'bg-[#FFF6DA]',
    iconBg: 'bg-[#FFD966]',
    iconName: 'ruler',
  },
  {
    number: 4,
    name: 'Kata Adjektif Bentuk',
    shortHint: 'Menerangkan rupa atau bentuk objek',
    cardBg: 'bg-[#EAF6FD]',
    iconBg: 'bg-[#83C9F4]',
    iconName: 'shapes',
  },
  {
    number: 5,
    name: 'Kata Adjektif Waktu',
    shortHint: 'Menerangkan masa atau tempoh kejadian',
    cardBg: 'bg-[#ECF9F0]',
    iconBg: 'bg-[#A8DDB5]',
    iconName: 'clock',
  },
];

export const STIMULUS_QUESTIONS: StimulusQuestion[] = [
  {
    id: 'soalan-1',
    number: 1,
    question: 'Apakah warna lampu isyarat yang membenarkan pejalan kaki melintas?',
    placeholder: 'Contoh: Warna hijau membenarkan pejalan kaki melintas...',
    encouragement: 'Syabas! Kamu peka memerhatikan warna lampu isyarat dengan baik.',
    imageSrc: '/src/assets/images/soalan_lampu_isyarat_1794916534769.jpg',
    imageAlt: 'Ilustrasi lampu isyarat pejalan kaki yang menyala hijau di lintasan belang',
    cardBg: 'bg-[#ECF9F0]',
  },
  {
    id: 'soalan-2',
    number: 2,
    question: 'Apakah bentuk papan tanda yang kamu lihat?',
    placeholder: 'Contoh: Ada bentuk bulat, segi empat dan oktagon...',
    encouragement: 'Hebat! Mengenali bentuk papan tanda membantu kita mengenal kata adjektif bentuk.',
    imageSrc: '/src/assets/images/soalan_papan_tanda_1794916534416.jpg',
    imageAlt: 'Ilustrasi papan tanda jalan raya pelbagai bentuk seperti berlian, oktagon dan bulatan',
    cardBg: 'bg-[#FFF6DA]',
  },
  {
    id: 'soalan-3',
    number: 3,
    question: 'Bagaimanakah kita perlu melintas jalan raya?',
    placeholder: 'Contoh: Berhenti, lihat kiri dan kanan, lalu lintas dengan berhati-hati...',
    encouragement: 'Bagus sekali! Amalan melintas dengan berhati-hati menjadikan kamu pengguna jalan raya yang bijak.',
    imageSrc: '/src/assets/images/soalan_melintas_1794916535660.jpg',
    imageAlt: 'Ilustrasi dua orang murid melintas jalan dengan cermat di lintasan belang',
    cardBg: 'bg-[#EAF6FD]',
  },
];
