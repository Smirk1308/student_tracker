/** Keyboard command surface contract.
 * It exposes registered commands with ordinary buttons.
 * Escape handling belongs to the composed feature. */
export interface Command { id: string; label: string; run(): void; }
export function CommandPalette({ open, commands }: { open: boolean; commands: Command[] }) { return open ? <dialog open aria-label="Commands">{commands.map((command) => <button key={command.id} onClick={command.run}>{command.label}</button>)}</dialog> : null; }
