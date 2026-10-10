import { at as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { u as Outlet } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as MDXProvider } from "../_libs/mdx-js__react.mjs";
import { oo as common_pages_back_to_home } from "./messages-B_Y80loh.mjs";
import { t as Link$1 } from "./navigation-BgznuAML.mjs";
import { t as mdxComponents } from "./mdx-components-BzHubnlZ.mjs";
import { Ht as ArrowLeft } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-CyGNHkIl.js
var import_jsx_runtime = require_jsx_runtime();
function PagesLayout() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background min-h-screen",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-3xl px-6 pt-8 md:px-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
				href: "/",
				className: "text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm font-medium transition-colors",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), common_pages_back_to_home()]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-3xl px-6 pt-6 pb-12 md:px-8 md:pt-8 md:pb-16",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MDXProvider, {
				components: mdxComponents,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			})
		})]
	});
}
//#endregion
export { PagesLayout as component };
