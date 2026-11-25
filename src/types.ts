export enum PageRoute {
  HOME = 'halaman-utama',
  SET_INDUKSI = 'set-induksi',
  KENALI_KATA_ADJEKTIF = 'kenali-kata-adjektif',
  MISI_PEMBELAJARAN = 'misi-pembelajaran',
  KUIZ_PENTAKSIRAN = 'kuiz-dan-pentaksiran',
  PENUTUP = 'penutup',
  RUANG_GURU = 'ruang-guru',
}

export enum NarrationTrackId {
  WELCOME = 'welcome',
  INTRO = 'intro',
  CURRICULUM_OBJECTIVES = 'curriculum_objectives',
}

export interface NavItem {
  id: PageRoute;
  label: string;
  shortDesc: string;
}

export interface NarrationTrack {
  id: NarrationTrackId;
  title: string;
  subtitle: string;
  script: string;
}

export interface LearningObjective {
  number: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  themeBg: string;
  themeAccent: string;
  badgeColor: string;
  iconName: 'search' | 'layers' | 'pen';
}

export interface LearningJourneyStep {
  stepNumber: number;
  route: PageRoute;
  title: string;
  description: string;
  accentBg: string;
  iconName: 'home' | 'sparkles' | 'book' | 'flag' | 'award' | 'briefcase';
}

export interface MovementCardData {
  id: string;
  cardNumber: number;
  title: string;
  instruction: string;
  imageSrc: string;
  imageAlt: string;
  cardBg: string;
  accentBg: string;
  direction: 'stop' | 'left' | 'right';
}

export interface AdjectiveIntroCard {
  number: number;
  name: string;
  shortHint: string;
  cardBg: string;
  iconBg: string;
  iconName: 'heart' | 'palette' | 'ruler' | 'shapes' | 'clock';
}

export interface StimulusQuestion {
  id: string;
  number: number;
  question: string;
  placeholder: string;
  encouragement: string;
  imageSrc: string;
  imageAlt: string;
  cardBg: string;
}

export interface StudentResponseRecord {
  id: string;
  studentName: string;
  questionId: string;
  questionNumber: number;
  questionText: string;
  answer: string;
  submittedAt: string;
  reviewed: boolean;
  teacherNote?: string;
}

export interface AdjectiveTypeDetail {
  id: 'sifat' | 'warna' | 'ukuran' | 'bentuk' | 'waktu';
  number: number;
  title: string;
  shortDesc: string;
  examples: string[];
  detailedDesc: string;
  roadSafetySentence: string;
  highlightedWord: string;
  moreExamples: string[];
  cardBg: string;
  accentBg: string;
}

export interface WorksheetFieldConfig {
  id: 'sifat' | 'warna' | 'ukuran' | 'bentuk' | 'waktu';
  number: number;
  label: string;
  placeholder: string;
  teacherGuideAnswer: string;
  acceptedAnswers: string[];
}

export interface WorksheetSubmission {
  id: string;
  studentName: string;
  studentClass: string;
  answers: Record<'sifat' | 'warna' | 'ukuran' | 'bentuk' | 'waktu', string>;
  submittedAt: string;
  reviewed: boolean;
}

export type MasteryStatus = 'Belum' | 'Sedang' | 'Menguasai';

export interface AssessmentChecklistRow {
  id: string;
  pupilNumber: number;
  pupilName: string;
  identifyAdjectives: MasteryStatus;
  classifyAdjectives: MasteryStatus;
  buildSentences: MasteryStatus;
  teacherRemark: string;
}

export interface PdpStepReflection {
  masteryLevel: string;
  activityEffectiveness: string;
  challenges: string;
  improvements: string;
}

export interface TeacherReflectionRecord {
  strengths: string;
  challenges: string;
  objectiveAchievement: string;
  followUpActions: string;
  updatedAt: string | null;
}


