import { z } from 'zod';

export const matchRequestSchema = z.object({
  requirement: z.string().min(10).max(2000),
});

export type MatchRequestDto = z.infer<typeof matchRequestSchema>;
