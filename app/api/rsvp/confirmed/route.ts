import { getDb } from 'lib/mongodb';

export async function GET() {
  try {
    const db = await getDb();
    const items = await db
      .collection('rsvp')
      .find({ attending: true })
      .sort({ created_at: -1 })
      .toArray();
    return new Response(JSON.stringify({ success: true, data: items }), {
      headers: { 'content-type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, message: 'Internal error' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
}
