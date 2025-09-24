import { MongoClient } from 'mongodb';
import * as vercelFns from '@vercel/functions';

const dbName = process.env.MONGODB_DB || 'wedding';

declare global {
  // eslint-disable-next-line no-var
  var _mongoClient: MongoClient | undefined;
}

let client: MongoClient | undefined;

function ensureClient(): MongoClient {
  if (client) return client;
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI não configurada no ambiente');
  }
  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClient) global._mongoClient = new MongoClient(uri);
    client = global._mongoClient;
  } else {
    client = new MongoClient(uri);
    try {
      (vercelFns as any)?.attachDatabasePool?.(client);
    } catch {
      // ignore if not available
    }
  }
  return client;
}

export async function getDb() {
  const c = ensureClient();
  // @ts-ignore – guard connect when needed
  if (!(c as any).topology?.isConnected?.()) {
    await c.connect();
  }
  return c.db(dbName);
}

export type DbClient = MongoClient;
