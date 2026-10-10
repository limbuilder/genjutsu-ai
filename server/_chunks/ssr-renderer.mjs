import { i as toRequest, n as HTTPError } from "../_libs/h3+rou3+srvx.mjs";
//#region node_modules/.pnpm/nitro@3.0.260603-beta_@libsql+client@0.14.0_aws4fetch@1.0.20_chokidar@5.0.0_dotenv@17.4_0ac2efac16f8706a6f656af763851b53/node_modules/nitro/dist/runtime/vite.mjs
function fetchViteEnv(viteEnvName, input, init) {
	const viteEnv = (globalThis.__nitro_vite_envs__ || {})[viteEnvName];
	if (!viteEnv) throw HTTPError.status(404);
	return Promise.resolve(viteEnv.fetch(toRequest(input, init)));
}
//#endregion
//#region node_modules/.pnpm/nitro@3.0.260603-beta_@libsql+client@0.14.0_aws4fetch@1.0.20_chokidar@5.0.0_dotenv@17.4_0ac2efac16f8706a6f656af763851b53/node_modules/nitro/dist/runtime/internal/vite/ssr-renderer.mjs
/** @param {{ req: Request }} HTTPEvent */
function ssrRenderer({ req }) {
	return fetchViteEnv("ssr", req);
}
//#endregion
export { ssrRenderer as default };
