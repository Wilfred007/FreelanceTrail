# FreelanceTrail

FreelanceTrail is a blockchain-powered payment and reputation platform for independent
developers and open-source contributors. It links a developer's work, on-chain payments,
and verified GitHub contributions into a single, portable **Developer Payment Passport**.

Core relationship: **WORK → CONTRIBUTION → REWARD → PAYMENT → PROOF**

Built for an ETH-Online hackathon submission.

## Status at a glance

This is an early-stage MVP. The escrow contract, GitHub verification, and payment sync
are functional; the AI layer and frontend are not built yet.

| Feature | Status | Notes |
|---|---|---|
| Milestone-based USDC escrow | ✅ Implemented | `FreelanceEscrow.sol`, full create → fund → submit → approve/refund lifecycle |
| On-chain event sync | ✅ Implemented | `ChainListenerService` watches escrow events and syncs Postgres |
| Project & milestone creation (off-chain) | ✅ Implemented | REST API + Prisma models |
| GitHub contribution verification | ✅ Implemented | OAuth (`read:user`) + merged-PR sync + repo impact metrics |
| Developer Payment Passport | 🟡 Partial | Aggregates verified earnings/projects/contributions/payments; no AI insights or on-chain proof links exposed yet |
| Wallet authentication | ❌ Not implemented | No SIWE / signature verification; endpoints trust a caller-supplied wallet address |
| AI Contribution Analyzer | ❌ Not implemented | Planned: Mastra agent |
| AI Developer Reputation Analyst | ❌ Not implemented | Planned: Mastra agent |
| AI Freelancer Matching | ❌ Not implemented | Planned: Mastra agent |
| Frontend | ❌ Not implemented | Backend + contracts only, no UI yet |

Target chain per current implementation is **Arc Testnet** (chain ID `5042002`), not
Optimism/Optimism Sepolia — this may still change.

## Architecture

```
Client (wallet) ──POST /projects──▶ Backend (NestJS)
                                        │  creates draft Project + Milestones in Postgres,
                                        │  returns the onchainCall params
                                        ▼
                              Client's wallet calls
                          FreelanceEscrow.createProject()
                                        │
                                        ▼
                        FreelanceEscrow.sol (Arc Testnet)
              fundMilestone → submitMilestone → approveMilestone
                                        │  emits events
                                        ▼
                          ChainListenerService (backend)
                    watches events, syncs Project/Milestone/Payment rows
                                        │
                                        ▼
                          GET /developers/:id/passport
              aggregates verified earnings, milestones, GitHub contributions
```

GitHub contributions are verified independently: a developer connects their GitHub
account via OAuth, and merged PRs + repo impact stats are pulled via the GitHub API and
stored alongside on-chain payment history.

## Repo structure

```
backend/            NestJS API + Prisma/Postgres
  src/chain/         viem client, Arc Testnet config, on-chain event listener
  src/projects/      project & milestone CRUD (off-chain half of the escrow flow)
  src/github/        GitHub OAuth + contribution/repo-impact sync
  src/developers/    Developer Payment Passport aggregation
  src/prisma/        Prisma service wiring
  prisma/schema.prisma
contracts/          Foundry project
  src/FreelanceEscrow.sol   milestone escrow contract
  script/Deploy.s.sol       deploy script
  test/FreelanceEscrow.t.sol
```

## Tech stack

- **Backend**: NestJS, TypeScript, Prisma 7 (pg driver adapter), PostgreSQL, Zod validation
- **Blockchain**: Solidity (Foundry), OpenZeppelin, viem
- **Chain/asset**: Arc Testnet, USDC
- **GitHub integration**: Octokit, OAuth
- **Planned**: Mastra (AI orchestration), Groq (LLM inference), Next.js frontend, wagmi/viem wallet connect

## Getting started

### Prerequisites

