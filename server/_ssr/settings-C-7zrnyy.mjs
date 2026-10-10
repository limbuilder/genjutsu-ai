import { o as __toESM } from "../_runtime.mjs";
import { at as require_jsx_runtime, n as SwitchRoot, ot as require_react, t as SwitchThumb } from "../_libs/@base-ui/react+[...].mjs";
import { Ai as admin_settings_placeholders_paypal_test_amount, Bi as admin_settings_test_run, Ci as admin_settings_custom_key_placeholder, Di as admin_settings_description, Ei as admin_settings_custom_value_placeholder, Fi as admin_settings_saving, Hi as admin_settings_test_title, Ii as admin_settings_test_button, Li as admin_settings_test_close, Mi as admin_settings_save, Ni as admin_settings_save_error, Oi as admin_settings_placeholders_alipay_test_amount, Pi as admin_settings_save_success, Ri as admin_settings_test_description, Si as admin_settings_custom_empty, Ti as admin_settings_custom_title, Ui as admin_settings_title, Vi as admin_settings_test_running, Zt as admin_loading, bi as admin_settings_custom_add, ji as admin_settings_placeholders_wechat_test_amount, ki as admin_settings_placeholders_creem_test_amount, wi as admin_settings_custom_remove, xi as admin_settings_custom_description, zi as admin_settings_test_error } from "./messages-B_Y80loh.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { i as apiGet, o as apiPost } from "./api-client-BXIVLJCS.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { At as CircleX, B as Minus, C as Save, It as ChevronDown, K as LoaderCircle, Mt as CircleCheck, k as Plus, pt as FlaskConical } from "../_libs/lucide-react.mjs";
import { t as Button$1 } from "./button-RkClB0x2.mjs";
import { a as CardHeader, n as CardContent, o as CardTitle, t as Card } from "./card-CJS2GQq6.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Label } from "./label-Dzpc0zKw.mjs";
import { t as Input$1 } from "./input-B6v4Jp25.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog$1 } from "./dialog-B11F4Fxp.mjs";
import { t as tDynamic } from "./dynamic-B_Qghgly.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select$1 } from "./select-D8V5MTA2.mjs";
import { d as getSettingGroups, f as getSettingTabs, p as getSettings } from "./service-BFNPT8hJ.mjs";
import { t as getTestSpec } from "./settings-test-specs-C-NeGIE3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-C-7zrnyy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SettingsTestDialog({ open, onOpenChange, group, spec, groupTitle, configOverrides }) {
	const [inputs, setInputs] = (0, import_react.useState)({});
	const [result, setResult] = (0, import_react.useState)(null);
	const testMutation = useMutation({
		mutationFn: () => apiPost("/api/admin/settings/test", {
			group,
			inputs,
			configs: configOverrides ?? {}
		}),
		onSuccess: (data) => {
			setResult(data);
		},
		onError: (err) => {
			setResult({
				success: false,
				message: err?.message || admin_settings_test_error()
			});
		}
	});
	const running = testMutation.isPending;
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const initial = {};
		for (const f of spec.fields) if (f.defaultValue) initial[f.name] = f.defaultValue;
		setInputs(initial);
		setResult(null);
		testMutation.reset();
	}, [
		open,
		group,
		spec
	]);
	const canRun = (0, import_react.useMemo)(() => spec.fields.every((f) => !f.required || !!inputs[f.name]?.trim()), [spec.fields, inputs]);
	function handleRun() {
		setResult(null);
		testMutation.mutate();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "sm:max-w-lg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: admin_settings_test_title({ group: groupTitle }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: admin_settings_test_description() })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "grid gap-4",
				onSubmit: (e) => {
					e.preventDefault();
					handleRun();
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: spec.fields.map((field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TestInput, {
							field,
							value: inputs[field.name] ?? "",
							onChange: (v) => setInputs((prev) => ({
								...prev,
								[field.name]: v
							}))
						}, field.name))
					}),
					result && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TestResultView, { result }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						type: "button",
						variant: "outline",
						onClick: () => onOpenChange(false),
						disabled: running,
						children: admin_settings_test_close()
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
						type: "submit",
						disabled: running || !canRun,
						children: [running && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }), running ? admin_settings_test_running() : admin_settings_test_run()]
					})] })
				]
			})]
		})
	});
}
function TestInput({ field, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
			htmlFor: field.name,
			children: [field.label, field.required && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-destructive ml-1",
				children: "*"
			})]
		}), field.type === "textarea" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
			id: field.name,
			value,
			onChange: (e) => onChange(e.target.value),
			placeholder: field.placeholder,
			rows: 3,
			className: "border-input placeholder:text-muted-foreground focus-visible:ring-ring flex w-full rounded-md border bg-transparent px-3 py-2 text-sm focus-visible:ring-1 focus-visible:outline-none"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
			id: field.name,
			type: field.type === "number" ? "number" : field.type === "email" ? "email" : "text",
			value,
			onChange: (e) => onChange(e.target.value),
			placeholder: field.placeholder
		})]
	});
}
function TestResultView({ result }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `rounded-lg border p-3 text-sm ${result.success ? "border-emerald-500/30 bg-emerald-500/5" : "border-destructive/30 bg-destructive/5"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-2 font-medium",
			children: [result.success ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mt-0.5 size-4 shrink-0 text-emerald-600" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "text-destructive mt-0.5 size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: result.success ? "" : "text-destructive",
				children: result.message
			})]
		}), result.details && Object.keys(result.details).length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
			className: "mt-3 space-y-1.5 text-xs",
			children: Object.entries(result.details).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-[auto_1fr] gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dt", {
					className: "text-muted-foreground whitespace-nowrap",
					children: [k, ":"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
					className: "break-all",
					children: v?.startsWith("http") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: v,
						target: "_blank",
						rel: "noreferrer",
						className: "text-primary underline underline-offset-2",
						children: v
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono",
						children: v
					})
				})]
			}, k))
		})]
	});
}
function Switch$1({ className, size = "default", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchRoot, {
		"data-slot": "switch",
		"data-size": size,
		className: cn("peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-[size=default]:h-[18.4px] data-[size=default]:w-[32px] data-[size=sm]:h-[14px] data-[size=sm]:w-[24px] dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:bg-primary data-unchecked:bg-input dark:data-unchecked:bg-input/80 data-disabled:cursor-not-allowed data-disabled:opacity-50", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, {
			"data-slot": "switch-thumb",
			className: "pointer-events-none block rounded-full bg-background ring-0 transition-transform group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] dark:data-checked:bg-primary-foreground group-data-[size=default]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0 dark:data-unchecked:bg-foreground"
		})
	});
}
function AdminSettingsPage() {
	const placeholders = {
		creem_test_amount: admin_settings_placeholders_creem_test_amount(),
		paypal_test_amount: admin_settings_placeholders_paypal_test_amount(),
		alipay_test_amount: admin_settings_placeholders_alipay_test_amount(),
		wechat_test_amount: admin_settings_placeholders_wechat_test_amount()
	};
	const queryClient = useQueryClient();
	const [configs, setConfigs] = (0, import_react.useState)({});
	const [activeTab, setActiveTab] = (0, import_react.useState)("general");
	const [collapsed, setCollapsed] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [testingGroup, setTestingGroup] = (0, import_react.useState)(null);
	const [customRows, setCustomRows] = (0, import_react.useState)([]);
	function toggleCollapse(name) {
		setCollapsed((prev) => {
			const next = new Set(prev);
			if (next.has(name)) next.delete(name);
			else next.add(name);
			return next;
		});
	}
	const tabs = getSettingTabs();
	const groups = getSettingGroups();
	const settings = getSettings();
	const { data: loadedConfigs, isLoading } = useQuery({
		queryKey: ["admin-config"],
		queryFn: () => apiGet("/api/admin/config")
	});
	(0, import_react.useEffect)(() => {
		if (loadedConfigs) setConfigs(loadedConfigs);
	}, [loadedConfigs]);
	const { data: loadedCustom } = useQuery({
		queryKey: ["admin-config-custom"],
		queryFn: () => apiGet("/api/admin/config/custom")
	});
	(0, import_react.useEffect)(() => {
		if (loadedCustom) setCustomRows(loadedCustom);
	}, [loadedCustom]);
	function handleChange(name, value) {
		setConfigs((prev) => ({
			...prev,
			[name]: value
		}));
	}
	function addCustomRow() {
		setCustomRows((prev) => [...prev, {
			key: "",
			value: ""
		}]);
	}
	function removeCustomRow(index) {
		setCustomRows((prev) => prev.filter((_, i) => i !== index));
	}
	function updateCustomRow(index, field, value) {
		setCustomRows((prev) => prev.map((row, i) => i === index ? {
			...row,
			[field]: value
		} : row));
	}
	const saveMutation = useMutation({
		mutationFn: (toSave) => apiPost("/api/admin/config", toSave),
		onSuccess: () => {
			toast.success(admin_settings_save_success());
			queryClient.invalidateQueries({ queryKey: ["admin-config"] });
			queryClient.invalidateQueries({ queryKey: ["public-config"] });
		},
		onError: (err) => {
			toast.error(err?.message || admin_settings_save_error());
		}
	});
	const customSaveMutation = useMutation({
		mutationFn: (rows) => apiPost("/api/admin/config/custom", { configs: rows }),
		onSuccess: () => {
			toast.success(admin_settings_save_success());
			queryClient.invalidateQueries({ queryKey: ["admin-config-custom"] });
			queryClient.invalidateQueries({ queryKey: ["public-config"] });
		},
		onError: (err) => {
			toast.error(err?.message || admin_settings_save_error());
		}
	});
	const saving = saveMutation.isPending || customSaveMutation.isPending;
	function handleSave() {
		if (activeTab === "custom") {
			const rows = customRows.map((r) => ({
				key: r.key.trim(),
				value: r.value
			})).filter((r) => r.key);
			customSaveMutation.mutate(rows);
			return;
		}
		const tabSettings = settings.filter((s) => s.tab === activeTab);
		const toSave = {};
		for (const s of tabSettings) if (configs[s.name] !== void 0) toSave[s.name] = configs[s.name];
		saveMutation.mutate(toSave);
	}
	const tabGroups = groups.filter((g) => g.tab === activeTab);
	const tabSettings = settings.filter((s) => s.tab === activeTab);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 p-6 md:max-w-3xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold",
					children: admin_settings_title()
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: admin_settings_description()
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
					onClick: handleSave,
					disabled: saving,
					className: "gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-4" }), saving ? admin_settings_saving() : admin_settings_save()]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-border flex gap-1 overflow-x-auto overflow-y-hidden border-b",
				children: tabs.map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setActiveTab(tab.name),
					className: cn("-mb-px border-b-2 px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors", activeTab === tab.name ? "border-primary text-foreground" : "text-muted-foreground hover:text-foreground border-transparent"),
					children: tDynamic(`admin.settings.tabs.${tab.name}`)
				}, tab.name))
			}),
			isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-muted-foreground",
				children: admin_loading()
			}) : activeTab === "custom" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: admin_settings_custom_title() }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground text-sm",
				children: admin_settings_custom_description()
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-4",
				children: [
					customRows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground text-sm",
						children: admin_settings_custom_empty()
					}),
					customRows.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								value: row.key,
								onChange: (e) => updateCustomRow(i, "key", e.target.value),
								placeholder: admin_settings_custom_key_placeholder(),
								className: "w-1/3 shrink-0 font-mono"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: row.value,
								onChange: (e) => updateCustomRow(i, "value", e.target.value),
								placeholder: admin_settings_custom_value_placeholder(),
								rows: 1,
								className: "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 flex h-8 max-h-48 min-h-8 flex-1 resize-y rounded-lg border bg-transparent px-2.5 py-1 text-base leading-6 transition-colors outline-none focus-visible:ring-3 md:text-sm"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
								variant: "outline",
								size: "icon",
								className: "shrink-0",
								onClick: () => removeCustomRow(i),
								"aria-label": admin_settings_custom_remove(),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-4" })
							})
						]
					}, i)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
						variant: "outline",
						onClick: addCustomRow,
						className: "gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), admin_settings_custom_add()]
					})
				]
			})] }) : tabGroups.map((group) => {
				const groupSettings = tabSettings.filter((s) => s.group === group.name);
				if (groupSettings.length === 0) return null;
				const testSpec = getTestSpec(group.name);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
					className: "cursor-pointer select-none",
					onClick: () => toggleCollapse(group.name),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: tDynamic(`admin.settings.groups.${group.name}.title`) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [testSpec && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
								variant: "outline",
								size: "sm",
								className: "gap-1.5",
								onClick: (e) => {
									e.stopPropagation();
									setTestingGroup(group.name);
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlaskConical, { className: "size-3.5" }), admin_settings_test_button()]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: `text-muted-foreground size-5 transition-transform ${collapsed.has(group.name) ? "-rotate-90" : ""}` })]
						})]
					})
				}), !collapsed.has(group.name) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "space-y-4",
					children: groupSettings.map((setting) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingField, {
						setting,
						label: tDynamic(`admin.settings.fields.${setting.name}`),
						placeholder: placeholders[setting.name] ?? setting.placeholder,
						value: configs[setting.name] ?? setting.defaultValue ?? "",
						onChange: (v) => handleChange(setting.name, v)
					}, setting.name))
				})] }, group.name);
			}),
			testingGroup && getTestSpec(testingGroup) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsTestDialog, {
				open: !!testingGroup,
				onOpenChange: (open) => !open && setTestingGroup(null),
				group: testingGroup,
				spec: getTestSpec(testingGroup),
				groupTitle: tDynamic(`admin.settings.groups.${testingGroup}.title`),
				configOverrides: Object.fromEntries(settings.filter((s) => s.group === testingGroup && configs[s.name] !== void 0).map((s) => [s.name, configs[s.name]]))
			})
		]
	});
}
function SettingField({ setting, label, placeholder, value, onChange }) {
	if (setting.type === "switch") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			htmlFor: setting.name,
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
			id: setting.name,
			checked: value === "true",
			onCheckedChange: (checked) => onChange(checked ? "true" : "false")
		}) })]
	});
	if (setting.type === "select" && setting.options) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			htmlFor: setting.name,
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select$1, {
			value,
			onValueChange: (v) => onChange(v || ""),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: placeholder || "Select..." }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: setting.options.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
				value: opt.value,
				children: opt.label
			}, opt.value)) })]
		})]
	});
	if (setting.type === "textarea") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			htmlFor: setting.name,
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
			id: setting.name,
			value,
			onChange: (e) => onChange(e.target.value),
			placeholder,
			rows: 3,
			className: "border-input placeholder:text-muted-foreground focus-visible:ring-ring flex w-full rounded-md border bg-transparent px-3 py-2 text-sm focus-visible:ring-1 focus-visible:outline-none"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			htmlFor: setting.name,
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
			id: setting.name,
			type: setting.type === "password" ? "password" : setting.type === "number" ? "number" : "text",
			value,
			onChange: (e) => onChange(e.target.value),
			placeholder
		})]
	});
}
//#endregion
export { AdminSettingsPage as component };
