import { createHash } from "crypto";
import fs from "fs";
import path from "path";

const roots = [
  "public/gallery",
  "src/assets/gallery",
  "public/prints",
  "src/assets/prints",
].map(p => path.resolve(process.cwd(), p));

const TRASH = path.resolve(process.cwd(), ".trash/duplicates");
const DRY = process.argv.includes("--dry");

type Entry = { full: string; rel: string; size: number; mtime: number };
const support = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif"]);

function listFiles(dir: string, acc: string[] = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) listFiles(full, acc);
    else if (support.has(path.extname(name).toLowerCase())) acc.push(full);
  }
  return acc;
}

function hashFile(full: string) {
  const h = createHash("sha256");
  h.update(fs.readFileSync(full));
  return h.digest("hex");
}

function ensureDir(p: string) { fs.mkdirSync(p, { recursive: true }); }
function relToRoot(full: string) { return path.relative(process.cwd(), full).replaceAll("\\", "/"); }

(async function run() {
  const files = roots.flatMap(r => listFiles(r));
  const byHash = new Map<string, Entry[]>();

  for (const full of files) {
    const stat = fs.statSync(full);
    const entry: Entry = { full, rel: relToRoot(full), size: stat.size, mtime: stat.mtimeMs };
    const key = hashFile(full);
    const arr = byHash.get(key) ?? [];
    arr.push(entry);
    byHash.set(key, arr);
  }

  const manifest: { kept: string; removed: string[] }[] = [];
  let removedCount = 0;

  for (const group of byHash.values()) {
    if (group.length <= 1) continue;
    // Mantém o mais novo como heurística (poderia estender para checar resolução)
    group.sort((a, b) => b.mtime - a.mtime);
    const keep = group[0];
    const remove = group.slice(1);

    if (!DRY) ensureDir(TRASH);

    for (const r of remove) {
      const dest = path.join(TRASH, r.rel);
      if (!DRY) {
        ensureDir(path.dirname(dest));
        fs.renameSync(r.full, dest);
      }
      removedCount++;
    }
    manifest.push({ kept: keep.rel, removed: remove.map(r => r.rel) });
  }

  if (!DRY) {
    ensureDir(TRASH);
    fs.writeFileSync(path.join(TRASH, "duplicates-manifest.json"), JSON.stringify(manifest, null, 2));
  }

  console.log(`Analisados ${files.length} arquivos; duplicados movidos: ${removedCount}${DRY ? " (dry-run)" : ""}.`);
})();
