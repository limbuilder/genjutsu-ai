import { r as deLocalizeHref } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/redirect-BuZ_SNMV.js
/**
* Post-auth / post-payment redirect helpers.
*
* Two kinds of "come back here afterwards" targets flow through the auth pages:
*
* - **Internal paths** (`/chat`, `/settings/billing`) — the normal web case.
*   Navigated to directly. Must stay same-origin, or a crafted `?callbackUrl=`
*   turns sign-in into an open redirect.
* - **App protocol URLs** (`myapp://auth/callback`) — a desktop/mobile client
*   handing off a signed-in session. Those cannot be a better-auth
*   `callbackURL`, so they detour through the `/auth-callback` page, which
*   attaches the session token. Only schemes the admin allow-lists are honored.
*/
var AUTH_PATH_RE = /^\/(sign-in|sign-up|verify-email|forgot-password|reset-password|auth-callback)(\/|\?|#|$)/;
/**
* Normalize a redirect target to a same-origin path (`/foo?a=1#b`), or null if
* it points elsewhere / at an auth page. Absolute URLs on this origin are
* accepted and reduced to their path.
*/
function safeInternalPath(input) {
	if (!input) return null;
	let path = input;
	if (!path.startsWith("/") || path.startsWith("//")) {
		const origin = typeof window !== "undefined" ? window.location.origin : "";
		if (!origin) return null;
		try {
			const url = new URL(path, origin);
			if (url.origin !== origin) return null;
			path = url.pathname + url.search + url.hash;
		} catch {
			return null;
		}
	}
	return AUTH_PATH_RE.test(path) ? null : path;
}
var UNSAFE_SCHEMES = [
	"javascript",
	"data",
	"vbscript",
	"blob",
	"file"
];
/** `myapp://auth/callback` → true. `https://…`, `/chat`, junk → false. */
function isAppProtocolUrl(input) {
	if (!input) return false;
	if (!/^[a-z][a-z0-9+.-]*:/i.test(input) || /^https?:/i.test(input)) return false;
	return !UNSAFE_SCHEMES.includes(getUrlScheme(input));
}
/** Scheme of an app protocol URL, lowercased (`myapp://x` → `myapp`). */
function getUrlScheme(input) {
	const match = /^([a-z][a-z0-9+.-]*):/i.exec(input);
	return match ? match[1].toLowerCase() : "";
}
/**
* Whether a desktop hand-off target is allowed, per the admin's
* `desktop_auth_schemes` setting (comma-separated, e.g. `myapp,myapp-dev`).
* Empty setting = the hand-off is off, which is the template default.
*/
function isAllowedAppProtocolUrl(input, allowedSchemes) {
	if (!isAppProtocolUrl(input) || !allowedSchemes) return false;
	const scheme = getUrlScheme(input);
	return allowedSchemes.split(",").map((item) => item.trim().toLowerCase()).filter(Boolean).includes(scheme);
}
/**
* Where to send the user once they are signed in.
*
* `redirect` accepts either kind of target; `callbackUrl` is always an
* internal path. An app protocol URL detours through `/auth-callback`.
*/
function resolveAfterAuthUrl(params) {
	const { redirect, callbackUrl, fallback = "/" } = params;
	if (isAppProtocolUrl(redirect)) return `/auth-callback?redirect=${encodeURIComponent(redirect)}`;
	return safeInternalPath(callbackUrl) || safeInternalPath(redirect) || fallback;
}
/**
* Current path + query, for "bring me back here afterwards". De-localized
* (`/zh/chat` → `/chat`) because internal hrefs in this app are locale-free —
* the router rewrite adds the prefix back on the way out.
*/
function currentPathWithQuery(fallback = "/") {
	if (typeof window === "undefined") return fallback;
	return `${deLocalizeHref(window.location.pathname)}${window.location.search}`;
}
//#endregion
export { safeInternalPath as a, resolveAfterAuthUrl as i, isAllowedAppProtocolUrl as n, isAppProtocolUrl as r, currentPathWithQuery as t };
