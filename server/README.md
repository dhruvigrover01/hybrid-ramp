# hybrid-ramp Server (Demo)

This is a small Express-based demo backend used by the Hybrid Ramp frontend to:

- Provide liquidity quotes and routing suggestions (`/api/quote`, `/api/route-order`)
- Execute basket allocations (`/api/execute-basket`)
- Index simulated transactions (`/api/txs`)
- Simulate KYC verification (`/api/kyc`)

This server is intentionally minimal and uses an in-memory store for demo purposes.

Quick start:

```bash
cd server
npm install
npm start
```

Environment variables (optional):

- `RELAYER_PRIVATE_KEY` — if set along with `RPC_URL` and `ERC20_ABI`, the server will attempt real on-chain settlement using the relayer key.
- `RPC_URL` — JSON-RPC endpoint for the chain used by the relayer.
- `ERC20_ABI` — stringified ERC20 ABI if on-chain interactions are desired.
- `INSTITUTIONAL_THRESHOLD` — threshold USD for smart routing (default 5000)

API endpoints:
- `GET /api/health` — health check
- `POST /api/quote` { amountUsd } — returns liquidity sources
- `POST /api/route-order` { tokenAddress, amountUsd, recipient, doOnChain } — returns execution plan and tx hashes
- `POST /api/execute-basket` { allocations, totalUsd, fundTokenAddress, recipient, doOnChain } — execute basket
- `GET /api/txs` — list recorded txs
- `POST /api/kyc` { userId } — returns simulated KYC tier

Note: This is a demo server for local development; do not use the included relayer pattern in production without proper security.

## Relayer / On-chain settlement

The server can optionally act as a relayer to submit on-chain settlement transactions using a server-side private key. This enables scenarios where the server pays gas or performs meta-transactions for users.

To enable real on-chain settlement set these environment variables (see `.env.example`):

- `RELAYER_PRIVATE_KEY` — Private key used by the server to sign transactions (keep secret).
- `RPC_URL` — JSON-RPC endpoint for the target network (e.g., Infura/Alchemy).
- `ERC20_ABI` — Stringified ERC-20 ABI that includes `mint` or `transfer`.
- `ERC20_ADDRESS` — Optional default ERC-20 contract address used by the server.

Example usage (demo script included):

```bash
cd server
# populate .env with the variables above
node relayer-example.js
```

Security note: this relayer pattern is for development only. Protect private keys using vaults or environment secrets in production.
