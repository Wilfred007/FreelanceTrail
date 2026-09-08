# FreelanceTrail Subgraph

Indexes `FreelanceEscrow`'s events on Arc Testnet via The Graph, so the backend can poll
a GraphQL endpoint instead of Arc's rate-limited public RPC directly. Deliberately
minimal: one immutable entity per raw event, no cross-entity logic — all the real
business logic (Users, Projects, Milestones, Payments) stays in the NestJS backend,
which replays these events through its existing handlers.

## Setup

```bash
npm install
npm run codegen   # generates generated/ from subgraph.yaml + schema.graphql + ABI
npm run build     # compiles the AssemblyScript mapping to WASM, validates everything
```

## Deploy (requires a Graph Studio account — this can't be done for you)

1. Go to [thegraph.com/studio](https://thegraph.com/studio) and connect a wallet.
2. Create a new subgraph, targeting **Arc Testnet**. Note its slug and deploy key.
3. Authenticate the CLI:
   ```bash
   npx graph auth <DEPLOY_KEY>
   ```
4. Deploy:
   ```bash
   npx graph deploy <SUBGRAPH_SLUG>
   ```
   You'll be prompted for a version label (e.g. `v0.0.1`).
5. Wait for initial indexing to finish (Graph Studio's dashboard shows sync progress) —
   this covers the full history from `startBlock` (`60440102`) once, using The Graph's
   own indexing infrastructure rather than our rate-limited chunked RPC polling.
6. Copy the deployed subgraph's **Query URL** from the Studio dashboard (looks like
   `https://api.studio.thegraph.com/query/<id>/<slug>/<version>`) and set it as
   `GRAPH_API_URL` in `backend/.env`.

## Redeploying after a contract/event change

If `FreelanceEscrow.sol` changes, re-extract its ABI to `abis/FreelanceEscrow.json`,
update `subgraph.yaml`'s event signatures if they changed, update `schema.graphql` and
`src/mapping.ts` to match, then re-run `codegen`, `build`, and `deploy`.
