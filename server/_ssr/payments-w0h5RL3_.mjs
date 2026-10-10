import { o as __toESM } from "../_runtime.mjs";
import { at as require_jsx_runtime, ot as require_react } from "../_libs/@base-ui/react+[...].mjs";
import { An as admin_payments_type, Cn as admin_payments_save, Dn as admin_payments_status_label, En as admin_payments_status, Mn as admin_payments_user, On as admin_payments_tab_all, Sn as admin_payments_provider, Tn as admin_payments_search_placeholder, _n as admin_payments_description, bn as admin_payments_no_payments, gn as admin_payments_created_at, hn as admin_payments_cancel, jn as admin_payments_update_success, kn as admin_payments_title, mn as admin_payments_amount, t as _index_exports, vn as admin_payments_edit_description, wn as admin_payments_saving, xn as admin_payments_order_no, yn as admin_payments_edit_title } from "./messages-B_Y80loh.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { a as apiPatch, i as apiGet } from "./api-client-BXIVLJCS.mjs";
import { o as keepPreviousData } from "../_libs/tanstack__query-core.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { j as Pencil } from "../_libs/lucide-react.mjs";
import { t as Button$1 } from "./button-RkClB0x2.mjs";
import { n as CardContent, t as Card } from "./card-CJS2GQq6.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Label } from "./label-Dzpc0zKw.mjs";
import { t as Input$1 } from "./input-B6v4Jp25.mjs";
import { t as DataTable } from "./data-table-DyOzopCq.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog$1 } from "./dialog-B11F4Fxp.mjs";
import { t as Badge } from "./badge-DVIKFGgX.mjs";
import { t as tDynamic } from "./dynamic-B_Qghgly.mjs";
import { t as formatDateTime } from "./time-CeCxR6Sp.mjs";
import { t as useForm } from "../_libs/@tanstack/react-form+[...].mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select$1 } from "./select-D8V5MTA2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/payments-w0h5RL3_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ORDER_STATUSES = [
	"pending",
	"created",
	"paid",
	"failed",
	"deleted"
];
var PAGE_SIZE = 20;
var TABS = [
	"all",
	"subscription",
	"one_time"
];
function PaymentsPage() {
	const queryClient = useQueryClient();
	const [page, setPage] = (0, import_react.useState)(1);
	const [tab, setTab] = (0, import_react.useState)("all");
	const [search, setSearch] = (0, import_react.useState)("");
	const [debouncedSearch, setDebouncedSearch] = (0, import_react.useState)("");
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("all");
	const [editingOrder, setEditingOrder] = (0, import_react.useState)(null);
	const editForm = useForm({
		defaultValues: {
			status: "",
			productId: "",
			productName: "",
			description: ""
		},
		onSubmit: async ({ value }) => {
			if (!editingOrder) return;
			await editMutation.mutateAsync({
				orderNo: editingOrder.orderNo,
				status: value.status,
				productId: value.productId || null,
				productName: value.productName || null,
				description: value.description || null
			});
		}
	});
	(0, import_react.useEffect)(() => {
		const timer = setTimeout(() => setDebouncedSearch(search), 300);
		return () => clearTimeout(timer);
	}, [search]);
	(0, import_react.useEffect)(() => {
		setPage(1);
	}, [
		tab,
		statusFilter,
		debouncedSearch
	]);
	const query = useQuery({
		queryKey: [
			"admin-payments",
			page,
			tab,
			statusFilter,
			debouncedSearch
		],
		queryFn: () => {
			const params = new URLSearchParams({
				page: String(page),
				pageSize: String(PAGE_SIZE)
			});
			if (tab === "subscription") params.set("paymentType", "subscription");
			if (tab === "one_time") params.set("paymentType", "one_time");
			if (statusFilter !== "all") params.set("status", statusFilter);
			if (debouncedSearch) params.set("search", debouncedSearch);
			return apiGet(`/api/admin/orders?${params}`);
		},
		placeholderData: keepPreviousData
	});
	const editMutation = useMutation({
		mutationFn: (body) => apiPatch("/api/admin/orders", body),
		onSuccess: () => {
			toast.success(admin_payments_update_success());
			setEditingOrder(null);
			queryClient.invalidateQueries({ queryKey: ["admin-payments"] });
		},
		onError: (e) => toast.error(e.message)
	});
	const orders = query.data?.items ?? [];
	const total = query.data?.total ?? 0;
	function formatAmount(amount, currency) {
		const value = amount / 100;
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: currency || "USD"
		}).format(value);
	}
	const statusVariant = (s) => {
		if (s === "paid") return "default";
		if (s === "failed") return "destructive";
		return "secondary";
	};
	function openEdit(order) {
		editForm.reset({
			status: order.status,
			productId: order.productId || "",
			productName: order.productName || "",
			description: order.description || ""
		});
		setEditingOrder(order);
	}
	const columns = [
		{
			header: admin_payments_order_no(),
			cell: (o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-xs",
				children: o.orderNo
			})
		},
		{
			header: admin_payments_user(),
			cell: (o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm",
				children: o.userEmail || o.userId
			})
		},
		{
			header: admin_payments_amount(),
			cell: (o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-medium",
				children: formatAmount(o.amount, o.currency)
			})
		},
		{
			header: admin_payments_status(),
			cell: (o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: statusVariant(o.status),
				children: tDynamic(`admin.payments.status_${o.status}`)
			})
		},
		{
			header: admin_payments_type(),
			cell: (o) => o.paymentType || "—"
		},
		{
			header: admin_payments_provider(),
			cell: (o) => o.paymentProvider
		},
		{
			header: admin_payments_created_at(),
			cell: (o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-muted-foreground text-sm",
				children: formatDateTime(o.createdAt)
			})
		},
		{
			header: "",
			className: "w-[60px]",
			cell: (o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
				variant: "ghost",
				size: "icon",
				className: "size-7",
				onClick: () => openEdit(o),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
			})
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold",
				children: admin_payments_title()
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: admin_payments_description()
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-border flex gap-1 overflow-x-auto overflow-y-hidden border-b",
				children: TABS.map((tb) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setTab(tb),
					className: cn("-mb-px border-b-2 px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors", tab === tb ? "border-primary text-foreground" : "text-muted-foreground hover:text-foreground border-transparent"),
					children: tDynamic(`admin.payments.tab_${tb}`)
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
				emptyText: admin_payments_no_payments(),
				search,
				onSearchChange: setSearch,
				searchPlaceholder: admin_payments_search_placeholder(),
				toolbar: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select$1, {
					value: statusFilter,
					onValueChange: (value) => setStatusFilter(value || "all"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						className: "h-8 w-[120px]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: "all",
						children: admin_payments_tab_all()
					}), ORDER_STATUSES.map((status) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: status,
						children: tDynamic(`admin.payments.status_${status}`)
					}, status))] })]
				}),
				onRefresh: () => query.refetch(),
				loading: query.isFetching
			}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
				open: !!editingOrder,
				onOpenChange: (open) => {
					if (!open && !editMutation.isPending) setEditingOrder(null);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: admin_payments_edit_title() }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: admin_payments_edit_description() })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "grid gap-4",
					onSubmit: (event) => {
						event.preventDefault();
						editForm.handleSubmit();
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4 py-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: admin_payments_order_no() }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
									value: editingOrder?.orderNo || "",
									disabled: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(editForm.Field, {
								name: "status",
								children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: admin_payments_status_label() }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select$1, {
										value: field.state.value,
										onValueChange: (value) => field.handleChange(value || ""),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: ORDER_STATUSES.map((status) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: status,
											children: tDynamic(`admin.payments.status_${status}`)
										}, status)) })]
									})]
								})
							}),
							[
								"productId",
								"productName",
								"description"
							].map((name) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(editForm.Field, {
								name,
								children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: _index_exports[`admin.payments.${name === "productId" ? "product_id_label" : name === "productName" ? "product_name_label" : "product_description_label"}`]() }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
										value: field.state.value,
										onChange: (event) => field.handleChange(event.target.value)
									})]
								})
							}, name))
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						type: "button",
						variant: "outline",
						disabled: editMutation.isPending,
						onClick: () => setEditingOrder(null),
						children: admin_payments_cancel()
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						type: "submit",
						disabled: editMutation.isPending,
						children: editMutation.isPending ? admin_payments_saving() : admin_payments_save()
					})] })]
				})] })
			})
		]
	});
}
//#endregion
export { PaymentsPage as component };
