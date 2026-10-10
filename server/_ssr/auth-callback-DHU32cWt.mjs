import { o as __toESM } from "../_runtime.mjs";
import { at as require_jsx_runtime, ot as require_react } from "../_libs/@base-ui/react+[...].mjs";
import { f as localizeHref } from "./ssr.mjs";
import { $a as common_auth_callback_redirecting, Qa as common_auth_callback_error } from "./messages-B_Y80loh.mjs";
import { v as useSession } from "./client-xUgmZoCV.mjs";
import { i as apiGet } from "./api-client-BXIVLJCS.mjs";
import { K as LoaderCircle } from "../_libs/lucide-react.mjs";
import { a as safeInternalPath, n as isAllowedAppProtocolUrl, r as isAppProtocolUrl } from "./redirect-BuZ_SNMV.mjs";
import { t as usePublicConfig } from "./use-public-config-6tm3ISeI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-callback-DHU32cWt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* /auth-callback?redirect=<target>
*
* Landing pad between "you are now signed in" and where you were going:
*
* - internal path → straight there
* - allow-listed app protocol (`myapp://…`) → fetch the session token and hand
*   it to the client via `?token=…`; this is why the page exists at all, since
*   better-auth can only redirect to http(s) origins it trusts
*
* Anything else falls back to `/`. The allow-list is the admin setting
* `desktop_auth_schemes` — empty (the template default) means no hand-off.
*/
function AuthCallbackPage() {
	const { data: session, isPending } = useSession();
	const configQuery = usePublicConfig();
	const handledRef = (0, import_react.useRef)(false);
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (handledRef.current) return;
		if (isPending || !configQuery.isSuccess) return;
		const target = new URLSearchParams(window.location.search).get("redirect");
		const internalPath = safeInternalPath(target);
		if (!isAppProtocolUrl(target)) {
			handledRef.current = true;
			window.location.replace(localizeHref(internalPath || "/"));
			return;
		}
		if (!isAllowedAppProtocolUrl(target, configQuery.data?.desktop_auth_schemes)) {
			handledRef.current = true;
			window.location.replace(localizeHref("/"));
			return;
		}
		if (!session?.user) {
			handledRef.current = true;
			window.location.replace(localizeHref(`/sign-in?redirect=${encodeURIComponent(target)}`));
			return;
		}
		handledRef.current = true;
		apiGet("/api/auth/token").then(({ token }) => {
			const url = target;
			const separator = url.includes("?") ? "&" : "?";
			window.location.href = `${url}${separator}token=${encodeURIComponent(token)}`;
		}).catch((err) => {
			handledRef.current = false;
			setError(err.message || common_auth_callback_error());
		});
	}, [
		isPending,
		session?.user,
		configQuery.isSuccess,
		configQuery.data
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "bg-muted flex min-h-svh flex-col items-center justify-center gap-3 p-6",
		children: error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-destructive text-sm",
			children: error
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "text-muted-foreground size-5 animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground text-sm",
			children: common_auth_callback_redirecting()
		})] })
	});
}
//#endregion
export { AuthCallbackPage as component };
