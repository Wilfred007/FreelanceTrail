'use client';

import { use, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useConnection, useWriteContract, useReadContract } from 'wagmi';
import { api, type Milestone } from '@/lib/api';
import { freelanceEscrowAbi } from '@/lib/freelance-escrow.abi';
import { erc20Abi } from '@/lib/erc20.abi';
import { ESCROW_ADDRESS, USDC_ADDRESS } from '@/lib/contracts';
import { decimalToBaseUnits } from '@/lib/usdc';

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { address } = useConnection();
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<string | null>(null);
  const [proofURI, setProofURI] = useState('');

  const projectQuery = useQuery({ queryKey: ['project', id], queryFn: () => api.getProject(id) });
  const project = projectQuery.data;

  const { mutateAsync: writeContract } = useWriteContract();

  const allowanceQuery = useReadContract({
    address: USDC_ADDRESS,
    abi: erc20Abi,
    functionName: 'allowance',
    args: address ? [address, ESCROW_ADDRESS] : undefined,
    query: { enabled: !!address },
  });

  const refresh = async () => {
    setStatus('Waiting for the backend to pick up the on-chain event (up to ~20s)…');
    await queryClient.invalidateQueries({ queryKey: ['project', id] });
  };

  const fundMutation = useMutation({
    mutationFn: async (m: Milestone) => {
      if (!project) return;
      const amountBaseUnits = decimalToBaseUnits(m.amount);
      const allowance = (allowanceQuery.data as bigint | undefined) ?? 0n;

      if (allowance < amountBaseUnits) {
        setStatus('Approving USDC…');
        await writeContract({
          address: USDC_ADDRESS,
          abi: erc20Abi,
          functionName: 'approve',
          args: [ESCROW_ADDRESS, amountBaseUnits],
        });
        await allowanceQuery.refetch();
      }

      setStatus('Funding milestone…');
      await writeContract({
        address: ESCROW_ADDRESS,
        abi: freelanceEscrowAbi,
        functionName: 'fundMilestone',
        args: [BigInt(project.onchainId!), BigInt(m.index)],
      });
      await refresh();
    },
    onSuccess: () => setStatus('Milestone funded.'),
    onError: (err) => setStatus(`Failed: ${(err as Error).message}`),
  });

  const submitMutation = useMutation({
    mutationFn: async (m: Milestone) => {
      if (!project) return;
      setStatus('Submitting milestone…');
      await writeContract({
        address: ESCROW_ADDRESS,
        abi: freelanceEscrowAbi,
        functionName: 'submitMilestone',
        args: [BigInt(project.onchainId!), BigInt(m.index), proofURI],
      });
      await refresh();
    },
    onSuccess: () => setStatus('Milestone submitted.'),
    onError: (err) => setStatus(`Failed: ${(err as Error).message}`),
  });

  const approveMutation = useMutation({
    mutationFn: async (m: Milestone) => {
      if (!project) return;
      setStatus('Approving milestone (releases payment)…');
      await writeContract({
        address: ESCROW_ADDRESS,
        abi: freelanceEscrowAbi,
        functionName: 'approveMilestone',
        args: [BigInt(project.onchainId!), BigInt(m.index)],
      });
      await refresh();
    },
    onSuccess: () => setStatus('Milestone approved and payment released.'),
    onError: (err) => setStatus(`Failed: ${(err as Error).message}`),
  });

  if (projectQuery.isLoading) return <p className="text-white/50">Loading…</p>;
  if (!project) return <p className="text-white/50">Project not found.</p>;

  const lowerAddress = address?.toLowerCase();
  const isClient = lowerAddress === project.client.walletAddress;
  const isDeveloper = lowerAddress === project.developer.walletAddress;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">{project.title}</h1>
        <p className="text-sm text-white/50">{project.description}</p>
        <span className="glass-strong mt-2 inline-block rounded-full px-2 py-1 text-xs">{project.status}</span>
        {project.status === 'DRAFT' && (
          <p className="mt-2 text-sm text-amber-300/80">
            Waiting for the on-chain createProject transaction to be confirmed and picked up
            (up to ~20s after the wallet transaction).
          </p>
        )}
      </div>

      <div className="glass grid grid-cols-2 gap-4 rounded-xl p-4 text-sm">
        <div>
          <p className="text-white/40">Client</p>
          <p className="font-mono text-white/80">{project.client.walletAddress}</p>
        </div>
        <div>
          <p className="text-white/40">Developer</p>
          <p className="font-mono text-white/80">{project.developer.walletAddress}</p>
        </div>
      </div>

      {status && <p className="glass rounded-lg p-3 text-sm text-white/70">{status}</p>}

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-medium">Milestones</h2>
        {project.milestones.map((m) => (
          <div key={m.id} className="glass rounded-xl p-4">
            <div className="flex items-center justify-between">
              <p className="font-medium">
                #{m.index + 1} {m.description}
              </p>
              <span className="glass-strong rounded-full px-2 py-1 text-xs">{m.status}</span>
            </div>
            <p className="text-sm text-white/60">${m.amount} USDC</p>
            {m.proofURI && <p className="mt-1 text-xs text-white/40">Proof: {m.proofURI}</p>}
            {m.payment && (
              <p className="mt-1 text-xs text-emerald-300/80">Paid — tx {m.payment.txHash.slice(0, 10)}…</p>
            )}

            <div className="mt-3 flex gap-2">
              {isClient && m.status === 'PENDING' && project.onchainId && (
                <button
                  onClick={() => fundMutation.mutate(m)}
                  disabled={fundMutation.isPending}
                  className="rounded-full bg-linear-to-r from-accent to-accent-2 px-3 py-1.5 text-sm font-medium text-black transition hover:opacity-90 disabled:opacity-50"
                >
                  Fund
                </button>
              )}
              {isDeveloper && m.status === 'FUNDED' && (
                <div className="flex flex-1 gap-2">
                  <input
                    placeholder="Proof URI (link or description)"
                    value={proofURI}
                    onChange={(e) => setProofURI(e.target.value)}
                    className="glass-strong flex-1 rounded-lg px-2 py-1 text-sm placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                  <button
                    onClick={() => submitMutation.mutate(m)}
                    disabled={submitMutation.isPending}
                    className="rounded-full bg-linear-to-r from-accent to-accent-2 px-3 py-1.5 text-sm font-medium text-black transition hover:opacity-90 disabled:opacity-50"
                  >
                    Submit
                  </button>
                </div>
              )}
              {isClient && m.status === 'SUBMITTED' && (
                <button
                  onClick={() => approveMutation.mutate(m)}
                  disabled={approveMutation.isPending}
                  className="rounded-full bg-linear-to-r from-accent to-accent-2 px-3 py-1.5 text-sm font-medium text-black transition hover:opacity-90 disabled:opacity-50"
                >
                  Approve &amp; Release Payment
                </button>
              )}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
