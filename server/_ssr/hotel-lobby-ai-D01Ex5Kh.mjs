import { o as __toESM } from "../_runtime.mjs";
import { at as require_jsx_runtime, ot as require_react } from "../_libs/@base-ui/react+[...].mjs";
import { o as envConfigs } from "./schema-DWa8-2WU.mjs";
import { t as absoluteUrl } from "./seo-DetwpQ1h.mjs";
import { t as Link$1 } from "./navigation-BgznuAML.mjs";
import { v as useSession } from "./client-xUgmZoCV.mjs";
import { d as uploadToSignedUrl, i as apiGet, o as apiPost, t as ApiError } from "./api-client-BXIVLJCS.mjs";
import { A as Play, Ct as Download, K as LoaderCircle, Mt as CircleCheck, S as Scissors, _ as Sparkles, ht as Film, it as Images, r as WandSparkles, s as Upload, w as RotateCcw, y as ShieldCheck } from "../_libs/lucide-react.mjs";
import { t as useUserCredits } from "./use-user-credits-B5TISbhc.mjs";
import { a as ImageModeIcon, n as CloseIcon, r as FilmIcon } from "./site-user-menu-C3Ao0HTQ.mjs";
import { t as SiteHeader } from "./SiteHeader-B2cCQXdM.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { o as HOTEL_LOBBY_MAX_VIDEO_EDGE_PX, p as estimateHotelLobbyCredits } from "./pricing-C7HhhK6N.mjs";
import { t as FFmpeg } from "../_libs/ffmpeg__ffmpeg.mjs";
import { n as toBlobURL, t as fetchFile } from "../_libs/ffmpeg__util.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hotel-lobby-ai-D01Ex5Kh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ffmpegSingleton = null;
var ffmpegLoadPromise = null;
async function getFfmpeg() {
	if (ffmpegSingleton) return ffmpegSingleton;
	if (ffmpegLoadPromise) return ffmpegLoadPromise;
	ffmpegLoadPromise = (async () => {
		const ffmpeg = new FFmpeg();
		const baseURL = "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/esm";
		await ffmpeg.load({
			coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
			wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm")
		});
		ffmpegSingleton = ffmpeg;
		return ffmpeg;
	})();
	try {
		return await ffmpegLoadPromise;
	} catch (error) {
		ffmpegLoadPromise = null;
		throw error;
	}
}
/**
* Trim a remote/local video to an MP4 clip for Fal video models.
* Prefers stream-copy; falls back to re-encode if copy fails.
*/
async function trimVideoToFile(params) {
	const start = Math.max(0, params.startSeconds);
	const duration = Math.max(start + .2, params.endSeconds) - start;
	if (duration < .5) throw new Error("Clip must be at least 0.5 seconds");
	const ffmpeg = await getFfmpeg();
	const inputName = "input.bin";
	const outputName = "output.mp4";
	await ffmpeg.writeFile(inputName, await fetchFile(params.sourceUrl));
	const run = async (args) => {
		await ffmpeg.deleteFile(outputName).catch(() => void 0);
		const code = await ffmpeg.exec(args);
		if (code !== 0) throw new Error(`ffmpeg exited with code ${code}`);
		const data = await ffmpeg.readFile(outputName);
		if (!(data instanceof Uint8Array) || data.byteLength <= 0) throw new Error("Trimmed clip was empty");
		return data;
	};
	let data;
	try {
		data = await run([
			"-i",
			inputName,
			"-ss",
			start.toFixed(3),
			"-t",
			duration.toFixed(3),
			"-c",
			"copy",
			"-avoid_negative_ts",
			"make_zero",
			"-movflags",
			"+faststart",
			outputName
		]);
	} catch {
		data = await run([
			"-i",
			inputName,
			"-ss",
			start.toFixed(3),
			"-t",
			duration.toFixed(3),
			"-c:v",
			"libx264",
			"-preset",
			"veryfast",
			"-crf",
			"23",
			"-c:a",
			"aac",
			"-movflags",
			"+faststart",
			outputName
		]);
	}
	await ffmpeg.deleteFile(inputName).catch(() => void 0);
	await ffmpeg.deleteFile(outputName).catch(() => void 0);
	const copy = new Uint8Array(data.byteLength);
	copy.set(data);
	return new File([copy], params.fileName ?? "hotel-lobby-clip.mp4", {
		type: "video/mp4",
		lastModified: Date.now()
	});
}
function formatClock(seconds) {
	const whole = Math.floor(Math.max(0, seconds));
	const minutes = Math.floor(whole / 60);
	const rest = whole % 60;
	return `${minutes}:${String(rest).padStart(2, "0")}`;
}
function HotelLobbyTrimBar({ durationSeconds, startSeconds, endSeconds, minClipSeconds, maxClipSeconds, disabled, applying, canApply = true, onChange, onApply }) {
	const labelId = (0, import_react.useId)();
	const clipLength = Math.max(0, endSeconds - startSeconds);
	const startPct = durationSeconds > 0 ? startSeconds / durationSeconds * 100 : 0;
	const endPct = durationSeconds > 0 ? endSeconds / durationSeconds * 100 : 100;
	const applyDisabled = Boolean(disabled || applying || !canApply);
	const updateFromClientX = (track, clientX, handle) => {
		const rect = track.getBoundingClientRect();
		if (rect.width <= 0 || durationSeconds <= 0) return;
		const time = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width)) * durationSeconds;
		if (handle === "start") {
			const maxStart = Math.max(0, endSeconds - minClipSeconds);
			const nextStart = Math.min(Math.max(0, time), maxStart);
			let nextEnd = endSeconds;
			if (nextEnd - nextStart > maxClipSeconds) nextEnd = nextStart + maxClipSeconds;
			onChange({
				startSeconds: nextStart,
				endSeconds: nextEnd
			});
			return;
		}
		const minEnd = Math.min(durationSeconds, startSeconds + minClipSeconds);
		const nextEnd = Math.max(minEnd, Math.min(durationSeconds, time));
		let nextStart = startSeconds;
		if (nextEnd - nextStart > maxClipSeconds) nextStart = nextEnd - maxClipSeconds;
		onChange({
			startSeconds: nextStart,
			endSeconds: nextEnd
		});
	};
	const bindHandle = (handle) => ({ onPointerDown: (event) => {
		if (disabled || applying) return;
		event.preventDefault();
		const track = event.currentTarget.parentElement;
		if (!track) return;
		event.currentTarget.setPointerCapture(event.pointerId);
		const move = (clientX) => updateFromClientX(track, clientX, handle);
		move(event.clientX);
		const onMove = (moveEvent) => move(moveEvent.clientX);
		const onUp = () => {
			window.removeEventListener("pointermove", onMove);
			window.removeEventListener("pointerup", onUp);
		};
		window.addEventListener("pointermove", onMove);
		window.addEventListener("pointerup", onUp);
	} });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-3 space-y-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3 text-[11px] text-white/45",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					id: labelId,
					children: "Trim clip"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-white/55 tabular-nums",
					children: [
						formatClock(startSeconds),
						" – ",
						formatClock(endSeconds),
						" ·",
						" ",
						clipLength.toFixed(1),
						"s"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					role: "group",
					"aria-labelledby": labelId,
					className: `relative h-9 min-w-0 flex-1 rounded-xl border border-white/10 bg-black/25 px-1 select-none ${disabled || applying ? "opacity-50" : ""}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-y-0 right-1 left-1 my-auto h-1.5 rounded-full bg-white/10" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute inset-y-0 my-auto h-1.5 rounded-full bg-[rgb(204,144,92)]/80",
							style: {
								left: `calc(${startPct}% + 4px)`,
								width: `calc(${Math.max(0, endPct - startPct)}% - 8px)`
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "Trim start",
							disabled: disabled || applying,
							className: "absolute top-1/2 z-10 size-4 -translate-x-1/2 -translate-y-1/2 touch-none rounded-full border border-[rgb(220,155,99)] bg-[rgb(204,144,92)] shadow",
							style: { left: `calc(${startPct}% + 4px)` },
							...bindHandle("start")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "Trim end",
							disabled: disabled || applying,
							className: "absolute top-1/2 z-10 size-4 -translate-x-1/2 -translate-y-1/2 touch-none rounded-full border border-[rgb(220,155,99)] bg-[rgb(204,144,92)] shadow",
							style: { left: `calc(${endPct}% - 4px)` },
							...bindHandle("end")
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					disabled: applyDisabled,
					onClick: onApply,
					className: "inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-xl border border-[rgba(204,144,92,0.35)] bg-[rgba(204,144,92,0.12)] px-3 text-xs font-semibold text-[rgb(220,155,99)] transition hover:bg-[rgba(204,144,92,0.2)] disabled:cursor-not-allowed disabled:opacity-45",
					children: [applying ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scissors, { className: "size-3.5" }), applying ? "Trimming…" : "Trim"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[10px] leading-4 text-white/30",
				children: "Drag the handles, then click Trim. Credits follow the clipped length."
			})
		]
	});
}
var TEMPLATE_URL = "/api/hotel-lobby/template";
var TEMPLATE_FILE_URL = "/api/hotel-lobby/template-file";
var MAX_VIDEO_BYTES = 80 * 1024 * 1024;
var MAX_IMAGE_BYTES = 12 * 1024 * 1024;
var MIN_REFERENCE_VIDEO_SECONDS = 3;
var MAX_REFERENCE_VIDEO_SECONDS = 15;
function isFullSourceClip(startSeconds, endSeconds, sourceSeconds) {
	return startSeconds <= .05 && Math.abs(endSeconds - sourceSeconds) <= .2;
}
function createMediaItem(file) {
	return {
		id: `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2, 8)}`,
		file,
		url: URL.createObjectURL(file)
	};
}
function readVideoMetadata(file) {
	return new Promise((resolve, reject) => {
		const url = URL.createObjectURL(file);
		const video = document.createElement("video");
		video.preload = "metadata";
		const cleanup = () => {
			video.removeAttribute("src");
			video.load();
			URL.revokeObjectURL(url);
		};
		video.onloadedmetadata = () => {
			const duration = video.duration;
			const width = video.videoWidth;
			const height = video.videoHeight;
			cleanup();
			if (!Number.isFinite(duration) || duration <= 0) {
				reject(/* @__PURE__ */ new Error("Could not read video duration"));
				return;
			}
			if (!Number.isFinite(width) || !Number.isFinite(height) || width < 1 || height < 1) {
				reject(/* @__PURE__ */ new Error("Could not read video resolution"));
				return;
			}
			resolve({
				duration,
				width,
				height
			});
		};
		video.onerror = () => {
			cleanup();
			reject(/* @__PURE__ */ new Error("Could not read video metadata"));
		};
		video.src = url;
	});
}
function assertClientVideoDimensions(width, height) {
	if (width < 720 || height < 720 || width > 3840 || height > 3840) throw new Error(`Reference video must be between 720×720 and ${HOTEL_LOBBY_MAX_VIDEO_EDGE_PX}×${HOTEL_LOBBY_MAX_VIDEO_EDGE_PX} pixels`);
}
function clampReferenceDuration(seconds) {
	return Math.min(MAX_REFERENCE_VIDEO_SECONDS, Math.max(MIN_REFERENCE_VIDEO_SECONDS, Math.round(seconds)));
}
function redirectToSignIn() {
	const callbackUrl = encodeURIComponent(`${window.location.pathname}${window.location.search}`);
	window.location.href = `/sign-in?callbackUrl=${callbackUrl}`;
}
function PersonSlot({ title, note, item, onPick, onRemove, inputRef, disabled }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold text-white/90",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 text-xs leading-5 text-white/40",
					children: note
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: inputRef,
				type: "file",
				accept: "image/jpeg,image/png,image/webp,image/*",
				className: "hidden",
				onChange: (event) => {
					onPick(event.target.files?.[0] || null);
					event.target.value = "";
				}
			}),
			item ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "group relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-black/30",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: item.url,
					alt: title,
					className: "size-full object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled,
					onClick: onRemove,
					"aria-label": `Remove ${title.toLowerCase()}`,
					className: "absolute top-2 right-2 flex size-8 items-center justify-center rounded-full bg-black/70 text-white/80 backdrop-blur transition hover:bg-black/90 disabled:opacity-40",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseIcon, { className: "size-4" })
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				disabled,
				onClick: () => inputRef.current?.click(),
				className: "flex aspect-[4/5] w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-white/14 bg-white/[0.025] text-center text-white/42 transition hover:border-[rgba(204,144,92,0.55)] hover:bg-[rgba(204,144,92,0.05)] hover:text-[rgb(220,155,99)] disabled:cursor-not-allowed disabled:opacity-50",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageModeIcon, { className: "size-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-medium",
					children: "Add photo"
				})]
			})
		]
	});
}
function HotelLobbyGeneratorPanel() {
	const { data: session, isPending: sessionPending } = useSession();
	const creditsQuery = useUserCredits(Boolean(session?.user));
	const videoInputRef = (0, import_react.useRef)(null);
	const firstImageInputRef = (0, import_react.useRef)(null);
	const secondImageInputRef = (0, import_react.useRef)(null);
	const mountedRef = (0, import_react.useRef)(true);
	const localUrlsRef = (0, import_react.useRef)(/* @__PURE__ */ new Set());
	const previewVideoRef = (0, import_react.useRef)(null);
	const [video, setVideo] = (0, import_react.useState)({
		kind: "template",
		url: TEMPLATE_URL
	});
	const [templateAvailable, setTemplateAvailable] = (0, import_react.useState)(true);
	const [firstImage, setFirstImage] = (0, import_react.useState)(null);
	const [secondImage, setSecondImage] = (0, import_react.useState)(null);
	const [trimStart, setTrimStart] = (0, import_react.useState)(0);
	const [trimEnd, setTrimEnd] = (0, import_react.useState)(0);
	const [trimming, setTrimming] = (0, import_react.useState)(false);
	const [phase, setPhase] = (0, import_react.useState)("idle");
	const [providerStatus, setProviderStatus] = (0, import_react.useState)("");
	const [resultUrl, setResultUrl] = (0, import_react.useState)(null);
	const [generationId, setGenerationId] = (0, import_react.useState)(null);
	const [creditError, setCreditError] = (0, import_react.useState)(null);
	const busy = !["idle", "done"].includes(phase) || trimming;
	const imageItems = [firstImage, secondImage].filter((item) => Boolean(item));
	const sourceDuration = typeof video?.durationSeconds === "number" && Number.isFinite(video.durationSeconds) && video.durationSeconds > 0 ? video.durationSeconds : null;
	const hasKnownDuration = sourceDuration != null;
	const clipDurationSeconds = Math.max(0, trimEnd - trimStart);
	const billedDuration = hasKnownDuration ? clampReferenceDuration(clipDurationSeconds) : null;
	const estimatedCredits = (0, import_react.useMemo)(() => {
		if (!billedDuration) return null;
		const imageCount = Math.max(1, (firstImage ? 1 : 0) + (secondImage ? 1 : 0));
		try {
			return estimateHotelLobbyCredits({
				duration: billedDuration,
				imageCount
			});
		} catch {
			return null;
		}
	}, [
		billedDuration,
		firstImage,
		secondImage
	]);
	(0, import_react.useEffect)(() => {
		mountedRef.current = true;
		return () => {
			mountedRef.current = false;
			localUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
			localUrlsRef.current.clear();
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (video?.kind !== "template") return;
		if (hasKnownDuration) return;
		let cancelled = false;
		apiGet("/api/hotel-lobby/template-meta").then((data) => {
			if (cancelled) return;
			const seconds = data.durationSeconds;
			if (!Number.isFinite(seconds) || seconds <= 0) return;
			setVideo((current) => current?.kind === "template" ? {
				...current,
				durationSeconds: seconds
			} : current);
		}).catch(() => {});
		return () => {
			cancelled = true;
		};
	}, [
		video?.kind,
		video?.url,
		hasKnownDuration
	]);
	(0, import_react.useEffect)(() => {
		if (sourceDuration == null) {
			setTrimStart(0);
			setTrimEnd(0);
			return;
		}
		setTrimStart(0);
		setTrimEnd(sourceDuration);
	}, [video?.url, sourceDuration]);
	const applyTrim = async () => {
		if (!video || sourceDuration == null || trimming) return;
		if (clipDurationSeconds < MIN_REFERENCE_VIDEO_SECONDS || clipDurationSeconds > MAX_REFERENCE_VIDEO_SECONDS) {
			toast.error("Trim the clip to between 3 and 15 seconds");
			return;
		}
		if (isFullSourceClip(trimStart, trimEnd, sourceDuration)) {
			toast.message("Selection already covers the full reference video");
			return;
		}
		setTrimming(true);
		try {
			const trimmed = await trimVideoToFile({
				sourceUrl: video.kind === "template" ? TEMPLATE_FILE_URL : video.url,
				startSeconds: trimStart,
				endSeconds: trimEnd
			});
			if (trimmed.size <= 0 || trimmed.size > MAX_VIDEO_BYTES) throw new Error("Trimmed clip must be 80 MB or smaller");
			const url = URL.createObjectURL(trimmed);
			localUrlsRef.current.add(url);
			if (video.kind === "upload") {
				URL.revokeObjectURL(video.url);
				localUrlsRef.current.delete(video.url);
			}
			setTemplateAvailable(true);
			setVideo({
				kind: "upload",
				file: trimmed,
				url,
				durationSeconds: clipDurationSeconds
			});
			setResultUrl(null);
			setPhase("idle");
			toast.success(`Clipped to ${clipDurationSeconds.toFixed(1)}s`);
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Could not trim this video");
		} finally {
			setTrimming(false);
		}
	};
	const setImageAt = (slot, file) => {
		if (!file) return;
		if (!file.type.startsWith("image/")) {
			toast.error("Please choose an image file");
			return;
		}
		if (file.size <= 0 || file.size > MAX_IMAGE_BYTES) {
			toast.error("Reference images must be 12 MB or smaller");
			return;
		}
		const next = createMediaItem(file);
		localUrlsRef.current.add(next.url);
		const setter = slot === "first" ? setFirstImage : setSecondImage;
		const current = slot === "first" ? firstImage : secondImage;
		if (current) {
			URL.revokeObjectURL(current.url);
			localUrlsRef.current.delete(current.url);
		}
		setter(next);
		setResultUrl(null);
		setPhase("idle");
	};
	const clearImageAt = (slot) => {
		const setter = slot === "first" ? setFirstImage : setSecondImage;
		const current = slot === "first" ? firstImage : secondImage;
		if (current) {
			URL.revokeObjectURL(current.url);
			localUrlsRef.current.delete(current.url);
		}
		setter(null);
	};
	const replaceVideo = async (file) => {
		if (!file) return;
		if (!["video/mp4", "video/quicktime"].includes(file.type)) {
			toast.error("Use an MP4 or MOV reference video");
			return;
		}
		if (file.size <= 0 || file.size > MAX_VIDEO_BYTES) {
			toast.error("Reference video must be 80 MB or smaller");
			return;
		}
		try {
			const meta = await readVideoMetadata(file);
			const durationSeconds = meta.duration;
			if (durationSeconds < MIN_REFERENCE_VIDEO_SECONDS || durationSeconds > MAX_REFERENCE_VIDEO_SECONDS) {
				toast.error("Reference video must be between 3 and 15 seconds");
				return;
			}
			try {
				assertClientVideoDimensions(meta.width, meta.height);
			} catch (error) {
				toast.error(error instanceof Error ? error.message : "Unsupported video resolution");
				return;
			}
			const url = URL.createObjectURL(file);
			localUrlsRef.current.add(url);
			if (video?.kind === "upload") {
				URL.revokeObjectURL(video.url);
				localUrlsRef.current.delete(video.url);
			}
			setVideo({
				kind: "upload",
				file,
				url,
				durationSeconds
			});
			setResultUrl(null);
			setPhase("idle");
		} catch {
			toast.error("Could not read this video. Try MP4 or MOV.");
		}
	};
	const clearVideo = () => {
		if (video?.kind === "upload") {
			URL.revokeObjectURL(video.url);
			localUrlsRef.current.delete(video.url);
		}
		setVideo(null);
		if (videoInputRef.current) videoInputRef.current.value = "";
	};
	const restoreTemplate = () => {
		if (video?.kind === "upload") {
			URL.revokeObjectURL(video.url);
			localUrlsRef.current.delete(video.url);
		}
		setTemplateAvailable(true);
		setVideo({
			kind: "template",
			url: TEMPLATE_URL
		});
		setResultUrl(null);
		setPhase("idle");
	};
	const pollUntilComplete = async (id) => {
		let consecutivePollErrors = 0;
		for (let attempt = 0; attempt < 240; attempt += 1) {
			await new Promise((resolve) => setTimeout(resolve, 2e3));
			if (!mountedRef.current) return;
			let poll;
			try {
				poll = await apiGet(`/api/hotel-lobby/status?generationId=${encodeURIComponent(id)}`);
				consecutivePollErrors = 0;
			} catch (error) {
				consecutivePollErrors += 1;
				if (consecutivePollErrors < 5) continue;
				throw error;
			}
			setProviderStatus(poll.providerStatus || "");
			if (poll.providerStatus === "persisting") setPhase("saving");
			if (poll.status === "completed" && poll.videoUrl) {
				setResultUrl(poll.videoUrl);
				setPhase("done");
				await creditsQuery.refetch();
				return;
			}
			if (poll.status === "failed") {
				setPhase("idle");
				await creditsQuery.refetch();
				throw new Error(poll.error || "Generation failed");
			}
		}
		setPhase("idle");
		throw new Error("Generation is still running. Keep this generation ID before starting another job.");
	};
	const generate = async () => {
		setCreditError(null);
		if (!session?.user) {
			redirectToSignIn();
			return;
		}
		if (!video || sourceDuration == null) {
			toast.error("Use the preset template or upload a reference video");
			return;
		}
		if (!firstImage) {
			toast.error("Add the first person photo");
			return;
		}
		if (clipDurationSeconds < MIN_REFERENCE_VIDEO_SECONDS || clipDurationSeconds > MAX_REFERENCE_VIDEO_SECONDS) {
			toast.error("Trim the clip to between 3 and 15 seconds");
			return;
		}
		if (!estimatedCredits) {
			toast.error("Still reading the reference video length. Try again in a moment.");
			return;
		}
		const requiredCredits = estimatedCredits;
		const balance = creditsQuery.data?.balance ?? 0;
		if (!creditsQuery.isPending && balance < requiredCredits) {
			setCreditError({
				required: requiredCredits,
				balance
			});
			return;
		}
		setResultUrl(null);
		setProviderStatus("");
		setPhase("uploading");
		const id = crypto.randomUUID();
		setGenerationId(id);
		const useFullTemplate = video.kind === "template" && isFullSourceClip(trimStart, trimEnd, sourceDuration);
		try {
			let referenceVideoFile = null;
			if (!useFullTemplate) if (video.kind === "upload" && isFullSourceClip(trimStart, trimEnd, sourceDuration)) referenceVideoFile = video.file;
			else referenceVideoFile = await trimVideoToFile({
				sourceUrl: video.kind === "template" ? TEMPLATE_FILE_URL : video.url,
				startSeconds: trimStart,
				endSeconds: trimEnd
			});
			const useDefaultTemplate = useFullTemplate;
			const files = useDefaultTemplate ? imageItems.map((item) => item.file) : [referenceVideoFile, ...imageItems.map((item) => item.file)];
			const contentTypes = files.map((file) => file.type || "application/octet-stream");
			const contentLengths = files.map((file) => file.size);
			const setup = await apiPost("/api/hotel-lobby/upload-url", {
				generationId: id,
				useDefaultTemplate,
				contentTypes,
				contentLengths
			});
			if (setup.uploads.length !== files.length) throw new Error("Upload setup returned an incomplete file list");
			for (let index = 0; index < files.length; index += 1) {
				const upload = setup.uploads[index];
				await uploadToSignedUrl({
					url: upload.uploadUrl,
					file: files[index],
					headers: upload.uploadHeaders
				});
			}
			const sortedUploads = [...setup.uploads].sort((a, b) => a.index - b.index);
			const videoUpload = sortedUploads.find((item) => item.index === 0);
			const imageUploads = sortedUploads.filter((item) => item.index > 0);
			setPhase("starting");
			const start = await apiPost("/api/hotel-lobby/generate", {
				generationId: id,
				useDefaultTemplate,
				videoKey: videoUpload?.storageKey,
				imageKeys: imageUploads.map((item) => item.storageKey),
				contentTypes,
				contentLengths,
				durationSeconds: billedDuration
			});
			await creditsQuery.refetch();
			if (start.status === "refunded" || start.status === "submission_unknown") throw new Error(start.status === "submission_unknown" ? "Submission result is uncertain. Please contact support before retrying." : "Generation could not be started");
			setPhase("generating");
			await pollUntilComplete(id);
		} catch (error) {
			if (error instanceof ApiError) {
				const data = error.data && typeof error.data === "object" ? error.data : null;
				if (data?.code === "INSUFFICIENT_CREDITS") {
					setCreditError({
						required: Number(data.requiredCredits) || requiredCredits,
						balance: Number(data.balance) || 0
					});
					setPhase("idle");
					return;
				}
			}
			setPhase("idle");
			toast.error(error instanceof Error ? error.message : "Generation failed to start");
		}
	};
	const phaseLabel = phase === "uploading" ? "Preparing clip…" : phase === "starting" ? "Starting Kling O3…" : phase === "generating" ? providerStatus ? `Generating · ${providerStatus}` : "Generating…" : phase === "saving" ? "Saving your video…" : "Generate";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-[1120px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "overflow-hidden rounded-[26px] border border-white/10 bg-[rgba(30,23,19,0.92)] shadow-[0_30px_90px_-30px_rgba(0,0,0,0.85)] backdrop-blur-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-0 lg:grid-cols-[0.95fr_1.05fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-b border-white/8 p-4 sm:p-5 lg:border-r lg:border-b-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3 flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold text-white/90",
								children: "Reference performance"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 text-xs leading-5 text-white/40",
								children: "The Hotel Lobby preset is loaded by default. Trim below, or remove it to use your own 3–15s motion reference."
							})] }), video?.kind === "template" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "shrink-0 rounded-full border border-[rgba(204,144,92,0.18)] bg-[rgba(204,144,92,0.08)] px-2.5 py-1 text-[10px] font-semibold text-[rgb(220,155,99)]",
								children: "Preset"
							}) : null]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: videoInputRef,
							type: "file",
							accept: "video/mp4,video/quicktime",
							className: "hidden",
							onChange: (event) => {
								replaceVideo(event.target.files?.[0] || null);
								event.target.value = "";
							}
						}),
						video ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative aspect-video overflow-hidden rounded-2xl border border-[rgba(204,144,92,0.24)] bg-black",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
								ref: previewVideoRef,
								src: video.url,
								controls: true,
								muted: true,
								playsInline: true,
								preload: "metadata",
								className: "size-full object-contain",
								onLoadedMetadata: (event) => {
									const seconds = event.currentTarget.duration;
									if (!Number.isFinite(seconds) || seconds <= 0) return;
									if (video.kind === "template") setVideo((current) => current?.kind === "template" ? {
										...current,
										durationSeconds: seconds
									} : current);
								},
								onError: () => {
									if (video.kind === "template") {
										setTemplateAvailable(false);
										setVideo(null);
									}
								}
							}, video.url), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: clearVideo,
								disabled: busy,
								"aria-label": "Remove reference video",
								className: "absolute top-2 right-2 flex size-8 items-center justify-center rounded-full bg-black/70 text-white/80 backdrop-blur transition hover:bg-black/90 disabled:opacity-40",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseIcon, { className: "size-4" })
							})]
						}), sourceDuration != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HotelLobbyTrimBar, {
							durationSeconds: sourceDuration,
							startSeconds: trimStart,
							endSeconds: trimEnd,
							minClipSeconds: MIN_REFERENCE_VIDEO_SECONDS,
							maxClipSeconds: MAX_REFERENCE_VIDEO_SECONDS,
							disabled: busy && !trimming,
							applying: trimming,
							canApply: !isFullSourceClip(trimStart, trimEnd, sourceDuration) && clipDurationSeconds >= MIN_REFERENCE_VIDEO_SECONDS && clipDurationSeconds <= MAX_REFERENCE_VIDEO_SECONDS,
							onChange: ({ startSeconds, endSeconds }) => {
								setTrimStart(startSeconds);
								setTrimEnd(endSeconds);
								const preview = previewVideoRef.current;
								if (preview) try {
									preview.currentTime = startSeconds;
								} catch {}
							},
							onApply: () => {
								applyTrim();
							}
						}) : null] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								disabled: busy,
								onClick: () => videoInputRef.current?.click(),
								className: "flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[rgba(204,144,92,0.35)] bg-[rgba(204,144,92,0.04)] text-center transition hover:border-[rgba(204,144,92,0.62)] hover:bg-[rgba(204,144,92,0.07)] disabled:cursor-not-allowed disabled:opacity-50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex size-12 items-center justify-center rounded-full bg-[rgba(204,144,92,0.12)] text-[rgb(220,155,99)]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilmIcon, { className: "size-6" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-sm font-medium text-white/82",
									children: "Upload reference video"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 block text-xs text-white/38",
									children: "MP4 or MOV · 3–15s · 720–3840px · up to 80 MB"
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								disabled: busy,
								onClick: restoreTemplate,
								className: "inline-flex items-center gap-1.5 text-xs font-medium text-[rgb(220,155,99)] transition hover:text-[rgb(235,174,119)] disabled:opacity-50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" }), templateAvailable ? "Use preset template" : "Retry preset template"]
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-4 sm:p-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonSlot, {
							title: "First person",
							note: "Required · left performer, or a photo containing both subjects.",
							item: firstImage,
							inputRef: firstImageInputRef,
							disabled: busy,
							onPick: (file) => setImageAt("first", file),
							onRemove: () => clearImageAt("first")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonSlot, {
							title: "Second person",
							note: "Optional · right performer when using separate photos.",
							item: secondImage,
							inputRef: secondImageInputRef,
							disabled: busy,
							onPick: (file) => setImageAt("second", file),
							onRemove: () => clearImageAt("second")
						})]
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-white/8 p-4 sm:p-5",
				children: [creditError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex flex-col gap-3 rounded-xl border border-amber-400/20 bg-amber-400/[0.06] px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium text-amber-100/90",
						children: "Not enough credits"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-0.5 text-xs text-amber-100/55",
						children: [
							"Need ",
							creditError.required.toLocaleString(),
							" · balance",
							" ",
							creditError.balance.toLocaleString()
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
						href: "/pricing",
						className: "inline-flex h-8 shrink-0 items-center justify-center rounded-lg bg-[rgb(204,144,92)] px-3 text-xs font-semibold text-white transition hover:brightness-105",
						children: "Buy credits"
					})]
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end sm:gap-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						disabled: busy || sessionPending,
						onClick: () => void generate(),
						className: "inline-flex h-11 w-full min-w-[240px] items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,rgb(222,151,92),rgb(189,111,64))] px-5 text-sm font-semibold text-white shadow-[0_12px_32px_-12px_rgba(218,134,75,0.7)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-55 sm:w-auto",
						children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : session?.user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4 fill-current" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: !session?.user ? "Sign in to generate" : busy ? phaseLabel : estimatedCredits ? `Generate (~${estimatedCredits} credits)` : "Generate" })]
					})
				})]
			})]
		}), resultUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 overflow-hidden rounded-[24px] border border-white/10 bg-[rgba(25,20,17,0.94)] p-3 shadow-2xl sm:p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-center justify-between gap-3 px-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold text-white/90",
						children: "Your video"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 text-xs text-white/38",
						children: "Kling O3"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: generationId ? `/api/hotel-lobby/result/${encodeURIComponent(generationId)}?download=1` : resultUrl,
						download: generationId ? `hotel-lobby-${generationId.slice(0, 8)}.mp4` : void 0,
						className: "inline-flex h-9 items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 text-xs font-medium text-white/70 transition hover:bg-white/10 hover:text-white",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), "Download"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
					src: resultUrl,
					controls: true,
					autoPlay: true,
					playsInline: true,
					className: "mx-auto aspect-video max-h-[720px] w-full max-w-full rounded-2xl bg-black object-contain"
				}),
				generationId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 px-1 text-[10px] text-white/25",
					children: ["Generation ", generationId.slice(0, 8)]
				}) : null
			]
		}) : null]
	});
}
var FAQ_ITEMS = [
	{
		question: "What is the Hotel Lobby AI trend?",
		answer: "The Hotel Lobby AI trend remixes Quavo and Takeoff’s 2022 A COLORS SHOW performance of “HOTEL LOBBY (Unc & Phew)”: two performers against a bright orange background, sharing one hanging microphone. In September 2026, AI versions spread across TikTok, Reels, and X with friends, couples, pets, celebrities, and fictional characters replacing the original duo."
	},
	{
		question: "How do you do the Hotel Lobby AI video?",
		answer: "Use the preset performance already loaded on this page, upload one photo with both subjects or one photo per performer, and press generate. The output is landscape 16:9 and its length follows the reference performance."
	},
	{
		question: "Is Hotel Lobby AI free?",
		answer: "You can choose photos and preview the preset locally before anything uploads. Generation uses your Genjutsu AI credit balance; the required credits are shown before you run the clip."
	},
	{
		question: "Do I need one photo or two?",
		answer: "Either works. Use one clear photo containing both subjects, or upload separate left and right performer photos. A second photo is optional."
	},
	{
		question: "Do I need Higgsfield for the Hotel Lobby trend?",
		answer: "No. This page uses Kling O3 video edit with a preset reference performance. Higgsfield Genjutsu is another option when you want a more general motion-transfer workflow with your own source clip."
	},
	{
		question: "Can I do Hotel Lobby AI with my pets?",
		answer: "Yes. Pets became one of the recognizable early variations of the trend. Use clear photos with the face visible and enough of the body in frame for the model to carry shape and posture into the performance."
	},
	{
		question: "Is there a Hotel Lobby AI filter?",
		answer: "Not in the usual one-tap camera-filter sense. These clips are AI-generated or AI-edited videos built from reference images and a recognizable performance template."
	},
	{
		question: "How do I add the Hotel Lobby sound?",
		answer: "For posting, use the licensed “Hotel Lobby” sound from TikTok or Instagram’s music library. This generator does not package or redistribute the copyrighted song for you."
	},
	{
		question: "Can I make it longer or in HD?",
		answer: "Yes. The output length follows the reference video, which must be 3–15 seconds and between 720×720 and 3840×3840 pixels. Custom clips keep their own framing; the preset booth template is landscape."
	},
	{
		question: "Can I replace the preset Hotel Lobby template?",
		answer: "Yes. The preset reference performance is loaded by default, but you can remove it and upload your own 3–15 second MP4 or MOV. The generator will use that clip’s duration automatically."
	}
];
var CAST_IDEAS = [
	["You and your best friend", "The default, and still the easiest joke to land."],
	["A couple", "One photo of the two of you can be enough."],
	["Two coworkers", "A Friday team-chat version practically writes itself."],
	["Your parents", "Formal outfits in the orange booth work surprisingly well."],
	["Your pets", "Use one clear photo per pet, ideally facing the camera."],
	["Characters or mascots", "Illustrated and fictional subjects can work when the face is clear."]
];
var PHOTO_TIPS = [
	"One subject per photo when possible. If you use a group shot, crop to the person you mean.",
	"Show the outfit. Waist-up or full-body photos carry clothing better than a tight face crop.",
	"Face forward in good light. Heavy shadow, blur, and extreme profile angles reduce likeness.",
	"Use the first slot for the left performer and the second slot for the right performer.",
	"Try a second run if identity or hand gestures drift. Video generation is stochastic."
];
function faqJsonLd() {
	return {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: FAQ_ITEMS.map((item) => ({
			"@type": "Question",
			name: item.question,
			acceptedAnswer: {
				"@type": "Answer",
				text: item.answer
			}
		}))
	};
}
function howToJsonLd() {
	return {
		"@context": "https://schema.org",
		"@type": "HowTo",
		name: "How to make a Hotel Lobby AI video",
		totalTime: "PT2M",
		step: [
			{
				"@type": "HowToStep",
				name: "Upload one or two photos",
				text: "Use one clear photo containing both subjects, or one front-facing photo per performer."
			},
			{
				"@type": "HowToStep",
				name: "Press generate",
				text: "The Hotel Lobby reference performance is already loaded. Press generate; the output duration follows the reference video."
			},
			{
				"@type": "HowToStep",
				name: "Add the sound and post",
				text: "Download the MP4, upload it to TikTok or Reels, and choose the licensed Hotel Lobby sound from the platform music library."
			}
		]
	};
}
function videoJsonLd() {
	const rawContentUrl = envConfigs.hotel_lobby_example_video_url?.trim();
	const rawThumbnailUrl = envConfigs.hotel_lobby_example_thumbnail_url?.trim();
	const contentUrl = rawContentUrl ? absoluteUrl(rawContentUrl) : "";
	const thumbnailUrl = rawThumbnailUrl ? absoluteUrl(rawThumbnailUrl) : "";
	const uploadDate = envConfigs.hotel_lobby_example_upload_date?.trim();
	const duration = envConfigs.hotel_lobby_example_duration?.trim();
	if (!contentUrl || !thumbnailUrl || !uploadDate || !duration) return null;
	return {
		"@context": "https://schema.org",
		"@type": "VideoObject",
		name: "Hotel Lobby AI example result",
		description: "An example Hotel Lobby AI result generated from reference photos with the preset orange-booth performance.",
		contentUrl,
		thumbnailUrl,
		uploadDate,
		duration
	};
}
function JsonLd({ value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
		type: "application/ld+json",
		dangerouslySetInnerHTML: { __html: JSON.stringify(value) }
	});
}
function HotelLobbyAiPage() {
	const rawExampleVideoUrl = envConfigs.hotel_lobby_example_video_url?.trim();
	const rawExampleThumbnailUrl = envConfigs.hotel_lobby_example_thumbnail_url?.trim();
	const exampleVideoUrl = rawExampleVideoUrl ? absoluteUrl(rawExampleVideoUrl) : "";
	const exampleThumbnailUrl = rawExampleThumbnailUrl ? absoluteUrl(rawExampleThumbnailUrl) : "";
	const videoSchema = videoJsonLd();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[hsl(28_25%_9%)] text-[rgb(237,234,222)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonLd, { value: faqJsonLd() }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonLd, { value: howToJsonLd() }),
			videoSchema ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonLd, { value: videoSchema }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pointer-events-none absolute inset-0",
						"aria-hidden": true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(154,91,55,0.22),transparent_38%),linear-gradient(to_bottom,rgba(13,10,9,0.5),hsl(28_25%_9%)_78%)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-24 left-1/2 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-[rgba(204,144,92,0.055)] blur-3xl" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative z-20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
						className: "relative z-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "mx-auto max-w-7xl px-4 pt-14 pb-12 text-center sm:pt-20 md:px-5 md:pb-16",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mx-auto mb-4 flex w-fit items-center gap-2 rounded-full border border-[rgba(204,144,92,0.2)] bg-[rgba(204,144,92,0.07)] px-3 py-1.5 text-xs font-medium text-[rgb(220,155,99)]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WandSparkles, { className: "size-3.5" }), "Hotel Lobby preset · Kling O3"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "mx-auto max-w-4xl text-[34px] leading-[1.08] font-bold tracking-[-1.4px] sm:text-[44px] md:text-[56px]",
										children: "Hotel Lobby AI Video Generator"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mx-auto mt-5 max-w-3xl text-base leading-7 text-white/58 sm:text-lg",
										children: "One or two photos in, one orange-booth clip out. Put your duo at the hanging mic in a landscape 16:9 video, ready for YouTube, Reels, or Shorts."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										id: "generator",
										className: "mt-8 text-left sm:mt-10",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HotelLobbyGeneratorPanel, {})
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
								className: "mx-auto max-w-6xl px-4 py-14 md:px-5 md:py-20",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: exampleVideoUrl ? "grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center" : "mx-auto max-w-3xl",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-semibold tracking-[0.18em] text-[rgb(204,144,92)] uppercase",
											children: "The result"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "mt-3 text-3xl font-semibold tracking-tight sm:text-4xl",
											children: "What the Hotel Lobby AI video gives you"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-4 text-sm leading-7 text-white/48 sm:text-base",
											children: "The preset keeps the recognizable orange performance setup: two performers, one hanging microphone, and the reference choreography. Your uploaded photos control the identities, hair, outfits, and overall appearance."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-4 text-sm leading-7 text-white/48 sm:text-base",
											children: [
												"With the preset booth clip, output is landscape. Length follows the reference video automatically, from 5 to 15 seconds. For the original song when you post, choose the licensed ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Hotel Lobby" }),
												" sound inside TikTok or Instagram rather than bundling the track into the generated file."
											]
										})
									] }), exampleVideoUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "overflow-hidden rounded-[24px] border border-white/10 bg-black/25 p-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
											src: exampleVideoUrl,
											poster: exampleThumbnailUrl || void 0,
											controls: true,
											playsInline: true,
											preload: "metadata",
											className: "mx-auto aspect-video max-h-[620px] w-full max-w-full rounded-2xl bg-black object-contain"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "px-1 pt-3 text-center text-xs text-white/34",
											children: "Real Hotel Lobby AI output"
										})]
									}) : null]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
								className: "border-y border-white/7 bg-white/[0.018]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mx-auto max-w-5xl px-4 py-14 md:px-5 md:py-20",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-3xl font-semibold tracking-tight sm:text-4xl",
										children: "What is the Hotel Lobby AI trend?"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-5 space-y-4 text-sm leading-7 text-white/48 sm:text-base",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
												"The orange set, one microphone hanging from the ceiling, and two people trading verses comes from Quavo and Takeoff’s 2022 A COLORS SHOW performance of",
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "HOTEL LOBBY (Unc & Phew)" }),
												"."
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "In September 2026, AI remixes of that performance spread across TikTok and X. Creators started replacing the duo with friends, couples, pets, athletes, celebrities, and fictional characters while keeping the recognizable stage and performance structure." }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "It is not a traditional camera filter. The versions people share are generated or edited with AI from reference images and a motion or scene template. This page packages that generation step into one preset." })
										]
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "mx-auto max-w-6xl px-4 py-14 md:px-5 md:py-20",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mx-auto max-w-3xl text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-semibold tracking-[0.18em] text-[rgb(204,144,92)] uppercase",
										children: "Three steps"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "mt-3 text-3xl font-semibold tracking-tight sm:text-4xl",
										children: "How to make the Hotel Lobby AI video"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-9 grid gap-4 md:grid-cols-3",
									children: [
										{
											icon: Images,
											title: "1. Upload one or two photos",
											text: "Use one photo with both of you, or one clear photo per performer. Waist-up or full-body shots carry outfits better."
										},
										{
											icon: Sparkles,
											title: "2. Press generate",
											text: "The Hotel Lobby performance is already loaded. The duration is taken from the reference video automatically."
										},
										{
											icon: Film,
											title: "3. Add the sound and post",
											text: "Download the MP4, upload it to TikTok or Reels, then choose the licensed Hotel Lobby sound from the platform music library."
										}
									].map((step) => {
										const Icon = step.icon;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-2xl border border-white/8 bg-white/[0.025] p-5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "flex size-10 items-center justify-center rounded-xl bg-[rgba(204,144,92,0.1)] text-[rgb(220,155,99)]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "mt-5 text-lg font-semibold",
													children: step.title
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-2 text-sm leading-6 text-white/42",
													children: step.text
												})
											]
										}, step.title);
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "mx-auto max-w-6xl px-4 pb-14 md:px-5 md:pb-20",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-3xl font-semibold tracking-tight sm:text-4xl",
									children: "Who people cast in the Hotel Lobby AI video"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
									children: CAST_IDEAS.map(([title, text]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl border border-white/8 bg-white/[0.025] p-5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-semibold text-white/86",
											children: title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-sm leading-6 text-white/42",
											children: text
										})]
									}, title))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
								className: "border-y border-white/7 bg-white/[0.018]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mx-auto max-w-6xl px-4 py-14 md:px-5 md:py-20",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "text-3xl font-semibold tracking-tight sm:text-4xl",
											children: "Hotel Lobby AI vs Higgsfield Genjutsu"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-4 max-w-3xl text-sm leading-7 text-white/48 sm:text-base",
											children: "Both workflows can use a source performance to preserve motion. The difference is product scope: this page preloads the Hotel Lobby template and fixes the prompt, while Genjutsu is the general-purpose motion-transfer and object-swap workflow."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-7 overflow-x-auto rounded-2xl border border-white/8",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
												className: "w-full min-w-[680px] border-collapse text-left text-sm",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
													className: "bg-white/[0.035] text-white/72",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
															className: "px-4 py-3 font-semibold",
															children: " "
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
															className: "px-4 py-3 font-semibold",
															children: "This page"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
															className: "px-4 py-3 font-semibold",
															children: "Higgsfield Genjutsu"
														})
													] })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
													className: "divide-y divide-white/7 text-white/46",
													children: [
														[
															"What you upload",
															"1–2 photos; preset video included",
															"4–30s source clip + references"
														],
														[
															"Copies source motion",
															"Yes, from the preset or your replacement clip",
															"Yes, in Motion Transfer"
														],
														[
															"Need to find the Hotel Lobby clip",
															"No",
															"Yes, if that is the motion you want"
														],
														[
															"Default output",
															"Matches the reference clip",
															"Up to 1080p · source-driven"
														],
														[
															"Prompt writing",
															"No fixed prompt exposed",
															"Optional / workflow-dependent"
														]
													].map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: row.map((cell, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: index === 0 ? "px-4 py-3 font-medium text-white/72" : "px-4 py-3",
														children: cell
													}, cell)) }, row[0]))
												})]
											})
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "mx-auto grid max-w-6xl gap-8 px-4 py-14 md:px-5 md:py-20 lg:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-3xl font-semibold tracking-tight",
									children: "Photo tips for a better swap"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-6 space-y-4",
									children: PHOTO_TIPS.map((tip) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex gap-3 text-sm leading-6 text-white/46",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mt-0.5 size-4 shrink-0 text-[rgb(204,144,92)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: tip })]
									}, tip))
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-[26px] border border-white/8 bg-white/[0.025] p-6 sm:p-7",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex size-11 items-center justify-center rounded-xl bg-[rgba(204,144,92,0.1)] text-[rgb(220,155,99)]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-5" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "mt-5 text-3xl font-semibold tracking-tight",
											children: "Free to set up, private by default"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-4 text-sm leading-7 text-white/46",
											children: "You can load the preset, choose photos, and preview your setup without spending credits. Choosing a file only creates a local browser preview. Your photos and custom reference video are not uploaded until you sign in and press generate. Generation inputs are stored privately for the job rather than published to a public gallery."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-4 text-sm leading-7 text-white/46",
											children: "Provider failures automatically refund reserved credits. Use images of yourself, pets you own, or people who agreed to appear."
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "mx-auto max-w-5xl px-4 pb-16 md:px-5 md:pb-24",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-3xl font-semibold tracking-tight sm:text-4xl",
									children: "Hotel Lobby AI FAQ"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-7 divide-y divide-white/7 rounded-2xl border border-white/8 bg-white/[0.02] px-5 sm:px-7",
									children: FAQ_ITEMS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
										className: "group py-5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
											className: "cursor-pointer list-none pr-6 text-sm font-semibold text-white/82 sm:text-base",
											children: item.question
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-3 max-w-3xl text-sm leading-7 text-white/45",
											children: item.answer
										})]
									}, item.question))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
								className: "mx-auto max-w-6xl px-4 pb-20 md:px-5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-[26px] border border-white/8 bg-white/[0.02] p-6 sm:p-8",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-2xl font-semibold tracking-tight",
										children: "Explore more"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-5 flex flex-wrap gap-3",
										children: [
											["Genjutsu motion transfer", "/"],
											["Genjutsu prompt guide", "/genjutsu-prompts"],
											["Your generated videos", "/creations"],
											["Credit pricing", "/pricing"]
										].map(([label, href]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
											href,
											className: "rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/58 transition hover:border-[rgba(204,144,92,0.35)] hover:text-[rgb(220,155,99)]",
											children: label
										}, href))
									})]
								})
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-white/7 py-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-center text-xs text-white/32 sm:flex-row sm:text-left md:px-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"© 2026 ",
						envConfigs.app_name,
						". Independent tool; not affiliated with COLORS, Quavo, or Takeoff."
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-center gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
								href: "/privacy-policy",
								className: "transition hover:text-white/65",
								children: "Privacy"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
								href: "/terms-of-service",
								className: "transition hover:text-white/65",
								children: "Terms"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
								href: "/refund-policy",
								className: "transition hover:text-white/65",
								children: "Refunds"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: `mailto:${envConfigs.app_support_email}`,
								className: "transition hover:text-white/65",
								children: "Support"
							})
						]
					})]
				})
			})
		]
	});
}
//#endregion
export { HotelLobbyAiPage as component };
