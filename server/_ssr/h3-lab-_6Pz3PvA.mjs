import { o as __toESM } from "../_runtime.mjs";
import { at as require_jsx_runtime, ot as require_react } from "../_libs/@base-ui/react+[...].mjs";
import { t as Link$1 } from "./navigation-BgznuAML.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { v as useSession } from "./client-xUgmZoCV.mjs";
import { d as uploadToSignedUrl, i as apiGet, o as apiPost, t as ApiError } from "./api-client-BXIVLJCS.mjs";
import { A as Play, Ct as Download, K as LoaderCircle, s as Upload } from "../_libs/lucide-react.mjs";
import { t as useUserCredits } from "./use-user-credits-B5TISbhc.mjs";
import { n as buttonVariants, t as Button$1 } from "./button-RkClB0x2.mjs";
import { t as SiteHeader } from "./SiteHeader-B2cCQXdM.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Label } from "./label-Dzpc0zKw.mjs";
import { c as HOTEL_LOBBY_RESOLUTIONS, d as estimateH3LabCredits, n as H3_MAX_PROMPT_LENGTH, r as HOTEL_LOBBY_ASPECT_RATIOS } from "./pricing-C7HhhK6N.mjs";
import { t as Textarea } from "./textarea-kLCUgc24.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/h3-lab-_6Pz3PvA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MAX_VIDEO_BYTES = 80 * 1024 * 1024;
var MAX_IMAGE_BYTES = 12 * 1024 * 1024;
var MIN_REFERENCE_VIDEO_SECONDS = 5;
var MAX_REFERENCE_VIDEO_SECONDS = 15;
var PROMPT_EXPANSION_MODES = [
	"disabled",
	"fast",
	"balanced",
	"quality"
];
/** Default prompt matching Hotel Lobby 2-image preset — editable for lab tests. */
var DEFAULT_H3_LAB_PROMPT = [
	"Use Video 1 as the exact performance reference for motion, timing, gestures, camera, framing, microphone position, orange booth, lighting, and shot progression.",
	"Replace the left performer in Video 1 with Image 1 and the right performer with Image 2.",
	"Keep each replacement identity, face, hair, clothing, body proportions, and species consistent with its matching image throughout the clip.",
	"Preserve the original booth, hanging microphone, choreography, timing, camera, composition, and background as closely as possible.",
	"Do not swap the two identities, blend them together, add extra people, or alter unrelated parts of the shot."
].join("\n");
function createMediaItem(file) {
	return {
		id: `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2, 8)}`,
		file,
		url: URL.createObjectURL(file)
	};
}
function readVideoDuration(file) {
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
			cleanup();
			if (!Number.isFinite(duration) || duration <= 0) {
				reject(/* @__PURE__ */ new Error("Could not read video duration"));
				return;
			}
			resolve(duration);
		};
		video.onerror = () => {
			cleanup();
			reject(/* @__PURE__ */ new Error("Could not read video duration"));
		};
		video.src = url;
	});
}
function clampReferenceDuration(seconds) {
	return Math.min(MAX_REFERENCE_VIDEO_SECONDS, Math.max(MIN_REFERENCE_VIDEO_SECONDS, Math.round(seconds)));
}
function redirectToSignIn() {
	const callbackUrl = encodeURIComponent(`${window.location.pathname}${window.location.search}`);
	window.location.href = `/sign-in?callbackUrl=${callbackUrl}`;
}
function H3LabPanel() {
	const { data: session, isPending: sessionPending } = useSession();
	const creditsQuery = useUserCredits();
	const localUrlsRef = (0, import_react.useRef)(/* @__PURE__ */ new Set());
	const mountedRef = (0, import_react.useRef)(true);
	const videoInputRef = (0, import_react.useRef)(null);
	const imageInputRef = (0, import_react.useRef)(null);
	const replaceImageInputRef = (0, import_react.useRef)(null);
	const replaceImageIndexRef = (0, import_react.useRef)(null);
	const [video, setVideo] = (0, import_react.useState)(null);
	const [videoDuration, setVideoDuration] = (0, import_react.useState)(null);
	const [images, setImages] = (0, import_react.useState)([]);
	const [prompt, setPrompt] = (0, import_react.useState)(DEFAULT_H3_LAB_PROMPT);
	const [resolution, setResolution] = (0, import_react.useState)("768P");
	const [aspectRatio, setAspectRatio] = (0, import_react.useState)("16:9");
	const [promptExpansionMode, setPromptExpansionMode] = (0, import_react.useState)("disabled");
	const [durationMode, setDurationMode] = (0, import_react.useState)("auto");
	const [manualDuration, setManualDuration] = (0, import_react.useState)(8);
	const [enableSafetyChecker, setEnableSafetyChecker] = (0, import_react.useState)(true);
	const [phase, setPhase] = (0, import_react.useState)("idle");
	const [providerStatus, setProviderStatus] = (0, import_react.useState)("");
	const [generationId, setGenerationId] = (0, import_react.useState)(null);
	const [resultUrl, setResultUrl] = (0, import_react.useState)(null);
	const [creditError, setCreditError] = (0, import_react.useState)(null);
	const busy = phase !== "idle" && phase !== "done";
	const billedDuration = (0, import_react.useMemo)(() => {
		if (durationMode === "manual") return manualDuration;
		if (videoDuration == null) return null;
		return clampReferenceDuration(videoDuration);
	}, [
		durationMode,
		manualDuration,
		videoDuration
	]);
	const estimatedCredits = (0, import_react.useMemo)(() => {
		if (billedDuration == null || images.length < 1) return null;
		try {
			return estimateH3LabCredits({
				duration: billedDuration,
				resolution,
				imageCount: images.length
			});
		} catch {
			return null;
		}
	}, [
		billedDuration,
		images.length,
		resolution
	]);
	(0, import_react.useEffect)(() => {
		mountedRef.current = true;
		const urls = localUrlsRef.current;
		return () => {
			mountedRef.current = false;
			for (const url of urls) URL.revokeObjectURL(url);
			urls.clear();
		};
	}, []);
	const revokeItem = (item) => {
		if (!item) return;
		URL.revokeObjectURL(item.url);
		localUrlsRef.current.delete(item.url);
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
			const durationSeconds = await readVideoDuration(file);
			if (durationSeconds < MIN_REFERENCE_VIDEO_SECONDS - .1 || durationSeconds > 15.2) {
				toast.error("Reference video must be between 5 and 15 seconds");
				return;
			}
			revokeItem(video);
			const item = createMediaItem(file);
			localUrlsRef.current.add(item.url);
			setVideo(item);
			setVideoDuration(durationSeconds);
			setManualDuration(clampReferenceDuration(durationSeconds));
			setResultUrl(null);
			setPhase("idle");
		} catch {
			toast.error("Could not read this video. Try MP4 or MOV.");
		}
	};
	const validateImageFile = (file) => {
		if (!file.type.startsWith("image/")) {
			toast.error("Use a JPEG, PNG, or WebP image");
			return false;
		}
		if (file.size <= 0 || file.size > MAX_IMAGE_BYTES) {
			toast.error("Reference image must be 12 MB or smaller");
			return false;
		}
		return true;
	};
	const addImages = (fileList) => {
		if (!fileList?.length) return;
		const remaining = 9 - images.length;
		if (remaining <= 0) {
			toast.error(`At most 9 reference images`);
			return;
		}
		const next = [];
		for (const file of Array.from(fileList).slice(0, remaining)) {
			if (!validateImageFile(file)) continue;
			const item = createMediaItem(file);
			localUrlsRef.current.add(item.url);
			next.push(item);
		}
		if (next.length === 0) return;
		setImages((current) => [...current, ...next]);
		setResultUrl(null);
		setPhase("idle");
	};
	const replaceImageAt = (index, file) => {
		if (!file || !validateImageFile(file)) return;
		const item = createMediaItem(file);
		localUrlsRef.current.add(item.url);
		setImages((current) => {
			const copy = [...current];
			const previous = copy[index];
			if (previous) revokeItem(previous);
			copy[index] = item;
			return copy;
		});
		setResultUrl(null);
		setPhase("idle");
	};
	const clearImageAt = (index) => {
		setImages((current) => {
			const previous = current[index];
			if (previous) revokeItem(previous);
			return current.filter((_, i) => i !== index);
		});
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
		if (!video || videoDuration == null) {
			toast.error("Upload a 5–15s reference video");
			return;
		}
		if (images.length < 1) {
			toast.error("Add at least one reference image");
			return;
		}
		if (images.length > 9) {
			toast.error(`At most 9 reference images`);
			return;
		}
		if (!prompt.trim()) {
			toast.error("Prompt is required");
			return;
		}
		if (billedDuration == null || !estimatedCredits) {
			toast.error("Could not estimate credits for these settings");
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
		try {
			const files = [video.file, ...images.map((item) => item.file)];
			const contentTypes = files.map((file) => file.type || "application/octet-stream");
			const contentLengths = files.map((file) => file.size);
			const setup = await apiPost("/api/h3-lab/upload-url", {
				generationId: id,
				useDefaultTemplate: false,
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
			const start = await apiPost("/api/h3-lab/generate", {
				generationId: id,
				useDefaultTemplate: false,
				prompt: prompt.trim(),
				resolution,
				aspectRatio,
				promptExpansionMode,
				enableSafetyChecker,
				durationMode,
				durationSeconds: billedDuration,
				videoKey: videoUpload?.storageKey,
				imageKeys: imageUploads.map((item) => item.storageKey),
				contentTypes,
				contentLengths
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
	const phaseLabel = phase === "uploading" ? "Uploading…" : phase === "starting" ? "Starting MiniMax H3…" : phase === "generating" ? providerStatus ? `Generating · ${providerStatus}` : "Generating…" : phase === "saving" ? "Saving…" : "Generate";
	const selectClass = "h-9 w-full rounded-lg border border-border bg-background px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-50";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-5xl space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "border-border bg-card space-y-3 rounded-xl border p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-semibold",
							children: "Reference video"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground mt-0.5 text-xs",
							children: "Required · MP4/MOV · 5–15s · ≤80 MB"
						})] }),
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
						video ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-border relative aspect-video overflow-hidden rounded-lg border bg-black",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
								src: video.url,
								controls: true,
								muted: true,
								playsInline: true,
								preload: "metadata",
								className: "size-full object-contain"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
								type: "button",
								variant: "secondary",
								size: "xs",
								className: "absolute top-2 right-2",
								disabled: busy,
								onClick: () => {
									revokeItem(video);
									setVideo(null);
									setVideoDuration(null);
									if (videoInputRef.current) videoInputRef.current.value = "";
								},
								children: "Remove"
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							disabled: busy,
							onClick: () => videoInputRef.current?.click(),
							className: "border-border text-muted-foreground hover:bg-muted/40 flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed text-sm transition disabled:opacity-50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-5" }), "Upload reference video"]
						}),
						videoDuration != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-muted-foreground text-xs",
							children: [
								"Source duration: ",
								videoDuration.toFixed(2),
								"s"
							]
						}) : null
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "border-border bg-card space-y-3 rounded-xl border p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-sm font-semibold",
								children: "Reference images"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-muted-foreground mt-0.5 text-xs",
								children: [
									"1–",
									9,
									" images · JPEG/PNG/WebP · ≤12 MB each · prompt as Image 1…Image N"
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-muted-foreground shrink-0 text-xs",
								children: [
									images.length,
									"/",
									9
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: imageInputRef,
							type: "file",
							accept: "image/jpeg,image/png,image/webp",
							multiple: true,
							className: "hidden",
							onChange: (event) => {
								addImages(event.target.files);
								event.target.value = "";
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: replaceImageInputRef,
							type: "file",
							accept: "image/jpeg,image/png,image/webp",
							className: "hidden",
							onChange: (event) => {
								const index = replaceImageIndexRef.current;
								replaceImageIndexRef.current = null;
								if (index != null) replaceImageAt(index, event.target.files?.[0] || null);
								event.target.value = "";
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-3 gap-2 sm:grid-cols-4",
							children: [images.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-muted-foreground text-[11px] font-medium",
									children: ["Image ", index + 1]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-border bg-muted relative aspect-square overflow-hidden rounded-lg border",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: item.url,
										alt: "",
										className: "size-full object-cover"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "absolute inset-x-0 bottom-0 flex gap-1 bg-black/55 p-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
											type: "button",
											variant: "secondary",
											size: "xs",
											className: "flex-1",
											disabled: busy,
											onClick: () => {
												replaceImageIndexRef.current = index;
												replaceImageInputRef.current?.click();
											},
											children: "Replace"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
											type: "button",
											variant: "secondary",
											size: "xs",
											disabled: busy,
											onClick: () => clearImageAt(index),
											children: "×"
										})]
									})]
								})]
							}, item.id)), images.length < 9 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								disabled: busy,
								onClick: () => imageInputRef.current?.click(),
								className: "border-border text-muted-foreground hover:bg-muted/40 flex aspect-square flex-col items-center justify-center gap-1 self-end rounded-lg border border-dashed text-xs transition disabled:opacity-50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-4" }), "Add"]
							}) : null]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "border-border bg-card space-y-3 rounded-xl border p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "h3-lab-prompt",
							children: "Prompt"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							type: "button",
							variant: "ghost",
							size: "xs",
							disabled: busy,
							onClick: () => setPrompt(DEFAULT_H3_LAB_PROMPT),
							children: "Reset default"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						id: "h3-lab-prompt",
						value: prompt,
						disabled: busy,
						rows: 8,
						onChange: (event) => setPrompt(event.target.value),
						className: "min-h-40 font-mono text-xs"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-muted-foreground text-xs",
						children: [
							prompt.trim().length,
							" / ",
							H3_MAX_PROMPT_LENGTH,
							" characters"
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "border-border bg-card grid gap-4 rounded-xl border p-4 sm:grid-cols-2 lg:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "h3-lab-resolution",
							children: "Resolution"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							id: "h3-lab-resolution",
							className: selectClass,
							value: resolution,
							disabled: busy,
							onChange: (event) => setResolution(event.target.value),
							children: HOTEL_LOBBY_RESOLUTIONS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: item,
								children: item
							}, item))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "h3-lab-aspect",
							children: "Aspect ratio"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							id: "h3-lab-aspect",
							className: selectClass,
							value: aspectRatio,
							disabled: busy,
							onChange: (event) => setAspectRatio(event.target.value),
							children: HOTEL_LOBBY_ASPECT_RATIOS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: item,
								children: item
							}, item))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "h3-lab-expand",
							children: "Prompt expansion"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							id: "h3-lab-expand",
							className: selectClass,
							value: promptExpansionMode,
							disabled: busy,
							onChange: (event) => setPromptExpansionMode(event.target.value),
							children: PROMPT_EXPANSION_MODES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: item,
								children: item
							}, item))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "h3-lab-duration-mode",
							children: "Duration"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							id: "h3-lab-duration-mode",
							className: selectClass,
							value: durationMode,
							disabled: busy,
							onChange: (event) => setDurationMode(event.target.value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "auto",
								children: "Auto from video"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "manual",
								children: "Manual (5–15s)"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "h3-lab-duration",
							children: durationMode === "manual" ? "Output seconds" : "Billed seconds"
						}), durationMode === "manual" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							id: "h3-lab-duration",
							className: selectClass,
							value: manualDuration,
							disabled: busy,
							onChange: (event) => setManualDuration(Number(event.target.value)),
							children: Array.from({ length: 11 }, (_, i) => i + 5).map((seconds) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: seconds,
								children: [seconds, "s"]
							}, seconds))
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							id: "h3-lab-duration",
							className: "border-border text-muted-foreground flex h-9 items-center rounded-lg border px-2.5 text-sm",
							children: billedDuration != null ? `${billedDuration}s` : "—"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "h3-lab-safety",
							children: "Safety checker"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							htmlFor: "h3-lab-safety",
							className: "border-border flex h-9 items-center gap-2 rounded-lg border px-2.5 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "h3-lab-safety",
								type: "checkbox",
								checked: enableSafetyChecker,
								disabled: busy,
								onChange: (event) => setEnableSafetyChecker(event.target.checked)
							}), "enable_safety_checker"]
						})]
					})
				]
			}),
			creditError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 rounded-xl border border-amber-500/30 bg-amber-500/5 px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: "Not enough credits"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-muted-foreground mt-0.5 text-xs",
					children: [
						"Need ",
						creditError.required.toLocaleString(),
						" · balance",
						" ",
						creditError.balance.toLocaleString()
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
					href: "/pricing",
					className: cn(buttonVariants({ size: "sm" })),
					children: "Buy credits"
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-muted-foreground text-xs",
					children: [
						"Balance:",
						" ",
						creditsQuery.isPending ? "…" : (creditsQuery.data?.balance ?? 0).toLocaleString(),
						" ",
						"credits",
						estimatedCredits != null ? ` · estimate ~${estimatedCredits.toLocaleString()}` : "",
						generationId ? ` · id ${generationId.slice(0, 8)}` : ""
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
					type: "button",
					size: "lg",
					disabled: busy || sessionPending,
					onClick: () => void generate(),
					className: "min-w-[220px]",
					children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : session?.user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4 fill-current" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-4" }), !session?.user ? "Sign in to generate" : busy ? phaseLabel : estimatedCredits ? `Generate (~${estimatedCredits} credits)` : "Generate"]
				})]
			}),
			resultUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "border-border bg-card space-y-3 rounded-xl border p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold",
						children: "Result"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-muted-foreground mt-0.5 text-xs",
						children: [
							"MiniMax H3 · ",
							resolution,
							" · ",
							aspectRatio,
							billedDuration != null ? ` · ${billedDuration}s` : ""
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: generationId ? `/api/hotel-lobby/result/${encodeURIComponent(generationId)}?download=1` : resultUrl,
						download: generationId ? `h3-lab-${generationId.slice(0, 8)}.mp4` : void 0,
						className: cn(buttonVariants({
							variant: "outline",
							size: "sm"
						})),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), "Download"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
					src: resultUrl,
					controls: true,
					autoPlay: true,
					playsInline: true,
					className: "mx-auto aspect-video max-h-[720px] w-full rounded-lg bg-black object-contain"
				})]
			}) : null
		]
	});
}
function H3LabPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background text-foreground min-h-screen",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "px-4 py-8 sm:px-6 lg:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto mb-8 max-w-5xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground text-xs font-medium tracking-wide uppercase",
						children: "Internal test"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 text-2xl font-semibold tracking-tight sm:text-3xl",
						children: "MiniMax H3 Lab"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-muted-foreground mt-2 max-w-2xl text-sm",
						children: [
							"Same Fal model as Hotel Lobby AI (",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
								className: "text-xs",
								children: "minimax/h3/reference-to-video"
							}),
							"), with prompt, up to 9 reference images, resolution, aspect ratio, duration, and safety checker exposed for quick A/B tests. Uses your credit balance. noindex · not in sitemap."
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(H3LabPanel, {})]
		})]
	});
}
//#endregion
export { H3LabPage as component };
