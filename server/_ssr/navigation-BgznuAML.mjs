import { at as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { g as useRouter, m as Link, o as useLocation } from "../_libs/@tanstack/react-router+[...].mjs";
import "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/navigation-BgznuAML.js
var import_jsx_runtime = require_jsx_runtime();
function Link$1({ href, locale, prefetch, ...rest }) {
	if (/^(https?:|mailto:|tel:|#)/.test(href)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href,
		...rest
	});
	const { to, search, hash } = toNavigateOptions(href);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to,
		search,
		hash,
		...rest
	});
}
function usePathname() {
	return useLocation().pathname;
}
function toNavigateOptions(href) {
	const [pathPart, hash] = href.split("#");
	const [pathname, searchStr] = pathPart.split("?");
	return {
		to: pathname || "/",
		search: searchStr ? Object.fromEntries(new URLSearchParams(searchStr)) : void 0,
		hash
	};
}
function useRouter$1() {
	const router = useRouter();
	return {
		push: (href) => {
			router.navigate(toNavigateOptions(href));
		},
		replace: (href) => {
			router.navigate({
				...toNavigateOptions(href),
				replace: true
			});
		},
		back: () => router.history.back(),
		forward: () => router.history.forward(),
		refresh: () => router.invalidate(),
		prefetch: (_href) => {}
	};
}
//#endregion
export { usePathname as n, useRouter$1 as r, Link$1 as t };
