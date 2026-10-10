import { o as __toESM } from "../_runtime.mjs";
import { at as require_jsx_runtime, ot as require_react } from "../_libs/@base-ui/react+[...].mjs";
import { Aa as admin_users_credits_granted, Ba as admin_users_manage_roles_description, Ca as admin_users_credits_action_deduct, Da as admin_users_credits_deducted, Ea as admin_users_credits_col, Fa as admin_users_email_col, Ga as admin_users_source_col, Ha as admin_users_no_users, Ia as admin_users_ip_col, Ka as admin_users_title, Kr as admin_roles_cancel, La as admin_users_joined_col, Ma as admin_users_credits_submit, Na as admin_users_credits_submitting, Oa as admin_users_credits_desc_label, Pa as admin_users_description, Ra as admin_users_manage_credits_for, Sa as admin_users_actions_col, Ta as admin_users_credits_amount_label, Ua as admin_users_role_assigned, Va as admin_users_manage_roles_title, Wa as admin_users_role_removed, fi as admin_roles_no_roles, ja as admin_users_credits_invalid_amount, ka as admin_users_credits_desc_placeholder, qa as admin_users_user_col, wa as admin_users_credits_action_grant, za as admin_users_manage_credits_title } from "./messages-B_Y80loh.mjs";
import { i as apiGet, l as pageQuery, o as apiPost, r as apiDelete } from "./api-client-BXIVLJCS.mjs";
import { o as keepPreviousData } from "../_libs/tanstack__query-core.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as AvatarFallback, r as AvatarImage, t as Avatar$1 } from "./avatar-ClZeTlv2.mjs";
import { Dt as Coins, v as Shield, xt as Ellipsis } from "../_libs/lucide-react.mjs";
import { i as DropdownMenuItem, n as DropdownMenuContent, t as DropdownMenu, u as DropdownMenuTrigger } from "./dropdown-menu-7WHFSjMx.mjs";
import { t as Button$1 } from "./button-RkClB0x2.mjs";
import { n as CardContent, t as Card } from "./card-CJS2GQq6.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Input$1 } from "./input-B6v4Jp25.mjs";
import { t as DataTable } from "./data-table-DyOzopCq.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog$1 } from "./dialog-B11F4Fxp.mjs";
import { t as formatDateTime } from "./time-CeCxR6Sp.mjs";
import { t as Checkbox$1 } from "./checkbox-Br-oXbkf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/users-CQ901JBA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PAGE_SIZE = 20;
function UsersPage() {
	const queryClient = useQueryClient();
	const [page, setPage] = (0, import_react.useState)(1);
	const [search, setSearch] = (0, import_react.useState)("");
	const [debouncedSearch, setDebouncedSearch] = (0, import_react.useState)("");
	const [managingUser, setManagingUser] = (0, import_react.useState)(null);
	const [creditsUser, setCreditsUser] = (0, import_react.useState)(null);
	const [creditsAction, setCreditsAction] = (0, import_react.useState)("grant");
	const [creditsAmount, setCreditsAmount] = (0, import_react.useState)("");
	const [creditsDesc, setCreditsDesc] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const timer = setTimeout(() => setDebouncedSearch(search), 300);
		return () => clearTimeout(timer);
	}, [search]);
	(0, import_react.useEffect)(() => {
		setPage(1);
	}, [debouncedSearch]);
	const listQuery = useQuery({
		queryKey: [
			"admin-users",
			page,
			debouncedSearch
		],
		queryFn: () => apiGet(pageQuery("/api/admin/users", {
			page,
			pageSize: PAGE_SIZE,
			search: debouncedSearch
		})),
		placeholderData: keepPreviousData
	});
	const allRolesQuery = useQuery({
		queryKey: ["admin-roles-all"],
		queryFn: () => apiGet("/api/admin/roles?page=1&pageSize=999"),
		enabled: !!managingUser
	});
	const userRolesQuery = useQuery({
		queryKey: ["user-roles", managingUser?.id],
		queryFn: () => apiGet(`/api/admin/roles?userId=${managingUser.id}`),
		enabled: !!managingUser
	});
	const allRoles = allRolesQuery.data?.items ?? [];
	const userRoleIds = new Set((userRolesQuery.data ?? []).map((r) => r.roleId));
	function openRoleDialog(u) {
		setManagingUser(u);
	}
	function openCreditsDialog(u) {
		setCreditsUser(u);
		setCreditsAction("grant");
		setCreditsAmount("");
		setCreditsDesc("");
	}
	const creditsMutation = useMutation({
		mutationFn: (vars) => apiPost("/api/admin/users/credits", vars),
		onSuccess: (_data, vars) => {
			toast.success(vars.action === "grant" ? admin_users_credits_granted() : admin_users_credits_deducted());
			setCreditsUser(null);
			queryClient.invalidateQueries({ queryKey: ["admin-users"] });
		},
		onError: (e) => toast.error(e.message)
	});
	function submitCredits() {
		if (!creditsUser) return;
		const amount = Number(creditsAmount);
		if (!Number.isFinite(amount) || amount <= 0) {
			toast.error(admin_users_credits_invalid_amount());
			return;
		}
		creditsMutation.mutate({
			userId: creditsUser.id,
			action: creditsAction,
			credits: amount,
			description: creditsDesc || void 0
		});
	}
	const assignRoleMutation = useMutation({
		mutationFn: (roleId) => apiPost("/api/admin/roles/assign", {
			userId: managingUser.id,
			roleId
		}),
		onSuccess: () => {
			toast.success(admin_users_role_assigned());
			queryClient.invalidateQueries({ queryKey: ["user-roles", managingUser?.id] });
		},
		onError: (e) => toast.error(e.message)
	});
	const removeRoleMutation = useMutation({
		mutationFn: (roleId) => apiDelete(`/api/admin/roles/assign?userId=${managingUser.id}&roleId=${roleId}`),
		onSuccess: () => {
			toast.success(admin_users_role_removed());
			queryClient.invalidateQueries({ queryKey: ["user-roles", managingUser?.id] });
		},
		onError: (e) => toast.error(e.message)
	});
	const toggling = assignRoleMutation.isPending || removeRoleMutation.isPending;
	function toggleRole(roleId) {
		if (!managingUser || toggling) return;
		if (userRoleIds.has(roleId)) removeRoleMutation.mutate(roleId);
		else assignRoleMutation.mutate(roleId);
	}
	const columns = [
		{
			header: admin_users_user_col(),
			cell: (u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar$1, {
					className: "size-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: u.image || void 0 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
						className: "text-xs",
						children: (u.name || u.email).charAt(0).toUpperCase()
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium",
					children: u.name || "—"
				})]
			})
		},
		{
			header: admin_users_email_col(),
			cell: (u) => u.email
		},
		{
			header: admin_users_source_col(),
			cell: (u) => u.utmSource ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "bg-muted inline-flex rounded-md px-2 py-0.5 text-xs font-medium",
				children: u.utmSource
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-muted-foreground",
				children: "—"
			})
		},
		{
			header: admin_users_ip_col(),
			cell: (u) => u.ip ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-muted-foreground font-mono text-xs",
				children: u.ip
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-muted-foreground",
				children: "—"
			})
		},
		{
			header: admin_users_credits_col(),
			className: "w-[120px]",
			cell: (u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-medium tabular-nums",
				children: u.credits.toLocaleString()
			})
		},
		{
			header: admin_users_joined_col(),
			cell: (u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-muted-foreground",
				children: formatDateTime(u.createdAt)
			})
		},
		{
			header: admin_users_actions_col(),
			className: "w-[80px]",
			cell: (u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, { render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
				variant: "ghost",
				size: "icon",
				className: "size-7",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "size-4" })
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
				align: "end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
					onClick: () => openCreditsDialog(u),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Coins, { className: "size-4" }), admin_users_manage_credits_title()]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
					onClick: () => openRoleDialog(u),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-4" }), admin_users_manage_roles_title()]
				})]
			})] })
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold",
				children: admin_users_title()
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: admin_users_description()
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
				columns,
				data: listQuery.data?.items ?? [],
				total: listQuery.data?.total ?? 0,
				page,
				pageSize: PAGE_SIZE,
				onPageChange: setPage,
				rowKey: (u) => u.id,
				emptyText: admin_users_no_users(),
				search,
				onSearchChange: setSearch,
				onRefresh: () => listQuery.refetch({ throwOnError: true }),
				loading: listQuery.isFetching
			}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
				open: !!managingUser,
				onOpenChange: (v) => !v && setManagingUser(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: admin_users_manage_roles_title() }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: admin_users_manage_roles_description() })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-h-64 space-y-3 overflow-y-auto py-4",
						children: [allRoles.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex cursor-pointer items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1, {
								checked: userRoleIds.has(r.id),
								onCheckedChange: () => toggleRole(r.id),
								disabled: toggling
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-medium",
								children: r.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-muted-foreground font-mono text-xs",
								children: r.name
							})] })]
						}, r.id)), allRoles.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground py-4 text-center text-sm",
							children: admin_roles_no_roles()
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						variant: "outline",
						onClick: () => setManagingUser(null),
						children: admin_roles_cancel()
					}) })
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
				open: !!creditsUser,
				onOpenChange: (v) => !v && setCreditsUser(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: admin_users_manage_credits_title() }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: creditsUser ? admin_users_manage_credits_for({
					name: creditsUser.name || creditsUser.email,
					balance: creditsUser.credits.toLocaleString()
				}) : "" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "grid gap-4",
					onSubmit: (e) => {
						e.preventDefault();
						submitCredits();
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4 py-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setCreditsAction("grant"),
									className: `rounded-md border px-3 py-2 text-sm font-medium transition-colors ${creditsAction === "grant" ? "border-foreground bg-foreground text-background" : "border-border hover:bg-muted"}`,
									children: admin_users_credits_action_grant()
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setCreditsAction("deduct"),
									className: `rounded-md border px-3 py-2 text-sm font-medium transition-colors ${creditsAction === "deduct" ? "border-foreground bg-foreground text-background" : "border-border hover:bg-muted"}`,
									children: admin_users_credits_action_deduct()
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-sm font-medium",
									children: admin_users_credits_amount_label()
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
									type: "number",
									min: "1",
									value: creditsAmount,
									onChange: (e) => setCreditsAmount(e.target.value),
									placeholder: "0"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-sm font-medium",
									children: admin_users_credits_desc_label()
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
									value: creditsDesc,
									onChange: (e) => setCreditsDesc(e.target.value),
									placeholder: admin_users_credits_desc_placeholder()
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						type: "button",
						variant: "outline",
						onClick: () => setCreditsUser(null),
						children: admin_roles_cancel()
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						type: "submit",
						disabled: creditsMutation.isPending,
						children: creditsMutation.isPending ? admin_users_credits_submitting() : admin_users_credits_submit()
					})] })]
				})] })
			})
		]
	});
}
//#endregion
export { UsersPage as component };
