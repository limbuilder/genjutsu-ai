import { o as __toESM } from "../_runtime.mjs";
import { at as require_jsx_runtime, ot as require_react } from "../_libs/@base-ui/react+[...].mjs";
import { Bl as settings_credits_credits, Gl as settings_credits_no_records, Hl as settings_credits_description, Jl as settings_credits_scene, Kl as settings_credits_purchase, Ul as settings_credits_description_col, Vl as settings_credits_date, Wl as settings_credits_expires_at, Xl as settings_credits_transaction_no, Yl as settings_credits_title, Zl as settings_credits_type, ql as settings_credits_remaining, zl as settings_credits_balance } from "./messages-B_Y80loh.mjs";
import { t as Link$1 } from "./navigation-BgznuAML.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { i as apiGet } from "./api-client-BXIVLJCS.mjs";
import { o as keepPreviousData } from "../_libs/tanstack__query-core.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { Dt as Coins } from "../_libs/lucide-react.mjs";
import { t as useUserCredits } from "./use-user-credits-B5TISbhc.mjs";
import { n as buttonVariants } from "./button-RkClB0x2.mjs";
import { a as CardHeader, n as CardContent, o as CardTitle, t as Card } from "./card-CJS2GQq6.mjs";
import { t as DataTable } from "./data-table-DyOzopCq.mjs";
import { t as Badge } from "./badge-DVIKFGgX.mjs";
import { t as tDynamic } from "./dynamic-B_Qghgly.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/credits-DDyFHlKH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TABS = [
	"all",
	"grant",
	"consume"
];
var PAGE_SIZE = 20;
function CreditsPage() {
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
	const balanceQuery = useUserCredits();
	const balance = balanceQuery.data?.balance ?? null;
	const balanceLoaded = !balanceQuery.isPending;
	const query = useQuery({
		queryKey: [
			"user-credits",
			page,
			tab,
			debouncedSearch
		],
		queryFn: () => {
			const params = new URLSearchParams({
				page: String(page),
				pageSize: String(PAGE_SIZE)
			});
			if (tab !== "all") params.set("transactionType", tab);
			if (debouncedSearch) params.set("search", debouncedSearch);
			return apiGet(`/api/user/credits?${params}`);
		},
		placeholderData: keepPreviousData
	});
	const rows = query.data?.items ?? [];
	const total = query.data?.total ?? 0;
	const columns = [
		{
			header: settings_credits_transaction_no(),
			cell: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-xs",
				children: r.transactionNo
			})
		},
		{
			header: settings_credits_description_col(),
			cell: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r.description || "—" })
		},
		{
			header: settings_credits_type(),
			cell: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: r.transactionType === "consume" ? "secondary" : "default",
				children: r.transactionType
			})
		},
		{
			header: settings_credits_scene(),
			cell: (r) => r.transactionScene || "—"
		},
		{
			header: settings_credits_credits(),
			className: "text-right",
			cell: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("font-medium tabular-nums", r.transactionType === "consume" && "text-muted-foreground"),
				children: r.credits > 0 ? `+${r.credits}` : r.credits
			})
		},
		{
			header: settings_credits_remaining(),
			className: "text-right",
			cell: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-muted-foreground text-sm tabular-nums",
				children: r.remainingCredits
			})
		},
		{
			header: settings_credits_expires_at(),
			cell: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-muted-foreground text-sm",
				children: r.expiresAt ? new Date(r.expiresAt).toLocaleDateString() : "—"
			})
		},
		{
			header: settings_credits_date(),
			cell: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-muted-foreground text-sm",
				children: new Date(r.createdAt).toLocaleDateString()
			})
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold",
				children: settings_credits_title()
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: settings_credits_description()
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "max-w-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: settings_credits_balance() }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
						href: "/pricing",
						className: cn(buttonVariants({
							variant: "outline",
							size: "sm"
						}), "gap-2"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Coins, { className: "size-4" }), settings_credits_purchase()]
					})]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-3xl font-bold",
					children: balanceLoaded ? balance ?? 0 : "…"
				}) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-border flex gap-1 overflow-x-auto overflow-y-hidden border-b",
				children: TABS.map((tb) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setTab(tb),
					className: cn("-mb-px border-b-2 px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors", tab === tb ? "border-primary text-foreground" : "text-muted-foreground hover:text-foreground border-transparent"),
					children: tDynamic(`settings.credits.tab_${tb}`)
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
				emptyText: settings_credits_no_records(),
				search,
				onSearchChange: setSearch,
				onRefresh: () => query.refetch(),
				loading: query.isFetching
			}) }) })
		]
	});
}
//#endregion
export { CreditsPage as component };
