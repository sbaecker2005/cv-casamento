import { MongoClient } from 'mongodb';
import { attachDatabasePool } from '@vercel/functions';

const dbName = process.env.MONGODB_DB || 'wedding';

declare global {
  // eslint-disable-next-line no-var
  var _mongoClient: MongoClient | undefined;
}

let client: MongoClient | undefined;

function getClient(): MongoClient {
  if (client) return client;
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is not set');
  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClient) global._mongoClient = new MongoClient(uri);
    client = global._mongoClient;
  } else {
    client = new MongoClient(uri);
    try {
      attachDatabasePool(client);
    } catch {
      // ignore if not available
    }
  }
  return client;
}

export async function getDb() {
  const c = getClient();
  // @ts-ignore - topology is not part of public types in v5
  if (!c.topology?.isConnected?.()) await c.connect();
  return c.db(dbName);
}

export type DbClient = MongoClient;
