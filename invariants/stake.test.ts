import assert from "node:assert/strict";
import test from "node:test";
import {
  applyStakeCredit,
  emptyState,
  ensureCredits,
  freeShortfall,
  planAutoStake,
  stagePending,
} from "./stake.ts";

const DAPP = "pxrngdapp";

test("free shortfall is zero when free covers need", () => {
  const s = { ...emptyState(DAPP), freeCredits: 3 };
  assert.equal(freeShortfall(s, 1), 0);
  assert.equal(freeShortfall(s, 3), 0);
});

test("free shortfall counts the gap", () => {
  const s = { ...emptyState(DAPP), freeCredits: 1 };
  assert.equal(freeShortfall(s, 3), 2);
});

test("plan skips stake when free is enough", () => {
  const s = { ...emptyState(DAPP), freeCredits: 2 };
  const p = planAutoStake(s, { need: 1 });
  assert.equal(p.ok, false);
  if (!p.ok) assert.equal(p.reason, "enough_free");
});

test("plan skips stake when paid covers the gap", () => {
  const s = { ...emptyState(DAPP), freeCredits: 0, paidCredits: 2 };
  const p = planAutoStake(s, { need: 1 });
  assert.equal(p.ok, false);
  if (!p.ok) assert.equal(p.reason, "enough_paid");
});

test("plan stakes the shortfall when both empty", () => {
  const s = emptyState(DAPP);
  const p = planAutoStake(s, { need: 1 });
  assert.equal(p.ok, true);
  if (p.ok) {
    assert.equal(p.needStake, 1n);
    assert.equal(p.projectedFree, 1);
    assert.equal(p.unsignedStake.sent, false);
    assert.equal(p.unsignedStake.to, "orng.wax");
    assert.equal(p.unsignedStake.memo, "stake");
  }
});

test("plan stakes multiple units for larger need", () => {
  const s = emptyState(DAPP);
  const p = planAutoStake(s, { need: 5 });
  assert.equal(p.ok, true);
  if (p.ok) {
    assert.equal(p.needStake, 5n);
    assert.equal(p.projectedFree, 5);
  }
});

test("ensureCredits stages pending stake", () => {
  const s = emptyState(DAPP);
  const { plan, state } = ensureCredits(s, 2);
  assert.equal(plan.ok, true);
  assert.equal(state.pendingStake, 2n);
  assert.equal(state.staked, 0n);
});

test("applyStakeCredit raises staked and free", () => {
  const s = emptyState(DAPP);
  const next = applyStakeCredit(s, 3n);
  assert.equal(next.staked, 3n);
  assert.equal(next.freeCredits, 3);
});

test("applyStakeCredit clears matching pending", () => {
  let s = stagePending(emptyState(DAPP), 4n);
  s = applyStakeCredit(s, 4n);
  assert.equal(s.pendingStake, 0n);
  assert.equal(s.staked, 4n);
});

test("overflow and bad amounts refused", () => {
  const s = emptyState(DAPP);
  assert.throws(() => applyStakeCredit(s, 0n), /bad amount/);
  assert.throws(() => stagePending(s, 0n), /bad amount/);
  assert.throws(() => emptyState("Bad"), /bad dapp/);
});
