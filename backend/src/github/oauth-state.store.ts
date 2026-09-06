import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

const TTL_MS = 10 * 60 * 1000;

// In-memory CSRF-state -> userId mapping for the OAuth redirect round-trip.
// Fine for a single-instance hackathon deployment; a multi-instance deploy
// would need this backed by Postgres/Redis instead.
@Injectable()
export class OAuthStateStore {
  private readonly states = new Map<string, { userId: string; expiresAt: number }>();

  create(userId: string): string {
    const state = randomUUID();
    this.states.set(state, { userId, expiresAt: Date.now() + TTL_MS });
    return state;
  }

  consume(state: string): string | null {
    const entry = this.states.get(state);
    this.states.delete(state);
    if (!entry || entry.expiresAt < Date.now()) return null;
    return entry.userId;
  }
}
