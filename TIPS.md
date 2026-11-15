# Tips — auto-stake for free credits

## Do

- Stake only after free **and** paid paths cannot cover need.
- Keep pending stake distinct from confirmed staked until settlement.
- Document that free credit restoration rates are defined by the live ORNG service, not this lab.

## Don't

- Stake on every request while free credits remain.
- Treat projectedFree as already spendable before applyStakeCredit.
- Hard-code stake memos without checking current wax-orng docs.

## Related

[credit bucket](https://github.com/pixel-journey/px-orng-credit-bucket-monitor) · [pay-per-use](https://github.com/pixel-journey/px-orng-pay-per-use-topup-vault) · [ORNG path](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/ORNG-LEARNING-PATH.md)
