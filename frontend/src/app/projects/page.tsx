'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useConnection, useWriteContract } from 'wagmi';
import { toast } from 'sonner';
import { useUser } from '@/lib/user-context';
import { api } from '@/lib/api';
import { freelanceEscrowAbi } from '@/lib/freelance-escrow.abi';
import { ESCROW_ADDRESS } from '@/lib/contracts';
import { pollUntil } from '@/lib/poll-until';
import { formatDate } from '@/lib/format-date';

interface MilestoneInput {
  description: string;
  amount: string;
}

export default function ProjectsPage() {
  const { address } = useConnection();
  const { user } = useUser();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [developerWallet, setDeveloperWallet] = useState('');
  const [milestones, setMilestones] = useState<MilestoneInput[]>([{ description: '', amount: '' }]);

  // Pre-fill from ?developer=0x... (set by the Find Developers page) without pulling in
  // next/navigation's useSearchParams, which requires a Suspense boundary at build time.
  // window is unavailable during this Client Component's server-render pass, so this
  // one-time post-mount read has no render-time equivalent.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const developer = params.get('developer');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (developer) setDeveloperWallet(developer);
  }, []);

  const projectsQuery = useQuery({ queryKey: ['projects'], queryFn: api.listProjects });
  const { mutateAsync: writeContract } = useWriteContract();

  const createMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error('Connect your wallet first');
      const toastId = toast.loading('Creating project record…');

      try {
        const { project: draft, onchainCall } = await api.createProject({
          clientWallet: user.walletAddress,
          developerWallet,
          title,
          description: description || undefined,
          milestones: milestones.map((m) => ({ description: m.description || undefined, amount: m.amount })),
        });

        toast.loading('Confirm the transaction in your wallet…', { id: toastId });
        await writeContract({
          address: ESCROW_ADDRESS,
          abi: freelanceEscrowAbi,
          functionName: 'createProject',
          args: [
            onchainCall.developer as `0x${string}`,
            onchainCall.metadataURI,
            onchainCall.milestoneAmounts.map((a) => BigInt(a)),
          ],
        });

        toast.loading('Waiting for the network to confirm and sync…', { id: toastId });
        const { value: confirmed, timedOut } = await pollUntil(
          () => api.getProject(draft.id),
          (p) => p.status === 'ONCHAIN',
        );

        queryClient.setQueryData(['project', draft.id], confirmed);
        await queryClient.invalidateQueries({ queryKey: ['projects'] });

        if (timedOut) {
          toast.warning('Transaction confirmed, but sync is taking longer than usual — it will appear shortly.', {
            id: toastId,
          });
        } else {
          toast.success('Project created on-chain.', { id: toastId });
        }
        return confirmed;
      } catch (err) {
        toast.error(`Failed: ${(err as Error).message}`, { id: toastId });
        throw err;
      }
    },
    onSuccess: () => {
      setTitle('');
      setDescription('');
      setMilestones([{ description: '', amount: '' }]);
    },
  });

  const myProjects = (projectsQuery.data ?? []).filter(
    (p) =>
      address &&
      (p.client.walletAddress === address.toLowerCase() || p.developer.walletAddress === address.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold">Projects</h1>
      </div>

      <section className="glass rounded-xl p-5">
        <h2 className="mb-4 text-lg font-medium">Create Project</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createMutation.mutate();
          }}
          className="flex flex-col gap-3"
        >
          <input
            required
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="glass-strong rounded-lg px-3 py-2 placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-accent"
          />
          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="glass-strong rounded-lg px-3 py-2 placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-accent"
          />
          <input
            required
            placeholder="Developer wallet address (0x...)"
            value={developerWallet}
            onChange={(e) => setDeveloperWallet(e.target.value)}
            className="glass-strong rounded-lg px-3 py-2 font-mono text-sm placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-accent"
          />

          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-white/70">Milestones</p>
            {milestones.map((m, i) => (
              <div key={i} className="flex gap-2">
                <input
                  placeholder="Description (optional)"
                  value={m.description}
                  onChange={(e) => {
                    const next = [...milestones];
                    next[i] = { ...next[i], description: e.target.value };
                    setMilestones(next);
                  }}
                  className="glass-strong flex-1 rounded-lg px-3 py-2 placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-accent"
                />
                <div className="relative w-36">
                  <input
                    required
                    type="number"
                    min="0"
                    step="0.000001"
                    placeholder="Amount"
                    value={m.amount}
                    onChange={(e) => {
                      const next = [...milestones];
                      next[i] = { ...next[i], amount: e.target.value };
                      setMilestones(next);
                    }}
                    className="glass-strong w-full rounded-lg py-2 pl-3 pr-14 placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-white/30">
                    USDC
                  </span>
                </div>
                {milestones.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setMilestones(milestones.filter((_, idx) => idx !== i))}
                    className="text-white/30 hover:text-red-400"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => setMilestones([...milestones, { description: '', amount: '' }])}
              className="self-start text-sm text-white/40 underline underline-offset-2 hover:text-white"
            >
              + Add milestone
            </button>
          </div>

          <button
            type="submit"
            disabled={createMutation.isPending || !user}
            className="mt-2 self-start rounded-full bg-linear-to-r from-accent to-accent-2 px-5 py-2 text-sm font-medium text-black transition hover:opacity-90 disabled:opacity-50"
          >
            {createMutation.isPending ? 'Working…' : 'Create Project'}
          </button>
        </form>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-medium">My Projects</h2>
        <div className="flex flex-col gap-3">
          {myProjects.length === 0 && <p className="text-sm text-white/40">No projects yet.</p>}
          {myProjects.map((p) => (
            <Link
              key={p.id}
              href={`/projects/${p.id}`}
              className="glass rounded-xl p-4 transition hover:bg-white/10"
            >
              <div className="flex items-center justify-between">
                <p className="font-medium">{p.title}</p>
                <span className="glass-strong rounded-full px-2 py-1 text-xs">{p.status}</span>
              </div>
              <p className="text-xs text-white/40">
                Client {p.client.walletAddress.slice(0, 6)}… → Developer {p.developer.walletAddress.slice(0, 6)}…
              </p>
              <p className="mt-1 text-xs text-white/30">Created {formatDate(p.createdAt)}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
