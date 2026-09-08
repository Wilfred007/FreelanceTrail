'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import { api, type MatchResult } from '@/lib/api';

export default function FindDevelopersPage() {
  const [requirement, setRequirement] = useState('');
  const [results, setResults] = useState<MatchResult[] | null>(null);

  const matchMutation = useMutation({
    mutationFn: () => api.match(requirement),
    onSuccess: (data) => setResults(data.matches),
  });

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Find Developers</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          matchMutation.mutate();
        }}
        className="flex flex-col gap-3"
      >
        <textarea
          required
          minLength={10}
          placeholder="Describe what you need, e.g. 'A Rust developer with blockchain smart contract experience.'"
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          rows={3}
          className="glass rounded-lg px-3 py-2 placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-accent"
        />
        <button
          type="submit"
          disabled={matchMutation.isPending}
          className="self-start rounded-full bg-linear-to-r from-accent to-accent-2 px-5 py-2 text-sm font-medium text-black transition hover:opacity-90 disabled:opacity-50"
        >
          {matchMutation.isPending ? 'Searching…' : 'Search'}
        </button>
        {matchMutation.isError && (
          <p className="text-sm text-red-400">{(matchMutation.error as Error).message}</p>
        )}
      </form>

      {results && (
        <section className="flex flex-col gap-3">
          {results.length === 0 && <p className="text-sm text-white/40">No strong matches found.</p>}
          {results.map((r) => (
            <div key={r.developerId} className="glass rounded-xl p-4">
              <div className="flex items-center justify-between">
                <p className="font-medium">{r.githubUsername ? `@${r.githubUsername}` : r.walletAddress}</p>
                <span className="rounded-full bg-linear-to-r from-accent/20 to-accent-2/20 px-2.5 py-1 text-xs">
                  {r.matchScore}% match
                </span>
              </div>
              <p className="mt-1 text-sm text-white/60">{r.reasoning}</p>
              <Link
                href={`/projects?developer=${r.walletAddress}`}
                className="mt-3 inline-block text-sm text-white/40 underline underline-offset-2 hover:text-white"
              >
                Create project with this developer
              </Link>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
