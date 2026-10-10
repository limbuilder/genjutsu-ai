import { at as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/mdx-components-BzHubnlZ.js
var import_jsx_runtime = require_jsx_runtime();
var mdxComponents = {
	h1: ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: cn("text-foreground mt-6 mb-2 text-xl font-semibold tracking-tight md:text-2xl", className),
		...props
	}),
	h2: ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: cn("text-foreground mt-6 mb-2 text-lg font-semibold tracking-tight md:text-xl", className),
		...props
	}),
	h3: ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
		className: cn("text-foreground mt-4 mb-1.5 text-base font-semibold tracking-tight", className),
		...props
	}),
	p: ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: cn("text-foreground/90 mt-2 leading-7", className),
		...props
	}),
	a: ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		className: cn("text-primary font-medium underline-offset-4 hover:underline", className),
		...props
	}),
	ul: ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: cn("marker:text-muted-foreground mt-2 ml-6 list-disc space-y-1", className),
		...props
	}),
	ol: ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: cn("marker:text-muted-foreground mt-2 ml-6 list-decimal space-y-1", className),
		...props
	}),
	li: ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
		className: cn("text-foreground/90 leading-7", className),
		...props
	}),
	strong: ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
		className: cn("text-foreground font-semibold", className),
		...props
	}),
	blockquote: ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", {
		className: cn("border-border text-muted-foreground my-4 border-l-2 pl-4 italic", className),
		...props
	}),
	code: ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
		className: cn("bg-muted text-foreground rounded px-[0.4rem] py-[0.2rem] font-mono text-sm", className),
		...props
	}),
	hr: ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", {
		className: cn("border-border my-8", className),
		...props
	}),
	img: ({ className, alt, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		alt: alt ?? "",
		className: cn("border-border my-6 w-full rounded-xl border object-cover", className),
		...props
	}),
	video: ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
		className: cn("border-border my-6 w-full rounded-xl border bg-black object-cover", className),
		...props
	}),
	figure: ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figure", {
		className: cn("my-6", className),
		...props
	}),
	figcaption: ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
		className: cn("text-muted-foreground mt-2 text-center text-sm leading-6", className),
		...props
	})
};
//#endregion
export { mdxComponents as t };
