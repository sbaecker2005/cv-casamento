import fs from 'fs';
import path from 'path';
import ExcelJS from 'exceljs';
import { env } from '../config/env';

export type RsvpRow = {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  attending: boolean | 0 | 1;
  companions: number;
  restrictions?: string | null;
  created_at: string;
};

export function toCSV(rows: RsvpRow[]): string {
  const header = [
    'ID','Nome','Email','Telefone','Presença','Acompanhantes','Restrições','Criado em'
  ];
  const body = rows.map(r => [
    r.id,
    r.name,
    r.email,
    r.phone ?? '',
    r.attending ? 'Sim' : 'Não',
    r.companions,
    (r.restrictions ?? '').replace(/\n/g,' '),
    r.created_at
  ]);
  const csv = [header, ...body]
    .map(cols => cols.map(v => `"${String(v).replace(/"/g,'""')}"`).join(','))
    .join('\n');
  return '\uFEFF' + csv;
}

export async function toXLSX(rows: RsvpRow[]): Promise<Buffer> {
  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet('Confirmados');
  ws.columns = [
    { header: 'ID', key: 'id', width: 8 },
    { header: 'Nome', key: 'name', width: 30 },
    { header: 'Email', key: 'email', width: 30 },
    { header: 'Telefone', key: 'phone', width: 18 },
    { header: 'Presença', key: 'attending', width: 12 },
    { header: 'Acompanhantes', key: 'companions', width: 16 },
    { header: 'Restrições', key: 'restrictions', width: 40 },
    { header: 'Criado em', key: 'created_at', width: 22 }
  ];
  rows.forEach(r => ws.addRow({
    ...r,
    attending: r.attending ? 'Sim' : 'Não',
    phone: r.phone ?? '',
    restrictions: r.restrictions ?? ''
  }));
  ws.getRow(1).font = { bold: true };
  const buf = await wb.xlsx.writeBuffer();
  return Buffer.from(buf);
}

export function snapshotToDisk(kind: 'csv' | 'xlsx', data: string | Buffer) {
  if (!env.EXPORT_TO_DISK) return;
  const dir = path.resolve(process.cwd(), env.EXPORT_DIR);
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `rsvp-${new Date().toISOString().slice(0,10)}.${kind}`);
  fs.writeFileSync(file, data);
  return file;
}

export function writeConfirmedJson(rows: RsvpRow[]) {
  const dir = path.resolve(process.cwd(), env.EXPORT_DIR);
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, 'confirmados.json');
  const payload = {
    generated_at: new Date().toISOString(),
    total: rows.length,
    total_people: rows.reduce((s,r)=> s + 1 + (r.companions||0), 0),
    data: rows
  };
  fs.writeFileSync(file, JSON.stringify(payload, null, 2), 'utf-8');
  return file;
}