import { i as apiGet } from "./api-client-BXIVLJCS.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-user-credits-B5TISbhc.js
function useUserCredits(enabled = true) {
	return useQuery({
		queryKey: ["user-credits"],
		queryFn: () => apiGet("/api/credits"),
		staleTime: 3e4,
		enabled
	});
}
//#endregion
export { useUserCredits as t };
