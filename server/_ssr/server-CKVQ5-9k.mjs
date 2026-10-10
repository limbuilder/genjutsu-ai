import { n as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-iduwjrCY.mjs";
import { a as mergePosts, i as loadLocalPost, r as getLocalPosts } from "./posts-CTlMfIcS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/server-CKVQ5-9k.js
async function getDbPosts() {
	try {
		const { listPublishedArticles } = await import("./service-B2twHgAx.mjs").then((n) => n.a);
		return (await listPublishedArticles()).map((row) => ({
			slug: row.slug,
			title: row.title || row.slug,
			description: row.description || "",
			image: row.image || void 0,
			createdAt: new Date(row.createdAt).toISOString(),
			authorName: row.authorName || void 0,
			authorImage: row.authorImage || void 0,
			source: "db"
		}));
	} catch {
		return [];
	}
}
/**
* All blog posts: database posts merged with local MDX posts,
* deduped by slug (database wins), newest first.
*/
var getBlogPostsFn_createServerFn_handler = createServerRpc({
	id: "139369ba08645c08201ff69bd24b596cdc0f7784b8b3ffd8c6a14f47bbeac9cf",
	name: "getBlogPostsFn",
	filename: "src/content/posts/server.ts"
}, (opts) => getBlogPostsFn.__executeServer(opts));
var getBlogPostsFn = createServerFn().inputValidator((data) => data).handler(getBlogPostsFn_createServerFn_handler, async ({ data }) => {
	return mergePosts(await getDbPosts(), getLocalPosts(data.locale), { limit: data.limit });
});
var getBlogPostFn_createServerFn_handler = createServerRpc({
	id: "b19d1425e0192068330144e802eeba64d1a59e4653703cc76476349d6a195d71",
	name: "getBlogPostFn",
	filename: "src/content/posts/server.ts"
}, (opts) => getBlogPostFn.__executeServer(opts));
var getBlogPostFn = createServerFn().inputValidator((data) => data).handler(getBlogPostFn_createServerFn_handler, async ({ data }) => {
	try {
		const { findPublishedBySlug } = await import("./service-B2twHgAx.mjs").then((n) => n.a);
		const row = await findPublishedBySlug(data.slug);
		if (row) return {
			slug: row.slug,
			title: row.title || row.slug,
			description: row.description || "",
			image: row.image || void 0,
			createdAt: new Date(row.createdAt).toISOString(),
			authorName: row.authorName || void 0,
			authorImage: row.authorImage || void 0,
			source: "db",
			content: row.content || ""
		};
	} catch {}
	const mod = loadLocalPost(data.slug, data.locale);
	if (!mod) return null;
	const meta = mod.meta;
	return {
		slug: data.slug,
		title: meta.title,
		description: meta.description,
		image: meta.image,
		createdAt: new Date(meta.created_at).toISOString(),
		authorName: meta.author_name,
		authorImage: meta.author_image,
		source: "local"
	};
});
//#endregion
export { getBlogPostFn_createServerFn_handler, getBlogPostsFn_createServerFn_handler };
