# Auto-stake WAX when free RNG credits run out

> **Domain:** WAX ORNG — self-stake for free credits  
> **Catalog:** [px-contract-examples-vault](https://github.com/pixel-journey/px-contract-examples-vault)  
> **Path:** [ORNG-LEARNING-PATH.md](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/ORNG-LEARNING-PATH.md)

**Goal:** If free credits cover the need, do nothing. If paid credits cover the gap, do nothing. Otherwise stage an **unsent** transfer to `orng.wax` with memo `stake` for the shortfall. Applying a stake credit raises `staked` and `freeCredits`.

**Code under test:** `npm test`. No live `orng.wax`, no wasm, no broadcast.

**Official:** [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng). **Sample:** [RNG tutorial](https://docs.wax.io/build/tutorials/create-wax-rng-smart-contract/rng_sample).

```bash
npm test
```

MIT — Pixel Journey
