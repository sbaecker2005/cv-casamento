import Database from 'better-sqlite3';
import { existsSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';

// Caminho para o arquivo do banco de dados
const DB_PATH = join(process.cwd(), '..', 'data', 'rsvp.sqlite');

/**
 * Inicializa a conexão com o banco de dados SQLite
 * Cria o diretório /data se não existir
 */
function initializeDatabase(): Database.Database {
  // Criar diretório se não existir
  const dbDir = dirname(DB_PATH);
  if (!existsSync(dbDir)) {
    mkdirSync(dbDir, { recursive: true });
    console.log(`📁 Diretório criado: ${dbDir}`);
  }

  // Conectar ao banco
  const db = new Database(DB_PATH);
  console.log(`🗄️  Conectado ao banco: ${DB_PATH}`);

  // Configurações do SQLite para melhor performance
  db.pragma('journal_mode = WAL');
  db.pragma('synchronous = NORMAL');
  db.pragma('cache_size = 1000');
  db.pragma('temp_store = MEMORY');

  return db;
}

/**
 * Cria as tabelas necessárias no banco de dados
 */
function createTables(db: Database.Database): void {
  try {
    // Criar tabela primeiro antes de preparar índice (evita erro "no such table")
    db.prepare(`
      CREATE TABLE IF NOT EXISTS rsvp (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        attending INTEGER NOT NULL CHECK(attending IN (0,1)),
        companions INTEGER NOT NULL DEFAULT 0,
        restrictions TEXT,
        created_at DATETIME NOT NULL DEFAULT (datetime('now'))
      )
    `).run();

    // Só depois preparar/criar índice
    db.prepare(`
      CREATE INDEX IF NOT EXISTS idx_rsvp_attending ON rsvp(attending)
    `).run();

    console.log('✅ Tabelas criadas/verificadas com sucesso');
  } catch (err) {
    console.error('❌ Falha ao criar tabelas:', err);
    throw err;
  }
}

// Inicializar banco e exportar conexão
// Export explicitamente tipado para evitar erro TS4023 de tipo anônimo
const db: Database.Database = initializeDatabase();
createTables(db);

// Fechar conexão gracefully no encerramento do processo
process.on('SIGINT', () => {
  console.log('\n🔄 Fechando conexão com o banco...');
  db.close();
  console.log('✅ Banco fechado com segurança');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🔄 Fechando conexão com o banco...');
  db.close();
  console.log('✅ Banco fechado com segurança');
  process.exit(0);
});

export default db;
