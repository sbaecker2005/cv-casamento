declare module '@vercel/functions' {
  import type { MongoClient } from 'mongodb';
  export function attachDatabasePool(client: MongoClient): void;
  const _default: unknown;
}
