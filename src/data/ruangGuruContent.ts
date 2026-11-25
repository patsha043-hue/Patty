import { AssessmentChecklistRow } from '../types';

export const RUANG_GURU_HERO_IMAGE = '/src/assets/images/ruang_guru_classroom_1794928705070.jpg';

export const RUANG_GURU_QUICK_CARDS = [
  {
    id: 'maklumat-pengajaran',
    title: 'Maklumat Pengajaran',
    subtitle: 'Butiran RPH, SK, SP & objektif',
    cardBg: 'bg-[#EAF6FD]',
    iconBg: 'bg-[#83C9F4]',
    iconName: 'clipboard' as const,
  },
  {
    id: 'standard-fokus-bbm',
    title: 'Fokus & Bahan Bantu',
    subtitle: '5 kata adjektif & 10 BBM',
    cardBg: 'bg-[#ECF9F0]',
    iconBg: 'bg-[#A8DDB5]',
    iconName: 'book' as const,
  },
  {
    id: 'strategi-terbeza',
    title: 'Strategi & Terbeza',
    subtitle: 'Kaedah PdP & 3 aras kumpulan',
    cardBg: 'bg-[#FFF6DA]',
    iconBg: 'bg-[#FFD966]',
    iconName: 'layers' as const,
  },
  {
    id: 'pentaksiran-pembelajaran',
    title: 'Pentaksiran & Sumber',
    subtitle: 'Semakan objektif & pautan digital',
    cardBg: 'bg-[#FFECEC]',
    iconBg: 'bg-[#FF8585]',
    iconName: 'check' as const,
  },
];

export const RPH_BASIC_INFO = [
  { label: 'Mata Pelajaran', value: 'Bahasa Melayu', bg: 'bg-[#EAF6FD]' },
  { label: 'Tahun', value: 'Tahun 2', bg: 'bg-[#FFF6DA]' },
  { label: 'Tema', value: 'Keselamatan di Jalan Raya', bg: 'bg-[#ECF9F0]' },
  { label: 'Tajuk', value: 'Kata Adjektif', bg: 'bg-[#FFECEC]' },
  { label: 'Fokus Kata Adjektif', value: 'Sifat, warna, ukuran, bentuk dan waktu', bg: 'bg-[#EAF6FD]' },
  { label: 'Tempoh Pengajaran', value: '60 minit', bg: 'bg-[#FFF6DA]' },
];

export const RPH_CURRICULUM_STANDARDS = {
  sk: '5.1 Memahami fungsi dan menggunakan golongan kata mengikut konteks.',
  sp: '5.1.3 Memahami, mengenal pasti dan menggunakan kata adjektif mengikut konteks.',
};

export const RPH_OBJECTIVES = [
  {
    number: 1,
    text: 'Mengenal pasti sekurang-kurangnya 4 daripada 5 jenis kata adjektif berdasarkan poster dan petikan.',
    cardBg: 'bg-[#ECF9F0]',
    iconBg: 'bg-[#A8DDB5]',
    iconName: 'search' as const,
  },
  {
    number: 2,
    text: 'Mengelaskan sekurang-kurangnya 8 daripada 10 kata adjektif mengikut jenis yang betul.',
    cardBg: 'bg-[#FFF6DA]',
    iconBg: 'bg-[#FFD966]',
    iconName: 'layers' as const,
  },
  {
    number: 3,
    text: 'Membina sekurang-kurangnya 3 ayat gramatis menggunakan kata adjektif yang sesuai.',
    cardBg: 'bg-[#EAF6FD]',
    iconBg: 'bg-[#83C9F4]',
    iconName: 'pen' as const,
  },
];

export const ADJECTIVE_FOCUS_ITEMS = [
  {
    number: 1,
    title: 'Kata adjektif sifat',
    explanation: 'Menerangkan sifat, sikap atau keadaan seseorang serta situasi di jalan raya.',
    examples: ['cermat', 'selamat', 'sibuk'],
    sampleSentence: 'Aina dan abangnya berjalan dengan cermat di tepi jalan raya.',
    cardBg: 'bg-[#ECF9F0]',
    iconBg: 'bg-[#A8DDB5]',
  },
  {
    number: 2,
    title: 'Kata adjektif warna',
    explanation: 'Menyatakan warna lampu isyarat, kenderaan, papan tanda atau pakaian murid.',
    examples: ['merah', 'hijau', 'biru'],
    sampleSentence: 'Sebuah kereta merah berhenti di hadapan lintasan belang.',
    cardBg: 'bg-[#FFECEC]',
    iconBg: 'bg-[#FF8585]',
  },
  {
    number: 3,
    title: 'Kata adjektif ukuran',
    explanation: 'Menerangkan saiz, panjang, lebar atau tinggi sesuatu objek di jalan raya.',
    examples: ['panjang', 'besar', 'lebar'],
    sampleSentence: 'Aina berhenti apabila tiba di lintasan belang yang panjang.',
    cardBg: 'bg-[#FFF6DA]',
    iconBg: 'bg-[#FFD966]',
  },
  {
    number: 4,
    title: 'Kata adjektif bentuk',
    explanation: 'Menerangkan rupa permukaan papan tanda atau laluan keselamatan jalan raya.',
    examples: ['bulat', 'segi tiga', 'lurus'],
    sampleSentence: 'Di tepi jalan terdapat papan tanda berbentuk bulat.',
    cardBg: 'bg-[#EAF6FD]',
    iconBg: 'bg-[#83C9F4]',
  },
  {
    number: 5,
    title: 'Kata adjektif waktu',
    explanation: 'Menerangkan masa atau tempoh berlakunya sesuatu peristiwa keselamatan jalan raya.',
    examples: ['pagi', 'awal', 'segera'],
    sampleSentence: 'Pada waktu pagi, Aina berjalan ke sekolah bersama abangnya.',
    cardBg: 'bg-[#ECF9F0]',
    iconBg: 'bg-[#A8DDB5]',
  },
];

