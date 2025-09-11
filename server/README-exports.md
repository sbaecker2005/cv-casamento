# Exportação de RSVPs

Este documento explica como usar a API e a CLI para listar e exportar confirmações.

## Variáveis de Ambiente (.env.example)
```
PORT=3001
CORS_ORIGIN=http://localhost:5173
ADMIN_TOKEN=troque-este-token
EXPORT_TO_DISK=false
EXPORT_DIR=data/exports
```

## Estrutura Geral
- Banco: `data/rsvp.sqlite` (criado automaticamente). 
- API base: `http://localhost:PORT/api`.
- Rotas principais:
  - `GET /api/rsvp` (todos)
  - `GET /api/rsvp/confirmed` (confirmados)
  - `GET /api/rsvp/stats` (estatísticas)
  - `POST /api/rsvp` (criar)
  - `GET /api/rsvp/export.csv` (confirmados CSV, token)
  - `GET /api/rsvp/export.xlsx` (confirmados XLSX, token)

Formato JSON padrão: `{ success: boolean, data?: any, message?: string }`.

## CORS
Configurado com origem: `CORS_ORIGIN` (default `http://localhost:5173`).

## Token de Admin
Defina `ADMIN_TOKEN`. Exemplo:
```
ADMIN_TOKEN=meu-token-seguro-123
```
Envie header: `Authorization: Bearer <token>`.

## Exportações
CSV inclui BOM UTF-8. XLSX via ExcelJS.
Se `EXPORT_TO_DISK=true`, snapshots salvos em `EXPORT_DIR` com padrão `rsvp-YYYY-MM-DD.csv|xlsx`.

### Exemplos cURL
```bash
curl http://localhost:3001/api/rsvp/confirmed
curl -H "Authorization: Bearer $ADMIN_TOKEN" http://localhost:3001/api/rsvp/export.csv -o rsvp.csv
curl -H "Authorization: Bearer $ADMIN_TOKEN" http://localhost:3001/api/rsvp/export.xlsx -o rsvp.xlsx
```

## CLI Offline
Scripts (adicionar no package.json):
```
"rsvp:list": "ts-node scripts/rsvp-cli.ts list",
"rsvp:confirmed": "ts-node scripts/rsvp-cli.ts confirmed",
"rsvp:export:csv": "ts-node scripts/rsvp-cli.ts export:csv",
"rsvp:export:xlsx": "ts-node scripts/rsvp-cli.ts export:xlsx"
```

Uso:
```bash
npm run rsvp:list
npm run rsvp:confirmed
npm run rsvp:export:csv
npm run rsvp:export:xlsx
```

## Painel Admin Frontend (opcional)
Habilite com `VITE_ENABLE_ADMIN=true` em `.env` do frontend. Rota `/admin` exibirá botões para baixar CSV e XLSX (solicita token e salva em `sessionStorage`).

## Produção
- Ambiente com disco: usar `EXPORT_TO_DISK=true` e coletar arquivos em `data/exports/`.
- Serverless: usar `EXPORT_TO_DISK=false` e consumir endpoints.
- Futuro: enviar export automático para S3/Drive (TODO placeholder).

## Erros Amigáveis
- Porta ocupada: sugerir uso da próxima (ex: 3002) e ajustar proxy do Vite.
- ADMIN_TOKEN ausente: 500 com mensagem clara.
- Sem registros confirmados em export: retorna arquivo com somente cabeçalho.
- Banco ausente: recria automaticamente; se falha, loga erro.

## Proxy Vite
`vite.config.ts` já aponta `/api` para `http://localhost:3001`. Ajuste se a porta mudar.

## Segurança
- Não expor `ADMIN_TOKEN` no bundle front (usuário digita manualmente no painel).
- CSV sanitiza aspas e quebra de linha.

---
Checklist futuro:
- Persistir export remoto (S3/Drive)
- Paginação para listagens grandes
- Rate limiting em POST /api/rsvp
