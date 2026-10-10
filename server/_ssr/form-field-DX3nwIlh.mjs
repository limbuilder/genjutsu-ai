import { at as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { t as Input$1 } from "./input-B6v4Jp25.mjs";
import { i as FieldLabel, t as Field } from "./field-BZh9EFVs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/form-field-DX3nwIlh.js
var import_jsx_runtime = require_jsx_runtime();
function fieldError(field) {
	if (!field.state.meta.isTouched) return null;
	const errs = field.state.meta.errors;
	if (!errs?.length) return null;
	const first = errs[0];
	if (typeof first === "string") return first;
	if (first && typeof first === "object" && "message" in first) return String(first.message);
	return String(first);
}
function TextField({ field, label, type = "text", placeholder, autoComplete, required, disabled }) {
	const error = fieldError(field);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
			htmlFor: field.name,
			children: label
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
			id: field.name,
			name: field.name,
			type,
			value: field.state.value ?? "",
			onChange: (e) => field.handleChange(e.target.value),
			onBlur: field.handleBlur,
			placeholder,
			autoComplete,
			required,
			disabled,
			"aria-invalid": error ? true : void 0
		}),
		error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-destructive text-sm",
			children: error
		})
	] });
}
//#endregion
export { TextField as t };
