'use client';

import Link from 'next/link';
import { useConnection, useConnect, useConnectors } from 'wagmi';

export default function Home() {
  const { isConnected } = useConnection();
  const connectors = useConnectors();
  const { mutate: connect, isPending } = useConnect();

  return (
    <div className="flex flex-col items-center gap-8 py-20 text-center">
      <h1 className="glow-text text-5xl font-semibold tracking-tight">FreelanceTrail</h1>
      <p className="max-w-md text-white/60">
        Verifiable freelance work, open-source contributions, and payments — turned into a
        portable Developer Payment Passport.
      </p>

      {!isConnected ? (
        <button
          onClick={() => connect({ connector: connectors[0] })}
          disabled={isPending}
          className="rounded-full bg-linear-to-r from-accent to-accent-2 px-6 py-3 font-medium text-black shadow-[0_0_30px_-6px_var(--accent)] transition hover:opacity-90 disabled:opacity-50"
        >
          {isPending ? 'Connecting…' : 'Connect Wallet to Start'}
        </button>
      ) : (
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/passport" className="glass rounded-xl px-5 py-3 text-sm transition hover:bg-white/10">
            My Passport
          </Link>
          <Link href="/projects" className="glass rounded-xl px-5 py-3 text-sm transition hover:bg-white/10">
            Projects
          </Link>
          <Link
            href="/find-developers"
            className="glass rounded-xl px-5 py-3 text-sm transition hover:bg-white/10"
          >
            Find Developers
          </Link>
        </div>
      )}
    </div>
  );
}
