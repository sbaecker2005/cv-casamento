import { Request, Response, NextFunction } from 'express';
import { env } from '../config/env';

export function authToken(req: Request, res: Response, next: NextFunction) {
  if (!env.ADMIN_TOKEN) {
  return res.status(500).json({ success: false, message: 'ADMIN_TOKEN não configurado' });
  }
  const header = req.headers.authorization || '';
  const token = header.replace(/^Bearer\s+/i, '');
  if (token !== env.ADMIN_TOKEN) {
  return res.status(401).json({ success: false, message: 'Não autorizado' });
  }
  next();
}