/**
 * Central Zustand Application Store.
 * 
 * Architectural Guarantees:
 * 1. Single Source of Truth: Holds active subjects, topics, and settings.
 * 2. Automatic Persistence: Commits sync to LocalStorage and (if available) the remote API.
 * 3. 10-Step Undo History: Every state mutation pushes an immutable snapshot into `history`.
 * 4. Immutability: Deep clones prevent accidental state mutation leaks.
 */
import { create } from "zustand";
import {
  demoData,
  moveExamEarlier,
  rushNextExam,
  validateImport,
  type AppState,
  type Settings,
  type Subject,
} from "../core";
import { LocalStorageRepository, remoteState, type Repository } from "../data";

const repository: Repository = new LocalStorageRepository();

/** Deep clone helper to prevent direct reference mutations */
const copy = (state: AppState): AppState => JSON.parse(JSON.stringify(state)) as AppState;

export interface AppStore extends AppState {
  history: AppState[];
  hydrateRemote(state: AppState): void;
  // Subject Actions
  addSubject(subject: Subject): void;
  updateSubject(id: string, patch: Partial<Subject>): void;
  deleteSubject(id: string): void;
  // Topic Actions
  addTopic(subjectId: string, title: string, id: string): void;
  renameTopic(subjectId: string, topicId: string, title: string): void;
  toggleTopic(subjectId: string, topicId: string, now: string): void;
  deleteTopic(subjectId: string, topicId: string): void;
  // Exam Rush Simulation
  rushNextExam(today: string): void;
  restoreExam(id: string): void;
  // Data Portability & Settings
  loadDemo(): void;
  resetAll(): void;
  exportJson(): string;
  importJson(value: unknown): boolean;
  setSettings(settings: Partial<Settings>): void;
  undo(): void;
}

const initial = repository.load() ?? copy(demoData);

export const useAppStore = create<AppStore>((set, get) => {
  /** Commit helper: saves to disk, triggers async cloud sync, and stores undo snapshot */
  const commit = (next: AppState) =>
    set((state) => {
      repository.save(next);
      void remoteState.save(next);
      const snapshot = copy({
        schemaVersion: state.schemaVersion,
        subjects: state.subjects,
        settings: state.settings,
      });
      return {
        ...next,
        history: [...state.history, snapshot].slice(-10),
      };
    });

  const mapSubjects = (fn: (subject: Subject) => Subject) => ({
    ...get(),
    subjects: get().subjects.map(fn),
  });

  return {
    ...initial,
    history: [],

    hydrateRemote: (state) =>
      set(() => {
        repository.save(state);
        return { ...state, history: [] };
      }),

    // --- Subject CRUD ---
    addSubject: (subject) =>
      commit({ ...get(), subjects: [...get().subjects, subject] }),

    updateSubject: (id, patch) =>
      commit(mapSubjects((s) => (s.id === id ? { ...s, ...patch } : s))),

    deleteSubject: (id) =>
      commit({ ...get(), subjects: get().subjects.filter((s) => s.id !== id) }),

    // --- Topic Management ---
    addTopic: (subjectId, title, id) =>
      commit(
        mapSubjects((s) =>
          s.id === subjectId
            ? {
                ...s,
                topics: [...s.topics, { id, title, done: false, completedAt: null }],
              }
            : s
        )
      ),

    renameTopic: (subjectId, topicId, title) =>
      commit(
        mapSubjects((s) =>
          s.id === subjectId
            ? {
                ...s,
                topics: s.topics.map((t) => (t.id === topicId ? { ...t, title } : t)),
              }
            : s
        )
      ),

    toggleTopic: (subjectId, topicId, now) =>
      commit(
        mapSubjects((s) =>
          s.id === subjectId
            ? {
                ...s,
                topics: s.topics.map((t) =>
                  t.id === topicId
                    ? { ...t, done: !t.done, completedAt: t.done ? null : now }
                    : t
                ),
              }
            : s
        )
      ),

    deleteTopic: (subjectId, topicId) =>
      commit(
        mapSubjects((s) =>
          s.id === subjectId
            ? { ...s, topics: s.topics.filter((t) => t.id !== topicId) }
            : s
        )
      ),

    // --- Exam Rush Simulation ---
    rushNextExam: (today) => {
      const rush = rushNextExam(get().subjects, today);
      if (rush) {
        commit(
          mapSubjects((s) =>
            s.id === rush.subjectId ? moveExamEarlier(s, 3, today) : s
          )
        );
      }
    },

    restoreExam: (id) =>
      commit(
        mapSubjects((s) =>
          s.id === id && s.originalExamDate
            ? { ...s, examDate: s.originalExamDate, originalExamDate: null }
            : s
        )
      ),

    // --- Settings & Portability ---
    loadDemo: () => commit(copy(demoData)),

    resetAll: () => {
      repository.clear();
      commit(copy(demoData));
    },

    exportJson: () =>
      JSON.stringify(
        {
          schemaVersion: get().schemaVersion,
          subjects: get().subjects,
          settings: get().settings,
        },
        null,
        2
      ),

    importJson: (value) => {
      if (!validateImport(value)) return false;
      commit(copy(value));
      return true;
    },

    setSettings: (settings) =>
      commit({ ...get(), settings: { ...get().settings, ...settings } }),

    // --- Undo ---
    undo: () =>
      set((state) => {
        const previous = state.history.at(-1);
        if (!previous) return state;
        repository.save(previous);
        return {
          ...previous,
          history: state.history.slice(0, -1),
        };
      }),
  };
});

// Non-blocking initialization: sync from cloud if configured
void remoteState.load().then((state) => {
  if (state) useAppStore.getState().hydrateRemote(state);
});

