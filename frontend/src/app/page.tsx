'use client';

import Link from 'next/link';
import { useConnection, useConnect, useConnectors } from 'wagmi';
import { arcTestnet } from '@/lib/chain';

const FEATURES = [
  {
    icon: '🔒',
    title: 'Smart Escrow',
    description: 'Payments are locked in a USDC escrow contract on Arc Testnet and released milestone by milestone.',
  },
  {
    icon: '✅',
    title: 'Verified Proof-of-Work',
    description: 'Milestone submissions are matched against real merged GitHub pull requests — not just a text claim.',
  },
  {
    icon: '🧠',
    title: 'AI Reputation Analyst',
    description: 'Merged contributions are analyzed and summarized into a portable, verifiable Developer Passport.',
  },
  {
    icon: '🔍',
    title: 'AI Freelancer Matching',
    description: 'Describe what you need in plain language and get ranked developer matches backed by real contribution history.',
  },
];

const STEPS = [
  { step: '01', title: 'Connect your wallet', description: 'Sign in with a wallet on Arc Testnet — no account or password needed.' },
  { step: '02', title: 'Create and fund milestones', description: 'Clients scope a project into milestones and fund each one in USDC as work is agreed.' },
  { step: '03', title: 'Submit, verify, get paid', description: 'Developers submit proof tied to a merged PR; once approved, payment releases automatically.' },
];

// Mocked VS Code "FreelanceTrail Copilot" panel — window chrome + chat header + a
// conversation about the actual verification/escrow flow, built with static markup
// since this is a fixed decorative screenshot, not a live chat.
const CHAT_MESSAGES = [
  {
    from: 'user' as const,
    text: 'How does the client know this milestone was actually done?',
  },
  {
    from: 'copilot' as const,
    text: 'The submitted proof is checked against your merged GitHub pull requests. When it matches, ChainListenerService links the milestone to that verified contribution before the client can approve payment — so it isn’t just a text claim.',
  },
  {
    from: 'user' as const,
    text: 'What if the developer disappears mid-project?',
  },
  {
    from: 'copilot' as const,
    text: 'Funds stay locked in the USDC escrow contract until you approve a milestone — nothing releases without your sign-off, so there’s no risk of paying for work that never lands.',
  },
  {
    from: 'user' as const,
    text: 'Can I trust their skills before I even hire them?',
  },
  {
    from: 'copilot' as const,
    text: 'Check their Developer Passport — verified earnings, merged contributions, and an AI-generated reputation summary built from their real GitHub history, not a self-written bio.',
  },
];

