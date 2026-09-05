export declare const arcTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "ArcScan";
            readonly url: "https://testnet.arcscan.app";
        };
    };
    blockTime?: number | undefined | undefined;
    contracts?: {
        [x: string]: import("viem", { with: { "resolution-mode": "import" } }).ChainContract | {
            [sourceId: number]: import("viem", { with: { "resolution-mode": "import" } }).ChainContract | undefined;
        } | undefined;
        ensRegistry?: import("viem", { with: { "resolution-mode": "import" } }).ChainContract | undefined;
        ensUniversalResolver?: import("viem", { with: { "resolution-mode": "import" } }).ChainContract | undefined;
        multicall3?: import("viem", { with: { "resolution-mode": "import" } }).ChainContract | undefined;
        erc6492Verifier?: import("viem", { with: { "resolution-mode": "import" } }).ChainContract | undefined;
    } | undefined;
    ensTlds?: readonly string[] | undefined;
    id: 5042002;
    name: "Arc Testnet";
    nativeCurrency: {
        readonly name: "USDC";
        readonly symbol: "USDC";
        readonly decimals: 18;
    };
    experimental_preconfirmationTime?: number | undefined | undefined;
    rpcUrls: {
        readonly default: {
            readonly http: readonly [string];
        };
    };
    sourceId?: number | undefined | undefined;
    supportsTransactionReplacementDetection?: boolean | undefined | undefined;
    testnet: true;
    custom?: Record<string, unknown> | undefined;
    extendSchema?: Record<string, unknown> | undefined;
    fees?: import("viem", { with: { "resolution-mode": "import" } }).ChainFees<undefined> | undefined;
    formatters?: undefined;
    prepareTransactionRequest?: ((args: import("viem", { with: { "resolution-mode": "import" } }).PrepareTransactionRequestParameters, options: {
        client: import("viem", { with: { "resolution-mode": "import" } }).Client;
        phase: "beforeFillTransaction" | "beforeFillParameters" | "afterFillParameters";
    }) => Promise<import("viem", { with: { "resolution-mode": "import" } }).PrepareTransactionRequestParameters>) | [fn: ((args: import("viem", { with: { "resolution-mode": "import" } }).PrepareTransactionRequestParameters, options: {
        client: import("viem", { with: { "resolution-mode": "import" } }).Client;
        phase: "beforeFillTransaction" | "beforeFillParameters" | "afterFillParameters";
    }) => Promise<import("viem", { with: { "resolution-mode": "import" } }).PrepareTransactionRequestParameters>) | undefined, options: {
        runAt: readonly ("beforeFillTransaction" | "beforeFillParameters" | "afterFillParameters")[];
    }] | undefined;
    serializers?: import("viem", { with: { "resolution-mode": "import" } }).ChainSerializers<undefined, import("viem", { with: { "resolution-mode": "import" } }).TransactionSerializable> | undefined;
    verifyHash?: ((client: import("viem", { with: { "resolution-mode": "import" } }).Client, parameters: import("viem", { with: { "resolution-mode": "import" } }).VerifyHashActionParameters) => Promise<import("viem", { with: { "resolution-mode": "import" } }).VerifyHashActionReturnType>) | undefined;
};
