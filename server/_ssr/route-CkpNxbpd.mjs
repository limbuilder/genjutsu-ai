import { at as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { u as Outlet } from "../_libs/@tanstack/react-router+[...].mjs";
import { $t as admin_nav_categories, Ms as common_systems_home, Qt as admin_nav_billing, an as admin_nav_payments, cn as admin_nav_rbac, dn as admin_nav_subscriptions, en as admin_nav_content, fn as admin_nav_tickets, in as admin_nav_overview, js as common_systems_admin, ln as admin_nav_roles, nn as admin_nav_generations, on as admin_nav_permissions, pn as admin_nav_users, rn as admin_nav_invite_codes, sn as admin_nav_posts, tn as admin_nav_credits, un as admin_nav_settings } from "./messages-B_Y80loh.mjs";
import { o as envConfigs } from "./schema-DWa8-2WU.mjs";
import { Q as LayoutDashboard, Tt as CreditCard, b as Settings, ft as FolderOpen, st as House, v as Shield } from "../_libs/lucide-react.mjs";
import { t as AppLayout } from "./app-layout-4MAZwTE-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-CkpNxbpd.js
var import_jsx_runtime = require_jsx_runtime();
function AdminLayout() {
	const group = common_systems_admin();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppLayout, {
		navItems: [
			{
				href: "/admin",
				label: admin_nav_overview(),
				icon: LayoutDashboard,
				group
			},
			{
				href: "/admin/users",
				label: admin_nav_rbac(),
				icon: Shield,
				group,
				items: [
					{
						href: "/admin/users",
						label: admin_nav_users()
					},
					{
						href: "/admin/invite-codes",
						label: admin_nav_invite_codes()
					},
					{
						href: "/admin/roles",
						label: admin_nav_roles()
					},
					{
						href: "/admin/permissions",
						label: admin_nav_permissions()
					}
				]
			},
			{
				href: "/admin/payments",
				label: admin_nav_billing(),
				icon: CreditCard,
				group,
				items: [
					{
						href: "/admin/payments",
						label: admin_nav_payments()
					},
					{
						href: "/admin/subscriptions",
						label: admin_nav_subscriptions()
					},
					{
						href: "/admin/credits",
						label: admin_nav_credits()
					}
				]
			},
			{
				href: "/admin/categories",
				label: admin_nav_content(),
				icon: FolderOpen,
				group,
				items: [
					{
						href: "/admin/categories",
						label: admin_nav_categories()
					},
					{
						href: "/admin/posts",
						label: admin_nav_posts()
					},
					{
						href: "/admin/tickets",
						label: admin_nav_tickets()
					},
					{
						href: "/admin/generations",
						label: admin_nav_generations()
					}
				]
			}
		],
		footerNavItems: [{
			href: "/admin/settings",
			label: admin_nav_settings(),
			icon: Settings
		}, {
			href: "/",
			label: common_systems_home(),
			icon: House,
			newTab: true
		}],
		brand: envConfigs.app_name,
		brandHref: "/admin",
		profileHref: "/settings/profile",
		requirePermission: "admin.*",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
//#endregion
export { AdminLayout as component };
