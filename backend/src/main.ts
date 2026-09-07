// Must run before any other import: modules like ai/nvidia.provider.ts read
// process.env.* at module-evaluation time (not inside a Nest provider constructor),
// which happens while imports are being resolved — before ConfigModule.forRoot()
// (declared inside AppModule's own decorator) has a chance to load .env.
import 'dotenv/config';
import { setDefaultResultOrder } from 'node:dns';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// On some networks (notably macOS with certain VPN/interface setups), Node's DNS
// resolver prefers IPv6 lookups that silently fail even though the OS resolver (what
// `curl` uses) resolves the same host fine over IPv4 — surfaces as a spurious
// ENOTFOUND on real, reachable hosts like integrate.api.nvidia.com.
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
