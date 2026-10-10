import { o as __toESM } from "../_runtime.mjs";
import { at as require_jsx_runtime, ot as require_react } from "../_libs/@base-ui/react+[...].mjs";
import { co as common_pricing_choose_payment, do as common_pricing_payment_for, fo as common_pricing_payment_for_plan, lo as common_pricing_choose_payment_desc, po as common_pricing_processing, uo as common_pricing_get_started } from "./messages-B_Y80loh.mjs";
import { r as useRouter$1 } from "./navigation-BgznuAML.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { v as useSession } from "./client-xUgmZoCV.mjs";
import { o as apiPost } from "./api-client-BXIVLJCS.mjs";
import { t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { K as LoaderCircle, Lt as Check, Tt as CreditCard } from "../_libs/lucide-react.mjs";
import { t as SiteFooter } from "./SiteFooter-Bjzgl7AX.mjs";
import { t as Button$1 } from "./button-RkClB0x2.mjs";
import { t as SiteHeader } from "./SiteHeader-B2cCQXdM.mjs";
import { d as listVisibleCreditPacks } from "./pricing-C70Iy5jq.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog$1 } from "./dialog-B11F4Fxp.mjs";
import { t as currentPathWithQuery } from "./redirect-BuZ_SNMV.mjs";
import { t as usePublicConfig } from "./use-public-config-6tm3ISeI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pricing-DI526Q38.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var providerLabel = {
	stripe: "Stripe",
	creem: "Creem",
	waffo: "Waffo Pancake",
	paypal: "PayPal",
	alipay: "Alipay",
	wechat: "WeChat Pay"
};
function PaymentProviderModal({ open, onOpenChange, providers, loadingProvider, onSelect, planName, price }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "sm:max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: common_pricing_choose_payment() }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: planName ? price ? common_pricing_payment_for({
				plan: planName,
				price
			}) : common_pricing_payment_for_plan({ plan: planName }) : common_pricing_choose_payment_desc() })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 space-y-2",
				children: providers.map((p) => {
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
						variant: "outline",
						className: "h-12 w-full justify-start gap-3",
						disabled: !!loadingProvider,
						onClick: () => onSelect(p),
						children: [loadingProvider === p ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: providerLabel[p] })]
					}, p);
				})
			})]
		})
	});
}
function PricingTable({ groups, onCheckout }) {
	const [activeGroup, setActiveGroup] = (0, import_react.useState)(groups[0]?.key || "");
	const [loadingId, setLoadingId] = (0, import_react.useState)(null);
	const currentGroup = groups.find((g) => g.key === activeGroup) || groups[0];
	const checkoutMutation = useMutation({
		mutationFn: (plan) => apiPost("/api/payment/checkout", {
			product_id: plan.productId,
			product_name: plan.productName || plan.name,
			plan_name: plan.plan?.name || plan.name,
			price: plan.priceInCents,
			currency: plan.currency || "usd",
			type: plan.plan ? "subscription" : "one-time",
			description: plan.name,
			plan: plan.plan,
			credits: plan.credits,
			credits_valid_days: plan.creditsValidDays,
			payment_provider: plan.paymentProvider || "stripe",
			redirect: currentPathWithQuery("/settings/billing")
		}),
		onSuccess: (data) => {
			if (data?.checkout_url) window.location.href = data.checkout_url;
		},
		onSettled: () => {
			setLoadingId(null);
		}
	});
	function handleCheckout(plan) {
		if (onCheckout) {
			onCheckout(plan);
			return;
		}
		if (!plan.productId || !plan.priceInCents) return;
		setLoadingId(plan.id);
		checkoutMutation.mutate(plan);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-10",
		children: [groups.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-border bg-muted/40 inline-flex items-center rounded-full border p-1",
				children: groups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setActiveGroup(group.key),
					className: cn("rounded-full px-5 py-1.5 text-sm font-medium transition-colors", activeGroup === group.key ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"),
					children: group.label
				}, group.key))
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("mx-auto grid gap-6", currentGroup?.plans.length === 2 ? "max-w-3xl sm:grid-cols-2" : currentGroup?.plans.length === 3 ? "max-w-5xl sm:grid-cols-2 lg:grid-cols-3" : "max-w-6xl sm:grid-cols-2 lg:grid-cols-4"),
			children: currentGroup?.plans.map((plan) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("border-border relative flex flex-col rounded-2xl border p-8 transition-all", plan.featured ? "bg-card ring-foreground/10 shadow-md ring-1" : "bg-background hover:border-foreground/30"),
				children: [
					plan.name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-foreground mb-2 text-sm font-medium",
						children: plan.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-baseline gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-serif text-5xl tracking-tight",
							children: plan.price
						}), plan.interval && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted-foreground text-sm",
							children: ["/", plan.interval]
						})]
					}),
					plan.originalPrice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground mb-1 text-sm line-through",
						children: plan.originalPrice
					}),
					plan.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground mb-8 text-sm",
						children: plan.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						variant: plan.featured ? "default" : "outline",
						className: "h-10 w-full rounded-full text-sm font-medium",
						onClick: () => handleCheckout(plan),
						disabled: loadingId === plan.id,
						children: loadingId === plan.id ? common_pricing_processing() : plan.buttonText || common_pricing_get_started()
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-8 space-y-3",
						children: plan.features.map((feature, i) => {
							const isObj = typeof feature !== "string";
							const Icon = isObj && feature.icon || Check;
							const label = isObj ? feature.label : feature;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-2.5 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "text-muted-foreground size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-foreground/90",
									children: label
								})]
							}, i);
						})
					})
				]
			}, plan.id))
		})]
	});
}
var ALL_PROVIDERS = [
	"stripe",
	"creem",
	"waffo",
	"paypal",
	"alipay",
	"wechat"
];
function Pricing({ title } = {}) {
	const router = useRouter$1();
	const { data: session } = useSession();
	const { data: configsData } = usePublicConfig();
	const configs = configsData ?? {};
	const [modalOpen, setModalOpen] = (0, import_react.useState)(false);
	const [pendingPlan, setPendingPlan] = (0, import_react.useState)(null);
	const [loadingProvider, setLoadingProvider] = (0, import_react.useState)(null);
	const enabledProviders = (0, import_react.useMemo)(() => ALL_PROVIDERS.filter((p) => configs[`${p}_enabled`] === "true"), [configs]);
	const groups = [{
		key: "credits",
		label: "Credit Packs",
		plans: listVisibleCreditPacks(session?.user?.email).map((pack) => {
			const currency = pack.currency || "usd";
			const priceLabel = currency === "cny" ? `¥${(pack.priceCents / 100).toFixed(2)}` : `$${(pack.priceCents / 100).toFixed(2)}`;
			return {
				id: pack.id,
				name: pack.name,
				description: `${pack.credits.toLocaleString()} credits · one-time purchase`,
				price: priceLabel,
				featured: pack.highlighted,
				badge: pack.id === "smoke" ? "Dev only" : pack.highlighted ? "Popular" : void 0,
				features: [
					`${pack.credits.toLocaleString()} Genjutsu credits`,
					"One-time purchase",
					"No subscription",
					"Motion Transfer & Object Swap"
				],
				buttonText: "Buy credits",
				productId: pack.id,
				productName: `${pack.name} Credits`,
				priceInCents: pack.priceCents,
				currency,
				credits: pack.credits
			};
		})
	}];
	const checkoutMutation = useMutation({
		mutationFn: ({ plan, provider }) => apiPost("/api/payment/checkout", {
			product_id: plan.productId,
			payment_provider: provider,
			redirect: currentPathWithQuery("/settings/billing")
		}),
		onSuccess: (data) => {
			if (!data?.checkout_url) {
				toast.error("Checkout failed");
				setLoadingProvider(null);
				return;
			}
			window.location.href = data.checkout_url;
		},
		onError: (err) => {
			toast.error(err?.message || "Checkout failed");
			setLoadingProvider(null);
		}
	});
	function startCheckout(plan, provider) {
		setLoadingProvider(provider);
		checkoutMutation.mutate({
			plan,
			provider
		});
	}
	async function handleCheckout(plan) {
		if (!session?.user) {
			const callbackUrl = encodeURIComponent(currentPathWithQuery("/pricing"));
			router.push(`/sign-in?callbackUrl=${callbackUrl}`);
			return;
		}
		const selectEnabled = configs.select_payment_enabled === "true";
		const preferred = configs.default_payment_provider;
		const defaultProvider = (preferred && enabledProviders.includes(preferred) ? preferred : void 0) || enabledProviders[0];
		if (!defaultProvider) {
			toast.error("No payment provider configured. Enable Waffo in Admin → Settings.");
			return;
		}
		if (selectEnabled && enabledProviders.length > 1) {
			setPendingPlan(plan);
			setModalOpen(true);
			return;
		}
		startCheckout(plan, defaultProvider);
	}
	function handleProviderSelect(provider) {
		if (!pendingPlan) return;
		startCheckout(pendingPlan, provider);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "pricing",
		className: "border-border border-t px-4 py-24 sm:py-32",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-16 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-serif text-4xl font-normal tracking-tight sm:text-5xl",
					children: title ?? "Genjutsu credits"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground mx-auto mt-5 max-w-2xl",
					children: "Pay only for what you generate. Buy credits once, use them for Motion Transfer or Object Swap, and come back whenever you need."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PricingTable, {
				groups,
				onCheckout: handleCheckout
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentProviderModal, {
			open: modalOpen,
			onOpenChange: (open) => {
				setModalOpen(open);
				if (!open) {
					setPendingPlan(null);
					setLoadingProvider(null);
				}
			},
			providers: enabledProviders.length ? enabledProviders : ["waffo"],
			loadingProvider,
			onSelect: handleProviderSelect,
			planName: pendingPlan?.name,
			price: pendingPlan?.price
		})]
	});
}
function PricingPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background text-foreground flex min-h-screen flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pricing, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { PricingPage as component };
