import { getDb } from '@/lib/mongodb';
import { memStats } from '../../lib/rsvpMemory';

export default async function handler(_req: any, res: any) {
  try {
    if (!process.env.MONGODB_URI) {
      const s = memStats();
      return res.status(200).json(s);
    }
    const db = await getDb();
    const total = await db.collection('rsvp').countDocuments();
    const confirmed = await db.collection('rsvp').countDocuments({ attending: true });
    const agg = await db
      .collection('rsvp')
      .aggregate([
        { $match: { attending: true } },
        { $group: { _id: null, sum: { $sum: { $ifNull: ['$companions', 0] } } } },
      ])
      .toArray();
    const companions = agg[0]?.sum ?? 0;
    return res.status(200).json({ total, confirmed, companions });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err?.message || 'Internal error' });
  }
}
