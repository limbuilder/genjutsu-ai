import { o as __toESM } from "../_runtime.mjs";
import { at as require_jsx_runtime, ot as require_react } from "../_libs/@base-ui/react+[...].mjs";
import { Ks as creations_nav } from "./messages-B_Y80loh.mjs";
import { o as envConfigs } from "./schema-DWa8-2WU.mjs";
import { t as Link$1 } from "./navigation-BgznuAML.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { v as useSession } from "./client-xUgmZoCV.mjs";
import { mt as Flame } from "../_libs/lucide-react.mjs";
import { i as DropdownMenuItem, n as DropdownMenuContent, t as DropdownMenu, u as DropdownMenuTrigger } from "./dropdown-menu-7WHFSjMx.mjs";
import { d as SiteUserMenu, i as GlobeIcon, o as MenuIcon, t as ChevronDownIcon$1, u as RaphaelLogo } from "./site-user-menu-C3Ao0HTQ.mjs";
import { a as SheetTitle, i as SheetHeader, n as SheetContent, o as SheetTrigger, t as Sheet } from "./sheet-CnKXqjfE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SiteHeader-B2cCQXdM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NAV_LINKS = [
	{
		label: "Feature",
		href: "/#feature"
	},
	{
		label: "How it works",
		href: "/#how-it-works"
	},
	{
		label: "Pricing",
		href: "/#pricing"
	},
	{
		label: "Blog",
		href: "/blog"
	}
];
var TRENDING_LINKS = [{
	label: "Hotel Lobby",
	href: "/hotel-lobby-ai"
}, {
	label: "Zombie Hug",
	href: "/ai-zombie-hug"
}];
var navLinkClass = "hover:bg-accent hover:text-accent-foreground inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors";
function TrendingHotMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, {
		className: cn("size-3.5 shrink-0", className),
		color: "#ff6b35",
		fill: "#ff6b35",
		stroke: "#ff6b35",
		"aria-hidden": true
	});
}
function BrandLink({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
		href: "/",
		className: cn("flex items-center gap-2", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RaphaelLogo, {
			size: 32,
			className: "rounded-full"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[20px] font-bold tracking-tight text-[#f9a639]",
			children: envConfigs.app_name
		})]
	});
}
function UpgradePill({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
		href: "/pricing",
		className: cn("relative inline-flex h-7 items-center rounded-full px-3.5 text-[11px] font-semibold text-[rgb(36,23,15)] shadow-[0_6px_16px_rgba(221,126,66,0.16)] transition-opacity hover:opacity-90", "bg-[linear-gradient(135deg,rgb(240,176,107),rgb(215,123,66))]", className),
		children: ["Upgrade", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "absolute -top-2 -right-1 rounded bg-[#e05256] px-1 py-px text-[9px] leading-none font-bold text-white",
			children: "-50%"
		})]
	});
}
function SignInButton({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
		href: "/sign-in",
		className: cn("inline-flex h-10 items-center justify-center rounded-[10px] bg-[rgb(204,144,92)] px-4 text-sm font-medium text-[rgb(247,246,243)] transition-colors hover:bg-[rgb(190,130,80)]", className),
		children: "Sign in"
	});
}
function AuthSlot({ className }) {
	const { data: session, isPending } = useSession();
	const user = session?.user;
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("bg-muted/40 size-9 animate-pulse rounded-full", className),
		"aria-hidden": true
	});
	if (user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteUserMenu, {
		name: user.name || "User",
		email: user.email,
		image: user.image
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignInButton, { className });
}
function SiteHeader() {
	const [sheetOpen, setSheetOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "text-foreground relative z-[260] py-3",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto px-4 md:max-w-7xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "hidden items-center justify-between gap-4 lg:flex",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 items-center gap-2 xl:gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLink, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuTrigger, {
								className: navLinkClass,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingHotMark, { className: "mr-1" }),
									"Trending",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDownIcon$1, { className: "ml-1 size-3.5 opacity-70" })
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuContent, {
								align: "start",
								className: "min-w-40",
								children: TRENDING_LINKS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
									render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, { href: item.href }),
									children: item.label
								}, item.href))
							})] }),
							NAV_LINKS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
								href: item.href,
								className: navLinkClass,
								children: item.label
							}, item.href)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
								href: "/creations",
								className: navLinkClass,
								children: creations_nav()
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex shrink-0 items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UpgradePill, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "Language",
							className: "text-muted-foreground hover:bg-accent hover:text-foreground inline-flex size-9 items-center justify-center rounded-md transition-colors",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlobeIcon, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthSlot, {})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3 lg:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLink, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UpgradePill, { className: "hidden sm:inline-flex" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthSlot, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
							open: sheetOpen,
							onOpenChange: setSheetOpen,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
								"aria-label": "Open menu",
								className: "text-foreground hover:bg-accent inline-flex size-9 items-center justify-center rounded-md transition-colors",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuIcon, { className: "size-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
								side: "right",
								className: "border-border bg-background w-[min(100vw,360px)] p-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, {
									className: "border-border border-b px-4 py-4 text-left",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetTitle, {
										className: "text-primary flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RaphaelLogo, {
											size: 28,
											className: "rounded-full"
										}), envConfigs.app_name]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex h-full flex-col overflow-y-auto px-4 pt-2 pb-8",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "border-border/60 border-b py-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-muted-foreground flex items-center gap-1 text-xs font-medium tracking-wide uppercase",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingHotMark, { className: "size-3" }), "Trending"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-1 flex flex-col",
												children: TRENDING_LINKS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
													href: item.href,
													className: "py-2 pl-2 text-sm font-medium",
													onClick: () => setSheetOpen(false),
													children: item.label
												}, item.href))
											})]
										}),
										NAV_LINKS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
											href: item.href,
											className: "border-border/60 border-b py-3 text-sm font-medium",
											onClick: () => setSheetOpen(false),
											children: item.label
										}, item.href)),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
											href: "/creations",
											className: "border-border/60 border-b py-3 text-sm font-medium",
											onClick: () => setSheetOpen(false),
											children: creations_nav()
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-6 flex flex-col gap-3",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UpgradePill, { className: "w-fit" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													type: "button",
													className: "text-muted-foreground hover:bg-accent hover:text-foreground inline-flex w-fit items-center gap-2 rounded-md px-2 py-2 text-sm",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlobeIcon, { className: "size-4" }), "Language"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthSlot, { className: "w-full" })
											]
										})
									]
								})]
							})]
						})
					]
				})]
			})]
		})
	});
}
//#endregion
export { SiteHeader as t };
