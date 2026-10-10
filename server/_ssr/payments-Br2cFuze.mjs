import { o as __toESM } from "../_runtime.mjs";
import { at as require_jsx_runtime, ot as require_react } from "../_libs/@base-ui/react+[...].mjs";
import { Cu as settings_payments_type, Su as settings_payments_title, _u as settings_payments_no_payments, bu as settings_payments_provider, gu as settings_payments_invoice, hu as settings_payments_description, mu as settings_payments_date, pu as settings_payments_amount, vu as settings_payments_order_no, xu as settings_payments_status, yu as settings_payments_product } from "./messages-B_Y80loh.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { i as apiGet } from "./api-client-BXIVLJCS.mjs";
import { o as keepPreviousData } from "../_libs/tanstack__query-core.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { vt as ExternalLink } from "../_libs/lucide-react.mjs";
import { n as CardContent, t as Card } from "./card-CJS2GQq6.mjs";
import { t as DataTable } from "./data-table-DyOzopCq.mjs";
import { t as Badge } from "./badge-DVIKFGgX.mjs";
import { t as tDynamic } from "./dynamic-B_Qghgly.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/payments-Br2cFuze.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TABS = [
	"all",
	"one-time",
	"subscription",
	"renew"
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
	const s = status.toLowerCase();
	if (s === "paid" || s === "succeeded" || s === "active") return "default";
	if (s === "failed" || s === "canceled") return "destructive";
	return "secondary";
}
function PaymentsPage() {
	const [tab, setTab] = (0, import_react.useState)("all");
	const [page, setPage] = (0, import_react.useState)(1);
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
			"user-payments",
			page,
			tab,
			debouncedSearch
		],
		queryFn: () => {
			const params = new URLSearchParams({
				page: String(page),
				pageSize: String(PAGE_SIZE)
			});
			if (tab !== "all") params.set("paymentType", tab);
			if (debouncedSearch) params.set("search", debouncedSearch);
			return apiGet(`/api/user/orders?${params}`);
		},
		placeholderData: keepPreviousData
	});
	const orders = query.data?.items ?? [];
	const total = query.data?.total ?? 0;
	const columns = [
		{
			header: settings_payments_order_no(),
			cell: (o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-xs",
				children: o.orderNo
			})
		},
		{
			header: settings_payments_product(),
			cell: (o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: o.planName || o.productName || "—" })
		},
		{
			header: settings_payments_amount(),
			cell: (o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-medium",
				children: formatAmount(o.amount, o.currency)
			})
		},
		{
			header: settings_payments_status(),
			cell: (o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: statusVariant(o.status),
				children: o.status
			})
		},
		{
			header: settings_payments_type(),
			cell: (o) => o.paymentType || "—"
		},
		{
			header: settings_payments_provider(),
			cell: (o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "capitalize",
				children: o.paymentProvider
			})
		},
		{
			header: settings_payments_date(),
			cell: (o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-muted-foreground text-sm",
				children: new Date(o.paidAt || o.createdAt).toLocaleDateString()
			})
		},
		{
			header: settings_payments_invoice(),
			className: "w-[60px]",
			cell: (o) => o.invoiceUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: o.invoiceUrl,
				target: "_blank",
				rel: "noopener noreferrer",
				className: "text-primary inline-flex items-center gap-1 text-sm hover:underline",
				"aria-label": settings_payments_invoice(),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5" })
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-muted-foreground",
				children: "—"
			})
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold",
				children: settings_payments_title()
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: settings_payments_description()
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-border flex gap-1 overflow-x-auto overflow-y-hidden border-b",
				children: TABS.map((tb) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setTab(tb),
					className: cn("-mb-px border-b-2 px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors", tab === tb ? "border-primary text-foreground" : "text-muted-foreground hover:text-foreground border-transparent"),
					children: tDynamic(`settings.payments.tab_${tb.replace("-", "_")}`)
				}, tb))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
				columns,
				data: orders,
				total,
				page,
				pageSize: PAGE_SIZE,
				onPageChange: setPage,
				rowKey: (o) => o.id,
				emptyText: settings_payments_no_payments(),
				search,
				onSearchChange: setSearch,
				onRefresh: () => query.refetch(),
				loading: query.isFetching
			}) }) })
		]
	});
}
//#endregion
export { PaymentsPage as component };
