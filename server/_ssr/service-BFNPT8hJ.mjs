import { n as __exportAll } from "./chunk-EAsCxrDo.mjs";
import { m as eq } from "../_libs/drizzle-orm.mjs";
import { a as db, o as envConfigs, r as config } from "./schema-DWa8-2WU.mjs";
import process from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/service-BFNPT8hJ.js
/**
* AES-256-GCM encryption for secrets stored in the database (admin settings).
*
* Built on Web Crypto (crypto.subtle) — works natively on Node 18+, Cloudflare
* Workers, and Edge runtimes with no nodejs_compat requirements.
*
* Encrypted values are self-describing: `enc:v1:<base64(iv | authTag | ciphertext)>`.
* Plain values (no prefix) pass through decryptSecret unchanged, so legacy
* plaintext rows keep working and get encrypted on their next save.
*
* Key source: CONFIG_ENCRYPTION_KEY env var. When unset, encryption is
* disabled entirely — values are stored as plaintext (the original behavior).
* Already-encrypted rows still decrypt as long as the key stays configured.
*
* This protects against database-only compromise (leaked backups, SQL
* injection dumps). It does NOT protect against a compromised app server —
* the key lives in env on the same machine.
*/
var ENC_PREFIX = "enc:v1:";
var IV_LENGTH = 12;
var TAG_LENGTH = 16;
function toBase64(bytes) {
	let bin = "";
	for (const b of bytes) bin += String.fromCharCode(b);
	return btoa(bin);
}
function fromBase64(value) {
	const bin = atob(value);
	const out = new Uint8Array(bin.length);
	for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
	return out;
}
async function deriveKey(secret) {
	const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(secret));
	return crypto.subtle.importKey("raw", hash, "AES-GCM", false, ["encrypt", "decrypt"]);
}
function getEncryptionSecret() {
	return process.env.CONFIG_ENCRYPTION_KEY || void 0;
}
function isEncryptedSecret(value) {
	return value.startsWith(ENC_PREFIX);
}
/**
* Encrypt a secret for storage. Returns the value unchanged (plaintext) when
* it's empty, already encrypted, or CONFIG_ENCRYPTION_KEY is not configured.
*/
async function encryptSecret(plain) {
	if (!plain || isEncryptedSecret(plain)) return plain;
	const secret = getEncryptionSecret();
	if (!secret) return plain;
	const key = await deriveKey(secret);
	const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
	const sealed = new Uint8Array(await crypto.subtle.encrypt({
		name: "AES-GCM",
		iv
	}, key, new TextEncoder().encode(plain)));
	const ciphertext = sealed.subarray(0, sealed.length - TAG_LENGTH);
	const tag = sealed.subarray(sealed.length - TAG_LENGTH);
	const packed = new Uint8Array(28 + ciphertext.length);
	packed.set(iv, 0);
	packed.set(tag, IV_LENGTH);
	packed.set(ciphertext, 28);
	return ENC_PREFIX + toBase64(packed);
}
/**
* Decrypt a stored value. Plain (non-prefixed) values pass through unchanged.
* Returns null when the value is encrypted but cannot be decrypted
* (wrong/rotated/missing CONFIG_ENCRYPTION_KEY) — callers should skip such values.
*/
async function decryptSecret(value) {
	if (!isEncryptedSecret(value)) return value;
	const secret = getEncryptionSecret();
	if (!secret) return null;
	try {
		const packed = fromBase64(value.slice(7));
		if (packed.length <= 28) return null;
		const iv = packed.subarray(0, IV_LENGTH);
		const tag = packed.subarray(IV_LENGTH, 28);
		const ciphertext = packed.subarray(28);
		const sealed = new Uint8Array(ciphertext.length + TAG_LENGTH);
		sealed.set(ciphertext, 0);
		sealed.set(tag, ciphertext.length);
		const key = await deriveKey(secret);
		const plain = await crypto.subtle.decrypt({
			name: "AES-GCM",
			iv
		}, key, sealed);
		return new TextDecoder().decode(plain);
	} catch {
		return null;
	}
}
function getSettingTabs() {
	return [
		{
			name: "general",
			title: "General"
		},
		{
			name: "auth",
			title: "Auth"
		},
		{
			name: "payment",
			title: "Payment"
		},
		{
			name: "email",
			title: "Email"
		},
		{
			name: "storage",
			title: "Storage"
		},
		{
			name: "ai",
			title: "AI"
		},
		{
			name: "analytics",
			title: "Analytics"
		},
		{
			name: "ads",
			title: "Ads"
		},
		{
			name: "customer_service",
			title: "Customer Service"
		},
		{
			name: "custom",
			title: "Custom"
		}
	];
}
function getSettingGroups() {
	return [
		{
			name: "appinfo",
			title: "App Info",
			description: "Basic application settings",
			tab: "general"
		},
		{
			name: "user_role",
			title: "User Roles",
			description: "Default role for new users",
			tab: "general"
		},
		{
			name: "credit",
			title: "Credits",
			description: "Initial credits for new users",
			tab: "general"
		},
		{
			name: "email_auth",
			title: "Email Auth",
			description: "Email/password authentication",
			tab: "auth"
		},
		{
			name: "google_auth",
			title: "Google Auth",
			description: "Google OAuth login",
			tab: "auth"
		},
		{
			name: "github_auth",
			title: "GitHub Auth",
			description: "GitHub OAuth login",
			tab: "auth"
		},
		{
			name: "basic_payment",
			title: "Basic",
			description: "Payment general settings",
			tab: "payment"
		},
		{
			name: "stripe",
			title: "Stripe",
			description: "Stripe payment gateway",
			tab: "payment"
		},
		{
			name: "creem",
			title: "Creem",
			description: "Creem payment gateway",
			tab: "payment"
		},
		{
			name: "waffo",
			title: "Waffo Pancake",
			description: "Waffo Pancake payment gateway",
			tab: "payment"
		},
		{
			name: "paypal",
			title: "PayPal",
			description: "PayPal payment gateway",
			tab: "payment"
		},
		{
			name: "alipay",
			title: "Alipay",
			description: "Alipay payment gateway (native)",
			tab: "payment"
		},
		{
			name: "wechat",
			title: "WeChat Pay",
			description: "WeChat Pay gateway (native)",
			tab: "payment"
		},
		{
			name: "email_general",
			title: "General",
			description: "Email provider selection",
			tab: "email"
		},
		{
			name: "resend",
			title: "Resend",
			description: "Resend email service",
			tab: "email"
		},
		{
			name: "cloudflare_email",
			title: "Cloudflare Email",
			description: "Cloudflare Email Service",
			tab: "email"
		},
		{
			name: "r2",
			title: "Cloudflare R2 / S3",
			description: "Object storage settings",
			tab: "storage"
		},
		{
			name: "openai",
			title: "OpenAI",
			description: "OpenAI (or compatible) API",
			tab: "ai"
		},
		{
			name: "anthropic",
			title: "Anthropic",
			description: "Anthropic Claude API",
			tab: "ai"
		},
		{
			name: "replicate",
			title: "Replicate",
			description: "Replicate AI API",
			tab: "ai"
		},
		{
			name: "fal",
			title: "Fal",
			description: "Fal AI API",
			tab: "ai"
		},
		{
			name: "google_analytics",
			title: "Google Analytics",
			description: "Inject gtag.js with the configured Measurement ID",
			tab: "analytics"
		},
		{
			name: "plausible",
			title: "Plausible",
			description: "Inject plausible.js for self-hosted or cloud Plausible",
			tab: "analytics"
		},
		{
			name: "adsense",
			title: "Google AdSense",
			description: "Inject the AdSense script sitewide and serve /ads.txt from the configured publisher ID",
			tab: "ads"
		},
		{
			name: "crisp",
			title: "Crisp",
			description: "Crisp live chat widget",
			tab: "customer_service"
		},
		{
			name: "tawk",
			title: "Tawk.to",
			description: "Tawk.to live chat widget",
			tab: "customer_service"
		}
	];
}
function getSettings() {
	return [
		{
			name: "app_name",
			title: "App Name",
			type: "text",
			placeholder: "My App",
			group: "appinfo",
			tab: "general"
		},
		{
			name: "app_description",
			title: "App Description",
			type: "textarea",
			placeholder: "Genjutsu AI restyles any video without changing who or what is in it — new scenes, styles, and objects while keeping the original motion.",
			group: "appinfo",
			tab: "general"
		},
		{
			name: "app_url",
			title: "App URL",
			type: "text",
			placeholder: "https://genjutsuai.net",
			group: "appinfo",
			tab: "general"
		},
		{
			name: "app_support_email",
			title: "Support Email",
			type: "text",
			placeholder: "support@genjutsuai.net",
			group: "appinfo",
			tab: "general"
		},
		{
			name: "initial_role_enabled",
			title: "Auto-assign role for new users",
			type: "switch",
			group: "user_role",
			tab: "general"
		},
		{
			name: "initial_role_name",
			title: "Default role name",
			type: "text",
			placeholder: "viewer",
			group: "user_role",
			tab: "general"
		},
		{
			name: "initial_credits_enabled",
			title: "Grant credits on signup",
			type: "switch",
			group: "credit",
			tab: "general"
		},
		{
			name: "initial_credits_amount",
			title: "Credits amount",
			type: "number",
			placeholder: "100",
			group: "credit",
			tab: "general"
		},
		{
			name: "initial_credits_valid_days",
			title: "Valid days",
			type: "number",
			placeholder: "365",
			group: "credit",
			tab: "general"
		},
		{
			name: "initial_credits_description",
			title: "Description",
			type: "text",
			placeholder: "Welcome bonus",
			group: "credit",
			tab: "general"
		},
		{
			name: "email_auth_enabled",
			title: "Enable email auth",
			type: "switch",
			group: "email_auth",
			tab: "auth",
			defaultValue: "true"
		},
		{
			name: "email_verification_enabled",
			title: "Require email verification on sign up",
			type: "switch",
			group: "email_auth",
			tab: "auth",
			defaultValue: "false"
		},
		{
			name: "invite_code_required",
			title: "Require invite code on sign up",
			type: "switch",
			group: "email_auth",
			tab: "auth",
			defaultValue: "false"
		},
		{
			name: "desktop_auth_schemes",
			title: "Desktop hand-off schemes",
			type: "text",
			placeholder: "myapp,myapp-dev",
			group: "email_auth",
			tab: "auth"
		},
		{
			name: "google_auth_enabled",
			title: "Enable Google auth",
			type: "switch",
			group: "google_auth",
			tab: "auth"
		},
		{
			name: "google_one_tap_enabled",
			title: "Enable Google One Tap",
			type: "switch",
			group: "google_auth",
			tab: "auth",
			tip: "Show the Google One Tap prompt to signed-out visitors. Requires Client ID."
		},
		{
			name: "google_client_id",
			title: "Client ID",
			type: "text",
			placeholder: "xxx.apps.googleusercontent.com",
			group: "google_auth",
			tab: "auth"
		},
		{
			name: "google_client_secret",
			title: "Client Secret",
			type: "password",
			placeholder: "GOCSPX-xxx",
			group: "google_auth",
			tab: "auth"
		},
		{
			name: "github_auth_enabled",
			title: "Enable GitHub auth",
			type: "switch",
			group: "github_auth",
			tab: "auth"
		},
		{
			name: "github_client_id",
			title: "Client ID",
			type: "text",
			placeholder: "Ov23xxx",
			group: "github_auth",
			tab: "auth"
		},
		{
			name: "github_client_secret",
			title: "Client Secret",
			type: "password",
			placeholder: "xxx",
			group: "github_auth",
			tab: "auth"
		},
		{
			name: "select_payment_enabled",
			title: "Show payment method selector",
			type: "switch",
			group: "basic_payment",
			tab: "payment"
		},
		{
			name: "default_payment_provider",
			title: "Default provider",
			type: "select",
			options: [
				{
					label: "Stripe",
					value: "stripe"
				},
				{
					label: "Creem",
					value: "creem"
				},
				{
					label: "Waffo Pancake",
					value: "waffo"
				},
				{
					label: "PayPal",
					value: "paypal"
				},
				{
					label: "Alipay",
					value: "alipay"
				},
				{
					label: "WeChat Pay",
					value: "wechat"
				}
			],
			group: "basic_payment",
			tab: "payment"
		},
		{
			name: "stripe_enabled",
			title: "Enable Stripe",
			type: "switch",
			group: "stripe",
			tab: "payment"
		},
		{
			name: "stripe_publishable_key",
			title: "Publishable Key",
			type: "text",
			placeholder: "pk_xxx",
			group: "stripe",
			tab: "payment"
		},
		{
			name: "stripe_secret_key",
			title: "Secret Key",
			type: "password",
			placeholder: "sk_xxx",
			group: "stripe",
			tab: "payment"
		},
		{
			name: "stripe_signing_secret",
			title: "Webhook Signing Secret",
			type: "password",
			placeholder: "whsec_xxx",
			group: "stripe",
			tab: "payment"
		},
		{
			name: "creem_enabled",
			title: "Enable Creem",
			type: "switch",
			group: "creem",
			tab: "payment"
		},
		{
			name: "creem_environment",
			title: "Environment",
			type: "select",
			options: [{
				label: "Sandbox",
				value: "sandbox"
			}, {
				label: "Production",
				value: "production"
			}],
			group: "creem",
			tab: "payment",
			defaultValue: "sandbox"
		},
		{
			name: "creem_api_key",
			title: "API Key",
			type: "password",
			placeholder: "creem_xxx",
			group: "creem",
			tab: "payment"
		},
		{
			name: "creem_signing_secret",
			title: "Signing Secret",
			type: "password",
			placeholder: "whsec_xxx",
			group: "creem",
			tab: "payment"
		},
		{
			name: "creem_product_ids_mapping",
			title: "Product IDs Mapping",
			type: "textarea",
			placeholder: "{\"starter_monthly\": \"prod_xxx\"}",
			tip: "Map the product_id in pricing catalog to the product ID created in Creem. Must be a valid JSON object.",
			group: "creem",
			tab: "payment"
		},
		{
			name: "creem_test_amount",
			title: "Test amount (cents)",
			type: "number",
			placeholder: "留空使用实际金额，填 1 则支付 $0.01",
			group: "creem",
			tab: "payment"
		},
		{
			name: "waffo_enabled",
			title: "Enable Waffo Pancake",
			type: "switch",
			group: "waffo",
			tab: "payment"
		},
		{
			name: "waffo_environment",
			title: "Environment",
			type: "select",
			options: [{
				label: "Test",
				value: "test"
			}, {
				label: "Production",
				value: "prod"
			}],
			group: "waffo",
			tab: "payment",
			defaultValue: "test",
			tip: "Must be Production when charging real money. Pair with a Production API Key — Test keys always create test_mode checkouts even if this is set to Production."
		},
		{
			name: "waffo_merchant_id",
			title: "Merchant ID",
			type: "text",
			placeholder: "MER_xxx",
			tip: "From Dashboard → Integration (API & Development). Same merchant for Test and Production.",
			group: "waffo",
			tab: "payment"
		},
		{
			name: "waffo_private_key",
			title: "Private Key",
			type: "password",
			placeholder: "RSA private key (PEM or base64)",
			tip: "Must be the Production (Live) RSA private key when Environment is Production. A Test key always creates test_mode checkouts — users will not be charged.",
			group: "waffo",
			tab: "payment"
		},
		{
			name: "waffo_store_id",
			title: "Store ID",
			type: "text",
			placeholder: "STO_xxx",
			tip: "Used for GraphQL order lookups and webhook registration",
			group: "waffo",
			tab: "payment"
		},
		{
			name: "waffo_product_ids_mapping",
			title: "Product IDs Mapping",
			type: "textarea",
			placeholder: "{\"mini\":\"PROD_xxx\",\"starter\":\"PROD_xxx\",\"creator\":\"PROD_xxx\",\"studio\":\"PROD_xxx\"}",
			tip: "Map pricing catalog product_id to Waffo Product ID (include mini). Must be valid JSON. Merge only new keys; never drop existing IDs.",
			group: "waffo",
			tab: "payment"
		},
		{
			name: "paypal_enabled",
			title: "Enable PayPal",
			type: "switch",
			group: "paypal",
			tab: "payment"
		},
		{
			name: "paypal_client_id",
			title: "Client ID",
			type: "text",
			placeholder: "xxx",
			group: "paypal",
			tab: "payment"
		},
		{
			name: "paypal_client_secret",
			title: "Client Secret",
			type: "password",
			placeholder: "xxx",
			group: "paypal",
			tab: "payment"
		},
		{
			name: "paypal_webhook_id",
			title: "Webhook ID",
			type: "text",
			placeholder: "xxx",
			group: "paypal",
			tab: "payment"
		},
		{
			name: "paypal_environment",
			title: "Environment",
			type: "select",
			options: [{
				label: "Sandbox",
				value: "sandbox"
			}, {
				label: "Live",
				value: "live"
			}],
			group: "paypal",
			tab: "payment"
		},
		{
			name: "paypal_test_amount",
			title: "Test amount (cents)",
			type: "number",
			placeholder: "留空使用实际金额，填 1 则支付 $0.01",
			group: "paypal",
			tab: "payment"
		},
		{
			name: "alipay_enabled",
			title: "Enable Alipay",
			type: "switch",
			group: "alipay",
			tab: "payment"
		},
		{
			name: "alipay_app_id",
			title: "App ID",
			type: "text",
			placeholder: "2021xxx",
			group: "alipay",
			tab: "payment"
		},
		{
			name: "alipay_private_key",
			title: "Private Key (RSA2)",
			type: "textarea",
			placeholder: "MIIEvQIBADANBgkq...",
			group: "alipay",
			tab: "payment"
		},
		{
			name: "alipay_public_key",
			title: "Alipay Public Key",
			type: "textarea",
			placeholder: "MIIBIjANBgkq...",
			group: "alipay",
			tab: "payment"
		},
		{
			name: "alipay_notify_url",
			title: "Notify URL (Webhook)",
			type: "text",
			placeholder: "https://hersoul.cn/api/payment/notify/alipay",
			group: "alipay",
			tab: "payment"
		},
		{
			name: "alipay_test_amount",
			title: "Test amount (分)",
			type: "number",
			placeholder: "留空使用实际金额，填 1 则支付 ¥0.01",
			group: "alipay",
			tab: "payment"
		},
		{
			name: "wechat_enabled",
			title: "Enable WeChat Pay",
			type: "switch",
			group: "wechat",
			tab: "payment"
		},
		{
			name: "wechat_app_id",
			title: "AppID",
			type: "text",
			placeholder: "wx1234567890",
			group: "wechat",
			tab: "payment"
		},
		{
			name: "wechat_mch_id",
			title: "Merchant ID (商户号)",
			type: "text",
			placeholder: "1900000001",
			group: "wechat",
			tab: "payment"
		},
		{
			name: "wechat_api_v3_key",
			title: "APIv3 Key (32位密钥)",
			type: "password",
			placeholder: "32 chars",
			group: "wechat",
			tab: "payment"
		},
		{
			name: "wechat_private_key",
			title: "Merchant Private Key (PEM)",
			type: "textarea",
			placeholder: "MIIEvgIBADANBgkq...",
			group: "wechat",
			tab: "payment"
		},
		{
			name: "wechat_serial_no",
			title: "Certificate Serial No",
			type: "text",
			placeholder: "xxx",
			group: "wechat",
			tab: "payment"
		},
		{
			name: "wechat_notify_url",
			title: "Notify URL (Webhook)",
			type: "text",
			placeholder: "https://hersoul.cn/api/payment/notify/wechat",
			group: "wechat",
			tab: "payment"
		},
		{
			name: "wechat_test_amount",
			title: "Test amount (分)",
			type: "number",
			placeholder: "留空使用实际金额，填 1 则支付 ¥0.01",
			group: "wechat",
			tab: "payment"
		},
		{
			name: "email_provider",
			title: "Email Provider",
			type: "select",
			options: [{
				label: "Resend",
				value: "resend"
			}, {
				label: "Cloudflare Email",
				value: "cloudflare"
			}],
			group: "email_general",
			tab: "email",
			defaultValue: "resend"
		},
		{
			name: "resend_api_key",
			title: "API Key",
			type: "password",
			placeholder: "re_xxx",
			group: "resend",
			tab: "email"
		},
		{
			name: "resend_sender_email",
			title: "Sender Email",
			type: "text",
			placeholder: "hello@example.com",
			group: "resend",
			tab: "email"
		},
		{
			name: "cloudflare_email_api_token",
			title: "API Token",
			type: "password",
			placeholder: "Bearer token with Email Send permission",
			group: "cloudflare_email",
			tab: "email"
		},
		{
			name: "cloudflare_email_account_id",
			title: "Account ID",
			type: "text",
			placeholder: "Cloudflare account ID",
			group: "cloudflare_email",
			tab: "email"
		},
		{
			name: "cloudflare_email_sender_email",
			title: "Sender Email",
			type: "text",
			placeholder: "hello@yourdomain.com",
			group: "cloudflare_email",
			tab: "email"
		},
		{
			name: "r2_access_key",
			title: "Cloudflare Access Key",
			type: "text",
			placeholder: "",
			group: "r2",
			tab: "storage"
		},
		{
			name: "r2_secret_key",
			title: "Cloudflare Secret Key",
			type: "password",
			placeholder: "",
			group: "r2",
			tab: "storage"
		},
		{
			name: "r2_bucket_name",
			title: "Bucket Name",
			type: "text",
			placeholder: "",
			group: "r2",
			tab: "storage"
		},
		{
			name: "r2_upload_path",
			title: "Upload Path",
			type: "text",
			placeholder: "uploads",
			tip: "Path to upload files to; leave empty to use the default. Example: uploads/foo/bar",
			group: "r2",
			tab: "storage"
		},
		{
			name: "r2_endpoint",
			title: "Endpoint",
			type: "text",
			placeholder: "https://<account-id>.r2.cloudflarestorage.com",
			tip: "Leave empty to use the default R2 endpoint",
			group: "r2",
			tab: "storage"
		},
		{
			name: "r2_domain",
			title: "Domain",
			type: "text",
			placeholder: "https://cdn.example.com",
			group: "r2",
			tab: "storage"
		},
		{
			name: "openai_base_url",
			title: "Base URL",
			type: "text",
			placeholder: "https://api.openai.com/v1",
			group: "openai",
			tab: "ai"
		},
		{
			name: "openai_api_key",
			title: "API Key",
			type: "password",
			placeholder: "sk-xxx",
			group: "openai",
			tab: "ai"
		},
		{
			name: "anthropic_base_url",
			title: "Base URL",
			type: "text",
			placeholder: "https://api.anthropic.com",
			group: "anthropic",
			tab: "ai"
		},
		{
			name: "anthropic_api_key",
			title: "API Key",
			type: "password",
			placeholder: "sk-ant-xxx",
			group: "anthropic",
			tab: "ai"
		},
		{
			name: "replicate_api_token",
			title: "API Token",
			type: "password",
			placeholder: "r8_xxx",
			group: "replicate",
			tab: "ai"
		},
		{
			name: "fal_api_key",
			title: "API Key",
			type: "password",
			placeholder: "xxx",
			group: "fal",
			tab: "ai"
		},
		{
			name: "google_analytics_id",
			title: "Measurement ID",
			type: "text",
			placeholder: "G-XXXXXXXXXX",
			group: "google_analytics",
			tab: "analytics"
		},
		{
			name: "plausible_domain",
			title: "Domain",
			type: "text",
			placeholder: "example.com",
			tip: "Optional for the new site-specific script; required by legacy scripts",
			group: "plausible",
			tab: "analytics"
		},
		{
			name: "plausible_src",
			title: "Script Src",
			type: "text",
			placeholder: "https://plausible.example.com/js/pa-XXXXX.js",
			tip: "Paste the complete site-specific script URL from Plausible, or leave blank to use the legacy cloud script",
			group: "plausible",
			tab: "analytics"
		},
		{
			name: "adsense_code",
			title: "Publisher ID",
			type: "text",
			placeholder: "ca-pub-XXXXXXXXXXXXXXXX",
			tip: "Your AdSense publisher ID — also used to generate /ads.txt",
			group: "adsense",
			tab: "ads"
		},
		{
			name: "crisp_enabled",
			title: "Enable Crisp",
			type: "switch",
			group: "crisp",
			tab: "customer_service"
		},
		{
			name: "crisp_website_id",
			title: "Website ID",
			type: "text",
			placeholder: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
			group: "crisp",
			tab: "customer_service"
		},
		{
			name: "tawk_enabled",
			title: "Enable Tawk.to",
			type: "switch",
			group: "tawk",
			tab: "customer_service"
		},
		{
			name: "tawk_property_id",
			title: "Property ID",
			type: "text",
			placeholder: "xxxxxxxxxxxxxxxxxxxxxxxx",
			group: "tawk",
			tab: "customer_service"
		},
		{
			name: "tawk_widget_id",
			title: "Widget ID",
			type: "text",
			placeholder: "1xxxxx/default",
			group: "tawk",
			tab: "customer_service"
		}
	];
}
var service_exports = /* @__PURE__ */ __exportAll({
	filterPublicConfigs: () => filterPublicConfigs,
	getAdminConfigs: () => getAdminConfigs,
	getAllConfigs: () => getAllConfigs,
	getConfig: () => getConfig,
	getCustomConfigs: () => getCustomConfigs,
	getDbConfigs: () => getDbConfigs,
	isMaskedConfigValue: () => isMaskedConfigValue,
	isSecretConfigKey: () => isSecretConfigKey,
	maskConfigValue: () => maskConfigValue,
	replaceCustomConfigs: () => replaceCustomConfigs,
	saveConfigs: () => saveConfigs
});
var cachedConfigs = null;
var cacheTime = 0;
var CACHE_TTL = 36e5;
/**
* Get all configs from database.
*/
async function getDbConfigs() {
	const now = Date.now();
	if (cachedConfigs && now - cacheTime < CACHE_TTL) return cachedConfigs;
	try {
		if (!envConfigs.database_url && envConfigs.database_provider !== "d1") return {};
		const rows = await db().select().from(config);
		const result = {};
		for (const row of rows) {
			if (!row.name || row.value === null || row.value === void 0) continue;
			if (isEncryptedSecret(row.value)) {
				const plain = await decryptSecret(row.value);
				if (plain === null) {
					console.warn(`[config] failed to decrypt "${row.name}", skipping`);
					continue;
				}
				result[row.name] = plain;
			} else result[row.name] = row.value;
		}
		cachedConfigs = result;
		cacheTime = now;
		return result;
	} catch {
		return {};
	}
}
/**
* Get all configs merged: env + database (database overrides env).
*/
async function getAllConfigs() {
	const dbConfigs = await getDbConfigs();
	return {
		...envConfigs,
		...dbConfigs
	};
}
/**
* Keys that must never be written through the admin UI / DB config layer.
*
* These are infrastructure-critical or session-signing secrets that should
* only ever come from environment variables. Allowing a compromised admin
* (or a confused-deputy bug) to overwrite them would let an attacker rotate
* the session-signing key out from under us, swap the database connection,
* etc.
*/
var PROTECTED_CONFIG_KEYS = new Set([
	"auth_secret",
	"database_url",
	"database_auth_token",
	"database_provider",
	"db_schema",
	"db_singleton_enabled",
	"db_max_connections"
]);
/**
* Keys whose values are secrets: encrypted at rest in the config table and
* masked when returned to the admin UI.
*
* Derived from the settings definitions (password fields + private keys),
* plus a name-pattern fallback so env-only secrets (e.g. stripe_secret_key)
* and future custom keys are covered without registration.
*/
var SECRET_SETTING_NAMES = new Set(getSettings().filter((s) => s.type === "password" || s.name.endsWith("_private_key")).map((s) => s.name));
var SECRET_KEY_PATTERN = /(_secret|_secret_key|_token|_password|_private_key|_api_key|_access_key|_api_v3_key)$/;
function isSecretConfigKey(name) {
	return SECRET_SETTING_NAMES.has(name) || SECRET_KEY_PATTERN.test(name);
}
/** Mask marker — secrets never start with bullets, so it's unambiguous. */
var MASK_PREFIX = "••••••••";
/**
* Mask a secret for display: keep the last 4 chars when long enough to be
* unidentifiable from them, otherwise mask entirely.
*/
function maskConfigValue(value) {
	return value.length > 8 ? MASK_PREFIX + value.slice(-4) : MASK_PREFIX;
}
/** A masked value round-tripped from the admin UI means "unchanged". */
function isMaskedConfigValue(value) {
	return value.startsWith(MASK_PREFIX);
}
/**
* Save multiple configs to database (upsert). Protected keys are silently
* dropped — see PROTECTED_CONFIG_KEYS. Masked values round-tripped from the
* admin UI are skipped (the user didn't change them). Secret keys are
* encrypted at rest — see SECRET_SETTING_NAMES / SECRET_KEY_PATTERN.
*/
async function saveConfigs(configs) {
	const entries = await Promise.all(Object.entries(configs).filter(([name, value]) => !PROTECTED_CONFIG_KEYS.has(name) && !isMaskedConfigValue(value)).map(async ([name, value]) => isSecretConfigKey(name) ? [name, await encryptSecret(value)] : [name, value]));
	if (entries.length === 0) return;
	await db().transaction(async (tx) => {
		for (const [name, value] of entries) {
			const [existing] = await tx.select().from(config).where(eq(config.name, name)).limit(1);
			if (existing) await tx.update(config).set({ value }).where(eq(config.name, name));
			else await tx.insert(config).values({
				name,
				value
			});
		}
	});
	cachedConfigs = null;
	cacheTime = 0;
}
/**
* Get a single config value.
*/
async function getConfig(name) {
	return (await getAllConfigs())[name];
}
/**
* Configs sanitized for the admin settings UI: protected keys removed,
* secret values masked. Never send getAllConfigs() to a client — it
* contains every env secret in plaintext.
*/
async function getAdminConfigs() {
	const configs = await getAllConfigs();
	const result = {};
	for (const [name, value] of Object.entries(configs)) {
		if (PROTECTED_CONFIG_KEYS.has(name)) continue;
		result[name] = isSecretConfigKey(name) && value ? maskConfigValue(value) : value;
	}
	return result;
}
/** Valid custom config key: letters, digits, and `_ . : -`. */
var CUSTOM_KEY_PATTERN = /^[A-Za-z0-9_.:-]+$/;
/**
* Keys that are "known" to the system — predefined settings plus every env
* config key — and therefore not user-managed custom keys.
*/
function reservedConfigKeys() {
	return new Set([
		...getSettings().map((s) => s.name),
		...Object.keys(envConfigs),
		...PROTECTED_CONFIG_KEYS
	]);
}
/**
* Custom (user-defined) configs: DB-stored key/value pairs that aren't part
* of any predefined setting or env key. Secret-like values are masked before
* returning to the admin UI.
*/
async function getCustomConfigs() {
	const reserved = reservedConfigKeys();
	const dbConfigs = await getDbConfigs();
	return Object.entries(dbConfigs).filter(([name]) => !reserved.has(name)).map(([key, value]) => ({
		key,
		value: isSecretConfigKey(key) && value ? maskConfigValue(value) : value
	})).sort((a, b) => a.key.localeCompare(b.key));
}
/**
* Replace the entire set of custom configs: upsert the provided pairs and
* delete any previously-stored custom key that's no longer present. Reserved
* keys are rejected so the custom tab can't shadow a predefined setting.
*/
async function replaceCustomConfigs(pairs) {
	const reserved = reservedConfigKeys();
	const seen = /* @__PURE__ */ new Set();
	const clean = [];
	for (const pair of pairs) {
		const key = (pair?.key ?? "").trim();
		if (!key) continue;
		if (reserved.has(key)) throw new Error(`Reserved key not allowed: ${key}`);
		if (!CUSTOM_KEY_PATTERN.test(key)) throw new Error(`Invalid key: ${key}`);
		if (seen.has(key)) throw new Error(`Duplicate key: ${key}`);
		seen.add(key);
		clean.push([key, pair.value ?? ""]);
	}
	const dbConfigs = await getDbConfigs();
	const existingCustom = Object.keys(dbConfigs).filter((n) => !reserved.has(n));
	const keep = new Set(clean.map(([k]) => k));
	const toDelete = existingCustom.filter((k) => !keep.has(k));
	const entries = await Promise.all(clean.filter(([, value]) => !isMaskedConfigValue(value)).map(async ([name, value]) => isSecretConfigKey(name) ? [name, await encryptSecret(value)] : [name, value]));
	await db().transaction(async (tx) => {
		for (const name of toDelete) await tx.delete(config).where(eq(config.name, name));
		for (const [name, value] of entries) {
			const [existing] = await tx.select().from(config).where(eq(config.name, name)).limit(1);
			if (existing) await tx.update(config).set({ value }).where(eq(config.name, name));
			else await tx.insert(config).values({
				name,
				value
			});
		}
	});
	cachedConfigs = null;
	cacheTime = 0;
}
/**
* Filter configs to only include public-safe keys.
*/
function filterPublicConfigs(configs, publicKeys) {
	const result = {};
	for (const key of publicKeys) {
		if (PROTECTED_CONFIG_KEYS.has(key) || isSecretConfigKey(key)) continue;
		if (key in configs) result[key] = configs[key];
	}
	return result;
}
//#endregion
export { getCustomConfigs as a, replaceCustomConfigs as c, getSettingGroups as d, getSettingTabs as f, encryptSecret as h, getConfig as i, saveConfigs as l, decryptSecret as m, getAdminConfigs as n, getDbConfigs as o, getSettings as p, getAllConfigs as r, isMaskedConfigValue as s, filterPublicConfigs as t, service_exports as u };
