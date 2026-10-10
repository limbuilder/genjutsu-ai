import { o as __toESM } from "../_runtime.mjs";
import { at as require_jsx_runtime, ot as require_react } from "../_libs/@base-ui/react+[...].mjs";
import { $i as admin_subscriptions_status, Ji as admin_subscriptions_description, Ki as admin_subscriptions_amount, Qi as admin_subscriptions_provider, Xi as admin_subscriptions_no_subscriptions, Yi as admin_subscriptions_interval, Zi as admin_subscriptions_period, ea as admin_subscriptions_subscription_no, na as admin_subscriptions_user, qi as admin_subscriptions_created_at, ta as admin_subscriptions_title } from "./messages-B_Y80loh.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { i as apiGet } from "./api-client-BXIVLJCS.mjs";
import { o as keepPreviousData } from "../_libs/tanstack__query-core.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as CardContent, t as Card } from "./card-CJS2GQq6.mjs";
import { t as DataTable } from "./data-table-DyOzopCq.mjs";
import { t as Badge } from "./badge-DVIKFGgX.mjs";
import { t as tDynamic } from "./dynamic-B_Qghgly.mjs";
import { t as formatDateTime } from "./time-CeCxR6Sp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/subscriptions-B5jWxvp9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PAGE_SIZE = 20;
var TABS = [
	"all",
	"month",
	"year"
];
function SubscriptionsPage() {
	const [page, setPage] = (0, import_react.useState)(1);
	const [tab, setTab] = (0, import_react.useState)("all");
	const [search, setSearch] = (0, import_react.useState)("");
	const [debouncedSearch, setDebouncedSearch] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const timer = setTimeout(() => setDebouncedSearch(search), 300);
		return () => clearTimeout(timer);
	}, [search]);
	(0, import_react.useEffect)(() => {
		setPage(1);
	}, [tab, debouncedSearch]);
	const query = useQuery({
		queryKey: [
			"admin-subscriptions",
			page,
			tab,
			debouncedSearch
		],
		queryFn: () => {
			const params = new URLSearchParams({
				page: String(page),
				pageSize: String(PAGE_SIZE)
			});
			if (tab === "month") params.set("interval", "month");
			if (tab === "year") params.set("interval", "year");
			if (debouncedSearch) params.set("search", debouncedSearch);
			return apiGet(`/api/admin/subscriptions?${params}`);
		},
		placeholderData: keepPreviousData
	});
	const subscriptions = query.data?.items ?? [];
	const total = query.data?.total ?? 0;
	function formatAmount(amount, currency) {
		if (amount == null) return "—";
		const value = amount / 100;
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: currency || "USD"
		}).format(value);
	}
	function formatDate(d) {
		if (!d) return "—";
		return formatDateTime(d);
	}
	const statusVariant = (s) => {
		if (s === "active" || s === "trialing") return "default";
		if (s === "canceled" || s === "expired") return "destructive";
		return "secondary";
	};
	const columns = [
		{
			header: admin_subscriptions_subscription_no(),
			cell: (s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-xs",
				children: s.subscriptionNo
			})
		},
		{
			header: admin_subscriptions_user(),
			cell: (s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm",
				children: s.userEmail || s.userId
			})
		},
		{
			header: admin_subscriptions_amount(),
			cell: (s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-medium",
				children: formatAmount(s.amount, s.currency)
			})
		},
		{
			header: admin_subscriptions_interval(),
			cell: (s) => s.interval || "—"
		},
		{
			header: admin_subscriptions_status(),
			cell: (s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: statusVariant(s.status),
				children: s.status
			})
		},
		{
			header: admin_subscriptions_provider(),
			cell: (s) => s.paymentProvider
		},
		{
			header: admin_subscriptions_period(),
			cell: (s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-muted-foreground text-sm",
				children: [
					formatDate(s.currentPeriodStart),
					" ~ ",
					formatDate(s.currentPeriodEnd)
				]
			})
		},
		{
			header: admin_subscriptions_created_at(),
			cell: (s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-muted-foreground text-sm",
				children: formatDateTime(s.createdAt)
			})
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold",
				children: admin_subscriptions_title()
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: admin_subscriptions_description()
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-border flex gap-1 overflow-x-auto overflow-y-hidden border-b",
				children: TABS.map((tb) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setTab(tb),
					className: cn("-mb-px border-b-2 px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors", tab === tb ? "border-primary text-foreground" : "text-muted-foreground hover:text-foreground border-transparent"),
					children: tDynamic(`admin.subscriptions.tab_${tb}`)
				}, tb))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
				columns,
				data: subscriptions,
				total,
				page,
				pageSize: PAGE_SIZE,
				onPageChange: setPage,
				rowKey: (s) => s.id,
				emptyText: admin_subscriptions_no_subscriptions(),
				search,
				onSearchChange: setSearch,
				onRefresh: () => query.refetch(),
				loading: query.isFetching
			}) }) })
		]
	});
}
//#endregion
export { SubscriptionsPage as component };
