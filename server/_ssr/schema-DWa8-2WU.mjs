import { t as createClient } from "../_libs/@libsql/client+[...].mjs";
import { n as __exportAll } from "./chunk-EAsCxrDo.mjs";
import { D as sql, a as index, c as integer, i as drizzle, n as drizzle$2, o as sqliteTable, r as drizzle$1, s as text, t as drizzle$3 } from "../_libs/drizzle-orm.mjs";
import process from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/schema-DWa8-2WU.js
var metaEnv = {
	"BASE_URL": "/",
	"DEV": false,
	"MODE": "production",
	"PROD": true,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/",
	"VITE_APP_NAME": "Genjutsu AI",
	"VITE_APP_URL": "https://genjutsuai.net"
};
var procEnv = typeof process !== "undefined" && process.env ? process.env : {};
var publicEnv = (key) => metaEnv[key] ?? procEnv[key];
var envConfigs = {
	app_url: publicEnv("VITE_APP_URL") ?? "http://localhost:3000",
	app_name: publicEnv("VITE_APP_NAME") ?? "Genjutsu AI",
	app_description: publicEnv("VITE_APP_DESCRIPTION") ?? "Genjutsu AI restyles any video without changing who or what is in it — new scenes, styles, and objects while keeping the original motion.",
	app_logo: publicEnv("VITE_APP_LOGO") ?? "/logo.webp",
	app_support_email: publicEnv("VITE_APP_SUPPORT_EMAIL") ?? "support@genjutsuai.net",
	hotel_lobby_example_video_url: publicEnv("VITE_HOTEL_LOBBY_EXAMPLE_VIDEO_URL") ?? "",
	hotel_lobby_example_thumbnail_url: publicEnv("VITE_HOTEL_LOBBY_EXAMPLE_THUMBNAIL_URL") ?? "",
	hotel_lobby_example_upload_date: publicEnv("VITE_HOTEL_LOBBY_EXAMPLE_UPLOAD_DATE") ?? "",
	hotel_lobby_example_duration: publicEnv("VITE_HOTEL_LOBBY_EXAMPLE_DURATION") ?? "",
	database_url: procEnv.DATABASE_URL ?? "",
	database_auth_token: procEnv.DATABASE_AUTH_TOKEN ?? "",
	database_provider: procEnv.DATABASE_PROVIDER ?? "sqlite",
	db_schema: procEnv.DB_SCHEMA ?? "public",
	db_singleton_enabled: procEnv.DB_SINGLETON_ENABLED ?? "false",
	db_max_connections: procEnv.DB_MAX_CONNECTIONS ?? "1",
	auth_url: procEnv.AUTH_URL ?? publicEnv("VITE_APP_URL") ?? "",
	auth_secret: procEnv.AUTH_SECRET ?? "",
	stripe_secret_key: procEnv.STRIPE_SECRET_KEY ?? "",
	stripe_publishable_key: procEnv.STRIPE_PUBLISHABLE_KEY ?? "",
	stripe_signing_secret: procEnv.STRIPE_SIGNING_SECRET ?? "",
	waffo_enabled: procEnv.WAFFO_ENABLED ?? "",
	waffo_merchant_id: procEnv.WAFFO_MERCHANT_ID ?? "",
	waffo_private_key: procEnv.WAFFO_PRIVATE_KEY ?? "",
	waffo_store_id: procEnv.WAFFO_STORE_ID ?? "",
	waffo_environment: procEnv.WAFFO_ENVIRONMENT ?? "test",
	waffo_product_ids_mapping: procEnv.WAFFO_PRODUCT_IDS_MAPPING ?? "",
	default_payment_provider: procEnv.DEFAULT_PAYMENT_PROVIDER ?? "",
	paypal_client_id: procEnv.PAYPAL_CLIENT_ID ?? "",
	paypal_client_secret: procEnv.PAYPAL_CLIENT_SECRET ?? "",
	paypal_webhook_id: procEnv.PAYPAL_WEBHOOK_ID ?? "",
	paypal_environment: procEnv.PAYPAL_ENVIRONMENT ?? "production",
	alipay_app_id: procEnv.ALIPAY_APP_ID ?? "",
	alipay_private_key: procEnv.ALIPAY_PRIVATE_KEY ?? "",
	alipay_public_key: procEnv.ALIPAY_PUBLIC_KEY ?? "",
	alipay_notify_url: procEnv.ALIPAY_NOTIFY_URL ?? "",
	wechat_app_id: procEnv.WECHAT_APP_ID ?? "",
	wechat_mch_id: procEnv.WECHAT_MCH_ID ?? "",
	wechat_api_v3_key: procEnv.WECHAT_API_V3_KEY ?? "",
	wechat_private_key: procEnv.WECHAT_PRIVATE_KEY ?? "",
	wechat_serial_no: procEnv.WECHAT_SERIAL_NO ?? "",
	wechat_notify_url: procEnv.WECHAT_NOTIFY_URL ?? "",
	wechat_platform_cert: procEnv.WECHAT_PLATFORM_CERT ?? "",
	resend_api_key: procEnv.RESEND_API_KEY ?? "",
	resend_sender_email: procEnv.RESEND_SENDER_EMAIL ?? procEnv.RESEND_EMAIL_FROM ?? "",
	storage_endpoint: procEnv.STORAGE_ENDPOINT ?? "",
	storage_region: procEnv.STORAGE_REGION ?? "auto",
	storage_access_key: procEnv.STORAGE_ACCESS_KEY ?? "",
	storage_secret_key: procEnv.STORAGE_SECRET_KEY ?? "",
	storage_bucket: procEnv.STORAGE_BUCKET ?? "",
	storage_public_domain: procEnv.STORAGE_PUBLIC_DOMAIN ?? "",
	inline_image_max_kb: procEnv.INLINE_IMAGE_MAX_KB ?? "2048",
	replicate_api_token: procEnv.REPLICATE_API_TOKEN ?? "",
	fal_api_key: procEnv.FAL_KEY ?? "",
	higgsfield_api_key: procEnv.HF_API_KEY ?? procEnv.HIGGSFIELD_API_KEY ?? procEnv.HF_CREDENTIALS ?? "",
	higgsfield_api_base_url: procEnv.HF_API_BASE_URL ?? "https://api.higgsfield.ai",
	higgsfield_genjutsu_motion_model: procEnv.HIGGSFIELD_GENJUTSU_MOTION_MODEL ?? "higgsfield/genjutsu/motion-transfer/v1.0",
	higgsfield_genjutsu_object_swap_model: procEnv.HIGGSFIELD_GENJUTSU_OBJECT_SWAP_MODEL ?? "higgsfield/genjutsu/object-swap/v1.0",
	genjutsu_motion_provider: procEnv.GENJUTSU_MOTION_PROVIDER ?? "higgsfield",
	genjutsu_object_swap_provider: procEnv.GENJUTSU_OBJECT_SWAP_PROVIDER ?? "higgsfield",
	seedance_genjutsu_model: procEnv.SEEDANCE_GENJUTSU_MODEL ?? "bytedance/seedance-2.5/us/reference-to-video",
	seedance_genjutsu_generate_audio: procEnv.SEEDANCE_GENJUTSU_GENERATE_AUDIO ?? "true",
	ark_api_key: procEnv.ARK_API_KEY ?? "",
	ark_api_base_url: procEnv.ARK_API_BASE_URL ?? "https://ark.cn-beijing.volces.com/api/v3",
	seedance_volcengine_model: procEnv.SEEDANCE_VOLCENGINE_MODEL ?? "doubao-seedance-2-5-260628",
	seedance_volcengine_video_input_rate_cny_per_million_tokens: procEnv.SEEDANCE_VOLCENGINE_VIDEO_INPUT_RATE_CNY_PER_MILLION_TOKENS ?? "42",
	seedance_volcengine_cny_per_usd: procEnv.SEEDANCE_VOLCENGINE_CNY_PER_USD ?? "7",
	genjutsu_e2e_mock: procEnv.GENJUTSU_E2E_MOCK ?? "false",
	hotel_lobby_template_video_key: procEnv.HOTEL_LOBBY_TEMPLATE_VIDEO_KEY ?? "hotel-lobby/templates/default.mp4",
	zombie_hug_template_video_key: procEnv.ZOMBIE_HUG_TEMPLATE_VIDEO_KEY ?? "genjutsu/templates/zombie-hug.mp4",
	zombie_hug_template_video_key_9x16: procEnv.ZOMBIE_HUG_TEMPLATE_VIDEO_KEY_9X16 ?? "genjutsu/templates/zombie-hug-9x16.mp4",
	locale: publicEnv("VITE_DEFAULT_LOCALE") ?? "en"
};
var d1DbInstance = null;
/**
* Resolve the D1 binding named `DB` (see wrangler.jsonc `d1_databases`).
*
* On Cloudflare Workers the binding env is stashed on `globalThis.__CF_ENV__`
* by the server entry (src/server.ts, via `cloudflare:workers`). Nitro's
* cloudflare presets also expose it as `globalThis.__env__` — check both.
*/
function getD1Binding() {
	const g = globalThis;
	const binding = (g.__CF_ENV__ ?? g.__env__)?.DB;
	if (!binding) throw new Error("D1 binding \"DB\" not found. DATABASE_PROVIDER=d1 only works on Cloudflare Workers with a d1_databases binding named \"DB\" in wrangler.jsonc.");
	return binding;
}
function createD1Db() {
	if (d1DbInstance) return d1DbInstance;
	d1DbInstance = drizzle(getD1Binding());
	return d1DbInstance;
}
function unavailable() {
	throw new Error("This DB driver was stubbed out of the Cloudflare Workers build because it does not match vars.DATABASE_PROVIDER in wrangler.jsonc. Make sure DATABASE_PROVIDER there matches the database you intend to use (d1, or postgresql with a Hyperdrive binding), then rebuild.");
}
var stub = new Proxy(unavailable, {
	get: () => stub,
	apply: unavailable,
	construct: unavailable
});
var isCloudflareWorker$3 = typeof globalThis !== "undefined" && "Cloudflare" in globalThis;
var dbInstance$2 = null;
var pool = null;
function createMysqlDb(config) {
	let databaseUrl = config.database_url;
	let isHyperdrive = false;
	if (isCloudflareWorker$3) {
		const { env } = { env: {} };
		isHyperdrive = "HYPERDRIVE" in env;
		if (isHyperdrive) databaseUrl = env.HYPERDRIVE.connectionString;
	}
	if (!databaseUrl) throw new Error("DATABASE_URL is not set");
	if (isCloudflareWorker$3) return drizzle$1({ client: stub.createConnection({
		uri: databaseUrl,
		connectionLimit: 1,
		enableKeepAlive: true,
		waitForConnections: true
	}) });
	if (config.db_singleton_enabled === "true") {
		if (dbInstance$2) return dbInstance$2;
		pool = stub.createPool({
			uri: databaseUrl,
			connectionLimit: Number(config.db_max_connections) || 1,
			enableKeepAlive: true,
			waitForConnections: true
		});
		dbInstance$2 = drizzle$1({ client: pool });
		return dbInstance$2;
	}
	return drizzle$1(stub.createConnection({
		uri: databaseUrl,
		connectionLimit: 1,
		enableKeepAlive: true,
		waitForConnections: true
	}));
}
var isCloudflareWorker$2 = typeof navigator !== "undefined" && navigator.userAgent === "Cloudflare-Workers" || typeof globalThis !== "undefined" && "Cloudflare" in globalThis;
var dbInstance$1 = null;
var client = null;
function createPostgresDb(config) {
	let databaseUrl = config.database_url;
	const schemaName = (config.db_schema || "public").trim();
	const connectionSchemaOptions = schemaName && schemaName !== "public" ? { connection: { options: `-c search_path=${schemaName}` } } : {};
	if (isCloudflareWorker$2) {
		const g = globalThis;
		const hyperdrive = (g.__CF_ENV__ ?? g.__env__)?.HYPERDRIVE;
		if (hyperdrive?.connectionString) databaseUrl = hyperdrive.connectionString;
	}
	if (!databaseUrl) throw new Error("DATABASE_URL is not set");
	if (isCloudflareWorker$2) return drizzle$2(stub(databaseUrl, {
		prepare: false,
		max: 1,
		idle_timeout: 10,
		connect_timeout: 5,
		...connectionSchemaOptions
	}));
	if (config.db_singleton_enabled === "true") {
		if (dbInstance$1) return dbInstance$1;
		client = stub(databaseUrl, {
			prepare: false,
			max: Number(config.db_max_connections) || 1,
			idle_timeout: 30,
			connect_timeout: 10,
			...connectionSchemaOptions
		});
		dbInstance$1 = drizzle$2({ client });
		return dbInstance$1;
	}
	return drizzle$2({ client: stub(databaseUrl, {
		prepare: false,
		max: 1,
		idle_timeout: 20,
		connect_timeout: 10,
		...connectionSchemaOptions
	}) });
}
var isCloudflareWorker$1 = typeof globalThis !== "undefined" && "Cloudflare" in globalThis;
var sqliteDbInstance = null;
function createSqliteDb(config) {
	const databaseUrl = config.database_url;
	if (!databaseUrl) throw new Error("DATABASE_URL is not set");
	const options = {};
	if (config.database_auth_token) options.authToken = config.database_auth_token;
	if (isCloudflareWorker$1) return drizzle$3({ client: createClient({
		url: databaseUrl,
		...options
	}) });
	if (config.db_singleton_enabled === "true") {
		if (sqliteDbInstance) return sqliteDbInstance;
		sqliteDbInstance = drizzle$3({ client: createClient({
			url: databaseUrl,
			...options
		}) });
		return sqliteDbInstance;
	}
	return drizzle$3({ client: createClient({
		url: databaseUrl,
		...options
	}) });
}
var mysqlCompatProxyCache = /* @__PURE__ */ new WeakMap();
var sqliteCompatProxyCache = /* @__PURE__ */ new WeakMap();
/**
* Global fallback for Drizzle `.returning()` on dialects that don't support it (notably MySQL).
*/
function withMysqlCompat(dbInstance) {
	if (dbInstance && typeof dbInstance === "object") {
		const cached = mysqlCompatProxyCache.get(dbInstance);
		if (cached) return cached;
	}
	const wrapQuery = (query, ctx) => {
		if (!query || typeof query !== "object") return query;
		return new Proxy(query, { get(target, prop, receiver) {
			if (prop === "onConflictDoUpdate" && typeof target.onConflictDoUpdate !== "function" && typeof target.onDuplicateKeyUpdate === "function") return (cfg) => {
				return wrapQuery(target.onDuplicateKeyUpdate({ set: cfg?.set }), ctx);
			};
			if (prop === "returning" && typeof target.returning !== "function") return async (..._args) => {
				await target;
				if (ctx.payload === void 0) return [];
				return Array.isArray(ctx.payload) ? ctx.payload : [ctx.payload];
			};
			const value = Reflect.get(target, prop, receiver);
			if (typeof value !== "function") return value;
			return (...args) => {
				if (prop === "values" || prop === "set") ctx.payload = args[0];
				return wrapQuery(value.apply(target, args), ctx);
			};
		} });
	};
	const proxied = new Proxy(dbInstance, { get(target, prop, receiver) {
		if (prop === "transaction") {
			const original = Reflect.get(target, prop, receiver);
			if (typeof original !== "function") return original;
			return (fn, ...rest) => {
				return original.call(target, (tx) => fn(withMysqlCompat(tx)), ...rest);
			};
		}
		const value = Reflect.get(target, prop, receiver);
		if (typeof value !== "function") return value;
		if (prop !== "insert" && prop !== "update" && prop !== "delete") return value.bind(target);
		return (...args) => {
			return wrapQuery(value.apply(target, args), {});
		};
	} });
	if (dbInstance && typeof dbInstance === "object") mysqlCompatProxyCache.set(dbInstance, proxied);
	return proxied;
}
/**
* SQLite/Turso compatibility shim:
* - `.for(...)` polyfilled as no-op
* - D1 transaction workaround
*/
function withSqliteCompat(dbInstance, provider) {
	if (dbInstance && typeof dbInstance === "object") {
		const cached = sqliteCompatProxyCache.get(dbInstance);
		if (cached) return cached;
	}
	const wrapQuery = (query) => {
		if (!query || typeof query !== "object") return query;
		return new Proxy(query, { get(target, prop, receiver) {
			if (prop === "for" && typeof target.for !== "function") return (..._args) => receiver;
			const value = Reflect.get(target, prop, receiver);
			if (typeof value !== "function") return value;
			return (...args) => {
				return wrapQuery(value.apply(target, args));
			};
		} });
	};
	const proxied = new Proxy(dbInstance, { get(target, prop, receiver) {
		if (prop === "transaction") {
			if (provider === "d1") return (fn) => fn(proxied);
			const original = Reflect.get(target, prop, receiver);
			if (typeof original !== "function") return original;
			return (fn, ...rest) => original.call(target, (tx) => fn(withSqliteCompat(tx, provider)), ...rest);
		}
		const value = Reflect.get(target, prop, receiver);
		if (typeof value !== "function") return value;
		if (typeof prop === "string" && prop.startsWith("select")) return (...args) => wrapQuery(value.apply(target, args));
		return value.bind(target);
	} });
	if (dbInstance && typeof dbInstance === "object") sqliteCompatProxyCache.set(dbInstance, proxied);
	return proxied;
}
/**
* Universal DB accessor. Returns `any` to keep call sites stable across dialects.
*/
function createDb(config) {
	if (config.database_provider === "d1") return withSqliteCompat(createD1Db(), "d1");
	if (["sqlite", "turso"].includes(config.database_provider)) return withSqliteCompat(createSqliteDb(config), config.database_provider);
	if (config.database_provider === "mysql") return withMysqlCompat(createMysqlDb(config));
	return createPostgresDb(config);
}
var isCloudflareWorker = typeof navigator !== "undefined" && navigator.userAgent === "Cloudflare-Workers" || typeof globalThis !== "undefined" && "Cloudflare" in globalThis;
var TCP_PROVIDERS = [
	"postgresql",
	"postgres",
	"mysql"
];
var dbInstance = null;
function db() {
	if (dbInstance) return dbInstance;
	const instance = createDb({
		database_provider: envConfigs.database_provider,
		database_url: envConfigs.database_url || "file:data/local.db",
		database_auth_token: envConfigs.database_auth_token || void 0,
		db_schema: envConfigs.db_schema,
		db_singleton_enabled: envConfigs.db_singleton_enabled,
		db_max_connections: envConfigs.db_max_connections
	});
	if (!isCloudflareWorker || !TCP_PROVIDERS.includes(envConfigs.database_provider)) dbInstance = instance;
	return instance;
}
/**
* SQLite schema definitions.
*
* This is the SQLite dialect of the database schema.
* To use: set DATABASE_PROVIDER=sqlite in .env.local
*/
var schema_exports = /* @__PURE__ */ __exportAll({
	account: () => account,
	aiTask: () => aiTask,
	apikey: () => apikey,
	chat: () => chat,
	chatMessage: () => chatMessage,
	config: () => config,
	credit: () => credit,
	inviteCode: () => inviteCode,
	order: () => order,
	permission: () => permission,
	post: () => post,
	role: () => role,
	rolePermission: () => rolePermission,
	session: () => session,
	subscription: () => subscription,
	taxonomy: () => taxonomy,
	ticket: () => ticket,
	ticketMessage: () => ticketMessage,
	user: () => user,
	userInvite: () => userInvite,
	userRole: () => userRole,
	verification: () => verification
});
var table = sqliteTable;
var sqliteNowMs = sql`(cast((julianday('now') - 2440587.5)*86400000 as integer))`;
var user = table("user", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: integer("email_verified", { mode: "boolean" }).default(false).notNull(),
	image: text("image"),
	createdAt: integer("created_at", { mode: "timestamp_ms" }).default(sqliteNowMs).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp_ms" }).default(sqliteNowMs).$onUpdate(() => /* @__PURE__ */ new Date()).notNull(),
	utmSource: text("utm_source").notNull().default(""),
	ip: text("ip").notNull().default(""),
	locale: text("locale").notNull().default("")
}, (table) => [index("idx_user_name").on(table.name), index("idx_user_created_at").on(table.createdAt)]);
var session = table("session", {
	id: text("id").primaryKey(),
	expiresAt: integer("expires_at", { mode: "timestamp_ms" }).notNull(),
	token: text("token").notNull().unique(),
	createdAt: integer("created_at", { mode: "timestamp_ms" }).default(sqliteNowMs).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp_ms" }).default(sqliteNowMs).$onUpdate(() => /* @__PURE__ */ new Date()).notNull(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" })
}, (table) => [index("idx_session_user_expires").on(table.userId, table.expiresAt)]);
var account = table("account", {
	id: text("id").primaryKey(),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	idToken: text("id_token"),
	accessTokenExpiresAt: integer("access_token_expires_at", { mode: "timestamp_ms" }),
	refreshTokenExpiresAt: integer("refresh_token_expires_at", { mode: "timestamp_ms" }),
	scope: text("scope"),
	password: text("password"),
	createdAt: integer("created_at", { mode: "timestamp_ms" }).default(sqliteNowMs).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp_ms" }).default(sqliteNowMs).$onUpdate(() => /* @__PURE__ */ new Date()).notNull()
}, (table) => [index("idx_account_user_id").on(table.userId), index("idx_account_provider_account").on(table.providerId, table.accountId)]);
var verification = table("verification", {
	id: text("id").primaryKey(),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: integer("expires_at", { mode: "timestamp_ms" }).notNull(),
	createdAt: integer("created_at", { mode: "timestamp_ms" }).default(sqliteNowMs).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp_ms" }).default(sqliteNowMs).$onUpdate(() => /* @__PURE__ */ new Date()).notNull()
}, (table) => [index("idx_verification_identifier").on(table.identifier)]);
var config = table("config", {
	name: text("name").unique().notNull(),
	value: text("value")
});
var taxonomy = table("taxonomy", {
	id: text("id").primaryKey(),
	userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
	parentId: text("parent_id"),
	slug: text("slug").unique().notNull(),
	type: text("type").notNull(),
	title: text("title").notNull(),
	description: text("description"),
	image: text("image"),
	icon: text("icon"),
	status: text("status").notNull(),
	createdAt: integer("created_at", { mode: "timestamp_ms" }).default(sqliteNowMs).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp_ms" }).default(sqliteNowMs).$onUpdate(() => /* @__PURE__ */ new Date()).notNull(),
	deletedAt: integer("deleted_at", { mode: "timestamp_ms" }),
	sort: integer("sort").default(0).notNull()
}, (table) => [index("idx_taxonomy_type_status").on(table.type, table.status)]);
var post = table("post", {
	id: text("id").primaryKey(),
	userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
	parentId: text("parent_id"),
	slug: text("slug").unique().notNull(),
	type: text("type").notNull(),
	title: text("title"),
	description: text("description"),
	image: text("image"),
	content: text("content"),
	categories: text("categories"),
	tags: text("tags"),
	authorName: text("author_name"),
	authorImage: text("author_image"),
	status: text("status").notNull(),
	createdAt: integer("created_at", { mode: "timestamp_ms" }).default(sqliteNowMs).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp_ms" }).default(sqliteNowMs).$onUpdate(() => /* @__PURE__ */ new Date()).notNull(),
	deletedAt: integer("deleted_at", { mode: "timestamp_ms" }),
	sort: integer("sort").default(0).notNull()
}, (table) => [index("idx_post_type_status").on(table.type, table.status)]);
var order = table("order", {
	id: text("id").primaryKey(),
	orderNo: text("order_no").unique().notNull(),
	userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
	userEmail: text("user_email"),
	status: text("status").notNull(),
	amount: integer("amount").notNull(),
	currency: text("currency").notNull(),
	productId: text("product_id"),
	paymentType: text("payment_type"),
	paymentInterval: text("payment_interval"),
	paymentProvider: text("payment_provider").notNull(),
	paymentSessionId: text("payment_session_id"),
	checkoutInfo: text("checkout_info").notNull(),
	checkoutResult: text("checkout_result"),
	paymentResult: text("payment_result"),
	discountCode: text("discount_code"),
	discountAmount: integer("discount_amount"),
	discountCurrency: text("discount_currency"),
	paymentEmail: text("payment_email"),
	paymentAmount: integer("payment_amount"),
	paymentCurrency: text("payment_currency"),
	paidAt: integer("paid_at", { mode: "timestamp_ms" }),
	createdAt: integer("created_at", { mode: "timestamp_ms" }).default(sqliteNowMs).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp_ms" }).default(sqliteNowMs).$onUpdate(() => /* @__PURE__ */ new Date()).notNull(),
	deletedAt: integer("deleted_at", { mode: "timestamp_ms" }),
	description: text("description"),
	productName: text("product_name"),
	subscriptionId: text("subscription_id"),
	subscriptionResult: text("subscription_result"),
	checkoutUrl: text("checkout_url"),
	callbackUrl: text("callback_url"),
	creditsAmount: integer("credits_amount"),
	creditsValidDays: integer("credits_valid_days"),
	planName: text("plan_name"),
	paymentProductId: text("payment_product_id"),
	invoiceId: text("invoice_id"),
	invoiceUrl: text("invoice_url"),
	subscriptionNo: text("subscription_no"),
	transactionId: text("transaction_id"),
	paymentUserName: text("payment_user_name"),
	paymentUserId: text("payment_user_id")
}, (table) => [
	index("idx_order_user_status_payment_type").on(table.userId, table.status, table.paymentType),
	index("idx_order_transaction_provider").on(table.transactionId, table.paymentProvider),
	index("idx_order_created_at").on(table.createdAt)
]);
var subscription = table("subscription", {
	id: text("id").primaryKey(),
	subscriptionNo: text("subscription_no").unique().notNull(),
	userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
	userEmail: text("user_email"),
	status: text("status").notNull(),
	paymentProvider: text("payment_provider").notNull(),
	subscriptionId: text("subscription_id").notNull(),
	subscriptionResult: text("subscription_result"),
	productId: text("product_id"),
	description: text("description"),
	amount: integer("amount"),
	currency: text("currency"),
	interval: text("interval"),
	intervalCount: integer("interval_count"),
	trialPeriodDays: integer("trial_period_days"),
	currentPeriodStart: integer("current_period_start", { mode: "timestamp_ms" }),
	currentPeriodEnd: integer("current_period_end", { mode: "timestamp_ms" }),
	createdAt: integer("created_at", { mode: "timestamp_ms" }).default(sqliteNowMs).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp_ms" }).default(sqliteNowMs).$onUpdate(() => /* @__PURE__ */ new Date()).notNull(),
	deletedAt: integer("deleted_at", { mode: "timestamp_ms" }),
	planName: text("plan_name"),
	billingUrl: text("billing_url"),
	productName: text("product_name"),
	creditsAmount: integer("credits_amount"),
	creditsValidDays: integer("credits_valid_days"),
	paymentProductId: text("payment_product_id"),
	paymentUserId: text("payment_user_id"),
	canceledAt: integer("canceled_at", { mode: "timestamp_ms" }),
	canceledEndAt: integer("canceled_end_at", { mode: "timestamp_ms" }),
	canceledReason: text("canceled_reason"),
	canceledReasonType: text("canceled_reason_type")
}, (table) => [
	index("idx_subscription_user_status_interval").on(table.userId, table.status, table.interval),
	index("idx_subscription_provider_id").on(table.subscriptionId, table.paymentProvider),
	index("idx_subscription_created_at").on(table.createdAt)
]);
var credit = table("credit", {
	id: text("id").primaryKey(),
	userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
	userEmail: text("user_email"),
	orderNo: text("order_no"),
	subscriptionNo: text("subscription_no"),
	transactionNo: text("transaction_no").unique().notNull(),
	transactionType: text("transaction_type").notNull(),
	transactionScene: text("transaction_scene"),
	credits: integer("credits").notNull(),
	remainingCredits: integer("remaining_credits").notNull().default(0),
	description: text("description"),
	expiresAt: integer("expires_at", { mode: "timestamp_ms" }),
	status: text("status").notNull(),
	createdAt: integer("created_at", { mode: "timestamp_ms" }).default(sqliteNowMs).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp_ms" }).default(sqliteNowMs).$onUpdate(() => /* @__PURE__ */ new Date()).notNull(),
	deletedAt: integer("deleted_at", { mode: "timestamp_ms" }),
	consumedDetail: text("consumed_detail"),
	metadata: text("metadata")
}, (table) => [
	index("idx_credit_consume_fifo").on(table.userId, table.status, table.transactionType, table.remainingCredits, table.expiresAt),
	index("idx_credit_order_no").on(table.orderNo),
	index("idx_credit_subscription_no").on(table.subscriptionNo)
]);
var apikey = table("apikey", {
	id: text("id").primaryKey(),
	userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
	keyHash: text("key_hash").notNull(),
	keyPrefix: text("key_prefix").notNull(),
	key: text("key"),
	title: text("title").notNull(),
	status: text("status").notNull(),
	lastUsedAt: integer("last_used_at", { mode: "timestamp_ms" }),
	createdAt: integer("created_at", { mode: "timestamp_ms" }).default(sqliteNowMs).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp_ms" }).default(sqliteNowMs).$onUpdate(() => /* @__PURE__ */ new Date()).notNull(),
	deletedAt: integer("deleted_at", { mode: "timestamp_ms" })
}, (table) => [index("idx_apikey_user_status").on(table.userId, table.status), index("idx_apikey_keyhash_status").on(table.keyHash, table.status)]);
var role = table("role", {
	id: text("id").primaryKey(),
	name: text("name").notNull().unique(),
	title: text("title").notNull(),
	description: text("description"),
	status: text("status").notNull(),
	createdAt: integer("created_at", { mode: "timestamp_ms" }).default(sqliteNowMs).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp_ms" }).default(sqliteNowMs).$onUpdate(() => /* @__PURE__ */ new Date()).notNull(),
	sort: integer("sort").default(0).notNull()
}, (table) => [index("idx_role_status").on(table.status)]);
var permission = table("permission", {
	id: text("id").primaryKey(),
	code: text("code").notNull().unique(),
	resource: text("resource").notNull(),
	action: text("action").notNull(),
	title: text("title").notNull(),
	description: text("description"),
	createdAt: integer("created_at", { mode: "timestamp_ms" }).default(sqliteNowMs).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp_ms" }).default(sqliteNowMs).$onUpdate(() => /* @__PURE__ */ new Date()).notNull()
}, (table) => [index("idx_permission_resource_action").on(table.resource, table.action)]);
var rolePermission = table("role_permission", {
	id: text("id").primaryKey(),
	roleId: text("role_id").notNull().references(() => role.id, { onDelete: "cascade" }),
	permissionId: text("permission_id").notNull().references(() => permission.id, { onDelete: "cascade" }),
	createdAt: integer("created_at", { mode: "timestamp_ms" }).default(sqliteNowMs).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp_ms" }).default(sqliteNowMs).$onUpdate(() => /* @__PURE__ */ new Date()).notNull(),
	deletedAt: integer("deleted_at", { mode: "timestamp_ms" })
}, (table) => [index("idx_role_permission_role_permission").on(table.roleId, table.permissionId)]);
var userRole = table("user_role", {
	id: text("id").primaryKey(),
	userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
	roleId: text("role_id").notNull().references(() => role.id, { onDelete: "cascade" }),
	createdAt: integer("created_at", { mode: "timestamp_ms" }).default(sqliteNowMs).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp_ms" }).default(sqliteNowMs).$onUpdate(() => /* @__PURE__ */ new Date()).notNull(),
	expiresAt: integer("expires_at", { mode: "timestamp_ms" })
}, (table) => [index("idx_user_role_user_expires").on(table.userId, table.expiresAt)]);
var aiTask = table("ai_task", {
	id: text("id").primaryKey(),
	userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
	mediaType: text("media_type").notNull(),
	provider: text("provider").notNull(),
	model: text("model").notNull(),
	prompt: text("prompt").notNull(),
	options: text("options"),
	status: text("status").notNull(),
	createdAt: integer("created_at", { mode: "timestamp_ms" }).default(sqliteNowMs).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp_ms" }).default(sqliteNowMs).$onUpdate(() => /* @__PURE__ */ new Date()).notNull(),
	deletedAt: integer("deleted_at", { mode: "timestamp_ms" }),
	taskId: text("task_id"),
	taskInfo: text("task_info"),
	taskResult: text("task_result"),
	costCredits: integer("cost_credits").notNull().default(0),
	scene: text("scene").notNull().default(""),
	creditId: text("credit_id")
}, (table) => [index("idx_ai_task_user_media_type").on(table.userId, table.mediaType), index("idx_ai_task_media_type_status").on(table.mediaType, table.status)]);
var chat = table("chat", {
	id: text("id").primaryKey(),
	userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
	status: text("status").notNull(),
	createdAt: integer("created_at", { mode: "timestamp_ms" }).default(sqliteNowMs).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp_ms" }).default(sqliteNowMs).$onUpdate(() => /* @__PURE__ */ new Date()).notNull(),
	model: text("model").notNull(),
	provider: text("provider").notNull(),
	title: text("title").notNull().default(""),
	parts: text("parts").notNull(),
	metadata: text("metadata"),
	content: text("content")
}, (table) => [index("idx_chat_user_status").on(table.userId, table.status)]);
var chatMessage = table("chat_message", {
	id: text("id").primaryKey(),
	userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
	chatId: text("chat_id").notNull().references(() => chat.id, { onDelete: "cascade" }),
	status: text("status").notNull(),
	createdAt: integer("created_at", { mode: "timestamp_ms" }).default(sqliteNowMs).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp_ms" }).default(sqliteNowMs).$onUpdate(() => /* @__PURE__ */ new Date()).notNull(),
	role: text("role").notNull(),
	parts: text("parts").notNull(),
	metadata: text("metadata"),
	model: text("model").notNull(),
	provider: text("provider").notNull()
}, (table) => [index("idx_chat_message_chat_id").on(table.chatId, table.status), index("idx_chat_message_user_id").on(table.userId, table.status)]);
var ticket = table("ticket", {
	id: text("id").primaryKey(),
	userId: text("user_id").notNull().references(() => user.id),
	title: text("title").notNull(),
	status: text("status").notNull().default("open"),
	createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => /* @__PURE__ */ new Date()),
	updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => /* @__PURE__ */ new Date())
}, (t) => [index("idx_ticket_user").on(t.userId), index("idx_ticket_status").on(t.status)]);
var ticketMessage = table("ticket_message", {
	id: text("id").primaryKey(),
	ticketId: text("ticket_id").notNull().references(() => ticket.id),
	userId: text("user_id").notNull().references(() => user.id),
	role: text("role").notNull().default("user"),
	content: text("content").notNull(),
	attachments: text("attachments").notNull().default("[]"),
	createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => /* @__PURE__ */ new Date())
}, (t) => [index("idx_ticket_message_ticket").on(t.ticketId)]);
var inviteCode = table("invite_code", {
	id: text("id").primaryKey(),
	code: text("code").notNull().unique(),
	maxUses: integer("max_uses").notNull().default(1),
	usedCount: integer("used_count").notNull().default(0),
	trialDays: integer("trial_days").notNull().default(15),
	note: text("note").default(""),
	createdBy: text("created_by").references(() => user.id),
	expiresAt: integer("expires_at", { mode: "timestamp" }),
	createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => /* @__PURE__ */ new Date())
}, (t) => [index("idx_invite_code_code").on(t.code)]);
var userInvite = table("user_invite", {
	id: text("id").primaryKey(),
	userId: text("user_id").notNull().references(() => user.id),
	inviteCodeId: text("invite_code_id").notNull().references(() => inviteCode.id),
	activatedAt: integer("activated_at", { mode: "timestamp" }).notNull().$defaultFn(() => /* @__PURE__ */ new Date()),
	trialEndsAt: integer("trial_ends_at", { mode: "timestamp" }).notNull()
}, (t) => [index("idx_user_invite_user").on(t.userId), index("idx_user_invite_code").on(t.inviteCodeId)]);
//#endregion
export { ticketMessage as _, db as a, userRole as b, order as c, role as d, rolePermission as f, ticket as g, taxonomy as h, credit as i, permission as l, subscription as m, apikey as n, envConfigs as o, schema_exports as p, config as r, inviteCode as s, aiTask as t, post as u, user as v, userInvite as y };
