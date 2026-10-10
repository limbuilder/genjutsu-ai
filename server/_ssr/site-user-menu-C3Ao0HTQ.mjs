import { at as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { as as common_sign_sign_out_title, eo as common_nav_credits_remaining, js as common_systems_admin, no as common_nav_settings } from "./messages-B_Y80loh.mjs";
import { r as useRouter$1, t as Link$1 } from "./navigation-BgznuAML.mjs";
import { g as signOut } from "./client-xUgmZoCV.mjs";
import { t as useUserPermissions } from "./use-user-permissions-C6K6gQfL.mjs";
import { n as AvatarFallback, r as AvatarImage, t as Avatar$1 } from "./avatar-ClZeTlv2.mjs";
import { Dt as Coins, G as LogOut, It as ChevronDown, U as Menu, at as Image, b as Settings, ht as Film, k as Plus, n as X, ut as Globe, v as Shield } from "../_libs/lucide-react.mjs";
import { a as DropdownMenuLabel, i as DropdownMenuItem, n as DropdownMenuContent, o as DropdownMenuSeparator, r as DropdownMenuGroup, t as DropdownMenu, u as DropdownMenuTrigger } from "./dropdown-menu-7WHFSjMx.mjs";
import { t as useUserCredits } from "./use-user-credits-B5TISbhc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-user-menu-C3Ao0HTQ.js
var import_jsx_runtime = require_jsx_runtime();
function ChevronDownIcon$1(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { ...props });
}
function GlobeIcon(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { ...props });
}
function MenuIcon(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { ...props });
}
function CloseIcon(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { ...props });
}
function PlusIcon(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { ...props });
}
function ImageModeIcon(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { ...props });
}
/** Two circles — left dashed, right solid (Motion transfer) */
function MotionTransferIcon({ className, size = 16, ...props }) {
	const s = typeof size === "number" ? size : 16;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		width: s,
		height: s,
		viewBox: "0 0 16 16",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		className,
		"aria-hidden": true,
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "5.5",
			cy: "8",
			r: "3.25",
			strokeDasharray: "2 1.75"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "10.5",
			cy: "8",
			r: "3.25"
		})]
	});
}
/** Overlapping frames with corner marks (Objects swap) */
function ObjectsSwapIcon({ className, size = 16, ...props }) {
	const s = typeof size === "number" ? size : 16;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		width: s,
		height: s,
		viewBox: "0 0 16 16",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		strokeLinecap: "round",
		className,
		"aria-hidden": true,
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "2.25",
				y: "3.5",
				width: "7.5",
				height: "7.5",
				rx: "1.25"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M10.5 6.25h1.75a1.25 1.25 0 0 1 1.25 1.25v5.25a1.25 1.25 0 0 1-1.25 1.25H7.5A1.25 1.25 0 0 1 6.25 12.75V11" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3.5 5.25v-1M5.25 3.5h-1" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12.5 13.5v-1M10.75 12.75h1" })
		]
	});
}
function FilmIcon(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Film, { ...props });
}
function RaphaelLogo({ className, size = 32 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: "/logo-64.webp",
		alt: "Genjutsu AI",
		width: size,
		height: size,
		className
	});
}
function SiteUserMenu({ name, email, image }) {
	const router = useRouter$1();
	const { data } = useUserPermissions();
	const creditsQuery = useUserCredits();
	const isAdmin = data?.isAdmin === true;
	const balance = creditsQuery.data?.balance;
	const balanceLabel = typeof balance === "number" ? balance.toLocaleString() : "—";
	async function handleSignOut() {
		await signOut();
		router.push("/");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
			className: "focus-visible:ring-ring rounded-full outline-none focus-visible:ring-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar$1, {
				className: "size-9",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
					src: image || void 0,
					alt: name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
					className: "text-xs",
					children: name.charAt(0).toUpperCase()
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
			className: "min-w-56",
			align: "end",
			sideOffset: 8,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuGroup, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, {
					className: "p-0 font-normal",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 px-1 py-1.5 text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar$1, {
							className: "size-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
								src: image || void 0,
								alt: name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
								className: "text-xs",
								children: name.charAt(0).toUpperCase()
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid flex-1 text-left text-sm leading-tight",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate font-medium",
								children: name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground truncate text-xs",
								children: email
							})]
						})]
					})
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
					render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, { href: "/settings" }),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "size-4" }), common_nav_settings()]
				}),
				isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
					render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, { href: "/admin" }),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-4" }), common_systems_admin()]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
					onClick: handleSignOut,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" }), common_sign_sign_out_title()]
				})
			]
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
			href: "/settings/credits",
			className: "border-border/70 bg-muted/30 text-foreground hover:bg-muted/50 inline-flex h-8 items-center gap-1.5 rounded-full border px-2.5 text-xs font-medium tabular-nums transition-colors",
			"aria-label": common_nav_credits_remaining({ count: balanceLabel }),
			title: common_nav_credits_remaining({ count: balanceLabel }),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Coins, {
				className: "size-3.5 shrink-0 opacity-70",
				"aria-hidden": true
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: creditsQuery.isPending ? "text-muted-foreground animate-pulse" : "",
				children: balanceLabel
			})]
		})]
	});
}
//#endregion
export { ImageModeIcon as a, ObjectsSwapIcon as c, SiteUserMenu as d, GlobeIcon as i, PlusIcon as l, CloseIcon as n, MenuIcon as o, FilmIcon as r, MotionTransferIcon as s, ChevronDownIcon$1 as t, RaphaelLogo as u };
