import { o as __toESM } from "../_runtime.mjs";
import { at as require_jsx_runtime, ot as require_react } from "../_libs/@base-ui/react+[...].mjs";
import { Fs as common_table_no_data, Is as common_table_previous, Ls as common_table_refresh, Ps as common_table_next, Rs as common_table_total, mo as common_search_placeholder } from "./messages-B_Y80loh.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { Ft as ChevronLeft, Pt as ChevronRight, T as RefreshCw, x as Search } from "../_libs/lucide-react.mjs";
import { t as Button$1 } from "./button-RkClB0x2.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Input$1 } from "./input-B6v4Jp25.mjs";
import { n as useReactTable, r as getCoreRowModel, t as flexRender } from "../_libs/@tanstack/react-table+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/data-table-DyOzopCq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Table({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "table-container",
		className: "relative w-full overflow-x-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
			"data-slot": "table",
			className: cn("w-full caption-bottom text-sm", className),
			...props
		})
	});
}
function TableHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
		"data-slot": "table-header",
		className: cn("[&_tr]:border-b", className),
		...props
	});
}
function TableBody({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
		"data-slot": "table-body",
		className: cn("[&_tr:last-child]:border-0", className),
		...props
	});
}
function TableRow({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
		"data-slot": "table-row",
		className: cn("border-b transition-colors hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted", className),
		...props
	});
}
function TableHead({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
		"data-slot": "table-head",
		className: cn("h-12 px-4 text-left align-middle font-medium whitespace-nowrap text-muted-foreground [&:has([role=checkbox])]:pr-0", className),
		...props
	});
}
function TableCell({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
		"data-slot": "table-cell",
		className: cn("px-4 py-3 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0", className),
		...props
	});
}
function DataTable({ columns, data, total, page, pageSize, onPageChange, search, onSearchChange, searchPlaceholder, toolbar, emptyText, rowKey, onRefresh, loading }) {
	const [refreshing, setRefreshing] = (0, import_react.useState)(false);
	const totalPages = Math.max(1, Math.ceil(total / pageSize));
	const table = useReactTable({
		data,
		columns: (0, import_react.useMemo)(() => columns.map((col, i) => ({
			id: String(i),
			header: () => col.header,
			cell: ({ row }) => col.cell(row.original),
			meta: { className: col.className }
		})), [columns]),
		getCoreRowModel: getCoreRowModel(),
		manualPagination: true,
		rowCount: total,
		getRowId: (row) => rowKey(row)
	});
	async function handleRefresh() {
		if (!onRefresh || refreshing) return;
		setRefreshing(true);
		try {
			await onRefresh();
		} catch (error) {
			console.error("Table refresh failed", error);
			toast.error(error instanceof Error ? error.message : "Refresh failed");
		} finally {
			setRefreshing(false);
		}
	}
	const showHeader = onSearchChange || toolbar || onRefresh;
	const busy = refreshing || loading;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			showHeader && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [
					onSearchChange && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative max-w-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "text-muted-foreground absolute top-2.5 left-2.5 size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
							value: search || "",
							onChange: (e) => onSearchChange(e.target.value),
							placeholder: searchPlaceholder || common_search_placeholder(),
							className: "h-9 pl-8"
						})]
					}),
					toolbar,
					onRefresh && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						variant: "outline",
						size: "icon",
						className: "ml-auto size-9",
						onClick: handleRefresh,
						disabled: busy,
						"aria-label": common_table_refresh(),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: cn("size-4", busy && "animate-spin") })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: headerGroup.headers.map((header) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: header.column.columnDef.meta?.className,
					children: flexRender(header.column.columnDef.header, header.getContext())
				}, header.id)) }, headerGroup.id)) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: table.getRowModel().rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					colSpan: columns.length,
					className: "text-muted-foreground py-8 text-center",
					children: emptyText || common_table_no_data()
				}) }) : table.getRowModel().rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: row.getVisibleCells().map((cell) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: cell.column.columnDef.meta?.className,
					children: flexRender(cell.column.columnDef.cell, cell.getContext())
				}, cell.id)) }, row.id)) })] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between px-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground text-sm",
					children: common_table_total({ count: total })
				}), total > pageSize && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
						variant: "outline",
						size: "sm",
						onClick: () => onPageChange(page - 1),
						disabled: page <= 1,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" }), common_table_previous()]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
						variant: "outline",
						size: "sm",
						onClick: () => onPageChange(page + 1),
						disabled: page >= totalPages,
						children: [common_table_next(), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })]
					})]
				})]
			})
		]
	});
}
//#endregion
export { DataTable as t };
