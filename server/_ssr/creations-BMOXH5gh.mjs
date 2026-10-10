import { o as __toESM } from "../_runtime.mjs";
import { at as require_jsx_runtime, ot as require_react } from "../_libs/@base-ui/react+[...].mjs";
import { $s as creations_scene_genjutsu, Bs as creations_credits, Gs as creations_load_error, Hs as creations_empty_description, Js as creations_open_video, Qs as creations_refreshing, Us as creations_empty_title, Vs as creations_description, Ws as creations_generated_video, Xs as creations_previous, Ys as creations_page, Zs as creations_refresh_status, ac as creations_status_completed, cc as creations_status_unknown, dc as creations_view_video, ec as creations_scene_hotel_lobby, ic as creations_source_video, lc as creations_title, nc as creations_sign_in_description, oc as creations_status_failed, qs as creations_next, rc as creations_sign_in_title, sc as creations_status_processing, tc as creations_sign_in, uc as creations_untitled, zs as creations_create } from "./messages-B_Y80loh.mjs";
import { t as Link$1 } from "./navigation-BgznuAML.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { v as useSession } from "./client-xUgmZoCV.mjs";
import { i as apiGet } from "./api-client-BXIVLJCS.mjs";
import { o as keepPreviousData } from "../_libs/tanstack__query-core.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { A as Play, K as LoaderCircle, T as RefreshCw, _ as Sparkles, ht as Film } from "../_libs/lucide-react.mjs";
import { t as SiteFooter } from "./SiteFooter-Bjzgl7AX.mjs";
import { n as buttonVariants, t as Button$1 } from "./button-RkClB0x2.mjs";
import { t as SiteHeader } from "./SiteHeader-B2cCQXdM.mjs";
import { n as CardContent, t as Card } from "./card-CJS2GQq6.mjs";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, t as Dialog$1 } from "./dialog-B11F4Fxp.mjs";
import { t as Badge } from "./badge-DVIKFGgX.mjs";
import { t as formatDateTime } from "./time-CeCxR6Sp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/creations-BMOXH5gh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PAGE_SIZE = 12;
var AUTO_POLL_INTERVAL_MS = 4e3;
/** Match server min-interval on status routes (per pathname + user). */
var STATUS_ROUTE_GAP_MS = 1100;
var sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
var PROCESSING_STATUSES = new Set([
	"initiated",
	"sealing",
	"ready",
	"reserving",
	"reserved",
	"submitting",
	"submitted",
	"completing",
	"submission_unknown",
	"refunding"
]);
function isProcessingStatus(status) {
	return PROCESSING_STATUSES.has(status);
}
function statusPathFor(generation) {
	return generation.scene === "hotel-lobby" ? `/api/hotel-lobby/status?generationId=${encodeURIComponent(generation.id)}` : `/api/genjutsu/status?generationId=${encodeURIComponent(generation.id)}`;
}
function statusLabel(status) {
	if (status === "completed") return creations_status_completed();
	if (status === "refunded" || status === "failed_preflight" || status === "insufficient_credits") return creations_status_failed();
	if (isProcessingStatus(status)) return creations_status_processing();
	return creations_status_unknown();
}
function statusVariant(status) {
	if (status === "completed") return "default";
	if (status === "refunded" || status === "failed_preflight" || status === "insufficient_credits") return "destructive";
	return "secondary";
}
function VideoThumb({ src, label, onOpen, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: onOpen,
		"aria-label": creations_open_video(),
		className: cn("group relative block size-full overflow-hidden bg-black text-left", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				src,
				muted: true,
				playsInline: true,
				preload: "metadata",
				className: "size-full object-cover transition duration-200 group-hover:scale-[1.02]"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent px-2 py-1.5 text-[11px] font-medium text-white",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/25",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "bg-background/90 text-foreground flex size-9 items-center justify-center rounded-full opacity-0 shadow transition group-hover:opacity-100",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4 fill-current" })
				})
			})
		]
	});
}
function GenerationCard({ generation, onRefresh, refreshing, onPreview }) {
	const completed = generation.status === "completed" && generation.videoUrl;
	const failed = generation.status === "refunded" || generation.status === "failed_preflight" || generation.status === "insufficient_credits";
	const sourceUrl = generation.sourceVideoUrl;
	const resultUrl = generation.videoUrl;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "overflow-hidden py-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-muted relative aspect-video overflow-hidden",
			children: [completed && sourceUrl && resultUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid size-full grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoThumb, {
					src: sourceUrl,
					label: creations_source_video(),
					onOpen: () => onPreview({
						url: sourceUrl,
						title: creations_source_video()
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoThumb, {
					src: resultUrl,
					label: creations_generated_video(),
					onOpen: () => onPreview({
						url: resultUrl,
						title: creations_generated_video()
					})
				})]
			}) : completed && resultUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoThumb, {
				src: resultUrl,
				label: creations_generated_video(),
				onOpen: () => onPreview({
					url: resultUrl,
					title: creations_generated_video()
				})
			}) : failed && sourceUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoThumb, {
				src: sourceUrl,
				label: creations_source_video(),
				onOpen: () => onPreview({
					url: sourceUrl,
					title: creations_source_video()
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-muted-foreground flex size-full flex-col items-center justify-center gap-3 p-6 text-center",
				children: [failed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Film, { className: "size-9 opacity-60" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-9 animate-spin opacity-60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm font-medium",
					children: statusLabel(generation.status)
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: statusVariant(generation.status),
				className: "absolute top-3 right-3 z-10",
				children: statusLabel(generation.status)
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "space-y-4 p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "line-clamp-2 min-h-10 text-sm font-semibold",
						title: generation.prompt || void 0,
						children: generation.prompt || creations_untitled()
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-muted-foreground mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: generation.scene === "hotel-lobby" ? creations_scene_hotel_lobby() : creations_scene_genjutsu() }),
							generation.mode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: generation.mode }) : null,
							generation.resolution ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: generation.resolution }) : null,
							generation.aspectRatio ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: generation.aspectRatio }) : null,
							generation.duration != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [generation.duration, "s"] }) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: creations_credits({ count: generation.costCredits }) })
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-muted-foreground flex items-center justify-between gap-3 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatDateTime(generation.createdAt) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono",
						children: generation.id.slice(0, 8)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2",
					children: completed && resultUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
						variant: "outline",
						onClick: () => onPreview({
							url: resultUrl,
							title: creations_generated_video()
						}),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4" }), creations_view_video()]
					}) : failed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
						href: "/",
						className: buttonVariants({ variant: "outline" }),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" }), creations_create()]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
						variant: "outline",
						onClick: () => onRefresh(generation),
						disabled: refreshing,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: refreshing ? "size-4 animate-spin" : "size-4" }), refreshing ? creations_refreshing() : creations_refresh_status()]
					})
				})
			]
		})]
	});
}
function CreationsPage() {
	const [page, setPage] = (0, import_react.useState)(1);
	const [preview, setPreview] = (0, import_react.useState)(null);
	const { data: session, isPending: sessionPending } = useSession();
	const queryClient = useQueryClient();
	const userId = session?.user?.id;
	const query = useQuery({
		queryKey: [
			"user-generations",
			userId,
			page
		],
		queryFn: () => apiGet(`/api/user/generations?page=${page}&pageSize=${PAGE_SIZE}`),
		enabled: Boolean(userId),
		placeholderData: keepPreviousData
	});
	const processingGenerations = (0, import_react.useMemo)(() => (query.data?.items ?? []).filter((generation) => isProcessingStatus(generation.status)), [query.data?.items]);
	const processingKey = (0, import_react.useMemo)(() => processingGenerations.map((generation) => `${generation.scene}:${generation.id}`).join("|"), [processingGenerations]);
	const pollingRef = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (!userId || processingGenerations.length === 0) return;
		let cancelled = false;
		const pollOnce = async () => {
			if (cancelled || pollingRef.current || typeof document !== "undefined" && document.visibilityState === "hidden") return;
			pollingRef.current = true;
			try {
				const lastRequestAtByPath = /* @__PURE__ */ new Map();
				for (const generation of processingGenerations) {
					if (cancelled) return;
					const statusPath = statusPathFor(generation);
					const pathname = statusPath.split("?", 1)[0] || statusPath;
					const lastAt = lastRequestAtByPath.get(pathname) ?? 0;
					const waitMs = STATUS_ROUTE_GAP_MS - (Date.now() - lastAt);
					if (waitMs > 0) await sleep(waitMs);
					if (cancelled) return;
					try {
						await apiGet(statusPath);
					} catch {}
					lastRequestAtByPath.set(pathname, Date.now());
				}
				if (!cancelled) await queryClient.invalidateQueries({ queryKey: ["user-generations", userId] });
			} finally {
				pollingRef.current = false;
			}
		};
		pollOnce();
		const timer = window.setInterval(() => {
			pollOnce();
		}, AUTO_POLL_INTERVAL_MS);
		const onVisibility = () => {
			if (document.visibilityState === "visible") pollOnce();
		};
		document.addEventListener("visibilitychange", onVisibility);
		return () => {
			cancelled = true;
			window.clearInterval(timer);
			document.removeEventListener("visibilitychange", onVisibility);
		};
	}, [
		userId,
		processingKey,
		queryClient
	]);
	const refreshMutation = useMutation({
		mutationFn: (generation) => apiGet(statusPathFor(generation)),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["user-generations", userId] });
		}
	});
	const total = query.data?.total ?? 0;
	const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background text-foreground flex min-h-screen flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto w-full max-w-7xl flex-1 px-4 py-10 md:px-5 md:py-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl font-bold tracking-tight",
						children: creations_title()
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground mt-2 max-w-2xl text-sm md:text-base",
						children: creations_description()
					})] }), userId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
						href: "/",
						className: buttonVariants(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" }), creations_create()]
					}) : null]
				}), sessionPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-muted-foreground flex min-h-64 items-center justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-6 animate-spin" })
				}) : !userId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "mx-auto max-w-xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "flex flex-col items-center gap-4 p-8 text-center md:p-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Film, { className: "text-muted-foreground size-10" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl font-semibold",
								children: creations_sign_in_title()
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground mt-2 text-sm",
								children: creations_sign_in_description()
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
								href: "/sign-in",
								className: buttonVariants(),
								children: creations_sign_in()
							})
						]
					})
				}) : query.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-muted-foreground flex min-h-64 items-center justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-6 animate-spin" })
				}) : query.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-8 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-destructive text-sm",
						children: creations_load_error()
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
						className: "mt-4",
						variant: "outline",
						onClick: () => query.refetch(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-4" }), creations_refresh_status()]
					})]
				}) }) : total === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex min-h-72 flex-col items-center justify-center gap-4 p-8 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Film, { className: "text-muted-foreground size-12" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-semibold",
							children: creations_empty_title()
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground mt-2 text-sm",
							children: creations_empty_description()
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
							href: "/",
							className: buttonVariants(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" }), creations_create()]
						})
					]
				}) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
					children: (query.data?.items ?? []).map((generation) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenerationCard, {
						generation,
						onPreview: setPreview,
						onRefresh: (item) => refreshMutation.mutate(item),
						refreshing: refreshMutation.isPending && refreshMutation.variables?.id === generation.id
					}, generation.id))
				}), totalPages > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex items-center justify-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							variant: "outline",
							disabled: page <= 1 || query.isFetching,
							onClick: () => setPage((current) => Math.max(1, current - 1)),
							children: creations_previous()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground text-sm",
							children: creations_page({
								page,
								pages: totalPages
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							variant: "outline",
							disabled: page >= totalPages || query.isFetching,
							onClick: () => setPage((current) => Math.min(totalPages, current + 1)),
							children: creations_next()
						})
					]
				}) : null] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
				open: Boolean(preview),
				onOpenChange: (open) => {
					if (!open) setPreview(null);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "overflow-hidden p-0 sm:max-w-4xl",
					showCloseButton: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
						className: "px-4 pt-4 pr-12",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: preview?.title })
					}), preview ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
						src: preview.url,
						controls: true,
						autoPlay: true,
						playsInline: true,
						className: "max-h-[75vh] w-full bg-black object-contain"
					}, preview.url) : null]
				})
			})
		]
	});
}
//#endregion
export { CreationsPage as component };
