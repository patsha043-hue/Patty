import {
  LearningJourneyStep,
  LearningObjective,
  NarrationTrack,
  NarrationTrackId,
  NavItem,
  PageRoute,
} from '../types';

export const HERO_IMAGE_PATH = '/src/assets/images/hero_road_safety_1794900712666.jpg';
export const INTRO_IMAGE_PATH = '/src/assets/images/intro_student_books_1794900712701.jpg';

export const NAV_ITEMS: NavItem[] = [
  {
    id: PageRoute.HOME,
    label: 'Halaman Utama',
    shortDesc: 'Fasa 1 · Kenali pembelajaran yang akan diterokai.',
  },
  {
    id: PageRoute.SET_INDUKSI,
    label: 'Set Induksi',
    shortDesc: 'Fasa 2 · Mulakan pembelajaran melalui aktiviti pengenalan.',
  },
  {
    id: PageRoute.KENALI_KATA_ADJEKTIF,
    label: 'Langkah 1',
    shortDesc: 'Fasa 3 · Kenali lima jenis kata adjektif melalui petikan.',
  },
  {
    id: PageRoute.MISI_PEMBELAJARAN,
    label: 'Langkah 2',
    shortDesc: 'Fasa 4 · Misi Ejen Kata Adjektif untuk murid sederhana.',
  },
  {
    id: PageRoute.KUIZ_PENTAKSIRAN,
    label: 'Langkah 3',
    shortDesc: 'Fasa 5 · Pembina Ayat Kreatif untuk murid baik.',
  },
  {
    id: PageRoute.PENUTUP,
    label: 'Penutup',
    shortDesc: 'Fasa 6 · Uji minda melalui kuiz interaktif dan rumusan.',
  },
  {
    id: PageRoute.RUANG_GURU,
    label: 'Ruang Guru',
    shortDesc: 'Fasa 7 · Akses maklumat dan bahan sokongan pengajaran.',
  },
];

export const NARRATION_TRACKS: NarrationTrack[] = [
  {
    id: NarrationTrackId.WELCOME,
    title: 'Ucapan Alu-Aluan',
    subtitle: 'Sapaan mesra Cikgu Maya sebelum memulakan pembelajaran',
    script:
      'Assalamualaikum dan salam sejahtera, murid-murid! Selamat datang ke laman pembelajaran Bahasa Melayu. Hari ini kita akan belajar tentang kata adjektif melalui tajuk Keselamatan di Jalan Raya. Mari kita belajar bersama-sama dengan ceria!',
  },
  {
    id: NarrationTrackId.INTRO,
    title: 'Pengenalan Pembelajaran',
    subtitle: 'Gambaran ringkas tentang apa yang bakal dipelajari',
    script:
      'Selamat datang ke dunia kata adjektif! Dalam pembelajaran ini, murid akan mengenali kata adjektif melalui tema keselamatan di jalan raya. Murid akan belajar mengenal pasti, mengelaskan dan menggunakan kata adjektif dalam ayat berdasarkan konteks yang sesuai.',
  },
  {
    id: NarrationTrackId.CURRICULUM_OBJECTIVES,
    title: 'Maklumat & Objektif',
    subtitle: 'Penerangan SK, SP dan tiga objektif pembelajaran',
    script:
      'Mari kenali maklumat dan objektif pembelajaran kita pada hari ini. Untuk mata pelajaran Bahasa Melayu Tahun Dua, tema kita ialah Keselamatan dengan tajuk Keselamatan di Jalan Raya. Standard pembelajaran lima perpuluhan satu perpuluhan tiga merangkumi lima jenis kata adjektif, iaitu sifat, warna, ukuran, bentuk dan waktu. Pada akhir pembelajaran, kamu akan dapat mengenal pasti jenis kata adjektif, mengelaskan kata adjektif mengikut jenis yang betul, serta membina ayat gramatis dengan yakin!',
  },
];

export const ADJECTIVE_CATEGORIES = [
  { roman: '(i)', label: 'Sifat' },
  { roman: '(ii)', label: 'Warna' },
  { roman: '(iii)', label: 'Ukuran' },
  { roman: '(iv)', label: 'Bentuk' },
  { roman: '(v)', label: 'Waktu' },
];

