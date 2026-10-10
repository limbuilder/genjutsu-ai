import { l as getServerFnById, n as createServerFn, t as TSS_SERVER_FUNCTION } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/server-D0L5gi3t.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
/**
* All blog posts: database posts merged with local MDX posts,
* deduped by slug (database wins), newest first.
*/
var getBlogPostsFn = createServerFn().inputValidator((data) => data).handler(createSsrRpc("139369ba08645c08201ff69bd24b596cdc0f7784b8b3ffd8c6a14f47bbeac9cf"));
/**
* Single blog post by slug: database first, local MDX as fallback.
* Local posts return meta only — the route component resolves the MDX
* Content from the bundled glob map (components don't serialize).
*/
var getBlogPostFn = createServerFn().inputValidator((data) => data).handler(createSsrRpc("b19d1425e0192068330144e802eeba64d1a59e4653703cc76476349d6a195d71"));
//#endregion
export { getBlogPostFn as n, getBlogPostsFn as r, createSsrRpc as t };