- Node.js 20+
- PostgreSQL instance
- [Foundry](https://book.getfoundry.sh/) (`forge`, `cast`)
- A GitHub OAuth App (for contribution verification)
- A funded Arc Testnet wallet key (get testnet USDC from https://faucet.circle.com)

### 1. Smart contracts (`contracts/`)

```bash
cd contracts
forge install   # if libs aren't already present
forge build
forge test
```

Copy `.env.example` to `.env` and fill in:

| Variable | Description |
|---|---|
| `PRIVATE_KEY` | Funded Arc Testnet deployer key, `0x`-prefixed |
| `USDC_ADDRESS` | Arc Testnet USDC address (defaults to `0x3600000000000000000000000000000000000000` if unset) |
| `ARCSCAN_API_KEY` | Unused currently — verification below doesn't need it |

Deploy:

```bash
forge script script/Deploy.s.sol --rpc-url arc_testnet --broadcast
```

This logs the deployed `FreelanceEscrow` address and the USDC token it's wired to.
Arc Testnet chain ID: `5042002`. Explorer: https://testnet.arcscan.app.

Verify (ArcScan runs Blockscout, not Etherscan — see `contracts/README.md` for why the
standard `[etherscan]` config doesn't apply):

```bash
forge verify-contract <DEPLOYED_ADDRESS> src/FreelanceEscrow.sol:FreelanceEscrow \
  --chain 5042002 \
  --verifier blockscout \
  --verifier-url https://testnet.arcscan.app/api \
  --constructor-args $(cast abi-encode "constructor(address)" <USDC_ADDRESS>) \
  --watch
```

### 2. Backend (`backend/`)

```bash
cd backend
npm install
```

Create `backend/.env` with:

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | ✅ | Postgres connection string |
| `ESCROW_ADDRESS` | ✅ | Deployed `FreelanceEscrow` address from the step above |
| `ARC_RPC_URL` | optional | Defaults to `https://rpc.testnet.arc.network` |
| `ARC_POLLING_INTERVAL_MS` | optional | Defaults to `20000` — Arc's public RPC rate-limits `eth_getLogs` aggressively |
| `ESCROW_DEPLOY_BLOCK` | optional | Block to start the event backfill from; omit to backfill from genesis |
| `GITHUB_CLIENT_ID` | ✅ for GitHub features | GitHub OAuth App client ID |
| `GITHUB_CLIENT_SECRET` | ✅ for GitHub features | GitHub OAuth App client secret |
| `GITHUB_OAUTH_CALLBACK_URL` | ✅ for GitHub features | Must match the OAuth App's configured callback URL |
| `PORT` | optional | Defaults to `3000` |

Run Prisma migrations and start the API:

```bash
npx prisma migrate deploy
npm run start:dev
```

## API reference

### Projects

- `POST /projects` — create a draft project + milestones off-chain.
  ```json
  {
    "clientWallet": "0x...",
    "developerWallet": "0x...",
    "title": "Build a Rust indexer",
    "description": "optional",
    "milestones": [{ "description": "optional", "amount": "500.00" }]
  }
  ```
  Returns the created project plus `onchainCall` params the client's wallet needs to
  call `FreelanceEscrow.createProject()` with. The listener matches the resulting
  `ProjectCreated` event back to this row by `metadataURI`.
- `GET /projects` — list all projects.
- `GET /projects/:id` — project detail, including milestones and payments.

### GitHub

- `GET /github/connect?userId=` — redirects to GitHub's OAuth authorize URL.
- `GET /github/callback?code=&state=` — OAuth callback; links the GitHub account to the user.
- `GET /github/contributions?userId=` — syncs and returns the user's merged PRs.

### Developers

- `GET /developers/:id/passport` — the Developer Payment Passport: verified earnings,
  on-chain projects, GitHub contributions, payments, and a naive language/skill count
  (stands in for the AI Reputation Analyst until that agent exists).

## Smart contract reference

`FreelanceEscrow.sol` — one deployment serves all projects; USDC address is fixed at
deploy time.

- `createProject(developer, metadataURI, milestoneAmounts[])` — client creates a project.
- `fundMilestone(projectId, milestoneIndex)` — client locks USDC for a milestone (`Pending → Funded`).
- `submitMilestone(projectId, milestoneIndex, proofURI)` — developer submits work (`Funded → Submitted`).
- `approveMilestone(projectId, milestoneIndex)` — client approves and USDC releases to the developer (`Submitted → Approved`).
- `refundMilestone(projectId, milestoneIndex)` — client reclaims funded-but-unapproved USDC (`Funded → Refunded`).
- `getProject` / `getMilestone` — view accessors.

Events (`ProjectCreated`, `MilestoneFunded`, `MilestoneSubmitted`, `MilestoneApproved`,
`PaymentReleased`, `RefundIssued`) are what `ChainListenerService` watches to keep
Postgres in sync with on-chain state.

## Testing

```bash
# backend
cd backend && npm test          # unit
npm run test:e2e                # e2e

# contracts
cd contracts && forge test
```

## Roadmap

- AI Contribution Analyzer, Reputation Analyst, and Freelancer Matching agents (Mastra + Groq)
- Wallet authentication (SIWE) — no endpoint currently verifies wallet ownership
- Frontend (Next.js + wagmi/viem + Tailwind/shadcn)
- Surface on-chain proof links (tx hash / block number) in the Developer Payment Passport
- Confirm target chain (Arc Testnet vs. Optimism/Optimism Sepolia)
