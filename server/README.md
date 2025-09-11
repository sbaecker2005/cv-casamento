# API RSVP

Instalação (Node 22 LTS):
1. npm install
2. npm run dev

Se der erro ao instalar better-sqlite3 no Windows (node-gyp / build tools):
	a) Instale Visual Studio Build Tools 2022 (Componentes C++ Desktop)
	b) Abra um terminal novo (PowerShell) como Admin
	c) npm config set msvs_version 2022
	d) npm rebuild better-sqlite3 --build-from-source

Alternativa simples: usar Docker (já compila no container Debian):
	docker build -t rsvp-api .
	docker run --rm -p 3001:3001 -v %cd%/data:/app/data --env-file .env rsvp-api

Estrutura:
- app.ts (middlewares + rotas)
- server.ts (bootstrap)
- routes/ (rsvp, health)
- middlewares/ (error, 404)
- lib/ (db, repo, validators)
- config/env.ts

Banco: ./data/rsvp.sqlite (auto-criado)
Fallback: se `better-sqlite3` não compilar em Node 22 no Windows, o sistema usa `data/rsvp-fallback.json` automaticamente (modo degradado). Exportações continuam funcionando.
`better-sqlite3` agora está em optionalDependencies. Se a instalação falhar, a aplicação ainda sobe (modo fallback) usando `npm run dev` com ts-node.

Rotas principais:
POST /api/rsvp
GET  /api/rsvp
GET  /api/rsvp/confirmed
GET  /api/rsvp/stats
GET  /api/rsvp/export.csv
GET  /api/rsvp/export.xlsx
GET  /api/health

Produção sem Docker:
	npm run build
	npm start

Produção com Docker:
	docker build -t rsvp-api .
	docker run -d --name rsvp-api -p 3001:3001 --env-file .env -v %cd%/data:/app/data rsvp-api

Exportações protegidas (usar ADMIN_TOKEN no .env):
	curl -H "Authorization: Bearer SEU_TOKEN" http://localhost:3001/api/rsvp/export.csv -o rsvp.csv
	curl -H "Authorization: Bearer SEU_TOKEN" http://localhost:3001/api/rsvp/export.xlsx -o rsvp.xlsx

## Troubleshooting (Windows Node 22)

Erros node-gyp / Visual Studio:
1. Instale https://visualstudio.microsoft.com/visual-cpp-build-tools/ (Desktop development with C++)
2. Reinicie o terminal.
3. Verifique: `where cl` (se não achar, abra o "x64 Native Tools Command Prompt" e rode `npm install`).

Erro `msvs_version is not a valid npm option` ao usar `npm config set msvs_version 2022`:
- Use `.npmrc` criado já contendo `msvs_version=2022`.

Diretório em OneDrive causando EPERM em remoções:
1. Feche VS Code
2. `taskkill /IM node.exe /F` (se necessário)
3. Apague manualmente `server\node_modules`
4. Rode novamente `npm install`

Forçar rebuild específico:
```
npm rebuild better-sqlite3 --build-from-source
```

Variáveis para silenciar prebuild-install e forçar compilação:
```
setx npm_config_build_from_source true
setx npm_config_better_sqlite3_binary_host_mirror ""
```

Se continuar falhando, usar Docker é o caminho mais rápido.