export const BBM_ITEMS = [
  { number: 1, title: 'Video Keselamatan di Jalan Raya', cardBg: 'bg-[#FFECEC]', iconBg: 'bg-[#FF8585]' },
  { number: 2, title: 'Petikan “Keselamatan di Jalan Raya”', cardBg: 'bg-[#ECF9F0]', iconBg: 'bg-[#A8DDB5]' },
  { number: 3, title: 'Poster keselamatan jalan raya', cardBg: 'bg-[#FFF6DA]', iconBg: 'bg-[#FFD966]' },
  { number: 4, title: 'Slaid pembelajaran', cardBg: 'bg-[#EAF6FD]', iconBg: 'bg-[#83C9F4]' },
  { number: 5, title: 'Komputer riba', cardBg: 'bg-[#ECF9F0]', iconBg: 'bg-[#A8DDB5]' },
  { number: 6, title: 'Smart TV', cardBg: 'bg-[#EAF6FD]', iconBg: 'bg-[#83C9F4]' },
  { number: 7, title: 'Canva', cardBg: 'bg-[#FFF6DA]', iconBg: 'bg-[#FFD966]' },
  { number: 8, title: 'Padlet', cardBg: 'bg-[#FFECEC]', iconBg: 'bg-[#FF8585]' },
  { number: 9, title: 'Lembaran kerja', cardBg: 'bg-[#ECF9F0]', iconBg: 'bg-[#A8DDB5]' },
  { number: 10, title: 'Permainan digital kata adjektif', cardBg: 'bg-[#EAF6FD]', iconBg: 'bg-[#83C9F4]' },
];

export const TEACHING_STRATEGIES = [
  {
    number: 1,
    title: 'Pembelajaran koperatif',
    description: 'Murid bekerjasama dalam kumpulan kecil untuk berkongsi idea dan jawapan.',
    cardBg: 'bg-[#EAF6FD]',
    iconBg: 'bg-[#83C9F4]',
  },
  {
    number: 2,
    title: 'Pembelajaran terbeza mengikut tahap penguasaan murid',
    description: 'Tugasan disusun mengikut aras Asas, Sederhana dan Baik agar setiap murid dapat belajar secara optimum.',
    cardBg: 'bg-[#FFF6DA]',
    iconBg: 'bg-[#FFD966]',
  },
  {
    number: 3,
    title: 'Perbincangan berpasangan',
    description: 'Murid berbincang secara berpasangan bagi mengenal pasti kata adjektif dalam petikan dan poster.',
    cardBg: 'bg-[#ECF9F0]',
    iconBg: 'bg-[#A8DDB5]',
  },
  {
    number: 4,
    title: 'Pembelajaran berasaskan aktiviti digital',
    description: 'Penggunaan permainan digital, Canva, Padlet dan kuiz interaktif meningkatkan penglibatan murid.',
    cardBg: 'bg-[#FFECEC]',
    iconBg: 'bg-[#FF8585]',
  },
  {
    number: 5,
    title: 'Pembelajaran berpusatkan murid',
    description: 'Murid aktif meneroka bahan, menjawab soalan dan membina ayat secara kendiri serta berkumpulan.',
    cardBg: 'bg-[#EAF6FD]',
    iconBg: 'bg-[#83C9F4]',
  },
  {
    number: 6,
    title: 'Bimbingan guru mengikut keperluan murid',
    description: 'Guru memantau kemajuan dan memberi panduan berfokus terutamanya kepada murid kumpulan asas.',
    cardBg: 'bg-[#ECF9F0]',
    iconBg: 'bg-[#A8DDB5]',
  },
];

export const DIFFERENTIATED_GROUPS = [
  {
    id: 'asas',
    label: 'Aras 1',
    title: 'Kumpulan Asas',
    cardBg: 'bg-[#ECF9F0]',
    badgeBg: 'bg-[#A8DDB5]',
    points: [
      'Mengenal pasti dan menyenaraikan lima kata adjektif daripada petikan.',
      'Mendapat bimbingan dan petunjuk ringkas.',
    ],
  },
  {
    id: 'sederhana',
    label: 'Aras 2',
    title: 'Kumpulan Sederhana',
    cardBg: 'bg-[#FFF6DA]',
    badgeBg: 'bg-[#FFD966]',
    points: [
      'Melengkapkan ayat menggunakan pilihan kata adjektif yang sesuai.',
    ],
  },
  {
    id: 'baik',
    label: 'Aras 3',
    title: 'Kumpulan Baik',
    cardBg: 'bg-[#EAF6FD]',
    badgeBg: 'bg-[#83C9F4]',
    points: [
      'Membina ayat gramatis secara kendiri berdasarkan gambar dan kata adjektif yang diberikan.',
    ],
  },
];

