/** Exam-rush feature manifest for the surprise-event layer.
 * It exposes route-independent commands and widgets only.
 * No other feature internals are imported here. */
import { ExamRushButton } from "../../components/ExamRushButton";
export const examRushFeature = { routes: [], navItem: null, commands: [{ id: "rush", label: "Move next exam earlier" }], widgets: [ExamRushButton] };
