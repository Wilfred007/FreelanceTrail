import { createOpenAICompatible } from '@ai-sdk/openai-compatible';

// NVIDIA NIM exposes an OpenAI-compatible chat completions endpoint, so we reuse the
// generic openai-compatible AI SDK provider instead of a NVIDIA-specific package.
const nvidia = createOpenAICompatible({
  name: 'nvidia',
  baseURL: 'https://integrate.api.nvidia.com/v1',
  apiKey: process.env.NVIDIA_API_KEY,
});

const DEFAULT_MODEL = 'meta/llama-3.3-70b-instruct';

export function nvidiaModel(modelId: string = process.env.NVIDIA_MODEL ?? DEFAULT_MODEL) {
  if (!process.env.NVIDIA_API_KEY) {
    throw new Error('NVIDIA_API_KEY is not set');
  }
  return nvidia(modelId);
}
