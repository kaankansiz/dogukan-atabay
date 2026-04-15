/**
 * Reads lib/i18n/patient-reviews-tr.json and writes lib/i18n/patient-reviews.json
 * with tr + machine-translated en, ar, ka (network + Google via translate package).
 *
 *   node scripts/generate-patient-reviews.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import translate from "translate";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const trPath = path.join(root, "lib/i18n/patient-reviews-tr.json");
const outPath = path.join(root, "lib/i18n/patient-reviews.json");

translate.engine = "google";

const sleep = (ms) => new Promise((r) => setTimeout(r, 50));

/** @param {{ author: string; sub: string; text: string }} item @param {string} to */
async function conv(item, to) {
  return {
    author: await translate(item.author, { from: "tr", to }),
    sub: await translate(item.sub, { from: "tr", to }),
    text: await translate(item.text, { from: "tr", to }),
  };
}

async function main() {
  const tr = JSON.parse(fs.readFileSync(trPath, "utf8"));
  if (!Array.isArray(tr) || tr.length === 0) throw new Error("Invalid TR reviews");

  const out = { tr };
  for (const loc of ["en", "ar", "ka"]) {
    const arr = [];
    for (let i = 0; i < tr.length; i++) {
      console.error(`[${loc}] ${i + 1}/${tr.length}`);
      arr.push(await conv(tr[i], loc));
      await sleep(50);
    }
    out[loc] = arr;
  }

  fs.writeFileSync(outPath, JSON.stringify(out) + "\n", "utf8");
  console.error("Written", outPath);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
