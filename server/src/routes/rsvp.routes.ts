import { Router, Request, Response, NextFunction } from 'express';
import { RsvpSchema } from '../lib/validators';
import { insertRsvp, listAll, listConfirmed, stats } from '../lib/rsvpRepo';
import { authToken } from '../middlewares/authToken';
import { toCSV, toXLSX, snapshotToDisk, writeConfirmedJson } from '../services/exporters';

export const rsvpRouter = Router();

// POST /api/rsvp
rsvpRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = RsvpSchema.parse(req.body);
    const result = insertRsvp(data);
    const message = data.attending
      ? `Obrigado ${data.name}! Sua presença foi confirmada. 💒`
      : `Obrigado ${data.name} por nos informar. Sentiremos sua falta! 💔`;
    // Snapshot async (não bloqueia resposta)
    try {
      const confirmed = listConfirmed();
      const csv = toCSV(confirmed);
      snapshotToDisk('csv', csv);
      writeConfirmedJson(confirmed as any);
    } catch {}
    res.status(201).json({
      success: true,
      id: result.id,
      message,
      attending: data.attending
    });
  } catch (e) {
    next(e);
  }
});

// GET /api/rsvp
rsvpRouter.get('/', (_req: Request, res: Response, next: NextFunction) => {
  try {
    const all = listAll();
    res.json({ success: true, count: all.length, data: all });
  } catch (e) { next(e); }
});

// GET /api/rsvp/confirmed
rsvpRouter.get('/confirmed', (_req: Request, res: Response, next: NextFunction) => {
  try {
    const confirmed = listConfirmed();
    res.json({ success: true, count: confirmed.length, data: confirmed });
  } catch (e) { next(e); }
});

// GET /api/rsvp/stats
rsvpRouter.get('/stats', (_req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({ success: true, data: stats() });
  } catch (e) { next(e); }
});

// GET /api/rsvp/export.csv (confirmados) protegido
rsvpRouter.get('/export.csv', authToken, (_req: Request, res: Response, next: NextFunction) => {
  try {
    const rows = listConfirmed();
    const csv = toCSV(rows as any);
    snapshotToDisk('csv', csv);
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.attachment('rsvp-confirmados.csv');
    res.send(csv);
  } catch (e) { next(e); }
});

// GET /api/rsvp/export.xlsx (confirmados) protegido
rsvpRouter.get('/export.xlsx', authToken, async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const rows = listConfirmed();
    const buf = await toXLSX(rows as any);
    snapshotToDisk('xlsx', buf);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.attachment('rsvp-confirmados.xlsx');
    res.send(buf);
  } catch (e) { next(e); }
});
