import { o as __toESM } from "../_runtime.mjs";
import { at as require_jsx_runtime, ot as require_react } from "./@base-ui/react+[...].mjs";
//#region node_modules/.pnpm/@react-email+head@0.0.13_react@19.2.5/node_modules/@react-email/head/dist/index.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var Head = import_react.forwardRef(({ children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", {
	...props,
	ref,
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
			content: "text/html; charset=UTF-8",
			httpEquiv: "Content-Type"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", { name: "x-apple-disable-message-reformatting" }),
		children
	]
}));
Head.displayName = "Head";
//#endregion
export { Head as t };
