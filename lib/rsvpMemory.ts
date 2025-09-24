// Simple in-memory store as a fallback when MongoDB is not configured.
// Note: This is ephemeral and only persists while the serverless instance stays warm.

export type RsvpDoc = {
  _id: string;
  name: string;
  email: string;
  phone?: string | null;
  attending: boolean;
  companions: number;
  restrictions?: string | null;
  created_at: string; // ISO string
};

const store: RsvpDoc[] = [];

function genId() {
  // Lightweight unique id generator
  return 'mem_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function memInsert(doc: Omit<RsvpDoc, '_id'>): { insertedId: string } {
  const withId: RsvpDoc = { _id: genId(), ...doc };
  store.push(withId);
  return { insertedId: withId._id };
}

export function memFindAll(): RsvpDoc[] {
  return [...store].sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
}

export function memFindConfirmed(): RsvpDoc[] {
  return memFindAll().filter((d) => d.attending === true);
}

export function memStats(): { total: number; confirmed: number; companions: number } {
  const all = store;
  const total = all.length;
  const confirmedList = all.filter((d) => d.attending);
  const confirmed = confirmedList.length;
  const companions = confirmedList.reduce((sum, d) => sum + (d.companions || 0), 0);
  return { total, confirmed, companions };
}
