# Education — auto-stake for free credits

> **Rung:** `npm test` passes. Teaching **policy**: stake only when free and paid credits cannot cover the next requests.  
> Live stake rules belong to [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng).

## What you should be able to do

| Level | Skill |
| --- | --- |
| Beginner | Free first, paid second, stake last |
| Intermediate | Stage pending stake without broadcasting |
| Masterclass | applyStakeCredit raises free credits after a real stake settles |

## Beginner

`planAutoStake` returns `enough_free` or `enough_paid` when no stake is required. Otherwise it computes `needStake` and an unsent `{ to: orng.wax, memo: "stake", sent: false }` body.

## Intermediate

`ensureCredits` may `stagePending` so the dapp remembers intent. `applyStakeCredit` is the educational stand-in for “oracle confirmed stake.”

## Masterclass

Do not invent mainnet conversion rates from this lab’s `FREE_CREDITS_PER_STAKE_UNIT = 1` — that is a simplified teaching ratio. Always verify live oracle economics.

## Will not teach

Live CPU/NET staking, unstake delays, or broadcast paths.
