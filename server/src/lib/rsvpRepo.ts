import { db } from './db';

export interface Rsvp {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  attending: boolean;
  companions: number;
  restrictions?: string | null;
  created_at: string;
}

interface InsertData {
  name: string;
  email: string;
  phone?: string;
  attending: boolean;
  companions: number;
  restrictions?: string;
}

const insertStmt = db.prepare(`
INSERT INTO rsvp (name,email,phone,attending,companions,restrictions)
VALUES (@name,@email,@phone,@attending,@companions,@restrictions)
`);

export function insertRsvp(data: InsertData): { id: number } {
  const info = insertStmt.run({
    ...data,
    attending: data.attending ? 1 : 0
  });
  return { id: Number(info.lastInsertRowid) };
}

export function listAll(): Rsvp[] {
  return db.prepare(`SELECT id,name,email,phone,attending=1 as attending,companions,restrictions,created_at FROM rsvp ORDER BY created_at DESC`).all() as Rsvp[];
}

export function listConfirmed(): Rsvp[] {
  return db.prepare(`SELECT id,name,email,phone,attending=1 as attending,companions,restrictions,created_at FROM rsvp WHERE attending=1 ORDER BY created_at DESC`).all() as Rsvp[];
}

interface StatsRow {
  total: number | null;
  confirmed: number | null;
  not_confirmed: number | null;
  companions_confirmed: number | null;
}

export function stats() {
  const row = db.prepare(`
    SELECT
      COUNT(*) as total,
      SUM(CASE WHEN attending=1 THEN 1 ELSE 0 END) as confirmed,
      SUM(CASE WHEN attending=0 THEN 1 ELSE 0 END) as not_confirmed,
      COALESCE(SUM(CASE WHEN attending=1 THEN companions ELSE 0 END),0) as companions_confirmed
    FROM rsvp;
  `).get() as StatsRow;
  return {
    total: row.total ?? 0,
    confirmed: row.confirmed ?? 0,
    not_confirmed: row.not_confirmed ?? 0,
    companions_confirmed: row.companions_confirmed ?? 0
  };
}
