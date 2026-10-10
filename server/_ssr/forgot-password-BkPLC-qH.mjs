import { o as __toESM } from "../_runtime.mjs";
import { at as require_jsx_runtime, ot as require_react } from "../_libs/@base-ui/react+[...].mjs";
import { f as localizeHref } from "./ssr.mjs";
import { Co as common_sign_forgot_password_description, Ho as common_sign_password_reset_unavailable_title, Vo as common_sign_password_reset_unavailable_description, Xo as common_sign_reset_link_sent_title, Yo as common_sign_reset_link_sent_description, bo as common_sign_email_placeholder, go as common_sign_back_to_sign_in, rs as common_sign_send_reset_link, wo as common_sign_forgot_password_title, xo as common_sign_email_title } from "./messages-B_Y80loh.mjs";
import { o as envConfigs } from "./schema-DWa8-2WU.mjs";
import { t as Link$1 } from "./navigation-BgznuAML.mjs";
import { f as requestPasswordReset } from "./client-xUgmZoCV.mjs";
import { t as Button$1 } from "./button-RkClB0x2.mjs";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-CJS2GQq6.mjs";
import { t as usePublicConfig } from "./use-public-config-6tm3ISeI.mjs";
import { n as FieldDescription, r as FieldGroup, t as Field } from "./field-BZh9EFVs.mjs";
import { t as TextField } from "./form-field-DX3nwIlh.mjs";
import { h as object, v as string } from "../_libs/zod.mjs";
import { t as useForm } from "../_libs/@tanstack/react-form+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/forgot-password-BkPLC-qH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var forgotSchema = object({ email: string().email(common_sign_email_placeholder()) });
function ForgotPasswordPage() {
	const [error, setError] = (0, import_react.useState)("");
	const [sent, setSent] = (0, import_react.useState)(false);
	const [sentEmail, setSentEmail] = (0, import_react.useState)("");
	const configQuery = usePublicConfig();
	const configs = configQuery.data ?? {};
	const configsLoaded = configQuery.isSuccess;
	const passwordResetEnabled = configs.password_reset_enabled === "true";
	const form = useForm({
		defaultValues: { email: "" },
		validators: { onSubmit: forgotSchema },
		onSubmit: async ({ value }) => {
			setError("");
			try {
				const redirectTo = `${window.location.origin}${localizeHref("/reset-password")}`;
				const result = await requestPasswordReset({
					email: value.email,
					redirectTo
				});
				if (result.error) setError(result.error.message || "Request failed");
				else {
					setSentEmail(value.email);
					setSent(true);
				}
			} catch (err) {
				setError(err.message || "Request failed");
			}
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex w-full max-w-sm flex-col gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
				href: "/",
				className: "self-center font-serif text-lg italic",
				children: configs.app_name || envConfigs.app_name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
				className: "text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-xl",
					children: sent ? common_sign_reset_link_sent_title() : common_sign_forgot_password_title()
				}), !sent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: common_sign_forgot_password_description() })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: configsLoaded && !passwordResetEnabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldGroup, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border border-dashed p-6 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium",
					children: common_sign_password_reset_unavailable_title()
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground mt-1 text-sm",
					children: common_sign_password_reset_unavailable_description()
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
				href: "/sign-in",
				className: "text-center text-sm underline underline-offset-4",
				children: common_sign_back_to_sign_in()
			}) })] }) : sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldGroup, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground text-center text-sm",
				children: common_sign_reset_link_sent_description({ email: sentEmail })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
				href: "/sign-in",
				className: "text-center text-sm underline underline-offset-4",
				children: common_sign_back_to_sign_in()
			}) })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
				onSubmit: (e) => {
					e.preventDefault();
					form.handleSubmit();
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldGroup, { children: [
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-destructive/10 text-destructive rounded-lg p-3 text-sm",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
						name: "email",
						children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
							field,
							label: common_sign_email_title(),
							type: "email",
							required: true,
							placeholder: common_sign_email_placeholder()
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Subscribe, {
						selector: (s) => s.isSubmitting,
						children: (isSubmitting) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							type: "submit",
							disabled: isSubmitting,
							children: isSubmitting ? "..." : common_sign_send_reset_link()
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldDescription, {
						className: "text-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
							href: "/sign-in",
							className: "underline underline-offset-4",
							children: common_sign_back_to_sign_in()
						})
					})] })
				] })
			}) })] })]
		})
	});
}
//#endregion
export { ForgotPasswordPage as component };
