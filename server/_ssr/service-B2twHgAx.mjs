import { n as __exportAll } from "./chunk-EAsCxrDo.mjs";
import { E as or, f as desc, l as count, m as eq, p as and, x as like } from "../_libs/drizzle-orm.mjs";
import { a as db, u as post } from "./schema-DWa8-2WU.mjs";
import { t as require_lib } from "../_libs/simple-flakeid.mjs";
import { t as v4 } from "../_libs/uuid.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/service-B2twHgAx.js
var import_lib = require_lib();
function getUuid() {
	return v4();
}
function md5(input) {
	const data = typeof input === "string" ? new TextEncoder().encode(input) : input instanceof Uint8Array ? input : new Uint8Array(input);
	const words = [];
	for (let i = 0; i < data.length; i += 1) words[i >> 2] = (words[i >> 2] || 0) | data[i] << i % 4 * 8;
	const bitLen = data.length * 8;
	words[bitLen >> 5] = (words[bitLen >> 5] || 0) | 128 << bitLen % 32;
	words[(bitLen + 64 >>> 9 << 4) + 14] = bitLen;
	let a = 1732584193;
	let b = 4023233417;
	let c = 2562383102;
	let d = 271733878;
	const rotl = (x, n) => x << n | x >>> 32 - n;
	const add = (x, y) => x + y >>> 0;
	const cmn = (q, x, y, s, t) => add(rotl(add(add(x, q), add(y, t)), s), y);
	const ff = (a0, b0, c0, d0, x, s, t) => cmn(b0 & c0 | ~b0 & d0, a0, b0, s, t + x);
	const gg = (a0, b0, c0, d0, x, s, t) => cmn(b0 & d0 | c0 & ~d0, a0, b0, s, t + x);
	const hh = (a0, b0, c0, d0, x, s, t) => cmn(b0 ^ c0 ^ d0, a0, b0, s, t + x);
	const ii = (a0, b0, c0, d0, x, s, t) => cmn(c0 ^ (b0 | ~d0), a0, b0, s, t + x);
	for (let i = 0; i < words.length; i += 16) {
		const oa = a, ob = b, oc = c, od = d;
		a = ff(a, b, c, d, words[i + 0] || 0, 7, 3614090360);
		d = ff(d, a, b, c, words[i + 1] || 0, 12, 3905402710);
		c = ff(c, d, a, b, words[i + 2] || 0, 17, 606105819);
		b = ff(b, c, d, a, words[i + 3] || 0, 22, 3250441966);
		a = ff(a, b, c, d, words[i + 4] || 0, 7, 4118548399);
		d = ff(d, a, b, c, words[i + 5] || 0, 12, 1200080426);
		c = ff(c, d, a, b, words[i + 6] || 0, 17, 2821735955);
		b = ff(b, c, d, a, words[i + 7] || 0, 22, 4249261313);
		a = ff(a, b, c, d, words[i + 8] || 0, 7, 1770035416);
		d = ff(d, a, b, c, words[i + 9] || 0, 12, 2336552879);
		c = ff(c, d, a, b, words[i + 10] || 0, 17, 4294925233);
		b = ff(b, c, d, a, words[i + 11] || 0, 22, 2304563134);
		a = ff(a, b, c, d, words[i + 12] || 0, 7, 1804603682);
		d = ff(d, a, b, c, words[i + 13] || 0, 12, 4254626195);
		c = ff(c, d, a, b, words[i + 14] || 0, 17, 2792965006);
		b = ff(b, c, d, a, words[i + 15] || 0, 22, 1236535329);
		a = gg(a, b, c, d, words[i + 1] || 0, 5, 4129170786);
		d = gg(d, a, b, c, words[i + 6] || 0, 9, 3225465664);
		c = gg(c, d, a, b, words[i + 11] || 0, 14, 643717713);
		b = gg(b, c, d, a, words[i + 0] || 0, 20, 3921069994);
		a = gg(a, b, c, d, words[i + 5] || 0, 5, 3593408605);
		d = gg(d, a, b, c, words[i + 10] || 0, 9, 38016083);
		c = gg(c, d, a, b, words[i + 15] || 0, 14, 3634488961);
		b = gg(b, c, d, a, words[i + 4] || 0, 20, 3889429448);
		a = gg(a, b, c, d, words[i + 9] || 0, 5, 568446438);
		d = gg(d, a, b, c, words[i + 14] || 0, 9, 3275163606);
		c = gg(c, d, a, b, words[i + 3] || 0, 14, 4107603335);
		b = gg(b, c, d, a, words[i + 8] || 0, 20, 1163531501);
		a = gg(a, b, c, d, words[i + 13] || 0, 5, 2850285829);
		d = gg(d, a, b, c, words[i + 2] || 0, 9, 4243563512);
		c = gg(c, d, a, b, words[i + 7] || 0, 14, 1735328473);
		b = gg(b, c, d, a, words[i + 12] || 0, 20, 2368359562);
		a = hh(a, b, c, d, words[i + 5] || 0, 4, 4294588738);
		d = hh(d, a, b, c, words[i + 8] || 0, 11, 2272392833);
		c = hh(c, d, a, b, words[i + 11] || 0, 16, 1839030562);
		b = hh(b, c, d, a, words[i + 14] || 0, 23, 4259657740);
		a = hh(a, b, c, d, words[i + 1] || 0, 4, 2763975236);
		d = hh(d, a, b, c, words[i + 4] || 0, 11, 1272893353);
		c = hh(c, d, a, b, words[i + 7] || 0, 16, 4139469664);
		b = hh(b, c, d, a, words[i + 10] || 0, 23, 3200236656);
		a = hh(a, b, c, d, words[i + 13] || 0, 4, 681279174);
		d = hh(d, a, b, c, words[i + 0] || 0, 11, 3936430074);
		c = hh(c, d, a, b, words[i + 3] || 0, 16, 3572445317);
		b = hh(b, c, d, a, words[i + 6] || 0, 23, 76029189);
		a = hh(a, b, c, d, words[i + 9] || 0, 4, 3654602809);
		d = hh(d, a, b, c, words[i + 12] || 0, 11, 3873151461);
		c = hh(c, d, a, b, words[i + 15] || 0, 16, 530742520);
		b = hh(b, c, d, a, words[i + 2] || 0, 23, 3299628645);
		a = ii(a, b, c, d, words[i + 0] || 0, 6, 4096336452);
		d = ii(d, a, b, c, words[i + 7] || 0, 10, 1126891415);
		c = ii(c, d, a, b, words[i + 14] || 0, 15, 2878612391);
		b = ii(b, c, d, a, words[i + 5] || 0, 21, 4237533241);
		a = ii(a, b, c, d, words[i + 12] || 0, 6, 1700485571);
		d = ii(d, a, b, c, words[i + 3] || 0, 10, 2399980690);
		c = ii(c, d, a, b, words[i + 10] || 0, 15, 4293915773);
		b = ii(b, c, d, a, words[i + 1] || 0, 21, 2240044497);
		a = ii(a, b, c, d, words[i + 8] || 0, 6, 1873313359);
		d = ii(d, a, b, c, words[i + 15] || 0, 10, 4264355552);
		c = ii(c, d, a, b, words[i + 6] || 0, 15, 2734768916);
		b = ii(b, c, d, a, words[i + 13] || 0, 21, 1309151649);
		a = ii(a, b, c, d, words[i + 4] || 0, 6, 4149444226);
		d = ii(d, a, b, c, words[i + 11] || 0, 10, 3174756917);
		c = ii(c, d, a, b, words[i + 2] || 0, 15, 718787259);
		b = ii(b, c, d, a, words[i + 9] || 0, 21, 3951481745);
		a = add(a, oa);
		b = add(b, ob);
		c = add(c, oc);
		d = add(d, od);
	}
	const toHex = (n) => {
		const s = (n >>> 0).toString(16).padStart(8, "0");
		return s.slice(6, 8) + s.slice(4, 6) + s.slice(2, 4) + s.slice(0, 2);
	};
	return (toHex(a) + toHex(b) + toHex(c) + toHex(d)).toLowerCase();
}
function getUniSeq(prefix = "") {
	const timestamp = Date.now().toString(36);
	return `${prefix}${Math.random().toString(36).substring(2, 8)}${timestamp}`;
}
function getSnowId() {
	return `${new import_lib.SnowflakeIdv1({ workerId: Math.floor(Math.random() * 1024) }).NextId()}${Math.floor(Math.random() * 100).toString().padStart(2, "0")}`;
}
var service_exports = /* @__PURE__ */ __exportAll({
	create: () => create,
	findPublishedBySlug: () => findPublishedBySlug,
	getById: () => getById,
	list: () => list,
	listPublishedArticles: () => listPublishedArticles,
	remove: () => remove,
	update: () => update
});
async function list(params) {
	const { type, status, search, page = 1, pageSize = 10 } = params;
	const offset = (page - 1) * pageSize;
	const conditions = [];
	if (type) conditions.push(eq(post.type, type));
	if (status) conditions.push(eq(post.status, status));
	if (search) conditions.push(or(like(post.title, `%${search}%`), like(post.slug, `%${search}%`)));
	const where = conditions.length > 0 ? and(...conditions) : void 0;
	const [totalResult] = await db().select({ count: count() }).from(post).where(where);
	const total = totalResult.count;
	return {
		items: await db().select({
			id: post.id,
			slug: post.slug,
			type: post.type,
			title: post.title,
			description: post.description,
			image: post.image,
			categories: post.categories,
			authorName: post.authorName,
			status: post.status,
			createdAt: post.createdAt,
			updatedAt: post.updatedAt
		}).from(post).where(where).orderBy(desc(post.updatedAt), desc(post.createdAt)).limit(pageSize).offset(offset),
		total
	};
}
async function listPublishedArticles(params = {}) {
	const { limit = 100 } = params;
	return db().select({
		id: post.id,
		slug: post.slug,
		title: post.title,
		description: post.description,
		image: post.image,
		authorName: post.authorName,
		authorImage: post.authorImage,
		createdAt: post.createdAt
	}).from(post).where(and(eq(post.type, "article"), eq(post.status, "published"))).orderBy(desc(post.createdAt)).limit(limit);
}
async function findPublishedBySlug(slug) {
	const [result] = await db().select().from(post).where(and(eq(post.slug, slug.toLowerCase()), eq(post.status, "published"))).limit(1);
	return result;
}
async function getById(id) {
	const [result] = await db().select().from(post).where(eq(post.id, id)).limit(1);
	return result;
}
async function create(data) {
	const newPost = {
		id: getUuid(),
		userId: data.userId,
		slug: data.slug.toLowerCase(),
		type: "article",
		title: data.title,
		description: data.description || "",
		image: data.image || "",
		content: data.content || "",
		categories: data.categories || "",
		authorName: data.authorName || "",
		status: data.status || "draft"
	};
	const [result] = await db().insert(post).values(newPost).returning();
	return result;
}
async function update(id, data) {
	const updateData = { ...data };
	if (updateData.slug) updateData.slug = updateData.slug.toLowerCase();
	const [result] = await db().update(post).set(updateData).where(eq(post.id, id)).returning();
	return result;
}
async function remove(id) {
	await db().update(post).set({ status: "archived" }).where(eq(post.id, id));
}
//#endregion
export { service_exports as a, getUniSeq as c, remove as i, getUuid as l, getById as n, update as o, list as r, getSnowId as s, create as t, md5 as u };
