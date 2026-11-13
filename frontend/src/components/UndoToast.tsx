/** Non-blocking confirmation surface for undo.
 * Its message belongs in a polite live region.
 * It leaves focus with the completed action. */
export function UndoToast({ visible, onUndo, message = "Change saved." }: { visible: boolean; onUndo(): void; message?: string }) {
  return visible ? <div className="fixed bottom-6 right-6 z-50 flex items-center justify-between gap-4 rounded-2xl border border-[#b8dfc4] bg-white px-5 py-3.5 text-sm text-[#173c2c] shadow-xl" role="status" aria-live="polite">
    <div className="flex items-center gap-2">
      <span className="font-bold text-[#176543]">✓</span>
      <span>{message}</span>
    </div>
    <button className="min-h-9 rounded-lg bg-[#e5f0e7] px-3 font-semibold text-[#176543] hover:bg-[#d5e7d8]" onClick={onUndo}>Undo</button>
  </div> : null;
}
