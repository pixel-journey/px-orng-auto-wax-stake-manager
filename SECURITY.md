# Security — auto-stake manager

## Closed in tests

| Issue | Behavior |
| --- | --- |
| Stake while free/paid enough | plan skipped |
| Zero stake amount | refused |
| Bad dapp name | refused |
| pending cleared only on matching apply | tested |

## Not closed

| Concern | Guidance |
| --- | --- |
| Live stake economics | Confirm with current orng.wax |
| Who can trigger stake | Auth on the funding account |
| Double-apply credit | Idempotent settlement required on chain |

Unsent plans only in this repository.
