import { d as lazyRouteComponent, f as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as getLocale } from "./ssr.mjs";
import { Ya as blog_description, Za as blog_title } from "./messages-B_Y80loh.mjs";
import { o as envConfigs } from "./schema-DWa8-2WU.mjs";
import { r as getBlogPostsFn } from "./server-D0L5gi3t.mjs";
import { n as localeLinks, r as socialMeta } from "./seo-DetwpQ1h.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blog-BLlBqRce.js
var $$splitComponentImporter = () => import("./blog-PdUOYrVl.mjs");
var Route = createFileRoute("/blog/")({
	loader: async () => {
		const locale = getLocale();
		return {
			locale,
			posts: await getBlogPostsFn({ data: { locale } })
		};
	},
	head: ({ loaderData }) => {
		const locale = loaderData?.locale ?? "en";
		const title = `${blog_title({}, { locale })} | ${envConfigs.app_name}`;
		const description = blog_description({}, { locale });
		const { canonical, alternates } = localeLinks("/blog", locale);
		return {
			meta: [
				{ title },
				{
					name: "description",
					content: description
				},
				...socialMeta({
					title,
					description,
					url: canonical
				})
			],
			links: [{
				rel: "canonical",
				href: canonical
			}, ...alternates]
		};
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
