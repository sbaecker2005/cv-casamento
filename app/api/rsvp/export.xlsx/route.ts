import { getDb } from 'lib/mongodb';
import ExcelJS from 'exceljs';

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

  const wb = new ExcelJS();
    const ws = wb.addWorksheet('Confirmados');
    ws.columns = [
      { header: 'Nome', key: 'name', width: 30 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Telefone', key: 'phone', width: 20 },
      { header: 'Vai Comparecer', key: 'attending', width: 16 },
      { header: 'Acompanhantes', key: 'companions', width: 16 },
      { header: 'Restrições', key: 'restrictions', width: 30 },
      { header: 'Criado em', key: 'created_at', width: 25 },
    ];

    for (const it of items as any[]) {
      ws.addRow({
        name: it.name,
        email: it.email,
        phone: it.phone ?? '',
        attending: it.attending ? 'Sim' : 'Não',
        companions: it.companions ?? 0,
        restrictions: it.restrictions ?? '',
        created_at: it.created_at,
      });
    }

    const buf = await wb.xlsx.writeBuffer();
    return new Response(buf as any, {
      headers: {
        'content-type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'content-disposition': 'attachment; filename="rsvp-confirmados.xlsx"',
      },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, message: 'Internal error' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
}
