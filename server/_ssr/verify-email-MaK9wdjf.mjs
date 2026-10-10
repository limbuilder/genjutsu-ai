import { o as __toESM } from "../_runtime.mjs";
import { at as require_jsx_runtime, ot as require_react } from "../_libs/@base-ui/react+[...].mjs";
import { f as localizeHref, r as deLocalizeHref } from "./ssr.mjs";
import { Jo as common_sign_resend_verification_countdown, cs as common_sign_verify_email_email_required, ds as common_sign_verify_email_page_title, fs as common_sign_verify_email_send_failed, go as common_sign_back_to_sign_in, ls as common_sign_verify_email_not_verified_yet, ps as common_sign_verify_email_tip, qo as common_sign_resend_verification, ss as common_sign_verify_email_continue, us as common_sign_verify_email_page_description } from "./messages-B_Y80loh.mjs";
import { o as envConfigs } from "./schema-DWa8-2WU.mjs";
import { r as useRouter$1, t as Link$1 } from "./navigation-BgznuAML.mjs";
import { n as authClient, v as useSession } from "./client-xUgmZoCV.mjs";
import { K as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as Button$1 } from "./button-RkClB0x2.mjs";
import { a as CardHeader, i as CardFooter, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-CJS2GQq6.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/verify-email-MaK9wdjf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var RESEND_COOLDOWN_SECONDS = 60;
function safeDecodeCallbackUrl(raw) {
	if (!raw) return "/";
	try {
		const decoded = decodeURIComponent(raw);
		if (decoded.startsWith("/")) return decoded;
		return "/";
	} catch {
		return "/";
	}
}
function stripLocalePrefix(path) {
	if (!path?.startsWith("/")) return "/";
	return deLocalizeHref(path);
}
function getCooldownKey(email) {
	return `verify-email:lastSentAt:${String(email || "").toLowerCase()}`;
}
function getCooldownRemainingSeconds(email) {
	if (typeof window === "undefined") return 0;
	if (!email) return 0;
	const raw = window.localStorage.getItem(getCooldownKey(email));
	const last = raw ? Number(raw) : 0;
	if (!last || Number.isNaN(last)) return 0;
	const elapsedSeconds = Math.floor((Date.now() - last) / 1e3);
	return Math.max(0, RESEND_COOLDOWN_SECONDS - elapsedSeconds);
}
function markSentNow(email) {
	if (typeof window === "undefined") return;
	if (!email) return;
	try {
		window.localStorage.setItem(getCooldownKey(email), String(Date.now()));
	} catch {}
}
function VerifyEmailPage() {
	const router = useRouter$1();
	const { data: session, isPending } = useSession();
	const [email, setEmail] = (0, import_react.useState)(null);
	const [callbackUrl, setCallbackUrl] = (0, import_react.useState)(null);
	const [paramsReady, setParamsReady] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [cooldownSeconds, setCooldownSeconds] = (0, import_react.useState)(0);
	const lastSessionCheckAtRef = (0, import_react.useRef)(0);
	(0, import_react.useEffect)(() => {
		const params = new URLSearchParams(window.location.search);
		const e = params.get("email");
		const cb = params.get("callbackUrl");
		const sent = params.get("sent");
		setEmail(e);
		setCallbackUrl(cb);
		setParamsReady(true);
		if (sent === "1") {
			if (getCooldownRemainingSeconds(e) === 0) markSentNow(e);
			setCooldownSeconds(getCooldownRemainingSeconds(e));
			try {
				const url = new URL(window.location.href);
				url.searchParams.delete("sent");
				window.history.replaceState({}, "", url.toString());
			} catch {}
		} else setCooldownSeconds(getCooldownRemainingSeconds(e));
	}, []);
	(0, import_react.useEffect)(() => {
		if (paramsReady && !email && !callbackUrl) router.replace("/sign-in");
	}, [
		paramsReady,
		email,
		callbackUrl,
		router
	]);
	const nextUrl = (0, import_react.useMemo)(() => {
		return stripLocalePrefix(safeDecodeCallbackUrl(callbackUrl));
	}, [callbackUrl]);
	const signInPath = (0, import_react.useMemo)(() => {
		const query = new URLSearchParams();
		query.set("callbackUrl", nextUrl || "/");
		return `/sign-in?${query.toString()}`;
	}, [nextUrl]);
	const hardNavigateToNextUrl = () => {
		if (typeof window === "undefined") return;
		window.location.assign(localizeHref(nextUrl));
	};
	const checkSessionAndRedirect = async () => {
		const now = Date.now();
		if (now - lastSessionCheckAtRef.current < 800) return;
		lastSessionCheckAtRef.current = now;
		try {
			const { data } = await authClient.getSession();
			if (data?.user) hardNavigateToNextUrl();
		} catch {}
	};
	(0, import_react.useEffect)(() => {
		if (!paramsReady) return;
		const timer = window.setInterval(() => {
			setCooldownSeconds(getCooldownRemainingSeconds(email));
		}, 1e3);
		return () => window.clearInterval(timer);
	}, [email, paramsReady]);
	(0, import_react.useEffect)(() => {
		if (!isPending && session?.user) hardNavigateToNextUrl();
	}, [
		isPending,
		session?.user,
		nextUrl
	]);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		let cancelled = false;
		let attempts = 0;
		const maxAttempts = 12;
		const tick = async () => {
			if (cancelled) return;
			attempts += 1;
			await checkSessionAndRedirect();
			if (attempts >= maxAttempts) return;
			const { data } = await authClient.getSession();
			if (!data?.user) window.setTimeout(tick, 1e3);
		};
		tick();
		return () => {
			cancelled = true;
		};
	}, [nextUrl]);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		const onFocus = () => void checkSessionAndRedirect();
		const onVisibility = () => {
			if (document.visibilityState === "visible") checkSessionAndRedirect();
		};
		window.addEventListener("focus", onFocus);
		document.addEventListener("visibilitychange", onVisibility);
		return () => {
			window.removeEventListener("focus", onFocus);
			document.removeEventListener("visibilitychange", onVisibility);
		};
	}, [nextUrl]);
	const handleResend = async () => {
		if (!email) {
			toast.error(common_sign_verify_email_email_required());
			return;
		}
		if (loading) return;
		if (getCooldownRemainingSeconds(email) > 0) return;
		try {
			setLoading(true);
			const result = await authClient.sendVerificationEmail({
				email,
				callbackURL: localizeHref(nextUrl || "/")
			});
			if (result?.error) {
				toast.error(result.error.message || common_sign_verify_email_send_failed());
				return;
			}
			markSentNow(email);
			setCooldownSeconds(getCooldownRemainingSeconds(email));
		} catch (e) {
			toast.error(e?.message || common_sign_verify_email_send_failed());
		} finally {
			setLoading(false);
		}
	};
	const handleContinue = () => {
		if (session?.user) {
			hardNavigateToNextUrl();
			return;
		}
		(async () => {
			await checkSessionAndRedirect();
			const { data } = await authClient.getSession();
			if (data?.user) hardNavigateToNextUrl();
			else toast.error(common_sign_verify_email_not_verified_yet());
		})();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex w-full max-w-sm flex-col gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
				href: "/",
				className: "self-center font-serif text-lg italic",
				children: envConfigs.app_name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-lg md:text-xl",
					children: common_sign_verify_email_page_title()
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardDescription, {
					className: "text-xs md:text-sm",
					children: [common_sign_verify_email_page_description(), email ? ` ${email}` : ""]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							type: "button",
							variant: "outline",
							className: "w-full",
							disabled: loading || cooldownSeconds > 0,
							onClick: handleResend,
							children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
								size: 16,
								className: "animate-spin"
							}) : cooldownSeconds > 0 ? common_sign_resend_verification_countdown({ seconds: cooldownSeconds }) : common_sign_resend_verification()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							type: "button",
							className: "w-full",
							disabled: isPending,
							onClick: handleContinue,
							children: isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
								size: 16,
								className: "animate-spin"
							}) : common_sign_verify_email_continue()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							type: "button",
							variant: "ghost",
							className: "w-full",
							onClick: () => router.push(signInPath),
							children: common_sign_back_to_sign_in()
						})
					]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground w-full text-center text-xs",
					children: common_sign_verify_email_tip()
				}) })
			] })]
		})
	});
}
//#endregion
export { VerifyEmailPage as component };
