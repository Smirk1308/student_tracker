/** Non-blocking confirmation surface for undo.
 * Its message belongs in a polite live region.
 * It leaves focus with the completed action. */
export function UndoToast({ visible, onUndo, message = "Change saved." }: { visible: boolean; onUndo(): void; message?: string }) { return visible ? <div className="flex items-center justify-between gap-3 rounded-xl border border-emerald-400/40 bg-emerald-950 p-3" role="status" aria-live="polite"><span>{message}</span><button className="min-h-11 underline" onClick={onUndo}>Undo</button></div> : null; }
