'use client';

import { useConnection, useSwitchChain } from 'wagmi';
import { arcTestnet } from '@/lib/chain';

export function NetworkBanner() {
  const { isConnected, chainId } = useConnection();
  const { mutate: switchChain, isPending, error } = useSwitchChain();

  if (!isConnected || chainId === arcTestnet.id) return null;

  return (
    <div className="glass-strong mx-auto mt-3 flex max-w-4xl items-center justify-between rounded-xl border-amber-400/30 px-4 py-2 text-sm">
      <span className="text-amber-300">
        Wrong network — your wallet is connected to a different chain, but FreelanceTrail
        runs on {arcTestnet.name}. Signing a transaction now will do nothing useful.
      </span>
      <button
        onClick={() => switchChain({ chainId: arcTestnet.id })}
        disabled={isPending}
        className="ml-3 shrink-0 rounded-full bg-linear-to-r from-accent to-accent-2 px-3 py-1.5 text-xs font-medium text-black transition hover:opacity-90 disabled:opacity-50"
      >
        {isPending ? 'Switching…' : `Switch to ${arcTestnet.name}`}
      </button>
      {error && <p className="ml-3 text-xs text-red-400">{error.message}</p>}
    </div>
  );
}
