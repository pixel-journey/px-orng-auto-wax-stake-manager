# Worked examples — auto WAX stake for free credits

## Shortfall

Free 3, need 1 or 3 → shortfall 0. Free 1, need 3 → shortfall 2.

## planAutoStake

Enough free → `enough_free`. Free 0 + paid 2 → `enough_paid`.

Empty state, need 1 → `needStake` 1n, `projectedFree` 1, unsigned stake `sent:false`, `to: orng.wax`, memo `stake`.

Need 5 → needStake 5n, projectedFree 5.

## Lifecycle

`ensureCredits(need 2)` → pendingStake 2n, staked still 0.

`applyStakeCredit(3n)` → staked 3, freeCredits 3.

Pending 4 then credit 4 → pending 0, staked 4.

Zero amounts and bad dapp refused.
