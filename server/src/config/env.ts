import 'dotenv/config';

export const env = {
  PORT: Number(process.env.PORT ?? 3001),
  CORS_ORIGIN: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  ADMIN_TOKEN: process.env.ADMIN_TOKEN ?? '',
  EXPORT_TO_DISK: process.env.EXPORT_TO_DISK === 'true',
  EXPORT_DIR: process.env.EXPORT_DIR ?? 'data/exports'
} as const;
