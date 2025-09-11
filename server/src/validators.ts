import { z } from 'zod';

/**
 * Schema de validação para dados de RSVP
 */
export const RsvpSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres')
    .trim(),
  
  email: z
    .string()
    .email('Email deve ter um formato válido')
    .max(150, 'Email deve ter no máximo 150 caracteres')
    .toLowerCase()
    .trim(),
  
  phone: z
    .string()
    .max(20, 'Telefone deve ter no máximo 20 caracteres')
    .trim()
    .optional(),
  
  attending: z
    .boolean({
      required_error: 'Campo attending é obrigatório',
      invalid_type_error: 'Attending deve ser true ou false'
    }),
  
  companions: z
    .number()
    .int('Número de acompanhantes deve ser um número inteiro')
    .min(0, 'Número de acompanhantes não pode ser negativo')
    .max(4, 'Máximo de 4 acompanhantes permitidos')
    .default(0),
  
  restrictions: z
    .string()
    .max(500, 'Restrições devem ter no máximo 500 caracteres')
    .trim()
    .optional()
});

/**
 * Tipo TypeScript inferido do schema
 */
export type RsvpData = z.infer<typeof RsvpSchema>;

/**
 * Schema para validação de parâmetros de query
 */
export const QueryParamsSchema = z.object({
  page: z
    .string()
    .default('1')
    .transform(val => parseInt(val, 10))
    .pipe(z.number().int().min(1)),
  limit: z
    .string()
    .default('50')
    .transform(val => parseInt(val, 10))
    .pipe(z.number().int().min(1).max(100))
});

export type QueryParams = z.infer<typeof QueryParamsSchema>;
