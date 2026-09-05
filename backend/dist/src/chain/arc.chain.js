"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arcTestnet = void 0;
const viem_1 = require("viem");
exports.arcTestnet = (0, viem_1.defineChain)({
    id: 5042002,
    name: 'Arc Testnet',
    nativeCurrency: { name: 'USDC', symbol: 'USDC', decimals: 18 },
    rpcUrls: {
        default: { http: [process.env.ARC_RPC_URL ?? 'https://rpc.testnet.arc.network'] },
    },
    blockExplorers: {
        default: { name: 'ArcScan', url: 'https://testnet.arcscan.app' },
    },
    testnet: true,
});
//# sourceMappingURL=arc.chain.js.map