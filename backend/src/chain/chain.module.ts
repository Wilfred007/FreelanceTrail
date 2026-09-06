import { Global, Module } from '@nestjs/common';
import { ChainService } from './chain.service';
import { ChainListenerService } from './chain-listener.service';

@Global()
@Module({
  providers: [ChainService, ChainListenerService],
  exports: [ChainService],
})
export class ChainModule {}
