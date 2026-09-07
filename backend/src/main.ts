// Must be set before libuv's threadpool initializes (lazily, on first use) — so this
// has to be the very first statement in the process, before any import that might
// trigger async I/O. fetch()/undici resolve hosts via dns.lookup(), which runs on this
// threadpool (default size 4) alongside every other async fs/dns/crypto op in the app —
// including this app's frequent Arc Testnet RPC polling. Under contention that can
// starve a DNS lookup enough to spuriously fail even though the host is reachable
// (confirmed via curl/dig succeeding every time). dns.setServers() does NOT help here:
// it only affects dns.resolve()-style calls, not the dns.lookup() path fetch uses.
process.env.UV_THREADPOOL_SIZE = '16';

// Must run before any other import: modules like ai/nvidia.provider.ts read
// process.env.* at module-evaluation time (not inside a Nest provider constructor),
// which happens while imports are being resolved — before ConfigModule.forRoot()
// (declared inside AppModule's own decorator) has a chance to load .env.
import 'dotenv/config';
import { setDefaultResultOrder } from 'node:dns';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// On some networks (notably macOS with certain VPN/interface setups), Node's DNS
// lookups can prefer IPv6 resolution that silently fails even though the host resolves
// fine over IPv4 — this is a secondary, cheap mitigation alongside the threadpool fix.
setDefaultResultOrder('ipv4first');

// Project.onchainId and Payment.blockNumber are BigInt; Express's JSON serializer
// otherwise throws on them.
(BigInt.prototype as unknown as { toJSON: () => string }).toJSON = function () {
  return this.toString();
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
