import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  BookOpen,
  Check,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  Clock,
  Eraser,
  ExternalLink,
  FileText,
  Gamepad2,
  Heart,
  Home,
  Layers,
  LayoutGrid,
  ListChecks,
  Palette,
  PenTool,
  Printer,
  Ruler,
  Save,
  Search,
  Shapes,
  Trophy,
  Users,
  Video,
} from 'lucide-react';
import {
  ADJECTIVE_FOCUS_ITEMS,
  ASSESSMENT_CRITERIA_ITEMS,
  BBM_ITEMS,
  DEFAULT_ASSESSMENT_ROWS,
  DIFFERENTIATED_GROUPS,
  RPH_BASIC_INFO,
  RPH_CURRICULUM_STANDARDS,
  RPH_OBJECTIVES,
  RUANG_GURU_HERO_IMAGE,
  RUANG_GURU_QUICK_CARDS,
  TEACHING_RESOURCES,
  TEACHING_STRATEGIES,
} from '../data/ruangGuruContent';
import {
  AssessmentChecklistRow,
  MasteryStatus,
  PageRoute,
  TeacherReflectionRecord,
} from '../types';
import { CartoonImage } from './CartoonImage';

interface RuangGuruPageProps {
  onNavigate: (route: PageRoute) => void;
}

const EMPTY_TEACHER_REFLECTION: TeacherReflectionRecord = {
  strengths: '',
  challenges: '',
  objectiveAchievement: '',
  followUpActions: '',
  updatedAt: null,
};

function QuickCardIcon({ name }: { name: 'clipboard' | 'book' | 'layers' | 'check' }) {
  if (name === 'clipboard') return <ClipboardList className="h-6 w-6 text-[#29466B]" />;
  if (name === 'book') return <BookOpen className="h-6 w-6 text-[#29466B]" />;
  if (name === 'layers') return <Layers className="h-6 w-6 text-[#29466B]" />;
  return <ClipboardCheck className="h-6 w-6 text-[#29466B]" />;
}

function ObjectiveIcon({ name }: { name: 'search' | 'layers' | 'pen' }) {
  if (name === 'search') return <Search className="h-6 w-6 text-[#29466B]" />;
  if (name === 'layers') return <Layers className="h-6 w-6 text-[#29466B]" />;
  return <PenTool className="h-6 w-6 text-[#29466B]" />;
}

function AdjectiveFocusIcon({ number }: { number: number }) {
  if (number === 1) return <Heart className="h-5 w-5 text-[#29466B]" />;
  if (number === 2) return <Palette className="h-5 w-5 text-[#29466B]" />;
  if (number === 3) return <Ruler className="h-5 w-5 text-[#29466B]" />;
  if (number === 4) return <Shapes className="h-5 w-5 text-[#29466B]" />;
  return <Clock className="h-5 w-5 text-[#29466B]" />;
}

function ResourceIcon({ name }: { name: 'video' | 'gamepad' | 'layout' | 'pen' | 'trophy' }) {
  if (name === 'video') return <Video className="h-6 w-6 text-[#29466B]" />;
  if (name === 'gamepad') return <Gamepad2 className="h-6 w-6 text-[#29466B]" />;
  if (name === 'layout') return <LayoutGrid className="h-6 w-6 text-[#29466B]" />;
  if (name === 'pen') return <PenTool className="h-6 w-6 text-[#29466B]" />;
  return <Trophy className="h-6 w-6 text-[#29466B]" />;
}

