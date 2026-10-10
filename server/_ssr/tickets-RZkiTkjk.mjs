import { o as __toESM } from "../_runtime.mjs";
import { at as require_jsx_runtime, ot as require_react } from "../_libs/@base-ui/react+[...].mjs";
import { _a as admin_tickets_title, aa as admin_tickets_close_ticket, ba as admin_tickets_user_col, ca as admin_tickets_empty, da as admin_tickets_reply_placeholder, fa as admin_tickets_reply_submit, ga as admin_tickets_status_updated, ha as admin_tickets_status_col, ia as admin_tickets_admin, la as admin_tickets_latest_reply_col, ma as admin_tickets_replying, oa as admin_tickets_created_col, pa as admin_tickets_reply_success, ra as admin_tickets_actions_col, sa as admin_tickets_description, ua as admin_tickets_reopen_ticket, va as admin_tickets_title_col, ya as admin_tickets_updated_col } from "./messages-B_Y80loh.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { a as apiPatch, i as apiGet, o as apiPost } from "./api-client-BXIVLJCS.mjs";
import { o as keepPreviousData } from "../_libs/tanstack__query-core.mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as AvatarFallback, r as AvatarImage, t as Avatar$1 } from "./avatar-ClZeTlv2.mjs";
import { H as MessageSquare } from "../_libs/lucide-react.mjs";
import { t as Button$1 } from "./button-RkClB0x2.mjs";
import { n as CardContent, t as Card } from "./card-CJS2GQq6.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as DataTable } from "./data-table-DyOzopCq.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, t as Dialog$1 } from "./dialog-B11F4Fxp.mjs";
import { t as Badge } from "./badge-DVIKFGgX.mjs";
import { t as tDynamic } from "./dynamic-B_Qghgly.mjs";
import { t as formatDateTime } from "./time-CeCxR6Sp.mjs";
import { t as Textarea } from "./textarea-kLCUgc24.mjs";
import { t as ImageUploader } from "./image-uploader-BSMgxL3y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tickets-RZkiTkjk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TABS = [
	"all",
	"open",
	"replied",
	"closed"
];
/** Extract uploaded URLs from uploader items; true while any upload is in flight. */
function uploaderState(items) {
	return {
		urls: items.filter((i) => i.status === "uploaded" && i.url).map((i) => i.url),
		uploading: items.some((i) => i.status === "uploading")
	};
}
function AttachmentGrid({ urls }) {
	if (!urls.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-2 flex flex-wrap gap-2",
		children: urls.map((url, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href: url,
			target: "_blank",
			rel: "noopener noreferrer",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: url,
				alt: "",
				className: "border-border size-16 rounded-md border object-cover transition-opacity hover:opacity-80"
			})
		}, `${url}-${i}`))
	});
}
var PAGE_SIZE = 20;
var STATUS_BADGE = {
	open: "default",
	replied: "secondary",
	closed: "outline"
};
function AdminTicketsPage() {
	const queryClient = useQueryClient();
	const [page, setPage] = (0, import_react.useState)(1);
	const [tab, setTab] = (0, import_react.useState)("all");
	const [search, setSearch] = (0, import_react.useState)("");
	const [debouncedSearch, setDebouncedSearch] = (0, import_react.useState)("");
	const [activeTicket, setActiveTicket] = (0, import_react.useState)(null);
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [reply, setReply] = (0, import_react.useState)("");
	const [replyAttachments, setReplyAttachments] = (0, import_react.useState)([]);
	const [replyUploading, setReplyUploading] = (0, import_react.useState)(false);
	const [replyUploaderKey, setReplyUploaderKey] = (0, import_react.useState)(0);
	const [replying, setReplying] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const timer = setTimeout(() => setDebouncedSearch(search), 300);
		return () => clearTimeout(timer);
	}, [search]);
	(0, import_react.useEffect)(() => {
		setPage(1);
	}, [debouncedSearch, tab]);
	const listQuery = useQuery({
		queryKey: [
			"admin-tickets",
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
			if (debouncedSearch) params.set("keyword", debouncedSearch);
			return apiGet(`/api/admin/tickets?${params}`);
		},
		placeholderData: keepPreviousData
	});
	const rows = listQuery.data?.items ?? [];
	const total = listQuery.data?.total ?? 0;
	const refreshList = () => queryClient.invalidateQueries({ queryKey: ["admin-tickets"] });
	async function openDetail(row) {
		try {
			const data = await apiGet(`/api/admin/tickets/${row.id}`);
			setActiveTicket({
				...row,
				...data.ticket
			});
			setMessages(data.messages);
			setReplyAttachments([]);
			setReplyUploaderKey((k) => k + 1);
		} catch (e) {
			toast.error(e?.message || "Failed");
		}
	}
	async function submitReply() {
		if (!activeTicket || !reply.trim()) return;
		setReplying(true);
		try {
			await apiPost(`/api/admin/tickets/${activeTicket.id}`, {
				content: reply,
				attachments: replyAttachments
			});
			toast.success(admin_tickets_reply_success());
			setReply("");
			await openDetail(activeTicket);
			refreshList();
		} catch (e) {
			toast.error(e?.message || "Failed");
		} finally {
			setReplying(false);
		}
	}
	async function setStatus(status) {
		if (!activeTicket) return;
		try {
			await apiPatch(`/api/admin/tickets/${activeTicket.id}`, { status });
			toast.success(admin_tickets_status_updated());
			setActiveTicket({
				...activeTicket,
				status
			});
			refreshList();
		} catch (e) {
			toast.error(e?.message || "Failed");
		}
	}
	const columns = [
		{
			header: admin_tickets_created_col(),
			className: "w-[160px]",
			cell: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-muted-foreground",
				children: formatDateTime(r.createdAt)
			})
		},
		{
			header: admin_tickets_title_col(),
			cell: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "text-left font-medium hover:underline",
				onClick: () => openDetail(r),
				children: r.title
			})
		},
		{
			header: admin_tickets_user_col(),
			cell: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar$1, {
					className: "size-7",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: r.userAvatar || void 0 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
						className: "text-xs",
						children: (r.userName || "U").charAt(0).toUpperCase()
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r.userName || "—" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground text-xs",
						children: r.userEmail
					})]
				})]
			})
		},
		{
			header: admin_tickets_latest_reply_col(),
			cell: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-muted-foreground block max-w-[280px] truncate",
				children: r.latestReply || "—"
			})
		},
		{
			header: admin_tickets_updated_col(),
			className: "w-[160px]",
			cell: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-muted-foreground",
				children: formatDateTime(r.updatedAt)
			})
		},
		{
			header: admin_tickets_status_col(),
			className: "w-[120px]",
			cell: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: STATUS_BADGE[r.status],
				children: tDynamic(`admin.tickets.status_${r.status}`)
			})
		},
		{
			header: admin_tickets_actions_col(),
			className: "w-[80px]",
			cell: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
				variant: "ghost",
				size: "icon",
				className: "size-7",
				onClick: () => openDetail(r),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "size-4" })
			})
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold",
				children: admin_tickets_title()
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: admin_tickets_description()
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-border flex gap-1 overflow-x-auto overflow-y-hidden border-b",
				children: TABS.map((tb) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setTab(tb),
					className: cn("-mb-px border-b-2 px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors", tab === tb ? "border-primary text-foreground" : "text-muted-foreground hover:text-foreground border-transparent"),
					children: tDynamic(`admin.tickets.tab_${tb}`)
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
				emptyText: admin_tickets_empty(),
				search,
				onSearchChange: setSearch,
				onRefresh: () => listQuery.refetch(),
				loading: listQuery.isFetching
			}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
				open: !!activeTicket,
				onOpenChange: (v) => !v && setActiveTicket(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "sm:max-w-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
							className: "flex items-center gap-2",
							children: [activeTicket?.title, activeTicket && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: STATUS_BADGE[activeTicket.status],
								children: tDynamic(`admin.tickets.status_${activeTicket.status}`)
							})]
						}), activeTicket && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-muted-foreground flex items-center gap-1.5 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar$1, {
									className: "size-5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: activeTicket.userAvatar || void 0 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
										className: "text-[10px]",
										children: (activeTicket.userName || "U").charAt(0).toUpperCase()
									})]
								}),
								activeTicket.userName || "—",
								" · ",
								activeTicket.userEmail
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "max-h-[50vh] space-y-3 overflow-y-auto py-2",
							children: messages.map((msg) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: cn("rounded-lg p-3 text-sm", msg.role === "admin" ? "bg-primary/10 ml-8" : "bg-muted mr-8"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-1 flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1.5 text-xs font-medium",
											children: [
												msg.role === "user" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar$1, {
													className: "size-5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: msg.userAvatar || void 0 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
														className: "text-[10px]",
														children: (msg.userName || "U").charAt(0).toUpperCase()
													})]
												}),
												msg.userName || (msg.role === "admin" ? admin_tickets_admin() : "—"),
												msg.role === "admin" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
													variant: "secondary",
													className: "px-1 py-0 text-[10px]",
													children: admin_tickets_admin()
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground text-xs",
											children: formatDateTime(msg.createdAt)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "whitespace-pre-wrap",
										children: msg.content
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AttachmentGrid, { urls: msg.attachments })
								]
							}, msg.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "space-y-3",
							onSubmit: (e) => {
								e.preventDefault();
								submitReply();
							},
							children: [activeTicket?.status !== "closed" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								value: reply,
								maxLength: 5e3,
								rows: 3,
								onChange: (e) => setReply(e.target.value),
								placeholder: admin_tickets_reply_placeholder()
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageUploader, {
								allowMultiple: true,
								maxImages: 9,
								onChange: (items) => {
									const { urls, uploading: busy } = uploaderState(items);
									setReplyAttachments(urls);
									setReplyUploading(busy);
								}
							}, replyUploaderKey)] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: activeTicket?.status !== "closed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
								type: "button",
								variant: "outline",
								onClick: () => setStatus("closed"),
								children: admin_tickets_close_ticket()
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
								type: "submit",
								disabled: replying || replyUploading || !reply.trim(),
								children: replying ? admin_tickets_replying() : admin_tickets_reply_submit()
							})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
								type: "button",
								variant: "outline",
								onClick: () => setStatus("open"),
								children: admin_tickets_reopen_ticket()
							}) })]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { AdminTicketsPage as component };
