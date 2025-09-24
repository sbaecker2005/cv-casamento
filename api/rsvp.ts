// Vercel Serverless Function for /api/rsvp with current Vite deployment
// Mirrors the Next.js Route Handler behavior
import { getDb } from '@/lib/mongodb';
import { RsvpSchema } from '@/lib/schemas';
import { memInsert, memFindAll } from '../lib/rsvpMemory';

export default async function handler(req: any, res: any) {
  try {
    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const parsed = RsvpSchema.safeParse(body);
      if (!parsed.success) {
        return res.status(400).json({ success: false, message: 'Invalid payload', issues: parsed.error.issues });
      }
      const input = parsed.data;
      const now = new Date().toISOString();
      const doc = { ...input, created_at: now };
      let insertedId: string;
      if (!process.env.MONGODB_URI) {
        const r = memInsert(doc as any);
        insertedId = r.insertedId;
      } else {
        const db = await getDb();
        const result = await db.collection('rsvp').insertOne(doc);
        insertedId = String(result.insertedId);
      }

      const message = input.attending
        ? `Obrigado ${input.name}! Sua presença foi confirmada. 💒`
        : `Obrigado ${input.name} por nos informar. Sentiremos sua falta! 💔`;

      return res.status(201).json({ id: insertedId, message, attending: input.attending });
    }

    if (req.method === 'GET') {
      let items: any[];
      if (!process.env.MONGODB_URI) {
        items = memFindAll();
      } else {
        const db = await getDb();
        items = await db
          .collection('rsvp')
          .find()
          .sort({ created_at: -1 })
          .toArray();
      }
      return res.status(200).json({ success: true, count: items.length, data: items });
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  } catch (err: any) {
    const message = err?.message || 'Falha ao salvar RSVP';
    return res.status(/Invalid payload/.test(message) ? 400 : 500).json({ success: false, message });
  }
}
