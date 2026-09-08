import { z } from 'zod';
import { isAddress } from 'viem';

export const connectSchema = z.object({
  walletAddress: z.string().refine((v) => isAddress(v), 'Invalid wallet address'),
});

export type ConnectDto = z.infer<typeof connectSchema>;
