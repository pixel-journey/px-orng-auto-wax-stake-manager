# Tips — stake WAX only after cheaper credits fail

Stake is the **last** funding step: free credits, then paid credits, then stake. Staking while free credits remain wastes WAX and confuses the audit.

## Do

- Keep **pending** stake distinct from **confirmed** staked until a settlement step you can name.
- Treat `projectedFree` as a forecast. It is not spendable until `applyStakeCredit` (or the live oracle) says so.
- Document that the real free-credit rate is defined by `orng.wax`, not by this file.

## Don't

- Stake on every request.
- Spend projected credits before they are applied.
- Hard-code stake memos without checking current [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng) docs.

## Common mistakes

1. Using the staked balance as if it were already oracle credits.
2. Unstaking in the same action you needed the credits for, before the oracle's window.
3. Mixing this with CPU `powerup` ([sponsor pool](https://github.com/pixel-journey/px-cpu-eosio-powerup-sponsor-pool)). ORNG stake and CPU powerup are different system actions.
4. Letting one user stake the whole vault with no per-account cap.

## Nice-to-have extensions (not in this repo)

| Idea | Note |
| --- | --- |
| Cooldown before unstake | Kit time/cooldown modules |
| Partial unstake | New tests for remaining projected credits |
| Pause | [pausable guard](https://github.com/pixel-journey/px-token-pausable-emergency-guard) |

Related: [credit bucket](https://github.com/pixel-journey/px-orng-credit-bucket-monitor) · [pay-per-use](https://github.com/pixel-journey/px-orng-pay-per-use-topup-vault) · [ORNG path](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/ORNG-LEARNING-PATH.md)
