'use client';

import Link from 'next/link';
import { useConnection, useConnect, useConnectors, useDisconnect } from 'wagmi';

function short(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function Nav() {
  const { address, isConnected } = useConnection();
  const connectors = useConnectors();
  const { mutate: connect, isPending } = useConnect();
  const { mutate: disconnect } = useDisconnect();

  return (
    <header className="glass sticky top-0 z-20 border-x-0 border-t-0">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
        <Link href="/" className="glow-text text-lg font-semibold tracking-tight">
          FreelanceTrail
        </Link>
        <nav className="flex items-center gap-5 text-sm">
          <Link href="/passport" className="text-white/60 transition-colors hover:text-white">
            Passport
          </Link>
          <Link href="/projects" className="text-white/60 transition-colors hover:text-white">
            Projects
          </Link>
          <Link href="/find-developers" className="text-white/60 transition-colors hover:text-white">
            Find Developers
          </Link>
          {isConnected && address ? (
            <button
              onClick={() => disconnect()}
              className="glass-strong rounded-full px-4 py-1.5 font-mono text-xs text-white transition hover:bg-white/15"
            >
              {short(address)}
            </button>
          ) : (
            <button
              onClick={() => connect({ connector: connectors[0] })}
              disabled={isPending}
              className="rounded-full bg-linear-to-r from-accent to-accent-2 px-4 py-1.5 text-xs font-medium text-black shadow-[0_0_20px_-4px_var(--accent)] transition hover:opacity-90 disabled:opacity-50"
            >
              {isPending ? 'Connecting…' : 'Connect Wallet'}
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