export const ASSESSMENT_CRITERIA_ITEMS = [
  {
    id: 'kriteria-1',
    number: 1,
    text: 'Pemerhatian terhadap penglibatan murid.',
    cardBg: 'bg-[#EAF6FD]',
  },
  {
    id: 'kriteria-2',
    number: 2,
    text: 'Semakan jawapan dalam aktiviti mengenal pasti kata adjektif.',
    cardBg: 'bg-[#ECF9F0]',
  },
  {
    id: 'kriteria-3',
    number: 3,
    text: 'Semakan latihan mengelaskan kata adjektif.',
    cardBg: 'bg-[#FFF6DA]',
  },
  {
    id: 'kriteria-4',
    number: 4,
    text: 'Penilaian ayat yang dibina oleh murid.',
    cardBg: 'bg-[#FFECEC]',
  },
  {
    id: 'kriteria-5',
    number: 5,
    text: 'Maklum balas melalui aktiviti digital dan Padlet.',
    cardBg: 'bg-[#EAF6FD]',
  },
];

export const TEACHING_RESOURCES = [
  {
    number: 1,
    title: 'Video Keselamatan di Jalan Raya',
    subtitle: 'Video lagu set induksi dan pengukuhan tema jalan raya',
    url: 'https://youtu.be/AJzYocbgSg8?si=dpOaaRXAiZ6Xv8RW',
    buttonLabel: 'Buka Sumber',
    cardBg: 'bg-[#FFECEC]',
    iconBg: 'bg-[#FF8585]',
    iconName: 'video' as const,
  },
  {
    number: 2,
    title: 'Permainan Canva – Misi Ejen Kata Adjektif',
    subtitle: 'Aktiviti permainan digital interaktif Langkah 3',
    url: 'https://faizazri.my.canva.site/misi-ejen-kata-adjektif',
    buttonLabel: 'Buka Sumber',
    cardBg: 'bg-[#EAF6FD]',
    iconBg: 'bg-[#83C9F4]',
    iconName: 'gamepad' as const,
  },
  {
    number: 3,
    title: 'Padlet – Jawapan Langkah 1',
    subtitle: 'Papan perkongsian jawapan mengenal pasti kata adjektif',
    url: 'https://padlet.com/unishoo004/jawapan-s025rn81im4fg9xhzoil',
    buttonLabel: 'Buka Sumber',
    cardBg: 'bg-[#ECF9F0]',
    iconBg: 'bg-[#A8DDB5]',
    iconName: 'layout' as const,
  },
  {
    number: 4,
    title: 'Padlet – Bina Ayat',
    subtitle: 'Papan perkongsian ayat gramatis Kumpulan Baik',
    url: 'https://padlet.com/gipgp24311962/bina-ayat-s024ekm3pxmgtgi32ph3',
    buttonLabel: 'Buka Sumber',
    cardBg: 'bg-[#FFF6DA]',
    iconBg: 'bg-[#FFD966]',
    iconName: 'pen' as const,
  },
  {
    number: 5,
    title: 'Wayground – Kuiz Penutup',
    subtitle: 'Kuiz penilaian akhir pemahaman Kata Adjektif Tahun 2',
    url: 'https://wayground.com/join?gc=18208563',
    buttonLabel: 'Buka Sumber',
    cardBg: 'bg-[#EAF6FD]',
    iconBg: 'bg-[#83C9F4]',
    iconName: 'trophy' as const,
  },
];

export const DEFAULT_ASSESSMENT_ROWS: AssessmentChecklistRow[] = [
  {
    id: 'm1',
    pupilNumber: 1,
    pupilName: 'Murid 1',
    identifyAdjectives: 'Belum',
    classifyAdjectives: 'Belum',
    buildSentences: 'Belum',
    teacherRemark: '',
  },
  {
    id: 'm2',
    pupilNumber: 2,
    pupilName: 'Murid 2',
    identifyAdjectives: 'Belum',
    classifyAdjectives: 'Belum',
    buildSentences: 'Belum',
    teacherRemark: '',
  },
  {
    id: 'm3',
    pupilNumber: 3,
    pupilName: 'Murid 3',
    identifyAdjectives: 'Belum',
    classifyAdjectives: 'Belum',
    buildSentences: 'Belum',
    teacherRemark: '',
  },
  {
    id: 'm4',
    pupilNumber: 4,
    pupilName: 'Murid 4',
    identifyAdjectives: 'Belum',
    classifyAdjectives: 'Belum',
    buildSentences: 'Belum',
    teacherRemark: '',
  },
];
