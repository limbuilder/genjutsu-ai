import { i as apiGet } from "./api-client-BXIVLJCS.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-user-permissions-C6K6gQfL.js
function useUserPermissions(enabled = true) {
	return useQuery({
		queryKey: ["user-permissions"],
		queryFn: () => apiGet("/api/user/permissions"),
		staleTime: 5 * 6e4,
		enabled
	});
}
//#endregion
export { useUserPermissions as t };
