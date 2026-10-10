import { _ as notFound, d as lazyRouteComponent, f as createFileRoute } from "./_libs/@tanstack/react-router+[...].mjs";
import { c as getLocale } from "./_ssr/ssr.mjs";
import { o as envConfigs } from "./_ssr/schema-DWa8-2WU.mjs";
import { n as getBlogPostFn } from "./_ssr/server-D0L5gi3t.mjs";
import { n as localeLinks, r as socialMeta, t as absoluteUrl } from "./_ssr/seo-DetwpQ1h.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-DPD1XgLI.js
var $$splitComponentImporter = () => import("./_slug-CMcJq7dz.mjs");
var Route = createFileRoute("/blog/$slug")({
	loader: async ({ params }) => {
		const locale = getLocale();
		const post = await getBlogPostFn({ data: {
			slug: params.slug,
			locale
		} });
		if (!post) throw notFound();
		return {
			locale,
			post
		};
	},
	head: ({ loaderData }) => {
		if (!loaderData) return {};
		const { locale, post } = loaderData;
		const title = `${post.title} | ${envConfigs.app_name}`;
		const { canonical, alternates } = localeLinks(`/blog/${post.slug}`, locale);
		const image = post.image ? absoluteUrl(post.image) : void 0;
		return {
			meta: [
				{ title },
				{
					name: "description",
					content: post.description
				},
				...socialMeta({
					title,
					description: post.description,
					url: canonical,
					image
				})
			],
			links: [{
				rel: "canonical",
				href: canonical
			}, ...alternates],
			scripts: [{
				type: "application/ld+json",
				children: JSON.stringify({
					"@context": "https://schema.org",
					"@type": "BlogPosting",
					headline: post.title,
					description: post.description,
					datePublished: post.createdAt,
					dateModified: post.createdAt,
					inLanguage: locale,
					mainEntityOfPage: canonical,
					...image ? { image: [image] } : {},
					author: {
						"@type": "Organization",
						name: post.authorName || envConfigs.app_name
					},
					publisher: {
						"@type": "Organization",
						name: envConfigs.app_name
					}
				})
			}]
		};
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
