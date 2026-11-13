import { readFileSync } from "node:fs";
import { globSync } from "node:fs";

const files = globSync("frontend/src/**/*.ts{,x}");
const forbidden = [
  [/\/ui\//, /\/(store|features|pages)\//, "ui cannot import store, features, or pages"],
  [/\/core\//, /from ['\"](?:react|react-dom)|\bdocument\b|\bwindow\b/, "core must stay framework-free"],
];
const errors = [];
for (const file of files) {
  const source = readFileSync(file, "utf8");
  for (const [path, pattern, message] of forbidden) {
    if (path.test(file) && pattern.test(source)) errors.push(`${file}: ${message}`);
  }
  if (file.includes("/features/")) {
    const owner = file.split("/features/")[1].split("/")[0];
    const imports = [...source.matchAll(/from ['\"]([^'\"]+)/g)].map((m) => m[1]);
    if (imports.some((entry) => entry.includes("/features/") && !entry.includes(`/features/${owner}/`))) {
      errors.push(`${file}: features cannot import another feature internals`);
    }
  }
}
if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
console.log("Layer check passed.");
