## FreelanceTrail — Escrow Contract

Milestone-based USDC escrow for FreelanceTrail, deployed to [Arc](https://arc.network) (Circle's USDC-native L1).
One `FreelanceEscrow` deployment holds all client projects; USDC is fixed at deploy time to Arc's
canonical USDC token.

Built with [Foundry](https://book.getfoundry.sh/).

## Usage

### Build

```shell
forge build
```

### Test

```shell
forge test
```

### Environment

Copy `.env.example` to `.env` and fill in:

```
PRIVATE_KEY=0x...          # funded testnet key, must include the 0x prefix
USDC_ADDRESS=0x3600000000000000000000000000000000000000   # Arc Testnet USDC (default if unset)
ARCSCAN_API_KEY=           # unused for now — verification below doesn't need it
```

Fund the deployer address with testnet USDC from https://faucet.circle.com before deploying.

### Deploy (Arc Testnet)

```shell
forge script script/Deploy.s.sol --rpc-url arc_testnet --broadcast
```

Logs the deployed `FreelanceEscrow` address and the USDC token it's wired to. Arc Testnet's
chain ID is `5042002`; explorer at https://testnet.arcscan.app.

### Verify (Arc Testnet)

ArcScan runs Blockscout, not Etherscan, and Arc's chain ID isn't in Foundry's built-in `--chain`
list — so the standard `foundry.toml` `[etherscan]` config doesn't resolve for it (confirmed on
Foundry 1.5.1). Verify with the `blockscout` verifier and an explicit URL instead:

```shell
forge verify-contract <DEPLOYED_ADDRESS> src/FreelanceEscrow.sol:FreelanceEscrow \
  --chain 5042002 \
  --verifier blockscout \
  --verifier-url https://testnet.arcscan.app/api \
  --constructor-args $(cast abi-encode "constructor(address)" <USDC_ADDRESS>) \
  --watch
```

No API key is required for this flow.

### Format

```shell
forge fmt
```

### Gas Snapshots

```shell
forge snapshot
```

### Cast

```shell
cast <subcommand>
```
