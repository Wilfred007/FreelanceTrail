import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

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
