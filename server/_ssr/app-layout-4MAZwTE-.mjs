import { o as __toESM } from "../_runtime.mjs";
import { C as useRender, at as require_jsx_runtime, ot as require_react, tt as mergeProps } from "../_libs/@base-ui/react+[...].mjs";
import { c as getLocale, d as locales, f as localizeHref, m as setLocale } from "./ssr.mjs";
import { ao as common_nav_theme_system, as as common_sign_sign_out_title, io as common_nav_theme_light, ro as common_nav_theme_dark, to as common_nav_profile } from "./messages-B_Y80loh.mjs";
import { n as usePathname, r as useRouter$1, t as Link$1 } from "./navigation-BgznuAML.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { g as signOut, v as useSession } from "./client-xUgmZoCV.mjs";
import { i as apiGet } from "./api-client-BXIVLJCS.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as useUserPermissions } from "./use-user-permissions-C6K6gQfL.mjs";
import { n as AvatarFallback, r as AvatarImage, t as Avatar$1 } from "./avatar-ClZeTlv2.mjs";
import { $ as Languages, F as Palette, G as LogOut, Lt as Check, M as PanelLeft, Pt as ChevronRight, R as Moon, St as EllipsisVertical, m as Sun, o as User, z as Monitor } from "../_libs/lucide-react.mjs";
import { a as DropdownMenuLabel, c as DropdownMenuSubContent, i as DropdownMenuItem, l as DropdownMenuSubTrigger, n as DropdownMenuContent, o as DropdownMenuSeparator, r as DropdownMenuGroup, s as DropdownMenuSub, t as DropdownMenu, u as DropdownMenuTrigger } from "./dropdown-menu-7WHFSjMx.mjs";
import { t as Button$1 } from "./button-RkClB0x2.mjs";
import { a as SheetTitle, i as SheetHeader, n as SheetContent, r as SheetDescription, t as Sheet } from "./sheet-CnKXqjfE.mjs";
import { i as TooltipTrigger, n as TooltipContent, t as Tooltip$1 } from "./tooltip-gxwNe4KH.mjs";
import "./input-B6v4Jp25.mjs";
import "./separator-CAzkyqHq.mjs";
import { t as localeNames } from "./locale-ByAIRG7C.mjs";
import { n as z } from "../_libs/next-themes.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-layout-4MAZwTE-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MOBILE_BREAKPOINT = 768;
function useIsMobile() {
	const [isMobile, setIsMobile] = import_react.useState(void 0);
	import_react.useEffect(() => {
		const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
		const onChange = () => {
			setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		};
		mql.addEventListener("change", onChange);
		setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		return () => mql.removeEventListener("change", onChange);
	}, []);
	return !!isMobile;
}
var SIDEBAR_COOKIE_NAME = "sidebar_state";
var SIDEBAR_COOKIE_MAX_AGE = 3600 * 24 * 7;
var SIDEBAR_WIDTH = "16rem";
var SIDEBAR_WIDTH_MOBILE = "18rem";
var SIDEBAR_WIDTH_ICON = "3rem";
var SIDEBAR_KEYBOARD_SHORTCUT = "b";
var SidebarContext = import_react.createContext(null);
function useSidebar() {
	const context = import_react.useContext(SidebarContext);
	if (!context) throw new Error("useSidebar must be used within a SidebarProvider.");
	return context;
}
function SidebarProvider({ defaultOpen = true, open: openProp, onOpenChange: setOpenProp, className, style, children, ...props }) {
	const isMobile = useIsMobile();
	const [openMobile, setOpenMobile] = import_react.useState(false);
	const [_open, _setOpen] = import_react.useState(defaultOpen);
	const open = openProp ?? _open;
	const setOpen = import_react.useCallback((value) => {
		const openState = typeof value === "function" ? value(open) : value;
		if (setOpenProp) setOpenProp(openState);
		else _setOpen(openState);
		document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
	}, [setOpenProp, open]);
	const toggleSidebar = import_react.useCallback(() => {
		return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
	}, [
		isMobile,
		setOpen,
		setOpenMobile
	]);
	import_react.useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
				event.preventDefault();
				toggleSidebar();
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [toggleSidebar]);
	const state = open ? "expanded" : "collapsed";
	const contextValue = import_react.useMemo(() => ({
		state,
		open,
		setOpen,
		isMobile,
		openMobile,
		setOpenMobile,
		toggleSidebar
	}), [
		state,
		open,
		setOpen,
		isMobile,
		openMobile,
		setOpenMobile,
		toggleSidebar
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarContext.Provider, {
		value: contextValue,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-slot": "sidebar-wrapper",
			style: {
				"--sidebar-width": SIDEBAR_WIDTH,
				"--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
				...style
			},
			className: cn("group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar", className),
			...props,
			children
		})
	});
}
function Sidebar({ side = "left", variant = "sidebar", collapsible = "offcanvas", className, children, dir, ...props }) {
	const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
	if (collapsible === "none") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "sidebar",
		className: cn("flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground", className),
		...props,
		children
	});
	if (isMobile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open: openMobile,
		onOpenChange: setOpenMobile,
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
			dir,
			"data-sidebar": "sidebar",
			"data-slot": "sidebar",
			"data-mobile": "true",
			className: "w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden",
			style: { "--sidebar-width": SIDEBAR_WIDTH_MOBILE },
			side,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, {
				className: "sr-only",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: "Sidebar" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, { children: "Displays the mobile sidebar." })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-full w-full flex-col",
				children
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "group peer hidden text-sidebar-foreground md:block",
		"data-state": state,
		"data-collapsible": state === "collapsed" ? collapsible : "",
		"data-variant": variant,
		"data-side": side,
		"data-slot": "sidebar",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-slot": "sidebar-gap",
			className: cn("relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear", "group-data-[collapsible=offcanvas]:w-0", "group-data-[side=right]:rotate-180", variant === "floating" || variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-slot": "sidebar-container",
			"data-side": side,
			className: cn("fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear data-[side=left]:left-0 data-[side=left]:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] data-[side=right]:right-0 data-[side=right]:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)] md:flex", variant === "floating" || variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l", className),
			...props,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-sidebar": "sidebar",
				"data-slot": "sidebar-inner",
				className: "flex size-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:shadow-sm group-data-[variant=floating]:ring-1 group-data-[variant=floating]:ring-sidebar-border",
				children
			})
		})]
	});
}
function SidebarTrigger({ className, onClick, ...props }) {
	const { toggleSidebar } = useSidebar();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
		"data-sidebar": "trigger",
		"data-slot": "sidebar-trigger",
		variant: "ghost",
		size: "icon-sm",
		className: cn(className),
		onClick: (event) => {
			onClick?.(event);
			toggleSidebar();
		},
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLeft, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Toggle Sidebar"
		})]
	});
}
function SidebarInset({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		"data-slot": "sidebar-inset",
		className: cn("relative flex w-full flex-1 flex-col bg-background md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2", className),
		...props
	});
}
function SidebarHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "sidebar-header",
		"data-sidebar": "header",
		className: cn("flex flex-col gap-2 p-2", className),
		...props
	});
}
function SidebarFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "sidebar-footer",
		"data-sidebar": "footer",
		className: cn("flex flex-col gap-2 p-2", className),
		...props
	});
}
function SidebarContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "sidebar-content",
		"data-sidebar": "content",
		className: cn("no-scrollbar flex min-h-0 flex-1 flex-col gap-0 overflow-auto group-data-[collapsible=icon]:overflow-hidden", className),
		...props
	});
}
function SidebarGroup({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "sidebar-group",
		"data-sidebar": "group",
		className: cn("relative flex w-full min-w-0 flex-col p-2", className),
		...props
	});
}
function SidebarGroupLabel({ className, render, ...props }) {
	return useRender({
		defaultTagName: "div",
		props: mergeProps({ className: cn("flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 ring-sidebar-ring outline-hidden transition-[margin,opacity] duration-200 ease-linear group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", className) }, props),
		render,
		state: {
			slot: "sidebar-group-label",
			sidebar: "group-label"
		}
	});
}
function SidebarGroupContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "sidebar-group-content",
		"data-sidebar": "group-content",
		className: cn("w-full text-sm", className),
		...props
	});
}
function SidebarMenu({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		"data-slot": "sidebar-menu",
		"data-sidebar": "menu",
		className: cn("flex w-full min-w-0 flex-col gap-1", className),
		...props
	});
}
function SidebarMenuItem({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
		"data-slot": "sidebar-menu-item",
		"data-sidebar": "menu-item",
		className: cn("group/menu-item relative", className),
		...props
	});
}
var sidebarMenuButtonVariants = cva("peer/menu-button group/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm ring-sidebar-ring outline-hidden transition-[width,height,padding] group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-open:hover:bg-sidebar-accent data-open:hover:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:font-medium data-active:text-sidebar-accent-foreground [&_svg]:size-4 [&_svg]:shrink-0 [&>span:last-child]:truncate", {
	variants: {
		variant: {
			default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
			outline: "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"
		},
		size: {
			default: "h-8 text-sm",
			sm: "h-7 text-xs",
			lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function SidebarMenuButton({ render, isActive = false, variant = "default", size = "default", tooltip, className, ...props }) {
	const { isMobile, state } = useSidebar();
	const comp = useRender({
		defaultTagName: "button",
		props: mergeProps({ className: cn(sidebarMenuButtonVariants({
			variant,
			size
		}), className) }, props),
		render: !tooltip ? render : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, { render }),
		state: {
			slot: "sidebar-menu-button",
			sidebar: "menu-button",
			size,
			active: isActive
		}
	});
	if (!tooltip) return comp;
	if (typeof tooltip === "string") tooltip = { children: tooltip };
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip$1, { children: [comp, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, {
		side: "right",
		align: "center",
		hidden: state !== "collapsed" || isMobile,
		...tooltip
	})] });
}
function SidebarMenuSub({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		"data-slot": "sidebar-menu-sub",
		"data-sidebar": "menu-sub",
		className: cn("mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5 group-data-[collapsible=icon]:hidden", className),
		...props
	});
}
function SidebarMenuSubItem({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
		"data-slot": "sidebar-menu-sub-item",
		"data-sidebar": "menu-sub-item",
		className: cn("group/menu-sub-item relative", className),
		...props
	});
}
function SidebarMenuSubButton({ render, size = "md", isActive = false, className, ...props }) {
	return useRender({
		defaultTagName: "a",
		props: mergeProps({ className: cn("flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground ring-sidebar-ring outline-hidden group-data-[collapsible=icon]:hidden hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[size=md]:text-sm data-[size=sm]:text-xs data-active:bg-sidebar-accent data-active:text-sidebar-accent-foreground [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground", className) }, props),
		render,
		state: {
			slot: "sidebar-menu-sub-button",
			sidebar: "menu-sub-button",
			size,
			active: isActive
		}
	});
}
function AppSidebar({ brand, brandHref = "/", navItems, footerNavItems, footer }) {
	const pathname = usePathname();
	const groups = [];
	let currentGroup = "__initial__";
	for (const item of navItems) if (item.group !== currentGroup) {
		groups.push({
			label: item.group,
			items: [item]
		});
		currentGroup = item.group;
	} else groups[groups.length - 1].items.push(item);
	const isActiveHref = (href) => href === navItems[0]?.href ? pathname === href : pathname === href || pathname.startsWith(href + "/");
	const activeParents = () => {
		const set = /* @__PURE__ */ new Set();
		for (const item of navItems) if (item.items?.some((sub) => isActiveHref(sub.href))) set.add(item.href);
		return set;
	};
	const storageKey = `sidebar-open:${brandHref}`;
	const [openItems, setOpenItems] = (0, import_react.useState)(activeParents);
	(0, import_react.useEffect)(() => {
		let saved = null;
		try {
			saved = JSON.parse(localStorage.getItem(storageKey) || "null");
		} catch {}
		setOpenItems(() => {
			const next = saved ? new Set(saved) : /* @__PURE__ */ new Set();
			for (const href of activeParents()) next.add(href);
			return next;
		});
	}, [storageKey]);
	(0, import_react.useEffect)(() => {
		setOpenItems((prev) => {
			let changed = false;
			const next = new Set(prev);
			for (const href of activeParents()) if (!next.has(href)) {
				next.add(href);
				changed = true;
			}
			return changed ? next : prev;
		});
	}, [pathname]);
	function toggleItem(href) {
		setOpenItems((prev) => {
			const next = new Set(prev);
			if (next.has(href)) next.delete(href);
			else next.add(href);
			try {
				localStorage.setItem(storageKey, JSON.stringify([...next]));
			} catch {}
			return next;
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sidebar, {
		variant: "inset",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenu, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenuItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
				href: brandHref,
				className: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex-1 font-serif text-lg leading-none italic",
					children: brand
				})
			}) }) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarContent, { children: groups.map((group, gi) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SidebarGroup, { children: [group.label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarGroupLabel, { children: group.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarGroupContent, {
				className: "flex flex-col gap-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenu, { children: group.items.map((item) => {
					const Icon = item.icon;
					if (item.items?.length) {
						const open = openItems.has(item.href);
						const childActive = item.items.some((sub) => isActiveHref(sub.href));
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SidebarMenuItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SidebarMenuButton, {
							tooltip: item.label,
							isActive: childActive && !open,
							"aria-expanded": open,
							onClick: () => toggleItem(item.href),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: `text-muted-foreground ml-auto size-4 shrink-0 transition-transform ${open ? "rotate-90" : ""}` })
							]
						}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenuSub, { children: item.items.map((sub) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenuSubItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenuSubButton, {
							render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, { href: sub.href }),
							isActive: isActiveHref(sub.href),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: sub.label })
						}) }, sub.href)) })] }, item.href);
					}
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenuItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
						href: item.href,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SidebarMenuButton, {
							tooltip: item.label,
							isActive: isActiveHref(item.href),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label })]
						})
					}) }, item.href);
				}) })
			})] }, gi)) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SidebarFooter, { children: [footerNavItems && footerNavItems.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenu, { children: footerNavItems.map((item) => {
				const Icon = item.icon;
				const isActive = item.newTab ? false : item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
				const button = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SidebarMenuButton, {
					tooltip: item.label,
					isActive,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label })]
				});
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenuItem, { children: item.newTab ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: localizeHref(item.href),
					target: "_blank",
					rel: "noopener noreferrer",
					children: button
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
					href: item.href,
					children: button
				}) }, item.href);
			}) }), footer] })
		]
	});
}
function UserMenu({ name, email, image, profileHref }) {
	const router = useRouter$1();
	const locale = getLocale();
	const { theme, setTheme } = z();
	const { isMobile } = useSidebar();
	async function handleSignOut() {
		await signOut();
		router.push("/");
	}
	function handleLocaleSwitch(newLocale) {
		setLocale(newLocale);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenu, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenuItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
		className: "ring-sidebar-ring w-full rounded-lg outline-none focus-visible:ring-2 [&>div]:w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SidebarMenuButton, {
			size: "lg",
			render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {}),
			className: "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar$1, {
					className: "size-8 rounded-lg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
						src: image || void 0,
						alt: name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
						className: "rounded-lg text-xs",
						children: name.charAt(0).toUpperCase()
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid flex-1 text-left text-sm leading-tight",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate font-medium",
						children: name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-foreground/70 truncate text-xs",
						children: email
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EllipsisVertical, { className: "ml-auto size-4" })
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
		className: "min-w-56",
		side: isMobile ? "bottom" : "right",
		align: "end",
		sideOffset: 4,
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
							className: "rounded-lg text-xs",
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
			profileHref && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
				onClick: () => {
					window.open(localizeHref(profileHref), "_blank");
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-4" }), common_nav_profile()]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuSub, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuSubTrigger, {
				className: "gap-2 px-2 py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Languages, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex-1",
					children: localeNames[locale] || locale
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSubContent, { children: locales.map((loc) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
				onClick: () => handleLocaleSwitch(loc),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex-1",
					children: localeNames[loc] || loc
				}), loc === locale && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" })]
			}, loc)) })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuSub, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuSubTrigger, {
				className: "gap-2 px-2 py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Palette, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex-1",
					children: theme === "dark" ? common_nav_theme_dark() : theme === "light" ? common_nav_theme_light() : common_nav_theme_system()
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuSubContent, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
					onClick: () => setTheme("light"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "size-4" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex-1",
							children: common_nav_theme_light()
						}),
						theme === "light" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
					onClick: () => setTheme("dark"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-4" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex-1",
							children: common_nav_theme_dark()
						}),
						theme === "dark" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
					onClick: () => setTheme("system"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monitor, { className: "size-4" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex-1",
							children: common_nav_theme_system()
						}),
						theme === "system" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" })
					]
				})
			] })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
				onClick: handleSignOut,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" }), common_sign_sign_out_title()]
			})
		]
	})] }) }) });
}
function AppLayout({ children, navItems, footerNavItems, brand, brandHref = "/", mobileBrand, headerExtra, profileHref, requirePermission, unauthorizedRedirect = "/settings" }) {
	const { data: session, isPending } = useSession();
	const router = useRouter$1();
	const pathname = usePathname();
	const redirectingRef = (0, import_react.useRef)(false);
	const userInfoQuery = useQuery({
		queryKey: ["user-info"],
		queryFn: () => apiGet("/api/user/info"),
		staleTime: 6e4,
		enabled: !!session?.user
	});
	const needsInvite = userInfoQuery.data?.needsInvite === true;
	const membershipResolved = !session?.user || userInfoQuery.isSuccess || userInfoQuery.isError;
	const permissionsQuery = useUserPermissions(!!session?.user && !!requirePermission);
	const isAdmin = permissionsQuery.data?.isAdmin === true;
	const authorized = !!session?.user && membershipResolved && !needsInvite && (!requirePermission || isAdmin);
	(0, import_react.useEffect)(() => {
		if (isPending) return;
		if (!session?.user) {
			if (redirectingRef.current) return;
			redirectingRef.current = true;
			const callbackUrl = `${pathname}${typeof window !== "undefined" ? window.location.search : ""}`;
			router.push(`/sign-in?callbackUrl=${encodeURIComponent(callbackUrl)}`);
			return;
		}
		if (userInfoQuery.isPending) return;
		if (needsInvite) {
			if (!redirectingRef.current) {
				redirectingRef.current = true;
				router.push("/redeem-invite");
			}
			return;
		}
		if (!requirePermission) return;
		if (permissionsQuery.isPending) return;
		if (permissionsQuery.isError || !isAdmin) router.push(unauthorizedRedirect);
	}, [
		isPending,
		session,
		router,
		pathname,
		requirePermission,
		unauthorizedRedirect,
		userInfoQuery.isPending,
		needsInvite,
		permissionsQuery.isPending,
		permissionsQuery.isError,
		isAdmin
	]);
	if (isPending || !authorized || !session?.user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "bg-background flex min-h-screen items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "border-primary size-6 animate-spin rounded-full border-2 border-t-transparent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-muted-foreground text-sm",
				children: "Loading..."
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SidebarProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppSidebar, {
		brand,
		brandHref,
		navItems,
		footerNavItems,
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserMenu, {
			name: session.user.name || "User",
			email: session.user.email,
			image: session.user.image,
			profileHref
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SidebarInset, {
		className: "min-w-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex h-14 shrink-0 items-center gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-2 px-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarTrigger, { className: "-ml-1" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1" }),
				headerExtra && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-1 px-4",
					children: headerExtra
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "flex-1 overflow-auto",
			children
		})]
	})] });
}
//#endregion
export { AppLayout as t };
