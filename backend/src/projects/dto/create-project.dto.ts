import { z } from 'zod';
import { isAddress } from 'viem';

export const createProjectSchema = z.object({
  clientWallet: z.string().refine((v) => isAddress(v), 'Invalid client wallet address'),
  developerWallet: z.string().refine((v) => isAddress(v), 'Invalid developer wallet address'),
  title: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  milestones: z
    .array(
      z.object({
        description: z.string().max(1000).optional(),
        amount: z
          .string()
          .regex(/^\d+(\.\d{1,6})?$/, 'Amount must be a decimal USDC string with up to 6 decimal places'),
      }),
    )
    .min(1, 'At least one milestone is required'),
});

export type CreateProjectDto = z.infer<typeof createProjectSchema>;
