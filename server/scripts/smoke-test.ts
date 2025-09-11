import { insertRsvp, listAll, listConfirmed, stats } from '../src/lib/rsvpRepo';
import { db, DB_PATH } from '../src/lib/db';

// Smoke test: insere RSVP fictício e verifica contagens.
const name = 'Smoke Test ' + Date.now();
const id = insertRsvp({ name, email: 'smoke@example.com', attending: true, companions: 2 }).id;
const all = listAll();
const confirmed = listConfirmed();
const stat = stats();

console.log(JSON.stringify({ ok: true, id, total: all.length, confirmed: confirmed.length, stats: stat, db: DB_PATH }));

db.close();
