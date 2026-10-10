//#region node_modules/.nitro/vite/services/ssr/assets/api-client-BXIVLJCS.js
var UPLOAD_RETRY_DELAYS_MS = [
	0,
	1e3,
	2e3
];
var UPLOAD_TIMEOUT_MIN_MS = 6e4;
var UPLOAD_TIMEOUT_MAX_MS = 8 * 6e4;
var UPLOAD_TIMEOUT_BASE_MS = 3e4;
var UPLOAD_TIMEOUT_ASSUMED_BYTES_PER_SECOND = 256 * 1024;
var MAX_ERROR_MESSAGE_LENGTH = 200;
var MAX_UPLOAD_ATTEMPTS_RECORDED = 10;
function getUploadPutTimeoutMs(fileSizeBytes) {
	if (!Number.isFinite(fileSizeBytes) || fileSizeBytes <= 0) return UPLOAD_TIMEOUT_MIN_MS;
	const transferMs = Math.ceil(fileSizeBytes / UPLOAD_TIMEOUT_ASSUMED_BYTES_PER_SECOND * 1e3);
	return Math.min(UPLOAD_TIMEOUT_MAX_MS, Math.max(UPLOAD_TIMEOUT_MIN_MS, UPLOAD_TIMEOUT_BASE_MS + transferMs));
}
var BROWSERS = [
	"Edge",
	"Opera",
	"Chrome",
	"Firefox",
	"Safari",
	"Samsung",
	"Other"
];
var OPERATING_SYSTEMS = [
	"iOS",
	"Android",
	"Windows",
	"macOS",
	"Linux",
	"ChromeOS",
	"Other"
];
var IN_APP_BROWSERS = [
	"instagram",
	"facebook",
	"tiktok",
	"line"
];
var VISIBILITY_STATES = new Set([
	"visible",
	"hidden",
	"prerender"
]);
var EFFECTIVE_TYPES = new Set([
	"slow-2g",
	"2g",
	"3g",
	"4g"
]);
function truncateErrorMessage(value) {
	return value.replace(/[\r\n\t]+/g, " ").slice(0, MAX_ERROR_MESSAGE_LENGTH);
}
function getBrowserMajor(userAgent, browser) {
	const pattern = browser === "Edge" ? /Edg\/(\d+)/i : browser === "Opera" ? /(?:OPR|Opera)\/(\d+)/i : browser === "Samsung" ? /SamsungBrowser\/(\d+)/i : browser === "Firefox" ? /(?:Firefox|FxiOS)\/(\d+)/i : browser === "Chrome" ? /(?:Chrome|CriOS)\/(\d+)/i : browser === "Safari" ? /Version\/(\d+)/i : null;
	if (!pattern) return null;
	const match = userAgent.match(pattern);
	if (!match) return null;
	const major = Number(match[1]);
	return Number.isInteger(major) && major > 0 && major < 1e3 ? major : null;
}
function classifyInAppBrowser(userAgent) {
	if (/Instagram/i.test(userAgent)) return "instagram";
	if (/FBAN|FBAV/i.test(userAgent)) return "facebook";
	if (/TikTok/i.test(userAgent)) return "tiktok";
	if (/\bLine\//i.test(userAgent)) return "line";
	return null;
}
function isAndroidWebView(userAgent) {
	if (!/Android/i.test(userAgent)) return false;
	return /(?:^|[;\s])wv(?:[;\s)]|$)/i.test(userAgent) || /Version\/4\.0.*Chrome\//i.test(userAgent);
}
function classifyClientEnvironment(userAgent) {
	const ua = userAgent || "";
	let os = "Other";
	if (/iPhone|iPad|iPod/i.test(ua)) os = "iOS";
	else if (/Android/i.test(ua)) os = "Android";
	else if (/CrOS/i.test(ua)) os = "ChromeOS";
	else if (/Windows/i.test(ua)) os = "Windows";
	else if (/Mac OS X|Macintosh/i.test(ua)) os = "macOS";
	else if (/Linux/i.test(ua)) os = "Linux";
	let browser = "Other";
	if (/Edg\//i.test(ua) || /EdgiOS\//i.test(ua)) browser = "Edge";
	else if (/OPR\/|Opera|OPiOS\//i.test(ua)) browser = "Opera";
	else if (/SamsungBrowser/i.test(ua)) browser = "Samsung";
	else if (/Firefox\/|FxiOS\//i.test(ua)) browser = "Firefox";
	else if (/CriOS\//i.test(ua) || /Chrome\//i.test(ua) && !/Chromium/i.test(ua)) browser = "Chrome";
	else if (/Safari\//i.test(ua)) browser = "Safari";
	return {
		browser,
		browserMajor: getBrowserMajor(ua, browser),
		os,
		isWebView: isAndroidWebView(ua),
		inAppBrowser: classifyInAppBrowser(ua)
	};
}
function getHttpStatus(cause) {
	if (cause instanceof Error && cause.name === "ApiError" && "code" in cause && typeof cause.code === "number") return cause.code;
	return null;
}
function isRetryableUploadFailure(cause) {
	const status = getHttpStatus(cause);
	if (status != null) return status === 408 || status === 429 || status >= 500 && status <= 599;
	if (cause instanceof Error && cause.name === "UploadTimeoutError") return true;
	if (cause instanceof Error && cause.name === "AbortError") return false;
	return true;
}
function collectConnectionDiagnostics() {
	if (typeof navigator === "undefined") return {
		effectiveType: null,
		rttMs: null,
		downlinkMbps: null
	};
	const connection = navigator.connection;
	return {
		effectiveType: typeof connection?.effectiveType === "string" && EFFECTIVE_TYPES.has(connection.effectiveType) ? connection.effectiveType : null,
		rttMs: typeof connection?.rtt === "number" && Number.isFinite(connection.rtt) && connection.rtt >= 0 ? Math.round(connection.rtt) : null,
		downlinkMbps: typeof connection?.downlink === "number" && Number.isFinite(connection.downlink) && connection.downlink >= 0 ? Number(connection.downlink.toFixed(2)) : null
	};
}
function collectUploadDiagnostics(params) {
	const env = typeof navigator !== "undefined" ? classifyClientEnvironment(navigator.userAgent || "") : {
		browser: null,
		browserMajor: null,
		os: null,
		isWebView: null,
		inAppBrowser: null
	};
	const visibilityState = typeof document !== "undefined" && VISIBILITY_STATES.has(document.visibilityState) ? document.visibilityState : null;
	const online = typeof navigator !== "undefined" && typeof navigator.onLine === "boolean" ? navigator.onLine : null;
	const connection = collectConnectionDiagnostics();
	const errorName = params.cause instanceof Error ? params.cause.name.slice(0, 64) : typeof params.cause === "string" ? "StringError" : params.cause === void 0 ? null : "UnknownError";
	const errorMessage = params.cause instanceof Error ? truncateErrorMessage(params.cause.message) : typeof params.cause === "string" ? truncateErrorMessage(params.cause) : null;
	let uploadHost = null;
	if (params.uploadUrl) try {
		uploadHost = new URL(params.uploadUrl).host.slice(0, 253);
	} catch {
		uploadHost = null;
	}
	return {
		attemptCount: params.attemptCount,
		uploadElapsedMs: params.uploadElapsedMs,
		online,
		visibilityState,
		browser: env.browser,
		browserMajor: env.browserMajor,
		os: env.os,
		isWebView: env.isWebView,
		inAppBrowser: env.inAppBrowser,
		...connection,
		origin: typeof window !== "undefined" ? window.location.origin.slice(0, 256) : null,
		uploadHost,
		errorName,
		errorMessage,
		attempts: (params.attempts || []).slice(-10)
	};
}
function sanitizeAttemptDiagnostics(raw) {
	if (!Array.isArray(raw)) return [];
	const out = [];
	for (const item of raw.slice(0, MAX_UPLOAD_ATTEMPTS_RECORDED)) {
		if (!item || typeof item !== "object" || Array.isArray(item)) continue;
		const input = item;
		const attempt = Number(input.attempt);
		const elapsedMs = Number(input.elapsedMs);
		if (!Number.isInteger(attempt) || attempt < 1 || attempt > MAX_UPLOAD_ATTEMPTS_RECORDED || !Number.isInteger(elapsedMs) || elapsedMs < 0 || elapsedMs > 10 * 6e4) continue;
		const errorName = typeof input.errorName === "string" && /^[A-Za-z][A-Za-z0-9._-]{0,63}$/.test(input.errorName) ? input.errorName : null;
		const errorMessage = typeof input.errorMessage === "string" ? truncateErrorMessage(input.errorMessage) : null;
		const rawStatus = Number(input.httpStatus);
		const httpStatus = Number.isInteger(rawStatus) && rawStatus >= 100 && rawStatus <= 599 ? rawStatus : null;
		out.push({
			attempt,
			elapsedMs,
			errorName,
			errorMessage,
			httpStatus
		});
	}
	return out;
}
function sanitizeUploadDiagnostics(raw) {
	if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
	const input = raw;
	const out = {};
	const attemptCount = Number(input.attemptCount);
	if (Number.isInteger(attemptCount) && attemptCount >= 1 && attemptCount <= 10) out.attemptCount = attemptCount;
	const uploadElapsedMs = Number(input.uploadElapsedMs);
	if (Number.isInteger(uploadElapsedMs) && uploadElapsedMs >= 0 && uploadElapsedMs <= 30 * 6e4) out.uploadElapsedMs = uploadElapsedMs;
	if (typeof input.online === "boolean") out.online = input.online;
	if (typeof input.visibilityState === "string" && VISIBILITY_STATES.has(input.visibilityState)) out.visibilityState = input.visibilityState;
	if (typeof input.browser === "string" && BROWSERS.includes(input.browser)) out.browser = input.browser;
	const browserMajor = Number(input.browserMajor);
	if (Number.isInteger(browserMajor) && browserMajor > 0 && browserMajor < 1e3) out.browserMajor = browserMajor;
	if (typeof input.os === "string" && OPERATING_SYSTEMS.includes(input.os)) out.os = input.os;
	if (typeof input.isWebView === "boolean") out.isWebView = input.isWebView;
	if (typeof input.inAppBrowser === "string" && IN_APP_BROWSERS.includes(input.inAppBrowser)) out.inAppBrowser = input.inAppBrowser;
	if (typeof input.effectiveType === "string" && EFFECTIVE_TYPES.has(input.effectiveType)) out.effectiveType = input.effectiveType;
	const rttMs = Number(input.rttMs);
	if (Number.isInteger(rttMs) && rttMs >= 0 && rttMs <= 12e4) out.rttMs = rttMs;
	const downlinkMbps = Number(input.downlinkMbps);
	if (Number.isFinite(downlinkMbps) && downlinkMbps >= 0 && downlinkMbps <= 1e5) out.downlinkMbps = Math.round(downlinkMbps * 100) / 100;
	if (typeof input.origin === "string") try {
		const url = new URL(input.origin);
		if ((url.protocol === "https:" || url.protocol === "http:") && url.origin === input.origin) out.origin = url.origin.slice(0, 256);
	} catch {}
	if (typeof input.uploadHost === "string" && /^[A-Za-z0-9.-]{1,253}$/.test(input.uploadHost)) out.uploadHost = input.uploadHost;
	if (typeof input.errorName === "string" && /^[A-Za-z][A-Za-z0-9._-]{0,63}$/.test(input.errorName)) out.errorName = input.errorName;
	if (typeof input.errorMessage === "string") out.errorMessage = truncateErrorMessage(input.errorMessage);
	const attempts = sanitizeAttemptDiagnostics(input.attempts);
	if (attempts.length > 0) out.attempts = attempts;
	return out;
}
var ApiError = class extends Error {
	code;
	data;
	constructor(code, message, data) {
		super(message);
		this.code = code;
		this.data = data;
		this.name = "ApiError";
	}
};
async function request(url, init) {
	const res = await fetch(url, {
		...init,
		headers: {
			...typeof init?.body === "string" ? { "Content-Type": "application/json" } : {},
			...init?.headers
		}
	});
	const json = await res.json().catch(() => ({
		code: -1,
		message: res.statusText || "Request failed"
	}));
	if (json.code !== 0) throw new ApiError(json.code ?? -1, json.message || "Request failed", json.data);
	return json.data;
}
var apiGet = (url, init) => request(url, init);
var apiPost = (url, body) => request(url, {
	method: "POST",
	body: body == null ? void 0 : JSON.stringify(body)
});
var apiPut = (url, body) => request(url, {
	method: "PUT",
	body: JSON.stringify(body)
});
var apiPatch = (url, body) => request(url, {
	method: "PATCH",
	body: JSON.stringify(body)
});
var apiDelete = (url) => request(url, { method: "DELETE" });
var SignedUploadError = class extends Error {
	cause;
	diagnostics;
	httpStatus;
	constructor(message, cause, diagnostics, httpStatus = null) {
		super(message);
		this.cause = cause;
		this.diagnostics = diagnostics;
		this.httpStatus = httpStatus;
		this.name = "SignedUploadError";
	}
};
function uploadFetchCredentials(url) {
	try {
		const parsed = new URL(url, typeof window !== "undefined" ? window.location.href : "http://localhost");
		if (typeof window !== "undefined" && parsed.origin === window.location.origin) return "same-origin";
	} catch {}
	return "omit";
}
async function putSignedUploadOnce(params) {
	const controller = new AbortController();
	const timeoutMs = getUploadPutTimeoutMs(params.file.size);
	const timer = setTimeout(() => controller.abort(), timeoutMs);
	try {
		const response = await fetch(params.url, {
			method: "PUT",
			headers: params.headers,
			body: params.file,
			credentials: uploadFetchCredentials(params.url),
			signal: controller.signal
		});
		if (!response.ok) throw new ApiError(response.status, `Upload failed with HTTP ${response.status}`);
	} catch (cause) {
		if (cause instanceof Error && cause.name === "AbortError") {
			const timeout = /* @__PURE__ */ new Error(`Upload timed out after ${timeoutMs}ms`);
			timeout.name = "UploadTimeoutError";
			throw timeout;
		}
		throw cause;
	} finally {
		clearTimeout(timer);
	}
}
async function uploadToSignedUrl(params) {
	const startedAt = Date.now();
	let attemptCount = 0;
	let lastCause;
	const attempts = [];
	for (let index = 0; index < UPLOAD_RETRY_DELAYS_MS.length; index += 1) {
		const delayMs = UPLOAD_RETRY_DELAYS_MS[index];
		if (delayMs > 0) await new Promise((resolve) => setTimeout(resolve, delayMs));
		attemptCount += 1;
		const attemptStartedAt = Date.now();
		try {
			await putSignedUploadOnce(params);
			attempts.push({
				attempt: attemptCount,
				elapsedMs: Date.now() - attemptStartedAt,
				errorName: null,
				errorMessage: null,
				httpStatus: null
			});
			return {
				attemptCount,
				uploadElapsedMs: Date.now() - startedAt,
				attempts
			};
		} catch (cause) {
			lastCause = cause;
			attempts.push({
				attempt: attemptCount,
				elapsedMs: Date.now() - attemptStartedAt,
				errorName: cause instanceof Error ? cause.name.slice(0, 64) : null,
				errorMessage: cause instanceof Error ? cause.message.replace(/[\r\n\t]+/g, " ").slice(0, 200) : typeof cause === "string" ? cause.replace(/[\r\n\t]+/g, " ").slice(0, 200) : null,
				httpStatus: cause instanceof ApiError && Number.isInteger(cause.code) && cause.code >= 100 && cause.code <= 599 ? cause.code : null
			});
			if (!(index < UPLOAD_RETRY_DELAYS_MS.length - 1 && isRetryableUploadFailure(cause))) break;
		}
	}
	const diagnostics = collectUploadDiagnostics({
		attemptCount,
		uploadElapsedMs: Date.now() - startedAt,
		cause: lastCause,
		attempts,
		uploadUrl: params.url
	});
	if (lastCause instanceof ApiError && Number.isInteger(lastCause.code) && lastCause.code >= 400 && lastCause.code <= 599) throw new SignedUploadError(lastCause.message, lastCause, diagnostics, lastCause.code);
	if (lastCause instanceof Error && lastCause.name === "AbortError") throw new SignedUploadError(lastCause.message, lastCause, diagnostics, null);
	throw new SignedUploadError(lastCause instanceof Error ? lastCause.message : "Upload network error", lastCause, diagnostics, null);
}
function pageQuery(base, p) {
	const params = new URLSearchParams({
		page: String(p.page),
		pageSize: String(p.pageSize)
	});
	if (p.search) params.set("search", p.search);
	return `${base}?${params}`;
}
//#endregion
export { apiPatch as a, collectUploadDiagnostics as c, uploadToSignedUrl as d, apiGet as i, pageQuery as l, SignedUploadError as n, apiPost as o, apiDelete as r, apiPut as s, ApiError as t, sanitizeUploadDiagnostics as u };
