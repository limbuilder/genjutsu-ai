import { o as __toESM } from "../_runtime.mjs";
import { at as require_jsx_runtime, ot as require_react } from "../_libs/@base-ui/react+[...].mjs";
import { $n as admin_permissions_resource_col, Bn as admin_permissions_code_placeholder, Fn as admin_permissions_action_placeholder, Gn as admin_permissions_created, Hn as admin_permissions_create_description, In as admin_permissions_actions_col, Jn as admin_permissions_deleted, Kn as admin_permissions_delete_confirm, Ln as admin_permissions_cancel, Nn as admin_permissions_action_col, Pn as admin_permissions_action_field, Qn as admin_permissions_no_permissions, Rn as admin_permissions_code_col, Un as admin_permissions_create_permission, Vn as admin_permissions_confirm_delete, Wn as admin_permissions_create_title, Xn as admin_permissions_edit_description, Yn as admin_permissions_description, Zn as admin_permissions_edit_title, ar as admin_permissions_title_field, er as admin_permissions_resource_field, ir as admin_permissions_title_col, nr as admin_permissions_save, or as admin_permissions_title_placeholder, qn as admin_permissions_delete_title, rr as admin_permissions_title, sr as admin_permissions_updated, tr as admin_permissions_resource_placeholder, zn as admin_permissions_code_field } from "./messages-B_Y80loh.mjs";
import { i as apiGet, o as apiPost, r as apiDelete, s as apiPut, t as ApiError } from "./api-client-BXIVLJCS.mjs";
import { o as keepPreviousData } from "../_libs/tanstack__query-core.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { j as Pencil, k as Plus, p as Trash2 } from "../_libs/lucide-react.mjs";
import { t as Button$1 } from "./button-RkClB0x2.mjs";
import { n as CardContent, t as Card } from "./card-CJS2GQq6.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Label } from "./label-Dzpc0zKw.mjs";
import { t as Input$1 } from "./input-B6v4Jp25.mjs";
import { t as DataTable } from "./data-table-DyOzopCq.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, s as DialogTrigger, t as Dialog$1 } from "./dialog-B11F4Fxp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/permissions-ZWIPhh34.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PAGE_SIZE = 20;
var emptyForm = {
	code: "",
	resource: "",
	action: "",
	title: ""
};
function PermissionsPage() {
	const queryClient = useQueryClient();
	const [page, setPage] = (0, import_react.useState)(1);
	const [search, setSearch] = (0, import_react.useState)("");
	const [debouncedSearch, setDebouncedSearch] = (0, import_react.useState)("");
	const [createOpen, setCreateOpen] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)(emptyForm);
	const [editingPerm, setEditingPerm] = (0, import_react.useState)(null);
	const [editForm, setEditForm] = (0, import_react.useState)(emptyForm);
	const [deletingPerm, setDeletingPerm] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const timer = setTimeout(() => setDebouncedSearch(search), 300);
		return () => clearTimeout(timer);
	}, [search]);
	(0, import_react.useEffect)(() => {
		setPage(1);
	}, [debouncedSearch]);
	const query = useQuery({
		queryKey: [
			"admin-permissions",
			page,
			debouncedSearch
		],
		queryFn: () => {
			const params = new URLSearchParams({
				page: String(page),
				pageSize: String(PAGE_SIZE)
			});
			if (debouncedSearch) params.set("search", debouncedSearch);
			return apiGet(`/api/admin/permissions?${params}`);
		},
		placeholderData: keepPreviousData
	});
	const permissions = query.data?.items ?? [];
	const total = query.data?.total ?? 0;
	const invalidate = () => queryClient.invalidateQueries({ queryKey: ["admin-permissions"] });
	const createMutation = useMutation({
		mutationFn: (values) => apiPost("/api/admin/permissions", values),
		onSuccess: () => {
			toast.success(admin_permissions_created());
			setCreateOpen(false);
			setForm(emptyForm);
			invalidate();
		},
		onError: (err) => {
			toast.error(err instanceof ApiError ? err.message : "Failed");
		}
	});
	const editMutation = useMutation({
		mutationFn: (payload) => apiPut("/api/admin/permissions", payload),
		onSuccess: () => {
			toast.success(admin_permissions_updated());
			setEditingPerm(null);
			invalidate();
		},
		onError: (err) => {
			toast.error(err instanceof ApiError ? err.message : "Failed");
		}
	});
	const deleteMutation = useMutation({
		mutationFn: (id) => apiDelete(`/api/admin/permissions?id=${id}`),
		onSuccess: () => {
			toast.success(admin_permissions_deleted());
			setDeletingPerm(null);
			invalidate();
		},
		onError: (err) => {
			toast.error(err instanceof ApiError ? err.message : "Failed");
		}
	});
	const saving = createMutation.isPending || editMutation.isPending;
	function handleCreate() {
		if (!form.code.trim() || !form.resource.trim() || !form.action.trim() || !form.title.trim()) return;
		createMutation.mutate(form);
	}
	function openEdit(p) {
		setEditForm({
			code: p.code,
			resource: p.resource,
			action: p.action,
			title: p.title
		});
		setEditingPerm(p);
	}
	function handleEdit() {
		if (!editingPerm || !editForm.code.trim() || !editForm.title.trim()) return;
		editMutation.mutate({
			id: editingPerm.id,
			...editForm
		});
	}
	function handleDelete() {
		if (!deletingPerm) return;
		deleteMutation.mutate(deletingPerm.id);
	}
	const columns = [
		{
			header: admin_permissions_code_col(),
			cell: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-sm",
				children: p.code
			})
		},
		{
			header: admin_permissions_resource_col(),
			cell: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-medium",
				children: p.resource
			})
		},
		{
			header: admin_permissions_action_col(),
			cell: (p) => p.action
		},
		{
			header: admin_permissions_title_col(),
			cell: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-muted-foreground",
				children: p.title
			})
		},
		{
			header: admin_permissions_actions_col(),
			className: "w-[80px]",
			cell: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					variant: "ghost",
					size: "icon",
					className: "size-7",
					onClick: () => openEdit(p),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-3" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					variant: "ghost",
					size: "icon",
					className: "size-7",
					onClick: () => setDeletingPerm(p),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3" })
				})]
			})
		}
	];
	function renderFormFields(values, onChange) {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4 py-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: admin_permissions_code_field() }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
						value: values.code,
						onChange: (e) => onChange({
							...values,
							code: e.target.value
						}),
						placeholder: admin_permissions_code_placeholder()
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: admin_permissions_resource_field() }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
						value: values.resource,
						onChange: (e) => onChange({
							...values,
							resource: e.target.value
						}),
						placeholder: admin_permissions_resource_placeholder()
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: admin_permissions_action_field() }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
						value: values.action,
						onChange: (e) => onChange({
							...values,
							action: e.target.value
						}),
						placeholder: admin_permissions_action_placeholder()
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: admin_permissions_title_field() }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
						value: values.title,
						onChange: (e) => onChange({
							...values,
							title: e.target.value
						}),
						placeholder: admin_permissions_title_placeholder()
					})]
				})
			]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold",
					children: admin_permissions_title()
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: admin_permissions_description()
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog$1, {
					open: createOpen,
					onOpenChange: setCreateOpen,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTrigger, {
						className: "bg-primary text-primary-foreground hover:bg-primary/80 inline-flex h-8 items-center justify-center gap-1.5 rounded-lg px-2.5 text-sm font-medium transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), admin_permissions_create_permission()]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: admin_permissions_create_title() }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: admin_permissions_create_description() })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "grid gap-4",
						onSubmit: (e) => {
							e.preventDefault();
							handleCreate();
						},
						children: [renderFormFields(form, setForm), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							type: "button",
							variant: "outline",
							onClick: () => setCreateOpen(false),
							children: admin_permissions_cancel()
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							type: "submit",
							disabled: saving,
							children: admin_permissions_save()
						})] })]
					})] })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
				columns,
				data: permissions,
				total,
				page,
				pageSize: PAGE_SIZE,
				onPageChange: setPage,
				rowKey: (p) => p.id,
				emptyText: admin_permissions_no_permissions(),
				search,
				onSearchChange: setSearch,
				onRefresh: () => query.refetch(),
				loading: query.isFetching
			}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
				open: !!editingPerm,
				onOpenChange: (v) => !v && setEditingPerm(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: admin_permissions_edit_title() }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: admin_permissions_edit_description() })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "grid gap-4",
					onSubmit: (e) => {
						e.preventDefault();
						handleEdit();
					},
					children: [renderFormFields(editForm, setEditForm), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						type: "button",
						variant: "outline",
						onClick: () => setEditingPerm(null),
						children: admin_permissions_cancel()
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						type: "submit",
						disabled: saving,
						children: admin_permissions_save()
					})] })]
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
				open: !!deletingPerm,
				onOpenChange: (v) => !v && setDeletingPerm(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: admin_permissions_delete_title() }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: admin_permissions_delete_confirm() })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					variant: "outline",
					onClick: () => setDeletingPerm(null),
					children: admin_permissions_cancel()
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					variant: "destructive",
					onClick: handleDelete,
					children: admin_permissions_confirm_delete()
				})] })] })
			})
		]
	});
}
//#endregion
export { PermissionsPage as component };
