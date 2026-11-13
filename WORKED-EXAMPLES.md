# Worked examples — auto-stake

## Example A — enough free

freeCredits ≥ need → plan `enough_free`.

## Example B — enough paid

Gap covered by paidCredits → `enough_paid`.

## Example C — shortfall

need 3, free 0, paid 0 → needStake 3n, unsigned stake memo `stake`.

## Example D — stage then apply

`ensureCredits` stages pending; `applyStakeCredit(3n)` increases staked and freeCredits, clears pending.

## Example E — overflow

staked + pending + need > MAX_STAKE → `overflow`.
