import { at as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { o as envConfigs } from "./schema-DWa8-2WU.mjs";
import { t as Link$1 } from "./navigation-BgznuAML.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { r as FOOTER_COLUMNS } from "./content-aeUTqH7Y.mjs";
import { dt as Github } from "../_libs/lucide-react.mjs";
import { u as RaphaelLogo } from "./site-user-menu-C3Ao0HTQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SiteFooter-Bjzgl7AX.js
var import_jsx_runtime = require_jsx_runtime();
var GITHUB_REPO_URL = "https://github.com/limbuilder/genjutsu-ai";
var isExternalHref = (href) => /^https?:\/\//.test(href);
function FooterLink({ href, label, badge }) {
	const className = "inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground";
	const content = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), badge ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "bg-primary/20 text-primary rounded px-1 py-px text-[10px] font-semibold",
		children: badge
	}) : null] });
	if (isExternalHref(href)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href,
		target: "_blank",
		rel: "noopener noreferrer",
		className,
		children: content
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
		href,
		className,
		children: content
	});
}
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "footer",
		className: "py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-7xl px-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center justify-between gap-10 text-center lg:flex-row lg:items-start lg:text-left",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex max-w-96 shrink flex-col items-center justify-between gap-6 lg:items-start",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-center gap-2 lg:justify-start",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RaphaelLogo, {
									size: 44,
									className: "h-11 w-11"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-foreground text-3xl font-semibold",
									children: envConfigs.app_name
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-md text-muted-foreground mt-6",
								children: "Restyle any video without changing who or what is in it — new scenes, styles, and objects while keeping the original motion. Powered by Higgsfield Genjutsu."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: GITHUB_REPO_URL,
								target: "_blank",
								rel: "noopener noreferrer",
								"aria-label": "Genjutsu AI on GitHub",
								title: "GitHub",
								className: "text-muted-foreground hover:text-foreground mt-5 inline-flex size-9 items-center justify-center rounded-md transition-colors",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, { className: "size-5" })
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid w-full max-w-md grid-cols-2 gap-8",
						children: FOOTER_COLUMNS.map((column) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-foreground mb-6 font-bold",
							children: column.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-3",
							children: column.links.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterLink, {
								href: link.href,
								label: link.label,
								badge: link.badge
							}) }, link.label))
						})] }, column.title))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("border-border mt-8 flex flex-col justify-between gap-4 border-t pt-8", "text-muted-foreground text-center text-sm font-medium", "lg:flex-row lg:items-center lg:text-left"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"© 2026 • ",
						envConfigs.app_name,
						" All rights reserved."
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-center gap-4 lg:justify-end",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: `mailto:${envConfigs.app_support_email}`,
								className: "hover:text-foreground transition-colors",
								children: envConfigs.app_support_email
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
								href: "/privacy-policy",
								className: "hover:text-foreground transition-colors",
								children: "Privacy Policy"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
								href: "/terms-of-service",
								className: "hover:text-foreground transition-colors",
								children: "Terms of Service"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
								href: "/refund-policy",
								className: "hover:text-foreground transition-colors",
								children: "Refund Policy"
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-border mt-6 flex flex-wrap items-center justify-center gap-4 border-t pt-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "https://submito.net",
							target: "_blank",
							rel: "noopener noreferrer",
							title: "Listed on Submito",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "https://submito.net/badge/listed-light.svg",
								alt: "Listed on Submito",
								loading: "lazy",
								decoding: "async",
								className: "h-[27px] w-auto"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "https://findly.tools/genjutsu-ai?utm_source=genjutsu-ai",
							target: "_blank",
							rel: "noopener noreferrer",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "https://findly.tools/badges/findly-tools-badge-light.svg",
								alt: "Featured on Findly.tools",
								width: 175,
								height: 55,
								loading: "lazy",
								decoding: "async",
								className: "h-[27px] w-auto"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "https://goodaitools.com/ai/genjutsuai",
							target: "_blank",
							rel: "noopener noreferrer",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "https://goodaitools.com/assets/images/badge.png",
								alt: "Good AI Tools",
								height: 54,
								loading: "lazy",
								decoding: "async",
								className: "h-[27px] w-auto"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "https://openhunts.com",
							target: "_blank",
							rel: "noopener noreferrer",
							title: "OpenHunts Club",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "https://cdn.openhunts.com/badges/club.webp",
								alt: "OpenHunts Club Member",
								width: 486,
								height: 105,
								loading: "lazy",
								decoding: "async",
								className: "h-[27px] w-auto"
							})
						})
					]
				})
			] })
		})
	});
}
//#endregion
export { SiteFooter as t };
