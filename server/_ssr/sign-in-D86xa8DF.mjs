import { o as __toESM } from "../_runtime.mjs";
import { at as require_jsx_runtime, ot as require_react } from "../_libs/@base-ui/react+[...].mjs";
import { f as localizeHref } from "./ssr.mjs";
import { Bo as common_sign_password_placeholder, Eo as common_sign_google_sign_in, Fo as common_sign_no_account, Io as common_sign_no_methods_description, Lo as common_sign_no_methods_title, Ro as common_sign_or, So as common_sign_forgot_password, To as common_sign_github_sign_in, Uo as common_sign_password_title, bo as common_sign_email_placeholder, is as common_sign_sign_in_title, os as common_sign_sign_up_title, xo as common_sign_email_title } from "./messages-B_Y80loh.mjs";
import { o as envConfigs } from "./schema-DWa8-2WU.mjs";
import { r as useRouter$1, t as Link$1 } from "./navigation-BgznuAML.mjs";
import { h as signIn, n as authClient, v as useSession } from "./client-xUgmZoCV.mjs";
import { t as Button$1 } from "./button-RkClB0x2.mjs";
import { a as CardHeader, n as CardContent, o as CardTitle, t as Card } from "./card-CJS2GQq6.mjs";
import { t as Input$1 } from "./input-B6v4Jp25.mjs";
import { a as safeInternalPath, i as resolveAfterAuthUrl } from "./redirect-BuZ_SNMV.mjs";
import { t as usePublicConfig } from "./use-public-config-6tm3ISeI.mjs";
import { a as FieldSeparator, i as FieldLabel, n as FieldDescription, r as FieldGroup, t as Field } from "./field-BZh9EFVs.mjs";
import { t as TextField } from "./form-field-DX3nwIlh.mjs";
import { h as object, v as string } from "../_libs/zod.mjs";
import { t as useForm } from "../_libs/@tanstack/react-form+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sign-in-D86xa8DF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var signInSchema = object({
	email: string().email(common_sign_email_placeholder()),
	password: string().min(1)
});
function SignInPage() {
	const router = useRouter$1();
	const { data: session, isPending: sessionPending } = useSession();
	const navigatingRef = (0, import_react.useRef)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [redirectParam, setRedirectParam] = (0, import_react.useState)(null);
	const [callbackUrl, setCallbackUrl] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const params = new URLSearchParams(window.location.search);
		setRedirectParam(params.get("redirect"));
		setCallbackUrl(params.get("callbackUrl"));
	}, []);
	(0, import_react.useEffect)(() => {
		if (sessionPending || navigatingRef.current) return;
		if (session?.user) {
			navigatingRef.current = true;
			router.push("/");
		}
	}, [
		sessionPending,
		session?.user,
		router
	]);
	const safeCallbackUrl = safeInternalPath(callbackUrl);
	const afterLoginUrl = resolveAfterAuthUrl({
		redirect: redirectParam,
		callbackUrl,
		fallback: "/"
	});
	const switchQuery = (() => {
		const p = new URLSearchParams();
		if (safeCallbackUrl) p.set("callbackUrl", safeCallbackUrl);
		if (redirectParam) p.set("redirect", redirectParam);
		const s = p.toString();
		return s ? `?${s}` : "";
	})();
	const configQuery = usePublicConfig();
	const configs = configQuery.data ?? {};
	const configsLoaded = configQuery.isSuccess;
	const emailEnabled = configs.email_auth_enabled !== "false";
	const googleEnabled = configs.google_auth_enabled === "true";
	const githubEnabled = configs.github_auth_enabled === "true";
	const passwordResetEnabled = configs.password_reset_enabled === "true";
	const hasSocial = googleEnabled || githubEnabled;
	const hasAnyMethod = emailEnabled || hasSocial;
	const form = useForm({
		defaultValues: {
			email: "",
			password: ""
		},
		validators: { onSubmit: signInSchema },
		onSubmit: async ({ value }) => {
			setError("");
			try {
				const result = await signIn.email({
					email: value.email,
					password: value.password
				});
				if (result.error) {
					const status = result.error.status;
					const code = result.error.code;
					const msg = result.error.message || "";
					if (code === "EMAIL_NOT_VERIFIED" || status === 403 && /not verified/i.test(msg)) {
						const verifyPath = `/verify-email?sent=1&email=${encodeURIComponent(value.email)}&callbackUrl=${encodeURIComponent(afterLoginUrl)}`;
						authClient.sendVerificationEmail({
							email: value.email,
							callbackURL: localizeHref(afterLoginUrl)
						});
						router.push(verifyPath);
						return;
					}
					setError(msg || "Sign in failed");
				} else {
					navigatingRef.current = true;
					window.location.assign(localizeHref(afterLoginUrl));
				}
			} catch (err) {
				setError(err.message || "Sign in failed");
			}
		}
	});
	async function handleSocial(provider) {
		await signIn.social({
			provider,
			callbackURL: afterLoginUrl
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex w-full max-w-sm flex-col gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
				href: "/",
				className: "self-center font-serif text-lg italic",
				children: configs.app_name || envConfigs.app_name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
				className: "text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-xl",
					children: common_sign_sign_in_title()
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: configsLoaded && !hasAnyMethod ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border border-dashed p-6 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium",
					children: common_sign_no_methods_title()
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground mt-1 text-sm",
					children: common_sign_no_methods_description()
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
				onSubmit: (e) => {
					e.preventDefault();
					form.handleSubmit();
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldGroup, { children: [
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-destructive/10 text-destructive rounded-lg p-3 text-sm",
						children: error
					}),
					hasSocial && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [googleEnabled && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
						variant: "outline",
						type: "button",
						onClick: () => handleSocial("google"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							xmlns: "http://www.w3.org/2000/svg",
							viewBox: "0 0 24 24",
							className: "size-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z",
								fill: "currentColor"
							})
						}), common_sign_google_sign_in()]
					}), githubEnabled && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
						variant: "outline",
						type: "button",
						onClick: () => handleSocial("github"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							xmlns: "http://www.w3.org/2000/svg",
							viewBox: "0 0 24 24",
							className: "size-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
								fill: "currentColor"
							})
						}), common_sign_github_sign_in()]
					})] }),
					hasSocial && emailEnabled && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldSeparator, {
						className: "*:data-[slot=field-separator-content]:bg-card",
						children: common_sign_or()
					}),
					emailEnabled && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
							name: "password",
							children: (field) => {
								const err = field.state.meta.isTouched ? field.state.meta.errors?.[0] : null;
								const errMsg = err == null ? null : typeof err === "string" ? err : err.message ? String(err.message) : String(err);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
											htmlFor: field.name,
											children: common_sign_password_title()
										}), passwordResetEnabled && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
											href: "/forgot-password",
											className: "text-muted-foreground hover:text-foreground text-sm underline underline-offset-4",
											children: common_sign_forgot_password()
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
										id: field.name,
										name: field.name,
										type: "password",
										value: field.state.value,
										onChange: (e) => field.handleChange(e.target.value),
										onBlur: field.handleBlur,
										required: true,
										placeholder: common_sign_password_placeholder(),
										"aria-invalid": errMsg ? true : void 0
									}),
									errMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-destructive text-sm",
										children: errMsg
									})
								] });
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Subscribe, {
							selector: (s) => s.isSubmitting,
							children: (isSubmitting) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
								type: "submit",
								disabled: isSubmitting,
								children: isSubmitting ? "..." : common_sign_sign_in_title()
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldDescription, {
							className: "text-center",
							children: [
								common_sign_no_account(),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
									href: `/sign-up${switchQuery}`,
									className: "underline underline-offset-4",
									children: common_sign_sign_up_title()
								})
							]
						})] })
					] })
				] })
			}) })] })]
		})
	});
}
//#endregion
export { SignInPage as component };
