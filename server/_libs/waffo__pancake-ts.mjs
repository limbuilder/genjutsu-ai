import process from "node:process";
import { createHash, createPrivateKey, createPublicKey, createSign, createVerify } from "node:crypto";
//#region node_modules/.pnpm/@waffo+pancake-ts@0.19.1/node_modules/@waffo/pancake-ts/dist/index.js
var WaffoPancakeError = class extends Error {
	status;
	errors;
	constructor(status, errors) {
		const rootCause = errors[0]?.message ?? "Unknown error";
		super(rootCause);
		this.name = "WaffoPancakeError";
		this.status = status;
		this.errors = errors;
	}
};
var DEFAULT_BASE_URL = "https://api.waffo.ai";
var CustomerHttpClient = class {
	token;
	environment;
	baseUrl;
	_fetch;
	constructor(token, environment, config) {
		this.token = token;
		this.environment = environment;
		this.baseUrl = (config.baseUrl ?? DEFAULT_BASE_URL).replace(/\/+$/, "");
		this._fetch = config.fetch ?? globalThis.fetch.bind(globalThis);
	}
	/**
	* Send a Bearer-authenticated POST and return the full envelope plus HTTP status.
	*
	* Sends `Authorization: Bearer <token>` and `X-Environment` — the gateway
	* requires both to accept a session token.
	*
	* Does NOT throw on `errors[]` or non-2xx status — caller inspects the result.
	* Throws {@link WaffoPancakeError} only when the response body is not valid JSON.
	*/
	async post(path, body) {
		const response = await this._fetch(`${this.baseUrl}${path}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${this.token}`,
				"X-Environment": this.environment
			},
			body: JSON.stringify(body)
		});
		let envelope;
		try {
			envelope = await response.json();
		} catch {
			throw new WaffoPancakeError(response.status, [{
				message: `Non-JSON response from ${path}`,
				layer: "sdk"
			}]);
		}
		return {
			status: response.status,
			...envelope
		};
	}
};
var PKCS8_HEADER = "-----BEGIN PRIVATE KEY-----";
var PKCS8_FOOTER = "-----END PRIVATE KEY-----";
var PKCS1_HEADER = "-----BEGIN RSA PRIVATE KEY-----";
var PKCS1_FOOTER = "-----END RSA PRIVATE KEY-----";
var SPKI_HEADER = "-----BEGIN PUBLIC KEY-----";
var SPKI_FOOTER = "-----END PUBLIC KEY-----";
var PKCS1_PUB_HEADER = "-----BEGIN RSA PUBLIC KEY-----";
var PKCS1_PUB_FOOTER = "-----END RSA PUBLIC KEY-----";
function normalizePrivateKey(raw) {
	if (!raw || !raw.trim()) throw new Error("Private key is empty. Provide an RSA private key in PEM format.");
	let pem = raw.replace(/\\n/g, "\n").replace(/\r\n/g, "\n");
	pem = pem.trim();
	const hasPkcs8Header = pem.includes(PKCS8_HEADER);
	const hasPkcs1Header = pem.includes(PKCS1_HEADER);
	if (hasPkcs8Header || hasPkcs1Header) {
		const base64 = pem.replace(/-----BEGIN (?:RSA )?PRIVATE KEY-----/g, "").replace(/-----END (?:RSA )?PRIVATE KEY-----/g, "").replace(/\s+/g, "");
		if (!base64) throw new Error("Private key contains PEM headers but no key data. Check the key content.");
		const header = hasPkcs1Header ? PKCS1_HEADER : PKCS8_HEADER;
		const footer = hasPkcs1Header ? PKCS1_FOOTER : PKCS8_FOOTER;
		pem = `${header}
${base64.match(/.{1,64}/g).join("\n")}
${footer}`;
	} else {
		const base64 = pem.replace(/\s+/g, "");
		if (!/^[A-Za-z0-9+/]+=*$/.test(base64)) throw new Error("Private key is not valid PEM or base64. Expected an RSA private key in PEM format or raw base64.");
		pem = `${PKCS8_HEADER}
${base64.match(/.{1,64}/g).join("\n")}
${PKCS8_FOOTER}`;
	}
	try {
		createPrivateKey(pem);
	} catch {
		throw new Error("Private key could not be parsed. Ensure it is a valid RSA private key in PKCS#8 or PKCS#1 (PEM) format.");
	}
	return pem;
}
function normalizePublicKey(raw) {
	if (!raw || !raw.trim()) throw new Error("Public key is empty. Provide an RSA public key in PEM format.");
	let pem = raw.replace(/\\n/g, "\n").replace(/\r\n/g, "\n");
	pem = pem.trim();
	const hasSpkiHeader = pem.includes(SPKI_HEADER);
	const hasPkcs1PubHeader = pem.includes(PKCS1_PUB_HEADER);
	if (hasSpkiHeader || hasPkcs1PubHeader) {
		const base64 = pem.replace(/-----BEGIN (?:RSA )?PUBLIC KEY-----/g, "").replace(/-----END (?:RSA )?PUBLIC KEY-----/g, "").replace(/\s+/g, "");
		if (!base64) throw new Error("Public key contains PEM headers but no key data. Check the key content.");
		const header = hasPkcs1PubHeader ? PKCS1_PUB_HEADER : SPKI_HEADER;
		const footer = hasPkcs1PubHeader ? PKCS1_PUB_FOOTER : SPKI_FOOTER;
		pem = `${header}
${base64.match(/.{1,64}/g).join("\n")}
${footer}`;
	} else {
		const base64 = pem.replace(/\s+/g, "");
		if (!/^[A-Za-z0-9+/]+=*$/.test(base64)) throw new Error("Public key is not valid PEM or base64. Expected an RSA public key in PEM format or raw base64.");
		pem = `${SPKI_HEADER}
${base64.match(/.{1,64}/g).join("\n")}
${SPKI_FOOTER}`;
	}
	try {
		createPublicKey(pem);
	} catch {
		throw new Error("Public key could not be parsed. Ensure it is a valid RSA public key in SPKI or PKCS#1 (PEM) format.");
	}
	return pem;
}
function signRequest(method, path, timestamp, body, privateKey) {
	const canonicalRequest = `${method}
${path}
${timestamp}
${createHash("sha256").update(body).digest("base64")}`;
	const sign = createSign("sha256");
	sign.update(canonicalRequest);
	return sign.sign(privateKey, "base64");
}
var DEFAULT_BASE_URL2 = "https://api.waffo.ai";
var HttpClient = class {
	merchantId;
	privateKey;
	baseUrl;
	_fetch;
	constructor(config) {
		this.merchantId = config.merchantId;
		this.privateKey = normalizePrivateKey(config.privateKey);
		this.baseUrl = (config.baseUrl ?? DEFAULT_BASE_URL2).replace(/\/+$/, "");
		this._fetch = config.fetch ?? globalThis.fetch.bind(globalThis);
	}
	/**
	* Send a signed POST and return the full envelope plus HTTP status.
	*
	* Behavior:
	* - Builds RSA-SHA256 signature (`X-Merchant-Id` / `X-Timestamp` / `X-Signature`)
	* - Attaches `X-Idempotency-Key` (deterministic `sha256(merchantId + path + body)`)
	*   unless `options.noIdempotency` is set
	* - When `options.idempotencyWindow` is set, a floored timestamp is mixed into the
	*   key so identical params produce a new key after the window elapses
	* - Does NOT throw on `errors[]` or non-2xx status — caller inspects the result
	* - Throws {@link WaffoPancakeError} only on transport failures (non-JSON body)
	*
	* @param path - API path (e.g. `/v1/actions/store/create-store`, `/v1/graphql`)
	* @param body - Request body object
	* @param options - Optional settings
	* @returns Parsed envelope with HTTP status
	* @throws {WaffoPancakeError} When the response body is not valid JSON
	*/
	async post(path, body, options) {
		const bodyStr = JSON.stringify(body);
		const timestampSec = Math.floor(Date.now() / 1e3);
		const timestamp = timestampSec.toString();
		const signature = signRequest("POST", path, timestamp, bodyStr, this.privateKey);
		const headers = {
			"Content-Type": "application/json",
			"X-Merchant-Id": this.merchantId,
			"X-Timestamp": timestamp,
			"X-Signature": signature
		};
		if (!options?.noIdempotency) headers["X-Idempotency-Key"] = computeIdempotencyKey(this.merchantId, path, bodyStr, timestampSec, options);
		const response = await this._fetch(`${this.baseUrl}${path}`, {
			method: "POST",
			headers,
			body: bodyStr
		});
		let envelope;
		try {
			envelope = await response.json();
		} catch {
			throw new WaffoPancakeError(response.status, [{
				message: `Non-JSON response from ${path}`,
				layer: "sdk"
			}]);
		}
		return {
			status: response.status,
			...envelope
		};
	}
};
function computeIdempotencyKey(merchantId, path, bodyStr, timestampSec, options) {
	const base = `${merchantId}:${path}:${bodyStr}`;
	const input = options?.idempotencyWindow ? `${base}:${Math.floor(timestampSec / options.idempotencyWindow)}` : base;
	return createHash("sha256").update(input).digest("hex");
}
function unwrapAction(r) {
	if (r.errors?.length) throw new WaffoPancakeError(r.status, r.errors);
	return {
		...r.data,
		...r.warnings ? { warnings: r.warnings } : {}
	};
}
var SHORT_ID_REGEX = /^[A-Z]{2,5}_[0-9A-Za-z]{22}$/;
var CURRENCY_CODE_REGEX = /^[A-Z]{3}$/;
var COUNTRY_CODE_REGEX = /^[A-Z]{2}$/;
var AMOUNT_STRING_REGEX = /^\d+(\.\d+)?$/;
var SHORT_ID_LABELS = {
	STO: "Store",
	PROD: "Product",
	ORD: "Order",
	PAY: "Payment",
	REF: "Refund",
	TKT: "Ticket",
	MER: "Merchant"
};
function fail(message) {
	throw new WaffoPancakeError(400, [{
		message,
		layer: "sdk"
	}]);
}
function validateRequired(field, value) {
	if (value === void 0 || value === null) fail(`Missing required field: ${field}`);
	if (typeof value === "string" && value.trim() === "") fail(`${field} cannot be empty`);
}
function validateShortId(field, value, prefix) {
	validateRequired(field, value);
	const label = SHORT_ID_LABELS[prefix] ?? prefix;
	if (!SHORT_ID_REGEX.test(value)) fail(`Invalid ${field}: expected ${label} Short ID format (${prefix}_xxx), got "${value}"`);
	if (!value.startsWith(`${prefix}_`)) fail(`Invalid ${field}: expected ${prefix}_ prefix (${label}), got "${value.split("_")[0]}_"`);
}
function validateCurrencyCode(field, value) {
	validateRequired(field, value);
	if (!CURRENCY_CODE_REGEX.test(value)) fail(`Invalid ${field}: expected 3-letter ISO 4217 currency code (e.g., "USD"), got "${value}"`);
}
function validateAmountString(field, value) {
	validateRequired(field, value);
	if (!AMOUNT_STRING_REGEX.test(value)) fail(`Invalid ${field}: expected numeric string in display format (e.g., "9.99", "1000"), got "${value}"`);
}
function validateEnum(field, value, allowed) {
	validateRequired(field, value);
	if (!allowed.includes(value)) fail(`Invalid ${field}: expected one of [${allowed.join(", ")}], got "${value}"`);
}
function validateMaxLength(field, value, max) {
	if (value !== void 0 && value.length > max) fail(`${field} must be at most ${max} characters, got ${value.length}`);
}
function validatePositiveInteger(field, value) {
	if (!Number.isInteger(value) || value <= 0) fail(`Invalid ${field}: expected positive integer, got ${value}`);
}
function validateCountryCode(field, value) {
	validateRequired(field, value);
	if (!COUNTRY_CODE_REGEX.test(value)) fail(`Invalid ${field}: expected 2-letter ISO 3166-1 country code (e.g., "US"), got "${value}"`);
}
function validatePrices(field, prices) {
	validateRequired(field, prices);
	const entries = Object.entries(prices);
	if (entries.length === 0) fail(`${field} must contain at least one currency`);
	for (const [currency, info] of entries) {
		validateCurrencyCode(`${field}.${currency} (key)`, currency);
		validateAmountString(`${field}.${currency}.amount`, info.amount);
		validateRequired(`${field}.${currency}.taxCategory`, info.taxCategory);
	}
}
function validateBillingDetail(detail) {
	validateCountryCode("billingDetail.country", detail.country);
	if (typeof detail.isBusiness !== "boolean") fail(`Invalid billingDetail.isBusiness: expected boolean, got ${typeof detail.isBusiness}`);
}
function validateCheckoutCommon(params) {
	validateShortId("productId", params.productId, "PROD");
	validateCurrencyCode("currency", params.currency);
	if (params.priceSnapshot) {
		validateAmountString("priceSnapshot.amount", params.priceSnapshot.amount);
		validateRequired("priceSnapshot.taxCategory", params.priceSnapshot.taxCategory);
	}
	if (params.billingDetail) validateBillingDetail(params.billingDetail);
	if (params.expiresInSeconds !== void 0) validatePositiveInteger("expiresInSeconds", params.expiresInSeconds);
	validateMaxLength("orderMerchantExternalId", params.orderMerchantExternalId, 128);
}
var AuthResource = class {
	constructor(http) {
		this.http = http;
	}
	/**
	* Issue a session token for a customer.
	*
	* @param params - Token issuance parameters
	* @returns Issued session token with expiration
	*
	* @example
	* // By store ID
	* const { token, expiresAt } = await client.auth.issueSessionToken({
	*   storeId: "STO_xxx",
	*   buyerIdentity: "customer@example.com",
	* });
	*
	* @example
	* // By product ID (store derived automatically)
	* const { token, expiresAt } = await client.auth.issueSessionToken({
	*   productId: "PROD_xxx",
	*   buyerIdentity: "customer@example.com",
	* });
	*/
	async issueSessionToken(params) {
		if (!params.storeId && !params.productId) throw new WaffoPancakeError(400, [{
			message: "Missing required field: provide storeId or productId",
			layer: "sdk"
		}]);
		if (params.storeId) validateShortId("storeId", params.storeId, "STO");
		if (params.productId) validateShortId("productId", params.productId, "PROD");
		validateRequired("buyerIdentity", params.buyerIdentity);
		return unwrapAction(await this.http.post("/v1/actions/auth/issue-session-token", params));
	}
};
var CheckoutAnonymousResource = class {
	constructor(http) {
		this.http = http;
	}
	/**
	* Create an anonymous checkout session.
	*
	* @param params - Checkout parameters (no customer identity required)
	* @returns Session ID, checkout URL, and expiration
	*
	* @example
	* // Minimal — customer fills everything on the page
	* const result = await client.checkout.anonymous.create({
	*   productId: "PROD_xxx",
	*   currency: "USD",
	* });
	*
	* @example
	* // Pre-fill email + billing + attach business-side order reference
	* const result = await client.checkout.anonymous.create({
	*   productId: "PROD_xxx",
	*   currency: "USD",
	*   buyerEmail: "customer@example.com",
	*   billingDetail: { country: "US", isBusiness: false, postcode: "10001" },
	*   orderMerchantExternalId: "ORDER-2026-00891",
	* });
	*/
	async create(params) {
		validateCheckoutCommon(params);
		return unwrapAction(await this.http.post("/v1/actions/checkout/create-session", params, { idempotencyWindow: 60 }));
	}
};
var CheckoutAuthenticatedResource = class {
	constructor(http) {
		this.http = http;
	}
	/**
	* Create an authenticated checkout session.
	*
	* Behavior:
	* - Issues a session token via `issue-session-token` (receives `buyerIdentity` + `productId` only)
	* - Creates a checkout session via `create-session` (receives every other field unchanged)
	* - Appends the token to the checkout URL as a URL fragment (`#token=...`)
	*
	* `buyerIdentity` and `buyerEmail` are independent inputs: identity is for the JWT,
	* email is for pre-filling the checkout page. The SDK forwards each to its own endpoint.
	*
	* @param params - Checkout parameters including customer identity
	* @returns Session details with token-appended checkout URL
	*
	* @example
	* const result = await client.checkout.authenticated.create({
	*   productId: "PROD_xxx",
	*   currency: "USD",
	*   buyerIdentity: "user-123",
	*   buyerEmail: "customer@example.com",
	*   orderMerchantExternalId: "ORDER-2026-00891",
	* });
	* // Redirect to result.checkoutUrl (includes #token=...)
	*/
	async create(params) {
		validateCheckoutCommon(params);
		validateRequired("buyerIdentity", params.buyerIdentity);
		const { buyerIdentity, ...sessionParams } = params;
		const [tokenResult, sessionResult] = await Promise.all([this.http.post("/v1/actions/auth/issue-session-token", {
			productId: params.productId,
			buyerIdentity
		}, { idempotencyWindow: 60 }), this.http.post("/v1/actions/checkout/create-session", sessionParams, { idempotencyWindow: 60 })]);
		const token = unwrapAction(tokenResult);
		const session = unwrapAction(sessionResult);
		const warnings = [...token.warnings ?? [], ...session.warnings ?? []];
		return {
			sessionId: session.sessionId,
			checkoutUrl: `${session.checkoutUrl}#token=${token.token}`,
			expiresAt: session.expiresAt,
			token: token.token,
			tokenExpiresAt: token.expiresAt,
			...warnings.length > 0 ? { warnings } : {}
		};
	}
};
var CheckoutResource = class {
	constructor(http) {
		this.http = http;
		this.anonymous = new CheckoutAnonymousResource(http);
		this.authenticated = new CheckoutAuthenticatedResource(http);
	}
	/** Anonymous checkout — no customer identity, empty form. */
	anonymous;
	/** Authenticated checkout — merchant provides customer identity. */
	authenticated;
	/**
	* Create a checkout session (low-level). Returns a URL to redirect the customer to.
	*
	* For most use cases, prefer `checkout.anonymous.create()` or
	* `checkout.authenticated.create()` which handle the full flow automatically.
	*
	* @param params - Checkout session parameters
	* @returns Session ID, checkout URL, and expiration
	*
	* @example
	* const session = await client.checkout.createSession({
	*   productId: "PROD_xxx",
	*   currency: "USD",
	*   buyerEmail: "customer@example.com",
	* });
	* // Redirect to session.checkoutUrl
	*/
	async createSession(params) {
		return unwrapAction(await this.http.post("/v1/actions/checkout/create-session", params, { idempotencyWindow: 60 }));
	}
};
var ContentSafetyResource = class {
	constructor(http) {
		this.http = http;
	}
	/**
	* Scan a user's text prompt for content-safety compliance before AIGC
	* generation. Call this before invoking your image/video model and continue
	* only when `action` is `allow`.
	*
	* Stateless — the check never stores prompt text. If the safety service is
	* briefly unavailable, the verdict fails closed to `review` so an
	* unmoderated prompt is never let through.
	*
	* @param params - Scan parameters (prompt required; locale / semantic optional)
	* @returns Redacted scan verdict
	*
	* @example
	* const verdict = await client.contentSafety.scanPrompt({ prompt: "a cat riding a bike" });
	* if (verdict.action !== "allow") {
	*   // do not generate
	* }
	*/
	async scanPrompt(params) {
		validateRequired("prompt", params.prompt);
		return unwrapAction(await this.http.post("/v1/actions/verification/scan-prompt", params));
	}
};
var CustomerSession = class {
	constructor(http) {
		this.http = http;
		this.graphql = new CustomerGraphQL(http);
	}
	/** GraphQL query access scoped to the customer's data. */
	graphql;
	/**
	* Cancel a subscription order.
	*
	* @param params - Order to cancel
	* @returns Order ID and resulting status
	*
	* @example
	* const { orderId, status } = await customer.cancelSubscription({ orderId: "ORD_xxx" });
	* // status: "canceled" (was pending)
	* //      or "canceling" (was active — stops at the end of the current period)
	* //      or "canceling" (was past_due — stops immediately)
	*/
	async cancelSubscription(params) {
		validateShortId("orderId", params.orderId, "ORD");
		return unwrapAction(await this.http.post("/v1/actions/subscription-order/cancel-order", params));
	}
	/**
	* Cancel a one-time order (only while payment is still pending).
	*
	* @param params - Order to cancel
	* @returns Order ID and resulting status
	*
	* @example
	* const { orderId, status } = await customer.cancelOnetimeOrder({ orderId: "ORD_xxx" });
	*/
	async cancelOnetimeOrder(params) {
		validateShortId("orderId", params.orderId, "ORD");
		return unwrapAction(await this.http.post("/v1/actions/onetime-order/cancel-order", params));
	}
	/**
	* Reactivate a subscription that is in `canceling` status.
	*
	* A subscription that had an unpaid charge at the moment cancellation was
	* requested is refused with 400 (`Subscription with an unpaid balance cannot
	* be reactivated`), which is worded differently from the 400 returned when
	* the order is not in `canceling` status. Cancelling a `past_due`
	* subscription always falls into the former category.
	*
	* @param params - Order to reactivate
	* @returns Order ID and resulting status
	*
	* @example
	* const { orderId, status } = await customer.reactivateSubscription({ orderId: "ORD_xxx" });
	* // status: "active"
	*/
	async reactivateSubscription(params) {
		validateShortId("orderId", params.orderId, "ORD");
		return unwrapAction(await this.http.post("/v1/actions/subscription-order/reactivate-order", params));
	}
	/**
	* Submit a refund request for a payment.
	*
	* @param params - Refund ticket details
	* @returns Created refund ticket
	*
	* @example
	* const { ticket } = await customer.createRefundTicket({
	*   paymentId: "PAY_xxx",
	*   reason: "Product not as described",
	*   requestedAmount: { amount: "29.00", currency: "USD" },
	*   refundTicketMerchantExternalId: "REF-2026-00891",
	* });
	*/
	async createRefundTicket(params) {
		validateShortId("paymentId", params.paymentId, "PAY");
		validateRequired("reason", params.reason);
		validateAmountString("requestedAmount.amount", params.requestedAmount.amount);
		validateCurrencyCode("requestedAmount.currency", params.requestedAmount.currency);
		validateMaxLength("refundTicketMerchantExternalId", params.refundTicketMerchantExternalId, 128);
		return unwrapAction(await this.http.post("/v1/actions/refund-ticket/create-ticket", params));
	}
	/**
	* Resubmit a previously rejected refund ticket with updated details.
	*
	* @param params - Updated ticket details
	* @returns Updated refund ticket
	*
	* @example
	* const { ticket } = await customer.resubmitRefundTicket({
	*   ticketId: "TKT_xxx",
	*   paymentId: "PAY_xxx",
	*   reason: "Updated reason with more detail",
	*   requestedAmount: { amount: "29.00", currency: "USD" },
	* });
	*/
	async resubmitRefundTicket(params) {
		validateShortId("ticketId", params.ticketId, "TKT");
		validateShortId("paymentId", params.paymentId, "PAY");
		validateRequired("reason", params.reason);
		validateAmountString("requestedAmount.amount", params.requestedAmount.amount);
		validateCurrencyCode("requestedAmount.currency", params.requestedAmount.currency);
		return unwrapAction(await this.http.post("/v1/actions/refund-ticket/resubmit-ticket", params));
	}
};
var CustomerGraphQL = class {
	constructor(http) {
		this.http = http;
	}
	/**
	* Execute a GraphQL query scoped to the customer's data.
	*
	* @param params - GraphQL query and variables
	* @returns GraphQL response
	*
	* @example
	* const result = await customer.graphql.query({
	*   query: `query { orders { id status } }`,
	* });
	*/
	async query(params) {
		validateRequired("query", params.query);
		const result = await this.http.post("/v1/graphql", params);
		return {
			data: result.data,
			errors: result.errors,
			warnings: result.warnings
		};
	}
};
var GraphQLResource = class {
	constructor(http) {
		this.http = http;
	}
	/**
	* Execute a GraphQL query (Query only, no Mutations).
	*
	* @param params - GraphQL query and optional variables
	* @returns GraphQL response with data and optional errors
	*
	* @example
	* const result = await client.graphql.query<{ stores: Array<{ id: string; name: string }> }>({
	*   query: `query { stores { id name status } }`,
	* });
	* console.log(result.data?.stores);
	*
	* @example
	* const result = await client.graphql.query({
	*   query: `query ($id: ID!) { onetimeProduct(id: $id) { id name prices } }`,
	*   variables: { id: "PROD_xxx" },
	* });
	*/
	async query(params) {
		validateRequired("query", params.query);
		const result = await this.http.post("/v1/graphql", params, { noIdempotency: true });
		return {
			data: result.data,
			errors: result.errors,
			warnings: result.warnings
		};
	}
};
var OnetimeProductsResource = class {
	constructor(http) {
		this.http = http;
	}
	/**
	* Create a one-time product with multi-currency pricing.
	*
	* @param params - Product creation parameters
	* @returns Created product detail
	*
	* @example
	* const { product } = await client.onetimeProducts.create({
	*   storeId: "STO_xxx",
	*   name: "E-Book",
	*   prices: { USD: { amount: "29.00", taxCategory: "digital_goods" } },
	* });
	*/
	async create(params) {
		validateShortId("storeId", params.storeId, "STO");
		validateRequired("name", params.name);
		validatePrices("prices", params.prices);
		return unwrapAction(await this.http.post("/v1/actions/onetime-product/create-product", params));
	}
	/**
	* Update a one-time product. Creates a new version; skips if unchanged.
	*
	* @param params - Product update parameters (only `id` is required)
	* @returns Updated product detail
	*
	* @example
	* // Update only the name
	* const { product } = await client.onetimeProducts.update({
	*   id: "PROD_xxx",
	*   name: "E-Book v2",
	* });
	*
	* @example
	* // Update prices while preserving other fields
	* const { product } = await client.onetimeProducts.update({
	*   id: "PROD_xxx",
	*   prices: { USD: { amount: "39.00", taxCategory: "digital_goods" } },
	* });
	*/
	async update(params) {
		validateShortId("id", params.id, "PROD");
		if (params.name !== void 0) validateRequired("name", params.name);
		if (params.prices) validatePrices("prices", params.prices);
		return unwrapAction(await this.http.post("/v1/actions/onetime-product/update-product", params));
	}
	/**
	* Publish a one-time product's test version to production.
	*
	* @param params - Product to publish
	* @returns Published product detail
	*
	* @example
	* const { product } = await client.onetimeProducts.publish({ id: "PROD_xxx" });
	*/
	async publish(params) {
		validateShortId("id", params.id, "PROD");
		return unwrapAction(await this.http.post("/v1/actions/onetime-product/publish-product", params));
	}
	/**
	* Update a one-time product's status (active/inactive).
	*
	* @param params - Status update parameters
	* @returns Updated product detail
	*
	* @example
	* const { product } = await client.onetimeProducts.updateStatus({
	*   id: "PROD_xxx",
	*   status: ProductVersionStatus.Inactive,
	* });
	*/
	async updateStatus(params) {
		validateShortId("id", params.id, "PROD");
		validateEnum("status", params.status, ["active", "inactive"]);
		return unwrapAction(await this.http.post("/v1/actions/onetime-product/update-status", params));
	}
};
var OrdersResource = class {
	constructor(http) {
		this.http = http;
	}
	/**
	* Cancel a subscription order.
	*
	* - pending -> canceled (immediate, no PSP call)
	* - active/trialing -> canceling (PSP cancel scheduled for the end of the
	*   current billing period; the subscription stays usable until then)
	* - past_due -> canceling (PSP cancel dispatched immediately; the billing
	*   period has already lapsed, so nothing is left to use)
	*
	* In both canceling cases the terminal `canceled` status is written when the
	* PSP cancellation webhook arrives, not by this call.
	*
	* @param params - Order to cancel
	* @returns Order ID and resulting status
	*
	* @example
	* const { orderId, status } = await client.orders.cancelSubscription({
	*   orderId: "ORD_xxx",
	* });
	* // status: "canceled" or "canceling"
	*/
	async cancelSubscription(params) {
		validateShortId("orderId", params.orderId, "ORD");
		return unwrapAction(await this.http.post("/v1/actions/subscription-order/cancel-order", params));
	}
};
var StoreMerchantsResource = class {
	constructor(http) {
		this.http = http;
	}
	/**
	* Add a merchant to a store.
	*
	* @param params - Merchant addition parameters
	* @returns Added merchant details
	*
	* @example
	* const result = await client.storeMerchants.add({
	*   storeId: "STO_xxx",
	*   email: "member@example.com",
	*   role: "admin",
	* });
	*/
	async add(params) {
		validateShortId("storeId", params.storeId, "STO");
		validateRequired("email", params.email);
		validateEnum("role", params.role, ["admin", "member"]);
		return unwrapAction(await this.http.post("/v1/actions/store-merchant/add-merchant", params));
	}
	/**
	* Remove a merchant from a store.
	*
	* @param params - Merchant removal parameters
	* @returns Removal confirmation
	*
	* @example
	* const result = await client.storeMerchants.remove({
	*   storeId: "STO_xxx",
	*   merchantId: "MER_xxx",
	* });
	*/
	async remove(params) {
		validateShortId("storeId", params.storeId, "STO");
		validateShortId("merchantId", params.merchantId, "MER");
		return unwrapAction(await this.http.post("/v1/actions/store-merchant/remove-merchant", params));
	}
	/**
	* Update a merchant's role in a store.
	*
	* @param params - Role update parameters
	* @returns Updated role details
	*
	* @example
	* const result = await client.storeMerchants.updateRole({
	*   storeId: "STO_xxx",
	*   merchantId: "MER_xxx",
	*   role: "member",
	* });
	*/
	async updateRole(params) {
		validateShortId("storeId", params.storeId, "STO");
		validateShortId("merchantId", params.merchantId, "MER");
		validateEnum("role", params.role, ["admin", "member"]);
		return unwrapAction(await this.http.post("/v1/actions/store-merchant/update-role", params));
	}
};
var StoresResource = class {
	constructor(http) {
		this.http = http;
	}
	/**
	* Create a new store. Slug is auto-generated from the name.
	*
	* @param params - Store creation parameters
	* @returns Created store entity
	*
	* @example
	* const { store } = await client.stores.create({ name: "My Store" });
	*/
	async create(params) {
		validateRequired("name", params.name);
		return unwrapAction(await this.http.post("/v1/actions/store/create-store", params));
	}
	/**
	* Update an existing store's settings.
	*
	* Settings objects (`notificationSettings`, `checkoutSettings`) support
	* partial updates: omitted sub-fields keep existing values, `null` clears a
	* field. Pass the entire settings object as `null` to clear all fields.
	*
	* **BREAKING (2026-05)**: the legacy `webhookSettings` parameter is removed.
	* Use `client.webhooks.add / update / remove` to manage webhook endpoints,
	* and query the configured webhook list via GraphQL `Store.storeWebhooks`.
	*
	* @param params - Fields to update (only provided fields are changed)
	* @returns Updated store entity
	*
	* @example
	* // Update name
	* const { store } = await client.stores.update({
	*   id: "STO_xxx",
	*   name: "Updated Name",
	* });
	*
	* @example
	* // Toggle a notification preference
	* const { store } = await client.stores.update({
	*   id: "STO_xxx",
	*   notificationSettings: { emailOrderConfirmation: false },
	* });
	*/
	async update(params) {
		validateShortId("id", params.id, "STO");
		return unwrapAction(await this.http.post("/v1/actions/store/update-store", params));
	}
	/**
	* Soft-delete a store. Only the owner can delete.
	*
	* @param params - Store to delete
	* @returns Deleted store entity (with `deletedAt` set)
	*
	* @example
	* const { store } = await client.stores.delete({ id: "STO_xxx" });
	*/
	async delete(params) {
		validateShortId("id", params.id, "STO");
		return unwrapAction(await this.http.post("/v1/actions/store/delete-store", params));
	}
};
var SubscriptionProductGroupsResource = class {
	constructor(http) {
		this.http = http;
	}
	/**
	* Create a subscription product group for shared-trial or plan switching.
	*
	* @param params - Group creation parameters
	* @returns Created group entity
	*
	* @example
	* const { group } = await client.subscriptionProductGroups.create({
	*   storeId: "STO_xxx",
	*   name: "Pro Plans",
	*   rules: { sharedTrial: true },
	*   productIds: ["PROD_aaa", "PROD_bbb"],
	* });
	*/
	async create(params) {
		validateShortId("storeId", params.storeId, "STO");
		validateRequired("name", params.name);
		return unwrapAction(await this.http.post("/v1/actions/subscription-product-group/create-group", params));
	}
	/**
	* Update a subscription product group. `productIds` is a full replacement.
	*
	* @param params - Group update parameters
	* @returns Updated group entity
	*
	* @example
	* const { group } = await client.subscriptionProductGroups.update({
	*   id: "GRP_xxx",
	*   productIds: ["PROD_aaa", "PROD_bbb", "PROD_ccc"],
	* });
	*/
	async update(params) {
		validateRequired("id", params.id);
		return unwrapAction(await this.http.post("/v1/actions/subscription-product-group/update-group", params));
	}
	/**
	* Hard-delete a subscription product group.
	*
	* @param params - Group to delete
	* @returns Deleted group entity
	*
	* @example
	* const { group } = await client.subscriptionProductGroups.delete({ id: "GRP_xxx" });
	*/
	async delete(params) {
		validateRequired("id", params.id);
		return unwrapAction(await this.http.post("/v1/actions/subscription-product-group/delete-group", params));
	}
	/**
	* Publish a test-environment group to production (upsert).
	*
	* @param params - Group to publish
	* @returns Published group entity
	*
	* @example
	* const { group } = await client.subscriptionProductGroups.publish({ id: "GRP_xxx" });
	*/
	async publish(params) {
		validateRequired("id", params.id);
		return unwrapAction(await this.http.post("/v1/actions/subscription-product-group/publish-group", params));
	}
};
var SubscriptionProductsResource = class {
	constructor(http) {
		this.http = http;
	}
	/**
	* Create a subscription product with billing period and multi-currency pricing.
	*
	* @param params - Product creation parameters
	* @returns Created product detail
	*
	* @example
	* const { product } = await client.subscriptionProducts.create({
	*   storeId: "STO_xxx",
	*   name: "Pro Plan",
	*   billingPeriod: "monthly",
	*   prices: { USD: { amount: "9.99", taxCategory: "saas" } },
	* });
	*/
	async create(params) {
		validateShortId("storeId", params.storeId, "STO");
		validateRequired("name", params.name);
		validateEnum("billingPeriod", params.billingPeriod, [
			"weekly",
			"monthly",
			"quarterly",
			"yearly"
		]);
		validatePrices("prices", params.prices);
		return unwrapAction(await this.http.post("/v1/actions/subscription-product/create-product", params));
	}
	/**
	* Update a subscription product. Creates a new version; skips if unchanged.
	*
	* @param params - Product update parameters (only `id` is required)
	* @returns Updated product detail
	*
	* @example
	* // Update only the name
	* const { product } = await client.subscriptionProducts.update({
	*   id: "PROD_xxx",
	*   name: "Pro Plan v2",
	* });
	*
	* @example
	* // Update prices and billing period
	* const { product } = await client.subscriptionProducts.update({
	*   id: "PROD_xxx",
	*   billingPeriod: "yearly",
	*   prices: { USD: { amount: "99.00", taxCategory: "saas" } },
	* });
	*/
	async update(params) {
		validateShortId("id", params.id, "PROD");
		if (params.name !== void 0) validateRequired("name", params.name);
		if (params.billingPeriod !== void 0) validateEnum("billingPeriod", params.billingPeriod, [
			"weekly",
			"monthly",
			"quarterly",
			"yearly"
		]);
		if (params.prices) validatePrices("prices", params.prices);
		return unwrapAction(await this.http.post("/v1/actions/subscription-product/update-product", params));
	}
	/**
	* Publish a subscription product's test version to production.
	*
	* @param params - Product to publish
	* @returns Published product detail
	*
	* @example
	* const { product } = await client.subscriptionProducts.publish({ id: "PROD_xxx" });
	*/
	async publish(params) {
		validateShortId("id", params.id, "PROD");
		return unwrapAction(await this.http.post("/v1/actions/subscription-product/publish-product", params));
	}
	/**
	* Update a subscription product's status (active/inactive).
	*
	* @param params - Status update parameters
	* @returns Updated product detail
	*
	* @example
	* const { product } = await client.subscriptionProducts.updateStatus({
	*   id: "PROD_xxx",
	*   status: ProductVersionStatus.Active,
	* });
	*/
	async updateStatus(params) {
		validateShortId("id", params.id, "PROD");
		validateEnum("status", params.status, ["active", "inactive"]);
		return unwrapAction(await this.http.post("/v1/actions/subscription-product/update-status", params));
	}
};
var DEFAULT_TOLERANCE_MS = 2700 * 1e3;
var DEFAULT_FUTURE_TOLERANCE_MS = 60 * 1e3;
var TEST_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxnmRY6yMMA3lVqmAU6ZG
b1sjL/+r/z6E+ZjkXaDAKiqOhk9rpazni0bNsGXwmftTPk9jy2wn+j6JHODD/WH/
SCnSfvKkLIjy4Hk7BuCgB174C0ydan7J+KgXLkOwgCAxxB68t2tezldwo74ZpXgn
F49opzMvQ9prEwIAWOE+kV9iK6gx/AckSMtHIHpUesoPDkldpmFHlB2qpf1vsFTZ
5kD6DmGl+2GIVK01aChy2lk8pLv0yUMu18v44sLkO5M44TkGPJD9qG09wrvVG2wp
OTVCn1n5pP8P+HRLcgzbUB3OlZVfdFurn6EZwtyL4ZD9kdkQ4EZE/9inKcp3c1h4
xwIDAQAB
-----END PUBLIC KEY-----`;
var PROD_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAz+xApdTIb4ua+DgZKQ54
iBsD82ybyhGCLRETONW4Jgbb3A8DUM1LqBk6r/CmTOCHqLalTQHNigvP3R5zkDNX
iRJz6gA4MJ/+8K0+mnEE2RISQzN+Qu65TNd6svb+INm/kMaftY4uIXr6y6kchtTJ
dwnQhcKdAL2v7h7IFnkVelQsKxDdb2PqX8xX/qwd01iXvMcpCCaXovUwZsxH2QN5
ZKBTseJivbhUeyJCco4fdUyxOMHe2ybCVhyvim2uxAl1nkvL5L8RCWMCAV55LLo0
9OhmLahz/DYNu13YLVP6dvIT09ZFBYU6Owj1NxdinTynlJCFS9VYwBgmftosSE1U
dwIDAQAB
-----END PUBLIC KEY-----`;
function parseSignatureHeader(header) {
	let t = "";
	let v1 = "";
	for (const pair of header.split(",")) {
		const eqIdx = pair.indexOf("=");
		if (eqIdx === -1) continue;
		const key = pair.slice(0, eqIdx).trim();
		const value = pair.slice(eqIdx + 1).trim();
		if (key === "t") t = value;
		else if (key === "v1") v1 = value;
	}
	return {
		t,
		v1
	};
}
function rsaVerify(signatureInput, v1, publicKey) {
	const verifier = createVerify("RSA-SHA256");
	verifier.update(signatureInput);
	return verifier.verify(publicKey, v1, "base64");
}
function resolveKeyForEnv(env, configKeys) {
	if (typeof configKeys === "string") return normalizePublicKey(configKeys);
	if (configKeys?.[env]) return normalizePublicKey(configKeys[env]);
	const envSpecific = env === "test" ? process.env.WAFFO_WEBHOOK_TEST_PUBLIC_KEY : process.env.WAFFO_WEBHOOK_PROD_PUBLIC_KEY;
	if (envSpecific) return normalizePublicKey(envSpecific);
	const generic = process.env.WAFFO_WEBHOOK_PUBLIC_KEY;
	if (generic) return normalizePublicKey(generic);
	return env === "test" ? TEST_PUBLIC_KEY : PROD_PUBLIC_KEY;
}
function verifyWebhook(payload, signatureHeader, options) {
	if (!signatureHeader) throw new Error("Missing X-Waffo-Signature header");
	const { t, v1 } = parseSignatureHeader(signatureHeader);
	if (!t || !v1) throw new Error("Malformed X-Waffo-Signature header: missing t or v1");
	const toleranceMs = options?.toleranceMs ?? DEFAULT_TOLERANCE_MS;
	if (toleranceMs > 0) {
		const timestampMs = Number(t);
		if (Number.isNaN(timestampMs)) throw new Error("Invalid timestamp in X-Waffo-Signature header");
		const futureToleranceMs = options?.futureToleranceMs ?? DEFAULT_FUTURE_TOLERANCE_MS;
		const ageMs = Date.now() - timestampMs;
		if (ageMs > toleranceMs || ageMs < -futureToleranceMs) throw new Error("Webhook timestamp outside tolerance window (possible replay attack)");
	}
	const signatureInput = `${t}.${payload}`;
	const directKey = options?.publicKey;
	if (directKey) {
		if (!rsaVerify(signatureInput, v1, normalizePublicKey(directKey))) throw new Error("Invalid webhook signature (custom key)");
	} else {
		const configKeys = options?.publicKeys;
		const env = options?.environment;
		if (env === "test" || env === "prod") {
			if (!rsaVerify(signatureInput, v1, resolveKeyForEnv(env, configKeys))) throw new Error(`Invalid webhook signature (${env} key)`);
		} else if (!rsaVerify(signatureInput, v1, resolveKeyForEnv("prod", configKeys))) {
			if (!rsaVerify(signatureInput, v1, resolveKeyForEnv("test", configKeys))) throw new Error("Invalid webhook signature (tried both prod and test keys)");
		}
	}
	return JSON.parse(payload);
}
var WebhooksResource = class {
	/**
	* @param http - HTTP client (used for add/update/remove)
	* @param publicKeys - Optional config-level public key(s) from WaffoPancakeConfig
	*/
	constructor(http, publicKeys) {
		this.http = http;
		this.publicKeys = publicKeys;
	}
	/**
	* Add a webhook endpoint to a store.
	*
	* @param params - Webhook configuration
	* @returns Created webhook entity
	*
	* @example
	* // HTTP webhook (RSA-signed envelope, default)
	* const { webhook } = await client.webhooks.add({
	*   storeId: "STO_xxx",
	*   channel: "http",
	*   url: "https://example.com/webhook",
	*   events: ["order.completed", "refund.succeeded"],
	*   testMode: false,
	* });
	*
	* @example
	* // Discord webhook (uses Discord embed format)
	* await client.webhooks.add({
	*   storeId: "STO_xxx",
	*   channel: "discord",
	*   url: "https://discord.com/api/webhooks/...",
	*   events: ["order.completed"],
	*   testMode: false,
	* });
	*
	* @example
	* // Telegram bot — chat_id goes in `secret`; URL is the bot's sendMessage endpoint
	* await client.webhooks.add({
	*   storeId: "STO_xxx",
	*   channel: "telegram",
	*   url: "https://api.telegram.org/bot123:ABC/sendMessage",
	*   events: ["order.completed"],
	*   testMode: false,
	*   secret: "8737101383",
	* });
	*/
	async add(params) {
		validateShortId("storeId", params.storeId, "STO");
		validateRequired("channel", params.channel);
		validateRequired("url", params.url);
		return unwrapAction(await this.http.post("/v1/actions/store/add-webhook", params));
	}
	/**
	* Update an existing webhook (only `url`, `events`, and `secret` are mutable).
	*
	* `channel` and `testMode` cannot be changed — remove the webhook and
	* re-add it instead. URL changes must remain on the same channel host
	* whitelist.
	*
	* @param params - Fields to update
	* @returns Updated webhook entity
	*
	* @example
	* await client.webhooks.update({
	*   id: "11111111-2222-3333-4444-555555555555",
	*   events: ["order.completed", "refund.succeeded", "subscription.canceled"],
	* });
	*/
	async update(params) {
		validateRequired("id", params.id);
		return unwrapAction(await this.http.post("/v1/actions/store/update-webhook", params));
	}
	/**
	* Hard-delete a webhook. Historical `webhook_deliveries` rows are retained
	* (with `storeWebhookId` set to null) for audit purposes.
	*
	* @param params - Webhook to remove
	* @returns The removed webhook entity (snapshot before deletion)
	*
	* @example
	* await client.webhooks.remove({ id: "11111111-..." });
	*/
	async remove(params) {
		validateRequired("id", params.id);
		return unwrapAction(await this.http.post("/v1/actions/store/remove-webhook", params));
	}
	/**
	* Verify and parse an incoming webhook event.
	*
	* Key resolution order:
	* 1. `options.publicKey` — per-call override (highest priority)
	* 2. `config.webhookPublicKey[env]` or `config.webhookPublicKey` (string)
	* 3. `WAFFO_WEBHOOK_{TEST|PROD}_PUBLIC_KEY` environment variable
	* 4. `WAFFO_WEBHOOK_PUBLIC_KEY` environment variable
	* 5. Built-in hardcoded key
	*
	* @param payload - Raw request body string (must be unparsed)
	* @param signatureHeader - Value of the `X-Waffo-Signature` header
	* @param options - Verification options (optional)
	* @returns Parsed webhook event
	* @throws Error if signature is invalid, header is malformed, or timestamp is stale
	*
	* @example
	* const event = client.webhooks.verify(rawBody, signatureHeader);
	*
	* @example
	* // Specify environment
	* const event = client.webhooks.verify(rawBody, sig, { environment: "test" });
	*
	* @example
	* // Per-call key override
	* const event = client.webhooks.verify(rawBody, sig, { publicKey: oneOffKey });
	*/
	verify(payload, signatureHeader, options) {
		return verifyWebhook(payload, signatureHeader, {
			...options,
			publicKeys: options?.publicKeys ?? this.publicKeys
		});
	}
};
var WaffoPancake = class {
	http;
	config;
	auth;
	stores;
	storeMerchants;
	onetimeProducts;
	subscriptionProducts;
	subscriptionProductGroups;
	orders;
	checkout;
	graphql;
	webhooks;
	contentSafety;
	constructor(config) {
		validateShortId("merchantId", config.merchantId, "MER");
		this.config = config;
		this.http = new HttpClient(config);
		this.auth = new AuthResource(this.http);
		this.stores = new StoresResource(this.http);
		this.storeMerchants = new StoreMerchantsResource(this.http);
		this.onetimeProducts = new OnetimeProductsResource(this.http);
		this.subscriptionProducts = new SubscriptionProductsResource(this.http);
		this.subscriptionProductGroups = new SubscriptionProductGroupsResource(this.http);
		this.orders = new OrdersResource(this.http);
		this.checkout = new CheckoutResource(this.http);
		this.graphql = new GraphQLResource(this.http);
		this.webhooks = new WebhooksResource(this.http, config.webhookPublicKey);
		this.contentSafety = new ContentSafetyResource(this.http);
	}
	/**
	* Create a customer session for self-service operations.
	*
	* The returned session uses Bearer token authentication and provides
	* methods for order cancellation, subscription management, refund tickets,
	* and scoped GraphQL queries.
	*
	* Session tokens expire 5 minutes after issuance, so issue one right before
	* use rather than caching it.
	*
	* @param token - Session token from `client.auth.issueSessionToken()`
	* @param options - Per-session overrides
	* @returns A customer session with self-service methods
	* @throws {WaffoPancakeError} When no environment is available from either
	*   `options.environment` or `WaffoPancakeConfig.environment`
	*
	* @example
	* const { token } = await client.auth.issueSessionToken({
	*   storeId: "STO_xxx",
	*   buyerIdentity: "customer@example.com",
	* });
	* const customer = client.customer(token, { environment: "test" });
	* await customer.cancelSubscription({ orderId: "ORD_xxx" });
	*
	* @example
	* // Set the environment once on the client instead
	* const client = new WaffoPancake({ merchantId, privateKey, environment: "test" });
	* const customer = client.customer(token);
	*/
	customer(token, options) {
		const environment = options?.environment ?? this.config.environment;
		if (environment === void 0) throw new WaffoPancakeError(400, [{
			message: "Missing required field: environment — set it on the client config or pass client.customer(token, { environment: 'test' | 'prod' })",
			layer: "sdk"
		}]);
		validateEnum("environment", environment, ["test", "prod"]);
		return new CustomerSession(new CustomerHttpClient(token, environment, {
			baseUrl: this.config.baseUrl,
			fetch: this.config.fetch
		}));
	}
	/**
	* Create a customer session for self-service operations.
	*
	* @param token - Session token from `client.auth.issueSessionToken()`
	* @param options - Per-session overrides
	* @returns A customer session with self-service methods
	*
	* @example
	* ```typescript
	* const session = client.buyer(token); // prefer client.customer(token)
	* ```
	*
	* @deprecated Use {@link WaffoPancake.customer} instead.
	*/
	buyer(token, options) {
		return this.customer(token, options);
	}
};
var Environment = /* @__PURE__ */ ((Environment2) => {
	Environment2["Test"] = "test";
	Environment2["Prod"] = "prod";
	return Environment2;
})(Environment || {});
var TaxCategory = /* @__PURE__ */ ((TaxCategory2) => {
	TaxCategory2["DigitalGoods"] = "digital_goods";
	TaxCategory2["SaaS"] = "saas";
	TaxCategory2["Software"] = "software";
	TaxCategory2["Ebook"] = "ebook";
	TaxCategory2["OnlineCourse"] = "online_course";
	TaxCategory2["Consulting"] = "consulting";
	TaxCategory2["ProfessionalService"] = "professional_service";
	return TaxCategory2;
})(TaxCategory || {});
var WebhookEventType = /* @__PURE__ */ ((WebhookEventType2) => {
	WebhookEventType2["OrderCompleted"] = "order.completed";
	WebhookEventType2["SubscriptionActivated"] = "subscription.activated";
	WebhookEventType2["SubscriptionPaymentSucceeded"] = "subscription.payment_succeeded";
	WebhookEventType2["SubscriptionCanceling"] = "subscription.canceling";
	WebhookEventType2["SubscriptionUncanceled"] = "subscription.uncanceled";
	WebhookEventType2["SubscriptionUpdated"] = "subscription.updated";
	WebhookEventType2["SubscriptionCanceled"] = "subscription.canceled";
	WebhookEventType2["SubscriptionPastDue"] = "subscription.past_due";
	WebhookEventType2["RefundSucceeded"] = "refund.succeeded";
	WebhookEventType2["RefundFailed"] = "refund.failed";
	return WebhookEventType2;
})(WebhookEventType || {});
//#endregion
export { verifyWebhook as a, WebhookEventType as i, TaxCategory as n, WaffoPancake as r, Environment as t };
