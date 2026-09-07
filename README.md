# FreelanceTrail

**FreelanceTrail turns freelance work and open-source contributions into a verifiable
economic and professional history that developers can carry anywhere.**

Built for an ETH-Online hackathon.

## The problem

Independent developers have their professional activity scattered across many systems:
freelance platforms and private client relationships, GitHub repositories and pull
requests, open-source bounties, grants and hackathon prizes, and multiple wallets and
payment networks. Because these records are fragmented, a developer can struggle to
present a single credible history of completed work, contributions, and earnings. A
résumé can describe experience — it can't prove the work was done or that the stated
rewards were actually paid.

## The solution

FreelanceTrail brings these activities together into one verifiable trail. Clients
create projects, define milestones, fund blockchain-based escrow, and release payment
when work is completed. Open-source contributions are connected to GitHub evidence and
on-chain rewards. AI turns this verified history into professional intelligence.

The result is a **Developer Payment Passport**: a portable profile of verified projects,
contributions, rewards, payment history, and AI-generated insights.

Core relationship:

```
WORK  →  CONTRIBUTION  →  REWARD  →  PAYMENT  →  PROOF
```

## Product philosophy

- **Blockchain = Truth** — on-chain data establishes financial facts and payment proofs.
- **GitHub = Evidence** — contribution data establishes evidence of software work.
- **AI = Intelligence** — AI interprets evidence, summarizes expertise, and matches opportunities.
- **Passport = Portability** — developers get a professional record they can carry across platforms.

Blockchain isn't a Web3 badge here — it's the verifiable financial layer. Escrowed USDC
is locked until a milestone is approved; milestone releases create verifiable payment
transactions; payment records reference transaction hashes; developers can prove
economic activity without relying solely on a platform's internal database.

## Features

### Freelance escrow
Clients create projects with milestones and fund them in USDC through a smart contract.
Payment releases only when the client approves completed work, and unapproved funded
milestones can be refunded. Every state transition is an on-chain event, so payment
history is independently verifiable rather than a claim in a database.

### GitHub contribution verification
Developers connect their GitHub account via OAuth. Merged pull requests are pulled from
the GitHub API and linked to the developer's passport, along with repo-level impact
(stars, forks, contributor count) — turning raw GitHub activity into evidence rather
than a self-reported line on a résumé.

### AI Contribution Analyzer
Analyzes verified GitHub contributions and converts raw activity into structured
professional intelligence: contribution category, technical skills, estimated
complexity, potential impact, and a concise summary. A merged Rust pull request for
transaction batching, for example, becomes "blockchain infrastructure" with Rust and
transaction-processing skills at high technical complexity.

### AI Developer Reputation Analyst
Interprets verified project, contribution, and payment history to surface strongest
verified technical areas, open-source activity patterns, and professional strengths —
evidence-backed developer intelligence, not an opaque trust score. The AI is designed to
interpret evidence, not act as the source of truth.

### AI Freelancer Matching
A client describes what a project needs; the AI converts that into relevant skills and
compares them against developer passports, explaining why a candidate is a strong match
based on verified projects, contributions, and payment history.

### Developer Payment Passport
The primary user-facing artifact: verified earnings, completed projects and milestones,
verified payments, open-source contributions, bounties/rewards, technical skills
identified from contributions, AI-generated insights, and links to the underlying GitHub
evidence and blockchain transactions. Verified facts are always kept distinct from
AI-generated interpretation.

## End-to-end flow

1. **Developer** connects wallet and GitHub account.
2. **Client** creates a project and defines milestones.
3. **Escrow** — client funds the project with USDC through the smart contract.
4. **Work** — developer completes a milestone and submits proof.
5. **Release** — client approves the milestone; the contract releases payment.
6. **GitHub** — developer contributions are verified and linked to rewards.
7. **AI** — contributions, professional history, and matching opportunities are analyzed.
8. **Passport** — the Developer Payment Passport updates with verified activity and AI insights.

## Architecture

```
                     ┌─────────────────────────┐
                     │        Frontend          │
                     │  Next.js + wagmi/viem    │
                     └────────────┬─────────────┘
                                  │
                     ┌────────────▼─────────────┐
                     │      Backend (NestJS)     │
                     │  Projects · GitHub · Chain │
                     │  listener · Passport API  │
                     └──────┬────────────┬───────┘
                            │            │
              ┌─────────────▼──┐   ┌─────▼─────────────┐
              │  PostgreSQL     │   │   GitHub API       │
              │  (Prisma)       │   │   (OAuth + PRs)    │
              └─────────────────┘   └────────────────────┘
                            │
              ┌─────────────▼─────────────┐
              │   FreelanceEscrow.sol      │
              │   USDC milestone escrow    │
              └────────────────────────────┘
                            ▲
                            │  agent tools: verifyTransaction,
                            │  getPayments, getPassport, getContributions
              ┌─────────────┴─────────────┐
              │      Mastra AI layer       │
              │  Contribution · Reputation │
              │  · Matching agents (Groq)  │
              └────────────────────────────┘
```

Design principle: **blockchain proves the financial facts, GitHub provides evidence of
work, AI interprets the evidence.**

### Mastra AI architecture

- **Contribution Agent** — analyzes GitHub pull requests and contribution evidence.
- **Reputation Agent** — interprets verified project, contribution, and payment history.
- **Matching Agent** — compares client requirements against developer passports.

