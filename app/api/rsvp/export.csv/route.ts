import { getDb } from 'lib/mongodb';

function unauthorized() {
  return new Response(JSON.stringify({ success: false, message: 'Unauthorized' }), {
    status: 401,
    headers: { 'content-type': 'application/json' },
  });
}

export async function GET(req: Request) {
  try {
    const auth = req.headers.get('authorization') || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
    if (!token || token !== process.env.ADMIN_TOKEN) return unauthorized();

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
    return new Response(JSON.stringify({ success: false, message: 'Internal error' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
}
