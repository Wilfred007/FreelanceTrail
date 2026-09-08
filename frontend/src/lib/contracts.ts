import type { Address } from 'viem';

// Public on-chain addresses — safe to expose client-side.
export const ESCROW_ADDRESS = (process.env.NEXT_PUBLIC_ESCROW_ADDRESS ??
  '0x26C85d7290A61CD92064168f8Fc1E09EC8f2BcaD') as Address;

export const USDC_ADDRESS = (process.env.NEXT_PUBLIC_USDC_ADDRESS ??
  '0x3600000000000000000000000000000000000000') as Address;
