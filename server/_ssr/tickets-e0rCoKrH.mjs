import { o as __toESM } from "../_runtime.mjs";
import { at as require_jsx_runtime, ot as require_react } from "../_libs/@base-ui/react+[...].mjs";
import { $u as settings_tickets_empty, Bu as settings_tickets_close_success, Gu as settings_tickets_create_button, Hu as settings_tickets_closed_notice, Ju as settings_tickets_create_success, Ku as settings_tickets_create_description, Lu as settings_tickets_actions_col, Qu as settings_tickets_description, Ru as settings_tickets_attachments_label, Uu as settings_tickets_content_label, Vu as settings_tickets_close_ticket, Wu as settings_tickets_content_placeholder, Xu as settings_tickets_created_col, Yu as settings_tickets_create_title, Zu as settings_tickets_creating, ad as settings_tickets_status_col, cd as settings_tickets_title_col, dd as settings_tickets_updated_col, ed as settings_tickets_latest_reply_col, fd as settings_tickets_you, id as settings_tickets_required, ld as settings_tickets_title_label, nd as settings_tickets_reply_submit, od as settings_tickets_support_team, qu as settings_tickets_create_submit, rd as settings_tickets_replying, sd as settings_tickets_title, td as settings_tickets_reply_placeholder, ud as settings_tickets_title_placeholder, zu as settings_tickets_cancel } from "./messages-B_Y80loh.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { a as apiPatch, i as apiGet, o as apiPost } from "./api-client-BXIVLJCS.mjs";
import { o as keepPreviousData } from "../_libs/tanstack__query-core.mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as AvatarFallback, r as AvatarImage, t as Avatar$1 } from "./avatar-ClZeTlv2.mjs";
import { H as MessageSquare, k as Plus } from "../_libs/lucide-react.mjs";
import { t as Button$1 } from "./button-RkClB0x2.mjs";
import { n as CardContent, t as Card } from "./card-CJS2GQq6.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Label } from "./label-Dzpc0zKw.mjs";
import { t as Input$1 } from "./input-B6v4Jp25.mjs";
import { t as DataTable } from "./data-table-DyOzopCq.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog$1 } from "./dialog-B11F4Fxp.mjs";
import { t as Badge } from "./badge-DVIKFGgX.mjs";
import { t as tDynamic } from "./dynamic-B_Qghgly.mjs";
import { t as Textarea } from "./textarea-kLCUgc24.mjs";
import { t as ImageUploader } from "./image-uploader-BSMgxL3y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tickets-e0rCoKrH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
function TicketsPage() {
	const queryClient = useQueryClient();
	const [page, setPage] = (0, import_react.useState)(1);
	const [search, setSearch] = (0, import_react.useState)("");
	const [debouncedSearch, setDebouncedSearch] = (0, import_react.useState)("");
	const [createOpen, setCreateOpen] = (0, import_react.useState)(false);
	const [title, setTitle] = (0, import_react.useState)("");
	const [content, setContent] = (0, import_react.useState)("");
	const [attachments, setAttachments] = (0, import_react.useState)([]);
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const [uploaderKey, setUploaderKey] = (0, import_react.useState)(0);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
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
	}, [debouncedSearch]);
	const listQuery = useQuery({
		queryKey: [
			"user-tickets",
			page,
			debouncedSearch
		],
		queryFn: () => {
			const params = new URLSearchParams({
				page: String(page),
				pageSize: String(PAGE_SIZE)
			});
			if (debouncedSearch) params.set("keyword", debouncedSearch);
			return apiGet(`/api/tickets?${params}`);
		},
		placeholderData: keepPreviousData
	});
	const rows = listQuery.data?.items ?? [];
	const total = listQuery.data?.total ?? 0;
	const refreshList = () => queryClient.invalidateQueries({ queryKey: ["user-tickets"] });
	async function openDetail(row) {
		try {
			const data = await apiGet(`/api/tickets/${row.id}`);
			setActiveTicket(data.ticket);
			setMessages(data.messages);
			setReplyAttachments([]);
			setReplyUploaderKey((k) => k + 1);
		} catch (e) {
			toast.error(e?.message || "Failed");
		}
	}
	async function submitCreate() {
		if (!title.trim() || !content.trim()) {
			toast.error(settings_tickets_required());
			return;
		}
		setSubmitting(true);
		try {
			await apiPost("/api/tickets", {
				title,
				content,
				attachments
			});
			toast.success(settings_tickets_create_success());
			setCreateOpen(false);
			setTitle("");
			setContent("");
			setAttachments([]);
			setUploaderKey((k) => k + 1);
			setPage(1);
			refreshList();
		} catch (e) {
			toast.error(e?.message || "Failed");
		} finally {
			setSubmitting(false);
		}
	}
	async function submitReply() {
		if (!activeTicket || !reply.trim()) return;
		setReplying(true);
		try {
			await apiPost(`/api/tickets/${activeTicket.id}`, {
				content: reply,
				attachments: replyAttachments
			});
			setReply("");
			await openDetail(activeTicket);
			refreshList();
		} catch (e) {
			toast.error(e?.message || "Failed");
		} finally {
			setReplying(false);
		}
	}
	async function closeTicket() {
		if (!activeTicket) return;
		try {
			await apiPatch(`/api/tickets/${activeTicket.id}`, { status: "closed" });
			toast.success(settings_tickets_close_success());
			setActiveTicket(null);
			refreshList();
		} catch (e) {
			toast.error(e?.message || "Failed");
		}
	}
	const columns = [
		{
			header: settings_tickets_created_col(),
			className: "w-[160px]",
			cell: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-muted-foreground",
				children: new Date(r.createdAt).toLocaleString()
			})
		},
		{
			header: settings_tickets_title_col(),
			cell: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "text-left font-medium hover:underline",
				onClick: () => openDetail(r),
				children: r.title
			})
		},
		{
			header: settings_tickets_latest_reply_col(),
			cell: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-muted-foreground block max-w-[280px] truncate",
				children: r.latestReply || "—"
			})
		},
		{
			header: settings_tickets_updated_col(),
			className: "w-[160px]",
			cell: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-muted-foreground",
				children: new Date(r.updatedAt).toLocaleString()
			})
		},
		{
			header: settings_tickets_status_col(),
			className: "w-[120px]",
			cell: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: STATUS_BADGE[r.status],
				children: tDynamic(`settings.tickets.status_${r.status}`)
			})
		},
		{
			header: settings_tickets_actions_col(),
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold",
					children: settings_tickets_title()
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: settings_tickets_description()
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
					onClick: () => setCreateOpen(true),
					className: "gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), settings_tickets_create_button()]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
				columns,
				data: rows,
				total,
				page,
				pageSize: PAGE_SIZE,
				onPageChange: setPage,
				rowKey: (r) => r.id,
				emptyText: settings_tickets_empty(),
				search,
				onSearchChange: setSearch,
				onRefresh: () => listQuery.refetch(),
				loading: listQuery.isFetching
			}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
				open: createOpen,
				onOpenChange: setCreateOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: settings_tickets_create_title() }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: settings_tickets_create_description() })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: (e) => {
						e.preventDefault();
						submitCreate();
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4 py-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "ticket-title",
									children: settings_tickets_title_label()
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
									id: "ticket-title",
									value: title,
									maxLength: 200,
									onChange: (e) => setTitle(e.target.value),
									placeholder: settings_tickets_title_placeholder()
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "ticket-content",
									children: settings_tickets_content_label()
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									id: "ticket-content",
									value: content,
									maxLength: 5e3,
									rows: 6,
									onChange: (e) => setContent(e.target.value),
									placeholder: settings_tickets_content_placeholder()
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: settings_tickets_attachments_label() }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageUploader, {
									allowMultiple: true,
									maxImages: 9,
									onChange: (items) => {
										const { urls, uploading: busy } = uploaderState(items);
										setAttachments(urls);
										setUploading(busy);
									}
								}, uploaderKey)]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						type: "button",
						variant: "outline",
						onClick: () => setCreateOpen(false),
						children: settings_tickets_cancel()
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						type: "submit",
						disabled: submitting || uploading,
						children: submitting ? settings_tickets_creating() : settings_tickets_create_submit()
					})] })]
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
				open: !!activeTicket,
				onOpenChange: (v) => !v && setActiveTicket(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "sm:max-w-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
							className: "flex items-center gap-2",
							children: [activeTicket?.title, activeTicket && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: STATUS_BADGE[activeTicket.status],
								children: tDynamic(`settings.tickets.status_${activeTicket.status}`)
							})]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "max-h-[50vh] space-y-3 overflow-y-auto py-2",
							children: messages.map((msg) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: cn("rounded-lg p-3 text-sm", msg.role === "admin" ? "bg-primary/10 mr-8" : "bg-muted ml-8"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-1 flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1.5 text-xs font-medium",
											children: [msg.role === "user" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar$1, {
												className: "size-5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: msg.userAvatar || void 0 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
													className: "text-[10px]",
													children: (msg.userName || "U").charAt(0).toUpperCase()
												})]
											}), msg.role === "admin" ? settings_tickets_support_team() : msg.userName || settings_tickets_you()]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground text-xs",
											children: new Date(msg.createdAt).toLocaleString()
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
						activeTicket?.status !== "closed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "space-y-3",
							onSubmit: (e) => {
								e.preventDefault();
								submitReply();
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									value: reply,
									maxLength: 5e3,
									rows: 3,
									onChange: (e) => setReply(e.target.value),
									placeholder: settings_tickets_reply_placeholder()
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageUploader, {
									allowMultiple: true,
									maxImages: 9,
									onChange: (items) => {
										const { urls, uploading: busy } = uploaderState(items);
										setReplyAttachments(urls);
										setReplyUploading(busy);
									}
								}, replyUploaderKey),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
									type: "button",
									variant: "outline",
									onClick: closeTicket,
									children: settings_tickets_close_ticket()
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
									type: "submit",
									disabled: replying || replyUploading || !reply.trim(),
									children: replying ? settings_tickets_replying() : settings_tickets_reply_submit()
								})] })
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground text-sm",
							children: settings_tickets_closed_notice()
						})
					]
				})
			})
		]
	});
}
//#endregion
export { TicketsPage as component };
