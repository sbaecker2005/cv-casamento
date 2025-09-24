import { getDb } from 'lib/mongodb';

export async function GET() {
  try {
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

    return new Response(JSON.stringify({ total, confirmed, companions }), {
      headers: { 'content-type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, message: 'Internal error' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
}
