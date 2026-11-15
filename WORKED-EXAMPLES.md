# Worked examples — auto WAX stake for free credits

Dapp `pxrngdapp`.

## freeShortfall

free 3, need 1 or 3 → **0**. free 1, need 3 → **2**.

## planAutoStake

| State | need | Result |
| --- | --- | --- |
| free 2 | 1 | `enough_free` |
| free 0, paid 2 | 1 | `enough_paid` |
| empty | 1 | ok, needStake **1**, projectedFree **1** |
| empty | 5 | needStake **5**, projectedFree **5** |

Successful plan builds **unsent** transfer: `to orng.wax`, memo `stake`.

## ensure / apply

`ensureCredits(s, 2)` → pendingStake **2**, staked still 0.
`applyStakeCredit(s, 3)` → staked **3**, freeCredits **3**.
Pending 4 then apply 4 → pending **0**, staked **4**.

Zero amounts and bad dapp name refused.

No live stake to orng.wax — planning only.