export function RuangGuruPage({ onNavigate }: RuangGuruPageProps) {
  const [checkedCriteria, setCheckedCriteria] = useState<Record<string, boolean>>({});
  const [teacherReflection, setTeacherReflection] = useState<TeacherReflectionRecord>(
    EMPTY_TEACHER_REFLECTION
  );
  const [assessmentRows, setAssessmentRows] = useState<AssessmentChecklistRow[]>(
    DEFAULT_ASSESSMENT_ROWS
  );

  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isSavingReflection, setIsSavingReflection] = useState(false);

  const [checklistMessage, setChecklistMessage] = useState<string | null>(null);
  const [isSavingChecklist, setIsSavingChecklist] = useState(false);

  useEffect(() => {
    let active = true;
    const loadState = async () => {
      try {
        const res = await fetch('/api/ruang-guru/state');
        if (!res.ok) return;
        const data = (await res.json()) as {
          state?: {
            teacherReflection?: TeacherReflectionRecord;
            assessmentRows?: AssessmentChecklistRow[];
          };
        };
        if (!active || !data.state) return;

        if (data.state.teacherReflection) {
          setTeacherReflection(data.state.teacherReflection);
        }
        if (Array.isArray(data.state.assessmentRows) && data.state.assessmentRows.length > 0) {
          setAssessmentRows(data.state.assessmentRows.slice(0, 4));
        }
      } catch {
        // Keep initial defaults if server unavailable
      }
    };

    void loadState();
    return () => {
      active = false;
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleCriteriaItem = (id: string) => {
    setCheckedCriteria((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const completedCriteriaCount = ASSESSMENT_CRITERIA_ITEMS.filter(
    (item) => checkedCriteria[item.id]
  ).length;

  const handleAssessmentChange = (
    id: string,
    field: keyof AssessmentChecklistRow,
    value: string | MasteryStatus
  ) => {
    setAssessmentRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
    if (checklistMessage) setChecklistMessage(null);
  };

  const handleSaveChecklist = async () => {
    setIsSavingChecklist(true);
    setChecklistMessage(null);
    try {
      const res = await fetch('/api/ruang-guru/state', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assessmentRows }),
      });
      if (!res.ok) {
        throw new Error('Pelayan gagal menyimpan senarai semak.');
      }
      const data = (await res.json()) as { persistedToDisk?: boolean };
      setChecklistMessage(
        data.persistedToDisk
          ? 'Senarai semak pentaksiran telah disimpan ke pelayan.'
          : 'Senarai semak dikemas kini dalam sesi pelayan semasa.'
      );
    } catch {
      setChecklistMessage('Simpanan ke pelayan tidak berjaya. Rekod hanya kekal dalam paparan ini.');
    } finally {
      setIsSavingChecklist(false);
    }
  };

  const handleSaveReflection = async () => {
    setIsSavingReflection(true);
    setSaveMessage(null);
    setSaveError(null);

    const updatedRecord: TeacherReflectionRecord = {
      ...teacherReflection,
      updatedAt: new Date().toISOString(),
    };

    try {
      const res = await fetch('/api/ruang-guru/state', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teacherReflection: updatedRecord,
        }),
      });
      if (!res.ok) {
        throw new Error('Gagal menyimpan catatan refleksi pada pelayan.');
      }
      const data = (await res.json()) as { persistedToDisk?: boolean };
      setTeacherReflection(updatedRecord);
      setSaveMessage(
        data.persistedToDisk
          ? 'Catatan dan refleksi guru telah disimpan secara kekal pada pelayan.'
          : 'Catatan disimpan dalam memori sesi pelayan semasa (tidak disimpan ke cakera).'
      );
    } catch {
      setSaveError(
        'Simpanan gagal dilaksanakan. Sila gunakan butang “Cetak Refleksi” untuk menyimpan salinan anda.'
      );
    } finally {
      setIsSavingReflection(false);
    }
  };

  const handleClearReflection = async () => {
    setTeacherReflection(EMPTY_TEACHER_REFLECTION);
    setSaveMessage(null);
    setSaveError(null);

    try {
      await fetch('/api/ruang-guru/state/reflection', { method: 'DELETE' });
    } catch {
      // UI fields cleared regardless
    }
  };

  const masteryCount = assessmentRows.filter(
    (r) =>
      r.identifyAdjectives === 'Menguasai' &&
      r.classifyAdjectives === 'Menguasai' &&
      r.buildSentences === 'Menguasai'
  ).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      className="flex flex-col"
    >
      {/* 1. Hero & Kad Navigasi Pantas */}
      <section className="no-print relative overflow-hidden bg-gradient-to-b from-[#83C9F4]/35 via-[#EDF7FD] to-[#FFF8E8] border-b-2 border-[#29466B]/10">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="flex flex-col justify-center gap-5 lg:col-span-6">
              <p className="font-display text-sm font-extrabold tracking-wide text-[#29466B]/80">
                Fasa 7 · Ruang Guru
              </p>

              <h1 className="font-display text-3xl font-black leading-tight text-[#29466B] sm:text-4xl lg:text-5xl [text-wrap:balance]">
                Panduan Pengajaran: Keselamatan di Jalan Raya – Kata Adjektif Tahun 2
              </h1>

              <p className="max-w-xl text-base font-semibold leading-relaxed text-[#29466B]/90 sm:text-lg">
                Rujukan lengkap guru bagi melaksanakan pengajaran Kata Adjektif bertemakan
                Keselamatan di Jalan Raya secara tersusun, terbeza dan mesra murid Tahun 2.
              </p>
            </div>

            <div className="flex items-stretch lg:col-span-6">
              <div className="cartoon-card w-full overflow-hidden rounded-3xl bg-white p-2.5 sm:p-3">
                <CartoonImage
                  src={RUANG_GURU_HERO_IMAGE}
                  alt="Ilustrasi kartun 2D seorang guru bersama murid-murid di dalam bilik darjah"
                  fallbackTitle="Ruang Guru Bahasa Melayu Tahun 2"
                  className="h-full min-h-[260px] w-full rounded-2xl object-cover"
                />
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {RUANG_GURU_QUICK_CARDS.map((card) => (
              <button
                key={card.id}
                type="button"
                onClick={() => scrollToSection(card.id)}
                className={`cartoon-card-interactive flex items-center gap-4 rounded-3xl ${card.cardBg} p-5 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#29466B]`}
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${card.iconBg} border-2 border-[#29466B]/20`}
                >
                  <QuickCardIcon name={card.iconName} />
                </div>
                <div>
                  <h2 className="font-display text-base sm:text-lg font-black text-[#29466B]">
                    {card.title}
                  </h2>
                  <p className="mt-0.5 text-xs sm:text-sm font-bold text-[#29466B]/75">
                    {card.subtitle}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Maklumat Pengajaran */}
      <section
        id="maklumat-pengajaran"
        className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
      >
        <div className="mb-8">
          <p className="font-display text-sm font-extrabold text-[#29466B]/70">
            Bahagian 1 · Rancangan Pengajaran Harian
          </p>
          <h2 className="font-display text-2xl font-black text-[#29466B] sm:text-3xl [text-wrap:balance]">
            Maklumat Pengajaran
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {RPH_BASIC_INFO.map((item) => (
            <div key={item.label} className={`cartoon-card rounded-3xl ${item.bg} p-5`}>
              <p className="font-display text-xs font-extrabold text-[#29466B]/70">{item.label}</p>
              <p className="mt-1 font-display text-lg sm:text-xl font-black text-[#29466B]">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="cartoon-card rounded-3xl bg-white p-6">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#83C9F4] border-2 border-[#29466B]/20">
                <BookOpen className="h-5 w-5 text-[#29466B]" />
              </div>
              <h3 className="font-display text-lg font-black text-[#29466B]">Standard Kandungan</h3>
            </div>
            <p className="text-base font-bold leading-relaxed text-[#29466B]">
              {RPH_CURRICULUM_STANDARDS.sk}
            </p>
          </div>

          <div className="cartoon-card rounded-3xl bg-white p-6">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#A8DDB5] border-2 border-[#29466B]/20">
                <ListChecks className="h-5 w-5 text-[#29466B]" />
              </div>
              <h3 className="font-display text-lg font-black text-[#29466B]">
                Standard Pembelajaran
              </h3>
            </div>
            <p className="text-base font-bold leading-relaxed text-[#29466B]">
              {RPH_CURRICULUM_STANDARDS.sp}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Objektif Pembelajaran */}
      <section
        id="objektif-pembelajaran"
        className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8"
      >
        <div className="cartoon-card rounded-3xl bg-white p-6 sm:p-8 lg:p-10">
          <div className="mb-6">
            <p className="font-display text-sm font-extrabold text-[#29466B]/70">
              Bahagian 2 · Hasil Pembelajaran
            </p>
            <h2 className="font-display text-2xl font-black text-[#29466B] sm:text-3xl [text-wrap:balance]">
              Objektif Pembelajaran
            </h2>
            <p className="mt-2 font-display text-base font-extrabold text-[#29466B]">
              Pada akhir pembelajaran, murid dapat:
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {RPH_OBJECTIVES.map((obj) => (
              <article
                key={obj.number}
                className={`rounded-3xl ${obj.cardBg} border-2 border-[#29466B]/14 p-6`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${obj.iconBg} border-2 border-[#29466B]/20`}
                  >
                    <ObjectiveIcon name={obj.iconName} />
                  </div>
                  <span className="font-display text-2xl font-black text-[#29466B]/60 tabular-nums">
                    0{obj.number}
                  </span>
                </div>
                <p className="text-base font-bold leading-relaxed text-[#29466B]">{obj.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Standard dan Fokus Pembelajaran */}
      <section
        id="standard-fokus-bbm"
        className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
      >
        <div className="mb-8">
          <p className="font-display text-sm font-extrabold text-[#29466B]/70">
            Bahagian 3 · Lima Jenis Kata Adjektif
          </p>
          <h2 className="font-display text-2xl font-black text-[#29466B] sm:text-3xl [text-wrap:balance]">
            Standard dan Fokus Pembelajaran
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ADJECTIVE_FOCUS_ITEMS.map((item) => (
            <article
              key={item.number}
              className={`cartoon-card flex flex-col justify-between rounded-3xl ${item.cardBg} p-6`}
            >
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${item.iconBg} border-2 border-[#29466B]/20`}
                    >
                      <AdjectiveFocusIcon number={item.number} />
                    </div>
                    <h3 className="font-display text-lg font-black text-[#29466B] capitalize">
                      {item.title}
                    </h3>
                  </div>
                  <span className="font-display text-lg font-black text-[#29466B]/55 tabular-nums">
                    0{item.number}
                  </span>
                </div>

                <p className="text-sm sm:text-base font-semibold leading-relaxed text-[#29466B]/90">
                  {item.explanation}
                </p>

                <div className="mt-4 rounded-2xl bg-white/85 p-3.5 border-2 border-[#29466B]/10">
                  <p className="font-display text-xs font-extrabold text-[#29466B]/70">
                    Contoh Kata Adjektif:
                  </p>
                  <p className="mt-1 font-display text-base font-black text-[#29466B]">
                    {item.examples.join(', ')}
                  </p>
                  <p className="mt-2 text-xs sm:text-sm font-semibold text-[#29466B]/85">
                    “{item.sampleSentence}”
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 5. Bahan Bantu Mengajar (BBM) */}
      <section
        id="bahan-bantu-mengajar"
        className="no-print mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8"
      >
        <div className="cartoon-card rounded-3xl bg-white p-6 sm:p-8 lg:p-10">
          <div className="mb-8">
            <p className="font-display text-sm font-extrabold text-[#29466B]/70">
              Bahagian 4 · Bahan Bantu Mengajar
            </p>
            <h2 className="font-display text-2xl font-black text-[#29466B] sm:text-3xl [text-wrap:balance]">
              Bahan Bantu Mengajar (BBM)
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-5">
            {BBM_ITEMS.map((item) => (
              <div
                key={item.number}
                className={`rounded-2xl ${item.cardBg} border-2 border-[#29466B]/14 p-4 flex items-center gap-3`}
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${item.iconBg} border-2 border-[#29466B]/20 font-display text-sm font-black text-[#29466B] tabular-nums`}
                >
                  {item.number}
                </span>
                <p className="font-display text-sm font-black leading-snug text-[#29466B]">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Strategi dan Kaedah Pengajaran */}
      <section
        id="strategi-terbeza"
        className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
      >
        <div className="mb-8">
          <p className="font-display text-sm font-extrabold text-[#29466B]/70">
            Bahagian 5 · Pendekatan PdP
          </p>
          <h2 className="font-display text-2xl font-black text-[#29466B] sm:text-3xl [text-wrap:balance]">
            Strategi dan Kaedah Pengajaran
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TEACHING_STRATEGIES.map((strategy) => (
            <article
              key={strategy.number}
              className={`cartoon-card rounded-3xl ${strategy.cardBg} p-6`}
            >
              <div className="mb-3 flex items-center gap-3">
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${strategy.iconBg} border-2 border-[#29466B]/20 font-display text-base font-black text-[#29466B] tabular-nums`}
                >
                  {strategy.number}
                </span>
                <h3 className="font-display text-lg font-black leading-snug text-[#29466B]">
                  {strategy.title}
                </h3>
              </div>
              <p className="text-sm sm:text-base font-semibold leading-relaxed text-[#29466B]/85">
                {strategy.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* 7. Pengajaran Terbeza */}
      <section className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="font-display text-sm font-extrabold text-[#29466B]/70">
            Bahagian 6 · Kumpulan Tahap Penguasaan
          </p>
          <h2 className="font-display text-2xl font-black text-[#29466B] sm:text-3xl [text-wrap:balance]">
            Pengajaran Terbeza
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {DIFFERENTIATED_GROUPS.map((group) => (
            <article key={group.id} className={`cartoon-card rounded-3xl ${group.cardBg} p-6`}>
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${group.badgeBg} border-2 border-[#29466B]/20`}
                  >
                    <Users className="h-5 w-5 text-[#29466B]" />
                  </div>
                  <h3 className="font-display text-xl font-black text-[#29466B]">{group.title}</h3>
                </div>
                <span className="font-display text-xs font-black text-[#29466B]/70">
                  {group.label}
                </span>
              </div>

              <ul className="space-y-2.5">
                {group.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-sm sm:text-base font-semibold leading-relaxed text-[#29466B]/90"
                  >
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#29466B]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* 8. Pentaksiran Pembelajaran */}
      <section
        id="pentaksiran-pembelajaran"
        className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
      >
        <div className="mb-8">
          <p className="font-display text-sm font-extrabold text-[#29466B]/70">
            Bahagian 7 · Pentaksiran Pembelajaran
          </p>
          <h2 className="font-display text-2xl font-black text-[#29466B] sm:text-3xl [text-wrap:balance]">
            Senarai Semak Pentaksiran Pembelajaran
          </h2>
        </div>

        {/* Senarai Semak Interaktif 5 Kriteria RPH */}
        <div className="cartoon-card rounded-3xl bg-white p-6 sm:p-8">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-display text-xl font-black text-[#29466B]">
                Kriteria Pentaksiran Selaras Objektif Pembelajaran
              </h3>
              <p className="text-sm font-semibold text-[#29466B]/75">
                Klik setiap kriteria untuk menandakan pelaksanaan pentaksiran semasa PdP.
              </p>
            </div>
            <p className="font-display text-base font-black text-[#29466B] tabular-nums">
              Selesai: {completedCriteriaCount}/{ASSESSMENT_CRITERIA_ITEMS.length}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
            {ASSESSMENT_CRITERIA_ITEMS.map((item) => {
              const isChecked = Boolean(checkedCriteria[item.id]);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleCriteriaItem(item.id)}
                  className={`flex items-center gap-3.5 rounded-2xl border-2 p-4 text-left transition-colors cursor-pointer ${
                    isChecked
                      ? 'border-[#2E7D4F] bg-[#ECF9F0]'
                      : `border-[#29466B]/15 ${item.cardBg} hover:border-[#29466B]`
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border-2 font-display text-sm font-black tabular-nums ${
                      isChecked
                        ? 'border-[#2E7D4F] bg-[#2E7D4F] text-white'
                        : 'border-[#29466B]/30 bg-white text-[#29466B]'
                    }`}
                  >
                    {isChecked ? <Check className="h-4 w-4" /> : item.number}
                  </span>
                  <span className="text-sm sm:text-base font-bold text-[#29466B]">{item.text}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Jadual Senarai Semak Rekod Murid */}
        <div className="cartoon-card print-only-worksheet mt-8 rounded-3xl bg-white p-6 sm:p-8">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-black text-[#29466B]">
                Jadual Senarai Semak Penguasaan Murid
              </h3>
              <p className="text-sm font-semibold text-[#29466B]/80 tabular-nums">
                Jumlah rekod murid: {assessmentRows.length} · Menguasai sepenuhnya: {masteryCount}/
                {assessmentRows.length}
              </p>
            </div>

            <div className="no-print flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                disabled={isSavingChecklist}
                onClick={() => void handleSaveChecklist()}
                className="cartoon-btn inline-flex min-h-[42px] items-center gap-1.5 rounded-2xl bg-[#A8DDB5] px-4 py-2 font-display text-sm font-black text-[#29466B] cursor-pointer whitespace-nowrap"
              >
                <Save className="h-4 w-4" />
                <span>{isSavingChecklist ? 'Menyimpan...' : 'Simpan Senarai Semak'}</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border-2 border-[#29466B]/18">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead>
                <tr className="bg-[#FFD966]/65 border-b-2 border-[#29466B]/20">
                  <th className="px-4 py-3 font-display text-sm font-black text-[#29466B]">
                    Bilangan murid
                  </th>
                  <th className="px-4 py-3 font-display text-sm font-black text-[#29466B]">
                    Mengenal pasti kata adjektif
                  </th>
                  <th className="px-4 py-3 font-display text-sm font-black text-[#29466B]">
                    Mengelaskan kata adjektif
                  </th>
                  <th className="px-4 py-3 font-display text-sm font-black text-[#29466B]">
                    Membina ayat gramatis
                  </th>
                  <th className="px-4 py-3 font-display text-sm font-black text-[#29466B]">
                    Catatan guru
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#29466B]/12 bg-white">
                {assessmentRows.map((row) => (
                  <tr key={row.id} className="hover:bg-[#FFF8E8]/60">
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        <span className="font-display text-sm font-black text-[#29466B] tabular-nums w-6">
                          {row.pupilNumber}.
                        </span>
                        <input
                          type="text"
                          value={row.pupilName}
                          aria-label={`Nama murid ${row.pupilNumber}`}
                          onChange={(e) =>
                            handleAssessmentChange(row.id, 'pupilName', e.target.value)
                          }
                          className="w-36 rounded-xl border border-[#29466B]/20 bg-[#FFF8E8] px-2.5 py-1.5 text-sm font-bold text-[#29466B] focus:border-[#29466B] focus:outline-none"
                        />
                      </div>
                    </td>

                    <td className="px-3 py-2.5">
                      <select
                        aria-label={`Mengenal pasti kata adjektif bagi ${row.pupilName}`}
                        value={row.identifyAdjectives}
                        onChange={(e) =>
                          handleAssessmentChange(
                            row.id,
                            'identifyAdjectives',
                            e.target.value as MasteryStatus
                          )
                        }
                        className="w-full rounded-xl border border-[#29466B]/20 bg-white px-2.5 py-1.5 text-sm font-bold text-[#29466B] focus:border-[#29466B] focus:outline-none"
                      >
                        <option value="Belum">Belum</option>
                        <option value="Sedang">Sedang Menguasai</option>
                        <option value="Menguasai">Menguasai</option>
                      </select>
                    </td>

                    <td className="px-3 py-2.5">
                      <select
                        aria-label={`Mengelaskan kata adjektif bagi ${row.pupilName}`}
                        value={row.classifyAdjectives}
                        onChange={(e) =>
                          handleAssessmentChange(
                            row.id,
                            'classifyAdjectives',
                            e.target.value as MasteryStatus
                          )
                        }
                        className="w-full rounded-xl border border-[#29466B]/20 bg-white px-2.5 py-1.5 text-sm font-bold text-[#29466B] focus:border-[#29466B] focus:outline-none"
                      >
                        <option value="Belum">Belum</option>
                        <option value="Sedang">Sedang Menguasai</option>
                        <option value="Menguasai">Menguasai</option>
                      </select>
                    </td>

                    <td className="px-3 py-2.5">
                      <select
                        aria-label={`Membina ayat gramatis bagi ${row.pupilName}`}
                        value={row.buildSentences}
                        onChange={(e) =>
                          handleAssessmentChange(
                            row.id,
                            'buildSentences',
                            e.target.value as MasteryStatus
                          )
                        }
                        className="w-full rounded-xl border border-[#29466B]/20 bg-white px-2.5 py-1.5 text-sm font-bold text-[#29466B] focus:border-[#29466B] focus:outline-none"
                      >
                        <option value="Belum">Belum</option>
                        <option value="Sedang">Sedang Menguasai</option>
                        <option value="Menguasai">Menguasai</option>
                      </select>
                    </td>

                    <td className="px-3 py-2.5">
                      <input
                        type="text"
                        value={row.teacherRemark}
                        aria-label={`Catatan guru bagi ${row.pupilName}`}
                        onChange={(e) =>
                          handleAssessmentChange(row.id, 'teacherRemark', e.target.value)
                        }
                        placeholder="Catatan ringkas..."
                        className="w-full rounded-xl border border-[#29466B]/20 bg-[#FFF8E8] px-2.5 py-1.5 text-sm font-semibold text-[#29466B] focus:border-[#29466B] focus:outline-none"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {checklistMessage && (
            <p role="status" className="mt-3 text-sm font-bold text-[#29466B]">
              {checklistMessage}
            </p>
          )}
        </div>
      </section>

      {/* 9. Sumber Digital Guru */}
      <section
        id="sumber-digital-guru"
        className="no-print mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8"
      >
        <div className="mb-8">
          <p className="font-display text-sm font-extrabold text-[#29466B]/70">
            Bahagian 8 · Pautan Pantas PdP
          </p>
          <h2 className="font-display text-2xl font-black text-[#29466B] sm:text-3xl [text-wrap:balance]">
            Sumber Digital Guru
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TEACHING_RESOURCES.map((res) => (
            <article
              key={res.number}
              className={`cartoon-card-interactive flex flex-col justify-between rounded-3xl ${res.cardBg} p-6`}
            >
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${res.iconBg} border-2 border-[#29466B]/20`}
                  >
                    <ResourceIcon name={res.iconName} />
                  </div>
                  <span className="font-display text-lg font-black text-[#29466B]/55 tabular-nums">
                    0{res.number}
                  </span>
                </div>

                <h3 className="font-display text-lg font-black leading-snug text-[#29466B]">
                  {res.title}
                </h3>
                <p className="mt-1.5 text-sm font-semibold text-[#29466B]/80">{res.subtitle}</p>
              </div>

              <a
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="cartoon-btn mt-6 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-2.5 font-display text-sm font-black text-[#29466B] whitespace-nowrap hover:bg-[#FFD966]"
              >
                <span>{res.buttonLabel}</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* 10. Catatan dan Refleksi Guru */}
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="cartoon-card print-only-worksheet rounded-3xl bg-white p-6 sm:p-8 lg:p-10">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FFD966] border-2 border-[#29466B]">
              <FileText className="h-6 w-6 text-[#29466B]" />
            </div>
            <div>
              <p className="font-display text-sm font-extrabold text-[#29466B]/70">
                Bahagian 9 · Dokumentasi Guru
              </p>
              <h2 className="font-display text-2xl font-black text-[#29466B] sm:text-3xl [text-wrap:balance]">
                Catatan dan Refleksi Guru
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label
                htmlFor="ref-strengths"
                className="block font-display text-sm font-extrabold text-[#29466B]"
              >
                Kekuatan PdP
              </label>
              <textarea
                id="ref-strengths"
                rows={4}
                value={teacherReflection.strengths}
                onChange={(e) =>
                  setTeacherReflection((prev) => ({ ...prev, strengths: e.target.value }))
                }
                placeholder="Nyatakan aspek pengajaran yang berjalan lancar dan berkesan..."
                className="mt-1.5 w-full rounded-2xl border-2 border-[#29466B]/18 bg-[#FFF8E8] px-4 py-3 text-sm sm:text-base font-semibold text-[#29466B] focus:border-[#29466B] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="ref-challenges"
                className="block font-display text-sm font-extrabold text-[#29466B]"
              >
                Kelemahan atau cabaran PdP
              </label>
              <textarea
                id="ref-challenges"
                rows={4}
                value={teacherReflection.challenges}
                onChange={(e) =>
                  setTeacherReflection((prev) => ({ ...prev, challenges: e.target.value }))
                }
                placeholder="Nyatakan cabaran yang dihadapi sepanjang sesi PdP..."
                className="mt-1.5 w-full rounded-2xl border-2 border-[#29466B]/18 bg-[#FFF8E8] px-4 py-3 text-sm sm:text-base font-semibold text-[#29466B] focus:border-[#29466B] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="ref-objectives"
                className="block font-display text-sm font-extrabold text-[#29466B]"
              >
                Tahap pencapaian objektif pembelajaran
              </label>
              <textarea
                id="ref-objectives"
                rows={4}
                value={teacherReflection.objectiveAchievement}
                onChange={(e) =>
                  setTeacherReflection((prev) => ({
                    ...prev,
                    objectiveAchievement: e.target.value,
                  }))
                }
                placeholder="Contoh: 22/25 murid mencapai objektif mengenal pasti dan mengelaskan kata adjektif..."
                className="mt-1.5 w-full rounded-2xl border-2 border-[#29466B]/18 bg-[#FFF8E8] px-4 py-3 text-sm sm:text-base font-semibold text-[#29466B] focus:border-[#29466B] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="ref-followup"
                className="block font-display text-sm font-extrabold text-[#29466B]"
              >
                Tindakan susulan
              </label>
              <textarea
                id="ref-followup"
                rows={4}
                value={teacherReflection.followUpActions}
                onChange={(e) =>
                  setTeacherReflection((prev) => ({ ...prev, followUpActions: e.target.value }))
                }
                placeholder="Nyatakan aktiviti pemulihan atau pengayaan untuk PdP seterusnya..."
                className="mt-1.5 w-full rounded-2xl border-2 border-[#29466B]/18 bg-[#FFF8E8] px-4 py-3 text-sm sm:text-base font-semibold text-[#29466B] focus:border-[#29466B] focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {saveMessage && (
            <div
              role="status"
              className="mt-5 flex items-center gap-2.5 rounded-2xl border-2 border-[#A8DDB5] bg-[#ECF9F0] p-4 text-sm font-bold text-[#29466B]"
            >
              <CheckCircle2 className="h-5 w-5 shrink-0 text-[#2E7D4F]" />
              <span>{saveMessage}</span>
            </div>
          )}

          {saveError && (
            <div
              role="alert"
              className="mt-5 rounded-2xl border-2 border-[#FF8585] bg-[#FFECEC] p-4 text-sm font-bold text-[#9E1C1C]"
            >
              {saveError}
            </div>
          )}

          <div className="no-print mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              disabled={isSavingReflection}
              onClick={() => void handleSaveReflection()}
              className="cartoon-btn inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-[#A8DDB5] px-6 py-3 font-display text-base font-black text-[#29466B] cursor-pointer disabled:opacity-70 whitespace-nowrap"
            >
              <Save className="h-4 w-4" />
              <span>{isSavingReflection ? 'Menyimpan...' : 'Simpan Catatan'}</span>
            </button>

            <button
              type="button"
              onClick={() => void handleClearReflection()}
              className="cartoon-btn inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-[#FF8585]/80 px-5 py-3 font-display text-base font-extrabold text-[#29466B] cursor-pointer whitespace-nowrap"
            >
              <Eraser className="h-4 w-4" />
              <span>Padam Catatan</span>
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="cartoon-btn inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-[#83C9F4] px-5 py-3 font-display text-base font-black text-[#29466B] cursor-pointer whitespace-nowrap"
            >
              <Printer className="h-4 w-4" />
              <span>Cetak Refleksi</span>
            </button>
          </div>
        </div>
      </section>

      {/* Navigasi Bawah Ruang Guru */}
      <section className="no-print mx-auto w-full max-w-7xl px-4 pt-2 pb-16 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => onNavigate(PageRoute.PENUTUP)}
            className="cartoon-btn inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 font-display text-sm sm:text-base font-extrabold text-[#29466B] cursor-pointer whitespace-nowrap"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Kembali ke Penutup</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate(PageRoute.HOME)}
            className="cartoon-btn inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-[#FFD966] px-6 py-3 font-display text-sm sm:text-base font-black text-[#29466B] cursor-pointer whitespace-nowrap"
          >
            <Home className="h-4 w-4" />
            <span>Kembali ke Halaman Utama</span>
          </button>
        </div>
      </section>
    </motion.div>
  );
}
