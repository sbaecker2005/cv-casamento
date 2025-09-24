import { getDb } from '../../lib/mongodb';
import { memFindConfirmed } from '../../lib/rsvpMemory';

export default async function handler(_req: any, res: any) {
  try {
    const items = !process.env.MONGODB_URI
      ? memFindConfirmed()
      : await (await getDb())
          .collection('rsvp')
          .find({ attending: true })
          .sort({ created_at: -1 })
          .toArray();
    return res.status(200).json({ success: true, count: items.length, data: items });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err?.message || 'Internal error' });
  }
}
