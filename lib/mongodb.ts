import { MongoClient } from 'mongodb';
import * as vercelFns from '@vercel/functions';

const uri = process.env.MONGODB_URI!;
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
  // In Vercel Functions, attach pool for connection reuse if available
  (vercelFns as any)?.attachDatabasePool?.(client);
}

export async function getDb() {
  // The driver v5 exposes topology in internals; use ping guard instead if missing
  // but per spec, check connectivity and connect when needed
  // @ts-ignore
  if (!(client as any).topology?.isConnected?.()) {
    await client.connect();
  }
  return client.db(dbName);
}

export type DbClient = MongoClient;
