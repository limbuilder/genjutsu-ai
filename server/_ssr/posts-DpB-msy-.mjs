import { o as __toESM } from "../_runtime.mjs";
import { at as require_jsx_runtime, ot as require_react } from "../_libs/@base-ui/react+[...].mjs";
import { Ar as admin_posts_edit_title, Br as admin_posts_title, Cr as admin_posts_delete_confirm, Dr as admin_posts_description_field, Er as admin_posts_description, Fr as admin_posts_slug_placeholder, Hr as admin_posts_title_field, Ir as admin_posts_status_col, Lr as admin_posts_status_draft, Mr as admin_posts_save, Nr as admin_posts_slug_col, Or as admin_posts_description_placeholder, Pr as admin_posts_slug_field, Rr as admin_posts_status_field, Sr as admin_posts_created_at, Tr as admin_posts_deleted, Ur as admin_posts_title_placeholder, Vr as admin_posts_title_col, Wr as admin_posts_updated, _r as admin_posts_content_placeholder, br as admin_posts_create_title, cr as admin_posts_actions_col, dr as admin_posts_author_placeholder, fr as admin_posts_cancel, gr as admin_posts_content_field, hr as admin_posts_confirm_delete, jr as admin_posts_no_data, kr as admin_posts_edit_description, lr as admin_posts_author_col, mr as admin_posts_category_placeholder, pr as admin_posts_category_field, ur as admin_posts_author_field, vr as admin_posts_create, wr as admin_posts_delete_title, xr as admin_posts_created, yr as admin_posts_create_description, zr as admin_posts_status_published } from "./messages-B_Y80loh.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as MarkdownIt } from "../_libs/markdown-it+mdurl+punycode.js.mjs";
import { n as markdownStyles } from "./markdown-content-DAIMZpSI.mjs";
import { i as apiGet, o as apiPost, r as apiDelete, s as apiPut } from "./api-client-BXIVLJCS.mjs";
import { o as keepPreviousData } from "../_libs/tanstack__query-core.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { B as Minus, Bt as Bold, E as Redo, J as ListOrdered, K as LoaderCircle, O as Quote, Ot as Code, Y as Link, at as Image, c as Unlink, ct as Heading3, g as SquareCode, h as Strikethrough, j as Pencil, k as Plus, l as Undo, lt as Heading2, nt as Italic, p as Trash2, q as List } from "../_libs/lucide-react.mjs";
import { t as Button$1 } from "./button-RkClB0x2.mjs";
import { n as CardContent, t as Card } from "./card-CJS2GQq6.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Label } from "./label-Dzpc0zKw.mjs";
import { t as DataTable } from "./data-table-DyOzopCq.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, s as DialogTrigger, t as Dialog$1 } from "./dialog-B11F4Fxp.mjs";
import { t as Badge } from "./badge-DVIKFGgX.mjs";
import { t as tDynamic } from "./dynamic-B_Qghgly.mjs";
import { t as TextField } from "./form-field-DX3nwIlh.mjs";
import { t as formatDateTime } from "./time-CeCxR6Sp.mjs";
import { h as object, v as string } from "../_libs/zod.mjs";
import { t as useForm } from "../_libs/@tanstack/react-form+[...].mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select$1 } from "./select-D8V5MTA2.mjs";
import { t as Image$1 } from "../_libs/tiptap__extension-image.mjs";
import { r as Placeholder } from "../_libs/@tiptap/extension-placeholder+[...].mjs";
import { n as useEditor, t as EditorContent } from "../_libs/fast-equals+tiptap__react.mjs";
import { t as index_default } from "../_libs/tiptap__starter-kit.mjs";
import { t as TurndownService } from "../_libs/turndown.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/posts-DpB-msy-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var md = new MarkdownIt({
	html: false,
	linkify: true
});
var turndown = new TurndownService({
	headingStyle: "atx",
	codeBlockStyle: "fenced",
	bulletListMarker: "-",
	emDelimiter: "*"
});
turndown.addRule("strikethrough", {
	filter: ["del", "s"],
	replacement: (content) => `~~${content}~~`
});
turndown.keep(["figure"]);
function mdToHtml(markdown) {
	return markdown ? md.render(markdown) : "";
}
function htmlToMd(html) {
	return turndown.turndown(html);
}
function ToolbarButton({ onClick, active, disabled, label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
		type: "button",
		variant: active ? "secondary" : "ghost",
		size: "icon",
		className: "size-8",
		onClick,
		disabled,
		"aria-label": label,
		title: label,
		children
	});
}
function Toolbar({ editor, uploading, onPickImage }) {
	const chain = () => editor.chain().focus();
	function setLink() {
		const previous = editor.getAttributes("link").href;
		const url = window.prompt("URL", previous || "https://");
		if (url === null) return;
		if (url === "") {
			chain().extendMarkRange("link").unsetLink().run();
			return;
		}
		chain().extendMarkRange("link").setLink({ href: url }).run();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border-border bg-muted/30 flex flex-wrap items-center gap-0.5 border-b p-1",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
				label: "Bold",
				active: editor.isActive("bold"),
				onClick: () => chain().toggleBold().run(),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bold, { className: "size-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
				label: "Italic",
				active: editor.isActive("italic"),
				onClick: () => chain().toggleItalic().run(),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Italic, { className: "size-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
				label: "Strikethrough",
				active: editor.isActive("strike"),
				onClick: () => chain().toggleStrike().run(),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strikethrough, { className: "size-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
				label: "Inline code",
				active: editor.isActive("code"),
				onClick: () => chain().toggleCode().run(),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Code, { className: "size-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "bg-border mx-1 h-5 w-px" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
				label: "Heading 2",
				active: editor.isActive("heading", { level: 2 }),
				onClick: () => chain().toggleHeading({ level: 2 }).run(),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading2, { className: "size-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
				label: "Heading 3",
				active: editor.isActive("heading", { level: 3 }),
				onClick: () => chain().toggleHeading({ level: 3 }).run(),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading3, { className: "size-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "bg-border mx-1 h-5 w-px" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
				label: "Bullet list",
				active: editor.isActive("bulletList"),
				onClick: () => chain().toggleBulletList().run(),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, { className: "size-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
				label: "Ordered list",
				active: editor.isActive("orderedList"),
				onClick: () => chain().toggleOrderedList().run(),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListOrdered, { className: "size-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
				label: "Blockquote",
				active: editor.isActive("blockquote"),
				onClick: () => chain().toggleBlockquote().run(),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quote, { className: "size-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
				label: "Code block",
				active: editor.isActive("codeBlock"),
				onClick: () => chain().toggleCodeBlock().run(),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquareCode, { className: "size-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "bg-border mx-1 h-5 w-px" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
				label: "Link",
				active: editor.isActive("link"),
				onClick: setLink,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { className: "size-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
				label: "Remove link",
				disabled: !editor.isActive("link"),
				onClick: () => chain().unsetLink().run(),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Unlink, { className: "size-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
				label: "Insert image",
				disabled: uploading,
				onClick: onPickImage,
				children: uploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "size-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
				label: "Horizontal rule",
				onClick: () => chain().setHorizontalRule().run(),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "bg-border mx-1 h-5 w-px" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
				label: "Undo",
				disabled: !editor.can().undo(),
				onClick: () => chain().undo().run(),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Undo, { className: "size-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
				label: "Redo",
				disabled: !editor.can().redo(),
				onClick: () => chain().redo().run(),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Redo, { className: "size-4" })
			})
		]
	});
}
function RichTextEditor({ value, onChange, placeholder, className }) {
	const lastEmitted = (0, import_react.useRef)(value);
	const fileInputRef = (0, import_react.useRef)(null);
	const uploadingRef = (0, import_react.useRef)(false);
	const editor = useEditor({
		extensions: [
			index_default.configure({
				link: { openOnClick: false },
				heading: { levels: [
					1,
					2,
					3
				] }
			}),
			Image$1,
			Placeholder.configure({ placeholder: placeholder || "" })
		],
		content: mdToHtml(value),
		immediatelyRender: false,
		editorProps: { attributes: { class: cn(markdownStyles, "min-h-[280px] max-w-none p-4 focus:outline-none") } },
		onUpdate: ({ editor }) => {
			const markdown = editor.isEmpty ? "" : htmlToMd(editor.getHTML());
			lastEmitted.current = markdown;
			onChange(markdown);
		}
	});
	(0, import_react.useEffect)(() => {
		if (!editor || value === lastEmitted.current) return;
		lastEmitted.current = value;
		editor.commands.setContent(mdToHtml(value));
	}, [editor, value]);
	async function handleFiles(files) {
		if (!editor || !files?.length || uploadingRef.current) return;
		uploadingRef.current = true;
		try {
			const formData = new FormData();
			formData.append("files", files[0]);
			const data = await (await fetch("/api/storage/upload-image", {
				method: "POST",
				body: formData
			})).json();
			const url = data?.data?.urls?.[0];
			if (data.code === 0 && url) editor.chain().focus().setImage({ src: url }).run();
			else toast.error(data.message || "Upload failed");
		} catch {
			toast.error("Upload failed");
		} finally {
			uploadingRef.current = false;
			if (fileInputRef.current) fileInputRef.current.value = "";
		}
	}
	if (!editor) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("border-input min-h-[330px] rounded-md border bg-transparent", className) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("border-input focus-within:border-ring focus-within:ring-ring/50 overflow-hidden rounded-md border bg-transparent focus-within:ring-[3px]", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toolbar, {
				editor,
				uploading: uploadingRef.current,
				onPickImage: () => fileInputRef.current?.click()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: fileInputRef,
				type: "file",
				accept: "image/*",
				className: "hidden",
				onChange: (e) => handleFiles(e.target.files)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "max-h-[50vh] overflow-y-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditorContent, { editor })
			})
		]
	});
}
var PAGE_SIZE = 20;
var TABS = [
	"all",
	"published",
	"draft"
];
var postSchema = object({
	slug: string().min(1),
	title: string().min(1),
	description: string(),
	content: string(),
	categories: string(),
	authorName: string(),
	status: string()
});
var emptyForm = {
	slug: "",
	title: "",
	description: "",
	content: "",
	categories: "",
	authorName: "",
	status: "draft"
};
function PostsPage() {
	const queryClient = useQueryClient();
	const [page, setPage] = (0, import_react.useState)(1);
	const [tab, setTab] = (0, import_react.useState)("all");
	const [search, setSearch] = (0, import_react.useState)("");
	const [debouncedSearch, setDebouncedSearch] = (0, import_react.useState)("");
	const [createOpen, setCreateOpen] = (0, import_react.useState)(false);
	const [editingPost, setEditingPost] = (0, import_react.useState)(null);
	const [deletingPost, setDeletingPost] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const timer = setTimeout(() => setDebouncedSearch(search), 300);
		return () => clearTimeout(timer);
	}, [search]);
	(0, import_react.useEffect)(() => {
		setPage(1);
	}, [tab, debouncedSearch]);
	const categoryOptions = useQuery({
		queryKey: ["admin-categories", "options"],
		queryFn: () => apiGet("/api/admin/categories?all=true")
	}).data ?? [];
	const listQuery = useQuery({
		queryKey: [
			"admin-posts",
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
			return apiGet(`/api/admin/posts?${params}`);
		},
		placeholderData: keepPreviousData
	});
	const createForm = useForm({
		defaultValues: emptyForm,
		validators: { onSubmit: postSchema },
		onSubmit: async ({ value }) => {
			await createMutation.mutateAsync(value);
		}
	});
	const editForm = useForm({
		defaultValues: emptyForm,
		validators: { onSubmit: postSchema },
		onSubmit: async ({ value }) => {
			if (!editingPost) return;
			const body = {
				id: editingPost.id,
				...value
			};
			if (!body.content) delete body.content;
			await editMutation.mutateAsync(body);
		}
	});
	const createMutation = useMutation({
		mutationFn: (value) => apiPost("/api/admin/posts", value),
		onSuccess: () => {
			toast.success(admin_posts_created());
			setCreateOpen(false);
			createForm.reset();
			queryClient.invalidateQueries({ queryKey: ["admin-posts"] });
		},
		onError: (e) => toast.error(e.message)
	});
	const editMutation = useMutation({
		mutationFn: (body) => apiPut("/api/admin/posts", body),
		onSuccess: () => {
			toast.success(admin_posts_updated());
			setEditingPost(null);
			editForm.reset();
			queryClient.invalidateQueries({ queryKey: ["admin-posts"] });
		},
		onError: (e) => toast.error(e.message)
	});
	const deleteMutation = useMutation({
		mutationFn: (id) => apiDelete(`/api/admin/posts?id=${id}`),
		onSuccess: () => {
			toast.success(admin_posts_deleted());
			setDeletingPost(null);
			queryClient.invalidateQueries({ queryKey: ["admin-posts"] });
		},
		onError: (e) => toast.error(e.message)
	});
	function openEdit(p) {
		editForm.reset({
			slug: p.slug,
			title: p.title,
			description: p.description || "",
			content: "",
			categories: p.categories || "",
			authorName: p.authorName || "",
			status: p.status
		});
		setEditingPost(p);
		apiGet(`/api/admin/posts?id=${p.id}`).then((post) => editForm.setFieldValue("content", post.content || "")).catch(() => {});
	}
	const statusVariant = (s) => {
		if (s === "published") return "default";
		if (s === "draft") return "secondary";
		return "outline";
	};
	const columns = [
		{
			header: admin_posts_title_col(),
			cell: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-medium",
				children: p.title
			})
		},
		{
			header: admin_posts_slug_col(),
			cell: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-xs",
				children: p.slug
			})
		},
		{
			header: admin_posts_author_col(),
			cell: (p) => p.authorName || "—"
		},
		{
			header: admin_posts_status_col(),
			cell: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: statusVariant(p.status),
				children: p.status
			})
		},
		{
			header: admin_posts_created_at(),
			cell: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-muted-foreground text-sm",
				children: formatDateTime(p.createdAt)
			})
		},
		{
			header: admin_posts_actions_col(),
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
					onClick: () => setDeletingPost(p),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3" })
				})]
			})
		}
	];
	function renderFields(form) {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4 py-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
					name: "slug",
					children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
						field,
						label: admin_posts_slug_field(),
						placeholder: admin_posts_slug_placeholder()
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
					name: "title",
					children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
						field,
						label: admin_posts_title_field(),
						placeholder: admin_posts_title_placeholder()
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
					name: "description",
					children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
						field,
						label: admin_posts_description_field(),
						placeholder: admin_posts_description_placeholder()
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
					name: "authorName",
					children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
						field,
						label: admin_posts_author_field(),
						placeholder: admin_posts_author_placeholder()
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
					name: "categories",
					children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: admin_posts_category_field() }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select$1, {
							value: field.state.value || "",
							onValueChange: (v) => field.handleChange(v || ""),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: admin_posts_category_placeholder() }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: categoryOptions.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: c.id,
								children: c.title
							}, c.id)) })]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
					name: "status",
					children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: admin_posts_status_field() }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select$1, {
							value: field.state.value || "draft",
							onValueChange: (v) => field.handleChange(v || "draft"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "draft",
								children: admin_posts_status_draft()
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "published",
								children: admin_posts_status_published()
							})] })]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
					name: "content",
					children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: admin_posts_content_field() }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RichTextEditor, {
							value: field.state.value,
							onChange: (content) => field.handleChange(content),
							placeholder: admin_posts_content_placeholder()
						})]
					})
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
					children: admin_posts_title()
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: admin_posts_description()
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog$1, {
					open: createOpen,
					onOpenChange: setCreateOpen,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTrigger, {
						className: "bg-primary text-primary-foreground hover:bg-primary/80 inline-flex h-8 items-center justify-center gap-1.5 rounded-lg px-2.5 text-sm font-medium transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), admin_posts_create()]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
						className: "max-h-[90vh] overflow-y-auto sm:max-w-3xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: admin_posts_create_title() }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: admin_posts_create_description() })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: (e) => {
								e.preventDefault();
								e.stopPropagation();
								createForm.handleSubmit();
							},
							children: [renderFields(createForm), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
								type: "button",
								variant: "outline",
								onClick: () => setCreateOpen(false),
								children: admin_posts_cancel()
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
								type: "submit",
								disabled: createMutation.isPending,
								children: admin_posts_save()
							})] })]
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-border flex gap-1 overflow-x-auto overflow-y-hidden border-b",
				children: TABS.map((tb) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setTab(tb),
					className: cn("-mb-px border-b-2 px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors", tab === tb ? "border-primary text-foreground" : "text-muted-foreground hover:text-foreground border-transparent"),
					children: tDynamic(`admin.posts.tab_${tb}`)
				}, tb))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
				columns,
				data: listQuery.data?.items ?? [],
				total: listQuery.data?.total ?? 0,
				page,
				pageSize: PAGE_SIZE,
				onPageChange: setPage,
				rowKey: (p) => p.id,
				emptyText: admin_posts_no_data(),
				search,
				onSearchChange: setSearch,
				onRefresh: () => listQuery.refetch(),
				loading: listQuery.isFetching
			}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
				open: !!editingPost,
				onOpenChange: (v) => !v && setEditingPost(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-h-[90vh] overflow-y-auto sm:max-w-3xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: admin_posts_edit_title() }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: admin_posts_edit_description() })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: (e) => {
							e.preventDefault();
							e.stopPropagation();
							editForm.handleSubmit();
						},
						children: [renderFields(editForm), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							type: "button",
							variant: "outline",
							onClick: () => setEditingPost(null),
							children: admin_posts_cancel()
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							type: "submit",
							disabled: editMutation.isPending,
							children: admin_posts_save()
						})] })]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
				open: !!deletingPost,
				onOpenChange: (v) => !v && setDeletingPost(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: admin_posts_delete_title() }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: admin_posts_delete_confirm() })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					variant: "outline",
					onClick: () => setDeletingPost(null),
					children: admin_posts_cancel()
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					variant: "destructive",
					disabled: deleteMutation.isPending,
					onClick: () => deletingPost && deleteMutation.mutate(deletingPost.id),
					children: admin_posts_confirm_delete()
				})] })] })
			})
		]
	});
}
//#endregion
export { PostsPage as component };
