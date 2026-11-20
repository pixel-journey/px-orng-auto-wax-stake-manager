# Education — auto-stake WAX for free ORNG credits

> **Rung:** `npm test` passes. Plans an **unsent** stake transfer to `orng.wax`. Does not stake on chain.  
> **The test is the rule.**

When free (and paid) credits cannot cover the next randomness need, compute the shortfall and stage a stake that is expected to restore **free** credits after settlement.

Siblings: [credit bucket](https://github.com/pixel-journey/px-orng-credit-bucket-monitor) · [pay-per-use](https://github.com/pixel-journey/px-orng-pay-per-use-topup-vault).

Official: [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng) · [RNG tutorial](https://docs.wax.io/build/tutorials/create-wax-rng-smart-contract/rng_sample).

## Learning outcomes

| Level | After this file |
| --- | --- |
| Beginner | freeShortfall when free < need |
| Intermediate | plan skips when free or paid cover need |
| Masterclass | pendingStake vs applyStakeCredit settlement |

---

## Beginner

free 3, need 1 or 3 → shortfall **0**. free 1, need 3 → shortfall **2**.

```bash
npm test
```

---

## Intermediate

| State | need | Result |
| --- | --- |
| free 2 | 1 | enough_free |
| free 0, paid 2 | 1 | enough_paid |
| empty | 1 | ok, needStake 1, projectedFree 1 |
| empty | 5 | needStake 5, projectedFree 5 |

Successful plan: unsent transfer `to orng.wax`, memo **`stake`** (not `deposit`).

### Attack → test

| Attack | Lab behavior |
| --- | --- |
| Stake while free covers need | skipped (`enough_free`) |
| Treat pending as already free | pending until applyStakeCredit |
| Confuse with pay-per-use memo | this lab memo is `stake` |
| Call powerup from ORNG path | different product |

---

## Masterclass

`ensureCredits` stages **pendingStake** without raising `staked` yet. `applyStakeCredit` raises staked and free, and clears matching pending. Production must only apply credit when the stake is confirmed by oracle/accounting rules — this lab is the bookkeeping sketch.

Zero amounts and bad dapp names refused.

### Funding order (do not charge all paths for one call)

1. **Free** credits (bucket)  
2. **Paid** credits (top-up vault)  
3. **Stake** (this lab) only for remaining shortfall  

Stake is not powerup. CPU rental is [px-cpu-eosio-powerup-sponsor-pool](https://github.com/pixel-journey/px-cpu-eosio-powerup-sponsor-pool).

### Common mistakes

1. Staking while free credits still cover the need.  
2. Treating pending stake as already credited free.  
3. Confusing this with pay-per-use (memo `deposit` vs `stake`).  
4. Calling system `powerup` from an ORNG funding path.

### Nice-to-have extensions (not in this repo)

| Idea | Note |
| --- | --- |
| Unstake when free is high | New settlement rules |
| Cap total staked | Risk / treasury policy |
| Live table read from orng.wax | Not this lab |

### Exercises

1. free 0, paid 0, need 3 — shortfall? (**3**.)  
2. Is the stake transfer sent in this lab? (`sent: false`)  
3. Preferred RNG service on WAX? (`orng.wax`)

Numbers: [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md) · [SECURITY](SECURITY.md) · [SOURCES](SOURCES.md).

---

## What this course will not teach

- Live stake to `orng.wax`
- That pending equals free credits
- CPU powerup economics
