import { o as __toESM } from "../_runtime.mjs";
import { at as require_jsx_runtime, ot as require_react } from "../_libs/@base-ui/react+[...].mjs";
import { $ as admin_generations_empty, G as admin_generations_all_scenes, H as admin_generations_actual_resolution, J as admin_generations_cost, K as admin_generations_all_statuses, Q as admin_generations_duration, Tc as genjutsu_estimate_credits, U as admin_generations_after, W as admin_generations_all_providers, X as admin_generations_description, Y as admin_generations_created_at, Z as admin_generations_details, _t as admin_generations_timeline, at as admin_generations_open_video, bt as admin_generations_video, ct as admin_generations_provider, dt as admin_generations_scene_genjutsu, et as admin_generations_file_type, ft as admin_generations_scene_hotel_lobby, gt as admin_generations_submission_unknown_hint, ht as admin_generations_status, it as admin_generations_mode, lt as admin_generations_reference_image, mt as admin_generations_source_video, nt as admin_generations_identifiers, ot as admin_generations_paid_user, pt as admin_generations_search_placeholder, q as admin_generations_before, rt as admin_generations_input_media, st as admin_generations_prompt, tt as admin_generations_generated_video, ut as admin_generations_requested_resolution, vt as admin_generations_title, xt as admin_generations_view, yt as admin_generations_user } from "./messages-B_Y80loh.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { i as apiGet } from "./api-client-BXIVLJCS.mjs";
import { o as keepPreviousData } from "../_libs/tanstack__query-core.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { A as Play, _t as Eye, at as Image, ht as Film, wt as Crown } from "../_libs/lucide-react.mjs";
import { t as Button$1 } from "./button-RkClB0x2.mjs";
import { n as CardContent, t as Card } from "./card-CJS2GQq6.mjs";
import { i as calculateGenjutsuCredits, o as estimateGenjutsuCredits } from "./pricing-C70Iy5jq.mjs";
import { t as DataTable } from "./data-table-DyOzopCq.mjs";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, t as Dialog$1 } from "./dialog-B11F4Fxp.mjs";
import { t as Badge } from "./badge-DVIKFGgX.mjs";
import { t as formatDateTime } from "./time-CeCxR6Sp.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select$1 } from "./select-D8V5MTA2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/generations-D3zXS2f5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PAGE_SIZE = 20;
var STATUSES = [
	"initiated",
	"sealing",
	"ready",
	"failed_preflight",
	"insufficient_credits",
	"reserving",
	"reserved",
	"submitting",
	"submitted",
	"completing",
	"completed",
	"submission_unknown",
	"refunding",
	"refunded"
];
function statusVariant(status) {
	if (status === "completed") return "default";
	if (status === "refunded" || status === "failed_preflight" || status === "submission_unknown") return "destructive";
	return "secondary";
}
function preferredThumbUrl(g) {
	return g.videoUrl || g.sourceVideoUrl || null;
}
function openPreviewFor(g) {
	if (!g.videoUrl && !g.sourceVideoUrl) return null;
	return {
		sourceUrl: g.sourceVideoUrl,
		resultUrl: g.videoUrl,
		view: g.videoUrl ? "after" : "before"
	};
}
/** Keeps the <video> DOM node stable across parent re-renders. */
var GenerationVideoThumb = (0, import_react.memo)(function GenerationVideoThumb({ thumbUrl, onOpen }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: onOpen,
		"aria-label": admin_generations_open_video(),
		className: "group relative block size-16 overflow-hidden rounded-md bg-black",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
			src: thumbUrl,
			muted: true,
			playsInline: true,
			preload: "metadata",
			className: "size-full object-cover transition duration-200 group-hover:scale-[1.03]"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/30",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "bg-background/90 text-foreground flex size-7 items-center justify-center rounded-full opacity-0 shadow transition group-hover:opacity-100",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-3.5 fill-current" })
			})
		})]
	});
});
function formatBytes(value) {
	if (value == null || !Number.isFinite(value) || value < 0) return "—";
	if (value < 1024) return `${value} B`;
	const units = [
		"KB",
		"MB",
		"GB"
	];
	let size = value / 1024;
	let unitIndex = 0;
	while (size >= 1024 && unitIndex < units.length - 1) {
		size /= 1024;
		unitIndex += 1;
	}
	return `${size >= 100 ? size.toFixed(0) : size.toFixed(1)} ${units[unitIndex]}`;
}
function isBillableResolution(value) {
	return value === "480p" || value === "720p" || value === "1080p";
}
/** Same list-rate estimate as GeneratorPanel on main (Higgsfield). */
function estimateCreditsFromSource(input) {
	if (input.providerCostUsd != null && Number.isFinite(input.providerCostUsd) && input.providerCostUsd > 0) try {
		return calculateGenjutsuCredits(input.providerCostUsd);
	} catch {}
	if (typeof input.durationSeconds !== "number" || !Number.isFinite(input.durationSeconds) || input.durationSeconds <= 0 || !isBillableResolution(input.resolution)) return null;
	try {
		return estimateGenjutsuCredits({
			durationSeconds: input.durationSeconds,
			resolution: input.resolution
		});
	} catch {
		return null;
	}
}
function CreditsCostCell({ costCredits, estimatedCredits, providerCostUsd }) {
	const estimate = estimatedCredits != null && estimatedCredits > 0 ? estimatedCredits : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "text-sm tabular-nums",
		children: [costCredits > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [costCredits.toLocaleString(), " cr"] }) : estimate != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: genjutsu_estimate_credits({ count: estimate.toLocaleString() }) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "0 cr" }), costCredits > 0 && estimate != null && estimate !== costCredits ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-muted-foreground text-xs",
			children: genjutsu_estimate_credits({ count: estimate.toLocaleString() })
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-muted-foreground text-xs",
			children: providerCostUsd == null ? "—" : `$${providerCostUsd.toFixed(4)}`
		})]
	});
}
function UploadedMediaCard({ media, label, onDuration }) {
	const [dimensions, setDimensions] = (0, import_react.useState)(null);
	const [duration, setDuration] = (0, import_react.useState)(null);
	const [loadError, setLoadError] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "overflow-hidden rounded-lg border",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-muted/30 flex items-center justify-between gap-3 border-b px-3 py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 items-center gap-2 text-sm font-medium",
					children: [media.kind === "video" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Film, { className: "size-4 shrink-0" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate",
						children: label
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted-foreground text-xs",
					children: formatBytes(media.contentLength)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-black",
				children: media.kind === "video" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
					src: media.url,
					controls: true,
					playsInline: true,
					preload: "metadata",
					className: "aspect-video max-h-[420px] w-full object-contain",
					onLoadedMetadata: (event) => {
						setLoadError(false);
						const video = event.currentTarget;
						if (video.videoWidth > 0 && video.videoHeight > 0) setDimensions(`${video.videoWidth}×${video.videoHeight}`);
						if (Number.isFinite(video.duration) && video.duration > 0) {
							setDuration(video.duration);
							onDuration?.(video.duration);
						}
					},
					onError: () => setLoadError(true)
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: media.url,
					alt: label,
					loading: "lazy",
					className: "max-h-[420px] w-full object-contain",
					onLoad: (event) => {
						setLoadError(false);
						const image = event.currentTarget;
						if (image.naturalWidth > 0 && image.naturalHeight > 0) setDimensions(`${image.naturalWidth}×${image.naturalHeight}`);
					},
					onError: () => setLoadError(true)
				})
			}),
			loadError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-destructive border-t px-3 py-2 text-xs",
				children: "Media could not be loaded (the R2 object may be missing or unavailable)."
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-x-4 gap-y-2 p-3 text-xs sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-muted-foreground",
						children: admin_generations_file_type()
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-0.5 font-mono",
						children: media.contentType || "—"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-muted-foreground",
						children: admin_generations_actual_resolution()
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-0.5 font-mono",
						children: dimensions || "—"
					})] }),
					media.kind === "video" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-muted-foreground",
						children: admin_generations_duration()
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-0.5 font-mono",
						children: duration == null ? "—" : `${duration.toFixed(2)}s`
					})] }) : null
				]
			})
		]
	});
}
/**
* Owns list/query state only. Kept out of dialog state so opening View /
* preview does not rebuild the table (and remount every <video> thumb).
*/
var GenerationsTable = (0, import_react.memo)(function GenerationsTable({ onOpenPreview, onOpenDetail }) {
	const [page, setPage] = (0, import_react.useState)(1);
	const [search, setSearch] = (0, import_react.useState)("");
	const [debouncedSearch, setDebouncedSearch] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("all");
	const [provider, setProvider] = (0, import_react.useState)("all");
	const [scene, setScene] = (0, import_react.useState)("all");
	(0, import_react.useEffect)(() => {
		const timer = setTimeout(() => setDebouncedSearch(search), 300);
		return () => clearTimeout(timer);
	}, [search]);
	(0, import_react.useEffect)(() => {
		setPage(1);
	}, [
		debouncedSearch,
		status,
		provider,
		scene
	]);
	const query = useQuery({
		queryKey: [
			"admin-generations",
			page,
			debouncedSearch,
			status,
			provider,
			scene
		],
		queryFn: () => {
			const params = new URLSearchParams({
				page: String(page),
				pageSize: String(PAGE_SIZE)
			});
			if (debouncedSearch) params.set("search", debouncedSearch);
			if (status !== "all") params.set("status", status);
			if (provider !== "all") params.set("provider", provider);
			if (scene !== "all") params.set("scene", scene);
			return apiGet(`/api/admin/generations?${params.toString()}`);
		},
		placeholderData: keepPreviousData
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
		columns: (0, import_react.useMemo)(() => [
			{
				header: admin_generations_video(),
				className: "w-[120px]",
				cell: (g) => {
					const thumbUrl = preferredThumbUrl(g);
					if (!thumbUrl) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-muted text-muted-foreground flex size-16 items-center justify-center rounded-md",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Film, { className: "size-5 opacity-60" })
					});
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenerationVideoThumb, {
						thumbUrl,
						onOpen: () => {
							const next = openPreviewFor(g);
							if (next) onOpenPreview(next);
						}
					});
				}
			},
			{
				header: admin_generations_user(),
				cell: (g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-[180px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate",
							children: g.userName || "—"
						}), g.isPaid ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, {
							className: "size-3.5 shrink-0 text-amber-500",
							"aria-label": admin_generations_paid_user()
						}) : null]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-muted-foreground text-xs",
						children: g.userEmail
					})]
				})
			},
			{
				header: admin_generations_mode(),
				cell: (g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: g.mode || "—" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-muted-foreground text-xs",
							children: [g.resolution, g.aspectRatio].filter(Boolean).join(" · ") || "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-muted-foreground mt-1 text-[11px]",
							children: g.scene === "hotel-lobby" ? admin_generations_scene_hotel_lobby() : admin_generations_scene_genjutsu()
						})
					]
				})
			},
			{
				header: admin_generations_status(),
				cell: (g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-[260px]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: statusVariant(g.status),
							children: g.status
						}),
						g.attemptStage ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-muted-foreground mt-1 text-xs",
							children: ["stage: ", g.attemptStage]
						}) : null,
						g.failureStage ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-muted-foreground mt-1 text-xs",
							children: ["failed at: ", g.failureStage]
						}) : null,
						g.errorCode || g.providerCode ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-muted-foreground mt-1 font-mono text-xs",
							children: [
								[g.errorCode, g.providerCode].filter(Boolean).join(" · "),
								g.errorFileType ? ` · ${g.errorFileType}${g.errorFileIndex != null ? ` #${g.errorFileIndex}` : ""}` : "",
								g.errorHttpStatus != null ? ` · HTTP ${g.errorHttpStatus}` : ""
							]
						}) : null,
						g.uploadAttemptCount != null || g.uploadElapsedMs != null || g.r2ObjectExists != null || g.r2InspectionStatus || g.uploadRecovered || g.uploadRetrySuccessCount || g.uploadBrowser || g.uploadOs ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-muted-foreground mt-1 font-mono text-xs",
							title: g.r2InspectionError || void 0,
							children: [
								g.uploadAttemptCount != null ? `${g.uploadAttemptCount}x` : null,
								g.uploadElapsedMs != null ? `${g.uploadElapsedMs}ms` : null,
								g.r2InspectionStatus === "error" ? "r2 inspect error" : g.r2InspectionStatus === "skipped" ? "r2 inspect skipped" : g.r2ObjectExists == null ? null : g.r2ObjectExists ? g.r2ObjectSizeMatches === false ? "r2 size mismatch" : g.r2ObjectTypeMatches === false ? "r2 type mismatch" : "r2 exists" : "r2 missing",
								g.uploadRecovered ? "recovered" : null,
								g.uploadRetrySuccessCount ? `retry-ok ${g.uploadRetrySuccessCount}` : null,
								[g.uploadBrowser, g.uploadOs].filter(Boolean).join("/"),
								g.uploadOnline == null ? null : g.uploadOnline ? "online" : "offline"
							].filter(Boolean).join(" · ")
						}) : null,
						g.error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-muted-foreground mt-1 truncate text-xs",
							title: g.error,
							children: g.error
						}) : g.providerStatus ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-muted-foreground mt-1 text-xs",
							children: g.providerStatus
						}) : null
					]
				})
			},
			{
				header: admin_generations_cost(),
				className: "w-[130px]",
				cell: (g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditsCostCell, {
					costCredits: g.costCredits,
					estimatedCredits: g.estimatedCredits,
					providerCostUsd: g.providerCostUsd
				})
			},
			{
				header: admin_generations_created_at(),
				cell: (g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted-foreground text-sm",
					children: formatDateTime(g.createdAt)
				})
			},
			{
				header: "",
				className: "w-[92px]",
				cell: (g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
					type: "button",
					size: "sm",
					variant: "outline",
					onClick: () => onOpenDetail(g),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "mr-1 size-3.5" }), admin_generations_view()]
				})
			}
		], [onOpenDetail, onOpenPreview]),
		data: query.data?.items ?? [],
		total: query.data?.total ?? 0,
		page,
		pageSize: PAGE_SIZE,
		onPageChange: setPage,
		rowKey: (g) => g.id,
		emptyText: admin_generations_empty(),
		search,
		onSearchChange: setSearch,
		searchPlaceholder: admin_generations_search_placeholder(),
		toolbar: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select$1, {
					value: scene,
					onValueChange: (value) => setScene(value || "all"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						className: "h-8 w-[140px]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "all",
							children: admin_generations_all_scenes()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "genjutsu",
							children: admin_generations_scene_genjutsu()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "hotel-lobby",
							children: admin_generations_scene_hotel_lobby()
						})
					] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select$1, {
					value: provider,
					onValueChange: (value) => setProvider(value || "all"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						className: "h-8 w-[130px]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "all",
							children: admin_generations_all_providers()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "seedance",
							children: "Seedance"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "higgsfield",
							children: "Higgsfield"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "fal",
							children: "Fal"
						})
					] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select$1, {
					value: status,
					onValueChange: (value) => setStatus(value || "all"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						className: "h-8 w-[170px]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: "all",
						children: admin_generations_all_statuses()
					}), STATUSES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: item,
						children: item
					}, item))] })]
				})
			]
		}),
		onRefresh: () => query.refetch(),
		loading: query.isFetching
	}) }) });
});
function GenerationsPage() {
	const [preview, setPreview] = (0, import_react.useState)(null);
	const [detail, setDetail] = (0, import_react.useState)(null);
	const [probedSourceDuration, setProbedSourceDuration] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		setProbedSourceDuration(null);
	}, [detail?.id]);
	const detailEstimatedCredits = (0, import_react.useMemo)(() => {
		if (!detail) return null;
		if (detail.estimatedCredits != null && detail.estimatedCredits > 0) return detail.estimatedCredits;
		return estimateCreditsFromSource({
			durationSeconds: detail.sourceDurationSeconds ?? probedSourceDuration,
			resolution: detail.resolution,
			providerCostUsd: detail.providerCostUsd
		});
	}, [detail, probedSourceDuration]);
	const activePreviewUrl = preview?.view === "after" ? preview.resultUrl || preview.sourceUrl : preview?.sourceUrl || preview?.resultUrl;
	const canToggle = Boolean(preview?.sourceUrl) && Boolean(preview?.resultUrl);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold",
				children: admin_generations_title()
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: admin_generations_description()
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenerationsTable, {
				onOpenPreview: setPreview,
				onOpenDetail: setDetail
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
				open: Boolean(detail),
				onOpenChange: (open) => {
					if (!open) setDetail(null);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-h-[92vh] overflow-y-auto sm:max-w-6xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: admin_generations_details() }) }), detail ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 rounded-lg border p-4 text-sm md:grid-cols-2 xl:grid-cols-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-muted-foreground text-xs",
											children: "User"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-1 flex items-center gap-1.5 font-medium",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: detail.userName || "—" }), detail.isPaid ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, {
												className: "size-3.5 shrink-0 text-amber-500",
												"aria-label": admin_generations_paid_user()
											}) : null]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-muted-foreground text-xs break-all",
											children: detail.userEmail
										})
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-muted-foreground text-xs",
											children: admin_generations_identifiers()
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-1 font-mono text-xs break-all",
											children: ["generation: ", detail.id]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-muted-foreground mt-1 font-mono text-xs break-all",
											children: ["request: ", detail.taskId || "—"]
										})
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-muted-foreground text-xs",
											children: admin_generations_provider()
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-1",
											children: detail.provider || "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-muted-foreground text-xs",
											children: detail.model || "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-muted-foreground mt-1 text-xs",
											children: detail.scene === "hotel-lobby" ? admin_generations_scene_hotel_lobby() : admin_generations_scene_genjutsu()
										})
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-muted-foreground text-xs",
											children: admin_generations_mode()
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-1",
											children: detail.mode || "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-muted-foreground text-xs",
											children: [
												admin_generations_requested_resolution(),
												":",
												" ",
												[detail.resolution, detail.aspectRatio].filter(Boolean).join(" · ") || "—"
											]
										})
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-muted-foreground text-xs",
											children: admin_generations_status()
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-1",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												variant: statusVariant(detail.status),
												children: detail.status
											})
										}),
										detail.status === "submission_unknown" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-destructive mt-1 text-xs",
											children: admin_generations_submission_unknown_hint()
										}) : null,
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-muted-foreground mt-1 text-xs",
											children: ["stage: ", detail.attemptStage || "—"]
										})
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-muted-foreground text-xs",
										children: admin_generations_cost()
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditsCostCell, {
											costCredits: detail.costCredits,
											estimatedCredits: detailEstimatedCredits,
											providerCostUsd: detail.providerCostUsd
										})
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-muted-foreground text-xs",
										children: admin_generations_duration()
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 font-mono",
										children: (detail.sourceDurationSeconds ?? probedSourceDuration) == null ? "—" : `${(detail.sourceDurationSeconds ?? probedSourceDuration).toFixed(2)}s`
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-muted-foreground text-xs",
											children: admin_generations_timeline()
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-1 text-xs",
											children: formatDateTime(detail.createdAt)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-muted-foreground mt-1 text-xs",
											children: ["updated ", formatDateTime(detail.updatedAt)]
										})
									] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-medium",
								children: admin_generations_prompt()
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "bg-muted/40 mt-2 rounded-lg border p-3 text-sm break-words whitespace-pre-wrap",
								children: detail.prompt || "—"
							})] }),
							detail.uploadAttemptCount != null || detail.uploadErrorMessage || detail.uploadBrowser || detail.uploadOs || detail.uploadHost || detail.uploadCfCountry ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3 rounded-lg border p-4 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-medium",
										children: "Upload diagnostics"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-x-6 gap-y-3 md:grid-cols-2 xl:grid-cols-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-muted-foreground text-xs",
												children: "Client"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-1 font-mono text-xs",
												children: [
													detail.uploadBrowser ? `${detail.uploadBrowser}${detail.uploadBrowserMajor != null ? ` ${detail.uploadBrowserMajor}` : ""}` : null,
													detail.uploadOs,
													detail.uploadIsWebView ? "WebView" : null,
													detail.uploadInAppBrowser ? `in-app: ${detail.uploadInAppBrowser}` : null
												].filter(Boolean).join(" · ") || "—"
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-muted-foreground text-xs",
												children: "Network"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-1 font-mono text-xs",
												children: [
													detail.uploadOnline == null ? null : detail.uploadOnline ? "online" : "offline",
													detail.uploadEffectiveType,
													detail.uploadRttMs != null ? `RTT ${detail.uploadRttMs}ms` : null,
													detail.uploadDownlinkMbps != null ? `${detail.uploadDownlinkMbps} Mbps` : null
												].filter(Boolean).join(" · ") || "—"
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-muted-foreground text-xs",
													children: "Route"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mt-1 font-mono text-xs break-all",
													children: ["origin: ", detail.uploadOrigin || "—"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-muted-foreground mt-1 font-mono text-xs break-all",
													children: ["host: ", detail.uploadHost || "—"]
												})
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-muted-foreground text-xs",
												children: "Cloudflare edge"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-1 font-mono text-xs",
												children: [
													detail.uploadCfCountry,
													detail.uploadCfColo,
													detail.uploadCfAsn != null ? `AS${detail.uploadCfAsn}` : null
												].filter(Boolean).join(" · ") || "—"
											})] })
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-muted/40 rounded-md p-3 font-mono text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											"error:",
											" ",
											[detail.uploadErrorName, detail.uploadErrorMessage].filter(Boolean).join(" · ") || "—"
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-muted-foreground mt-1",
											children: [
												"total:",
												" ",
												[
													detail.uploadAttemptCount != null ? `${detail.uploadAttemptCount} attempts` : null,
													detail.uploadElapsedMs != null ? `${detail.uploadElapsedMs}ms` : null,
													detail.r2InspectionStatus ? `R2 ${detail.r2InspectionStatus}` : null
												].filter(Boolean).join(" · ") || "—"
											]
										})]
									}),
									detail.uploadAttempts.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "overflow-x-auto rounded-md border",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
											className: "w-full text-left text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
												className: "bg-muted/50",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
														className: "px-3 py-2 font-medium",
														children: "Attempt"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
														className: "px-3 py-2 font-medium",
														children: "Elapsed"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
														className: "px-3 py-2 font-medium",
														children: "Status"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
														className: "px-3 py-2 font-medium",
														children: "Error"
													})
												] })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: detail.uploadAttempts.map((attempt) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
												className: "border-t",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
														className: "px-3 py-2",
														children: ["#", attempt.attempt]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
														className: "px-3 py-2",
														children: [attempt.elapsedMs, "ms"]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "px-3 py-2",
														children: attempt.httpStatus != null ? `HTTP ${attempt.httpStatus}` : "network"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "px-3 py-2",
														children: [attempt.errorName, attempt.errorMessage].filter(Boolean).join(" · ") || "—"
													})
												]
											}, attempt.attempt)) })]
										})
									}) : null
								]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-sm font-medium",
										children: admin_generations_input_media()
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-muted-foreground text-xs",
										children: [
											detail.inputMedia.length,
											" file",
											detail.inputMedia.length === 1 ? "" : "s"
										]
									})]
								}), detail.inputMedia.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid gap-4 lg:grid-cols-2",
									children: detail.inputMedia.map((media) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UploadedMediaCard, {
										media,
										label: media.kind === "video" ? admin_generations_source_video() : admin_generations_reference_image({ index: media.index }),
										onDuration: media.kind === "video" ? setProbedSourceDuration : void 0
									}, media.index))
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-muted-foreground rounded-lg border p-4 text-sm",
									children: "No uploaded media metadata is available for this record."
								})]
							}),
							detail.videoUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm font-medium",
									children: admin_generations_generated_video()
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
									src: detail.videoUrl,
									controls: true,
									playsInline: true,
									preload: "metadata",
									className: "max-h-[560px] w-full rounded-lg bg-black object-contain"
								})]
							}) : null
						]
					}) : null]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
				open: Boolean(preview),
				onOpenChange: (open) => {
					if (!open) setPreview(null);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "overflow-hidden p-0 sm:max-w-4xl",
					showCloseButton: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
						className: "space-y-3 px-4 pt-4 pr-12",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: preview?.view === "before" ? admin_generations_before() : admin_generations_after() }), canToggle ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-muted flex w-fit gap-1 rounded-lg p-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
								type: "button",
								size: "sm",
								variant: preview?.view === "before" ? "default" : "ghost",
								className: cn("h-7 px-3", preview?.view !== "before" && "text-muted-foreground"),
								onClick: () => setPreview((current) => current ? {
									...current,
									view: "before"
								} : current),
								children: admin_generations_before()
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
								type: "button",
								size: "sm",
								variant: preview?.view === "after" ? "default" : "ghost",
								className: cn("h-7 px-3", preview?.view !== "after" && "text-muted-foreground"),
								onClick: () => setPreview((current) => current ? {
									...current,
									view: "after"
								} : current),
								children: admin_generations_after()
							})]
						}) : null]
					}), activePreviewUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
						src: activePreviewUrl,
						controls: true,
						autoPlay: true,
						playsInline: true,
						className: "max-h-[75vh] w-full bg-black object-contain"
					}, `${preview?.view}-${activePreviewUrl}`) : null]
				})
			})
		]
	});
}
//#endregion
export { GenerationsPage as component };
