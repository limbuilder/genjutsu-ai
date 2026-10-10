import { H as Separator, at as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/separator-CAzkyqHq.js
var import_jsx_runtime = require_jsx_runtime();
function Separator$1({ className, orientation = "horizontal", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {
		"data-slot": "separator",
		orientation,
		className: cn("shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch", className),
		...props
	});
}
//#endregion
export { Separator$1 as t };
