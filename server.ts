import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  apiVersion: 'v1beta',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const audioCache = new Map<string, string>();

const NARRATION_SCRIPTS: Record<string, string> = {
  welcome:
    'Assalamualaikum dan salam sejahtera, murid-murid! Selamat datang ke laman pembelajaran Bahasa Melayu. Hari ini kita akan belajar tentang kata adjektif melalui tajuk Keselamatan di Jalan Raya. Mari kita belajar bersama-sama dengan ceria!',
  intro:
    'Selamat datang ke dunia kata adjektif! Dalam pembelajaran ini, murid akan mengenali kata adjektif melalui tema keselamatan di jalan raya. Murid akan belajar mengenal pasti, mengelaskan dan menggunakan kata adjektif dalam ayat berdasarkan konteks yang sesuai.',
  curriculum_objectives:
    'Mari kenali maklumat dan objektif pembelajaran kita pada hari ini. Untuk mata pelajaran Bahasa Melayu Tahun Dua, tema kita ialah Keselamatan dengan tajuk Keselamatan di Jalan Raya. Standard pembelajaran lima perpuluhan satu perpuluhan tiga merangkumi lima jenis kata adjektif, iaitu sifat, warna, ukuran, bentuk dan waktu. Pada akhir pembelajaran, kamu akan dapat mengenal pasti jenis kata adjektif, mengelaskan kata adjektif mengikut jenis yang betul, serta membina ayat gramatis dengan yakin!',
};

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  app.post('/api/tts', async (req, res) => {
    try {
      const { trackId, text } = req.body as { trackId?: string; text?: string };

      const scriptText =
        trackId && NARRATION_SCRIPTS[trackId]
          ? NARRATION_SCRIPTS[trackId]
          : typeof text === 'string' && text.trim().length > 0
            ? text.trim().slice(0, 1200)
            : '';

      if (!scriptText) {
        res.status(400).json({ error: 'Teks narasi diperlukan untuk menjana suara AI.' });
        return;
      }

      if (!process.env.GEMINI_API_KEY) {
        res.status(500).json({
          error: 'Kunci API Gemini belum dikonfigurasikan pada pelayan. Sila semak tetapan Secrets.',
        });
        return;
      }

      const cacheKey = trackId ? `track:${trackId}` : `text:${scriptText}`;
      const cachedAudio = audioCache.get(cacheKey);
      if (cachedAudio) {
        res.json({ audioBase64: cachedAudio, mimeType: 'audio/wav', cached: true });
        return;
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash-lite-tts',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: scriptText,
                speechMetadata: {
                  style:
                    'Warm, gentle, cheerful Malaysian female primary school teacher speaking standard Bahasa Melayu Malaysia with authentic Malaysian Malay accent and clear pronunciation for 8-year-old Year 2 pupils. Moderate, friendly pace. Never use Indonesian accent, never use male voice, never speak English.',
                },
              },
            ],
          },
        ],
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
          },
        },
      });

      const part = response.candidates?.[0]?.content?.parts?.[0];
      const base64Audio = part?.inlineData?.data;

      if (!base64Audio) {
        res.status(502).json({
          error: 'Suara AI tidak dapat dijana buat masa ini. Sila cuba sebentar lagi.',
        });
        return;
      }

      audioCache.set(cacheKey, base64Audio);
      res.json({
        audioBase64: base64Audio,
        mimeType: part?.inlineData?.mimeType || 'audio/wav',
        cached: false,
      });
    } catch (error: unknown) {
      const errObj = error as { status?: number; message?: string };
      const status = typeof errObj?.status === 'number' ? errObj.status : 500;
      const message = errObj?.message || 'Ralat tidak dijangka pada pelayan TTS.';
      console.error('Gemini TTS error:', status, message);
      res.status(status).json({
        error:
          status === 403 || status === 400
            ? 'Sila semak atau pilih kunci API Gemini yang sah di panel Settings > Secrets.'
            : `Gagal menghubungi perkhidmatan suara AI (${status}). Sila cuba semula.`,
        details: message,
      });
    }
  });

  interface StoredResponse {
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

  const responsesStore: StoredResponse[] = [];

  app.get('/api/set-induksi/responses', (_req, res) => {
    res.json({ responses: responsesStore });
  });

  app.post('/api/set-induksi/responses', (req, res) => {
    const body = req.body as Partial<StoredResponse>;
    const answer = typeof body.answer === 'string' ? body.answer.trim() : '';
    const questionId = typeof body.questionId === 'string' ? body.questionId.trim() : '';
    const questionText = typeof body.questionText === 'string' ? body.questionText.trim() : '';
    const questionNumber = typeof body.questionNumber === 'number' ? body.questionNumber : 1;
    const studentName =
      typeof body.studentName === 'string' && body.studentName.trim().length > 0
        ? body.studentName.trim().slice(0, 60)
        : 'Murid Tahun 2';

    if (!answer || !questionId) {
      res.status(400).json({ error: 'Sila taip jawapan terlebih dahulu sebelum menghantar.' });
      return;
    }

    const record: StoredResponse = {
      id: `resp_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      studentName,
      questionId,
      questionNumber,
      questionText,
      answer: answer.slice(0, 500),
      submittedAt: new Date().toISOString(),
      reviewed: false,
    };

    responsesStore.unshift(record);
    res.status(201).json({ response: record });
  });

  app.patch('/api/set-induksi/responses/:id', (req, res) => {
    const { id } = req.params;
    const body = req.body as { reviewed?: boolean; teacherNote?: string };
    const found = responsesStore.find((item) => item.id === id);

    if (!found) {
      res.status(404).json({ error: 'Rekod jawapan tidak dijumpai.' });
      return;
    }

    if (typeof body.reviewed === 'boolean') {
      found.reviewed = body.reviewed;
    }
    if (typeof body.teacherNote === 'string') {
      found.teacherNote = body.teacherNote.trim().slice(0, 200);
    }

    res.json({ response: found });
  });

  app.delete('/api/set-induksi/responses', (_req, res) => {
    responsesStore.length = 0;
    res.json({ ok: true });
  });

  interface StoredWorksheet {
    id: string;
    studentName: string;
    studentClass: string;
    answers: {
      sifat: string;
      warna: string;
      ukuran: string;
      bentuk: string;
      waktu: string;
    };
    submittedAt: string;
    reviewed: boolean;
  }

  const worksheetStore: StoredWorksheet[] = [];

  app.get('/api/kenali-kata-adjektif/worksheets', (_req, res) => {
    res.json({ worksheets: worksheetStore });
  });

  app.post('/api/kenali-kata-adjektif/worksheets', (req, res) => {
    const body = req.body as Partial<StoredWorksheet>;
    const answers = body.answers;
    if (
      !answers ||
      !answers.sifat?.trim() ||
      !answers.warna?.trim() ||
      !answers.ukuran?.trim() ||
      !answers.bentuk?.trim() ||
      !answers.waktu?.trim()
    ) {
      res.status(400).json({ error: 'Sila lengkapkan kesemua lima jawapan lembaran kerja.' });
      return;
    }

    const record: StoredWorksheet = {
      id: `ws_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      studentName:
        typeof body.studentName === 'string' && body.studentName.trim().length > 0
          ? body.studentName.trim().slice(0, 60)
          : 'Murid Tahun 2',
      studentClass:
        typeof body.studentClass === 'string' && body.studentClass.trim().length > 0
          ? body.studentClass.trim().slice(0, 40)
          : 'Tahun 2',
      answers: {
        sifat: answers.sifat.trim().slice(0, 80),
        warna: answers.warna.trim().slice(0, 80),
        ukuran: answers.ukuran.trim().slice(0, 80),
        bentuk: answers.bentuk.trim().slice(0, 80),
        waktu: answers.waktu.trim().slice(0, 80),
      },
      submittedAt: new Date().toISOString(),
      reviewed: false,
    };

    worksheetStore.unshift(record);
    res.status(201).json({ worksheet: record });
  });

  app.patch('/api/kenali-kata-adjektif/worksheets/:id', (req, res) => {
    const { id } = req.params;
    const body = req.body as { reviewed?: boolean };
    const found = worksheetStore.find((item) => item.id === id);

    if (!found) {
      res.status(404).json({ error: 'Rekod lembaran kerja tidak dijumpai.' });
      return;
    }

    if (typeof body.reviewed === 'boolean') {
      found.reviewed = body.reviewed;
    }

    res.json({ worksheet: found });
  });

  app.delete('/api/kenali-kata-adjektif/worksheets', (_req, res) => {
    worksheetStore.length = 0;
    res.json({ ok: true });
  });

  const ruangGuruFilePath = path.resolve(__dirname, 'data', 'ruang-guru-state.json');

  interface RuangGuruStoredState {
    pdpReflection?: {
      masteryLevel: string;
      activityEffectiveness: string;
      challenges: string;
      improvements: string;
    };
    teacherReflection?: {
      strengths: string;
      challenges: string;
      objectiveAchievement: string;
      followUpActions: string;
      updatedAt: string | null;
    };
    assessmentRows?: Array<{
      id: string;
      pupilNumber: number;
      pupilName: string;
      identifyAdjectives: 'Belum' | 'Sedang' | 'Menguasai';
      classifyAdjectives: 'Belum' | 'Sedang' | 'Menguasai';
      buildSentences: 'Belum' | 'Sedang' | 'Menguasai';
      teacherRemark: string;
    }>;
  }

  let memoryRuangGuruState: RuangGuruStoredState = {};

  async function readRuangGuruState(): Promise<RuangGuruStoredState> {
    try {
      const raw = await fs.readFile(ruangGuruFilePath, 'utf-8');
      const parsed = JSON.parse(raw) as RuangGuruStoredState;
      memoryRuangGuruState = parsed;
      return parsed;
    } catch {
      return memoryRuangGuruState;
    }
  }

  async function writeRuangGuruState(nextState: RuangGuruStoredState): Promise<{ persistedToDisk: boolean }> {
    memoryRuangGuruState = nextState;
    try {
      await fs.mkdir(path.dirname(ruangGuruFilePath), { recursive: true });
      await fs.writeFile(ruangGuruFilePath, JSON.stringify(nextState, null, 2), 'utf-8');
      return { persistedToDisk: true };
    } catch {
      return { persistedToDisk: false };
    }
  }

  app.get('/api/ruang-guru/state', async (_req, res) => {
    const state = await readRuangGuruState();
    res.json({ state });
  });

  app.put('/api/ruang-guru/state', async (req, res) => {
    const incoming = req.body as RuangGuruStoredState;
    const current = await readRuangGuruState();
    const merged: RuangGuruStoredState = {
      ...current,
      ...(incoming.pdpReflection ? { pdpReflection: incoming.pdpReflection } : {}),
      ...(incoming.teacherReflection ? { teacherReflection: incoming.teacherReflection } : {}),
      ...(Array.isArray(incoming.assessmentRows) ? { assessmentRows: incoming.assessmentRows } : {}),
    };
    const { persistedToDisk } = await writeRuangGuruState(merged);
    res.json({ state: merged, persistedToDisk });
  });

  app.delete('/api/ruang-guru/state/reflection', async (_req, res) => {
    const current = await readRuangGuruState();
    const updated: RuangGuruStoredState = {
      ...current,
      teacherReflection: {
        strengths: '',
        challenges: '',
        objectiveAchievement: '',
        followUpActions: '',
        updatedAt: null,
      },
    };
    const { persistedToDisk } = await writeRuangGuruState(updated);
    res.json({ state: updated, persistedToDisk });
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
