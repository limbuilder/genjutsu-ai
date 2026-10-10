import { o as __toESM } from "../_runtime.mjs";
import { at as require_jsx_runtime, ot as require_react } from "../_libs/@base-ui/react+[...].mjs";
import { u as Outlet } from "../_libs/@tanstack/react-router+[...].mjs";
import { $l as settings_nav_billing, As as common_support_track_hint_prefix, Cs as common_support_submit, Ds as common_support_title_label, Es as common_support_title, Ms as common_systems_home, Ns as common_systems_settings, Os as common_support_title_placeholder, Ql as settings_nav_apikeys, Ss as common_support_sign_in_notice, Ts as common_support_success, _s as common_support_content_placeholder, bs as common_support_required, eu as settings_nav_credits, gs as common_support_content_label, hs as common_support_cancel, iu as settings_nav_tickets, ks as common_support_track_hint_link, ms as common_support_attachments_label, nu as settings_nav_payments, ru as settings_nav_profile, tu as settings_nav_overview, vs as common_support_description, ws as common_support_submitting, xs as common_support_sign_in, ys as common_support_open_label } from "./messages-B_Y80loh.mjs";
import { o as envConfigs } from "./schema-DWa8-2WU.mjs";
import { t as Link$1 } from "./navigation-BgznuAML.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { v as useSession } from "./client-xUgmZoCV.mjs";
import { o as apiPost } from "./api-client-BXIVLJCS.mjs";
import { D as Receipt, Dt as Coins, Q as LayoutDashboard, Tt as CreditCard, X as LifeBuoy, et as Key, n as X, o as User, st as House } from "../_libs/lucide-react.mjs";
import { n as buttonVariants, t as Button$1 } from "./button-RkClB0x2.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Label } from "./label-Dzpc0zKw.mjs";
import { t as Input$1 } from "./input-B6v4Jp25.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog$1 } from "./dialog-B11F4Fxp.mjs";
import { t as currentPathWithQuery } from "./redirect-BuZ_SNMV.mjs";
import { t as Textarea } from "./textarea-kLCUgc24.mjs";
import { t as ImageUploader } from "./image-uploader-BSMgxL3y.mjs";
import { t as AppLayout } from "./app-layout-4MAZwTE-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-f7WW9j3I.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Floating support button (bottom-right) that opens a quick ticket form.
* Drop into any page or layout: <SupportWidget />
*
* Requires login — unauthenticated users get a sign-in prompt instead.
*/
function SupportWidget() {
	const { data: session, isPending } = useSession();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [title, setTitle] = (0, import_react.useState)("");
	const [content, setContent] = (0, import_react.useState)("");
	const [attachments, setAttachments] = (0, import_react.useState)([]);
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const [uploaderKey, setUploaderKey] = (0, import_react.useState)(0);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	async function submit() {
		if (!title.trim() || !content.trim()) {
			toast.error(common_support_required());
			return;
		}
		setSubmitting(true);
		try {
			await apiPost("/api/tickets", {
				title,
				content,
				attachments
			});
			toast.success(common_support_success());
			setOpen(false);
			setTitle("");
			setContent("");
			setAttachments([]);
			setUploaderKey((k) => k + 1);
		} catch (e) {
			toast.error(e?.message || "Failed");
		} finally {
			setSubmitting(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		"aria-label": common_support_open_label(),
		onClick: () => setOpen(true),
		className: cn("fixed right-6 bottom-6 z-50 size-12 rounded-full", "bg-primary text-primary-foreground shadow-lg", "flex items-center justify-center", "transition-all hover:scale-105 hover:shadow-xl"),
		children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LifeBuoy, { className: "size-5" })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
		open,
		onOpenChange: setOpen,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: common_support_title() }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: common_support_description() })] }), !isPending && !session?.user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-4 py-6 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground text-sm",
				children: common_support_sign_in_notice()
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
				href: `/sign-in?callbackUrl=${encodeURIComponent(currentPathWithQuery("/"))}`,
				className: cn(buttonVariants()),
				children: common_support_sign_in()
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: (e) => {
				e.preventDefault();
				submit();
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4 py-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "support-title",
							children: common_support_title_label()
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
							id: "support-title",
							value: title,
							maxLength: 200,
							onChange: (e) => setTitle(e.target.value),
							placeholder: common_support_title_placeholder()
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "support-content",
							children: common_support_content_label()
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "support-content",
							value: content,
							maxLength: 5e3,
							rows: 5,
							onChange: (e) => setContent(e.target.value),
							placeholder: common_support_content_placeholder()
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: common_support_attachments_label() }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageUploader, {
							allowMultiple: true,
							maxImages: 9,
							onChange: (items) => {
								setAttachments(items.filter((i) => i.status === "uploaded" && i.url).map((i) => i.url));
								setUploading(items.some((i) => i.status === "uploading"));
							}
						}, uploaderKey)]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-muted-foreground text-xs",
						children: [
							common_support_track_hint_prefix(),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
								href: "/settings/tickets",
								className: "hover:text-foreground underline",
								children: common_support_track_hint_link()
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
				type: "button",
				variant: "outline",
				onClick: () => setOpen(false),
				children: common_support_cancel()
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
				type: "submit",
				disabled: submitting || uploading,
				children: submitting ? common_support_submitting() : common_support_submit()
			})] })]
		})] })
	})] });
}
function SettingsLayout() {
	const group = common_systems_settings();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLayout, {
		navItems: [
			{
				href: "/settings",
				label: settings_nav_overview(),
				icon: LayoutDashboard,
				group
			},
			{
				href: "/settings/billing",
				label: settings_nav_billing(),
				icon: CreditCard,
				group
			},
			{
				href: "/settings/payments",
				label: settings_nav_payments(),
				icon: Receipt,
				group
			},
			{
				href: "/settings/credits",
				label: settings_nav_credits(),
				icon: Coins,
				group
			},
			{
				href: "/settings/apikeys",
				label: settings_nav_apikeys(),
				icon: Key,
				group
			},
			{
				href: "/settings/tickets",
				label: settings_nav_tickets(),
				icon: LifeBuoy,
				group
			}
		],
		footerNavItems: [{
			href: "/settings/profile",
			label: settings_nav_profile(),
			icon: User
		}, {
			href: "/",
			label: common_systems_home(),
			icon: House,
			newTab: true
		}],
		brand: envConfigs.app_name,
		brandHref: "/settings",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SupportWidget, {})]
	});
}
//#endregion
export { SettingsLayout as component };
