//#region node_modules/.nitro/vite/services/ssr/assets/prompt-Bj47jeD1.js
var ZOMBIE_HUG_PRESET = "zombie-hug";
var ZOMBIE_HUG_MODE = "motion-transfer";
var ZOMBIE_HUG_RESOLUTIONS = [
	"480p",
	"720p",
	"1080p"
];
var ZOMBIE_HUG_DEFAULT_RESOLUTION = "720p";
var ZOMBIE_HUG_ASPECT_RATIOS = ["16:9", "9:16"];
var ZOMBIE_HUG_DEFAULT_ASPECT_RATIO = "16:9";
function getZombieHugTemplateDurationSeconds(aspectRatio = ZOMBIE_HUG_DEFAULT_ASPECT_RATIO) {
	return aspectRatio === "9:16" ? 20 : 24;
}
function isZombieHugResolution(value) {
	return typeof value === "string" && ZOMBIE_HUG_RESOLUTIONS.includes(value);
}
function isZombieHugAspectRatio(value) {
	return typeof value === "string" && ZOMBIE_HUG_ASPECT_RATIOS.includes(value);
}
var ZOMBIE_HUG_PROMPT = `Replace the gun-holding character in all relevant shots with the person from @image1.
Replace the second main character with the person from @image2, but with two different states depending on the scene:

State rules for @image2:
- In the earlier shots, @image2 should appear as an infected zombie version of the same person.
- In the later shots, @image2 should transition into the normal healthy human version of the same person.
- The zombie version and the human version must clearly be the same person, with consistent facial identity, hairstyle, and overall likeness.

Character mapping:
- @image1 = survivor / gun holder
- @image2 = infected loved one in the early shots, then restored human in the later shots`;
var ZOMBIE_HUG_PUBLIC_TEMPLATE_PATH = "/videos/zombie-hug-tpl.mp4";
var ZOMBIE_HUG_PUBLIC_TEMPLATE_PATH_9X16 = "/videos/zombie-hug-tpl-9x16.mp4";
function getZombieHugPublicTemplatePath(aspectRatio = ZOMBIE_HUG_DEFAULT_ASPECT_RATIO) {
	return aspectRatio === "9:16" ? ZOMBIE_HUG_PUBLIC_TEMPLATE_PATH_9X16 : ZOMBIE_HUG_PUBLIC_TEMPLATE_PATH;
}
//#endregion
export { ZOMBIE_HUG_PRESET as a, getZombieHugPublicTemplatePath as c, isZombieHugResolution as d, ZOMBIE_HUG_MODE as i, getZombieHugTemplateDurationSeconds as l, ZOMBIE_HUG_DEFAULT_ASPECT_RATIO as n, ZOMBIE_HUG_PROMPT as o, ZOMBIE_HUG_DEFAULT_RESOLUTION as r, ZOMBIE_HUG_RESOLUTIONS as s, ZOMBIE_HUG_ASPECT_RATIOS as t, isZombieHugAspectRatio as u };
