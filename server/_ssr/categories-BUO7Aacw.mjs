import { o as __toESM } from "../_runtime.mjs";
import { at as require_jsx_runtime, ot as require_react } from "../_libs/@base-ui/react+[...].mjs";
import { C as admin_categories_slug_placeholder, D as admin_categories_title_field, E as admin_categories_title_col, O as admin_categories_title_placeholder, S as admin_categories_slug_field, T as admin_categories_title, _ as admin_categories_edit_description, a as admin_categories_create, b as admin_categories_save, c as admin_categories_created, d as admin_categories_delete_title, f as admin_categories_deleted, g as admin_categories_description_placeholder, h as admin_categories_description_field, i as admin_categories_confirm_delete, k as admin_categories_updated, l as admin_categories_created_at, m as admin_categories_description_col, n as admin_categories_actions_col, o as admin_categories_create_description, p as admin_categories_description, r as admin_categories_cancel, s as admin_categories_create_title, u as admin_categories_delete_confirm, v as admin_categories_edit_title, w as admin_categories_status_col, x as admin_categories_slug_col, y as admin_categories_no_data } from "./messages-B_Y80loh.mjs";
import { i as apiGet, l as pageQuery, o as apiPost, r as apiDelete, s as apiPut } from "./api-client-BXIVLJCS.mjs";
import { o as keepPreviousData } from "../_libs/tanstack__query-core.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { j as Pencil, k as Plus, p as Trash2 } from "../_libs/lucide-react.mjs";
import { t as Button$1 } from "./button-RkClB0x2.mjs";
import { n as CardContent, t as Card } from "./card-CJS2GQq6.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as DataTable } from "./data-table-DyOzopCq.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, s as DialogTrigger, t as Dialog$1 } from "./dialog-B11F4Fxp.mjs";
import { t as Badge } from "./badge-DVIKFGgX.mjs";
import { t as TextField } from "./form-field-DX3nwIlh.mjs";
import { t as formatDateTime } from "./time-CeCxR6Sp.mjs";
import { h as object, v as string } from "../_libs/zod.mjs";
import { t as useForm } from "../_libs/@tanstack/react-form+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/categories-BUO7Aacw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PAGE_SIZE = 20;
var categorySchema = object({
	slug: string().min(1),
	title: string().min(1),
	description: string()
});
var emptyForm = {
	slug: "",
	title: "",
	description: ""
};
function CategoriesPage() {
	const queryClient = useQueryClient();
	const [page, setPage] = (0, import_react.useState)(1);
	const [search, setSearch] = (0, import_react.useState)("");
	const [debouncedSearch, setDebouncedSearch] = (0, import_react.useState)("");
	const [createOpen, setCreateOpen] = (0, import_react.useState)(false);
	const [editingCat, setEditingCat] = (0, import_react.useState)(null);
	const [deletingCat, setDeletingCat] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const timer = setTimeout(() => setDebouncedSearch(search), 300);
		return () => clearTimeout(timer);
	}, [search]);
	(0, import_react.useEffect)(() => {
		setPage(1);
	}, [debouncedSearch]);
	const listQuery = useQuery({
		queryKey: [
			"admin-categories",
			page,
			debouncedSearch
		],
		queryFn: () => apiGet(pageQuery("/api/admin/categories", {
			page,
			pageSize: PAGE_SIZE,
			search: debouncedSearch
		})),
		placeholderData: keepPreviousData
	});
	const createForm = useForm({
		defaultValues: emptyForm,
		validators: { onSubmit: categorySchema },
		onSubmit: async ({ value }) => {
			await createMutation.mutateAsync(value);
		}
	});
	const editForm = useForm({
		defaultValues: emptyForm,
		validators: { onSubmit: categorySchema },
		onSubmit: async ({ value }) => {
			if (!editingCat) return;
			await editMutation.mutateAsync({
				id: editingCat.id,
				...value
			});
		}
	});
	function openEdit(c) {
		editForm.reset({
			slug: c.slug,
			title: c.title,
			description: c.description || ""
		});
		setEditingCat(c);
	}
	const createMutation = useMutation({
		mutationFn: (value) => apiPost("/api/admin/categories", value),
		onSuccess: () => {
			toast.success(admin_categories_created());
			setCreateOpen(false);
			createForm.reset();
			queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
		},
		onError: (e) => toast.error(e.message)
	});
	const editMutation = useMutation({
		mutationFn: (value) => apiPut("/api/admin/categories", value),
		onSuccess: () => {
			toast.success(admin_categories_updated());
			setEditingCat(null);
			editForm.reset();
			queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
		},
		onError: (e) => toast.error(e.message)
	});
	const deleteMutation = useMutation({
		mutationFn: (id) => apiDelete(`/api/admin/categories?id=${id}`),
		onSuccess: () => {
			toast.success(admin_categories_deleted());
			setDeletingCat(null);
			queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
		},
		onError: (e) => toast.error(e.message)
	});
	const columns = [
		{
			header: admin_categories_slug_col(),
			cell: (c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-sm",
				children: c.slug
			})
		},
		{
			header: admin_categories_title_col(),
			cell: (c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-medium",
				children: c.title
			})
		},
		{
			header: admin_categories_description_col(),
			cell: (c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-muted-foreground block max-w-[200px] truncate text-sm",
				children: c.description || "—"
			})
		},
		{
			header: admin_categories_status_col(),
			cell: (c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: c.status === "published" ? "default" : "secondary",
				children: c.status
			})
		},
		{
			header: admin_categories_created_at(),
			cell: (c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-muted-foreground text-sm",
				children: formatDateTime(c.createdAt)
			})
		},
		{
			header: admin_categories_actions_col(),
			className: "w-[80px]",
			cell: (c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					variant: "ghost",
					size: "icon",
					className: "size-7",
					onClick: () => openEdit(c),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-3" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					variant: "ghost",
					size: "icon",
					className: "size-7",
					onClick: () => setDeletingCat(c),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3" })
				})]
			})
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold",
					children: admin_categories_title()
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: admin_categories_description()
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog$1, {
					open: createOpen,
					onOpenChange: setCreateOpen,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTrigger, {
						className: "bg-primary text-primary-foreground hover:bg-primary/80 inline-flex h-8 items-center justify-center gap-1.5 rounded-lg px-2.5 text-sm font-medium transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), admin_categories_create()]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: admin_categories_create_title() }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: admin_categories_create_description() })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: (e) => {
							e.preventDefault();
							e.stopPropagation();
							createForm.handleSubmit();
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 py-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(createForm.Field, {
									name: "slug",
									children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
										field,
										label: admin_categories_slug_field(),
										placeholder: admin_categories_slug_placeholder()
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(createForm.Field, {
									name: "title",
									children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
										field,
										label: admin_categories_title_field(),
										placeholder: admin_categories_title_placeholder()
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(createForm.Field, {
									name: "description",
									children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
										field,
										label: admin_categories_description_field(),
										placeholder: admin_categories_description_placeholder()
									})
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							type: "button",
							variant: "outline",
							onClick: () => setCreateOpen(false),
							children: admin_categories_cancel()
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							type: "submit",
							disabled: createMutation.isPending,
							children: admin_categories_save()
						})] })]
					})] })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
				columns,
				data: listQuery.data?.items ?? [],
				total: listQuery.data?.total ?? 0,
				page,
				pageSize: PAGE_SIZE,
				onPageChange: setPage,
				rowKey: (c) => c.id,
				emptyText: admin_categories_no_data(),
				search,
				onSearchChange: setSearch,
				onRefresh: () => listQuery.refetch(),
				loading: listQuery.isFetching
			}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
				open: !!editingCat,
				onOpenChange: (v) => !v && setEditingCat(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: admin_categories_edit_title() }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: admin_categories_edit_description() })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: (e) => {
						e.preventDefault();
						e.stopPropagation();
						editForm.handleSubmit();
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4 py-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(editForm.Field, {
								name: "slug",
								children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
									field,
									label: admin_categories_slug_field(),
									placeholder: admin_categories_slug_placeholder()
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(editForm.Field, {
								name: "title",
								children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
									field,
									label: admin_categories_title_field(),
									placeholder: admin_categories_title_placeholder()
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(editForm.Field, {
								name: "description",
								children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
									field,
									label: admin_categories_description_field(),
									placeholder: admin_categories_description_placeholder()
								})
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						type: "button",
						variant: "outline",
						onClick: () => setEditingCat(null),
						children: admin_categories_cancel()
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						type: "submit",
						disabled: editMutation.isPending,
						children: admin_categories_save()
					})] })]
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
				open: !!deletingCat,
				onOpenChange: (v) => !v && setDeletingCat(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: admin_categories_delete_title() }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: admin_categories_delete_confirm() })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					variant: "outline",
					onClick: () => setDeletingCat(null),
					children: admin_categories_cancel()
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					variant: "destructive",
					disabled: deleteMutation.isPending,
					onClick: () => deletingCat && deleteMutation.mutate(deletingCat.id),
					children: admin_categories_confirm_delete()
				})] })] })
			})
		]
	});
}
//#endregion
export { CategoriesPage as component };
