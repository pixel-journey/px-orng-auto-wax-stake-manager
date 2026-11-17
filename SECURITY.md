# Security — auto-stake manager

## Closed in tests

| Issue | Behavior |
| --- | --- |
| Stake while free/paid enough | plan skipped |
| Zero stake amount | refused |
| Bad dapp name | refused |
| pending cleared only on matching apply | tested |

Stake is the **last** funding step after free credits and paid top-up. Bodies are unsent.

## Not closed (production)

| Concern | Guidance |
| --- | --- |
| Live stake economics | Confirm with current [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng) |
| Who can trigger stake | Auth on the funding account |
| Double-apply credit | Idempotent settlement required on chain |
| Memo | Teaching string vs live oracle memo |
| Broadcast | Unsent plan is not a settled stake |

## Attack angles

1. Staking while free or paid credits still cover the call (wastes WAX).  
2. Charging free + topup + stake for one call (funding order: free → paid → topup → stake).  
3. Confusing this with [CPU powerup](https://github.com/pixel-journey/px-cpu-eosio-powerup-sponsor-pool) (different system action).  
4. Treating planned stake as already credited (`sent: false`).  
5. Applying a stake receipt to the wrong dapp / pending amount.

## Honesty limits

Unsent plans only. No `orng.wax` and no `eosio::powerup`. Related: [credit bucket](https://github.com/pixel-journey/px-orng-credit-bucket-monitor) · [pay-per-use](https://github.com/pixel-journey/px-orng-pay-per-use-topup-vault) · [ORNG path](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/ORNG-LEARNING-PATH.md).