export const LEARNING_OBJECTIVES: LearningObjective[] = [
  {
    number: '01',
    title: 'Objektif 1 – Mengenal Pasti',
    description:
      'Murid dapat mengenal pasti sekurang-kurangnya 4 daripada 5 jenis kata adjektif berdasarkan poster dan petikan bertema keselamatan di jalan raya dengan betul.',
    imageSrc: '/src/assets/images/obj_mengenal_pasti_1794900713186.jpg',
    imageAlt: 'Ilustrasi kanta pembesar memeriksa poster keselamatan di jalan raya',
    themeBg: 'bg-[#ECF9F0]',
    themeAccent: 'bg-[#A8DDB5]',
    badgeColor: '#A8DDB5',
    iconName: 'search',
  },
  {
    number: '02',
    title: 'Objektif 2 – Mengelaskan',
    description:
      'Murid dapat mengelaskan sekurang-kurangnya 8 daripada 10 kata adjektif mengikut jenis yang betul.',
    imageSrc: '/src/assets/images/obj_mengelaskan_1794900713820.jpg',
    imageAlt: 'Ilustrasi bakul pengelasan kad bas sekolah, kon dan papan tanda jalan raya',
    themeBg: 'bg-[#FFF6DA]',
    themeAccent: 'bg-[#FFD966]',
    badgeColor: '#FFD966',
    iconName: 'layers',
  },
  {
    number: '03',
    title: 'Objektif 3 – Membina Ayat',
    description:
      'Murid dapat membina sekurang-kurangnya 3 ayat gramatis menggunakan kata adjektif yang sesuai mengikut konteks melalui aktiviti pengukuhan.',
    imageSrc: '/src/assets/images/obj_membina_ayat_1794900713548.jpg',
    imageAlt: 'Ilustrasi buku nota dan pensel melukis bintang di tepi laluan pejalan kaki selamat',
    themeBg: 'bg-[#EAF6FD]',
    themeAccent: 'bg-[#83C9F4]',
    badgeColor: '#83C9F4',
    iconName: 'pen',
  },
];

export const LEARNING_JOURNEY_STEPS: LearningJourneyStep[] = [
  {
    stepNumber: 1,
    route: PageRoute.HOME,
    title: 'Halaman Utama',
    description: 'Kenali pembelajaran yang akan diterokai.',
    accentBg: 'bg-[#83C9F4]',
    iconName: 'home',
  },
  {
    stepNumber: 2,
    route: PageRoute.SET_INDUKSI,
    title: 'Set Induksi',
    description: 'Mulakan pembelajaran melalui aktiviti pengenalan.',
    accentBg: 'bg-[#FFD966]',
    iconName: 'sparkles',
  },
  {
    stepNumber: 3,
    route: PageRoute.KENALI_KATA_ADJEKTIF,
    title: 'Kenali Kata Adjektif',
    description: 'Terokai lima jenis kata adjektif.',
    accentBg: 'bg-[#A8DDB5]',
    iconName: 'book',
  },
  {
    stepNumber: 4,
    route: PageRoute.MISI_PEMBELAJARAN,
    title: 'Misi Pembelajaran',
    description: 'Laksanakan aktiviti pembelajaran mengikut tahap penguasaan.',
    accentBg: 'bg-[#FFD966]',
    iconName: 'flag',
  },
  {
    stepNumber: 5,
    route: PageRoute.KUIZ_PENTAKSIRAN,
    title: 'Kuiz dan Pentaksiran',
    description: 'Uji kefahaman melalui kuiz interaktif.',
    accentBg: 'bg-[#FF8585]',
    iconName: 'award',
  },
  {
    stepNumber: 6,
    route: PageRoute.RUANG_GURU,
    title: 'Ruang Guru',
    description: 'Akses maklumat dan bahan sokongan pengajaran.',
    accentBg: 'bg-[#83C9F4]',
    iconName: 'briefcase',
  },
];
