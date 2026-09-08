// USDC's ERC-20 interface uses 6 decimals; on-chain amounts arrive as base units (bigint).
export function baseUnitsToDecimalString(value: bigint, decimals = 6): string {
  const negative = value < 0n;
  const abs = negative ? -value : value;
  const divisor = 10n ** BigInt(decimals);
  const whole = abs / divisor;
  const fraction = (abs % divisor).toString().padStart(decimals, '0');
  return `${negative ? '-' : ''}${whole}.${fraction}`;
}

export function decimalToBaseUnits(value: string, decimals = 6): bigint {
  const [whole, fraction = ''] = value.split('.');
  const paddedFraction = (fraction + '0'.repeat(decimals)).slice(0, decimals);
  return BigInt(whole || '0') * 10n ** BigInt(decimals) + BigInt(paddedFraction || '0');
}
