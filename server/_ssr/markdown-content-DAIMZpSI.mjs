import { at as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as MarkdownIt } from "../_libs/markdown-it+mdurl+punycode.js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/markdown-content-DAIMZpSI.js
var import_jsx_runtime = require_jsx_runtime();
function generateHeadingId(text) {
	return text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/(^-|-$)/g, "");
}
var md = new MarkdownIt({
	html: false,
	linkify: true
});
md.renderer.rules.heading_open = function(tokens, idx) {
	const level = tokens[idx].markup.length;
	const nextToken = tokens[idx + 1];
	if (nextToken && nextToken.type === "inline") return `<h${level} id="${generateHeadingId(nextToken.content)}">`;
	return `<h${level}>`;
};
md.renderer.rules.link_open = function(tokens, idx, options, _env, renderer) {
	const token = tokens[idx];
	const href = token.attrGet("href");
	if (href && (href.startsWith("http://") || href.startsWith("https://"))) {
		token.attrSet("rel", "nofollow noopener");
		token.attrSet("target", "_blank");
	}
	return renderer.renderToken(tokens, idx, options);
};
var markdownStyles = cn("text-[15px] leading-7 text-foreground/90", "[&_h1]:mt-6 [&_h1]:mb-2 [&_h1]:text-xl [&_h1]:font-semibold [&_h1]:tracking-tight [&_h1]:text-foreground md:[&_h1]:text-2xl", "[&_h2]:mt-6 [&_h2]:mb-2 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-foreground md:[&_h2]:text-xl", "[&_h3]:mt-4 [&_h3]:mb-1.5 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:tracking-tight [&_h3]:text-foreground", "[&_p]:mt-2 [&_p]:leading-7", "[&_a]:font-medium [&_a]:text-primary [&_a]:underline-offset-4 hover:[&_a]:underline", "[&_ul]:mt-2 [&_ul]:ml-6 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:marker:text-muted-foreground", "[&_ol]:mt-2 [&_ol]:ml-6 [&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:marker:text-muted-foreground", "[&_li]:leading-7", "[&_strong]:font-semibold [&_strong]:text-foreground", "[&_blockquote]:my-4 [&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground", "[&_code]:rounded [&_code]:bg-muted [&_code]:px-[0.4rem] [&_code]:py-[0.2rem] [&_code]:font-mono [&_code]:text-sm [&_code]:text-foreground", "[&_pre]:my-4 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:border [&_pre]:border-border [&_pre]:bg-muted [&_pre]:p-4 [&_pre_code]:bg-transparent [&_pre_code]:p-0", "[&_hr]:my-8 [&_hr]:border-border", "[&_img]:my-4 [&_img]:rounded-xl", "[&_table]:my-4 [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:border-border [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_td]:border [&_td]:border-border [&_td]:px-3 [&_td]:py-2");
function MarkdownContent({ content, className }) {
	const html = content ? md.render(content) : "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(markdownStyles, className),
		dangerouslySetInnerHTML: { __html: html }
	});
}
//#endregion
export { markdownStyles as n, MarkdownContent as t };
