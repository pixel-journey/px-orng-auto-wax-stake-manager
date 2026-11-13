# Auto-stake WAX when free RNG credits run out

> **Domain:** WAX ORNG — self-stake for free credits  
> **Sources:** [SOURCES.md](SOURCES.md)  
> **Path:** [ORNG-LEARNING-PATH.md](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/ORNG-LEARNING-PATH.md)

**Goal:** If free or paid credits cover the need, do nothing. Otherwise stage an **unsent** transfer to `orng.wax` with memo `stake`. Applying a stake credit raises `staked` and `freeCredits` in the model.

**Code under test:** `npm test`. No broadcast. Live ratios come from the oracle service, not this simplified unit mapping.

**Official:** [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng).

## Learning materials

| Doc | Role |
| --- | --- |
| [EDUCATION.md](EDUCATION.md) | Beginner → masterclass |
| [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md) | Shortfall, stage, apply |
| [TIPS.md](TIPS.md) | Stake vs pay-per-call |
| [SECURITY.md](SECURITY.md) | Overflow |
| [SOURCES.md](SOURCES.md) | Official |

```bash
npm test
```

MIT — Pixel Journey
