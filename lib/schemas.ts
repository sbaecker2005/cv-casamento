import { z } from 'zod';

export const RsvpSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional().nullable(),
  attending: z.boolean(),
  companions: z.number().int().min(0).max(10).default(0),
  restrictions: z.string().optional().nullable(),
});

export type RsvpInput = z.infer<typeof RsvpSchema>;