function CopilotChat() {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#1e1e1e] shadow-2xl">
      <div className="flex items-center gap-1.5 bg-[#323233] px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
        <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
        <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
      </div>
      <div className="flex items-center gap-2 border-b border-black/30 bg-[#252526] px-4 py-2 text-xs text-white/70">
        <span aria-hidden>✨</span>
        FreelanceTrail Copilot
      </div>
      <div className="flex flex-col gap-4 px-4 py-4">
        {CHAT_MESSAGES.map((m, i) =>
          m.from === 'user' ? (
            <div key={i} className="flex justify-end">
              <p className="max-w-[85%] rounded-lg bg-white/10 px-3 py-2 text-[13px] text-white/90">{m.text}</p>
            </div>
          ) : (
            <div key={i} className="flex gap-2">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#8957e5] text-[11px]">
                ✨
              </span>
              <p className="text-[13px] leading-5 text-white/80">{m.text}</p>
            </div>
          ),
        )}
      </div>
      <div className="border-t border-black/30 px-4 py-3">
        <div className="rounded-md border border-white/10 bg-[#2a2a2b] px-3 py-2 text-[13px] text-white/30">
          Ask Copilot a question…
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { isConnected } = useConnection();
  const connectors = useConnectors();
  const { mutate: connect, isPending } = useConnect();

  return (
    <div className="flex flex-col gap-24 py-12">
      <section className="flex flex-col items-center gap-6 py-16 text-center">
        <h1 className="max-w-3xl text-5xl font-semibold tracking-tight sm:text-6xl">
          Freelance work,
          <br />
          <span className="text-white">verified on-chain.</span>
        </h1>
        <p className="max-w-lg text-lg text-white/60">
          Verifiable freelance work, open-source contributions, and payments — turned into a
          portable Developer Payment Passport.
        </p>

        {!isConnected ? (
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => connect({ connector: connectors[0], chainId: arcTestnet.id })}
              disabled={isPending}
              className="rounded-full bg-linear-to-r from-accent to-accent-2 px-6 py-3 font-medium text-black shadow-[0_0_30px_-6px_var(--accent)] transition hover:opacity-90 disabled:opacity-50"
            >
              {isPending ? 'Connecting…' : 'Connect Wallet to Start'}
            </button>
            <Link
              href="/find-developers"
              className="glass rounded-full px-6 py-3 text-sm font-medium transition hover:bg-white/10"
            >
              See how it works
            </Link>
          </div>
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

        {/* Radiant spotlight behind the code snapshot, GitHub-homepage style — large,
            bright blurred accent-colored blobs sitting behind a VS Code-style card. */}
        <div className="relative mt-6 w-full max-w-3xl">
          <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
            {/* GitHub's Copilot-hero glow palette: blue, purple, and pink. */}
            <div className="h-96 w-96 rounded-full opacity-95 blur-[90px]" style={{ backgroundColor: '#2f81f7' }} />
            <div
              className="absolute h-96 w-96 translate-x-36 rounded-full opacity-85 blur-[90px]"
              style={{ backgroundColor: '#a371f7' }}
            />
            <div
              className="absolute h-72 w-72 -translate-x-32 translate-y-12 rounded-full opacity-70 blur-[90px]"
              style={{ backgroundColor: '#f778ba' }}
            />
            <div className="absolute h-52 w-52 rounded-full bg-white opacity-40 blur-[70px]" />
          </div>

          {/* Glassy frame around the screenshot with a light sweep on hover, like a
              reflection catching the light off glass. */}
          <div className="group relative overflow-hidden rounded-2xl p-3 transition-transform duration-300 hover:scale-[1.01] glass">
            <CopilotChat />
            <div className="pointer-events-none absolute inset-0 translate-x-[-120%] skew-x-[-20deg] bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[120%]" />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-10">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight">Every claim, verified. Nothing taken on trust.</h2>
          <p className="mx-auto mt-2 max-w-xl text-white/50">
            Every claim on FreelanceTrail — the work, the payment, the reputation — is backed by
            something checkable on-chain or on GitHub.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group relative overflow-hidden rounded-2xl p-3 transition-transform duration-300 hover:scale-[1.01] glass"
            >
              <div className="rounded-xl bg-white/5 p-6">
                <span className="text-2xl">{f.icon}</span>
                <h3 className="mt-3 font-medium">{f.title}</h3>
                <p className="mt-1.5 text-sm text-white/50">{f.description}</p>
              </div>
              <div className="pointer-events-none absolute inset-0 translate-x-[-120%] skew-x-[-20deg] bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[120%]" />
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-10">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight">How it works</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.step} className="glass rounded-xl p-6">
              <span className="glow-text text-sm font-semibold">{s.step}</span>
              <h3 className="mt-2 font-medium">{s.title}</h3>
              <p className="mt-1.5 text-sm text-white/50">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-strong flex flex-col items-center gap-5 rounded-2xl p-12 text-center">
        <h2 className="text-3xl font-semibold tracking-tight">Ready to get started?</h2>
        <p className="max-w-md text-white/60">
          Connect your wallet and create your first escrow-backed project in minutes.
        </p>
        {!isConnected && (
          <button
            onClick={() => connect({ connector: connectors[0], chainId: arcTestnet.id })}
            disabled={isPending}
            className="rounded-full bg-linear-to-r from-accent to-accent-2 px-6 py-3 font-medium text-black shadow-[0_0_30px_-6px_var(--accent)] transition hover:opacity-90 disabled:opacity-50"
          >
            {isPending ? 'Connecting…' : 'Connect Wallet to Start'}
          </button>
        )}
      </section>
    </div>
  );
}
