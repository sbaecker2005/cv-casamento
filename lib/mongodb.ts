import { MongoClient } from 'mongodb';
import { attachDatabasePool } from '@vercel/functions';

if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is not set');
const uri = process.env.MONGODB_URI as string;
const dbName = process.env.MONGODB_DB || 'wedding';

declare global {
  // eslint-disable-next-line no-var
  var _mongoClient: MongoClient | undefined;
}

let client: MongoClient;

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

export async function getDb() {
  // @ts-ignore - topology is not part of public types in v5
  if (!client.topology?.isConnected?.()) await client.connect();
  return client.db(dbName);
}

export type DbClient = MongoClient;
