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

## Intermediate

| State | need | Result |
| --- | --- | --- |
| free 2 | 1 | enough_free |
| free 0, paid 2 | 1 | enough_paid |
| empty | 1 | ok, needStake 1, projectedFree 1 |
| empty | 5 | needStake 5, projectedFree 5 |

Successful plan: unsent transfer `to orng.wax`, memo `stake`.

## Masterclass

`ensureCredits` stages **pendingStake** without raising `staked` yet. `applyStakeCredit` raises staked and free, and clears matching pending. Production must only apply credit when the stake is confirmed by oracle/accounting rules — this lab is the bookkeeping sketch.

Zero amounts and bad dapp names refused.

Numbers: [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md).
