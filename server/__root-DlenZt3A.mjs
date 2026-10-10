import { n as createServerFn } from "./_ssr/ssr.mjs";
import { t as createServerRpc } from "./_ssr/createServerRpc-iduwjrCY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/__root-DlenZt3A.js
var getAnalyticsConfigs_createServerFn_handler = createServerRpc({
	id: "cbd81923ae1249d4c007f69579597cf1e79f1f7b8675cc608ba82e8926b5bb59",
	name: "getAnalyticsConfigs",
	filename: "src/routes/__root.tsx"
}, (opts) => getAnalyticsConfigs.__executeServer(opts));
var getAnalyticsConfigs = createServerFn().handler(getAnalyticsConfigs_createServerFn_handler, async () => {
	const { getAllConfigs } = await import("./_ssr/service-BFNPT8hJ.mjs").then((n) => n.u);
	const configs = await getAllConfigs();
	return {
		gaId: configs.google_analytics_id?.trim() || "",
		plausibleDomain: configs.plausible_domain?.trim() || "",
		plausibleSrc: configs.plausible_src?.trim() || "",
		adsenseCode: configs.adsense_code?.trim() || "",
		crispWebsiteId: configs.crisp_enabled === "true" ? configs.crisp_website_id?.trim() || "" : "",
		tawkPropertyId: configs.tawk_enabled === "true" ? configs.tawk_property_id?.trim() || "" : "",
		tawkWidgetId: configs.tawk_enabled === "true" ? configs.tawk_widget_id?.trim() || "" : ""
	};
});
//#endregion
export { getAnalyticsConfigs_createServerFn_handler };
