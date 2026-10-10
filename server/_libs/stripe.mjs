import { o as __toESM, r as __exportAll } from "../_runtime.mjs";
import { t as require_lib } from "./qs+[...].mjs";
import process from "node:process";
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/utils.js
var import_lib = /* @__PURE__ */ __toESM(require_lib());
var OPTIONS_KEYS = [
	"apiKey",
	"idempotencyKey",
	"stripeAccount",
	"apiVersion",
	"maxNetworkRetries",
	"timeout",
	"host",
	"authenticator",
	"stripeContext",
	"additionalHeaders",
	"streaming"
];
function isOptionsHash(o) {
	return o && typeof o === "object" && OPTIONS_KEYS.some((prop) => Object.prototype.hasOwnProperty.call(o, prop));
}
/**
* Stringifies an Object, accommodating nested objects
* (forming the conventional key 'parent[child]=value')
*/
function queryStringifyRequestData(data, apiMode) {
	return import_lib.stringify(data, {
		serializeDate: (d) => Math.floor(d.getTime() / 1e3).toString(),
		arrayFormat: apiMode == "v2" ? "repeat" : "indices"
	}).replace(/%5B/g, "[").replace(/%5D/g, "]");
}
/**
* Outputs a new function with interpolated object property values.
* Use like so:
*   const fn = makeURLInterpolator('some/url/{param1}/{param2}');
*   fn({ param1: 123, param2: 456 }); // => 'some/url/123/456'
*/
var makeURLInterpolator = (() => {
	const rc = {
		"\n": "\\n",
		"\"": "\\\"",
		"\u2028": "\\u2028",
		"\u2029": "\\u2029"
	};
	return (str) => {
		const cleanString = str.replace(/["\n\r\u2028\u2029]/g, ($0) => rc[$0]);
		return (outputs) => {
			return cleanString.replace(/\{([\s\S]+?)\}/g, ($0, $1) => {
				const output = outputs[$1];
				if (isValidEncodeUriComponentType(output)) return encodeURIComponent(output);
				return "";
			});
		};
	};
})();
function isValidEncodeUriComponentType(value) {
	return [
		"number",
		"string",
		"boolean"
	].includes(typeof value);
}
function extractUrlParams(path) {
	const params = path.match(/\{\w+\}/g);
	if (!params) return [];
	return params.map((param) => param.replace(/[{}]/g, ""));
}
/**
* Return the data argument from a list of arguments
*
* @param {object[]} args
* @returns {object}
*/
function getDataFromArgs(args) {
	if (!Array.isArray(args) || !args[0] || typeof args[0] !== "object") return {};
	if (!isOptionsHash(args[0])) return args.shift();
	const argKeys = Object.keys(args[0]);
	const optionKeysInArgs = argKeys.filter((key) => OPTIONS_KEYS.includes(key));
	if (optionKeysInArgs.length > 0 && optionKeysInArgs.length !== argKeys.length) emitWarning(`Options found in arguments (${optionKeysInArgs.join(", ")}). Did you mean to pass an options object? See https://github.com/stripe/stripe-node/wiki/Passing-Options.`);
	return {};
}
/**
* Return the options hash from a list of arguments
*/
function getOptionsFromArgs(args) {
	const opts = {
		host: null,
		headers: {},
		settings: {},
		streaming: false
	};
	if (args.length > 0) {
		const arg = args[args.length - 1];
		if (typeof arg === "string") opts.authenticator = createApiKeyAuthenticator(args.pop());
		else if (isOptionsHash(arg)) {
			const params = Object.assign({}, args.pop());
			const extraKeys = Object.keys(params).filter((key) => !OPTIONS_KEYS.includes(key));
			if (extraKeys.length) emitWarning(`Invalid options found (${extraKeys.join(", ")}); ignoring.`);
			if (params.apiKey) opts.authenticator = createApiKeyAuthenticator(params.apiKey);
			if (params.idempotencyKey) opts.headers["Idempotency-Key"] = params.idempotencyKey;
			if (params.stripeAccount) opts.headers["Stripe-Account"] = params.stripeAccount;
			if (params.stripeContext) {
				if (opts.headers["Stripe-Account"]) throw new Error("Can't specify both stripeAccount and stripeContext.");
				opts.headers["Stripe-Context"] = params.stripeContext;
			}
			if (params.apiVersion) opts.headers["Stripe-Version"] = params.apiVersion;
			if (Number.isInteger(params.maxNetworkRetries)) opts.settings.maxNetworkRetries = params.maxNetworkRetries;
			if (Number.isInteger(params.timeout)) opts.settings.timeout = params.timeout;
			if (params.host) opts.host = params.host;
			if (params.authenticator) {
				if (params.apiKey) throw new Error("Can't specify both apiKey and authenticator.");
				if (typeof params.authenticator !== "function") throw new Error("The authenticator must be a function receiving a request as the first parameter.");
				opts.authenticator = params.authenticator;
			}
			if (params.additionalHeaders) opts.headers = params.additionalHeaders;
			if (params.streaming) opts.streaming = true;
		}
	}
	return opts;
}
/**
* Provide simple "Class" extension mechanism.
* <!-- Public API accessible via Stripe.StripeResource.extend -->
*/
function protoExtend(sub) {
	const Super = this;
	const Constructor = Object.prototype.hasOwnProperty.call(sub, "constructor") ? sub.constructor : function(...args) {
		Super.apply(this, args);
	};
	Object.assign(Constructor, Super);
	Constructor.prototype = Object.create(Super.prototype);
	Object.assign(Constructor.prototype, sub);
	return Constructor;
}
/**
* Remove empty values from an object
*/
function removeNullish(obj) {
	if (typeof obj !== "object") throw new Error("Argument must be an object");
	return Object.keys(obj).reduce((result, key) => {
		if (obj[key] != null) result[key] = obj[key];
		return result;
	}, {});
}
/**
* Normalize standard HTTP Headers:
* {'foo-bar': 'hi'}
* becomes
* {'Foo-Bar': 'hi'}
*/
function normalizeHeaders(obj) {
	if (!(obj && typeof obj === "object")) return obj;
	return Object.keys(obj).reduce((result, header) => {
		result[normalizeHeader(header)] = obj[header];
		return result;
	}, {});
}
/**
* Stolen from https://github.com/marten-de-vries/header-case-normalizer/blob/master/index.js#L36-L41
* without the exceptions which are irrelevant to us.
*/
function normalizeHeader(header) {
	return header.split("-").map((text) => text.charAt(0).toUpperCase() + text.substr(1).toLowerCase()).join("-");
}
function callbackifyPromiseWithTimeout(promise, callback) {
	if (callback) return promise.then((res) => {
		setTimeout(() => {
			callback(null, res);
		}, 0);
	}, (err) => {
		setTimeout(() => {
			callback(err, null);
		}, 0);
	});
	return promise;
}
/**
* Allow for special capitalization cases (such as OAuth)
*/
function pascalToCamelCase(name) {
	if (name === "OAuth") return "oauth";
	else return name[0].toLowerCase() + name.substring(1);
}
function emitWarning(warning) {
	if (typeof process.emitWarning !== "function") return console.warn(`Stripe: ${warning}`);
	return process.emitWarning(warning, "Stripe");
}
function isObject(obj) {
	const type = typeof obj;
	return (type === "function" || type === "object") && !!obj;
}
function flattenAndStringify(data) {
	const result = {};
	const step = (obj, prevKey) => {
		Object.entries(obj).forEach(([key, value]) => {
			const newKey = prevKey ? `${prevKey}[${key}]` : key;
			if (isObject(value)) if (!(value instanceof Uint8Array) && !Object.prototype.hasOwnProperty.call(value, "data")) return step(value, newKey);
			else result[newKey] = value;
			else result[newKey] = String(value);
		});
	};
	step(data, null);
	return result;
}
function validateInteger(name, n, defaultVal) {
	if (!Number.isInteger(n)) if (defaultVal !== void 0) return defaultVal;
	else throw new Error(`${name} must be an integer`);
	return n;
}
function determineProcessUserAgentProperties() {
	return typeof process === "undefined" ? {} : {
		lang_version: process.version,
		platform: process.platform
	};
}
function createApiKeyAuthenticator(apiKey) {
	const authenticator = (request) => {
		request.headers.Authorization = "Bearer " + apiKey;
		return Promise.resolve();
	};
	authenticator._apiKey = apiKey;
	return authenticator;
}
/**
* Replaces Date objects with Unix timestamps
*/
function dateTimeReplacer(key, value) {
	if (this[key] instanceof Date) return Math.floor(this[key].getTime() / 1e3).toString();
	return value;
}
/**
* JSON stringifies an Object, replacing Date objects with Unix timestamps
*/
function jsonStringifyRequestData(data) {
	return JSON.stringify(data, dateTimeReplacer);
}
/**
* Inspects the given path to determine if the endpoint is for v1 or v2 API
*/
function getAPIMode(path) {
	if (!path) return "v1";
	return path.startsWith("/v2") ? "v2" : "v1";
}
function parseHttpHeaderAsString(header) {
	if (Array.isArray(header)) return header.join(", ");
	return String(header);
}
function parseHttpHeaderAsNumber(header) {
	const number = Array.isArray(header) ? header[0] : header;
	return Number(number);
}
function parseHeadersForFetch(headers) {
	return Object.entries(headers).map(([key, value]) => {
		return [key, parseHttpHeaderAsString(value)];
	});
}
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/net/HttpClient.js
/**
* Encapsulates the logic for issuing a request to the Stripe API.
*
* A custom HTTP client should should implement:
* 1. A response class which extends HttpClientResponse and wraps around their
*    own internal representation of a response.
* 2. A client class which extends HttpClient and implements all methods,
*    returning their own response class when making requests.
*/
var HttpClient = class HttpClient {
	/** The client name used for diagnostics. */
	getClientName() {
		throw new Error("getClientName not implemented.");
	}
	makeRequest(host, port, path, method, headers, requestData, protocol, timeout) {
		throw new Error("makeRequest not implemented.");
	}
	/** Helper to make a consistent timeout error across implementations. */
	static makeTimeoutError() {
		const timeoutErr = new TypeError(HttpClient.TIMEOUT_ERROR_CODE);
		timeoutErr.code = HttpClient.TIMEOUT_ERROR_CODE;
		return timeoutErr;
	}
};
HttpClient.CONNECTION_CLOSED_ERROR_CODES = ["ECONNRESET", "EPIPE"];
HttpClient.TIMEOUT_ERROR_CODE = "ETIMEDOUT";
var HttpClientResponse = class {
	constructor(statusCode, headers) {
		this._statusCode = statusCode;
		this._headers = headers;
	}
	getStatusCode() {
		return this._statusCode;
	}
	getHeaders() {
		return this._headers;
	}
	getRawResponse() {
		throw new Error("getRawResponse not implemented.");
	}
	toStream(streamCompleteCallback) {
		throw new Error("toStream not implemented.");
	}
	toJSON() {
		throw new Error("toJSON not implemented.");
	}
};
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/net/FetchHttpClient.js
/**
* HTTP client which uses a `fetch` function to issue requests.
*
* By default relies on the global `fetch` function, but an optional function
* can be passed in. If passing in a function, it is expected to match the Web
* Fetch API. As an example, this could be the function provided by the
* node-fetch package (https://github.com/node-fetch/node-fetch).
*/
var FetchHttpClient = class FetchHttpClient extends HttpClient {
	constructor(fetchFn) {
		super();
		if (!fetchFn) {
			if (!globalThis.fetch) throw new Error("fetch() function not provided and is not defined in the global scope. You must provide a fetch implementation.");
			fetchFn = globalThis.fetch;
		}
		if (globalThis.AbortController) this._fetchFn = FetchHttpClient.makeFetchWithAbortTimeout(fetchFn);
		else this._fetchFn = FetchHttpClient.makeFetchWithRaceTimeout(fetchFn);
	}
	static makeFetchWithRaceTimeout(fetchFn) {
		return (url, init, timeout) => {
			let pendingTimeoutId;
			const timeoutPromise = new Promise((_, reject) => {
				pendingTimeoutId = setTimeout(() => {
					pendingTimeoutId = null;
					reject(HttpClient.makeTimeoutError());
				}, timeout);
			});
			const fetchPromise = fetchFn(url, init);
			return Promise.race([fetchPromise, timeoutPromise]).finally(() => {
				if (pendingTimeoutId) clearTimeout(pendingTimeoutId);
			});
		};
	}
	static makeFetchWithAbortTimeout(fetchFn) {
		return async (url, init, timeout) => {
			const abort = new AbortController();
			let timeoutId = setTimeout(() => {
				timeoutId = null;
				abort.abort(HttpClient.makeTimeoutError());
			}, timeout);
			try {
				return await fetchFn(url, Object.assign(Object.assign({}, init), { signal: abort.signal }));
			} catch (err) {
				if (err.name === "AbortError") throw HttpClient.makeTimeoutError();
				else throw err;
			} finally {
				if (timeoutId) clearTimeout(timeoutId);
			}
		};
	}
	/** @override. */
	getClientName() {
		return "fetch";
	}
	async makeRequest(host, port, path, method, headers, requestData, protocol, timeout) {
		const url = new URL(path, `${protocol === "http" ? "http" : "https"}://${host}`);
		url.port = port;
		const body = requestData || (method == "POST" || method == "PUT" || method == "PATCH" ? "" : void 0);
		return new FetchHttpClientResponse(await this._fetchFn(url.toString(), {
			method,
			headers: parseHeadersForFetch(headers),
			body: typeof body === "object" ? JSON.stringify(body) : body
		}, timeout));
	}
};
var FetchHttpClientResponse = class FetchHttpClientResponse extends HttpClientResponse {
	constructor(res) {
		super(res.status, FetchHttpClientResponse._transformHeadersToObject(res.headers));
		this._res = res;
	}
	getRawResponse() {
		return this._res;
	}
	toStream(streamCompleteCallback) {
		streamCompleteCallback();
		return this._res.body;
	}
	toJSON() {
		return this._res.json();
	}
	static _transformHeadersToObject(headers) {
		const headersObj = {};
		for (const entry of headers) {
			if (!Array.isArray(entry) || entry.length != 2) throw new Error("Response objects produced by the fetch function given to FetchHttpClient do not have an iterable headers map. Response#headers should be an iterable object.");
			headersObj[entry[0]] = entry[1];
		}
		return headersObj;
	}
};
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/crypto/CryptoProvider.js
/**
* Interface encapsulating the various crypto computations used by the library,
* allowing pluggable underlying crypto implementations.
*/
var CryptoProvider = class {
	/**
	* Computes a SHA-256 HMAC given a secret and a payload (encoded in UTF-8).
	* The output HMAC should be encoded in hexadecimal.
	*
	* Sample values for implementations:
	* - computeHMACSignature('', 'test_secret') => 'f7f9bd47fb987337b5796fdc1fdb9ba221d0d5396814bfcaf9521f43fd8927fd'
	* - computeHMACSignature('\ud83d\ude00', 'test_secret') => '837da296d05c4fe31f61d5d7ead035099d9585a5bcde87de952012a78f0b0c43
	*/
	computeHMACSignature(payload, secret) {
		throw new Error("computeHMACSignature not implemented.");
	}
	/**
	* Asynchronous version of `computeHMACSignature`. Some implementations may
	* only allow support async signature computation.
	*
	* Computes a SHA-256 HMAC given a secret and a payload (encoded in UTF-8).
	* The output HMAC should be encoded in hexadecimal.
	*
	* Sample values for implementations:
	* - computeHMACSignature('', 'test_secret') => 'f7f9bd47fb987337b5796fdc1fdb9ba221d0d5396814bfcaf9521f43fd8927fd'
	* - computeHMACSignature('\ud83d\ude00', 'test_secret') => '837da296d05c4fe31f61d5d7ead035099d9585a5bcde87de952012a78f0b0c43
	*/
	computeHMACSignatureAsync(payload, secret) {
		throw new Error("computeHMACSignatureAsync not implemented.");
	}
	/**
	* Computes a SHA-256 hash of the data.
	*/
	computeSHA256Async(data) {
		throw new Error("computeSHA256 not implemented.");
	}
};
/**
* If the crypto provider only supports asynchronous operations,
* throw CryptoProviderOnlySupportsAsyncError instead of
* a generic error so that the caller can choose to provide
* a more helpful error message to direct the user to use
* an asynchronous pathway.
*/
var CryptoProviderOnlySupportsAsyncError = class extends Error {};
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/crypto/SubtleCryptoProvider.js
/**
* `CryptoProvider which uses the SubtleCrypto interface of the Web Crypto API.
*
* This only supports asynchronous operations.
*/
var SubtleCryptoProvider = class extends CryptoProvider {
	constructor(subtleCrypto) {
		super();
		this.subtleCrypto = subtleCrypto || crypto.subtle;
	}
	/** @override */
	computeHMACSignature(payload, secret) {
		throw new CryptoProviderOnlySupportsAsyncError("SubtleCryptoProvider cannot be used in a synchronous context.");
	}
	/** @override */
	async computeHMACSignatureAsync(payload, secret) {
		const encoder = new TextEncoder();
		const key = await this.subtleCrypto.importKey("raw", encoder.encode(secret), {
			name: "HMAC",
			hash: { name: "SHA-256" }
		}, false, ["sign"]);
		const signatureBuffer = await this.subtleCrypto.sign("hmac", key, encoder.encode(payload));
		const signatureBytes = new Uint8Array(signatureBuffer);
		const signatureHexCodes = new Array(signatureBytes.length);
		for (let i = 0; i < signatureBytes.length; i++) signatureHexCodes[i] = byteHexMapping[signatureBytes[i]];
		return signatureHexCodes.join("");
	}
	/** @override */
	async computeSHA256Async(data) {
		return new Uint8Array(await this.subtleCrypto.digest("SHA-256", data));
	}
};
var byteHexMapping = new Array(256);
for (let i = 0; i < byteHexMapping.length; i++) byteHexMapping[i] = i.toString(16).padStart(2, "0");
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/platform/PlatformFunctions.js
/**
* Interface encapsulating various utility functions whose
* implementations depend on the platform / JS runtime.
*/
var PlatformFunctions = class {
	constructor() {
		this._fetchFn = null;
		this._agent = null;
	}
	/**
	* Gets uname with Node's built-in `exec` function, if available.
	*/
	getUname() {
		throw new Error("getUname not implemented.");
	}
	/**
	* Generates a v4 UUID. See https://stackoverflow.com/a/2117523
	*/
	uuid4() {
		return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
			const r = Math.random() * 16 | 0;
			return (c === "x" ? r : r & 3 | 8).toString(16);
		});
	}
	/**
	* Compares strings in constant time.
	*/
	secureCompare(a, b) {
		if (a.length !== b.length) return false;
		const len = a.length;
		let result = 0;
		for (let i = 0; i < len; ++i) result |= a.charCodeAt(i) ^ b.charCodeAt(i);
		return result === 0;
	}
	/**
	* Creates an event emitter.
	*/
	createEmitter() {
		throw new Error("createEmitter not implemented.");
	}
	/**
	* Checks if the request data is a stream. If so, read the entire stream
	* to a buffer and return the buffer.
	*/
	tryBufferData(data) {
		throw new Error("tryBufferData not implemented.");
	}
	/**
	* Creates an HTTP client which uses the Node `http` and `https` packages
	* to issue requests.
	*/
	createNodeHttpClient(agent) {
		throw new Error("createNodeHttpClient not implemented.");
	}
	/**
	* Creates an HTTP client for issuing Stripe API requests which uses the Web
	* Fetch API.
	*
	* A fetch function can optionally be passed in as a parameter. If none is
	* passed, will default to the default `fetch` function in the global scope.
	*/
	createFetchHttpClient(fetchFn) {
		return new FetchHttpClient(fetchFn);
	}
	/**
	* Creates an HTTP client using runtime-specific APIs.
	*/
	createDefaultHttpClient() {
		throw new Error("createDefaultHttpClient not implemented.");
	}
	/**
	* Creates a CryptoProvider which uses the Node `crypto` package for its computations.
	*/
	createNodeCryptoProvider() {
		throw new Error("createNodeCryptoProvider not implemented.");
	}
	/**
	* Creates a CryptoProvider which uses the SubtleCrypto interface of the Web Crypto API.
	*/
	createSubtleCryptoProvider(subtleCrypto) {
		return new SubtleCryptoProvider(subtleCrypto);
	}
	createDefaultCryptoProvider() {
		throw new Error("createDefaultCryptoProvider not implemented.");
	}
};
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/StripeEmitter.js
/**
* @private
* (For internal use in stripe-node.)
* Wrapper around the Event Web API.
*/
var _StripeEvent = class extends Event {
	constructor(eventName, data) {
		super(eventName);
		this.data = data;
	}
};
/** Minimal EventEmitter wrapper around EventTarget. */
var StripeEmitter = class {
	constructor() {
		this.eventTarget = new EventTarget();
		this.listenerMapping = /* @__PURE__ */ new Map();
	}
	on(eventName, listener) {
		const listenerWrapper = (event) => {
			listener(event.data);
		};
		this.listenerMapping.set(listener, listenerWrapper);
		return this.eventTarget.addEventListener(eventName, listenerWrapper);
	}
	removeListener(eventName, listener) {
		const listenerWrapper = this.listenerMapping.get(listener);
		this.listenerMapping.delete(listener);
		return this.eventTarget.removeEventListener(eventName, listenerWrapper);
	}
	once(eventName, listener) {
		const listenerWrapper = (event) => {
			listener(event.data);
		};
		this.listenerMapping.set(listener, listenerWrapper);
		return this.eventTarget.addEventListener(eventName, listenerWrapper, { once: true });
	}
	emit(eventName, data) {
		return this.eventTarget.dispatchEvent(new _StripeEvent(eventName, data));
	}
};
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/platform/WebPlatformFunctions.js
/**
* Specializes WebPlatformFunctions using APIs available in Web workers.
*/
var WebPlatformFunctions = class extends PlatformFunctions {
	/** @override */
	getUname() {
		return Promise.resolve(null);
	}
	/** @override */
	createEmitter() {
		return new StripeEmitter();
	}
	/** @override */
	tryBufferData(data) {
		if (data.file.data instanceof ReadableStream) throw new Error("Uploading a file as a stream is not supported in non-Node environments. Please open or upvote an issue at github.com/stripe/stripe-node if you use this, detailing your use-case.");
		return Promise.resolve(data);
	}
	/** @override */
	createNodeHttpClient() {
		throw new Error("Stripe: `createNodeHttpClient()` is not available in non-Node environments. Please use `createFetchHttpClient()` instead.");
	}
	/** @override */
	createDefaultHttpClient() {
		return super.createFetchHttpClient();
	}
	/** @override */
	createNodeCryptoProvider() {
		throw new Error("Stripe: `createNodeCryptoProvider()` is not available in non-Node environments. Please use `createSubtleCryptoProvider()` instead.");
	}
	/** @override */
	createDefaultCryptoProvider() {
		return this.createSubtleCryptoProvider();
	}
};
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/Error.js
var Error_exports = /* @__PURE__ */ __exportAll({
	StripeAPIError: () => StripeAPIError,
	StripeAuthenticationError: () => StripeAuthenticationError,
	StripeCardError: () => StripeCardError,
	StripeConnectionError: () => StripeConnectionError,
	StripeError: () => StripeError,
	StripeIdempotencyError: () => StripeIdempotencyError,
	StripeInvalidGrantError: () => StripeInvalidGrantError,
	StripeInvalidRequestError: () => StripeInvalidRequestError,
	StripePermissionError: () => StripePermissionError,
	StripeRateLimitError: () => StripeRateLimitError,
	StripeSignatureVerificationError: () => StripeSignatureVerificationError,
	StripeUnknownError: () => StripeUnknownError,
	TemporarySessionExpiredError: () => TemporarySessionExpiredError,
	generateV1Error: () => generateV1Error,
	generateV2Error: () => generateV2Error
});
var generateV1Error = (rawStripeError) => {
	switch (rawStripeError.type) {
		case "card_error": return new StripeCardError(rawStripeError);
		case "invalid_request_error": return new StripeInvalidRequestError(rawStripeError);
		case "api_error": return new StripeAPIError(rawStripeError);
		case "authentication_error": return new StripeAuthenticationError(rawStripeError);
		case "rate_limit_error": return new StripeRateLimitError(rawStripeError);
		case "idempotency_error": return new StripeIdempotencyError(rawStripeError);
		case "invalid_grant": return new StripeInvalidGrantError(rawStripeError);
		default: return new StripeUnknownError(rawStripeError);
	}
};
var generateV2Error = (rawStripeError) => {
	switch (rawStripeError.type) {
		case "temporary_session_expired": return new TemporarySessionExpiredError(rawStripeError);
	}
	switch (rawStripeError.code) {
		case "invalid_fields": return new StripeInvalidRequestError(rawStripeError);
	}
	return generateV1Error(rawStripeError);
};
/**
* StripeError is the base error from which all other more specific Stripe errors derive.
* Specifically for errors returned from Stripe's REST API.
*/
var StripeError = class extends Error {
	constructor(raw = {}, type = null) {
		var _a;
		super(raw.message);
		this.type = type || this.constructor.name;
		this.raw = raw;
		this.rawType = raw.type;
		this.code = raw.code;
		this.doc_url = raw.doc_url;
		this.param = raw.param;
		this.detail = raw.detail;
		this.headers = raw.headers;
		this.requestId = raw.requestId;
		this.statusCode = raw.statusCode;
		this.message = (_a = raw.message) !== null && _a !== void 0 ? _a : "";
		this.userMessage = raw.user_message;
		this.charge = raw.charge;
		this.decline_code = raw.decline_code;
		this.payment_intent = raw.payment_intent;
		this.payment_method = raw.payment_method;
		this.payment_method_type = raw.payment_method_type;
		this.setup_intent = raw.setup_intent;
		this.source = raw.source;
	}
};
/**
* Helper factory which takes raw stripe errors and outputs wrapping instances
*/
StripeError.generate = generateV1Error;
/**
* CardError is raised when a user enters a card that can't be charged for
* some reason.
*/
var StripeCardError = class extends StripeError {
	constructor(raw = {}) {
		super(raw, "StripeCardError");
	}
};
/**
* InvalidRequestError is raised when a request is initiated with invalid
* parameters.
*/
var StripeInvalidRequestError = class extends StripeError {
	constructor(raw = {}) {
		super(raw, "StripeInvalidRequestError");
	}
};
/**
* APIError is a generic error that may be raised in cases where none of the
* other named errors cover the problem. It could also be raised in the case
* that a new error has been introduced in the API, but this version of the
* Node.JS SDK doesn't know how to handle it.
*/
var StripeAPIError = class extends StripeError {
	constructor(raw = {}) {
		super(raw, "StripeAPIError");
	}
};
/**
* AuthenticationError is raised when invalid credentials are used to connect
* to Stripe's servers.
*/
var StripeAuthenticationError = class extends StripeError {
	constructor(raw = {}) {
		super(raw, "StripeAuthenticationError");
	}
};
/**
* PermissionError is raised in cases where access was attempted on a resource
* that wasn't allowed.
*/
var StripePermissionError = class extends StripeError {
	constructor(raw = {}) {
		super(raw, "StripePermissionError");
	}
};
/**
* RateLimitError is raised in cases where an account is putting too much load
* on Stripe's API servers (usually by performing too many requests). Please
* back off on request rate.
*/
var StripeRateLimitError = class extends StripeError {
	constructor(raw = {}) {
		super(raw, "StripeRateLimitError");
	}
};
/**
* StripeConnectionError is raised in the event that the SDK can't connect to
* Stripe's servers. That can be for a variety of different reasons from a
* downed network to a bad TLS certificate.
*/
var StripeConnectionError = class extends StripeError {
	constructor(raw = {}) {
		super(raw, "StripeConnectionError");
	}
};
/**
* SignatureVerificationError is raised when the signature verification for a
* webhook fails
*/
var StripeSignatureVerificationError = class extends StripeError {
	constructor(header, payload, raw = {}) {
		super(raw, "StripeSignatureVerificationError");
		this.header = header;
		this.payload = payload;
	}
};
/**
* IdempotencyError is raised in cases where an idempotency key was used
* improperly.
*/
var StripeIdempotencyError = class extends StripeError {
	constructor(raw = {}) {
		super(raw, "StripeIdempotencyError");
	}
};
/**
* InvalidGrantError is raised when a specified code doesn't exist, is
* expired, has been used, or doesn't belong to you; a refresh token doesn't
* exist, or doesn't belong to you; or if an API key's mode (live or test)
* doesn't match the mode of a code or refresh token.
*/
var StripeInvalidGrantError = class extends StripeError {
	constructor(raw = {}) {
		super(raw, "StripeInvalidGrantError");
	}
};
/**
* Any other error from Stripe not specifically captured above
*/
var StripeUnknownError = class extends StripeError {
	constructor(raw = {}) {
		super(raw, "StripeUnknownError");
	}
};
var TemporarySessionExpiredError = class extends StripeError {
	constructor(rawStripeError = {}) {
		super(rawStripeError, "TemporarySessionExpiredError");
	}
};
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/RequestSender.js
var MAX_RETRY_AFTER_WAIT = 60;
var RequestSender = class RequestSender {
	constructor(stripe, maxBufferedRequestMetric) {
		this._stripe = stripe;
		this._maxBufferedRequestMetric = maxBufferedRequestMetric;
	}
	_addHeadersDirectlyToObject(obj, headers) {
		obj.requestId = headers["request-id"];
		obj.stripeAccount = obj.stripeAccount || headers["stripe-account"];
		obj.apiVersion = obj.apiVersion || headers["stripe-version"];
		obj.idempotencyKey = obj.idempotencyKey || headers["idempotency-key"];
	}
	_makeResponseEvent(requestEvent, statusCode, headers) {
		const requestEndTime = Date.now();
		const requestDurationMs = requestEndTime - requestEvent.request_start_time;
		return removeNullish({
			api_version: headers["stripe-version"],
			account: headers["stripe-account"],
			idempotency_key: headers["idempotency-key"],
			method: requestEvent.method,
			path: requestEvent.path,
			status: statusCode,
			request_id: this._getRequestId(headers),
			elapsed: requestDurationMs,
			request_start_time: requestEvent.request_start_time,
			request_end_time: requestEndTime
		});
	}
	_getRequestId(headers) {
		return headers["request-id"];
	}
	/**
	* Used by methods with spec.streaming === true. For these methods, we do not
	* buffer successful responses into memory or do parse them into stripe
	* objects, we delegate that all of that to the user and pass back the raw
	* http.Response object to the callback.
	*
	* (Unsuccessful responses shouldn't make it here, they should
	* still be buffered/parsed and handled by _jsonResponseHandler -- see
	* makeRequest)
	*/
	_streamingResponseHandler(requestEvent, usage, callback) {
		return (res) => {
			const headers = res.getHeaders();
			const streamCompleteCallback = () => {
				const responseEvent = this._makeResponseEvent(requestEvent, res.getStatusCode(), headers);
				this._stripe._emitter.emit("response", responseEvent);
				this._recordRequestMetrics(this._getRequestId(headers), responseEvent.elapsed, usage);
			};
			const stream = res.toStream(streamCompleteCallback);
			this._addHeadersDirectlyToObject(stream, headers);
			return callback(null, stream);
		};
	}
	/**
	* Default handler for Stripe responses. Buffers the response into memory,
	* parses the JSON and returns it (i.e. passes it to the callback) if there
	* is no "error" field. Otherwise constructs/passes an appropriate Error.
	*/
	_jsonResponseHandler(requestEvent, apiMode, usage, callback) {
		return (res) => {
			const headers = res.getHeaders();
			const requestId = this._getRequestId(headers);
			const statusCode = res.getStatusCode();
			const responseEvent = this._makeResponseEvent(requestEvent, statusCode, headers);
			this._stripe._emitter.emit("response", responseEvent);
			res.toJSON().then((jsonResponse) => {
				if (jsonResponse.error) {
					let err;
					if (typeof jsonResponse.error === "string") jsonResponse.error = {
						type: jsonResponse.error,
						message: jsonResponse.error_description
					};
					jsonResponse.error.headers = headers;
					jsonResponse.error.statusCode = statusCode;
					jsonResponse.error.requestId = requestId;
					if (statusCode === 401) err = new StripeAuthenticationError(jsonResponse.error);
					else if (statusCode === 403) err = new StripePermissionError(jsonResponse.error);
					else if (statusCode === 429) err = new StripeRateLimitError(jsonResponse.error);
					else if (apiMode === "v2") err = generateV2Error(jsonResponse.error);
					else err = generateV1Error(jsonResponse.error);
					throw err;
				}
				return jsonResponse;
			}, (e) => {
				throw new StripeAPIError({
					message: "Invalid JSON received from the Stripe API",
					exception: e,
					requestId: headers["request-id"]
				});
			}).then((jsonResponse) => {
				this._recordRequestMetrics(requestId, responseEvent.elapsed, usage);
				const rawResponse = res.getRawResponse();
				this._addHeadersDirectlyToObject(rawResponse, headers);
				Object.defineProperty(jsonResponse, "lastResponse", {
					enumerable: false,
					writable: false,
					value: rawResponse
				});
				callback(null, jsonResponse);
			}, (e) => callback(e, null));
		};
	}
	static _generateConnectionErrorMessage(requestRetries) {
		return `An error occurred with our connection to Stripe.${requestRetries > 0 ? ` Request was retried ${requestRetries} times.` : ""}`;
	}
	static _shouldRetry(res, numRetries, maxRetries, error) {
		if (error && numRetries === 0 && HttpClient.CONNECTION_CLOSED_ERROR_CODES.includes(error.code)) return true;
		if (numRetries >= maxRetries) return false;
		if (!res) return true;
		if (res.getHeaders()["stripe-should-retry"] === "false") return false;
		if (res.getHeaders()["stripe-should-retry"] === "true") return true;
		if (res.getStatusCode() === 409) return true;
		if (res.getStatusCode() >= 500) return true;
		return false;
	}
	_getSleepTimeInMS(numRetries, retryAfter = null) {
		const initialNetworkRetryDelay = this._stripe.getInitialNetworkRetryDelay();
		const maxNetworkRetryDelay = this._stripe.getMaxNetworkRetryDelay();
		let sleepSeconds = Math.min(initialNetworkRetryDelay * Math.pow(2, numRetries - 1), maxNetworkRetryDelay);
		sleepSeconds *= .5 * (1 + Math.random());
		sleepSeconds = Math.max(initialNetworkRetryDelay, sleepSeconds);
		if (Number.isInteger(retryAfter) && retryAfter <= MAX_RETRY_AFTER_WAIT) sleepSeconds = Math.max(sleepSeconds, retryAfter);
		return sleepSeconds * 1e3;
	}
	_getMaxNetworkRetries(settings = {}) {
		return settings.maxNetworkRetries !== void 0 && Number.isInteger(settings.maxNetworkRetries) ? settings.maxNetworkRetries : this._stripe.getMaxNetworkRetries();
	}
	_defaultIdempotencyKey(method, settings, apiMode) {
		const maxRetries = this._getMaxNetworkRetries(settings);
		const genKey = () => `stripe-node-retry-${this._stripe._platformFunctions.uuid4()}`;
		if (apiMode === "v2") {
			if (method === "POST" || method === "DELETE") return genKey();
		} else if (apiMode === "v1") {
			if (method === "POST" && maxRetries > 0) return genKey();
		}
		return null;
	}
	_makeHeaders({ contentType, contentLength, apiVersion, clientUserAgent, method, userSuppliedHeaders, userSuppliedSettings, stripeAccount, stripeContext, apiMode }) {
		const defaultHeaders = {
			Accept: "application/json",
			"Content-Type": contentType,
			"User-Agent": this._getUserAgentString(apiMode),
			"X-Stripe-Client-User-Agent": clientUserAgent,
			"X-Stripe-Client-Telemetry": this._getTelemetryHeader(),
			"Stripe-Version": apiVersion,
			"Stripe-Account": stripeAccount,
			"Stripe-Context": stripeContext,
			"Idempotency-Key": this._defaultIdempotencyKey(method, userSuppliedSettings, apiMode)
		};
		const methodHasPayload = method == "POST" || method == "PUT" || method == "PATCH";
		if (methodHasPayload || contentLength) {
			if (!methodHasPayload) emitWarning(`${method} method had non-zero contentLength but no payload is expected for this verb`);
			defaultHeaders["Content-Length"] = contentLength;
		}
		return Object.assign(removeNullish(defaultHeaders), normalizeHeaders(userSuppliedHeaders));
	}
	_getUserAgentString(apiMode) {
		return `Stripe/${apiMode} NodeBindings/${this._stripe.getConstant("PACKAGE_VERSION")} ${this._stripe._appInfo ? this._stripe.getAppInfoAsString() : ""}`.trim();
	}
	_getTelemetryHeader() {
		if (this._stripe.getTelemetryEnabled() && this._stripe._prevRequestMetrics.length > 0) {
			const metrics = this._stripe._prevRequestMetrics.shift();
			return JSON.stringify({ last_request_metrics: metrics });
		}
	}
	_recordRequestMetrics(requestId, requestDurationMs, usage) {
		if (this._stripe.getTelemetryEnabled() && requestId) if (this._stripe._prevRequestMetrics.length > this._maxBufferedRequestMetric) emitWarning("Request metrics buffer is full, dropping telemetry message.");
		else {
			const m = {
				request_id: requestId,
				request_duration_ms: requestDurationMs
			};
			if (usage && usage.length > 0) m.usage = usage;
			this._stripe._prevRequestMetrics.push(m);
		}
	}
	_rawRequest(method, path, params, options) {
		return new Promise((resolve, reject) => {
			let opts;
			try {
				const requestMethod = method.toUpperCase();
				if (requestMethod !== "POST" && params && Object.keys(params).length !== 0) throw new Error("rawRequest only supports params on POST requests. Please pass null and add your parameters to path.");
				const args = [].slice.call([params, options]);
				const dataFromArgs = getDataFromArgs(args);
				const data = requestMethod === "POST" ? Object.assign({}, dataFromArgs) : null;
				const calculatedOptions = getOptionsFromArgs(args);
				const headers = calculatedOptions.headers;
				opts = {
					requestMethod,
					requestPath: path,
					bodyData: data,
					queryData: {},
					authenticator: calculatedOptions.authenticator,
					headers,
					host: calculatedOptions.host,
					streaming: !!calculatedOptions.streaming,
					settings: {},
					usage: ["raw_request"]
				};
			} catch (err) {
				reject(err);
				return;
			}
			function requestCallback(err, response) {
				if (err) reject(err);
				else resolve(response);
			}
			const { headers, settings } = opts;
			const authenticator = opts.authenticator;
			this._request(opts.requestMethod, opts.host, path, opts.bodyData, authenticator, {
				headers,
				settings,
				streaming: opts.streaming
			}, opts.usage, requestCallback);
		});
	}
	_request(method, host, path, data, authenticator, options, usage = [], callback, requestDataProcessor = null) {
		var _a;
		let requestData;
		authenticator = (_a = authenticator !== null && authenticator !== void 0 ? authenticator : this._stripe._authenticator) !== null && _a !== void 0 ? _a : null;
		const apiMode = getAPIMode(path);
		const retryRequest = (requestFn, apiVersion, headers, requestRetries, retryAfter) => {
			return setTimeout(requestFn, this._getSleepTimeInMS(requestRetries, retryAfter), apiVersion, headers, requestRetries + 1);
		};
		const makeRequest = (apiVersion, headers, numRetries) => {
			const timeout = options.settings && options.settings.timeout && Number.isInteger(options.settings.timeout) && options.settings.timeout >= 0 ? options.settings.timeout : this._stripe.getApiField("timeout");
			const request = {
				host: host || this._stripe.getApiField("host"),
				port: this._stripe.getApiField("port"),
				path,
				method,
				headers: Object.assign({}, headers),
				body: requestData,
				protocol: this._stripe.getApiField("protocol")
			};
			authenticator(request).then(() => {
				const req = this._stripe.getApiField("httpClient").makeRequest(request.host, request.port, request.path, request.method, request.headers, request.body, request.protocol, timeout);
				const requestStartTime = Date.now();
				const requestEvent = removeNullish({
					api_version: apiVersion,
					account: parseHttpHeaderAsString(headers["Stripe-Account"]),
					idempotency_key: parseHttpHeaderAsString(headers["Idempotency-Key"]),
					method,
					path,
					request_start_time: requestStartTime
				});
				const requestRetries = numRetries || 0;
				const maxRetries = this._getMaxNetworkRetries(options.settings || {});
				this._stripe._emitter.emit("request", requestEvent);
				req.then((res) => {
					if (RequestSender._shouldRetry(res, requestRetries, maxRetries)) return retryRequest(makeRequest, apiVersion, headers, requestRetries, parseHttpHeaderAsNumber(res.getHeaders()["retry-after"]));
					else if (options.streaming && res.getStatusCode() < 400) return this._streamingResponseHandler(requestEvent, usage, callback)(res);
					else return this._jsonResponseHandler(requestEvent, apiMode, usage, callback)(res);
				}).catch((error) => {
					if (RequestSender._shouldRetry(null, requestRetries, maxRetries, error)) return retryRequest(makeRequest, apiVersion, headers, requestRetries, null);
					else return callback(new StripeConnectionError({
						message: error.code && error.code === HttpClient.TIMEOUT_ERROR_CODE ? `Request aborted due to timeout being reached (${timeout}ms)` : RequestSender._generateConnectionErrorMessage(requestRetries),
						detail: error
					}));
				});
			}).catch((e) => {
				throw new StripeError({
					message: "Unable to authenticate the request",
					exception: e
				});
			});
		};
		const prepareAndMakeRequest = (error, data) => {
			if (error) return callback(error);
			requestData = data;
			this._stripe.getClientUserAgent((clientUserAgent) => {
				const apiVersion = this._stripe.getApiField("version");
				makeRequest(apiVersion, this._makeHeaders({
					contentType: apiMode == "v2" ? "application/json" : "application/x-www-form-urlencoded",
					contentLength: requestData.length,
					apiVersion,
					clientUserAgent,
					method,
					userSuppliedHeaders: options.headers,
					userSuppliedSettings: options.settings,
					stripeAccount: apiMode == "v2" ? null : this._stripe.getApiField("stripeAccount"),
					stripeContext: apiMode == "v2" ? this._stripe.getApiField("stripeContext") : null,
					apiMode
				}), 0);
			});
		};
		if (requestDataProcessor) requestDataProcessor(method, data, options.headers, prepareAndMakeRequest);
		else {
			let stringifiedData;
			if (apiMode == "v2") stringifiedData = data ? jsonStringifyRequestData(data) : "";
			else stringifiedData = queryStringifyRequestData(data || {}, apiMode);
			prepareAndMakeRequest(null, stringifiedData);
		}
	}
};
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/autoPagination.js
var V1Iterator = class {
	constructor(firstPagePromise, requestArgs, spec, stripeResource) {
		this.index = 0;
		this.pagePromise = firstPagePromise;
		this.promiseCache = { currentPromise: null };
		this.requestArgs = requestArgs;
		this.spec = spec;
		this.stripeResource = stripeResource;
	}
	async iterate(pageResult) {
		if (!(pageResult && pageResult.data && typeof pageResult.data.length === "number")) throw Error("Unexpected: Stripe API response does not have a well-formed `data` array.");
		const reverseIteration = isReverseIteration(this.requestArgs);
		if (this.index < pageResult.data.length) {
			const idx = reverseIteration ? pageResult.data.length - 1 - this.index : this.index;
			const value = pageResult.data[idx];
			this.index += 1;
			return {
				value,
				done: false
			};
		} else if (pageResult.has_more) {
			this.index = 0;
			this.pagePromise = this.getNextPage(pageResult);
			const nextPageResult = await this.pagePromise;
			return this.iterate(nextPageResult);
		}
		return {
			done: true,
			value: void 0
		};
	}
	/** @abstract */
	getNextPage(_pageResult) {
		throw new Error("Unimplemented");
	}
	async _next() {
		return this.iterate(await this.pagePromise);
	}
	next() {
		/**
		* If a user calls `.next()` multiple times in parallel,
		* return the same result until something has resolved
		* to prevent page-turning race conditions.
		*/
		if (this.promiseCache.currentPromise) return this.promiseCache.currentPromise;
		const nextPromise = (async () => {
			const ret = await this._next();
			this.promiseCache.currentPromise = null;
			return ret;
		})();
		this.promiseCache.currentPromise = nextPromise;
		return nextPromise;
	}
};
var V1ListIterator = class extends V1Iterator {
	getNextPage(pageResult) {
		const reverseIteration = isReverseIteration(this.requestArgs);
		const lastId = getLastId(pageResult, reverseIteration);
		return this.stripeResource._makeRequest(this.requestArgs, this.spec, { [reverseIteration ? "ending_before" : "starting_after"]: lastId });
	}
};
var V1SearchIterator = class extends V1Iterator {
	getNextPage(pageResult) {
		if (!pageResult.next_page) throw Error("Unexpected: Stripe API response does not have a well-formed `next_page` field, but `has_more` was true.");
		return this.stripeResource._makeRequest(this.requestArgs, this.spec, { page: pageResult.next_page });
	}
};
var V2ListIterator = class {
	constructor(firstPagePromise, requestArgs, spec, stripeResource) {
		this.currentPageIterator = (async () => {
			return (await firstPagePromise).data[Symbol.iterator]();
		})();
		this.nextPageUrl = (async () => {
			return (await firstPagePromise).next_page_url || null;
		})();
		this.requestArgs = requestArgs;
		this.spec = spec;
		this.stripeResource = stripeResource;
	}
	async turnPage() {
		const nextPageUrl = await this.nextPageUrl;
		if (!nextPageUrl) return null;
		this.spec.fullPath = nextPageUrl;
		const page = await this.stripeResource._makeRequest([], this.spec, {});
		this.nextPageUrl = Promise.resolve(page.next_page_url);
		this.currentPageIterator = Promise.resolve(page.data[Symbol.iterator]());
		return this.currentPageIterator;
	}
	async next() {
		{
			const result = (await this.currentPageIterator).next();
			if (!result.done) return {
				done: false,
				value: result.value
			};
		}
		const nextPageIterator = await this.turnPage();
		if (!nextPageIterator) return {
			done: true,
			value: void 0
		};
		const result = nextPageIterator.next();
		if (!result.done) return {
			done: false,
			value: result.value
		};
		return {
			done: true,
			value: void 0
		};
	}
};
var makeAutoPaginationMethods = (stripeResource, requestArgs, spec, firstPagePromise) => {
	const apiMode = getAPIMode(spec.fullPath || spec.path);
	if (apiMode !== "v2" && spec.methodType === "search") return makeAutoPaginationMethodsFromIterator(new V1SearchIterator(firstPagePromise, requestArgs, spec, stripeResource));
	if (apiMode !== "v2" && spec.methodType === "list") return makeAutoPaginationMethodsFromIterator(new V1ListIterator(firstPagePromise, requestArgs, spec, stripeResource));
	if (apiMode === "v2" && spec.methodType === "list") return makeAutoPaginationMethodsFromIterator(new V2ListIterator(firstPagePromise, requestArgs, spec, stripeResource));
	return null;
};
var makeAutoPaginationMethodsFromIterator = (iterator) => {
	const autoPagingEach = makeAutoPagingEach((...args) => iterator.next(...args));
	const autoPaginationMethods = {
		autoPagingEach,
		autoPagingToArray: makeAutoPagingToArray(autoPagingEach),
		next: () => iterator.next(),
		return: () => {
			return {};
		},
		[getAsyncIteratorSymbol()]: () => {
			return autoPaginationMethods;
		}
	};
	return autoPaginationMethods;
};
/**
* ----------------
* Private Helpers:
* ----------------
*/
function getAsyncIteratorSymbol() {
	if (typeof Symbol !== "undefined" && Symbol.asyncIterator) return Symbol.asyncIterator;
	return "@@asyncIterator";
}
function getDoneCallback(args) {
	if (args.length < 2) return null;
	const onDone = args[1];
	if (typeof onDone !== "function") throw Error(`The second argument to autoPagingEach, if present, must be a callback function; received ${typeof onDone}`);
	return onDone;
}
/**
* We allow four forms of the `onItem` callback (the middle two being equivalent),
*
*   1. `.autoPagingEach((item) => { doSomething(item); return false; });`
*   2. `.autoPagingEach(async (item) => { await doSomething(item); return false; });`
*   3. `.autoPagingEach((item) => doSomething(item).then(() => false));`
*   4. `.autoPagingEach((item, next) => { doSomething(item); next(false); });`
*
* In addition to standard validation, this helper
* coalesces the former forms into the latter form.
*/
function getItemCallback(args) {
	if (args.length === 0) return;
	const onItem = args[0];
	if (typeof onItem !== "function") throw Error(`The first argument to autoPagingEach, if present, must be a callback function; received ${typeof onItem}`);
	if (onItem.length === 2) return onItem;
	if (onItem.length > 2) throw Error(`The \`onItem\` callback function passed to autoPagingEach must accept at most two arguments; got ${onItem}`);
	return function _onItem(item, next) {
		next(onItem(item));
	};
}
function getLastId(listResult, reverseIteration) {
	const lastIdx = reverseIteration ? 0 : listResult.data.length - 1;
	const lastItem = listResult.data[lastIdx];
	const lastId = lastItem && lastItem.id;
	if (!lastId) throw Error("Unexpected: No `id` found on the last item while auto-paging a list.");
	return lastId;
}
function makeAutoPagingEach(asyncIteratorNext) {
	return function autoPagingEach() {
		const args = [].slice.call(arguments);
		const onItem = getItemCallback(args);
		const onDone = getDoneCallback(args);
		if (args.length > 2) throw Error(`autoPagingEach takes up to two arguments; received ${args}`);
		return callbackifyPromiseWithTimeout(wrapAsyncIteratorWithCallback(asyncIteratorNext, onItem), onDone);
	};
}
function makeAutoPagingToArray(autoPagingEach) {
	return function autoPagingToArray(opts, onDone) {
		const limit = opts && opts.limit;
		if (!limit) throw Error("You must pass a `limit` option to autoPagingToArray, e.g., `autoPagingToArray({limit: 1000});`.");
		if (limit > 1e4) throw Error("You cannot specify a limit of more than 10,000 items to fetch in `autoPagingToArray`; use `autoPagingEach` to iterate through longer lists.");
		return callbackifyPromiseWithTimeout(new Promise((resolve, reject) => {
			const items = [];
			autoPagingEach((item) => {
				items.push(item);
				if (items.length >= limit) return false;
			}).then(() => {
				resolve(items);
			}).catch(reject);
		}), onDone);
	};
}
function wrapAsyncIteratorWithCallback(asyncIteratorNext, onItem) {
	return new Promise((resolve, reject) => {
		function handleIteration(iterResult) {
			if (iterResult.done) {
				resolve();
				return;
			}
			const item = iterResult.value;
			return new Promise((next) => {
				onItem(item, next);
			}).then((shouldContinue) => {
				if (shouldContinue === false) return handleIteration({
					done: true,
					value: void 0
				});
				else return asyncIteratorNext().then(handleIteration);
			});
		}
		asyncIteratorNext().then(handleIteration).catch(reject);
	});
}
function isReverseIteration(requestArgs) {
	return !!getDataFromArgs([].slice.call(requestArgs)).ending_before;
}
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/StripeMethod.js
/**
* Create an API method from the declared spec.
*
* @param [spec.method='GET'] Request Method (POST, GET, DELETE, PUT)
* @param [spec.path=''] Path to be appended to the API BASE_PATH, joined with
*  the instance's path (e.g. 'charges' or 'customers')
* @param [spec.fullPath=''] Fully qualified path to the method (eg. /v1/a/b/c).
*  If this is specified, path should not be specified.
* @param [spec.urlParams=[]] Array of required arguments in the order that they
*  must be passed by the consumer of the API. Subsequent optional arguments are
*  optionally passed through a hash (Object) as the penultimate argument
*  (preceding the also-optional callback argument
* @param [spec.encode] Function for mutating input parameters to a method.
*  Usefully for applying transforms to data on a per-method basis.
* @param [spec.host] Hostname for the request.
*
* <!-- Public API accessible via Stripe.StripeResource.method -->
*/
function stripeMethod$127(spec) {
	if (spec.path !== void 0 && spec.fullPath !== void 0) throw new Error(`Method spec specified both a 'path' (${spec.path}) and a 'fullPath' (${spec.fullPath}).`);
	return function(...args) {
		const callback = typeof args[args.length - 1] == "function" && args.pop();
		spec.urlParams = extractUrlParams(spec.fullPath || this.createResourcePathWithSymbols(spec.path || ""));
		const requestPromise = callbackifyPromiseWithTimeout(this._makeRequest(args, spec, {}), callback);
		Object.assign(requestPromise, makeAutoPaginationMethods(this, args, spec, requestPromise));
		return requestPromise;
	};
}
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/StripeResource.js
StripeResource.extend = protoExtend;
StripeResource.method = stripeMethod$127;
StripeResource.MAX_BUFFERED_REQUEST_METRICS = 100;
/**
* Encapsulates request logic for a Stripe Resource
*/
function StripeResource(stripe, deprecatedUrlData) {
	this._stripe = stripe;
	if (deprecatedUrlData) throw new Error("Support for curried url params was dropped in stripe-node v7.0.0. Instead, pass two ids.");
	this.basePath = makeURLInterpolator(this.basePath || stripe.getApiField("basePath"));
	this.resourcePath = this.path;
	this.path = makeURLInterpolator(this.path);
	this.initialize(...arguments);
}
StripeResource.prototype = {
	_stripe: null,
	path: "",
	resourcePath: "",
	basePath: null,
	initialize() {},
	requestDataProcessor: null,
	validateRequest: null,
	createFullPath(commandPath, urlData) {
		const urlParts = [this.basePath(urlData), this.path(urlData)];
		if (typeof commandPath === "function") {
			const computedCommandPath = commandPath(urlData);
			if (computedCommandPath) urlParts.push(computedCommandPath);
		} else urlParts.push(commandPath);
		return this._joinUrlParts(urlParts);
	},
	createResourcePathWithSymbols(pathWithSymbols) {
		if (pathWithSymbols) return `/${this._joinUrlParts([this.resourcePath, pathWithSymbols])}`;
		else return `/${this.resourcePath}`;
	},
	_joinUrlParts(parts) {
		return parts.join("/").replace(/\/{2,}/g, "/");
	},
	_getRequestOpts(requestArgs, spec, overrideData) {
		var _a;
		const requestMethod = (spec.method || "GET").toUpperCase();
		const usage = spec.usage || [];
		const urlParams = spec.urlParams || [];
		const encode = spec.encode || ((data) => data);
		const isUsingFullPath = !!spec.fullPath;
		const commandPath = makeURLInterpolator(isUsingFullPath ? spec.fullPath : spec.path || "");
		const path = isUsingFullPath ? spec.fullPath : this.createResourcePathWithSymbols(spec.path);
		const args = [].slice.call(requestArgs);
		const urlData = urlParams.reduce((urlData, param) => {
			const arg = args.shift();
			if (typeof arg !== "string") throw new Error(`Stripe: Argument "${param}" must be a string, but got: ${arg} (on API request to \`${requestMethod} ${path}\`)`);
			urlData[param] = arg;
			return urlData;
		}, {});
		const dataFromArgs = getDataFromArgs(args);
		const data = encode(Object.assign({}, dataFromArgs, overrideData));
		const options = getOptionsFromArgs(args);
		const host = options.host || spec.host;
		const streaming = !!spec.streaming || !!options.streaming;
		if (args.filter((x) => x != null).length) throw new Error(`Stripe: Unknown arguments (${args}). Did you mean to pass an options object? See https://github.com/stripe/stripe-node/wiki/Passing-Options. (on API request to ${requestMethod} \`${path}\`)`);
		const requestPath = isUsingFullPath ? commandPath(urlData) : this.createFullPath(commandPath, urlData);
		const headers = Object.assign(options.headers, spec.headers);
		if (spec.validator) spec.validator(data, { headers });
		const dataInQuery = spec.method === "GET" || spec.method === "DELETE";
		return {
			requestMethod,
			requestPath,
			bodyData: dataInQuery ? null : data,
			queryData: dataInQuery ? data : {},
			authenticator: (_a = options.authenticator) !== null && _a !== void 0 ? _a : null,
			headers,
			host: host !== null && host !== void 0 ? host : null,
			streaming,
			settings: options.settings,
			usage
		};
	},
	_makeRequest(requestArgs, spec, overrideData) {
		return new Promise((resolve, reject) => {
			var _a;
			let opts;
			try {
				opts = this._getRequestOpts(requestArgs, spec, overrideData);
			} catch (err) {
				reject(err);
				return;
			}
			function requestCallback(err, response) {
				if (err) reject(err);
				else resolve(spec.transformResponseData ? spec.transformResponseData(response) : response);
			}
			const emptyQuery = Object.keys(opts.queryData).length === 0;
			const path = [
				opts.requestPath,
				emptyQuery ? "" : "?",
				queryStringifyRequestData(opts.queryData, getAPIMode(opts.requestPath))
			].join("");
			const { headers, settings } = opts;
			this._stripe._requestSender._request(opts.requestMethod, opts.host, path, opts.bodyData, opts.authenticator, {
				headers,
				settings,
				streaming: opts.streaming
			}, opts.usage, requestCallback, (_a = this.requestDataProcessor) === null || _a === void 0 ? void 0 : _a.bind(this));
		});
	}
};
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/Webhooks.js
function createWebhooks(platformFunctions) {
	const Webhook = {
		DEFAULT_TOLERANCE: 300,
		signature: null,
		constructEvent(payload, header, secret, tolerance, cryptoProvider, receivedAt) {
			try {
				if (!this.signature) throw new Error("ERR: missing signature helper, unable to verify");
				this.signature.verifyHeader(payload, header, secret, tolerance || Webhook.DEFAULT_TOLERANCE, cryptoProvider, receivedAt);
			} catch (e) {
				if (e instanceof CryptoProviderOnlySupportsAsyncError) e.message += "\nUse `await constructEventAsync(...)` instead of `constructEvent(...)`";
				throw e;
			}
			return payload instanceof Uint8Array ? JSON.parse(new TextDecoder("utf8").decode(payload)) : JSON.parse(payload);
		},
		async constructEventAsync(payload, header, secret, tolerance, cryptoProvider, receivedAt) {
			if (!this.signature) throw new Error("ERR: missing signature helper, unable to verify");
			await this.signature.verifyHeaderAsync(payload, header, secret, tolerance || Webhook.DEFAULT_TOLERANCE, cryptoProvider, receivedAt);
			return payload instanceof Uint8Array ? JSON.parse(new TextDecoder("utf8").decode(payload)) : JSON.parse(payload);
		},
		/**
		* Generates a header to be used for webhook mocking
		*
		* @typedef {object} opts
		* @property {number} timestamp - Timestamp of the header. Defaults to Date.now()
		* @property {string} payload - JSON stringified payload object, containing the 'id' and 'object' parameters
		* @property {string} secret - Stripe webhook secret 'whsec_...'
		* @property {string} scheme - Version of API to hit. Defaults to 'v1'.
		* @property {string} signature - Computed webhook signature
		* @property {CryptoProvider} cryptoProvider - Crypto provider to use for computing the signature if none was provided. Defaults to NodeCryptoProvider.
		*/
		generateTestHeaderString: function(opts) {
			const preparedOpts = prepareOptions(opts);
			const signature = preparedOpts.signature || preparedOpts.cryptoProvider.computeHMACSignature(preparedOpts.payloadString, preparedOpts.secret);
			return preparedOpts.generateHeaderString(signature);
		},
		generateTestHeaderStringAsync: async function(opts) {
			const preparedOpts = prepareOptions(opts);
			const signature = preparedOpts.signature || await preparedOpts.cryptoProvider.computeHMACSignatureAsync(preparedOpts.payloadString, preparedOpts.secret);
			return preparedOpts.generateHeaderString(signature);
		}
	};
	const signature = {
		EXPECTED_SCHEME: "v1",
		verifyHeader(encodedPayload, encodedHeader, secret, tolerance, cryptoProvider, receivedAt) {
			const { decodedHeader: header, decodedPayload: payload, details, suspectPayloadType } = parseEventDetails(encodedPayload, encodedHeader, this.EXPECTED_SCHEME);
			const secretContainsWhitespace = /\s/.test(secret);
			cryptoProvider = cryptoProvider || getCryptoProvider();
			validateComputedSignature(payload, header, details, cryptoProvider.computeHMACSignature(makeHMACContent(payload, details), secret), tolerance, suspectPayloadType, secretContainsWhitespace, receivedAt);
			return true;
		},
		async verifyHeaderAsync(encodedPayload, encodedHeader, secret, tolerance, cryptoProvider, receivedAt) {
			const { decodedHeader: header, decodedPayload: payload, details, suspectPayloadType } = parseEventDetails(encodedPayload, encodedHeader, this.EXPECTED_SCHEME);
			const secretContainsWhitespace = /\s/.test(secret);
			cryptoProvider = cryptoProvider || getCryptoProvider();
			return validateComputedSignature(payload, header, details, await cryptoProvider.computeHMACSignatureAsync(makeHMACContent(payload, details), secret), tolerance, suspectPayloadType, secretContainsWhitespace, receivedAt);
		}
	};
	function makeHMACContent(payload, details) {
		return `${details.timestamp}.${payload}`;
	}
	function parseEventDetails(encodedPayload, encodedHeader, expectedScheme) {
		if (!encodedPayload) throw new StripeSignatureVerificationError(encodedHeader, encodedPayload, { message: "No webhook payload was provided." });
		const suspectPayloadType = typeof encodedPayload != "string" && !(encodedPayload instanceof Uint8Array);
		const textDecoder = new TextDecoder("utf8");
		const decodedPayload = encodedPayload instanceof Uint8Array ? textDecoder.decode(encodedPayload) : encodedPayload;
		if (Array.isArray(encodedHeader)) throw new Error("Unexpected: An array was passed as a header, which should not be possible for the stripe-signature header.");
		if (encodedHeader == null || encodedHeader == "") throw new StripeSignatureVerificationError(encodedHeader, encodedPayload, { message: "No stripe-signature header value was provided." });
		const decodedHeader = encodedHeader instanceof Uint8Array ? textDecoder.decode(encodedHeader) : encodedHeader;
		const details = parseHeader(decodedHeader, expectedScheme);
		if (!details || details.timestamp === -1) throw new StripeSignatureVerificationError(decodedHeader, decodedPayload, { message: "Unable to extract timestamp and signatures from header" });
		if (!details.signatures.length) throw new StripeSignatureVerificationError(decodedHeader, decodedPayload, { message: "No signatures found with expected scheme" });
		return {
			decodedPayload,
			decodedHeader,
			details,
			suspectPayloadType
		};
	}
	function validateComputedSignature(payload, header, details, expectedSignature, tolerance, suspectPayloadType, secretContainsWhitespace, receivedAt) {
		const signatureFound = !!details.signatures.filter(platformFunctions.secureCompare.bind(platformFunctions, expectedSignature)).length;
		const whitespaceMessage = secretContainsWhitespace ? "\n\nNote: The provided signing secret contains whitespace. This often indicates an extra newline or space is in the value" : "";
		if (!signatureFound) {
			if (suspectPayloadType) throw new StripeSignatureVerificationError(header, payload, { message: "Webhook payload must be provided as a string or a Buffer (https://nodejs.org/api/buffer.html) instance representing the _raw_ request body.Payload was provided as a parsed JavaScript object instead. \nSignature verification is impossible without access to the original signed material. \n\nLearn more about webhook signing and explore webhook integration examples for various frameworks at https://docs.stripe.com/webhooks/signature\n" + whitespaceMessage });
			throw new StripeSignatureVerificationError(header, payload, { message: "No signatures found matching the expected signature for payload. Are you passing the raw request body you received from Stripe? \n If a webhook request is being forwarded by a third-party tool, ensure that the exact request body, including JSON formatting and new line style, is preserved.\n\nLearn more about webhook signing and explore webhook integration examples for various frameworks at https://docs.stripe.com/webhooks/signature\n" + whitespaceMessage });
		}
		const timestampAge = Math.floor((typeof receivedAt === "number" ? receivedAt : Date.now()) / 1e3) - details.timestamp;
		if (tolerance > 0 && timestampAge > tolerance) throw new StripeSignatureVerificationError(header, payload, { message: "Timestamp outside the tolerance zone" });
		return true;
	}
	function parseHeader(header, scheme) {
		if (typeof header !== "string") return null;
		return header.split(",").reduce((accum, item) => {
			const kv = item.split("=");
			if (kv[0] === "t") accum.timestamp = parseInt(kv[1], 10);
			if (kv[0] === scheme) accum.signatures.push(kv[1]);
			return accum;
		}, {
			timestamp: -1,
			signatures: []
		});
	}
	let webhooksCryptoProviderInstance = null;
	/**
	* Lazily instantiate a CryptoProvider instance. This is a stateless object
	* so a singleton can be used here.
	*/
	function getCryptoProvider() {
		if (!webhooksCryptoProviderInstance) webhooksCryptoProviderInstance = platformFunctions.createDefaultCryptoProvider();
		return webhooksCryptoProviderInstance;
	}
	function prepareOptions(opts) {
		if (!opts) throw new StripeError({ message: "Options are required" });
		const timestamp = Math.floor(opts.timestamp) || Math.floor(Date.now() / 1e3);
		const scheme = opts.scheme || signature.EXPECTED_SCHEME;
		const cryptoProvider = opts.cryptoProvider || getCryptoProvider();
		const payloadString = `${timestamp}.${opts.payload}`;
		const generateHeaderString = (signature) => {
			return `t=${timestamp},${scheme}=${signature}`;
		};
		return Object.assign(Object.assign({}, opts), {
			timestamp,
			scheme,
			cryptoProvider,
			payloadString,
			generateHeaderString
		});
	}
	Webhook.signature = signature;
	return Webhook;
}
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/apiVersion.js
var ApiVersion = "2025-08-27.basil";
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/ResourceNamespace.js
function ResourceNamespace(stripe, resources) {
	for (const name in resources) {
		if (!Object.prototype.hasOwnProperty.call(resources, name)) continue;
		const camelCaseName = name[0].toLowerCase() + name.substring(1);
		const resource = new resources[name](stripe);
		this[camelCaseName] = resource;
	}
}
function resourceNamespace(namespace, resources) {
	return function(stripe) {
		return new ResourceNamespace(stripe, resources);
	};
}
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/FinancialConnections/Accounts.js
var stripeMethod$126 = StripeResource.method;
var Accounts$1 = StripeResource.extend({
	retrieve: stripeMethod$126({
		method: "GET",
		fullPath: "/v1/financial_connections/accounts/{account}"
	}),
	list: stripeMethod$126({
		method: "GET",
		fullPath: "/v1/financial_connections/accounts",
		methodType: "list"
	}),
	disconnect: stripeMethod$126({
		method: "POST",
		fullPath: "/v1/financial_connections/accounts/{account}/disconnect"
	}),
	listOwners: stripeMethod$126({
		method: "GET",
		fullPath: "/v1/financial_connections/accounts/{account}/owners",
		methodType: "list"
	}),
	refresh: stripeMethod$126({
		method: "POST",
		fullPath: "/v1/financial_connections/accounts/{account}/refresh"
	}),
	subscribe: stripeMethod$126({
		method: "POST",
		fullPath: "/v1/financial_connections/accounts/{account}/subscribe"
	}),
	unsubscribe: stripeMethod$126({
		method: "POST",
		fullPath: "/v1/financial_connections/accounts/{account}/unsubscribe"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Entitlements/ActiveEntitlements.js
var stripeMethod$125 = StripeResource.method;
var ActiveEntitlements = StripeResource.extend({
	retrieve: stripeMethod$125({
		method: "GET",
		fullPath: "/v1/entitlements/active_entitlements/{id}"
	}),
	list: stripeMethod$125({
		method: "GET",
		fullPath: "/v1/entitlements/active_entitlements",
		methodType: "list"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Billing/Alerts.js
var stripeMethod$124 = StripeResource.method;
var Alerts = StripeResource.extend({
	create: stripeMethod$124({
		method: "POST",
		fullPath: "/v1/billing/alerts"
	}),
	retrieve: stripeMethod$124({
		method: "GET",
		fullPath: "/v1/billing/alerts/{id}"
	}),
	list: stripeMethod$124({
		method: "GET",
		fullPath: "/v1/billing/alerts",
		methodType: "list"
	}),
	activate: stripeMethod$124({
		method: "POST",
		fullPath: "/v1/billing/alerts/{id}/activate"
	}),
	archive: stripeMethod$124({
		method: "POST",
		fullPath: "/v1/billing/alerts/{id}/archive"
	}),
	deactivate: stripeMethod$124({
		method: "POST",
		fullPath: "/v1/billing/alerts/{id}/deactivate"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Issuing/Authorizations.js
var stripeMethod$123 = StripeResource.method;
var Authorizations$1 = StripeResource.extend({
	retrieve: stripeMethod$123({
		method: "GET",
		fullPath: "/v1/issuing/authorizations/{authorization}"
	}),
	update: stripeMethod$123({
		method: "POST",
		fullPath: "/v1/issuing/authorizations/{authorization}"
	}),
	list: stripeMethod$123({
		method: "GET",
		fullPath: "/v1/issuing/authorizations",
		methodType: "list"
	}),
	approve: stripeMethod$123({
		method: "POST",
		fullPath: "/v1/issuing/authorizations/{authorization}/approve"
	}),
	decline: stripeMethod$123({
		method: "POST",
		fullPath: "/v1/issuing/authorizations/{authorization}/decline"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/TestHelpers/Issuing/Authorizations.js
var stripeMethod$122 = StripeResource.method;
var Authorizations = StripeResource.extend({
	create: stripeMethod$122({
		method: "POST",
		fullPath: "/v1/test_helpers/issuing/authorizations"
	}),
	capture: stripeMethod$122({
		method: "POST",
		fullPath: "/v1/test_helpers/issuing/authorizations/{authorization}/capture"
	}),
	expire: stripeMethod$122({
		method: "POST",
		fullPath: "/v1/test_helpers/issuing/authorizations/{authorization}/expire"
	}),
	finalizeAmount: stripeMethod$122({
		method: "POST",
		fullPath: "/v1/test_helpers/issuing/authorizations/{authorization}/finalize_amount"
	}),
	increment: stripeMethod$122({
		method: "POST",
		fullPath: "/v1/test_helpers/issuing/authorizations/{authorization}/increment"
	}),
	respond: stripeMethod$122({
		method: "POST",
		fullPath: "/v1/test_helpers/issuing/authorizations/{authorization}/fraud_challenges/respond"
	}),
	reverse: stripeMethod$122({
		method: "POST",
		fullPath: "/v1/test_helpers/issuing/authorizations/{authorization}/reverse"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Tax/Calculations.js
var stripeMethod$121 = StripeResource.method;
var Calculations = StripeResource.extend({
	create: stripeMethod$121({
		method: "POST",
		fullPath: "/v1/tax/calculations"
	}),
	retrieve: stripeMethod$121({
		method: "GET",
		fullPath: "/v1/tax/calculations/{calculation}"
	}),
	listLineItems: stripeMethod$121({
		method: "GET",
		fullPath: "/v1/tax/calculations/{calculation}/line_items",
		methodType: "list"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Issuing/Cardholders.js
var stripeMethod$120 = StripeResource.method;
var Cardholders = StripeResource.extend({
	create: stripeMethod$120({
		method: "POST",
		fullPath: "/v1/issuing/cardholders"
	}),
	retrieve: stripeMethod$120({
		method: "GET",
		fullPath: "/v1/issuing/cardholders/{cardholder}"
	}),
	update: stripeMethod$120({
		method: "POST",
		fullPath: "/v1/issuing/cardholders/{cardholder}"
	}),
	list: stripeMethod$120({
		method: "GET",
		fullPath: "/v1/issuing/cardholders",
		methodType: "list"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Issuing/Cards.js
var stripeMethod$119 = StripeResource.method;
var Cards$1 = StripeResource.extend({
	create: stripeMethod$119({
		method: "POST",
		fullPath: "/v1/issuing/cards"
	}),
	retrieve: stripeMethod$119({
		method: "GET",
		fullPath: "/v1/issuing/cards/{card}"
	}),
	update: stripeMethod$119({
		method: "POST",
		fullPath: "/v1/issuing/cards/{card}"
	}),
	list: stripeMethod$119({
		method: "GET",
		fullPath: "/v1/issuing/cards",
		methodType: "list"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/TestHelpers/Issuing/Cards.js
var stripeMethod$118 = StripeResource.method;
var Cards = StripeResource.extend({
	deliverCard: stripeMethod$118({
		method: "POST",
		fullPath: "/v1/test_helpers/issuing/cards/{card}/shipping/deliver"
	}),
	failCard: stripeMethod$118({
		method: "POST",
		fullPath: "/v1/test_helpers/issuing/cards/{card}/shipping/fail"
	}),
	returnCard: stripeMethod$118({
		method: "POST",
		fullPath: "/v1/test_helpers/issuing/cards/{card}/shipping/return"
	}),
	shipCard: stripeMethod$118({
		method: "POST",
		fullPath: "/v1/test_helpers/issuing/cards/{card}/shipping/ship"
	}),
	submitCard: stripeMethod$118({
		method: "POST",
		fullPath: "/v1/test_helpers/issuing/cards/{card}/shipping/submit"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/BillingPortal/Configurations.js
var stripeMethod$117 = StripeResource.method;
var Configurations$1 = StripeResource.extend({
	create: stripeMethod$117({
		method: "POST",
		fullPath: "/v1/billing_portal/configurations"
	}),
	retrieve: stripeMethod$117({
		method: "GET",
		fullPath: "/v1/billing_portal/configurations/{configuration}"
	}),
	update: stripeMethod$117({
		method: "POST",
		fullPath: "/v1/billing_portal/configurations/{configuration}"
	}),
	list: stripeMethod$117({
		method: "GET",
		fullPath: "/v1/billing_portal/configurations",
		methodType: "list"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Terminal/Configurations.js
var stripeMethod$116 = StripeResource.method;
var Configurations = StripeResource.extend({
	create: stripeMethod$116({
		method: "POST",
		fullPath: "/v1/terminal/configurations"
	}),
	retrieve: stripeMethod$116({
		method: "GET",
		fullPath: "/v1/terminal/configurations/{configuration}"
	}),
	update: stripeMethod$116({
		method: "POST",
		fullPath: "/v1/terminal/configurations/{configuration}"
	}),
	list: stripeMethod$116({
		method: "GET",
		fullPath: "/v1/terminal/configurations",
		methodType: "list"
	}),
	del: stripeMethod$116({
		method: "DELETE",
		fullPath: "/v1/terminal/configurations/{configuration}"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/TestHelpers/ConfirmationTokens.js
var stripeMethod$115 = StripeResource.method;
var ConfirmationTokens$1 = StripeResource.extend({ create: stripeMethod$115({
	method: "POST",
	fullPath: "/v1/test_helpers/confirmation_tokens"
}) });
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Terminal/ConnectionTokens.js
var stripeMethod$114 = StripeResource.method;
var ConnectionTokens = StripeResource.extend({ create: stripeMethod$114({
	method: "POST",
	fullPath: "/v1/terminal/connection_tokens"
}) });
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Billing/CreditBalanceSummary.js
var stripeMethod$113 = StripeResource.method;
var CreditBalanceSummary = StripeResource.extend({ retrieve: stripeMethod$113({
	method: "GET",
	fullPath: "/v1/billing/credit_balance_summary"
}) });
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Billing/CreditBalanceTransactions.js
var stripeMethod$112 = StripeResource.method;
var CreditBalanceTransactions = StripeResource.extend({
	retrieve: stripeMethod$112({
		method: "GET",
		fullPath: "/v1/billing/credit_balance_transactions/{id}"
	}),
	list: stripeMethod$112({
		method: "GET",
		fullPath: "/v1/billing/credit_balance_transactions",
		methodType: "list"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Billing/CreditGrants.js
var stripeMethod$111 = StripeResource.method;
var CreditGrants = StripeResource.extend({
	create: stripeMethod$111({
		method: "POST",
		fullPath: "/v1/billing/credit_grants"
	}),
	retrieve: stripeMethod$111({
		method: "GET",
		fullPath: "/v1/billing/credit_grants/{id}"
	}),
	update: stripeMethod$111({
		method: "POST",
		fullPath: "/v1/billing/credit_grants/{id}"
	}),
	list: stripeMethod$111({
		method: "GET",
		fullPath: "/v1/billing/credit_grants",
		methodType: "list"
	}),
	expire: stripeMethod$111({
		method: "POST",
		fullPath: "/v1/billing/credit_grants/{id}/expire"
	}),
	voidGrant: stripeMethod$111({
		method: "POST",
		fullPath: "/v1/billing/credit_grants/{id}/void"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Treasury/CreditReversals.js
var stripeMethod$110 = StripeResource.method;
var CreditReversals = StripeResource.extend({
	create: stripeMethod$110({
		method: "POST",
		fullPath: "/v1/treasury/credit_reversals"
	}),
	retrieve: stripeMethod$110({
		method: "GET",
		fullPath: "/v1/treasury/credit_reversals/{credit_reversal}"
	}),
	list: stripeMethod$110({
		method: "GET",
		fullPath: "/v1/treasury/credit_reversals",
		methodType: "list"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/TestHelpers/Customers.js
var stripeMethod$109 = StripeResource.method;
var Customers$1 = StripeResource.extend({ fundCashBalance: stripeMethod$109({
	method: "POST",
	fullPath: "/v1/test_helpers/customers/{customer}/fund_cash_balance"
}) });
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Treasury/DebitReversals.js
var stripeMethod$108 = StripeResource.method;
var DebitReversals = StripeResource.extend({
	create: stripeMethod$108({
		method: "POST",
		fullPath: "/v1/treasury/debit_reversals"
	}),
	retrieve: stripeMethod$108({
		method: "GET",
		fullPath: "/v1/treasury/debit_reversals/{debit_reversal}"
	}),
	list: stripeMethod$108({
		method: "GET",
		fullPath: "/v1/treasury/debit_reversals",
		methodType: "list"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Issuing/Disputes.js
var stripeMethod$107 = StripeResource.method;
var Disputes$1 = StripeResource.extend({
	create: stripeMethod$107({
		method: "POST",
		fullPath: "/v1/issuing/disputes"
	}),
	retrieve: stripeMethod$107({
		method: "GET",
		fullPath: "/v1/issuing/disputes/{dispute}"
	}),
	update: stripeMethod$107({
		method: "POST",
		fullPath: "/v1/issuing/disputes/{dispute}"
	}),
	list: stripeMethod$107({
		method: "GET",
		fullPath: "/v1/issuing/disputes",
		methodType: "list"
	}),
	submit: stripeMethod$107({
		method: "POST",
		fullPath: "/v1/issuing/disputes/{dispute}/submit"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Radar/EarlyFraudWarnings.js
var stripeMethod$106 = StripeResource.method;
var EarlyFraudWarnings = StripeResource.extend({
	retrieve: stripeMethod$106({
		method: "GET",
		fullPath: "/v1/radar/early_fraud_warnings/{early_fraud_warning}"
	}),
	list: stripeMethod$106({
		method: "GET",
		fullPath: "/v1/radar/early_fraud_warnings",
		methodType: "list"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/V2/Core/EventDestinations.js
var stripeMethod$105 = StripeResource.method;
var EventDestinations = StripeResource.extend({
	create: stripeMethod$105({
		method: "POST",
		fullPath: "/v2/core/event_destinations"
	}),
	retrieve: stripeMethod$105({
		method: "GET",
		fullPath: "/v2/core/event_destinations/{id}"
	}),
	update: stripeMethod$105({
		method: "POST",
		fullPath: "/v2/core/event_destinations/{id}"
	}),
	list: stripeMethod$105({
		method: "GET",
		fullPath: "/v2/core/event_destinations",
		methodType: "list"
	}),
	del: stripeMethod$105({
		method: "DELETE",
		fullPath: "/v2/core/event_destinations/{id}"
	}),
	disable: stripeMethod$105({
		method: "POST",
		fullPath: "/v2/core/event_destinations/{id}/disable"
	}),
	enable: stripeMethod$105({
		method: "POST",
		fullPath: "/v2/core/event_destinations/{id}/enable"
	}),
	ping: stripeMethod$105({
		method: "POST",
		fullPath: "/v2/core/event_destinations/{id}/ping"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/V2/Core/Events.js
var stripeMethod$104 = StripeResource.method;
var Events$1 = StripeResource.extend({
	retrieve(...args) {
		const transformResponseData = (response) => {
			return this.addFetchRelatedObjectIfNeeded(response);
		};
		return stripeMethod$104({
			method: "GET",
			fullPath: "/v2/core/events/{id}",
			transformResponseData
		}).apply(this, args);
	},
	list(...args) {
		const transformResponseData = (response) => {
			return Object.assign(Object.assign({}, response), { data: response.data.map(this.addFetchRelatedObjectIfNeeded.bind(this)) });
		};
		return stripeMethod$104({
			method: "GET",
			fullPath: "/v2/core/events",
			methodType: "list",
			transformResponseData
		}).apply(this, args);
	},
	/**
	* @private
	*
	* For internal use in stripe-node.
	*
	* @param pulledEvent The retrieved event object
	* @returns The retrieved event object with a fetchRelatedObject method,
	* if pulledEvent.related_object is valid (non-null and has a url)
	*/
	addFetchRelatedObjectIfNeeded(pulledEvent) {
		if (!pulledEvent.related_object || !pulledEvent.related_object.url) return pulledEvent;
		return Object.assign(Object.assign({}, pulledEvent), { fetchRelatedObject: () => stripeMethod$104({
			method: "GET",
			fullPath: pulledEvent.related_object.url
		}).apply(this, [{ stripeAccount: pulledEvent.context }]) });
	}
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Entitlements/Features.js
var stripeMethod$103 = StripeResource.method;
var Features = StripeResource.extend({
	create: stripeMethod$103({
		method: "POST",
		fullPath: "/v1/entitlements/features"
	}),
	retrieve: stripeMethod$103({
		method: "GET",
		fullPath: "/v1/entitlements/features/{id}"
	}),
	update: stripeMethod$103({
		method: "POST",
		fullPath: "/v1/entitlements/features/{id}"
	}),
	list: stripeMethod$103({
		method: "GET",
		fullPath: "/v1/entitlements/features",
		methodType: "list"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Treasury/FinancialAccounts.js
var stripeMethod$102 = StripeResource.method;
var FinancialAccounts = StripeResource.extend({
	create: stripeMethod$102({
		method: "POST",
		fullPath: "/v1/treasury/financial_accounts"
	}),
	retrieve: stripeMethod$102({
		method: "GET",
		fullPath: "/v1/treasury/financial_accounts/{financial_account}"
	}),
	update: stripeMethod$102({
		method: "POST",
		fullPath: "/v1/treasury/financial_accounts/{financial_account}"
	}),
	list: stripeMethod$102({
		method: "GET",
		fullPath: "/v1/treasury/financial_accounts",
		methodType: "list"
	}),
	close: stripeMethod$102({
		method: "POST",
		fullPath: "/v1/treasury/financial_accounts/{financial_account}/close"
	}),
	retrieveFeatures: stripeMethod$102({
		method: "GET",
		fullPath: "/v1/treasury/financial_accounts/{financial_account}/features"
	}),
	updateFeatures: stripeMethod$102({
		method: "POST",
		fullPath: "/v1/treasury/financial_accounts/{financial_account}/features"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/TestHelpers/Treasury/InboundTransfers.js
var stripeMethod$101 = StripeResource.method;
var InboundTransfers$1 = StripeResource.extend({
	fail: stripeMethod$101({
		method: "POST",
		fullPath: "/v1/test_helpers/treasury/inbound_transfers/{id}/fail"
	}),
	returnInboundTransfer: stripeMethod$101({
		method: "POST",
		fullPath: "/v1/test_helpers/treasury/inbound_transfers/{id}/return"
	}),
	succeed: stripeMethod$101({
		method: "POST",
		fullPath: "/v1/test_helpers/treasury/inbound_transfers/{id}/succeed"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Treasury/InboundTransfers.js
var stripeMethod$100 = StripeResource.method;
var InboundTransfers = StripeResource.extend({
	create: stripeMethod$100({
		method: "POST",
		fullPath: "/v1/treasury/inbound_transfers"
	}),
	retrieve: stripeMethod$100({
		method: "GET",
		fullPath: "/v1/treasury/inbound_transfers/{id}"
	}),
	list: stripeMethod$100({
		method: "GET",
		fullPath: "/v1/treasury/inbound_transfers",
		methodType: "list"
	}),
	cancel: stripeMethod$100({
		method: "POST",
		fullPath: "/v1/treasury/inbound_transfers/{inbound_transfer}/cancel"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Terminal/Locations.js
var stripeMethod$99 = StripeResource.method;
var Locations = StripeResource.extend({
	create: stripeMethod$99({
		method: "POST",
		fullPath: "/v1/terminal/locations"
	}),
	retrieve: stripeMethod$99({
		method: "GET",
		fullPath: "/v1/terminal/locations/{location}"
	}),
	update: stripeMethod$99({
		method: "POST",
		fullPath: "/v1/terminal/locations/{location}"
	}),
	list: stripeMethod$99({
		method: "GET",
		fullPath: "/v1/terminal/locations",
		methodType: "list"
	}),
	del: stripeMethod$99({
		method: "DELETE",
		fullPath: "/v1/terminal/locations/{location}"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Billing/MeterEventAdjustments.js
var stripeMethod$98 = StripeResource.method;
var MeterEventAdjustments$1 = StripeResource.extend({ create: stripeMethod$98({
	method: "POST",
	fullPath: "/v1/billing/meter_event_adjustments"
}) });
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/V2/Billing/MeterEventAdjustments.js
var stripeMethod$97 = StripeResource.method;
var MeterEventAdjustments = StripeResource.extend({ create: stripeMethod$97({
	method: "POST",
	fullPath: "/v2/billing/meter_event_adjustments"
}) });
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/V2/Billing/MeterEventSession.js
var stripeMethod$96 = StripeResource.method;
var MeterEventSession = StripeResource.extend({ create: stripeMethod$96({
	method: "POST",
	fullPath: "/v2/billing/meter_event_session"
}) });
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/V2/Billing/MeterEventStream.js
var stripeMethod$95 = StripeResource.method;
var MeterEventStream = StripeResource.extend({ create: stripeMethod$95({
	method: "POST",
	fullPath: "/v2/billing/meter_event_stream",
	host: "meter-events.stripe.com"
}) });
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Billing/MeterEvents.js
var stripeMethod$94 = StripeResource.method;
var MeterEvents$1 = StripeResource.extend({ create: stripeMethod$94({
	method: "POST",
	fullPath: "/v1/billing/meter_events"
}) });
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/V2/Billing/MeterEvents.js
var stripeMethod$93 = StripeResource.method;
var MeterEvents = StripeResource.extend({ create: stripeMethod$93({
	method: "POST",
	fullPath: "/v2/billing/meter_events"
}) });
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Billing/Meters.js
var stripeMethod$92 = StripeResource.method;
var Meters = StripeResource.extend({
	create: stripeMethod$92({
		method: "POST",
		fullPath: "/v1/billing/meters"
	}),
	retrieve: stripeMethod$92({
		method: "GET",
		fullPath: "/v1/billing/meters/{id}"
	}),
	update: stripeMethod$92({
		method: "POST",
		fullPath: "/v1/billing/meters/{id}"
	}),
	list: stripeMethod$92({
		method: "GET",
		fullPath: "/v1/billing/meters",
		methodType: "list"
	}),
	deactivate: stripeMethod$92({
		method: "POST",
		fullPath: "/v1/billing/meters/{id}/deactivate"
	}),
	listEventSummaries: stripeMethod$92({
		method: "GET",
		fullPath: "/v1/billing/meters/{id}/event_summaries",
		methodType: "list"
	}),
	reactivate: stripeMethod$92({
		method: "POST",
		fullPath: "/v1/billing/meters/{id}/reactivate"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Climate/Orders.js
var stripeMethod$91 = StripeResource.method;
var Orders = StripeResource.extend({
	create: stripeMethod$91({
		method: "POST",
		fullPath: "/v1/climate/orders"
	}),
	retrieve: stripeMethod$91({
		method: "GET",
		fullPath: "/v1/climate/orders/{order}"
	}),
	update: stripeMethod$91({
		method: "POST",
		fullPath: "/v1/climate/orders/{order}"
	}),
	list: stripeMethod$91({
		method: "GET",
		fullPath: "/v1/climate/orders",
		methodType: "list"
	}),
	cancel: stripeMethod$91({
		method: "POST",
		fullPath: "/v1/climate/orders/{order}/cancel"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/TestHelpers/Treasury/OutboundPayments.js
var stripeMethod$90 = StripeResource.method;
var OutboundPayments$1 = StripeResource.extend({
	update: stripeMethod$90({
		method: "POST",
		fullPath: "/v1/test_helpers/treasury/outbound_payments/{id}"
	}),
	fail: stripeMethod$90({
		method: "POST",
		fullPath: "/v1/test_helpers/treasury/outbound_payments/{id}/fail"
	}),
	post: stripeMethod$90({
		method: "POST",
		fullPath: "/v1/test_helpers/treasury/outbound_payments/{id}/post"
	}),
	returnOutboundPayment: stripeMethod$90({
		method: "POST",
		fullPath: "/v1/test_helpers/treasury/outbound_payments/{id}/return"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Treasury/OutboundPayments.js
var stripeMethod$89 = StripeResource.method;
var OutboundPayments = StripeResource.extend({
	create: stripeMethod$89({
		method: "POST",
		fullPath: "/v1/treasury/outbound_payments"
	}),
	retrieve: stripeMethod$89({
		method: "GET",
		fullPath: "/v1/treasury/outbound_payments/{id}"
	}),
	list: stripeMethod$89({
		method: "GET",
		fullPath: "/v1/treasury/outbound_payments",
		methodType: "list"
	}),
	cancel: stripeMethod$89({
		method: "POST",
		fullPath: "/v1/treasury/outbound_payments/{id}/cancel"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/TestHelpers/Treasury/OutboundTransfers.js
var stripeMethod$88 = StripeResource.method;
var OutboundTransfers$1 = StripeResource.extend({
	update: stripeMethod$88({
		method: "POST",
		fullPath: "/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}"
	}),
	fail: stripeMethod$88({
		method: "POST",
		fullPath: "/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}/fail"
	}),
	post: stripeMethod$88({
		method: "POST",
		fullPath: "/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}/post"
	}),
	returnOutboundTransfer: stripeMethod$88({
		method: "POST",
		fullPath: "/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}/return"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Treasury/OutboundTransfers.js
var stripeMethod$87 = StripeResource.method;
var OutboundTransfers = StripeResource.extend({
	create: stripeMethod$87({
		method: "POST",
		fullPath: "/v1/treasury/outbound_transfers"
	}),
	retrieve: stripeMethod$87({
		method: "GET",
		fullPath: "/v1/treasury/outbound_transfers/{outbound_transfer}"
	}),
	list: stripeMethod$87({
		method: "GET",
		fullPath: "/v1/treasury/outbound_transfers",
		methodType: "list"
	}),
	cancel: stripeMethod$87({
		method: "POST",
		fullPath: "/v1/treasury/outbound_transfers/{outbound_transfer}/cancel"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Issuing/PersonalizationDesigns.js
var stripeMethod$86 = StripeResource.method;
var PersonalizationDesigns$1 = StripeResource.extend({
	create: stripeMethod$86({
		method: "POST",
		fullPath: "/v1/issuing/personalization_designs"
	}),
	retrieve: stripeMethod$86({
		method: "GET",
		fullPath: "/v1/issuing/personalization_designs/{personalization_design}"
	}),
	update: stripeMethod$86({
		method: "POST",
		fullPath: "/v1/issuing/personalization_designs/{personalization_design}"
	}),
	list: stripeMethod$86({
		method: "GET",
		fullPath: "/v1/issuing/personalization_designs",
		methodType: "list"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/TestHelpers/Issuing/PersonalizationDesigns.js
var stripeMethod$85 = StripeResource.method;
var PersonalizationDesigns = StripeResource.extend({
	activate: stripeMethod$85({
		method: "POST",
		fullPath: "/v1/test_helpers/issuing/personalization_designs/{personalization_design}/activate"
	}),
	deactivate: stripeMethod$85({
		method: "POST",
		fullPath: "/v1/test_helpers/issuing/personalization_designs/{personalization_design}/deactivate"
	}),
	reject: stripeMethod$85({
		method: "POST",
		fullPath: "/v1/test_helpers/issuing/personalization_designs/{personalization_design}/reject"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Issuing/PhysicalBundles.js
var stripeMethod$84 = StripeResource.method;
var PhysicalBundles = StripeResource.extend({
	retrieve: stripeMethod$84({
		method: "GET",
		fullPath: "/v1/issuing/physical_bundles/{physical_bundle}"
	}),
	list: stripeMethod$84({
		method: "GET",
		fullPath: "/v1/issuing/physical_bundles",
		methodType: "list"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Climate/Products.js
var stripeMethod$83 = StripeResource.method;
var Products$1 = StripeResource.extend({
	retrieve: stripeMethod$83({
		method: "GET",
		fullPath: "/v1/climate/products/{product}"
	}),
	list: stripeMethod$83({
		method: "GET",
		fullPath: "/v1/climate/products",
		methodType: "list"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Terminal/Readers.js
var stripeMethod$82 = StripeResource.method;
var Readers$1 = StripeResource.extend({
	create: stripeMethod$82({
		method: "POST",
		fullPath: "/v1/terminal/readers"
	}),
	retrieve: stripeMethod$82({
		method: "GET",
		fullPath: "/v1/terminal/readers/{reader}"
	}),
	update: stripeMethod$82({
		method: "POST",
		fullPath: "/v1/terminal/readers/{reader}"
	}),
	list: stripeMethod$82({
		method: "GET",
		fullPath: "/v1/terminal/readers",
		methodType: "list"
	}),
	del: stripeMethod$82({
		method: "DELETE",
		fullPath: "/v1/terminal/readers/{reader}"
	}),
	cancelAction: stripeMethod$82({
		method: "POST",
		fullPath: "/v1/terminal/readers/{reader}/cancel_action"
	}),
	collectInputs: stripeMethod$82({
		method: "POST",
		fullPath: "/v1/terminal/readers/{reader}/collect_inputs"
	}),
	collectPaymentMethod: stripeMethod$82({
		method: "POST",
		fullPath: "/v1/terminal/readers/{reader}/collect_payment_method"
	}),
	confirmPaymentIntent: stripeMethod$82({
		method: "POST",
		fullPath: "/v1/terminal/readers/{reader}/confirm_payment_intent"
	}),
	processPaymentIntent: stripeMethod$82({
		method: "POST",
		fullPath: "/v1/terminal/readers/{reader}/process_payment_intent"
	}),
	processSetupIntent: stripeMethod$82({
		method: "POST",
		fullPath: "/v1/terminal/readers/{reader}/process_setup_intent"
	}),
	refundPayment: stripeMethod$82({
		method: "POST",
		fullPath: "/v1/terminal/readers/{reader}/refund_payment"
	}),
	setReaderDisplay: stripeMethod$82({
		method: "POST",
		fullPath: "/v1/terminal/readers/{reader}/set_reader_display"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/TestHelpers/Terminal/Readers.js
var stripeMethod$81 = StripeResource.method;
var Readers = StripeResource.extend({
	presentPaymentMethod: stripeMethod$81({
		method: "POST",
		fullPath: "/v1/test_helpers/terminal/readers/{reader}/present_payment_method"
	}),
	succeedInputCollection: stripeMethod$81({
		method: "POST",
		fullPath: "/v1/test_helpers/terminal/readers/{reader}/succeed_input_collection"
	}),
	timeoutInputCollection: stripeMethod$81({
		method: "POST",
		fullPath: "/v1/test_helpers/terminal/readers/{reader}/timeout_input_collection"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/TestHelpers/Treasury/ReceivedCredits.js
var stripeMethod$80 = StripeResource.method;
var ReceivedCredits$1 = StripeResource.extend({ create: stripeMethod$80({
	method: "POST",
	fullPath: "/v1/test_helpers/treasury/received_credits"
}) });
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Treasury/ReceivedCredits.js
var stripeMethod$79 = StripeResource.method;
var ReceivedCredits = StripeResource.extend({
	retrieve: stripeMethod$79({
		method: "GET",
		fullPath: "/v1/treasury/received_credits/{id}"
	}),
	list: stripeMethod$79({
		method: "GET",
		fullPath: "/v1/treasury/received_credits",
		methodType: "list"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/TestHelpers/Treasury/ReceivedDebits.js
var stripeMethod$78 = StripeResource.method;
var ReceivedDebits$1 = StripeResource.extend({ create: stripeMethod$78({
	method: "POST",
	fullPath: "/v1/test_helpers/treasury/received_debits"
}) });
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Treasury/ReceivedDebits.js
var stripeMethod$77 = StripeResource.method;
var ReceivedDebits = StripeResource.extend({
	retrieve: stripeMethod$77({
		method: "GET",
		fullPath: "/v1/treasury/received_debits/{id}"
	}),
	list: stripeMethod$77({
		method: "GET",
		fullPath: "/v1/treasury/received_debits",
		methodType: "list"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/TestHelpers/Refunds.js
var stripeMethod$76 = StripeResource.method;
var Refunds$1 = StripeResource.extend({ expire: stripeMethod$76({
	method: "POST",
	fullPath: "/v1/test_helpers/refunds/{refund}/expire"
}) });
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Tax/Registrations.js
var stripeMethod$75 = StripeResource.method;
var Registrations = StripeResource.extend({
	create: stripeMethod$75({
		method: "POST",
		fullPath: "/v1/tax/registrations"
	}),
	retrieve: stripeMethod$75({
		method: "GET",
		fullPath: "/v1/tax/registrations/{id}"
	}),
	update: stripeMethod$75({
		method: "POST",
		fullPath: "/v1/tax/registrations/{id}"
	}),
	list: stripeMethod$75({
		method: "GET",
		fullPath: "/v1/tax/registrations",
		methodType: "list"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Reporting/ReportRuns.js
var stripeMethod$74 = StripeResource.method;
var ReportRuns = StripeResource.extend({
	create: stripeMethod$74({
		method: "POST",
		fullPath: "/v1/reporting/report_runs"
	}),
	retrieve: stripeMethod$74({
		method: "GET",
		fullPath: "/v1/reporting/report_runs/{report_run}"
	}),
	list: stripeMethod$74({
		method: "GET",
		fullPath: "/v1/reporting/report_runs",
		methodType: "list"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Reporting/ReportTypes.js
var stripeMethod$73 = StripeResource.method;
var ReportTypes = StripeResource.extend({
	retrieve: stripeMethod$73({
		method: "GET",
		fullPath: "/v1/reporting/report_types/{report_type}"
	}),
	list: stripeMethod$73({
		method: "GET",
		fullPath: "/v1/reporting/report_types",
		methodType: "list"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Forwarding/Requests.js
var stripeMethod$72 = StripeResource.method;
var Requests = StripeResource.extend({
	create: stripeMethod$72({
		method: "POST",
		fullPath: "/v1/forwarding/requests"
	}),
	retrieve: stripeMethod$72({
		method: "GET",
		fullPath: "/v1/forwarding/requests/{id}"
	}),
	list: stripeMethod$72({
		method: "GET",
		fullPath: "/v1/forwarding/requests",
		methodType: "list"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Sigma/ScheduledQueryRuns.js
var stripeMethod$71 = StripeResource.method;
var ScheduledQueryRuns = StripeResource.extend({
	retrieve: stripeMethod$71({
		method: "GET",
		fullPath: "/v1/sigma/scheduled_query_runs/{scheduled_query_run}"
	}),
	list: stripeMethod$71({
		method: "GET",
		fullPath: "/v1/sigma/scheduled_query_runs",
		methodType: "list"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Apps/Secrets.js
var stripeMethod$70 = StripeResource.method;
var Secrets = StripeResource.extend({
	create: stripeMethod$70({
		method: "POST",
		fullPath: "/v1/apps/secrets"
	}),
	list: stripeMethod$70({
		method: "GET",
		fullPath: "/v1/apps/secrets",
		methodType: "list"
	}),
	deleteWhere: stripeMethod$70({
		method: "POST",
		fullPath: "/v1/apps/secrets/delete"
	}),
	find: stripeMethod$70({
		method: "GET",
		fullPath: "/v1/apps/secrets/find"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/BillingPortal/Sessions.js
var stripeMethod$69 = StripeResource.method;
var Sessions$2 = StripeResource.extend({ create: stripeMethod$69({
	method: "POST",
	fullPath: "/v1/billing_portal/sessions"
}) });
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Checkout/Sessions.js
var stripeMethod$68 = StripeResource.method;
var Sessions$1 = StripeResource.extend({
	create: stripeMethod$68({
		method: "POST",
		fullPath: "/v1/checkout/sessions"
	}),
	retrieve: stripeMethod$68({
		method: "GET",
		fullPath: "/v1/checkout/sessions/{session}"
	}),
	update: stripeMethod$68({
		method: "POST",
		fullPath: "/v1/checkout/sessions/{session}"
	}),
	list: stripeMethod$68({
		method: "GET",
		fullPath: "/v1/checkout/sessions",
		methodType: "list"
	}),
	expire: stripeMethod$68({
		method: "POST",
		fullPath: "/v1/checkout/sessions/{session}/expire"
	}),
	listLineItems: stripeMethod$68({
		method: "GET",
		fullPath: "/v1/checkout/sessions/{session}/line_items",
		methodType: "list"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/FinancialConnections/Sessions.js
var stripeMethod$67 = StripeResource.method;
var Sessions = StripeResource.extend({
	create: stripeMethod$67({
		method: "POST",
		fullPath: "/v1/financial_connections/sessions"
	}),
	retrieve: stripeMethod$67({
		method: "GET",
		fullPath: "/v1/financial_connections/sessions/{session}"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Tax/Settings.js
var stripeMethod$66 = StripeResource.method;
var Settings = StripeResource.extend({
	retrieve: stripeMethod$66({
		method: "GET",
		fullPath: "/v1/tax/settings"
	}),
	update: stripeMethod$66({
		method: "POST",
		fullPath: "/v1/tax/settings"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Climate/Suppliers.js
var stripeMethod$65 = StripeResource.method;
var Suppliers = StripeResource.extend({
	retrieve: stripeMethod$65({
		method: "GET",
		fullPath: "/v1/climate/suppliers/{supplier}"
	}),
	list: stripeMethod$65({
		method: "GET",
		fullPath: "/v1/climate/suppliers",
		methodType: "list"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/TestHelpers/TestClocks.js
var stripeMethod$64 = StripeResource.method;
var TestClocks = StripeResource.extend({
	create: stripeMethod$64({
		method: "POST",
		fullPath: "/v1/test_helpers/test_clocks"
	}),
	retrieve: stripeMethod$64({
		method: "GET",
		fullPath: "/v1/test_helpers/test_clocks/{test_clock}"
	}),
	list: stripeMethod$64({
		method: "GET",
		fullPath: "/v1/test_helpers/test_clocks",
		methodType: "list"
	}),
	del: stripeMethod$64({
		method: "DELETE",
		fullPath: "/v1/test_helpers/test_clocks/{test_clock}"
	}),
	advance: stripeMethod$64({
		method: "POST",
		fullPath: "/v1/test_helpers/test_clocks/{test_clock}/advance"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Issuing/Tokens.js
var stripeMethod$63 = StripeResource.method;
var Tokens$1 = StripeResource.extend({
	retrieve: stripeMethod$63({
		method: "GET",
		fullPath: "/v1/issuing/tokens/{token}"
	}),
	update: stripeMethod$63({
		method: "POST",
		fullPath: "/v1/issuing/tokens/{token}"
	}),
	list: stripeMethod$63({
		method: "GET",
		fullPath: "/v1/issuing/tokens",
		methodType: "list"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Treasury/TransactionEntries.js
var stripeMethod$62 = StripeResource.method;
var TransactionEntries = StripeResource.extend({
	retrieve: stripeMethod$62({
		method: "GET",
		fullPath: "/v1/treasury/transaction_entries/{id}"
	}),
	list: stripeMethod$62({
		method: "GET",
		fullPath: "/v1/treasury/transaction_entries",
		methodType: "list"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/FinancialConnections/Transactions.js
var stripeMethod$61 = StripeResource.method;
var Transactions$4 = StripeResource.extend({
	retrieve: stripeMethod$61({
		method: "GET",
		fullPath: "/v1/financial_connections/transactions/{transaction}"
	}),
	list: stripeMethod$61({
		method: "GET",
		fullPath: "/v1/financial_connections/transactions",
		methodType: "list"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Issuing/Transactions.js
var stripeMethod$60 = StripeResource.method;
var Transactions$3 = StripeResource.extend({
	retrieve: stripeMethod$60({
		method: "GET",
		fullPath: "/v1/issuing/transactions/{transaction}"
	}),
	update: stripeMethod$60({
		method: "POST",
		fullPath: "/v1/issuing/transactions/{transaction}"
	}),
	list: stripeMethod$60({
		method: "GET",
		fullPath: "/v1/issuing/transactions",
		methodType: "list"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Tax/Transactions.js
var stripeMethod$59 = StripeResource.method;
var Transactions$2 = StripeResource.extend({
	retrieve: stripeMethod$59({
		method: "GET",
		fullPath: "/v1/tax/transactions/{transaction}"
	}),
	createFromCalculation: stripeMethod$59({
		method: "POST",
		fullPath: "/v1/tax/transactions/create_from_calculation"
	}),
	createReversal: stripeMethod$59({
		method: "POST",
		fullPath: "/v1/tax/transactions/create_reversal"
	}),
	listLineItems: stripeMethod$59({
		method: "GET",
		fullPath: "/v1/tax/transactions/{transaction}/line_items",
		methodType: "list"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/TestHelpers/Issuing/Transactions.js
var stripeMethod$58 = StripeResource.method;
var Transactions$1 = StripeResource.extend({
	createForceCapture: stripeMethod$58({
		method: "POST",
		fullPath: "/v1/test_helpers/issuing/transactions/create_force_capture"
	}),
	createUnlinkedRefund: stripeMethod$58({
		method: "POST",
		fullPath: "/v1/test_helpers/issuing/transactions/create_unlinked_refund"
	}),
	refund: stripeMethod$58({
		method: "POST",
		fullPath: "/v1/test_helpers/issuing/transactions/{transaction}/refund"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Treasury/Transactions.js
var stripeMethod$57 = StripeResource.method;
var Transactions = StripeResource.extend({
	retrieve: stripeMethod$57({
		method: "GET",
		fullPath: "/v1/treasury/transactions/{id}"
	}),
	list: stripeMethod$57({
		method: "GET",
		fullPath: "/v1/treasury/transactions",
		methodType: "list"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Radar/ValueListItems.js
var stripeMethod$56 = StripeResource.method;
var ValueListItems = StripeResource.extend({
	create: stripeMethod$56({
		method: "POST",
		fullPath: "/v1/radar/value_list_items"
	}),
	retrieve: stripeMethod$56({
		method: "GET",
		fullPath: "/v1/radar/value_list_items/{item}"
	}),
	list: stripeMethod$56({
		method: "GET",
		fullPath: "/v1/radar/value_list_items",
		methodType: "list"
	}),
	del: stripeMethod$56({
		method: "DELETE",
		fullPath: "/v1/radar/value_list_items/{item}"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Radar/ValueLists.js
var stripeMethod$55 = StripeResource.method;
var ValueLists = StripeResource.extend({
	create: stripeMethod$55({
		method: "POST",
		fullPath: "/v1/radar/value_lists"
	}),
	retrieve: stripeMethod$55({
		method: "GET",
		fullPath: "/v1/radar/value_lists/{value_list}"
	}),
	update: stripeMethod$55({
		method: "POST",
		fullPath: "/v1/radar/value_lists/{value_list}"
	}),
	list: stripeMethod$55({
		method: "GET",
		fullPath: "/v1/radar/value_lists",
		methodType: "list"
	}),
	del: stripeMethod$55({
		method: "DELETE",
		fullPath: "/v1/radar/value_lists/{value_list}"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Identity/VerificationReports.js
var stripeMethod$54 = StripeResource.method;
var VerificationReports = StripeResource.extend({
	retrieve: stripeMethod$54({
		method: "GET",
		fullPath: "/v1/identity/verification_reports/{report}"
	}),
	list: stripeMethod$54({
		method: "GET",
		fullPath: "/v1/identity/verification_reports",
		methodType: "list"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Identity/VerificationSessions.js
var stripeMethod$53 = StripeResource.method;
var VerificationSessions = StripeResource.extend({
	create: stripeMethod$53({
		method: "POST",
		fullPath: "/v1/identity/verification_sessions"
	}),
	retrieve: stripeMethod$53({
		method: "GET",
		fullPath: "/v1/identity/verification_sessions/{session}"
	}),
	update: stripeMethod$53({
		method: "POST",
		fullPath: "/v1/identity/verification_sessions/{session}"
	}),
	list: stripeMethod$53({
		method: "GET",
		fullPath: "/v1/identity/verification_sessions",
		methodType: "list"
	}),
	cancel: stripeMethod$53({
		method: "POST",
		fullPath: "/v1/identity/verification_sessions/{session}/cancel"
	}),
	redact: stripeMethod$53({
		method: "POST",
		fullPath: "/v1/identity/verification_sessions/{session}/redact"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Accounts.js
var stripeMethod$52 = StripeResource.method;
var Accounts = StripeResource.extend({
	create: stripeMethod$52({
		method: "POST",
		fullPath: "/v1/accounts"
	}),
	retrieve(id, ...args) {
		if (typeof id === "string") return stripeMethod$52({
			method: "GET",
			fullPath: "/v1/accounts/{id}"
		}).apply(this, [id, ...args]);
		else {
			if (id === null || id === void 0) [].shift.apply([id, ...args]);
			return stripeMethod$52({
				method: "GET",
				fullPath: "/v1/account"
			}).apply(this, [id, ...args]);
		}
	},
	update: stripeMethod$52({
		method: "POST",
		fullPath: "/v1/accounts/{account}"
	}),
	list: stripeMethod$52({
		method: "GET",
		fullPath: "/v1/accounts",
		methodType: "list"
	}),
	del: stripeMethod$52({
		method: "DELETE",
		fullPath: "/v1/accounts/{account}"
	}),
	createExternalAccount: stripeMethod$52({
		method: "POST",
		fullPath: "/v1/accounts/{account}/external_accounts"
	}),
	createLoginLink: stripeMethod$52({
		method: "POST",
		fullPath: "/v1/accounts/{account}/login_links"
	}),
	createPerson: stripeMethod$52({
		method: "POST",
		fullPath: "/v1/accounts/{account}/persons"
	}),
	deleteExternalAccount: stripeMethod$52({
		method: "DELETE",
		fullPath: "/v1/accounts/{account}/external_accounts/{id}"
	}),
	deletePerson: stripeMethod$52({
		method: "DELETE",
		fullPath: "/v1/accounts/{account}/persons/{person}"
	}),
	listCapabilities: stripeMethod$52({
		method: "GET",
		fullPath: "/v1/accounts/{account}/capabilities",
		methodType: "list"
	}),
	listExternalAccounts: stripeMethod$52({
		method: "GET",
		fullPath: "/v1/accounts/{account}/external_accounts",
		methodType: "list"
	}),
	listPersons: stripeMethod$52({
		method: "GET",
		fullPath: "/v1/accounts/{account}/persons",
		methodType: "list"
	}),
	reject: stripeMethod$52({
		method: "POST",
		fullPath: "/v1/accounts/{account}/reject"
	}),
	retrieveCurrent: stripeMethod$52({
		method: "GET",
		fullPath: "/v1/account"
	}),
	retrieveCapability: stripeMethod$52({
		method: "GET",
		fullPath: "/v1/accounts/{account}/capabilities/{capability}"
	}),
	retrieveExternalAccount: stripeMethod$52({
		method: "GET",
		fullPath: "/v1/accounts/{account}/external_accounts/{id}"
	}),
	retrievePerson: stripeMethod$52({
		method: "GET",
		fullPath: "/v1/accounts/{account}/persons/{person}"
	}),
	updateCapability: stripeMethod$52({
		method: "POST",
		fullPath: "/v1/accounts/{account}/capabilities/{capability}"
	}),
	updateExternalAccount: stripeMethod$52({
		method: "POST",
		fullPath: "/v1/accounts/{account}/external_accounts/{id}"
	}),
	updatePerson: stripeMethod$52({
		method: "POST",
		fullPath: "/v1/accounts/{account}/persons/{person}"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/AccountLinks.js
var stripeMethod$51 = StripeResource.method;
var AccountLinks = StripeResource.extend({ create: stripeMethod$51({
	method: "POST",
	fullPath: "/v1/account_links"
}) });
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/AccountSessions.js
var stripeMethod$50 = StripeResource.method;
var AccountSessions = StripeResource.extend({ create: stripeMethod$50({
	method: "POST",
	fullPath: "/v1/account_sessions"
}) });
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/ApplePayDomains.js
var stripeMethod$49 = StripeResource.method;
var ApplePayDomains = StripeResource.extend({
	create: stripeMethod$49({
		method: "POST",
		fullPath: "/v1/apple_pay/domains"
	}),
	retrieve: stripeMethod$49({
		method: "GET",
		fullPath: "/v1/apple_pay/domains/{domain}"
	}),
	list: stripeMethod$49({
		method: "GET",
		fullPath: "/v1/apple_pay/domains",
		methodType: "list"
	}),
	del: stripeMethod$49({
		method: "DELETE",
		fullPath: "/v1/apple_pay/domains/{domain}"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/ApplicationFees.js
var stripeMethod$48 = StripeResource.method;
var ApplicationFees = StripeResource.extend({
	retrieve: stripeMethod$48({
		method: "GET",
		fullPath: "/v1/application_fees/{id}"
	}),
	list: stripeMethod$48({
		method: "GET",
		fullPath: "/v1/application_fees",
		methodType: "list"
	}),
	createRefund: stripeMethod$48({
		method: "POST",
		fullPath: "/v1/application_fees/{id}/refunds"
	}),
	listRefunds: stripeMethod$48({
		method: "GET",
		fullPath: "/v1/application_fees/{id}/refunds",
		methodType: "list"
	}),
	retrieveRefund: stripeMethod$48({
		method: "GET",
		fullPath: "/v1/application_fees/{fee}/refunds/{id}"
	}),
	updateRefund: stripeMethod$48({
		method: "POST",
		fullPath: "/v1/application_fees/{fee}/refunds/{id}"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Balance.js
var stripeMethod$47 = StripeResource.method;
var Balance = StripeResource.extend({ retrieve: stripeMethod$47({
	method: "GET",
	fullPath: "/v1/balance"
}) });
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/BalanceTransactions.js
var stripeMethod$46 = StripeResource.method;
var BalanceTransactions = StripeResource.extend({
	retrieve: stripeMethod$46({
		method: "GET",
		fullPath: "/v1/balance_transactions/{id}"
	}),
	list: stripeMethod$46({
		method: "GET",
		fullPath: "/v1/balance_transactions",
		methodType: "list"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Charges.js
var stripeMethod$45 = StripeResource.method;
var Charges = StripeResource.extend({
	create: stripeMethod$45({
		method: "POST",
		fullPath: "/v1/charges"
	}),
	retrieve: stripeMethod$45({
		method: "GET",
		fullPath: "/v1/charges/{charge}"
	}),
	update: stripeMethod$45({
		method: "POST",
		fullPath: "/v1/charges/{charge}"
	}),
	list: stripeMethod$45({
		method: "GET",
		fullPath: "/v1/charges",
		methodType: "list"
	}),
	capture: stripeMethod$45({
		method: "POST",
		fullPath: "/v1/charges/{charge}/capture"
	}),
	search: stripeMethod$45({
		method: "GET",
		fullPath: "/v1/charges/search",
		methodType: "search"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/ConfirmationTokens.js
var stripeMethod$44 = StripeResource.method;
var ConfirmationTokens = StripeResource.extend({ retrieve: stripeMethod$44({
	method: "GET",
	fullPath: "/v1/confirmation_tokens/{confirmation_token}"
}) });
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/CountrySpecs.js
var stripeMethod$43 = StripeResource.method;
var CountrySpecs = StripeResource.extend({
	retrieve: stripeMethod$43({
		method: "GET",
		fullPath: "/v1/country_specs/{country}"
	}),
	list: stripeMethod$43({
		method: "GET",
		fullPath: "/v1/country_specs",
		methodType: "list"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Coupons.js
var stripeMethod$42 = StripeResource.method;
var Coupons = StripeResource.extend({
	create: stripeMethod$42({
		method: "POST",
		fullPath: "/v1/coupons"
	}),
	retrieve: stripeMethod$42({
		method: "GET",
		fullPath: "/v1/coupons/{coupon}"
	}),
	update: stripeMethod$42({
		method: "POST",
		fullPath: "/v1/coupons/{coupon}"
	}),
	list: stripeMethod$42({
		method: "GET",
		fullPath: "/v1/coupons",
		methodType: "list"
	}),
	del: stripeMethod$42({
		method: "DELETE",
		fullPath: "/v1/coupons/{coupon}"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/CreditNotes.js
var stripeMethod$41 = StripeResource.method;
var CreditNotes = StripeResource.extend({
	create: stripeMethod$41({
		method: "POST",
		fullPath: "/v1/credit_notes"
	}),
	retrieve: stripeMethod$41({
		method: "GET",
		fullPath: "/v1/credit_notes/{id}"
	}),
	update: stripeMethod$41({
		method: "POST",
		fullPath: "/v1/credit_notes/{id}"
	}),
	list: stripeMethod$41({
		method: "GET",
		fullPath: "/v1/credit_notes",
		methodType: "list"
	}),
	listLineItems: stripeMethod$41({
		method: "GET",
		fullPath: "/v1/credit_notes/{credit_note}/lines",
		methodType: "list"
	}),
	listPreviewLineItems: stripeMethod$41({
		method: "GET",
		fullPath: "/v1/credit_notes/preview/lines",
		methodType: "list"
	}),
	preview: stripeMethod$41({
		method: "GET",
		fullPath: "/v1/credit_notes/preview"
	}),
	voidCreditNote: stripeMethod$41({
		method: "POST",
		fullPath: "/v1/credit_notes/{id}/void"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/CustomerSessions.js
var stripeMethod$40 = StripeResource.method;
var CustomerSessions = StripeResource.extend({ create: stripeMethod$40({
	method: "POST",
	fullPath: "/v1/customer_sessions"
}) });
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Customers.js
var stripeMethod$39 = StripeResource.method;
var Customers = StripeResource.extend({
	create: stripeMethod$39({
		method: "POST",
		fullPath: "/v1/customers"
	}),
	retrieve: stripeMethod$39({
		method: "GET",
		fullPath: "/v1/customers/{customer}"
	}),
	update: stripeMethod$39({
		method: "POST",
		fullPath: "/v1/customers/{customer}"
	}),
	list: stripeMethod$39({
		method: "GET",
		fullPath: "/v1/customers",
		methodType: "list"
	}),
	del: stripeMethod$39({
		method: "DELETE",
		fullPath: "/v1/customers/{customer}"
	}),
	createBalanceTransaction: stripeMethod$39({
		method: "POST",
		fullPath: "/v1/customers/{customer}/balance_transactions"
	}),
	createFundingInstructions: stripeMethod$39({
		method: "POST",
		fullPath: "/v1/customers/{customer}/funding_instructions"
	}),
	createSource: stripeMethod$39({
		method: "POST",
		fullPath: "/v1/customers/{customer}/sources"
	}),
	createTaxId: stripeMethod$39({
		method: "POST",
		fullPath: "/v1/customers/{customer}/tax_ids"
	}),
	deleteDiscount: stripeMethod$39({
		method: "DELETE",
		fullPath: "/v1/customers/{customer}/discount"
	}),
	deleteSource: stripeMethod$39({
		method: "DELETE",
		fullPath: "/v1/customers/{customer}/sources/{id}"
	}),
	deleteTaxId: stripeMethod$39({
		method: "DELETE",
		fullPath: "/v1/customers/{customer}/tax_ids/{id}"
	}),
	listBalanceTransactions: stripeMethod$39({
		method: "GET",
		fullPath: "/v1/customers/{customer}/balance_transactions",
		methodType: "list"
	}),
	listCashBalanceTransactions: stripeMethod$39({
		method: "GET",
		fullPath: "/v1/customers/{customer}/cash_balance_transactions",
		methodType: "list"
	}),
	listPaymentMethods: stripeMethod$39({
		method: "GET",
		fullPath: "/v1/customers/{customer}/payment_methods",
		methodType: "list"
	}),
	listSources: stripeMethod$39({
		method: "GET",
		fullPath: "/v1/customers/{customer}/sources",
		methodType: "list"
	}),
	listTaxIds: stripeMethod$39({
		method: "GET",
		fullPath: "/v1/customers/{customer}/tax_ids",
		methodType: "list"
	}),
	retrieveBalanceTransaction: stripeMethod$39({
		method: "GET",
		fullPath: "/v1/customers/{customer}/balance_transactions/{transaction}"
	}),
	retrieveCashBalance: stripeMethod$39({
		method: "GET",
		fullPath: "/v1/customers/{customer}/cash_balance"
	}),
	retrieveCashBalanceTransaction: stripeMethod$39({
		method: "GET",
		fullPath: "/v1/customers/{customer}/cash_balance_transactions/{transaction}"
	}),
	retrievePaymentMethod: stripeMethod$39({
		method: "GET",
		fullPath: "/v1/customers/{customer}/payment_methods/{payment_method}"
	}),
	retrieveSource: stripeMethod$39({
		method: "GET",
		fullPath: "/v1/customers/{customer}/sources/{id}"
	}),
	retrieveTaxId: stripeMethod$39({
		method: "GET",
		fullPath: "/v1/customers/{customer}/tax_ids/{id}"
	}),
	search: stripeMethod$39({
		method: "GET",
		fullPath: "/v1/customers/search",
		methodType: "search"
	}),
	updateBalanceTransaction: stripeMethod$39({
		method: "POST",
		fullPath: "/v1/customers/{customer}/balance_transactions/{transaction}"
	}),
	updateCashBalance: stripeMethod$39({
		method: "POST",
		fullPath: "/v1/customers/{customer}/cash_balance"
	}),
	updateSource: stripeMethod$39({
		method: "POST",
		fullPath: "/v1/customers/{customer}/sources/{id}"
	}),
	verifySource: stripeMethod$39({
		method: "POST",
		fullPath: "/v1/customers/{customer}/sources/{id}/verify"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Disputes.js
var stripeMethod$38 = StripeResource.method;
var Disputes = StripeResource.extend({
	retrieve: stripeMethod$38({
		method: "GET",
		fullPath: "/v1/disputes/{dispute}"
	}),
	update: stripeMethod$38({
		method: "POST",
		fullPath: "/v1/disputes/{dispute}"
	}),
	list: stripeMethod$38({
		method: "GET",
		fullPath: "/v1/disputes",
		methodType: "list"
	}),
	close: stripeMethod$38({
		method: "POST",
		fullPath: "/v1/disputes/{dispute}/close"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/EphemeralKeys.js
var stripeMethod$37 = StripeResource.method;
var EphemeralKeys = StripeResource.extend({
	create: stripeMethod$37({
		method: "POST",
		fullPath: "/v1/ephemeral_keys",
		validator: (data, options) => {
			if (!options.headers || !options.headers["Stripe-Version"]) throw new Error("Passing apiVersion in a separate options hash is required to create an ephemeral key. See https://stripe.com/docs/api/versioning?lang=node");
		}
	}),
	del: stripeMethod$37({
		method: "DELETE",
		fullPath: "/v1/ephemeral_keys/{key}"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Events.js
var stripeMethod$36 = StripeResource.method;
var Events = StripeResource.extend({
	retrieve: stripeMethod$36({
		method: "GET",
		fullPath: "/v1/events/{id}"
	}),
	list: stripeMethod$36({
		method: "GET",
		fullPath: "/v1/events",
		methodType: "list"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/ExchangeRates.js
var stripeMethod$35 = StripeResource.method;
var ExchangeRates = StripeResource.extend({
	retrieve: stripeMethod$35({
		method: "GET",
		fullPath: "/v1/exchange_rates/{rate_id}"
	}),
	list: stripeMethod$35({
		method: "GET",
		fullPath: "/v1/exchange_rates",
		methodType: "list"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/FileLinks.js
var stripeMethod$34 = StripeResource.method;
var FileLinks = StripeResource.extend({
	create: stripeMethod$34({
		method: "POST",
		fullPath: "/v1/file_links"
	}),
	retrieve: stripeMethod$34({
		method: "GET",
		fullPath: "/v1/file_links/{link}"
	}),
	update: stripeMethod$34({
		method: "POST",
		fullPath: "/v1/file_links/{link}"
	}),
	list: stripeMethod$34({
		method: "GET",
		fullPath: "/v1/file_links",
		methodType: "list"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/multipart.js
var multipartDataGenerator = (method, data, headers) => {
	const segno = (Math.round(Math.random() * 0x2386f26fc10000) + Math.round(Math.random() * 0x2386f26fc10000)).toString();
	headers["Content-Type"] = `multipart/form-data; boundary=${segno}`;
	const textEncoder = new TextEncoder();
	let buffer = new Uint8Array(0);
	const endBuffer = textEncoder.encode("\r\n");
	function push(l) {
		const prevBuffer = buffer;
		const newBuffer = l instanceof Uint8Array ? l : new Uint8Array(textEncoder.encode(l));
		buffer = new Uint8Array(prevBuffer.length + newBuffer.length + 2);
		buffer.set(prevBuffer);
		buffer.set(newBuffer, prevBuffer.length);
		buffer.set(endBuffer, buffer.length - 2);
	}
	function q(s) {
		return `"${s.replace(/"|"/g, "%22").replace(/\r\n|\r|\n/g, " ")}"`;
	}
	const flattenedData = flattenAndStringify(data);
	for (const k in flattenedData) {
		if (!Object.prototype.hasOwnProperty.call(flattenedData, k)) continue;
		const v = flattenedData[k];
		push(`--${segno}`);
		if (Object.prototype.hasOwnProperty.call(v, "data")) {
			const typedEntry = v;
			push(`Content-Disposition: form-data; name=${q(k)}; filename=${q(typedEntry.name || "blob")}`);
			push(`Content-Type: ${typedEntry.type || "application/octet-stream"}`);
			push("");
			push(typedEntry.data);
		} else {
			push(`Content-Disposition: form-data; name=${q(k)}`);
			push("");
			push(v);
		}
	}
	push(`--${segno}--`);
	return buffer;
};
function multipartRequestDataProcessor(method, data, headers, callback) {
	data = data || {};
	if (method !== "POST") return callback(null, queryStringifyRequestData(data));
	this._stripe._platformFunctions.tryBufferData(data).then((bufferedData) => {
		return callback(null, multipartDataGenerator(method, bufferedData, headers));
	}).catch((err) => callback(err, null));
}
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Files.js
var stripeMethod$33 = StripeResource.method;
var Files = StripeResource.extend({
	create: stripeMethod$33({
		method: "POST",
		fullPath: "/v1/files",
		headers: { "Content-Type": "multipart/form-data" },
		host: "files.stripe.com"
	}),
	retrieve: stripeMethod$33({
		method: "GET",
		fullPath: "/v1/files/{file}"
	}),
	list: stripeMethod$33({
		method: "GET",
		fullPath: "/v1/files",
		methodType: "list"
	}),
	requestDataProcessor: multipartRequestDataProcessor
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/InvoiceItems.js
var stripeMethod$32 = StripeResource.method;
var InvoiceItems = StripeResource.extend({
	create: stripeMethod$32({
		method: "POST",
		fullPath: "/v1/invoiceitems"
	}),
	retrieve: stripeMethod$32({
		method: "GET",
		fullPath: "/v1/invoiceitems/{invoiceitem}"
	}),
	update: stripeMethod$32({
		method: "POST",
		fullPath: "/v1/invoiceitems/{invoiceitem}"
	}),
	list: stripeMethod$32({
		method: "GET",
		fullPath: "/v1/invoiceitems",
		methodType: "list"
	}),
	del: stripeMethod$32({
		method: "DELETE",
		fullPath: "/v1/invoiceitems/{invoiceitem}"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/InvoicePayments.js
var stripeMethod$31 = StripeResource.method;
var InvoicePayments = StripeResource.extend({
	retrieve: stripeMethod$31({
		method: "GET",
		fullPath: "/v1/invoice_payments/{invoice_payment}"
	}),
	list: stripeMethod$31({
		method: "GET",
		fullPath: "/v1/invoice_payments",
		methodType: "list"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/InvoiceRenderingTemplates.js
var stripeMethod$30 = StripeResource.method;
var InvoiceRenderingTemplates = StripeResource.extend({
	retrieve: stripeMethod$30({
		method: "GET",
		fullPath: "/v1/invoice_rendering_templates/{template}"
	}),
	list: stripeMethod$30({
		method: "GET",
		fullPath: "/v1/invoice_rendering_templates",
		methodType: "list"
	}),
	archive: stripeMethod$30({
		method: "POST",
		fullPath: "/v1/invoice_rendering_templates/{template}/archive"
	}),
	unarchive: stripeMethod$30({
		method: "POST",
		fullPath: "/v1/invoice_rendering_templates/{template}/unarchive"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Invoices.js
var stripeMethod$29 = StripeResource.method;
var Invoices = StripeResource.extend({
	create: stripeMethod$29({
		method: "POST",
		fullPath: "/v1/invoices"
	}),
	retrieve: stripeMethod$29({
		method: "GET",
		fullPath: "/v1/invoices/{invoice}"
	}),
	update: stripeMethod$29({
		method: "POST",
		fullPath: "/v1/invoices/{invoice}"
	}),
	list: stripeMethod$29({
		method: "GET",
		fullPath: "/v1/invoices",
		methodType: "list"
	}),
	del: stripeMethod$29({
		method: "DELETE",
		fullPath: "/v1/invoices/{invoice}"
	}),
	addLines: stripeMethod$29({
		method: "POST",
		fullPath: "/v1/invoices/{invoice}/add_lines"
	}),
	attachPayment: stripeMethod$29({
		method: "POST",
		fullPath: "/v1/invoices/{invoice}/attach_payment"
	}),
	createPreview: stripeMethod$29({
		method: "POST",
		fullPath: "/v1/invoices/create_preview"
	}),
	finalizeInvoice: stripeMethod$29({
		method: "POST",
		fullPath: "/v1/invoices/{invoice}/finalize"
	}),
	listLineItems: stripeMethod$29({
		method: "GET",
		fullPath: "/v1/invoices/{invoice}/lines",
		methodType: "list"
	}),
	markUncollectible: stripeMethod$29({
		method: "POST",
		fullPath: "/v1/invoices/{invoice}/mark_uncollectible"
	}),
	pay: stripeMethod$29({
		method: "POST",
		fullPath: "/v1/invoices/{invoice}/pay"
	}),
	removeLines: stripeMethod$29({
		method: "POST",
		fullPath: "/v1/invoices/{invoice}/remove_lines"
	}),
	search: stripeMethod$29({
		method: "GET",
		fullPath: "/v1/invoices/search",
		methodType: "search"
	}),
	sendInvoice: stripeMethod$29({
		method: "POST",
		fullPath: "/v1/invoices/{invoice}/send"
	}),
	updateLines: stripeMethod$29({
		method: "POST",
		fullPath: "/v1/invoices/{invoice}/update_lines"
	}),
	updateLineItem: stripeMethod$29({
		method: "POST",
		fullPath: "/v1/invoices/{invoice}/lines/{line_item_id}"
	}),
	voidInvoice: stripeMethod$29({
		method: "POST",
		fullPath: "/v1/invoices/{invoice}/void"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Mandates.js
var stripeMethod$28 = StripeResource.method;
var Mandates = StripeResource.extend({ retrieve: stripeMethod$28({
	method: "GET",
	fullPath: "/v1/mandates/{mandate}"
}) });
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/OAuth.js
var stripeMethod$27 = StripeResource.method;
var oAuthHost = "connect.stripe.com";
var OAuth = StripeResource.extend({
	basePath: "/",
	authorizeUrl(params, options) {
		params = params || {};
		options = options || {};
		let path = "oauth/authorize";
		if (options.express) path = `express/${path}`;
		if (!params.response_type) params.response_type = "code";
		if (!params.client_id) params.client_id = this._stripe.getClientId();
		if (!params.scope) params.scope = "read_write";
		return `https://${oAuthHost}/${path}?${queryStringifyRequestData(params)}`;
	},
	token: stripeMethod$27({
		method: "POST",
		path: "oauth/token",
		host: oAuthHost
	}),
	deauthorize(spec, ...args) {
		if (!spec.client_id) spec.client_id = this._stripe.getClientId();
		return stripeMethod$27({
			method: "POST",
			path: "oauth/deauthorize",
			host: oAuthHost
		}).apply(this, [spec, ...args]);
	}
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/PaymentIntents.js
var stripeMethod$26 = StripeResource.method;
var PaymentIntents = StripeResource.extend({
	create: stripeMethod$26({
		method: "POST",
		fullPath: "/v1/payment_intents"
	}),
	retrieve: stripeMethod$26({
		method: "GET",
		fullPath: "/v1/payment_intents/{intent}"
	}),
	update: stripeMethod$26({
		method: "POST",
		fullPath: "/v1/payment_intents/{intent}"
	}),
	list: stripeMethod$26({
		method: "GET",
		fullPath: "/v1/payment_intents",
		methodType: "list"
	}),
	applyCustomerBalance: stripeMethod$26({
		method: "POST",
		fullPath: "/v1/payment_intents/{intent}/apply_customer_balance"
	}),
	cancel: stripeMethod$26({
		method: "POST",
		fullPath: "/v1/payment_intents/{intent}/cancel"
	}),
	capture: stripeMethod$26({
		method: "POST",
		fullPath: "/v1/payment_intents/{intent}/capture"
	}),
	confirm: stripeMethod$26({
		method: "POST",
		fullPath: "/v1/payment_intents/{intent}/confirm"
	}),
	incrementAuthorization: stripeMethod$26({
		method: "POST",
		fullPath: "/v1/payment_intents/{intent}/increment_authorization"
	}),
	search: stripeMethod$26({
		method: "GET",
		fullPath: "/v1/payment_intents/search",
		methodType: "search"
	}),
	verifyMicrodeposits: stripeMethod$26({
		method: "POST",
		fullPath: "/v1/payment_intents/{intent}/verify_microdeposits"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/PaymentLinks.js
var stripeMethod$25 = StripeResource.method;
var PaymentLinks = StripeResource.extend({
	create: stripeMethod$25({
		method: "POST",
		fullPath: "/v1/payment_links"
	}),
	retrieve: stripeMethod$25({
		method: "GET",
		fullPath: "/v1/payment_links/{payment_link}"
	}),
	update: stripeMethod$25({
		method: "POST",
		fullPath: "/v1/payment_links/{payment_link}"
	}),
	list: stripeMethod$25({
		method: "GET",
		fullPath: "/v1/payment_links",
		methodType: "list"
	}),
	listLineItems: stripeMethod$25({
		method: "GET",
		fullPath: "/v1/payment_links/{payment_link}/line_items",
		methodType: "list"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/PaymentMethodConfigurations.js
var stripeMethod$24 = StripeResource.method;
var PaymentMethodConfigurations = StripeResource.extend({
	create: stripeMethod$24({
		method: "POST",
		fullPath: "/v1/payment_method_configurations"
	}),
	retrieve: stripeMethod$24({
		method: "GET",
		fullPath: "/v1/payment_method_configurations/{configuration}"
	}),
	update: stripeMethod$24({
		method: "POST",
		fullPath: "/v1/payment_method_configurations/{configuration}"
	}),
	list: stripeMethod$24({
		method: "GET",
		fullPath: "/v1/payment_method_configurations",
		methodType: "list"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/PaymentMethodDomains.js
var stripeMethod$23 = StripeResource.method;
var PaymentMethodDomains = StripeResource.extend({
	create: stripeMethod$23({
		method: "POST",
		fullPath: "/v1/payment_method_domains"
	}),
	retrieve: stripeMethod$23({
		method: "GET",
		fullPath: "/v1/payment_method_domains/{payment_method_domain}"
	}),
	update: stripeMethod$23({
		method: "POST",
		fullPath: "/v1/payment_method_domains/{payment_method_domain}"
	}),
	list: stripeMethod$23({
		method: "GET",
		fullPath: "/v1/payment_method_domains",
		methodType: "list"
	}),
	validate: stripeMethod$23({
		method: "POST",
		fullPath: "/v1/payment_method_domains/{payment_method_domain}/validate"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/PaymentMethods.js
var stripeMethod$22 = StripeResource.method;
var PaymentMethods = StripeResource.extend({
	create: stripeMethod$22({
		method: "POST",
		fullPath: "/v1/payment_methods"
	}),
	retrieve: stripeMethod$22({
		method: "GET",
		fullPath: "/v1/payment_methods/{payment_method}"
	}),
	update: stripeMethod$22({
		method: "POST",
		fullPath: "/v1/payment_methods/{payment_method}"
	}),
	list: stripeMethod$22({
		method: "GET",
		fullPath: "/v1/payment_methods",
		methodType: "list"
	}),
	attach: stripeMethod$22({
		method: "POST",
		fullPath: "/v1/payment_methods/{payment_method}/attach"
	}),
	detach: stripeMethod$22({
		method: "POST",
		fullPath: "/v1/payment_methods/{payment_method}/detach"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Payouts.js
var stripeMethod$21 = StripeResource.method;
var Payouts = StripeResource.extend({
	create: stripeMethod$21({
		method: "POST",
		fullPath: "/v1/payouts"
	}),
	retrieve: stripeMethod$21({
		method: "GET",
		fullPath: "/v1/payouts/{payout}"
	}),
	update: stripeMethod$21({
		method: "POST",
		fullPath: "/v1/payouts/{payout}"
	}),
	list: stripeMethod$21({
		method: "GET",
		fullPath: "/v1/payouts",
		methodType: "list"
	}),
	cancel: stripeMethod$21({
		method: "POST",
		fullPath: "/v1/payouts/{payout}/cancel"
	}),
	reverse: stripeMethod$21({
		method: "POST",
		fullPath: "/v1/payouts/{payout}/reverse"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Plans.js
var stripeMethod$20 = StripeResource.method;
var Plans = StripeResource.extend({
	create: stripeMethod$20({
		method: "POST",
		fullPath: "/v1/plans"
	}),
	retrieve: stripeMethod$20({
		method: "GET",
		fullPath: "/v1/plans/{plan}"
	}),
	update: stripeMethod$20({
		method: "POST",
		fullPath: "/v1/plans/{plan}"
	}),
	list: stripeMethod$20({
		method: "GET",
		fullPath: "/v1/plans",
		methodType: "list"
	}),
	del: stripeMethod$20({
		method: "DELETE",
		fullPath: "/v1/plans/{plan}"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Prices.js
var stripeMethod$19 = StripeResource.method;
var Prices = StripeResource.extend({
	create: stripeMethod$19({
		method: "POST",
		fullPath: "/v1/prices"
	}),
	retrieve: stripeMethod$19({
		method: "GET",
		fullPath: "/v1/prices/{price}"
	}),
	update: stripeMethod$19({
		method: "POST",
		fullPath: "/v1/prices/{price}"
	}),
	list: stripeMethod$19({
		method: "GET",
		fullPath: "/v1/prices",
		methodType: "list"
	}),
	search: stripeMethod$19({
		method: "GET",
		fullPath: "/v1/prices/search",
		methodType: "search"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Products.js
var stripeMethod$18 = StripeResource.method;
var Products = StripeResource.extend({
	create: stripeMethod$18({
		method: "POST",
		fullPath: "/v1/products"
	}),
	retrieve: stripeMethod$18({
		method: "GET",
		fullPath: "/v1/products/{id}"
	}),
	update: stripeMethod$18({
		method: "POST",
		fullPath: "/v1/products/{id}"
	}),
	list: stripeMethod$18({
		method: "GET",
		fullPath: "/v1/products",
		methodType: "list"
	}),
	del: stripeMethod$18({
		method: "DELETE",
		fullPath: "/v1/products/{id}"
	}),
	createFeature: stripeMethod$18({
		method: "POST",
		fullPath: "/v1/products/{product}/features"
	}),
	deleteFeature: stripeMethod$18({
		method: "DELETE",
		fullPath: "/v1/products/{product}/features/{id}"
	}),
	listFeatures: stripeMethod$18({
		method: "GET",
		fullPath: "/v1/products/{product}/features",
		methodType: "list"
	}),
	retrieveFeature: stripeMethod$18({
		method: "GET",
		fullPath: "/v1/products/{product}/features/{id}"
	}),
	search: stripeMethod$18({
		method: "GET",
		fullPath: "/v1/products/search",
		methodType: "search"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/PromotionCodes.js
var stripeMethod$17 = StripeResource.method;
var PromotionCodes = StripeResource.extend({
	create: stripeMethod$17({
		method: "POST",
		fullPath: "/v1/promotion_codes"
	}),
	retrieve: stripeMethod$17({
		method: "GET",
		fullPath: "/v1/promotion_codes/{promotion_code}"
	}),
	update: stripeMethod$17({
		method: "POST",
		fullPath: "/v1/promotion_codes/{promotion_code}"
	}),
	list: stripeMethod$17({
		method: "GET",
		fullPath: "/v1/promotion_codes",
		methodType: "list"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Quotes.js
var stripeMethod$16 = StripeResource.method;
var Quotes = StripeResource.extend({
	create: stripeMethod$16({
		method: "POST",
		fullPath: "/v1/quotes"
	}),
	retrieve: stripeMethod$16({
		method: "GET",
		fullPath: "/v1/quotes/{quote}"
	}),
	update: stripeMethod$16({
		method: "POST",
		fullPath: "/v1/quotes/{quote}"
	}),
	list: stripeMethod$16({
		method: "GET",
		fullPath: "/v1/quotes",
		methodType: "list"
	}),
	accept: stripeMethod$16({
		method: "POST",
		fullPath: "/v1/quotes/{quote}/accept"
	}),
	cancel: stripeMethod$16({
		method: "POST",
		fullPath: "/v1/quotes/{quote}/cancel"
	}),
	finalizeQuote: stripeMethod$16({
		method: "POST",
		fullPath: "/v1/quotes/{quote}/finalize"
	}),
	listComputedUpfrontLineItems: stripeMethod$16({
		method: "GET",
		fullPath: "/v1/quotes/{quote}/computed_upfront_line_items",
		methodType: "list"
	}),
	listLineItems: stripeMethod$16({
		method: "GET",
		fullPath: "/v1/quotes/{quote}/line_items",
		methodType: "list"
	}),
	pdf: stripeMethod$16({
		method: "GET",
		fullPath: "/v1/quotes/{quote}/pdf",
		host: "files.stripe.com",
		streaming: true
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Refunds.js
var stripeMethod$15 = StripeResource.method;
var Refunds = StripeResource.extend({
	create: stripeMethod$15({
		method: "POST",
		fullPath: "/v1/refunds"
	}),
	retrieve: stripeMethod$15({
		method: "GET",
		fullPath: "/v1/refunds/{refund}"
	}),
	update: stripeMethod$15({
		method: "POST",
		fullPath: "/v1/refunds/{refund}"
	}),
	list: stripeMethod$15({
		method: "GET",
		fullPath: "/v1/refunds",
		methodType: "list"
	}),
	cancel: stripeMethod$15({
		method: "POST",
		fullPath: "/v1/refunds/{refund}/cancel"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Reviews.js
var stripeMethod$14 = StripeResource.method;
var Reviews = StripeResource.extend({
	retrieve: stripeMethod$14({
		method: "GET",
		fullPath: "/v1/reviews/{review}"
	}),
	list: stripeMethod$14({
		method: "GET",
		fullPath: "/v1/reviews",
		methodType: "list"
	}),
	approve: stripeMethod$14({
		method: "POST",
		fullPath: "/v1/reviews/{review}/approve"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/SetupAttempts.js
var stripeMethod$13 = StripeResource.method;
var SetupAttempts = StripeResource.extend({ list: stripeMethod$13({
	method: "GET",
	fullPath: "/v1/setup_attempts",
	methodType: "list"
}) });
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/SetupIntents.js
var stripeMethod$12 = StripeResource.method;
var SetupIntents = StripeResource.extend({
	create: stripeMethod$12({
		method: "POST",
		fullPath: "/v1/setup_intents"
	}),
	retrieve: stripeMethod$12({
		method: "GET",
		fullPath: "/v1/setup_intents/{intent}"
	}),
	update: stripeMethod$12({
		method: "POST",
		fullPath: "/v1/setup_intents/{intent}"
	}),
	list: stripeMethod$12({
		method: "GET",
		fullPath: "/v1/setup_intents",
		methodType: "list"
	}),
	cancel: stripeMethod$12({
		method: "POST",
		fullPath: "/v1/setup_intents/{intent}/cancel"
	}),
	confirm: stripeMethod$12({
		method: "POST",
		fullPath: "/v1/setup_intents/{intent}/confirm"
	}),
	verifyMicrodeposits: stripeMethod$12({
		method: "POST",
		fullPath: "/v1/setup_intents/{intent}/verify_microdeposits"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/ShippingRates.js
var stripeMethod$11 = StripeResource.method;
var ShippingRates = StripeResource.extend({
	create: stripeMethod$11({
		method: "POST",
		fullPath: "/v1/shipping_rates"
	}),
	retrieve: stripeMethod$11({
		method: "GET",
		fullPath: "/v1/shipping_rates/{shipping_rate_token}"
	}),
	update: stripeMethod$11({
		method: "POST",
		fullPath: "/v1/shipping_rates/{shipping_rate_token}"
	}),
	list: stripeMethod$11({
		method: "GET",
		fullPath: "/v1/shipping_rates",
		methodType: "list"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Sources.js
var stripeMethod$10 = StripeResource.method;
var Sources = StripeResource.extend({
	create: stripeMethod$10({
		method: "POST",
		fullPath: "/v1/sources"
	}),
	retrieve: stripeMethod$10({
		method: "GET",
		fullPath: "/v1/sources/{source}"
	}),
	update: stripeMethod$10({
		method: "POST",
		fullPath: "/v1/sources/{source}"
	}),
	listSourceTransactions: stripeMethod$10({
		method: "GET",
		fullPath: "/v1/sources/{source}/source_transactions",
		methodType: "list"
	}),
	verify: stripeMethod$10({
		method: "POST",
		fullPath: "/v1/sources/{source}/verify"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/SubscriptionItems.js
var stripeMethod$9 = StripeResource.method;
var SubscriptionItems = StripeResource.extend({
	create: stripeMethod$9({
		method: "POST",
		fullPath: "/v1/subscription_items"
	}),
	retrieve: stripeMethod$9({
		method: "GET",
		fullPath: "/v1/subscription_items/{item}"
	}),
	update: stripeMethod$9({
		method: "POST",
		fullPath: "/v1/subscription_items/{item}"
	}),
	list: stripeMethod$9({
		method: "GET",
		fullPath: "/v1/subscription_items",
		methodType: "list"
	}),
	del: stripeMethod$9({
		method: "DELETE",
		fullPath: "/v1/subscription_items/{item}"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/SubscriptionSchedules.js
var stripeMethod$8 = StripeResource.method;
var SubscriptionSchedules = StripeResource.extend({
	create: stripeMethod$8({
		method: "POST",
		fullPath: "/v1/subscription_schedules"
	}),
	retrieve: stripeMethod$8({
		method: "GET",
		fullPath: "/v1/subscription_schedules/{schedule}"
	}),
	update: stripeMethod$8({
		method: "POST",
		fullPath: "/v1/subscription_schedules/{schedule}"
	}),
	list: stripeMethod$8({
		method: "GET",
		fullPath: "/v1/subscription_schedules",
		methodType: "list"
	}),
	cancel: stripeMethod$8({
		method: "POST",
		fullPath: "/v1/subscription_schedules/{schedule}/cancel"
	}),
	release: stripeMethod$8({
		method: "POST",
		fullPath: "/v1/subscription_schedules/{schedule}/release"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Subscriptions.js
var stripeMethod$7 = StripeResource.method;
var Subscriptions = StripeResource.extend({
	create: stripeMethod$7({
		method: "POST",
		fullPath: "/v1/subscriptions"
	}),
	retrieve: stripeMethod$7({
		method: "GET",
		fullPath: "/v1/subscriptions/{subscription_exposed_id}"
	}),
	update: stripeMethod$7({
		method: "POST",
		fullPath: "/v1/subscriptions/{subscription_exposed_id}"
	}),
	list: stripeMethod$7({
		method: "GET",
		fullPath: "/v1/subscriptions",
		methodType: "list"
	}),
	cancel: stripeMethod$7({
		method: "DELETE",
		fullPath: "/v1/subscriptions/{subscription_exposed_id}"
	}),
	deleteDiscount: stripeMethod$7({
		method: "DELETE",
		fullPath: "/v1/subscriptions/{subscription_exposed_id}/discount"
	}),
	migrate: stripeMethod$7({
		method: "POST",
		fullPath: "/v1/subscriptions/{subscription}/migrate"
	}),
	resume: stripeMethod$7({
		method: "POST",
		fullPath: "/v1/subscriptions/{subscription}/resume"
	}),
	search: stripeMethod$7({
		method: "GET",
		fullPath: "/v1/subscriptions/search",
		methodType: "search"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/TaxCodes.js
var stripeMethod$6 = StripeResource.method;
var TaxCodes = StripeResource.extend({
	retrieve: stripeMethod$6({
		method: "GET",
		fullPath: "/v1/tax_codes/{id}"
	}),
	list: stripeMethod$6({
		method: "GET",
		fullPath: "/v1/tax_codes",
		methodType: "list"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/TaxIds.js
var stripeMethod$5 = StripeResource.method;
var TaxIds = StripeResource.extend({
	create: stripeMethod$5({
		method: "POST",
		fullPath: "/v1/tax_ids"
	}),
	retrieve: stripeMethod$5({
		method: "GET",
		fullPath: "/v1/tax_ids/{id}"
	}),
	list: stripeMethod$5({
		method: "GET",
		fullPath: "/v1/tax_ids",
		methodType: "list"
	}),
	del: stripeMethod$5({
		method: "DELETE",
		fullPath: "/v1/tax_ids/{id}"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/TaxRates.js
var stripeMethod$4 = StripeResource.method;
var TaxRates = StripeResource.extend({
	create: stripeMethod$4({
		method: "POST",
		fullPath: "/v1/tax_rates"
	}),
	retrieve: stripeMethod$4({
		method: "GET",
		fullPath: "/v1/tax_rates/{tax_rate}"
	}),
	update: stripeMethod$4({
		method: "POST",
		fullPath: "/v1/tax_rates/{tax_rate}"
	}),
	list: stripeMethod$4({
		method: "GET",
		fullPath: "/v1/tax_rates",
		methodType: "list"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Tokens.js
var stripeMethod$3 = StripeResource.method;
var Tokens = StripeResource.extend({
	create: stripeMethod$3({
		method: "POST",
		fullPath: "/v1/tokens"
	}),
	retrieve: stripeMethod$3({
		method: "GET",
		fullPath: "/v1/tokens/{token}"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Topups.js
var stripeMethod$2 = StripeResource.method;
var Topups = StripeResource.extend({
	create: stripeMethod$2({
		method: "POST",
		fullPath: "/v1/topups"
	}),
	retrieve: stripeMethod$2({
		method: "GET",
		fullPath: "/v1/topups/{topup}"
	}),
	update: stripeMethod$2({
		method: "POST",
		fullPath: "/v1/topups/{topup}"
	}),
	list: stripeMethod$2({
		method: "GET",
		fullPath: "/v1/topups",
		methodType: "list"
	}),
	cancel: stripeMethod$2({
		method: "POST",
		fullPath: "/v1/topups/{topup}/cancel"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/Transfers.js
var stripeMethod$1 = StripeResource.method;
var Transfers = StripeResource.extend({
	create: stripeMethod$1({
		method: "POST",
		fullPath: "/v1/transfers"
	}),
	retrieve: stripeMethod$1({
		method: "GET",
		fullPath: "/v1/transfers/{transfer}"
	}),
	update: stripeMethod$1({
		method: "POST",
		fullPath: "/v1/transfers/{transfer}"
	}),
	list: stripeMethod$1({
		method: "GET",
		fullPath: "/v1/transfers",
		methodType: "list"
	}),
	createReversal: stripeMethod$1({
		method: "POST",
		fullPath: "/v1/transfers/{id}/reversals"
	}),
	listReversals: stripeMethod$1({
		method: "GET",
		fullPath: "/v1/transfers/{id}/reversals",
		methodType: "list"
	}),
	retrieveReversal: stripeMethod$1({
		method: "GET",
		fullPath: "/v1/transfers/{transfer}/reversals/{id}"
	}),
	updateReversal: stripeMethod$1({
		method: "POST",
		fullPath: "/v1/transfers/{transfer}/reversals/{id}"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources/WebhookEndpoints.js
var stripeMethod = StripeResource.method;
var WebhookEndpoints = StripeResource.extend({
	create: stripeMethod({
		method: "POST",
		fullPath: "/v1/webhook_endpoints"
	}),
	retrieve: stripeMethod({
		method: "GET",
		fullPath: "/v1/webhook_endpoints/{webhook_endpoint}"
	}),
	update: stripeMethod({
		method: "POST",
		fullPath: "/v1/webhook_endpoints/{webhook_endpoint}"
	}),
	list: stripeMethod({
		method: "GET",
		fullPath: "/v1/webhook_endpoints",
		methodType: "list"
	}),
	del: stripeMethod({
		method: "DELETE",
		fullPath: "/v1/webhook_endpoints/{webhook_endpoint}"
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/resources.js
var resources_exports = /* @__PURE__ */ __exportAll({
	Account: () => Accounts,
	AccountLinks: () => AccountLinks,
	AccountSessions: () => AccountSessions,
	Accounts: () => Accounts,
	ApplePayDomains: () => ApplePayDomains,
	ApplicationFees: () => ApplicationFees,
	Apps: () => Apps,
	Balance: () => Balance,
	BalanceTransactions: () => BalanceTransactions,
	Billing: () => Billing,
	BillingPortal: () => BillingPortal,
	Charges: () => Charges,
	Checkout: () => Checkout,
	Climate: () => Climate,
	ConfirmationTokens: () => ConfirmationTokens,
	CountrySpecs: () => CountrySpecs,
	Coupons: () => Coupons,
	CreditNotes: () => CreditNotes,
	CustomerSessions: () => CustomerSessions,
	Customers: () => Customers,
	Disputes: () => Disputes,
	Entitlements: () => Entitlements,
	EphemeralKeys: () => EphemeralKeys,
	Events: () => Events,
	ExchangeRates: () => ExchangeRates,
	FileLinks: () => FileLinks,
	Files: () => Files,
	FinancialConnections: () => FinancialConnections,
	Forwarding: () => Forwarding,
	Identity: () => Identity,
	InvoiceItems: () => InvoiceItems,
	InvoicePayments: () => InvoicePayments,
	InvoiceRenderingTemplates: () => InvoiceRenderingTemplates,
	Invoices: () => Invoices,
	Issuing: () => Issuing,
	Mandates: () => Mandates,
	OAuth: () => OAuth,
	PaymentIntents: () => PaymentIntents,
	PaymentLinks: () => PaymentLinks,
	PaymentMethodConfigurations: () => PaymentMethodConfigurations,
	PaymentMethodDomains: () => PaymentMethodDomains,
	PaymentMethods: () => PaymentMethods,
	Payouts: () => Payouts,
	Plans: () => Plans,
	Prices: () => Prices,
	Products: () => Products,
	PromotionCodes: () => PromotionCodes,
	Quotes: () => Quotes,
	Radar: () => Radar,
	Refunds: () => Refunds,
	Reporting: () => Reporting,
	Reviews: () => Reviews,
	SetupAttempts: () => SetupAttempts,
	SetupIntents: () => SetupIntents,
	ShippingRates: () => ShippingRates,
	Sigma: () => Sigma,
	Sources: () => Sources,
	SubscriptionItems: () => SubscriptionItems,
	SubscriptionSchedules: () => SubscriptionSchedules,
	Subscriptions: () => Subscriptions,
	Tax: () => Tax,
	TaxCodes: () => TaxCodes,
	TaxIds: () => TaxIds,
	TaxRates: () => TaxRates,
	Terminal: () => Terminal,
	TestHelpers: () => TestHelpers,
	Tokens: () => Tokens,
	Topups: () => Topups,
	Transfers: () => Transfers,
	Treasury: () => Treasury,
	V2: () => V2,
	WebhookEndpoints: () => WebhookEndpoints
});
var Apps = resourceNamespace("apps", { Secrets });
var Billing = resourceNamespace("billing", {
	Alerts,
	CreditBalanceSummary,
	CreditBalanceTransactions,
	CreditGrants,
	MeterEventAdjustments: MeterEventAdjustments$1,
	MeterEvents: MeterEvents$1,
	Meters
});
var BillingPortal = resourceNamespace("billingPortal", {
	Configurations: Configurations$1,
	Sessions: Sessions$2
});
var Checkout = resourceNamespace("checkout", { Sessions: Sessions$1 });
var Climate = resourceNamespace("climate", {
	Orders,
	Products: Products$1,
	Suppliers
});
var Entitlements = resourceNamespace("entitlements", {
	ActiveEntitlements,
	Features
});
var FinancialConnections = resourceNamespace("financialConnections", {
	Accounts: Accounts$1,
	Sessions,
	Transactions: Transactions$4
});
var Forwarding = resourceNamespace("forwarding", { Requests });
var Identity = resourceNamespace("identity", {
	VerificationReports,
	VerificationSessions
});
var Issuing = resourceNamespace("issuing", {
	Authorizations: Authorizations$1,
	Cardholders,
	Cards: Cards$1,
	Disputes: Disputes$1,
	PersonalizationDesigns: PersonalizationDesigns$1,
	PhysicalBundles,
	Tokens: Tokens$1,
	Transactions: Transactions$3
});
var Radar = resourceNamespace("radar", {
	EarlyFraudWarnings,
	ValueListItems,
	ValueLists
});
var Reporting = resourceNamespace("reporting", {
	ReportRuns,
	ReportTypes
});
var Sigma = resourceNamespace("sigma", { ScheduledQueryRuns });
var Tax = resourceNamespace("tax", {
	Calculations,
	Registrations,
	Settings,
	Transactions: Transactions$2
});
var Terminal = resourceNamespace("terminal", {
	Configurations,
	ConnectionTokens,
	Locations,
	Readers: Readers$1
});
var TestHelpers = resourceNamespace("testHelpers", {
	ConfirmationTokens: ConfirmationTokens$1,
	Customers: Customers$1,
	Refunds: Refunds$1,
	TestClocks,
	Issuing: resourceNamespace("issuing", {
		Authorizations,
		Cards,
		PersonalizationDesigns,
		Transactions: Transactions$1
	}),
	Terminal: resourceNamespace("terminal", { Readers }),
	Treasury: resourceNamespace("treasury", {
		InboundTransfers: InboundTransfers$1,
		OutboundPayments: OutboundPayments$1,
		OutboundTransfers: OutboundTransfers$1,
		ReceivedCredits: ReceivedCredits$1,
		ReceivedDebits: ReceivedDebits$1
	})
});
var Treasury = resourceNamespace("treasury", {
	CreditReversals,
	DebitReversals,
	FinancialAccounts,
	InboundTransfers,
	OutboundPayments,
	OutboundTransfers,
	ReceivedCredits,
	ReceivedDebits,
	TransactionEntries,
	Transactions
});
var V2 = resourceNamespace("v2", {
	Billing: resourceNamespace("billing", {
		MeterEventAdjustments,
		MeterEventSession,
		MeterEventStream,
		MeterEvents
	}),
	Core: resourceNamespace("core", {
		EventDestinations,
		Events: Events$1
	})
});
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/stripe.core.js
var DEFAULT_HOST = "api.stripe.com";
var DEFAULT_PORT = "443";
var DEFAULT_BASE_PATH = "/v1/";
var DEFAULT_API_VERSION = ApiVersion;
var DEFAULT_TIMEOUT = 8e4;
var MAX_NETWORK_RETRY_DELAY_SEC = 5;
var INITIAL_NETWORK_RETRY_DELAY_SEC = .5;
var APP_INFO_PROPERTIES = [
	"name",
	"version",
	"url",
	"partner_id"
];
var ALLOWED_CONFIG_PROPERTIES = [
	"authenticator",
	"apiVersion",
	"typescript",
	"maxNetworkRetries",
	"httpAgent",
	"httpClient",
	"timeout",
	"host",
	"port",
	"protocol",
	"telemetry",
	"appInfo",
	"stripeAccount",
	"stripeContext"
];
var defaultRequestSenderFactory = (stripe) => new RequestSender(stripe, StripeResource.MAX_BUFFERED_REQUEST_METRICS);
function createStripe(platformFunctions, requestSender = defaultRequestSenderFactory) {
	Stripe.PACKAGE_VERSION = "18.5.0";
	Stripe.API_VERSION = ApiVersion;
	Stripe.USER_AGENT = Object.assign({
		bindings_version: Stripe.PACKAGE_VERSION,
		lang: "node",
		publisher: "stripe",
		uname: null,
		typescript: false
	}, determineProcessUserAgentProperties());
	Stripe.StripeResource = StripeResource;
	Stripe.resources = resources_exports;
	Stripe.HttpClient = HttpClient;
	Stripe.HttpClientResponse = HttpClientResponse;
	Stripe.CryptoProvider = CryptoProvider;
	Stripe.webhooks = createWebhooks(platformFunctions);
	function Stripe(key, config = {}) {
		if (!(this instanceof Stripe)) return new Stripe(key, config);
		const props = this._getPropsFromConfig(config);
		this._platformFunctions = platformFunctions;
		Object.defineProperty(this, "_emitter", {
			value: this._platformFunctions.createEmitter(),
			enumerable: false,
			configurable: false,
			writable: false
		});
		this.VERSION = Stripe.PACKAGE_VERSION;
		this.on = this._emitter.on.bind(this._emitter);
		this.once = this._emitter.once.bind(this._emitter);
		this.off = this._emitter.removeListener.bind(this._emitter);
		const agent = props.httpAgent || null;
		this._api = {
			host: props.host || DEFAULT_HOST,
			port: props.port || DEFAULT_PORT,
			protocol: props.protocol || "https",
			basePath: DEFAULT_BASE_PATH,
			version: props.apiVersion || DEFAULT_API_VERSION,
			timeout: validateInteger("timeout", props.timeout, DEFAULT_TIMEOUT),
			maxNetworkRetries: validateInteger("maxNetworkRetries", props.maxNetworkRetries, 2),
			agent,
			httpClient: props.httpClient || (agent ? this._platformFunctions.createNodeHttpClient(agent) : this._platformFunctions.createDefaultHttpClient()),
			dev: false,
			stripeAccount: props.stripeAccount || null,
			stripeContext: props.stripeContext || null
		};
		const typescript = props.typescript || false;
		if (typescript !== Stripe.USER_AGENT.typescript) Stripe.USER_AGENT.typescript = typescript;
		if (props.appInfo) this._setAppInfo(props.appInfo);
		this._prepResources();
		this._setAuthenticator(key, props.authenticator);
		this.errors = Error_exports;
		this.webhooks = Stripe.webhooks;
		this._prevRequestMetrics = [];
		this._enableTelemetry = props.telemetry !== false;
		this._requestSender = requestSender(this);
		this.StripeResource = Stripe.StripeResource;
	}
	Stripe.errors = Error_exports;
	Stripe.createNodeHttpClient = platformFunctions.createNodeHttpClient;
	/**
	* Creates an HTTP client for issuing Stripe API requests which uses the Web
	* Fetch API.
	*
	* A fetch function can optionally be passed in as a parameter. If none is
	* passed, will default to the default `fetch` function in the global scope.
	*/
	Stripe.createFetchHttpClient = platformFunctions.createFetchHttpClient;
	/**
	* Create a CryptoProvider which uses the built-in Node crypto libraries for
	* its crypto operations.
	*/
	Stripe.createNodeCryptoProvider = platformFunctions.createNodeCryptoProvider;
	/**
	* Creates a CryptoProvider which uses the Subtle Crypto API from the Web
	* Crypto API spec for its crypto operations.
	*
	* A SubtleCrypto interface can optionally be passed in as a parameter. If none
	* is passed, will default to the default `crypto.subtle` object in the global
	* scope.
	*/
	Stripe.createSubtleCryptoProvider = platformFunctions.createSubtleCryptoProvider;
	Stripe.prototype = {
		_appInfo: void 0,
		on: null,
		off: null,
		once: null,
		VERSION: null,
		StripeResource: null,
		webhooks: null,
		errors: null,
		_api: null,
		_prevRequestMetrics: null,
		_emitter: null,
		_enableTelemetry: null,
		_requestSender: null,
		_platformFunctions: null,
		rawRequest(method, path, params, options) {
			return this._requestSender._rawRequest(method, path, params, options);
		},
		/**
		* @private
		*/
		_setAuthenticator(key, authenticator) {
			if (key && authenticator) throw new Error("Can't specify both apiKey and authenticator");
			if (!key && !authenticator) throw new Error("Neither apiKey nor config.authenticator provided");
			this._authenticator = key ? createApiKeyAuthenticator(key) : authenticator;
		},
		/**
		* @private
		* This may be removed in the future.
		*/
		_setAppInfo(info) {
			if (info && typeof info !== "object") throw new Error("AppInfo must be an object.");
			if (info && !info.name) throw new Error("AppInfo.name is required");
			info = info || {};
			this._appInfo = APP_INFO_PROPERTIES.reduce((accum, prop) => {
				if (typeof info[prop] == "string") {
					accum = accum || {};
					accum[prop] = info[prop];
				}
				return accum;
			}, {});
		},
		/**
		* @private
		* This may be removed in the future.
		*/
		_setApiField(key, value) {
			this._api[key] = value;
		},
		/**
		* @private
		* Please open or upvote an issue at github.com/stripe/stripe-node
		* if you use this, detailing your use-case.
		*
		* It may be deprecated and removed in the future.
		*/
		getApiField(key) {
			return this._api[key];
		},
		setClientId(clientId) {
			this._clientId = clientId;
		},
		getClientId() {
			return this._clientId;
		},
		/**
		* @private
		* Please open or upvote an issue at github.com/stripe/stripe-node
		* if you use this, detailing your use-case.
		*
		* It may be deprecated and removed in the future.
		*/
		getConstant: (c) => {
			switch (c) {
				case "DEFAULT_HOST": return DEFAULT_HOST;
				case "DEFAULT_PORT": return DEFAULT_PORT;
				case "DEFAULT_BASE_PATH": return DEFAULT_BASE_PATH;
				case "DEFAULT_API_VERSION": return DEFAULT_API_VERSION;
				case "DEFAULT_TIMEOUT": return DEFAULT_TIMEOUT;
				case "MAX_NETWORK_RETRY_DELAY_SEC": return MAX_NETWORK_RETRY_DELAY_SEC;
				case "INITIAL_NETWORK_RETRY_DELAY_SEC": return INITIAL_NETWORK_RETRY_DELAY_SEC;
			}
			return Stripe[c];
		},
		getMaxNetworkRetries() {
			return this.getApiField("maxNetworkRetries");
		},
		/**
		* @private
		* This may be removed in the future.
		*/
		_setApiNumberField(prop, n, defaultVal) {
			const val = validateInteger(prop, n, defaultVal);
			this._setApiField(prop, val);
		},
		getMaxNetworkRetryDelay() {
			return MAX_NETWORK_RETRY_DELAY_SEC;
		},
		getInitialNetworkRetryDelay() {
			return INITIAL_NETWORK_RETRY_DELAY_SEC;
		},
		/**
		* @private
		* Please open or upvote an issue at github.com/stripe/stripe-node
		* if you use this, detailing your use-case.
		*
		* It may be deprecated and removed in the future.
		*
		* Gets a JSON version of a User-Agent and uses a cached version for a slight
		* speed advantage.
		*/
		getClientUserAgent(cb) {
			return this.getClientUserAgentSeeded(Stripe.USER_AGENT, cb);
		},
		/**
		* @private
		* Please open or upvote an issue at github.com/stripe/stripe-node
		* if you use this, detailing your use-case.
		*
		* It may be deprecated and removed in the future.
		*
		* Gets a JSON version of a User-Agent by encoding a seeded object and
		* fetching a uname from the system.
		*/
		getClientUserAgentSeeded(seed, cb) {
			this._platformFunctions.getUname().then((uname) => {
				var _a;
				const userAgent = {};
				for (const field in seed) {
					if (!Object.prototype.hasOwnProperty.call(seed, field)) continue;
					userAgent[field] = encodeURIComponent((_a = seed[field]) !== null && _a !== void 0 ? _a : "null");
				}
				userAgent.uname = encodeURIComponent(uname || "UNKNOWN");
				const client = this.getApiField("httpClient");
				if (client) userAgent.httplib = encodeURIComponent(client.getClientName());
				if (this._appInfo) userAgent.application = this._appInfo;
				cb(JSON.stringify(userAgent));
			});
		},
		/**
		* @private
		* Please open or upvote an issue at github.com/stripe/stripe-node
		* if you use this, detailing your use-case.
		*
		* It may be deprecated and removed in the future.
		*/
		getAppInfoAsString() {
			if (!this._appInfo) return "";
			let formatted = this._appInfo.name;
			if (this._appInfo.version) formatted += `/${this._appInfo.version}`;
			if (this._appInfo.url) formatted += ` (${this._appInfo.url})`;
			return formatted;
		},
		getTelemetryEnabled() {
			return this._enableTelemetry;
		},
		/**
		* @private
		* This may be removed in the future.
		*/
		_prepResources() {
			for (const name in resources_exports) {
				if (!Object.prototype.hasOwnProperty.call(resources_exports, name)) continue;
				this[pascalToCamelCase(name)] = new resources_exports[name](this);
			}
		},
		/**
		* @private
		* This may be removed in the future.
		*/
		_getPropsFromConfig(config) {
			if (!config) return {};
			const isString = typeof config === "string";
			if (!(config === Object(config) && !Array.isArray(config)) && !isString) throw new Error("Config must either be an object or a string");
			if (isString) return { apiVersion: config };
			if (Object.keys(config).filter((value) => !ALLOWED_CONFIG_PROPERTIES.includes(value)).length > 0) throw new Error(`Config object may only contain the following: ${ALLOWED_CONFIG_PROPERTIES.join(", ")}`);
			return config;
		},
		parseThinEvent(payload, header, secret, tolerance, cryptoProvider, receivedAt) {
			return this.webhooks.constructEvent(payload, header, secret, tolerance, cryptoProvider, receivedAt);
		}
	};
	return Stripe;
}
//#endregion
//#region node_modules/.pnpm/stripe@18.5.0_@types+node@22.19.17/node_modules/stripe/esm/stripe.esm.worker.js
var Stripe = createStripe(new WebPlatformFunctions());
//#endregion
export { Stripe as t };
