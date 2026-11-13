/** App state and domain-focused actions.
 * State changes persist through the Repository port and retain ten undo snapshots.
 * UI components call actions but never edit nested state directly. */
import { create } from "zustand";
import { demoData, moveExamEarlier, rushNextExam, validateImport, type AppState, type Settings, type Subject } from "../core";
import { LocalStorageRepository, remoteState, type Repository } from "../data";

const repository: Repository = new LocalStorageRepository();
const copy = (state: AppState): AppState => JSON.parse(JSON.stringify(state)) as AppState;
type Store = AppState & { history: AppState[]; hydrateRemote(state: AppState): void; addSubject(subject: Subject): void; updateSubject(id: string, patch: Partial<Subject>): void; deleteSubject(id: string): void; addTopic(subjectId: string, title: string, id: string): void; renameTopic(subjectId: string, topicId: string, title: string): void; toggleTopic(subjectId: string, topicId: string, now: string): void; deleteTopic(subjectId: string, topicId: string): void; rushNextExam(today: string): void; restoreExam(id: string): void; loadDemo(): void; resetAll(): void; exportJson(): string; importJson(value: unknown): boolean; setSettings(settings: Partial<Settings>): void; undo(): void; };
const initial = repository.load() ?? copy(demoData);
export const useAppStore = create<Store>((set, get) => {
  const commit = (next: AppState) => set((state) => { repository.save(next); void remoteState.save(next); return { ...next, history: [...state.history, copy({ schemaVersion: state.schemaVersion, subjects: state.subjects, settings: state.settings })].slice(-10) }; });
  const mapSubjects = (fn: (subject: Subject) => Subject) => ({ ...get(), subjects: get().subjects.map(fn) });
  return { ...initial, history: [],
    hydrateRemote: (state) => set(() => { repository.save(state); return { ...state, history: [] }; }),
    addSubject: (subject) => commit({ ...get(), subjects: [...get().subjects, subject] }),
    updateSubject: (id, patch) => commit(mapSubjects((subject) => subject.id === id ? { ...subject, ...patch } : subject)),
    deleteSubject: (id) => commit({ ...get(), subjects: get().subjects.filter((subject) => subject.id !== id) }),
    addTopic: (subjectId, title, id) => commit(mapSubjects((subject) => subject.id === subjectId ? { ...subject, topics: [...subject.topics, { id, title, done: false, completedAt: null }] } : subject)),
    renameTopic: (subjectId, topicId, title) => commit(mapSubjects((subject) => subject.id === subjectId ? { ...subject, topics: subject.topics.map((topic) => topic.id === topicId ? { ...topic, title } : topic) } : subject)),
    toggleTopic: (subjectId, topicId, now) => commit(mapSubjects((subject) => subject.id === subjectId ? { ...subject, topics: subject.topics.map((topic) => topic.id === topicId ? { ...topic, done: !topic.done, completedAt: topic.done ? null : now } : topic) } : subject)),
    deleteTopic: (subjectId, topicId) => commit(mapSubjects((subject) => subject.id === subjectId ? { ...subject, topics: subject.topics.filter((topic) => topic.id !== topicId) } : subject)),
    rushNextExam: (today) => { const rush = rushNextExam(get().subjects, today); if (rush) commit(mapSubjects((subject) => subject.id === rush.subjectId ? moveExamEarlier(subject, 3, today) : subject)); },
    restoreExam: (id) => commit(mapSubjects((subject) => subject.id === id && subject.originalExamDate ? { ...subject, examDate: subject.originalExamDate, originalExamDate: null } : subject)),
    loadDemo: () => commit(copy(demoData)), resetAll: () => { repository.clear(); commit(copy(demoData)); }, exportJson: () => JSON.stringify({ schemaVersion: get().schemaVersion, subjects: get().subjects, settings: get().settings }, null, 2),
    importJson: (value) => { if (!validateImport(value)) return false; commit(copy(value)); return true; },
    setSettings: (settings) => commit({ ...get(), settings: { ...get().settings, ...settings } }),
    undo: () => set((state) => { const previous = state.history.at(-1); if (!previous) return state; repository.save(previous); return { ...previous, history: state.history.slice(0, -1) }; }),
  };
});
void remoteState.load().then((state) => { if (state) useAppStore.getState().hydrateRemote(state); });
