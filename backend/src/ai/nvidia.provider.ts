import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { Agent, fetch as undiciFetch } from 'undici';
import { resolve4 } from 'node:dns/promises';

// Node's default fetch resolves hosts via dns.lookup() (OS getaddrinfo through a
// libuv threadpool thread), which has been intermittently/consistently returning
// ENOTFOUND for integrate.api.nvidia.com on some machines even though the exact same
// host resolves and connects instantly via `curl` (confirmed: not a network outage,
// not IPv6-vs-IPv4 preference, not thread-pool contention — all ruled out). Route
// around it entirely by resolving via dns.promises.resolve4(), a completely different
// code path (Node's c-ares resolver), and handing undici the address directly.
const nvidiaDispatcher = new Agent({
  connect: {
    lookup: (hostname, _options, callback) => {
      resolve4(hostname).then(
        (addresses) => callback(null, addresses.map((address) => ({ address, family: 4 }))),
        (err) => callback(err as Error, []),
      );
    },
  },
});

const nvidiaFetch: typeof fetch = (input, init) =>
  undiciFetch(input as string, { ...(init as object), dispatcher: nvidiaDispatcher } as never) as unknown as Promise<Response>;

// NVIDIA NIM exposes an OpenAI-compatible chat completions endpoint, so we reuse the
// generic openai-compatible AI SDK provider instead of a NVIDIA-specific package.
const nvidia = createOpenAICompatible({
  name: 'nvidia',
  baseURL: 'https://integrate.api.nvidia.com/v1',
  apiKey: process.env.NVIDIA_API_KEY,
  fetch: nvidiaFetch,
});

// meta/llama-3.3-70b-instruct was NVIDIA's suggested default but was EOL'd 2026-08-26;
// this is the model actually verified working (fast, non-reasoning-by-default, schema-
// conformant) against this account's NVIDIA Build catalog as of 2026-09-07.
const DEFAULT_MODEL = 'nvidia/nemotron-3.5-lightning-30b-a3b';

export function nvidiaModel(modelId: string = process.env.NVIDIA_MODEL ?? DEFAULT_MODEL) {
  if (!process.env.NVIDIA_API_KEY) {
    throw new Error('NVIDIA_API_KEY is not set');
  }
  return nvidia(modelId);
}
