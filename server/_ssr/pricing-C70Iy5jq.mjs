//#region node_modules/.nitro/vite/services/ssr/assets/pricing-C70Iy5jq.js
var GENJUTSU_SMOKE_CREDIT_PACK = {
	id: "smoke",
	name: "Smoke",
	priceCents: 100,
	currency: "cny",
	credits: 50
};
function canSeeSmokeCreditPack(email) {
	return Boolean(email && email.toLowerCase().includes("gengliming"));
}
function listVisibleCreditPacks(email) {
	if (canSeeSmokeCreditPack(email)) return [...GENJUTSU_CREDIT_PACKS, GENJUTSU_SMOKE_CREDIT_PACK];
	return GENJUTSU_CREDIT_PACKS;
}
function getSmallestSufficientCreditPack(params) {
	const deficit = Math.max(0, params.requiredCredits - params.balance);
	if (deficit <= 0) return null;
	return [...listVisibleCreditPacks(params.email)].sort((a, b) => a.credits - b.credits || a.priceCents - b.priceCents).find((pack) => pack.credits >= deficit) ?? null;
}
var GENJUTSU_PROVIDER_COST_MULTIPLIER = 1.7;
/**
* Public Higgsfield Genjutsu list rates as of 2026-09-30.
*
* These are useful for UI/fallback estimates and tests only. Production
* generation charging uses Higgsfield POST /estimate/<model> with the exact
* generation body.
*/
var GENJUTSU_LIST_RATE_USD_PER_SECOND = {
	"480p": .318,
	"720p": .681,
	"1080p": 1.632
};
/**
* Seedance 2.5 video-reference list rates. Billing includes both the source
* video seconds and generated output seconds. Volcengine intentionally uses
* the same customer-facing quote while the provider-cost migration is active.
*/
var SEEDANCE_VIDEO_REFERENCE_RATE_USD_PER_BILLED_SECOND = {
	"480p": .15876,
	"720p": .34056,
	"1080p": .8377668
};
/** V2 public one-time credit packs. Keep previous paid orders as immutable snapshots. */
var GENJUTSU_CREDIT_PACKS = [
	{
		id: "mini",
		name: "Mini",
		priceCents: 999,
		credits: 600
	},
	{
		id: "starter",
		name: "Starter",
		priceCents: 1499,
		credits: 1100
	},
	{
		id: "creator",
		name: "Creator",
		priceCents: 4999,
		credits: 3900,
		highlighted: true
	},
	{
		id: "studio",
		name: "Studio",
		priceCents: 9999,
		credits: 8400
	}
];
function calculateGenjutsuCredits(providerCostUsd) {
	if (!Number.isFinite(providerCostUsd) || providerCostUsd <= 0) throw new Error("providerCostUsd must be a positive finite number");
	return Math.max(1, Math.ceil(providerCostUsd * 100 * GENJUTSU_PROVIDER_COST_MULTIPLIER));
}
function estimateGenjutsuListCost(input) {
	if (!Number.isFinite(input.durationSeconds) || input.durationSeconds <= 0) throw new Error("durationSeconds must be a positive finite number");
	return Math.min(30, Math.ceil(input.durationSeconds)) * GENJUTSU_LIST_RATE_USD_PER_SECOND[input.resolution];
}
function estimateGenjutsuCredits(input) {
	return calculateGenjutsuCredits(estimateGenjutsuListCost(input));
}
function estimateSeedanceListCost(input) {
	if (!Number.isFinite(input.durationSeconds) || input.durationSeconds <= 0) throw new Error("durationSeconds must be a positive finite number");
	const outputSeconds = Math.min(30, Math.max(4, input.durationSeconds));
	return (input.durationSeconds + outputSeconds) * SEEDANCE_VIDEO_REFERENCE_RATE_USD_PER_BILLED_SECOND[input.resolution];
}
function estimateSeedanceCredits(input) {
	return calculateGenjutsuCredits(estimateSeedanceListCost(input));
}
/** Approximate browser price only; reservation always quotes the server provider. */
function estimateGenjutsuCreditsForProvider(input) {
	return input.provider === "higgsfield" ? estimateGenjutsuCredits(input) : estimateSeedanceCredits(input);
}
//#endregion
export { canSeeSmokeCreditPack as a, estimateGenjutsuListCost as c, listVisibleCreditPacks as d, calculateGenjutsuCredits as i, estimateSeedanceListCost as l, GENJUTSU_SMOKE_CREDIT_PACK as n, estimateGenjutsuCredits as o, SEEDANCE_VIDEO_REFERENCE_RATE_USD_PER_BILLED_SECOND as r, estimateGenjutsuCreditsForProvider as s, GENJUTSU_CREDIT_PACKS as t, getSmallestSufficientCreditPack as u };
