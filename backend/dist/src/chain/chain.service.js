"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ChainService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainService = void 0;
const common_1 = require("@nestjs/common");
const viem_1 = require("viem");
const arc_chain_1 = require("./arc.chain");
const freelance_escrow_abi_1 = require("./freelance-escrow.abi");
let ChainService = ChainService_1 = class ChainService {
    logger = new common_1.Logger(ChainService_1.name);
    client;
    escrowAddress;
    escrowAbi = freelance_escrow_abi_1.freelanceEscrowAbi;
    constructor() {
        const rpcUrl = process.env.ARC_RPC_URL ?? 'https://rpc.testnet.arc.network';
        const escrowAddress = process.env.ESCROW_ADDRESS;
        if (!escrowAddress) {
            throw new Error('ESCROW_ADDRESS is not set');
        }
        this.escrowAddress = (0, viem_1.getAddress)(escrowAddress);
        this.client = (0, viem_1.createPublicClient)({
            chain: arc_chain_1.arcTestnet,
            transport: (0, viem_1.http)(rpcUrl),
        });
    }
    async onModuleInit() {
        const chainId = await this.client.getChainId();
        this.logger.log(`Connected to chain ${chainId} at ${this.escrowAddress}`);
    }
};
exports.ChainService = ChainService;
exports.ChainService = ChainService = ChainService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ChainService);
//# sourceMappingURL=chain.service.js.map