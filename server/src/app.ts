import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env';
import { rsvpRouter } from './routes/rsvp.routes';
import { healthRouter } from './routes/health.routes';
import { notFound } from './middlewares/notFound';
import { errorHandler } from './middlewares/errorHandler';
import { USING_FALLBACK } from './lib/db';
import path from 'path';
import fs from 'fs';

const app = express();

app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: '10mb' }));

if (env.NODE_ENV === 'production') {
  app.use(helmet());
  app.use(compression());
} else {
  app.use(morgan('tiny'));
}

app.use('/api/health', healthRouter);
app.use('/api/rsvp', rsvpRouter);

// Static exports (confirmados.json, snapshots)
const exportsDir = path.resolve(process.cwd(), env.EXPORT_DIR);
if (!fs.existsSync(exportsDir)) fs.mkdirSync(exportsDir, { recursive: true });
app.use('/exports', express.static(exportsDir));

// Rota raiz informativa
app.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'API RSVP ativa',
    fallback_storage: USING_FALLBACK,
    endpoints: {
      health: '/api/health',
      rsvp: '/api/rsvp',
      confirmed: '/api/rsvp/confirmed',
      stats: '/api/rsvp/stats',
      export_csv: '/api/rsvp/export.csv',
      export_xlsx: '/api/rsvp/export.xlsx'
    }
  });
});

app.use(notFound);
app.use(errorHandler);

export default app;
