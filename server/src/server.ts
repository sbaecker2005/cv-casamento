import 'dotenv/config';
import app from './app';
import { env } from './config/env';

const start = (port: number, attempt = 0) => {
  const server = app.listen(port, () => {
    console.log(`API em http://localhost:${port}` + (attempt ? ' (porta alternativa)' : ''));
  });
  server.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE' && attempt < 5) {
      console.warn(`Porta ${port} ocupada. Tentando ${port+1}...`);
      setTimeout(() => start(port + 1, attempt + 1), 300);
    } else {
      console.error('Falha ao iniciar servidor:', err.message);
      process.exit(1);
    }
  });
};

start(Number(env.PORT));
