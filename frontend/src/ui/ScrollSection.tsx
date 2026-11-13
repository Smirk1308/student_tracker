/** Semantic section with an optional viewport reveal.
 * Layout is stable regardless of animation preference.
 * Use to group one meaningful landing-page region. */
import type { PropsWithChildren } from "react";
import { Reveal } from "./Reveal";
export function ScrollSection({ children, label }: PropsWithChildren<{ label: string }>) { return <section aria-label={label} className="py-10"><Reveal>{children}</Reveal></section>; }
