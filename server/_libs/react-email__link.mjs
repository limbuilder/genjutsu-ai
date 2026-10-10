import { o as __toESM } from "../_runtime.mjs";
import { at as require_jsx_runtime, ot as require_react } from "./@base-ui/react+[...].mjs";
//#region node_modules/.pnpm/@react-email+link@0.0.13_react@19.2.5/node_modules/@react-email/link/dist/index.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var Link = import_react.forwardRef(({ target = "_blank", style, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
	...props,
	ref,
	style: {
		color: "#067df7",
		textDecorationLine: "none",
		...style
	},
	target,
	children: props.children
}));
Link.displayName = "Link";
//#endregion
export { Link as t };
