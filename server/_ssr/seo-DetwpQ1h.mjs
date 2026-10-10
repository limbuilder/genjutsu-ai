import { d as locales, p as localizeUrl } from "./ssr.mjs";
import { o as envConfigs } from "./schema-DWa8-2WU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/seo-DetwpQ1h.js
/** Absolute URL for social/share cards. Prefer raster over SVG. */
function absoluteUrl(path = "/") {
	const base = envConfigs.app_url || "http://localhost:3000";
	return new URL(path, base).href;
}
function ogImageUrl() {
	return absoluteUrl(envConfigs.app_logo || "/logo.webp");
}
/** Shared Open Graph + Twitter tags for a public page. */
function socialMeta(opts) {
	const image = opts.image || ogImageUrl();
	return [
		{
			property: "og:type",
			content: "website"
		},
		{
			property: "og:title",
			content: opts.title
		},
		{
			property: "og:description",
			content: opts.description
		},
		{
			property: "og:image",
			content: image
		},
		...opts.url ? [{
			property: "og:url",
			content: opts.url
		}] : [],
		{
			name: "twitter:card",
			content: "summary_large_image"
		},
		{
			name: "twitter:title",
			content: opts.title
		},
		{
			name: "twitter:description",
			content: opts.description
		},
		{
			name: "twitter:image",
			content: image
		}
	];
}
/** Canonical + hreflang alternate links for a locale-free path. */
function localeLinks(path, locale) {
	const urlFor = (loc) => localizeUrl(absoluteUrl(path || "/"), { locale: loc }).href;
	return {
		canonical: urlFor(locale),
		alternates: [...locales.map((loc) => ({
			rel: "alternate",
			hrefLang: loc,
			href: urlFor(loc)
		})), {
			rel: "alternate",
			hrefLang: "x-default",
			href: urlFor("en")
		}]
	};
}
//#endregion
export { localeLinks as n, socialMeta as r, absoluteUrl as t };
