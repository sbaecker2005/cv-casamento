import { z } from 'zod';

export const RsvpSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  attending: z.boolean(),
  companions: z.number().int().min(0).max(4),
  restrictions: z.string().max(500).optional()
});

export type RsvpInput = z.infer<typeof RsvpSchema>;
