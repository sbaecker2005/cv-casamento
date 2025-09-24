export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
import { getDb } from 'lib/mongodb';

export async function GET() {
  try {
    const db = await getDb();
    const items = await db
      .collection('rsvp')
      .find({ attending: true })
      .sort({ created_at: -1 })
      .toArray();
    return new Response(JSON.stringify({ success: true, count: items.length, data: items }), {
      headers: { 'content-type': 'application/json' },
    });
  } catch (err: any) {
    console.error('[API ERROR] rsvp/confirmed/GET:', err);
    return new Response(JSON.stringify({ success: false, message: err?.message || 'Internal error' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
}
