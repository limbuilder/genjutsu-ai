import { o as __toESM } from "../_runtime.mjs";
import { at as require_jsx_runtime, ot as require_react } from "../_libs/@base-ui/react+[...].mjs";
import { Al as settings_billing_provider, Cl as settings_billing_end_time, Dl as settings_billing_period_end, El as settings_billing_no_subscription, Fl as settings_billing_subscription_details, Il as settings_billing_subscription_no, Ll as settings_billing_title, Ml as settings_billing_status, Nl as settings_billing_subscribe, Ol as settings_billing_period_start, Pl as settings_billing_subscription, Rl as settings_billing_view, Sl as settings_billing_description, Tl as settings_billing_interval, _l as settings_billing_canceled_reason, al as settings_billing_actions_col, bl as settings_billing_current_period, cl as settings_billing_cancel, dl as settings_billing_cancel_description, fl as settings_billing_cancel_failed, gl as settings_billing_canceled_end_at, hl as settings_billing_canceled_at, jl as settings_billing_renews_on, kl as settings_billing_plan, ll as settings_billing_cancel_back, ml as settings_billing_cancel_title, ol as settings_billing_adjust, pl as settings_billing_cancel_success, sl as settings_billing_amount, ul as settings_billing_cancel_confirm, vl as settings_billing_canceling, wl as settings_billing_ends_on, xl as settings_billing_date, yl as settings_billing_close } from "./messages-B_Y80loh.mjs";
import { t as Link$1 } from "./navigation-BgznuAML.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { i as apiGet, o as apiPost, t as ApiError } from "./api-client-BXIVLJCS.mjs";
import { o as keepPreviousData } from "../_libs/tanstack__query-core.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { At as CircleX, _t as Eye, j as Pencil, xt as Ellipsis } from "../_libs/lucide-react.mjs";
import { i as DropdownMenuItem, n as DropdownMenuContent, t as DropdownMenu, u as DropdownMenuTrigger } from "./dropdown-menu-7WHFSjMx.mjs";
import { n as buttonVariants, t as Button$1 } from "./button-RkClB0x2.mjs";
import { a as CardHeader, n as CardContent, o as CardTitle, t as Card } from "./card-CJS2GQq6.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as DataTable } from "./data-table-DyOzopCq.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog$1 } from "./dialog-B11F4Fxp.mjs";
import { t as Badge } from "./badge-DVIKFGgX.mjs";
import { t as tDynamic } from "./dynamic-B_Qghgly.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/billing-CjD4-gTt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TABS = [
	"all",
	"active",
	"trialing",
	"paused",
	"expired",
	"pending_cancel",
	"canceled"
];
var PAGE_SIZE = 20;
function formatAmount(amount, currency) {
	const normalized = (currency || "usd").toUpperCase();
	return new Intl.NumberFormat(void 0, {
		style: "currency",
		currency: normalized
	}).format(amount / 100);
}
function statusVariant(status) {
	const s = (status || "").toLowerCase();
	if (s === "active" || s === "trialing") return "default";
	if (s === "canceled" || s === "expired") return "destructive";
	return "secondary";
}
function isCancellable(status) {
	const s = (status || "").toLowerCase();
	return s === "active" || s === "trialing";
}
function BillingPage() {
	const queryClient = useQueryClient();
	const [tab, setTab] = (0, import_react.useState)("all");
	const [page, setPage] = (0, import_react.useState)(1);
	const [search, setSearch] = (0, import_react.useState)("");
	const [debouncedSearch, setDebouncedSearch] = (0, import_react.useState)("");
	const [viewing, setViewing] = (0, import_react.useState)(null);
	const [canceling, setCanceling] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const timer = setTimeout(() => setDebouncedSearch(search), 300);
		return () => clearTimeout(timer);
	}, [search]);
	(0, import_react.useEffect)(() => {
		setPage(1);
	}, [tab, debouncedSearch]);
	const currentQuery = useQuery({
		queryKey: ["billing", "current"],
		queryFn: () => apiGet("/api/user/subscriptions/current")
	});
	const current = currentQuery.data ?? null;
	const currentLoaded = !currentQuery.isPending;
	const listQuery = useQuery({
		queryKey: [
			"billing",
			"list",
			page,
			tab,
			debouncedSearch
		],
		queryFn: () => {
			const params = new URLSearchParams({
				page: String(page),
				pageSize: String(PAGE_SIZE)
			});
			if (tab !== "all") params.set("status", tab);
			if (debouncedSearch) params.set("search", debouncedSearch);
			return apiGet(`/api/user/subscriptions?${params}`);
		},
		placeholderData: keepPreviousData
	});
	const rows = listQuery.data?.items ?? [];
	const total = listQuery.data?.total ?? 0;
	const cancelMutation = useMutation({
		mutationFn: (subscriptionNo) => apiPost("/api/user/subscriptions/cancel", { subscriptionNo }),
		onSuccess: () => {
			toast.success(settings_billing_cancel_success());
			setCanceling(null);
			queryClient.invalidateQueries({ queryKey: ["billing"] });
		},
		onError: (err) => {
			toast.error(err instanceof ApiError ? err.message || settings_billing_cancel_failed() : settings_billing_cancel_failed());
		}
	});
	const submitting = cancelMutation.isPending;
	function confirmCancel() {
		if (!canceling) return;
		cancelMutation.mutate(canceling.subscriptionNo);
	}
	const columns = [
		{
			header: settings_billing_subscription_no(),
			cell: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-xs",
				children: r.subscriptionNo
			})
		},
		{
			header: settings_billing_plan(),
			cell: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-medium",
				children: r.planName || r.productName || "—"
			})
		},
		{
			header: settings_billing_interval(),
			cell: (r) => r.interval ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-sm",
				children: [r.intervalCount ? `${r.intervalCount} ` : "", r.interval]
			}) : "—"
		},
		{
			header: settings_billing_status(),
			cell: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: statusVariant(r.status),
				children: r.status
			})
		},
		{
			header: settings_billing_amount(),
			cell: (r) => r.amount && r.currency ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "tabular-nums",
				children: formatAmount(r.amount, r.currency)
			}) : "—"
		},
		{
			header: settings_billing_current_period(),
			cell: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-muted-foreground text-xs whitespace-pre-line",
				children: r.currentPeriodStart && r.currentPeriodEnd ? `${new Date(r.currentPeriodStart).toLocaleDateString()}\n~ ${new Date(r.currentPeriodEnd).toLocaleDateString()}` : "—"
			})
		},
		{
			header: settings_billing_end_time(),
			cell: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-muted-foreground text-sm",
				children: r.canceledEndAt ? new Date(r.canceledEndAt).toLocaleDateString() : "—"
			})
		},
		{
			header: settings_billing_date(),
			cell: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-muted-foreground text-sm",
				children: r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "—"
			})
		},
		{
			header: settings_billing_actions_col(),
			className: "w-[80px]",
			cell: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
				variant: "ghost",
				size: "icon",
				className: "size-7",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "size-4" })
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
				align: "end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
					onClick: () => setViewing(r),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" }), settings_billing_view()]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
					onClick: () => isCancellable(r.status) && setCanceling(r),
					disabled: !isCancellable(r.status),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "size-4" }), settings_billing_cancel()]
				})]
			})] })
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold",
				children: settings_billing_title()
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: settings_billing_description()
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "max-w-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: settings_billing_subscription() }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
						href: "/pricing",
						className: cn(buttonVariants({
							variant: "outline",
							size: "sm"
						}), "gap-2"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" }), current ? settings_billing_adjust() : settings_billing_subscribe()]
					})]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: !currentLoaded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground text-sm",
					children: "…"
				}) : current ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-3xl font-bold",
								children: current.planName || current.productName || "—"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: statusVariant(current.status),
								children: current.status
							})]
						}),
						current.amount && current.currency && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-muted-foreground text-sm",
							children: [formatAmount(current.amount, current.currency), current.interval ? ` / ${current.interval}` : ""]
						}),
						current.canceledEndAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-destructive text-sm",
							children: settings_billing_ends_on({ date: new Date(current.canceledEndAt).toLocaleDateString() })
						}) : current.currentPeriodEnd ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground text-sm",
							children: settings_billing_renews_on({ date: new Date(current.currentPeriodEnd).toLocaleDateString() })
						}) : null
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground text-3xl font-bold",
					children: settings_billing_no_subscription()
				}) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-border flex gap-1 overflow-x-auto overflow-y-hidden border-b",
				children: TABS.map((tb) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setTab(tb),
					className: cn("-mb-px border-b-2 px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors", tab === tb ? "border-primary text-foreground" : "text-muted-foreground hover:text-foreground border-transparent"),
					children: tDynamic(`settings.billing.tab_${tb}`)
				}, tb))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
				columns,
				data: rows,
				total,
				page,
				pageSize: PAGE_SIZE,
				onPageChange: setPage,
				rowKey: (r) => r.id,
				emptyText: settings_billing_no_subscription(),
				search,
				onSearchChange: setSearch,
				onRefresh: async () => {
					currentQuery.refetch();
					await listQuery.refetch();
				},
				loading: listQuery.isFetching
			}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
				open: !!viewing,
				onOpenChange: (v) => !v && setViewing(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: settings_billing_subscription_details() }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						className: "font-mono text-xs",
						children: viewing?.subscriptionNo
					})] }),
					viewing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3 py-2 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
								label: settings_billing_plan(),
								children: viewing.planName || viewing.productName || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
								label: settings_billing_status(),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: statusVariant(viewing.status),
									children: viewing.status
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
								label: settings_billing_amount(),
								children: viewing.amount && viewing.currency ? `${formatAmount(viewing.amount, viewing.currency)}${viewing.interval ? ` / ${viewing.interval}` : ""}` : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
								label: settings_billing_provider(),
								children: viewing.paymentProvider
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
								label: settings_billing_period_start(),
								children: viewing.currentPeriodStart ? new Date(viewing.currentPeriodStart).toLocaleString() : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
								label: settings_billing_period_end(),
								children: viewing.currentPeriodEnd ? new Date(viewing.currentPeriodEnd).toLocaleString() : "—"
							}),
							viewing.canceledAt && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
								label: settings_billing_canceled_at(),
								children: new Date(viewing.canceledAt).toLocaleString()
							}),
							viewing.canceledEndAt && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
								label: settings_billing_canceled_end_at(),
								children: new Date(viewing.canceledEndAt).toLocaleString()
							}),
							viewing.canceledReason && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
								label: settings_billing_canceled_reason(),
								children: viewing.canceledReason
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						variant: "outline",
						onClick: () => setViewing(null),
						children: settings_billing_close()
					}) })
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
				open: !!canceling,
				onOpenChange: (v) => !v && setCanceling(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: settings_billing_cancel_title() }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: settings_billing_cancel_description({ plan: canceling?.planName || canceling?.productName || "—" }) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					variant: "outline",
					onClick: () => setCanceling(null),
					disabled: submitting,
					children: settings_billing_cancel_back()
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					variant: "destructive",
					onClick: confirmCancel,
					disabled: submitting,
					children: submitting ? settings_billing_canceling() : settings_billing_cancel_confirm()
				})] })] })
			})
		]
	});
}
function DetailRow({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-start gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground w-32 shrink-0",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "flex-1",
			children
		})]
	});
}
//#endregion
export { BillingPage as component };