Tools available to these agents: GitHub tools (`getPullRequest`, `getRepository`,
`getContributions`), blockchain tools (`verifyTransaction`, `getPayments`, `getEscrow`),
and developer tools (`getPassport`, `searchDevelopers`). A Mastra workflow orchestrates
the pipeline: fetch evidence → verify evidence → analyze contribution → retrieve
payment/reward data → update passport.

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | Next.js, TypeScript, Tailwind/shadcn |
| Web3 | wagmi, viem |
| Smart contracts | Solidity, Foundry, OpenZeppelin |
| Blockchain / asset | Arc Testnet, USDC |
| Backend / data | NestJS, Prisma 7, PostgreSQL |
| Developer evidence | GitHub API (Octokit) |
| AI orchestration | Mastra |
| LLM inference | Groq |

## Repo structure

```
backend/            NestJS API + Prisma/Postgres
  src/chain/          viem client, chain config, on-chain event listener
  src/projects/       project & milestone management
  src/github/         GitHub OAuth + contribution/repo-impact sync
  src/developers/     Developer Payment Passport
  prisma/schema.prisma
contracts/          Foundry project
  src/FreelanceEscrow.sol   milestone escrow contract
  script/Deploy.s.sol
  test/FreelanceEscrow.t.sol
```

## Smart contract

`FreelanceEscrow.sol` is a milestone-based USDC escrow. One deployment serves every
FreelanceTrail project; the USDC address is fixed at deploy time.

- `createProject(developer, metadataURI, milestoneAmounts[])`
- `fundMilestone(projectId, milestoneIndex)` — client locks USDC for a milestone
- `submitMilestone(projectId, milestoneIndex, proofURI)` — developer submits proof of work
- `approveMilestone(projectId, milestoneIndex)` — client approves; USDC releases to the developer
- `refundMilestone(projectId, milestoneIndex)` — client reclaims a funded, unapproved milestone
- `getProject` / `getMilestone` — view accessors

Milestone lifecycle: `Pending → Funded → Submitted → Approved` (or `→ Refunded` from
`Funded`). Every transition emits an event (`ProjectCreated`, `MilestoneFunded`,
`MilestoneSubmitted`, `MilestoneApproved`, `PaymentReleased`, `RefundIssued`), which is
how the backend keeps its database in sync with on-chain state.

## API

### Projects
- `POST /projects` — create a project with milestones; returns the params needed to call
  `FreelanceEscrow.createProject()` from the client's wallet.
- `GET /projects` / `GET /projects/:id` — list / fetch project detail.

### GitHub
- `GET /github/connect?userId=` — start the OAuth flow.
- `GET /github/callback?code=&state=` — OAuth callback, links the account.
- `GET /github/contributions?userId=` — sync and return merged PRs.

### Developers
- `GET /developers/:id/passport` — the Developer Payment Passport: verified earnings,
  projects, contributions, payments, and skills.

## Getting started

### Prerequisites
- Node.js 20+
- PostgreSQL
- [Foundry](https://book.getfoundry.sh/)
- A GitHub OAuth App
- A funded Arc Testnet wallet (testnet USDC from https://faucet.circle.com)

### Smart contracts

```bash
cd contracts
forge build
forge test
```

Copy `.env.example` to `.env`:

| Variable | Description |
|---|---|
| `PRIVATE_KEY` | Funded Arc Testnet deployer key, `0x`-prefixed |
| `USDC_ADDRESS` | Arc Testnet USDC address (has a default) |
| `ARCSCAN_API_KEY` | Unused currently |

Deploy and verify:

```bash
forge script script/Deploy.s.sol --rpc-url arc_testnet --broadcast

forge verify-contract <DEPLOYED_ADDRESS> src/FreelanceEscrow.sol:FreelanceEscrow \
  --chain 5042002 \
  --verifier blockscout \
  --verifier-url https://testnet.arcscan.app/api \
  --constructor-args $(cast abi-encode "constructor(address)" <USDC_ADDRESS>) \
  --watch
```

### Backend

```bash
cd backend
npm install
```

Configure `backend/.env`:

| Variable | Description |
|---|---|
| `DATABASE_URL` | Postgres connection string |
| `ESCROW_ADDRESS` | Deployed `FreelanceEscrow` address |
| `ARC_RPC_URL` | Arc Testnet RPC (has a default) |
| `ARC_POLLING_INTERVAL_MS` | Event-log polling interval (has a default) |
| `ESCROW_DEPLOY_BLOCK` | Block to start the event backfill from |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` / `GITHUB_OAUTH_CALLBACK_URL` | GitHub OAuth App credentials |
| `PORT` | API port (has a default) |

```bash
npx prisma migrate deploy
npm run start:dev
```

### Testing

```bash
cd backend && npm test && npm run test:e2e
cd contracts && forge test
```

## Long-term vision

The hackathon submission is the foundation for a broader financial and reputation layer
for independent developers: grant and sponsorship verification, hackathon reward
tracking, additional bounty platforms, AI project/milestone generation, AI financial and
career insights, privacy-preserving reputation proofs (zero-knowledge statements like
"earned more than $10,000"), and portable credentials usable by clients, employers,
DAOs, grant programs, and financial platforms.

Instead of asking developers to repeatedly claim what they've done, FreelanceTrail
builds infrastructure that helps them prove it — connecting work to contributions,
contributions to rewards, rewards to payments, and payments to blockchain proof, with AI
turning that verified history into intelligence for both developers and clients.
