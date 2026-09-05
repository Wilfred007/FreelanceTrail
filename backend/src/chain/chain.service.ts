import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { createPublicClient, getAddress, http, type Address, type PublicClient } from 'viem';
import { arcTestnet } from './arc.chain';
import { freelanceEscrowAbi } from './freelance-escrow.abi';

@Injectable()
export class ChainService implements OnModuleInit {
  private readonly logger = new Logger(ChainService.name);

  readonly client: PublicClient;
  readonly escrowAddress: Address;
  readonly escrowAbi = freelanceEscrowAbi;

  constructor() {
    const rpcUrl = process.env.ARC_RPC_URL ?? 'https://rpc.testnet.arc.network';
    const escrowAddress = process.env.ESCROW_ADDRESS;
    if (!escrowAddress) {
      throw new Error('ESCROW_ADDRESS is not set');
    }

    this.escrowAddress = getAddress(escrowAddress);
    this.client = createPublicClient({
      chain: arcTestnet,
      transport: http(rpcUrl),
    });
  }

  async onModuleInit() {
    const chainId = await this.client.getChainId();
    this.logger.log(`Connected to chain ${chainId} at ${this.escrowAddress}`);
  }
}
