import { i as calculateGenjutsuCredits } from "./pricing-C70Iy5jq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pricing-C7HhhK6N.js
/** Hotel Lobby product: Kling O3 standard video-to-video edit. */
var HOTEL_LOBBY_MODEL = "fal-ai/kling-video/o3/standard/video-to-video/edit";
/** Internal H3 lab still uses MiniMax H3 reference-to-video. */
var H3_LAB_MODEL = "minimax/h3/reference-to-video";
/**
* Fal published rate for Kling O3 standard V2V edit
* (https://fal.ai/models/fal-ai/kling-video/o3/standard/video-to-video/edit):
* $0.126 per second of generated video.
*/
var HOTEL_LOBBY_OUTPUT_RATE_USD_PER_SECOND = .126;
var HOTEL_LOBBY_MAX_VIDEO_EDGE_PX = 3840;
/**
* Fal OpenAPI `maxLength` for Kling O3 V2V edit prompt
* (https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/kling-video/o3/standard/video-to-video/edit).
*/
var HOTEL_LOBBY_MAX_PROMPT_LENGTH = 2500;
/**
* Billing / options placeholder — Kling O3 does not take a resolution
* parameter. Kept so reserved-task matching and admin tooling stay stable.
*/
var HOTEL_LOBBY_BILLING_RESOLUTION = "480P";
var H3_RESOLUTIONS = [
	"480P",
	"768P",
	"2K",
	"4K"
];
/** @deprecated Prefer H3_RESOLUTIONS — alias kept for lab + admin imports. */
var HOTEL_LOBBY_RESOLUTIONS = H3_RESOLUTIONS;
var HOTEL_LOBBY_ASPECT_RATIOS = [
	"adaptive",
	"21:9",
	"16:9",
	"4:3",
	"1:1",
	"3:4",
	"9:16"
];
/**
* Fal OpenAPI `maxLength` for `minimax/h3/reference-to-video` prompt
* (https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=minimax/h3/reference-to-video).
*/
var H3_MAX_PROMPT_LENGTH = 5e4;
/**
* Fal published rates for `minimax/h3/reference-to-video`
* (https://fal.ai/models/minimax/h3/reference-to-video):
* output $0.05/0.06/0.13/0.16 per second at 480P/768P/2K/4K;
* first 5 reference images free, then $0.08 each.
*/
var H3_OUTPUT_RATE_USD_PER_SECOND = {
	"480P": .05,
	"768P": .06,
	"2K": .13,
	"4K": .16
};
var H3_EXTRA_REFERENCE_IMAGE_USD = .08;
function assertHotelLobbyDuration(duration) {
	if (!Number.isInteger(duration) || duration < 3 || duration > 15) throw new Error(`Duration must be an integer between 3 and 15 seconds`);
}
function assertH3LabDuration(duration) {
	if (!Number.isInteger(duration) || duration < 5 || duration > 15) throw new Error(`Duration must be an integer between 5 and 15 seconds`);
}
function estimateHotelLobbyProviderCost(input) {
	assertHotelLobbyDuration(input.duration);
	const maxImages = input.maxImages ?? 2;
	if (!Number.isInteger(maxImages) || maxImages < 1 || maxImages > 2) throw new Error("Invalid max reference-image count");
	if (!Number.isInteger(input.imageCount) || input.imageCount < 1 || input.imageCount > maxImages) throw new Error(maxImages === 1 ? "Provide one reference image" : `Provide between 1 and ${maxImages} reference images`);
	return Number((input.duration * HOTEL_LOBBY_OUTPUT_RATE_USD_PER_SECOND).toFixed(6));
}
function estimateHotelLobbyCredits(input) {
	return calculateGenjutsuCredits(estimateHotelLobbyProviderCost({
		duration: input.duration,
		imageCount: input.imageCount,
		maxImages: input.maxImages
	}));
}
function estimateH3LabProviderCost(input) {
	assertH3LabDuration(input.duration);
	if (!H3_RESOLUTIONS.includes(input.resolution)) throw new Error("Unsupported MiniMax H3 resolution");
	if (!Number.isInteger(input.imageCount) || input.imageCount < 1 || input.imageCount > 9) throw new Error(`Provide between 1 and 9 reference images`);
	return input.duration * H3_OUTPUT_RATE_USD_PER_SECOND[input.resolution] + Math.max(0, input.imageCount - 5) * H3_EXTRA_REFERENCE_IMAGE_USD;
}
function estimateH3LabCredits(input) {
	return calculateGenjutsuCredits(estimateH3LabProviderCost(input));
}
//#endregion
export { HOTEL_LOBBY_MAX_PROMPT_LENGTH as a, HOTEL_LOBBY_RESOLUTIONS as c, estimateH3LabCredits as d, estimateH3LabProviderCost as f, HOTEL_LOBBY_BILLING_RESOLUTION as i, assertH3LabDuration as l, estimateHotelLobbyProviderCost as m, H3_MAX_PROMPT_LENGTH as n, HOTEL_LOBBY_MAX_VIDEO_EDGE_PX as o, estimateHotelLobbyCredits as p, HOTEL_LOBBY_ASPECT_RATIOS as r, HOTEL_LOBBY_MODEL as s, H3_LAB_MODEL as t, assertHotelLobbyDuration as u };
