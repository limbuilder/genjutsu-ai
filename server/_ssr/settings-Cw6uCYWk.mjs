import { at as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { Hl as settings_credits_description, Yl as settings_credits_title, au as settings_overview_apikeys_description, cu as settings_overview_plan, du as settings_overview_usage, fu as settings_overview_usage_description, il as settings_apikeys_title, lu as settings_overview_plan_description, md as settings_welcome, ou as settings_overview_getting_started, pd as settings_title, su as settings_overview_getting_started_description, uu as settings_overview_plan_free, wu as settings_placeholder } from "./messages-B_Y80loh.mjs";
import { v as useSession } from "./client-xUgmZoCV.mjs";
import { i as apiGet } from "./api-client-BXIVLJCS.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { Tt as CreditCard, Ut as Activity, et as Key, f as TrendingUp } from "../_libs/lucide-react.mjs";
import { t as useUserCredits } from "./use-user-credits-B5TISbhc.mjs";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-CJS2GQq6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-Cw6uCYWk.js
var import_jsx_runtime = require_jsx_runtime();
function DashboardPage() {
	const { data: session } = useSession();
	const { data: creditsData } = useUserCredits();
	const { data: apiKeysData } = useQuery({
		queryKey: ["user-apikeys"],
		queryFn: () => apiGet("/api/apikeys")
	});
	const { data: subscriptionData } = useQuery({
		queryKey: ["user-subscription-current"],
		queryFn: () => apiGet("/api/user/subscriptions/current")
	});
	const credits = creditsData?.balance ?? null;
	const apiKeys = apiKeysData?.length ?? null;
	const subscription = subscriptionData ?? null;
	const planLabel = subscription?.planName || subscription?.productName || settings_overview_plan_free();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 p-4 md:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-semibold tracking-tight",
				children: settings_title()
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground mt-1 text-sm",
				children: settings_welcome({ name: session?.user?.name || session?.user?.email || "" })
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
						className: "flex flex-row items-center justify-between pb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							className: "text-sm font-medium",
							children: settings_overview_plan()
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "text-muted-foreground size-4" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-2xl font-bold",
						children: planLabel
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground mt-1 text-xs",
						children: settings_overview_plan_description()
					})] })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
						className: "flex flex-row items-center justify-between pb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							className: "text-sm font-medium",
							children: settings_credits_title()
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "text-muted-foreground size-4" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-2xl font-bold",
						children: credits ?? "—"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground mt-1 text-xs",
						children: settings_credits_description()
					})] })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
						className: "flex flex-row items-center justify-between pb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							className: "text-sm font-medium",
							children: settings_apikeys_title()
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Key, { className: "text-muted-foreground size-4" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-2xl font-bold",
						children: apiKeys ?? "—"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground mt-1 text-xs",
						children: settings_overview_apikeys_description()
					})] })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
						className: "flex flex-row items-center justify-between pb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							className: "text-sm font-medium",
							children: settings_overview_usage()
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "text-muted-foreground size-4" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-2xl font-bold",
						children: "0"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground mt-1 text-xs",
						children: settings_overview_usage_description()
					})] })] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				className: "text-base",
				children: settings_overview_getting_started()
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: settings_overview_getting_started_description() })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-border text-muted-foreground rounded-lg border border-dashed p-8 text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm",
					children: settings_placeholder()
				})
			}) })] })
		]
	});
}
//#endregion
export { DashboardPage as component };
