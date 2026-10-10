import { at as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { t as Link$1 } from "./navigation-BgznuAML.mjs";
import { l as GENJUTSU_PROMPT_IDEAS } from "./content-aeUTqH7Y.mjs";
import { t as SiteFooter } from "./SiteFooter-Bjzgl7AX.mjs";
import { t as SiteHeader } from "./SiteHeader-B2cCQXdM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/genjutsu-prompts-BMaJ1gD0.js
var import_jsx_runtime = require_jsx_runtime();
function GenjutsuPromptsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background text-foreground flex min-h-screen flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto w-full max-w-7xl flex-1 px-4 py-12 md:px-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container mx-auto px-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-foreground/60 text-center text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
									href: "/",
									className: "hover:text-foreground underline-offset-4 hover:underline",
									children: "Genjutsu AI"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mx-2",
									children: "/"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Prompt ideas" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-foreground mx-auto mt-4 max-w-3xl text-center text-3xl font-bold tracking-tight sm:text-4xl",
							children: "Genjutsu Prompt Ideas"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-foreground/70 mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed sm:text-lg",
							children: [
								"Copy a prompt, upload your clip on the",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
									href: "/#hero-generator",
									className: "text-primary underline-offset-4 hover:underline",
									children: "homepage generator"
								}),
								", and restyle scenes, styles, products, or props while keeping the original subject and motion. Face swapping is not supported."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto mt-12 grid max-w-[1180px] gap-8 sm:grid-cols-2",
							children: GENJUTSU_PROMPT_IDEAS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "rounded-2xl border border-white/8 bg-white/[0.03] p-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-foreground text-lg font-semibold",
									children: item.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-foreground/65 mt-3 text-sm leading-relaxed",
									children: item.prompt
								})]
							}, item.title))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-14 flex justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
								href: "/#hero-generator",
								className: "inline-flex h-11 items-center justify-center rounded-xl bg-[rgb(204,144,92)] px-6 text-sm font-semibold text-[rgb(247,246,243)] transition hover:brightness-105",
								children: "Open the generator"
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { GenjutsuPromptsPage as component };
