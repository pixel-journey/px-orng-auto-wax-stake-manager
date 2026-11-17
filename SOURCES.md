# Sources

| Source | Use |
| --- | --- |
| [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng) | Stake-for-credits behavior |
| [RNG tutorial](https://docs.wax.io/build/tutorials/create-wax-rng-smart-contract/rng_sample) | Sample dapp path |
| [docs.wax.io](https://docs.wax.io/) | WAX system actions |
| [docs.eosnetwork.com](https://docs.eosnetwork.com/) | Resource vs token stake vocabulary |

**Funding order for one call:** free → paid → top-up → **stake** (this lab). Do not charge all paths. Stake is **not** CPU powerup.

This repository does not call `orng.wax` or `eosio::powerup`.

## Related labs

| Lab | Topic |
| --- | --- |
| [credit bucket](https://github.com/pixel-journey/px-orng-credit-bucket-monitor) | Free then paid gate |
| [pay-per-use](https://github.com/pixel-journey/px-orng-pay-per-use-topup-vault) | 0.01 WAX per missing call |
| [CPU powerup](https://github.com/pixel-journey/px-cpu-eosio-powerup-sponsor-pool) | Different system action |
| [v3 starter](https://github.com/pixel-journey/px-orng-v3-randnotify-starter) | Job table after credits pass |
| [ORNG path](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/ORNG-LEARNING-PATH.md) | Curriculum + funding cheatsheet |
