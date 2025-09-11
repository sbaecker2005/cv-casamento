 // Carregamento resiliente de better-sqlite3 (Node 22 pode exigir build local)
import fs from 'fs';
import path from 'path';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - import dinâmico cjs
let Database: typeof import('better-sqlite3') | null = null;
let fallback = false;
let fallbackDataPath = '';
type FallbackRow = any;
let fallbackRows: FallbackRow[] = [];
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  Database = require('better-sqlite3');
} catch (err) {
  fallback = true;
  console.warn('[WARN] better-sqlite3 indisponível – usando fallback JSON. Motivo:', (err as Error).message);
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
fs.mkdirSync(DATA_DIR, { recursive: true });
export const DB_PATH = path.join(DATA_DIR, 'rsvp.sqlite');
export const db = (() => {
  if (!fallback && Database) {
    const instance = new (Database as any)(DB_PATH);
    instance.pragma('journal_mode = WAL');
    instance.exec(`
CREATE TABLE IF NOT EXISTS rsvp (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  attending INTEGER NOT NULL CHECK(attending IN (0,1)),
  companions INTEGER NOT NULL DEFAULT 0,
  restrictions TEXT,
  created_at DATETIME NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_rsvp_attending ON rsvp(attending);
`);
    process.on('SIGINT', () => { instance.close(); process.exit(0); });
    process.on('SIGTERM', () => { instance.close(); process.exit(0); });
    return instance;
  }
  // fallback JSON
  fallbackDataPath = path.join(DATA_DIR, 'rsvp-fallback.json');
  if (fs.existsSync(fallbackDataPath)) {
    try { fallbackRows = JSON.parse(fs.readFileSync(fallbackDataPath, 'utf-8')); } catch { fallbackRows = []; }
  }
  return {
    prepare(sql: string) {
      const isInsert = /INSERT INTO rsvp/i.test(sql);
      const isSelectAll = /SELECT id,name,email,phone,attending=1 as attending,companions,restrictions,created_at FROM rsvp ORDER BY created_at DESC/i.test(sql);
      const isSelectConfirmed = /WHERE attending=1/i.test(sql);
      const isStats = /SELECT\s+COUNT\(/i.test(sql);
      return {
        run(params: any) {
          if (!isInsert) return { lastInsertRowid: 0 };
            const nextId = (fallbackRows.reduce((m, r: any) => Math.max(m, r.id), 0) + 1) || 1;
            const row = {
              id: nextId,
              name: params.name,
              email: params.email,
              phone: params.phone ?? null,
              attending: params.attending ? 1 : 0,
              companions: params.companions ?? 0,
              restrictions: params.restrictions ?? null,
              created_at: new Date().toISOString().replace('T',' ').substring(0,19)
            };
            fallbackRows.unshift(row);
            try { fs.writeFileSync(fallbackDataPath, JSON.stringify(fallbackRows, null, 2)); } catch {}
            return { lastInsertRowid: nextId };
        },
        all() {
          if (isSelectAll) {
            return fallbackRows.map(r => ({ ...r, attending: r.attending === 1 }));
          }
          if (isSelectConfirmed) {
            return fallbackRows.filter(r => r.attending === 1).map(r => ({ ...r, attending: true }));
          }
          return [];
        },
        get() {
          if (isStats) {
            const total = fallbackRows.length;
            const confirmed = fallbackRows.filter(r => r.attending === 1).length;
            const not_confirmed = total - confirmed;
            const companions_confirmed = fallbackRows.filter(r => r.attending === 1).reduce((s, r) => s + (r.companions || 0), 0);
            return { total, confirmed, not_confirmed, companions_confirmed };
          }
          return null;
        }
      };
    },
    pragma() {},
    exec() {},
    close() {
      try { fs.writeFileSync(fallbackDataPath, JSON.stringify(fallbackRows, null, 2)); } catch {}
    }
  } as any;
})();

export const USING_FALLBACK = fallback;
