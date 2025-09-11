import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (res.headersSent) return;
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: 'Dados inválidos',
      errors: err.errors.map(e => ({
        field: e.path.join('.'),
        message: e.message
      }))
    });
  }
  console.error('Erro interno:', err);
  res.status(500).json({
    success: false,
    message: typeof err === 'object' && err && 'message' in err ? (err as { message?: string }).message || 'Erro interno do servidor' : 'Erro interno do servidor'
  });
}
