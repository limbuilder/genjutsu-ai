//#region node_modules/.nitro/vite/services/ssr/assets/time-CeCxR6Sp.js
function formatDateTime(input) {
	if (!input) return "—";
	const d = new Date(input);
	if (isNaN(d.getTime())) return "—";
	return d.toLocaleString(void 0, {
		year: "numeric",
		month: "numeric",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: false
	});
}
//#endregion
export { formatDateTime as t };
