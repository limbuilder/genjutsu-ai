import { at as require_jsx_runtime } from "./_libs/@base-ui/react+[...].mjs";
import { t as MDXProvider } from "./_libs/mdx-js__react.mjs";
import { i as loadLocalPost, t as formatPostDate } from "./_ssr/posts-CTlMfIcS.mjs";
import { Ja as blog_back_to_blog } from "./_ssr/messages-B_Y80loh.mjs";
import { t as Route } from "./_slug-DPD1XgLI.mjs";
import { t as Link$1 } from "./_ssr/navigation-BgznuAML.mjs";
import { t as mdxComponents } from "./_ssr/mdx-components-BzHubnlZ.mjs";
import { t as MarkdownContent } from "./_ssr/markdown-content-DAIMZpSI.mjs";
import { Ht as ArrowLeft, Rt as Calendar } from "./_libs/lucide-react.mjs";
import { t as SiteFooter } from "./_ssr/SiteFooter-Bjzgl7AX.mjs";
import { t as SiteHeader } from "./_ssr/SiteHeader-B2cCQXdM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-CMcJq7dz.js
var import_jsx_runtime = require_jsx_runtime();
function BlogPostPage() {
	const { locale, post } = Route.useLoaderData();
	const LocalContent = post.source === "local" ? loadLocalPost(post.slug, locale)?.default : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background text-foreground flex min-h-screen flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1 px-6 py-12 md:px-8 md:py-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "mx-auto max-w-3xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
							href: "/blog",
							className: "text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm font-medium transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), blog_back_to_blog()]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
							className: "border-border mt-8 mb-6 border-b pb-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-foreground text-3xl font-semibold tracking-tight md:text-4xl",
									children: post.title
								}),
								post.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground mt-3",
									children: post.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-muted-foreground mt-4 flex items-center gap-4 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "size-4" }), formatPostDate(post.createdAt, locale)]
									}), (post.authorName || post.authorImage) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-2",
										children: [post.authorImage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: post.authorImage,
											alt: post.authorName || "",
											width: 20,
											height: 20,
											className: "size-5 rounded-full object-cover"
										}), post.authorName]
									})]
								})
							]
						}),
						post.image && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: post.image,
							alt: post.title,
							className: "border-border mb-8 w-full rounded-2xl border object-cover"
						}),
						LocalContent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-foreground/90 text-[15px] leading-7",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MDXProvider, {
								components: mdxComponents,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocalContent, {})
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarkdownContent, { content: post.content || "" })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { BlogPostPage as component };
