'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useConnection } from 'wagmi';
import { useUser } from '@/lib/user-context';
import { api } from '@/lib/api';

export default function PassportPage() {
  const { isConnected } = useConnection();
  const { user, loading: userLoading, error: userError } = useUser();
  const queryClient = useQueryClient();

  const passportQuery = useQuery({
    queryKey: ['passport', user?.id],
    queryFn: () => api.getPassport(user!.id),
    enabled: !!user,
  });

  const reputationMutation = useMutation({
    mutationFn: () => api.generateReputation(user!.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['passport', user?.id] }),
  });

  const syncMutation = useMutation({
    mutationFn: () => api.syncGithubContributions(user!.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['passport', user?.id] }),
  });

  if (!isConnected) {
    return <p className="text-white/50">Connect your wallet to view your passport.</p>;
  }
  if (userLoading || !user) {
    return <p className="text-white/50">Loading…</p>;
  }
  if (userError) {
    return <p className="text-red-400">{userError}</p>;
  }

  const passport = passportQuery.data;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold">Developer Payment Passport</h1>
        <p className="font-mono text-sm text-white/40">{user.walletAddress}</p>
      </div>

      {!user.githubUsername ? (
        <div className="glass rounded-xl p-4">
          <p className="mb-3 text-sm text-white/60">
            Connect your GitHub account to verify open-source contributions.
          </p>
          <a
            href={api.githubConnectUrl(user.id)}
            className="inline-block rounded-full bg-linear-to-r from-accent to-accent-2 px-4 py-2 text-sm font-medium text-black transition hover:opacity-90"
          >
            Connect GitHub
          </a>
        </div>
      ) : (
        <div className="glass flex items-center justify-between rounded-xl p-4">
          <p className="text-sm text-white/60">
            GitHub connected as <span className="font-medium text-white">@{user.githubUsername}</span>
          </p>
          <button
            onClick={() => syncMutation.mutate()}
            disabled={syncMutation.isPending}
            className="glass-strong rounded-full px-3 py-1.5 text-sm transition hover:bg-white/15 disabled:opacity-50"
          >
            {syncMutation.isPending ? 'Syncing…' : 'Sync Contributions'}
          </button>
        </div>
      )}

      {passportQuery.isLoading && <p className="text-white/50">Loading passport…</p>}

      {passport && (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Stat label="Verified Earnings" value={`$${passport.verifiedEarnings}`} />
            <Stat label="On-chain Projects" value={passport.projects} />
            <Stat label="Contributions" value={passport.contributions} />
            <Stat label="Verified Payments" value={passport.verifiedPayments} />
          </div>

          <section>
            <h2 className="mb-2 text-lg font-medium">Reputation</h2>
            {passport.reputation ? (
              <div className="glass rounded-xl p-5">
                <p className="mb-3 flex flex-wrap gap-2">
                  {passport.reputation.topAreas.map((a) => (
                    <span
                      key={a}
                      className="rounded-full bg-linear-to-r from-accent/20 to-accent-2/20 px-2.5 py-1 text-xs text-white"
                    >
                      {a}
                    </span>
                  ))}
                </p>
                <p className="mb-3 text-sm text-white/70">{passport.reputation.summary}</p>
                <ul className="list-disc space-y-1 pl-5 text-sm text-white/60">
                  {passport.reputation.strengths.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                <button
                  onClick={() => reputationMutation.mutate()}
                  disabled={reputationMutation.isPending}
                  className="mt-4 text-xs text-white/40 underline underline-offset-2 hover:text-white disabled:opacity-50"
                >
                  {reputationMutation.isPending ? 'Refreshing…' : 'Refresh'}
                </button>
              </div>
            ) : (
              <button
                onClick={() => reputationMutation.mutate()}
                disabled={reputationMutation.isPending}
                className="rounded-full bg-linear-to-r from-accent to-accent-2 px-4 py-2 text-sm font-medium text-black transition hover:opacity-90 disabled:opacity-50"
              >
                {reputationMutation.isPending ? 'Generating…' : 'Generate Reputation Insights'}
              </button>
            )}
          </section>

          <section>
            <h2 className="mb-2 text-lg font-medium">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {passport.skills.slice(0, 20).map((s) => (
                <span key={s.skill} className="glass rounded-full px-3 py-1 text-xs">
                  {s.skill} <span className="text-white/40">×{s.count}</span>
                </span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-medium">Recent Contributions</h2>
            <div className="flex flex-col gap-3">
              {passport.recentContributions.map((c) => (
                <div key={c.id} className="glass rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-white hover:underline"
                    >
                      {c.repository} #{c.prNumber}
                    </a>
                    {c.aiComplexity && (
                      <span className="glass-strong rounded-full px-2 py-1 text-xs">{c.aiComplexity}</span>
                    )}
                  </div>
                  <p className="text-sm text-white/40">{c.title}</p>
                  {c.aiSummary ? (
                    <p className="mt-2 text-sm text-white/70">{c.aiSummary}</p>
                  ) : (
                    <p className="mt-2 text-xs text-white/30 italic">Not yet analyzed</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="glass rounded-xl p-4">
      <p className="text-xs text-white/40">{label}</p>
      <p className="glow-text text-xl font-semibold">{value}</p>
    </div>
  );
}
