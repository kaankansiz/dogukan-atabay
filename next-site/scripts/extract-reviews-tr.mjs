import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = fs.readFileSync(path.join(__dirname, "../components/ReviewSlider.tsx"), "utf8");
const marker = "const REVIEWS = ";
const start = src.indexOf(marker);
if (start === -1) throw new Error("REVIEWS not found");
const bracket = src.indexOf("[", start);
const close = src.indexOf("\n];", bracket);
if (close === -1) throw new Error("closing ]; not found");
const arrStr = src.slice(bracket, close + 1);
// eslint-disable-next-line no-eval
const REVIEWS = eval(`(${arrStr})`);
fs.writeFileSync(
  path.join(__dirname, "../lib/i18n/patient-reviews-tr.json"),
  `${JSON.stringify(REVIEWS, null, 2)}\n`,
  "utf8",
);
console.error("Wrote patient-reviews-tr.json", REVIEWS.length);
