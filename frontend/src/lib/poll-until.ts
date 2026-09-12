// After an on-chain tx confirms, the DB doesn't reflect it until ChainListenerService's
// next subgraph poll (up to ~15s) picks up and processes the event. Invalidating a query
// right after the tx confirms just refetches the still-stale DB state, so the UI looks
// unchanged until the user manually refreshes later. This polls the backend directly
// until the expected state actually shows up, so the mutation only resolves once the
// change is real and visible — no manual refresh needed.
export async function pollUntil<T>(
  fetcher: () => Promise<T>,
  predicate: (value: T) => boolean,
  { intervalMs = 2500, timeoutMs = 45000 }: { intervalMs?: number; timeoutMs?: number } = {},
): Promise<{ value: T; timedOut: boolean }> {
  const start = Date.now();
  let value = await fetcher();
  while (!predicate(value)) {
    if (Date.now() - start >= timeoutMs) {
      return { value, timedOut: true };
    }
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
    value = await fetcher();
  }
  return { value, timedOut: false };
}
