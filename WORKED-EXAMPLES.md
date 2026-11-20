# Worked examples — auto WAX stake for free credits

Dapp `pxrngdapp`.

## freeShortfall

| free | need | shortfall |
| --- | --- | --- |
| 3 | 1 | **0** |
| 3 | 3 | **0** |
| 1 | 3 | **2** |

## planAutoStake

| State | need | Result |
| --- | --- | --- |
| free 2 | 1 | `enough_free` |
| free 0, paid 2 | 1 | `enough_paid` |
| empty | 1 | ok, needStake **1**, projectedFree **1** |
| empty | 5 | needStake **5**, projectedFree **5** |

Successful plan builds **unsent** transfer: `to orng.wax`, memo **`stake`** (not `deposit`).

## ensure / apply

| Step | Effect |
| --- | --- |
| `ensureCredits(s, 2)` | pendingStake **2**, staked still **0** |
| `applyStakeCredit(s, 3)` | staked **3**, freeCredits **3** |
| pending 4 then apply 4 | pending **0**, staked **4** |

Zero amounts and bad dapp name refused.

## Product facts

- **Pending ≠ free** until `applyStakeCredit`.
- Funding order for one randomness need: **free → paid → stake** (do not charge all paths).
- Stake memo is `stake`; pay-per-use is a different product (`deposit`).
- Stake is **not** CPU powerup ([sponsor pool](https://github.com/pixel-journey/px-cpu-eosio-powerup-sponsor-pool)).
- No live stake to `orng.wax` in this lab — planning only.
