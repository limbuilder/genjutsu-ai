import { o as __toESM } from "../_runtime.mjs";
import { at as require_jsx_runtime, ot as require_react } from "../_libs/@base-ui/react+[...].mjs";
import { c as getLocale, d as locales, m as setLocale } from "./ssr.mjs";
import { o as envConfigs } from "./schema-DWa8-2WU.mjs";
import { n as usePathname, t as Link$1 } from "./navigation-BgznuAML.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { _ as WORKSPACE_NAV, f as TEXT_TO_IMAGE_BADGES, g as TEXT_TO_IMAGE_POPULAR_MODELS, h as TEXT_TO_IMAGE_FEATURES, m as TEXT_TO_IMAGE_FAQS, p as TEXT_TO_IMAGE_EXPLORE, t as EXAMPLE_IMAGES } from "./content-aeUTqH7Y.mjs";
import { v as useSession } from "./client-xUgmZoCV.mjs";
import { $ as Languages, It as ChevronDown, Lt as Check, N as PanelLeftOpen, P as PanelLeftClose, V as Mic, Z as LayoutGrid, _ as Sparkles, at as Image, bt as Eraser, gt as FileVideo, i as Video, k as Plus, kt as Clapperboard, ot as ImagePlus, t as Wrench, u as Type, ut as Globe, yt as Expand, zt as Boxes } from "../_libs/lucide-react.mjs";
import { i as DropdownMenuItem, n as DropdownMenuContent, t as DropdownMenu, u as DropdownMenuTrigger } from "./dropdown-menu-7WHFSjMx.mjs";
import { d as SiteUserMenu } from "./site-user-menu-C3Ao0HTQ.mjs";
import { t as SiteFooter } from "./SiteFooter-Bjzgl7AX.mjs";
import { t as localeNames } from "./locale-ByAIRG7C.mjs";
import { i as StickyComposer, n as GeneratorPanel, r as PricingSection, t as FaqSection } from "./StickyComposer-Dtl4N-Oc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/text-to-image-BSD7BVVJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function GetInspired({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("py-16", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-center text-4xl font-semibold",
				children: "Get Inspired"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground text-center lg:text-lg",
				children: "Get inspired by what others are creating with Raphael"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "container mx-auto mt-10 px-4 sm:mt-12",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "columns-2 gap-4 md:columns-3 lg:columns-4",
				children: EXAMPLE_IMAGES.map((image) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: cn("mb-4 w-full break-inside-avoid border-0 bg-transparent p-0 text-left", "cursor-pointer transition-transform hover:scale-[1.02]"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "group relative overflow-hidden rounded-lg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: image.src,
							alt: image.alt,
							width: 1024,
							height: 1516,
							loading: "lazy",
							decoding: "async",
							className: "h-auto w-full transition-transform duration-300 group-hover:scale-105"
						})
					})
				}, image.src))
			})
		})]
	});
}
function displayName(model) {
	return model.name.replace(/^(\p{Emoji_Presentation}|\p{Extended_Pictographic})\s*/u, "");
}
function PopularModels({ className, title = "Popular Models", models = TEXT_TO_IMAGE_POPULAR_MODELS }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("-mx-2 py-14 sm:-mx-6 md:py-20 lg:-mx-10 xl:-mx-16 2xl:-mx-20", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto mb-10 max-w-4xl text-center md:mb-12",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-foreground text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl",
				children: title
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6",
			children: models.map((model) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "h-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
					href: model.href,
					className: "block h-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "group relative flex h-full flex-col gap-4 transition-transform duration-300 hover:-translate-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative aspect-[4/3] w-full overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.03] shadow-[0_28px_64px_-36px_rgba(0,0,0,0.84)] transition-all duration-300 group-hover:border-white/20 group-hover:shadow-[0_34px_72px_-32px_rgba(240,134,43,0.48)]",
							children: model.coverSrc ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: model.coverSrc,
								alt: displayName(model),
								loading: "lazy",
								decoding: "async",
								className: "absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
							}) : null
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "min-h-[52px] px-1 sm:px-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-foreground/80 text-[15px] leading-snug font-medium sm:text-base",
								children: model.description
							})
						})]
					})
				})
			}, `${model.name}-${model.href}`))
		})]
	});
}
function TextToImageFeatures({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("py-16", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-3xl text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-foreground text-3xl font-bold tracking-tight sm:text-4xl",
				children: "From a sentence to a finished image — every top text-to-image AI model in one place"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-foreground/70 mt-4 text-base leading-relaxed",
				children: "Free AI text to image generator with unlimited basic generation. Switch between GPT Image 2, Nano Banana 2, Seedream 5.0, and Seedream 3.5 Pro in one panel — from one line of description to finished images."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-12 grid gap-8 sm:grid-cols-2",
			children: TEXT_TO_IMAGE_FEATURES.map((feature) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-2xl border border-white/8 bg-white/[0.03] p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-foreground text-lg font-semibold",
					children: feature.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-foreground/65 mt-3 text-sm leading-relaxed",
					children: feature.description
				})]
			}, feature.title))
		})]
	});
}
function KeepExploring({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("py-16", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-foreground text-3xl font-bold tracking-tight sm:text-4xl",
				children: "Keep exploring Raphael"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-foreground/65 mt-3",
				children: "One account, the full image and video generation workflow."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-10 grid gap-4 sm:grid-cols-3",
			children: TEXT_TO_IMAGE_EXPLORE.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
				href: item.href,
				className: "group rounded-2xl border border-white/8 bg-white/[0.03] p-5 transition-colors hover:bg-white/[0.06]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-foreground group-hover:text-primary text-base font-semibold",
					children: item.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-foreground/60 mt-2 text-sm leading-relaxed",
					children: item.description
				})]
			}, item.href))
		})]
	});
}
function TextToImageCta({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: cn("relative left-1/2 w-screen -translate-x-1/2 py-16", "lg:w-[calc(100vw_-_var(--app-sidebar-width,240px))]", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-3xl px-4 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/logo.webp",
					alt: "",
					width: 48,
					height: 48,
					className: "mx-auto size-12 rounded-full"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-foreground mt-4 text-3xl font-bold tracking-tight sm:text-4xl",
					children: "Turn a single line into an image — start with Raphael AI"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "#t2i-generator",
					className: "mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-[rgb(204,144,92)] px-6 text-sm font-semibold text-[rgb(247,246,243)] transition hover:brightness-105",
					children: "Start Generating Images"
				})
			]
		})
	});
}
function LocaleSelector({ variant = "icon", className }) {
	const locale = getLocale();
	function handleSwitch(newLocale) {
		setLocale(newLocale);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
		className: cn("inline-flex items-center transition-colors outline-none", variant === "icon" ? "text-muted-foreground hover:bg-accent hover:text-accent-foreground size-8 justify-center rounded-md" : "h-9 gap-2 rounded-full border px-4 text-sm", className),
		children: variant === "icon" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Languages, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Switch language"
		})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "size-4" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: localeNames[locale] || locale }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4 opacity-70" })
		] })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuContent, {
		align: "end",
		children: locales.map((loc) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
			onClick: () => handleSwitch(loc),
			className: "flex items-center justify-between gap-2",
			children: [localeNames[loc] || loc, loc === locale && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" })]
		}, loc))
	})] });
}
var CATEGORY_ICONS = {
	image: Image,
	video: Video,
	sparkles: Sparkles,
	wrench: Wrench,
	boxes: Boxes
};
var TOOL_ICONS = {
	type: Type,
	"image-plus": ImagePlus,
	"file-video": FileVideo,
	clapperboard: Clapperboard,
	"layout-grid": LayoutGrid,
	expand: Expand,
	eraser: Eraser,
	upscaler: "upscaler",
	boxes: Boxes,
	mic: Mic
};
function UpscalerIcon({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		"aria-hidden": "true",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.8",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		className,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "2.5",
			y: "5",
			width: "19",
			height: "14",
			rx: "2"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8 12h8M12 8v8" })]
	});
}
function NavBadge({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex h-[17px] shrink-0 items-center rounded-[4px] px-[5px] text-[8px] leading-none font-black tracking-[0.04em] uppercase", "shadow-[inset_0_1px_0_rgba(255,255,255,0.10)]", String(children).includes("%") || String(children).startsWith("-") ? "bg-[#e05256] text-white" : "bg-primary/20 text-primary"),
		children
	});
}
function isPathActive(pathname, href) {
	if (!href || href === "#") return false;
	return pathname === href || pathname.startsWith(`${href}/`);
}
function categoryContainsPath(category, pathname) {
	if (isPathActive(pathname, category.href)) return true;
	if (category.modelSections) return WORKSPACE_NAV.imageModels.some((m) => isPathActive(pathname, m.href)) || WORKSPACE_NAV.videoModels.some((m) => isPathActive(pathname, m.href));
	return category.children?.some((c) => isPathActive(pathname, c.href)) ?? false;
}
function ToolIcon({ name, className }) {
	const icon = TOOL_ICONS[name];
	if (icon === "upscaler") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UpscalerIcon, { className });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(icon, { className });
}
function ModelRow({ model, collapsed }) {
	if (collapsed) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
		href: model.href,
		"data-workspace-sidebar-item-id": `model:${model.id}`,
		"data-workspace-sidebar-item-type": "model",
		className: "text-foreground/58 hover:text-foreground/88 relative flex items-center gap-1.5 rounded-md py-1.5 pr-2 pl-2 text-[12px] transition-colors hover:bg-white/[0.04]",
		children: [model.logo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: model.logo,
			alt: "",
			width: 14,
			height: 14,
			className: "h-3.5 w-3.5 shrink-0 rounded-[3px] object-contain"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "h-3.5 w-3.5 shrink-0 text-[13px] leading-none",
			children: model.emoji ?? "•"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "min-w-0 flex-1 leading-4 whitespace-nowrap",
			children: [model.label, model.badge ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ml-1 inline-flex shrink-0 items-center gap-0.5 align-middle",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavBadge, { children: model.badge })
			}) : null]
		})]
	});
}
function NestedRail({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "ml-3 space-y-0.5 border-l border-white/[0.08] pl-3",
		children
	});
}
function ToolRow({ tool, active }) {
	const className = cn("flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[12px] transition-colors", active ? "bg-primary/10 text-primary" : "text-foreground/58 hover:bg-white/[0.04] hover:text-foreground/88");
	const inner = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolIcon, {
			name: tool.icon,
			className: "h-3.5 w-3.5 shrink-0 opacity-70"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "line-clamp-2 min-w-0 flex-1 leading-4 break-words whitespace-normal",
			children: tool.label
		}),
		tool.badge ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavBadge, { children: tool.badge }) : null
	] });
	if (tool.external) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href: tool.href,
		target: "_blank",
		rel: "noopener noreferrer",
		"data-workspace-sidebar-item-id": `tool:${tool.id}`,
		"data-workspace-sidebar-item-type": "tool",
		className,
		children: inner
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
		href: tool.href,
		"data-workspace-sidebar-item-id": `tool:${tool.id}`,
		"data-workspace-sidebar-item-type": "tool",
		className,
		children: inner
	});
}
function CategoryBlock({ category, open, onToggle, collapsed, pathname }) {
	const Icon = CATEGORY_ICONS[category.icon];
	const hasPanel = Boolean(category.children?.length || category.modelSections);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
					href: category.href === "#" ? pathname : category.href,
					"data-workspace-sidebar-item-id": `category:${category.id}`,
					"data-workspace-sidebar-item-type": "category",
					title: collapsed ? category.label : void 0,
					className: cn("group/nav relative flex h-10 min-w-0 flex-1 items-center rounded-lg px-2.5 py-[9px] text-[13px] transition-all duration-150", collapsed ? "justify-center gap-0" : "justify-start gap-2.5", "text-foreground/80 hover:text-foreground hover:bg-white/[0.04]"),
					onClick: (e) => {
						if (category.href === "#") e.preventDefault();
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-[18px] w-[18px] shrink-0" }), !collapsed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate",
						children: category.label
					}) : null]
				}), !collapsed && hasPanel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"data-workspace-sidebar-item-id": `category_toggle:${category.id}`,
					"data-workspace-sidebar-item-type": "category_toggle",
					"aria-label": `Toggle ${category.label}`,
					onClick: onToggle,
					className: "text-foreground/40 hover:bg-muted/30 hover:text-foreground/70 flex h-8 w-8 shrink-0 items-center justify-center rounded-md transition-colors",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("h-4 w-4 transition-transform duration-200", open && "rotate-180") })
				}) : null]
			}),
			!collapsed && open && category.children ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NestedRail, { children: category.children.map((tool) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolRow, {
				tool,
				active: isPathActive(pathname, tool.href)
			}, tool.id)) }) : null,
			!collapsed && open && category.modelSections ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NestedRail, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-foreground/52 px-2 pt-0 pb-0.5 text-[10px] font-semibold tracking-wider uppercase first:pt-0",
					children: "Image Models"
				}),
				WORKSPACE_NAV.imageModels.map((model) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModelRow, { model }, model.id)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-foreground/52 px-2 pt-2 pb-0.5 text-[10px] font-semibold tracking-wider uppercase",
					children: "Video Models"
				}),
				WORKSPACE_NAV.videoModels.map((model) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModelRow, { model }, model.id))
			] }) : null
		]
	});
}
function WorkspaceSidebar({ className }) {
	const pathname = usePathname();
	const { data: session, isPending } = useSession();
	const user = session?.user;
	const [collapsed, setCollapsed] = (0, import_react.useState)(false);
	const [openIds, setOpenIds] = (0, import_react.useState)((0, import_react.useMemo)(() => {
		const open = /* @__PURE__ */ new Set();
		for (const cat of WORKSPACE_NAV.categories) if (categoryContainsPath(cat, pathname)) open.add(cat.id);
		if (open.size === 0) {
			open.add("image");
			open.add("models");
		} else if (!open.has("models") && pathname.includes("text-to-image")) open.add("models");
		return open;
	}, [pathname]));
	const toggle = (id) => {
		setOpenIds((prev) => {
			const next = new Set(prev);
			if (next.has(id)) next.delete(id);
			else next.add(id);
			return next;
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: cn("border-border/15 hidden h-[100dvh] flex-col border-r bg-[rgba(93,70,56,0.16)] backdrop-blur-xl", "transition-[width] duration-200 ease-out lg:sticky lg:top-0 lg:flex lg:shrink-0", collapsed ? "lg:w-[68px]" : "lg:w-[240px]", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-border/15 flex h-14 shrink-0 items-center justify-between border-b px-2 lg:px-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
					href: "/",
					className: cn("flex items-center overflow-hidden", collapsed ? "justify-center" : "justify-center lg:gap-2.5"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/logo.webp",
						alt: "Genjutsu AI",
						width: 24,
						height: 24,
						className: "h-6 w-6 shrink-0"
					}), !collapsed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-foreground hidden text-[15px] font-semibold whitespace-nowrap lg:inline",
						children: envConfigs.app_name
					}) : null]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					title: collapsed ? "Expand sidebar" : "Collapse sidebar",
					onClick: () => setCollapsed((v) => !v),
					className: "text-foreground/30 hover:bg-muted/40 hover:text-foreground/60 flex h-7 w-7 items-center justify-center rounded-md transition-colors",
					children: collapsed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLeftOpen, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLeftClose, { className: "h-4 w-4" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "scrollbar-hide min-h-0 flex-1 overflow-y-auto px-2 py-4 lg:px-3 lg:py-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
						href: WORKSPACE_NAV.createHref,
						"data-workspace-sidebar-item-id": "create",
						"data-workspace-sidebar-item-type": "create",
						title: collapsed ? "Create" : void 0,
						className: cn("group/create-entry text-foreground/68 hover:bg-muted/30 hover:text-foreground/90 mb-3 flex h-10 w-full shrink-0 items-center rounded-lg bg-white/[0.05] px-2.5 text-[13px] font-medium transition-colors", collapsed ? "justify-center gap-0" : "justify-center gap-2.5"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "text-primary/80 h-[18px] w-[18px] shrink-0" }), !collapsed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Create" }) : null]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-1",
						children: WORKSPACE_NAV.categories.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryBlock, {
							category,
							open: openIds.has(category.id),
							onToggle: () => toggle(category.id),
							collapsed,
							pathname
						}, category.id))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-border/15 shrink-0 border-t bg-[rgba(93,70,56,0.16)] px-3 py-3 backdrop-blur-xl",
				children: [!collapsed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-2.5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
						href: "/pricing",
						"aria-label": "Upgrade, -50% off",
						className: cn("group relative flex h-9 w-full items-center justify-center gap-1.5 overflow-visible rounded-xl px-3 text-[13px] font-semibold text-[#24170f]", "bg-[linear-gradient(135deg,#f0b06b,#d77b42)]", "shadow-[0_8px_18px_rgba(221,126,66,0.18)] transition-[transform,filter,box-shadow]", "hover:shadow-[0_10px_22px_rgba(221,126,66,0.24)] hover:brightness-105 active:scale-[0.98]"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 shrink-0" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate",
								children: "Upgrade"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "pointer-events-none absolute -top-3 -right-1.5 z-20 inline-flex h-4 min-w-[2.6rem] items-center justify-center rounded-[5px] bg-[#e05256] px-1.5 text-[9px] leading-none font-black whitespace-nowrap text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.10)]",
								children: "-50%"
							})
						]
					})
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("flex items-center gap-2", collapsed ? "flex-col" : "justify-end"),
					children: [
						!collapsed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-w-0 flex-1" }) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocaleSelector, {
							variant: "icon",
							className: "text-foreground/40 hover:bg-muted/40 hover:text-foreground/70 flex h-8 w-8 items-center justify-center rounded-lg transition-colors"
						}),
						!collapsed ? isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bg-muted/40 size-9 animate-pulse rounded-full",
							"aria-hidden": true
						}) : user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteUserMenu, {
							name: user.name || "User",
							email: user.email,
							image: user.image
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
							href: "/sign-in",
							className: "relative inline-flex h-10 items-center justify-center rounded-[10px] bg-[rgb(204,144,92)] px-4 text-sm font-medium text-[rgb(247,246,243)] transition-colors hover:bg-[rgb(190,130,80)]",
							children: "Sign In"
						}) : null
					]
				})]
			})
		]
	});
}
function WorkspaceShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background text-foreground relative flex min-h-screen",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceSidebar, { className: "z-20" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative flex min-h-screen min-w-0 flex-1 flex-col overflow-x-clip",
			children
		})]
	});
}
function TextToImagePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "border-border/15 flex items-center justify-between gap-3 border-b px-4 py-3 lg:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
					href: "/",
					className: "flex items-center gap-2 lg:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/logo.webp",
						alt: "",
						width: 28,
						height: 28,
						className: "size-7 rounded-full"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-bold text-[rgb(249,166,57)]",
						children: envConfigs.app_name
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ml-auto flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
						href: "/settings/history",
						className: "text-foreground/70 hover:text-foreground hidden rounded-lg px-3 py-1.5 text-sm sm:inline-flex",
						children: "History →"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
						href: "/pricing",
						className: "text-foreground inline-flex items-center gap-1.5 rounded-lg bg-[rgba(120,87,60,0.4)] px-3 py-1.5 text-sm font-semibold",
						children: ["Upgrade", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-[4px] bg-[#e05256] px-1.5 py-0.5 text-[9px] font-black text-white",
							children: "-50%"
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "relative min-h-screen flex-1 overflow-x-clip px-0 py-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto w-full max-w-6xl px-6 pb-0 sm:px-8 lg:px-10 xl:px-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto max-w-3xl text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-foreground text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl",
									children: "AI Text to Image Generator"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-foreground/70 mt-4 text-base leading-relaxed sm:text-lg",
									children: "Generate images from text with GPT Image 2, Nano Banana 2, Seedream 5, and Seedream 3.5 Pro — choose a model, set your aspect ratio, and download HD results."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-5 flex flex-wrap items-center justify-center gap-2",
									children: TEXT_TO_IMAGE_BADGES.map((badge) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "inline-flex h-[27px] items-center rounded-full border border-[rgba(245,158,11,0.2)] bg-[rgba(245,158,11,0.1)] px-2.5 text-[11px] font-medium text-[rgb(245,158,11)]",
										children: badge
									}, badge))
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							id: "t2i-generator",
							className: "mx-auto mt-8 max-w-[1128px] scroll-mt-24",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GeneratorPanel, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopularModels, { className: "mt-14" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GetInspired, { className: "mt-8" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextToImageFeatures, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeepExploring, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PricingSection, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaqSection, {
							items: TEXT_TO_IMAGE_FAQS,
							title: "FAQs"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextToImageCta, {})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StickyComposer, { observeId: "t2i-generator" })
		]
	}) });
}
//#endregion
export { TextToImagePage as component };
