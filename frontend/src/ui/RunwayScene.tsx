/** Original CSS/SVG flight-path visual for the study metaphor.
 * The visual is decorative, so copy carries the essential meaning.
 * It stays lightweight and has no external assets. */
import { Parallax } from "./Parallax";
export function RunwayScene() { return <Parallax><svg viewBox="0 0 560 220" className="w-full" aria-hidden="true"><defs><linearGradient id="trail" x1="0" x2="1"><stop stopColor="#d946ef" /><stop offset="1" stopColor="#fbbf24" /></linearGradient></defs><path d="M32 180 C150 20 350 210 520 34" fill="none" stroke="url(#trail)" strokeWidth="5" strokeDasharray="10 12" /><circle cx="32" cy="180" r="12" fill="#d946ef" /><circle cx="520" cy="34" r="16" fill="#fbbf24" /><path d="m520 5 7 20-7-4-7 4z" fill="#fff" /></svg></Parallax>; }
