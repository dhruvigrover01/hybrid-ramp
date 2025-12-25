# Hybrid Ramp — Institutional Crypto UX (HybridRampX)

Hybrid Ramp is a React + TypeScript demo application that demonstrates an institutional-grade crypto trading experience with a Smart Execution Engine, optional on-chain settlement (testnet ERC-20), Crypto Index / Basket investing, and a crypto-backed lending simulation.

This repository is a frontend prototype (Vite) that includes simulated routing, Zustand stores, and optional on-chain helpers using ethers.js for browser wallets.

**Repository:** [hybrid-ramp](README.md)

---

## Problem Statement

Building institutional-grade crypto flows is complex: you need to route orders across liquidity sources, handle settlement and custody (on-chain or off-chain), provide composite investment products (baskets/indexes), and support lending primitives while protecting against liquidation risk. This project demonstrates a compact, front-end-first approach to these features so designers and engineers can iterate on UX and integration patterns.

## Solution Overview

- Smart Execution Engine: client-side simulation of instant vs. routed execution. Small orders settle instantly; large orders are chunked and routed across simulated liquidity sources to reduce slippage.
- On-chain Settlement (optional): integrate with a testnet ERC-20 contract to mint/transfer tokens for settlement and track transactions via explorer links.
- Crypto Index / Basket: create fund-like baskets that split investments across multiple assets and optionally mint a fund-token representing NAV shares.
- Crypto-Backed Lending (simulation): allow users to lock crypto as collateral, borrow against it with LTV rules, accrue interest, and simulate warnings & liquidation.

## Features

- Smart order routing (instant vs. smart-routing)
- On-chain helpers using `ethers` (mint, transfer, explorer link)
- Institutional Trade modal and execution log
- Fund / Basket investing and optional fund-token minting
- Loans store and borrow/repay flow with LTV checks and simulated liquidation
- Zustand state stores with persistence
- Tailwind + shadcn-ui components

## Architecture & Key Files

- Frontend: React + Vite (TypeScript)
- State: `zustand` stores in `src/store`
- On-chain helpers: `src/lib/onchain.ts`
- Smart execution logic: `src/lib/smartExecution.ts`
- UI: `src/components` (Dashboard, Modals, QuickActions)
- Pages: `src/pages` (Dashboard, Wallet, Transactions)

See these entry points:

- Dashboard page: [src/pages/Dashboard.tsx](src/pages/Dashboard.tsx#L1)
- Smart execution: [src/lib/smartExecution.ts](src/lib/smartExecution.ts#L1)
- On-chain helpers: [src/lib/onchain.ts](src/lib/onchain.ts#L1)
- Funds store: [src/store/fundsStore.ts](src/store/fundsStore.ts#L1)
- Loans store: [src/store/loansStore.ts](src/store/loansStore.ts#L1)

---

## Setup (Local Development)

Prerequisites
- Node.js (16+) and npm or bun
- A browser wallet (e.g., MetaMask) for on-chain interactions (testnet)

Install dependencies and run dev server:

```bash
cd hybrid-ramp
npm install
npm run dev
```

Open the app in your browser and go to the dashboard.

---

## Environment Variables

Create a `.env` or set Vite env vars (prefix `VITE_`) for optional on-chain flows and behavior tuning:

- `VITE_ERC20_ADDRESS` — ERC-20 contract address on the target testnet (optional)
- `VITE_EXPLORER_URL` — Base URL for the blockchain explorer (e.g., https://sepolia.etherscan.io/tx/)
- `VITE_FUND_TOKEN_ADDRESS` — Optional fund token contract address
- `VITE_INSTITUTIONAL_THRESHOLD` — USD threshold above which smart routing is used (default defined in code)

If you don't set these, the app will run in fully simulated mode without real on-chain transactions.

---

## Usage Notes

- Connect a browser wallet via the Wallet modal to enable on-chain settlement.
- Use the Institutional Trade modal for large order simulations.
- Use the Fund Invest modal to create or invest in a basket; enable the on-chain option to mint fund tokens if configured.
- Use the Borrow modal to request loans; the loans store persists simulated loans and collateral state.

---

## Development Notes

- State stores are in `src/store` and use `zustand` with a `persist` middleware.
- The smart execution engine (`src/lib/smartExecution.ts`) is intentionally a client-side simulation — replace with server-side routings and real liquidity APIs for production.
- On-chain contract calls (mint/transfer) in `src/lib/onchain.ts` assume ERC-20 mint function exists on the target contract — adjust ABI and flows for your contract.

### Common troubleshooting

- Blank screen / Vite overlay: check the browser console and terminal for TypeScript/parse errors. Fix duplicate exports and stray fragments in store files (e.g. `src/store/loansStore.ts`).
- Ethers errors: ensure `VITE_ERC20_ADDRESS` is set and your wallet is connected to the same testnet.

---

## Testing

This repo is a UI prototype. For unit tests, add a test runner such as Vitest or Jest and test key store logic (execution engine, funds allocation, loan calculations).

---

## Roadmap / TODOs

- Integrate server-side smart routing & aggregator (real DEXs / market makers)
- Implement proper on-chain custody and approval flows
- Add performance/load tests for routing logic
- Persist on-chain transaction history in a dedicated transactions store
- Add CI, tests, and deployment automation

---

## Contributing

Contributions welcome. To contribute:

1. Fork the repo
2. Create a feature branch
3. Add tests for new behavior
4. Open a pull request with a clear description

---

## License

This project is provided as a demo. Add a license file (e.g., MIT) if you intend to open source or reuse the code commercially.

---

If you'd like, I can:

- Expand the README with sample screenshots or GIFs showing the modals.
- Add a `DEVELOPMENT.md` with detailed dev and debugging steps.
- Add automated tests for the `useLoansStore` and `smartExecution` logic.

Tell me which additions you want and I'll add them.

# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
