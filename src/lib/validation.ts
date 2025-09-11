import { z } from "zod";

export const rsvpSchema = z.object({
  name: z.string().min(3, "Informe seu nome completo"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(14, "Telefone inválido"),
  attending: z.enum(["Sim", "Não"]),
  guests: z.number().min(0).max(4).optional(),
  food: z.string().optional()
});

export type RsvpForm = z.infer<typeof rsvpSchema>;
