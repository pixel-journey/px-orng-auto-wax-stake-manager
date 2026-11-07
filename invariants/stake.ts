/**
 * Auto-stake WAX for free RNG when adaptive free credits are exhausted (educational).
 * No live orng.wax. No wasm. No broadcast.
 */

export const MIN_STAKE = 1n;
export const MAX_STAKE = 1_000_000_00000000n;
export const FREE_CREDITS_PER_STAKE_UNIT = 1;
export const MAX_CREDITS = 1_000_000;

export type StakeState = {
  dapp: string;
  staked: bigint;
  freeCredits: number;
  paidCredits: number;
  pendingStake: bigint;
};

export type StakePlan =
  | {
      ok: true;
      needStake: bigint;
      projectedFree: number;
      unsignedStake: { to: "orng.wax"; amount: bigint; memo: string; sent: false };
    }
  | { ok: false; reason: "enough_free" | "enough_paid" | "bad_amount" | "overflow" };

const NAME = /^[a-z1-5.]{1,12}$/;

function assertName(name: string): void {
  if (!NAME.test(name) || name.startsWith(".") || name.endsWith(".")) {
    throw new Error("bad dapp");
  }
}

export function emptyState(dapp: string): StakeState {
  assertName(dapp);
  return {
    dapp,
    staked: 0n,
    freeCredits: 0,
    paidCredits: 0,
    pendingStake: 0n,
  };
}

export function freeShortfall(state: StakeState, need = 1): number {
  if (!Number.isInteger(need) || need < 1 || need > 32) throw new Error("bad need");
  if (state.freeCredits >= need) return 0;
  return need - state.freeCredits;
}

export function planAutoStake(
  state: StakeState,
  input: { need?: number } = {},
): StakePlan {
  const need = input.need ?? 1;
  if (!Number.isInteger(need) || need < 1 || need > 32) {
    return { ok: false, reason: "bad_amount" };
  }
  if (state.freeCredits >= need) {
    return { ok: false, reason: "enough_free" };
  }
  if (state.paidCredits >= need - state.freeCredits) {
    return { ok: false, reason: "enough_paid" };
  }
  const shortfall = freeShortfall(state, need);
  const needStake = BigInt(shortfall);
  if (needStake < MIN_STAKE) return { ok: false, reason: "bad_amount" };
  const nextStaked = state.staked + needStake + state.pendingStake;
  if (nextStaked > MAX_STAKE) return { ok: false, reason: "overflow" };
  const projectedFree = Math.min(
    MAX_CREDITS,
    state.freeCredits + Number(needStake) * FREE_CREDITS_PER_STAKE_UNIT,
  );
  return {
    ok: true,
    needStake,
    projectedFree,
    unsignedStake: {
      to: "orng.wax",
      amount: needStake,
      memo: "stake",
      sent: false,
    },
  };
}

export function applyStakeCredit(state: StakeState, amount: bigint): StakeState {
  if (amount < MIN_STAKE || amount > MAX_STAKE) throw new Error("bad amount");
  const nextStaked = state.staked + amount;
  if (nextStaked > MAX_STAKE) throw new Error("overflow");
  const add = Number(amount) * FREE_CREDITS_PER_STAKE_UNIT;
  if (!Number.isSafeInteger(add)) throw new Error("unsafe credits");
  const freeCredits = Math.min(MAX_CREDITS, state.freeCredits + add);
  return {
    ...state,
    staked: nextStaked,
    freeCredits,
    pendingStake: state.pendingStake > amount ? state.pendingStake - amount : 0n,
  };
}

export function stagePending(state: StakeState, amount: bigint): StakeState {
  if (amount < MIN_STAKE) throw new Error("bad amount");
  const next = state.pendingStake + amount;
  if (state.staked + next > MAX_STAKE) throw new Error("overflow");
  return { ...state, pendingStake: next };
}

export function ensureCredits(
  state: StakeState,
  need = 1,
): { plan: StakePlan; state: StakeState } {
  const plan = planAutoStake(state, { need });
  if (!plan.ok) return { plan, state };
  return { plan, state: stagePending(state, plan.needStake) };
}
