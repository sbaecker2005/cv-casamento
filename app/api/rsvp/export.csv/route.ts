export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
import { getDb } from '@/lib/mongodb';

function unauthorized() {
  return new Response(JSON.stringify({ success: false, message: 'Unauthorized' }), {
    status: 401,
    headers: { 'content-type': 'application/json' },
  });
}

export async function GET(req: Request) {
  try {
    const token = (req.headers.get('authorization') || '').replace(/^Bearer\s+/i, '');
    if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) return unauthorized();

    const db = await getDb();
    const items = await db
      .collection('rsvp')
      .find({ attending: true })
      .sort({ created_at: -1 })
      .toArray();

    const headers = ['name', 'email', 'phone', 'attending', 'companions', 'restrictions', 'created_at'];
    const rows = [headers.join(',')];

    for (const it of items as any[]) {
        const vals = headers.map((h) => {
          const value = (it as any)[h];
          if (value == null) return '';
          if (typeof value === 'string') {
            const needsQuote = value.includes(',') || value.includes('\n') || value.includes('"');
            const escaped = value.replace(/"/g, '""');
            return needsQuote ? `"${escaped}"` : escaped;
          }
          return String(value);
        });
      rows.push(vals.join(','));
    }

    const BOM = '\uFEFF';
    const csv = BOM + rows.join('\n');
    return new Response(csv, {
      headers: {
        'content-type': 'text/csv; charset=utf-8',
        'content-disposition': 'attachment; filename="rsvp-confirmados.csv"',
      },
    });
  } catch (err: any) {
    console.error('[API ERROR] rsvp/export.csv/GET:', err);
    return new Response(JSON.stringify({ success: false, message: err?.message || 'Internal error' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
}
