# px-orng-auto-wax-stake-manager

> **Trust:** private educational lab (Tier B)  
> **Quest:** 011 — self-stake WAX for free RNG when free credits are exhausted  
> **Vault:** [px-contract-examples-vault](https://github.com/pixel-journey/px-contract-examples-vault)

If free credits cover the need, do nothing. If paid credits cover the gap, do nothing. Otherwise stage an **unsent** transfer to `orng.wax` with memo `stake` for the shortfall. Applying a stake credit raises `staked` and `freeCredits`.

**Real code:** `npm test`. No live `orng.wax`, no wasm, no broadcast.

## Run

```bash
npm test
```

MIT — Pixel Journey
