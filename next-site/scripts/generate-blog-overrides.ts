/**
 * Generates lib/i18n/blog-overrides/{en,ar,ka}.json from Turkish BLOG_POSTS.
 * Uses Google Translate via the `translate` package (network required).
 *
 *   npx tsx scripts/generate-blog-overrides.ts
 *   START_LOCALE=ar npx tsx scripts/generate-blog-overrides.ts   # only ar, ka
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import translate from "translate";
import type { BlogPost } from "../lib/content";
import { BLOG_POSTS } from "../lib/content";

translate.engine = "google";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "../lib/i18n/blog-overrides");

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

type Loc = "en" | "ar" | "ka";

async function trText(text: string, to: Loc): Promise<string> {
  const trimmed = text.trim();
  if (!trimmed) return text;
  let lastError: unknown;
  for (let attempt = 0; attempt < 6; attempt++) {
    try {
      const out = await translate(trimmed, { from: "tr", to });
      await sleep(55);
      return out;
    } catch (e) {
      lastError = e;
      await sleep(900 * (attempt + 1));
    }
  }
  throw lastError;
}

type BlogOverride = Partial<
  Pick<BlogPost, "title" | "category" | "date" | "readingTime" | "excerpt" | "body" | "imageAlt">
>;

const categoryMemo = new Map<string, string>();

async function translateCategory(cat: string, loc: Loc): Promise<string> {
  const key = `${loc}:${cat}`;
  if (categoryMemo.has(key)) return categoryMemo.get(key)!;
  const v = await trText(cat, loc);
  categoryMemo.set(key, v);
  return v;
}

async function translatePost(post: BlogPost, loc: Loc): Promise<BlogOverride> {
  const body: string[] = [];
  for (const p of post.body) {
    body.push(await trText(p, loc));
  }
  return {
    title: await trText(post.title, loc),
    excerpt: await trText(post.excerpt, loc),
    category: await translateCategory(post.category, loc),
    date: await trText(post.date, loc),
    readingTime: await trText(post.readingTime, loc),
    imageAlt: post.imageAlt ? await trText(post.imageAlt, loc) : undefined,
    body,
  };
}

async function runLocale(loc: Loc) {
  const out: Record<string, BlogOverride> = {};
  let i = 0;
  for (const post of BLOG_POSTS) {
    i += 1;
    console.error(`[${loc}] ${i}/${BLOG_POSTS.length} ${post.slug}`);
    out[post.slug] = await translatePost(post, loc);
  }
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(join(OUT_DIR, `${loc}.json`), `${JSON.stringify(out, null, 2)}\n`, "utf8");
  console.error(`Written ${loc}.json`);
}

async function main() {
  const start = process.env.START_LOCALE as Loc | undefined;
  const all: Loc[] = ["en", "ar", "ka"];
  const idx = start ? all.indexOf(start) : 0;
  const locales = idx >= 0 ? all.slice(idx) : all;
  for (const loc of locales) {
    await runLocale(loc);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
