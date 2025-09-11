#!/usr/bin/env ts-node
import fs from 'fs';
import path from 'path';
import ExcelJS from 'exceljs';
import { listAll, listConfirmed } from '../src/lib/rsvpRepo';
import { USING_FALLBACK } from '../src/lib/db';

type Row = ReturnType<typeof listAll>[number];

function fetchAll(confirmedOnly=false): Row[] {
  return confirmedOnly ? listConfirmed() : listAll();
}

function toCSV(rows: Row[]): string {
  const header = ['ID','Nome','Email','Telefone','Presença','Acompanhantes','Restrições','Criado em'];
  const body = rows.map(r => [
    r.id,
    r.name,
    r.email,
    r.phone || '',
    r.attending ? 'Sim' : 'Não',
    r.companions,
    (r.restrictions||'').replace(/\n/g,' '),
    r.created_at
  ]);
  const csv = [header, ...body]
    .map(cols => cols.map(v => '"'+String(v).replace(/"/g,'""')+'"').join(','))
    .join('\n');
  return '\uFEFF'+csv;
}

async function toXLSX(rows: Row[]): Promise<Buffer> {
  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet('RSVP');
  ws.columns = [
    { header:'ID', key:'id', width:8 },
    { header:'Nome', key:'name', width:30 },
    { header:'Email', key:'email', width:30 },
    { header:'Telefone', key:'phone', width:18 },
    { header:'Presença', key:'attending', width:12 },
    { header:'Acompanhantes', key:'companions', width:16 },
    { header:'Restrições', key:'restrictions', width:40 },
    { header:'Criado em', key:'created_at', width:22 }
  ];
  rows.forEach(r => ws.addRow({ ...r, attending: r.attending ? 'Sim' : 'Não', phone: r.phone||'', restrictions: r.restrictions||'' }));
  ws.getRow(1).font = { bold: true };
  const buf = await wb.xlsx.writeBuffer();
  return Buffer.from(buf);
}

async function main() {
  const cmd = process.argv[2];
  if (!cmd) {
    console.log('Uso: rsvp-cli <list|confirmed|export:csv|export:xlsx>');
    process.exit(1);
  }
  if (cmd === 'list' || cmd === 'confirmed') {
    const rows = fetchAll(cmd === 'confirmed');
    if (!rows.length) {
      console.log('Nenhum registro.');
      process.exit(0);
    }
    console.table(rows.map(r => ({
      id:r.id, nome:r.name, email:r.email, tel:r.phone||'', presenca:r.attending? 'Sim':'Não', acomp:r.companions, restr:r.restrictions||'', criado:r.created_at
    })));
    if (USING_FALLBACK) console.log('(modo fallback JSON)');
    process.exit(0);
  }
  if (cmd === 'export:csv') {
    const rows = fetchAll(true);
    const csv = toCSV(rows);
    const outDir = path.resolve(process.cwd(),'data/exports');
    fs.mkdirSync(outDir,{recursive:true});
    const file = path.join(outDir,'rsvp-confirmados.csv');
    fs.writeFileSync(file,csv);
    console.log('Gerado:', file);
    process.exit(0);
  }
  if (cmd === 'export:xlsx') {
    const rows = fetchAll(true);
    const buf = await toXLSX(rows);
    const outDir = path.resolve(process.cwd(),'data/exports');
    fs.mkdirSync(outDir,{recursive:true});
    const file = path.join(outDir,'rsvp-confirmados.xlsx');
    fs.writeFileSync(file,buf);
    console.log('Gerado:', file);
    process.exit(0);
  }
  console.log('Comando desconhecido.');
  process.exit(1);
}

main().catch(e => { console.error('Falha:', e); process.exit(1); });
