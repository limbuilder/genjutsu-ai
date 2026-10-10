import { o as __toESM } from "../_runtime.mjs";
import { at as require_jsx_runtime, ot as require_react } from "../_libs/@base-ui/react+[...].mjs";
import { Ec as genjutsu_estimate_help_aria, Oc as genjutsu_estimate_tooltip, Tc as genjutsu_estimate_credits } from "./messages-B_Y80loh.mjs";
import { t as Link$1 } from "./navigation-BgznuAML.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { v as useSession } from "./client-xUgmZoCV.mjs";
import { d as uploadToSignedUrl, i as apiGet, o as apiPost, t as ApiError } from "./api-client-BXIVLJCS.mjs";
import { Ct as Download, Mt as CircleCheck, _ as Sparkles, ht as Film, it as Images, jt as CircleHelp, r as WandSparkles } from "../_libs/lucide-react.mjs";
import { t as useUserCredits } from "./use-user-credits-B5TISbhc.mjs";
import { a as ImageModeIcon, n as CloseIcon, t as ChevronDownIcon$1 } from "./site-user-menu-C3Ao0HTQ.mjs";
import { t as SiteFooter } from "./SiteFooter-Bjzgl7AX.mjs";
import { t as SiteHeader } from "./SiteHeader-B2cCQXdM.mjs";
import { o as estimateGenjutsuCredits } from "./pricing-C70Iy5jq.mjs";
import { c as getZombieHugPublicTemplatePath, l as getZombieHugTemplateDurationSeconds, n as ZOMBIE_HUG_DEFAULT_ASPECT_RATIO, r as ZOMBIE_HUG_DEFAULT_RESOLUTION, s as ZOMBIE_HUG_RESOLUTIONS, t as ZOMBIE_HUG_ASPECT_RATIOS } from "./prompt-Bj47jeD1.mjs";
import { i as TooltipTrigger, n as TooltipContent, r as TooltipProvider, t as Tooltip$1 } from "./tooltip-gxwNe4KH.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ai-zombie-hug-BrEOQOJ9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var templateApiUrl = (aspectRatio) => `/api/zombie-hug/template?aspect=${encodeURIComponent(aspectRatio)}`;
var MAX_IMAGE_BYTES = 12 * 1024 * 1024;
var chipClass = "inline-flex h-7 max-w-full min-w-0 shrink-0 items-center gap-1 rounded-lg border border-transparent bg-[rgba(94,96,104,0.3)] px-2 text-[12px] font-medium text-secondary-foreground/88 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-2xl transition-all duration-200 hover:bg-[rgba(109,112,121,0.36)] disabled:cursor-not-allowed disabled:opacity-50";
var selectedOptionClass = "border-transparent bg-[rgba(120,87,60,0.9)] text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.045)]";
var idleOptionClass = "border-transparent bg-transparent text-foreground/68 hover:bg-[rgba(98,71,51,0.28)] hover:text-foreground/88";
function SectionLabel({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-foreground/55 mb-1.5 px-1 text-[10px] font-medium",
		children
	});
}
function OptionRow({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex gap-1 rounded-[11px] bg-[rgba(72,52,38,0.2)] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.015)]",
		children
	});
}
function SegmentButton({ selected, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("relative flex h-7 min-w-0 flex-1 items-center justify-center overflow-visible rounded-[9px] px-2 text-[13px] font-medium transition-all duration-200", selected ? selectedOptionClass : idleOptionClass),
		children
	});
}
function FloatingPanel({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "animate-in fade-in slide-in-from-bottom-1 absolute bottom-full left-0 z-[1000] mb-2 w-[min(calc(100vw-2rem),280px)] max-w-[calc(100vw-1rem)] duration-200",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-y-hidden rounded-[20px] bg-[rgba(41,30,23,0.992)] p-2.5 shadow-[0_40px_80px_-12px_rgba(0,0,0,0.66)] backdrop-blur-2xl",
			children
		})
	});
}
var activeGenerationKey = (userId) => `zombie_hug_active_generation:${userId}`;
var sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
function createMediaItem(file) {
	return {
		id: `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2, 8)}`,
		file,
		url: URL.createObjectURL(file)
	};
}
function PersonSlot({ title, note, item, inputRef, disabled, onPick, onRemove }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-semibold text-white/90",
			children: title
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-0.5 text-xs leading-5 text-white/40",
			children: note
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			ref: inputRef,
			type: "file",
			accept: "image/jpeg,image/png,image/webp,image/gif,image/avif",
			className: "hidden",
			onChange: (event) => {
				const file = event.target.files?.[0] || null;
				if (file) onPick(file);
				event.target.value = "";
			}
		}),
		item ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mt-3 aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 bg-black",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: item.url,
				alt: title,
				className: "size-full object-cover"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onRemove,
				disabled,
				"aria-label": `Remove ${title}`,
				className: "absolute top-2 right-2 flex size-8 items-center justify-center rounded-full bg-black/70 text-white/80 backdrop-blur transition hover:bg-black/90 disabled:opacity-40",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseIcon, { className: "size-4" })
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			disabled,
			onClick: () => inputRef.current?.click(),
			className: "mt-3 flex aspect-[3/4] w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/18 bg-white/[0.03] text-center transition hover:border-white/35 hover:bg-white/[0.05] disabled:cursor-not-allowed disabled:opacity-50",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex size-11 items-center justify-center rounded-full bg-white/8 text-white/70",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageModeIcon, { className: "size-5" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block text-sm font-medium text-white/78",
				children: "Upload photo"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-1 block text-xs text-white/38",
				children: "JPG, PNG or WebP · up to 12 MB"
			})] })]
		})
	] });
}
function ZombieHugGeneratorPanel() {
	const { data: session, isPending: sessionPending } = useSession();
	const creditsQuery = useUserCredits(Boolean(session?.user));
	const [survivorImage, setSurvivorImage] = (0, import_react.useState)(null);
	const [lovedOneImage, setLovedOneImage] = (0, import_react.useState)(null);
	const [resolution, setResolution] = (0, import_react.useState)(ZOMBIE_HUG_DEFAULT_RESOLUTION);
	const [aspectRatio, setAspectRatio] = (0, import_react.useState)(ZOMBIE_HUG_DEFAULT_ASPECT_RATIO);
	const [settingsOpen, setSettingsOpen] = (0, import_react.useState)(false);
	const [templateUrl, setTemplateUrl] = (0, import_react.useState)(() => templateApiUrl(ZOMBIE_HUG_DEFAULT_ASPECT_RATIO));
	const [phase, setPhase] = (0, import_react.useState)("idle");
	const [generationId, setGenerationId] = (0, import_react.useState)(null);
	const [resultUrl, setResultUrl] = (0, import_react.useState)(null);
	const [resultAspectRatio, setResultAspectRatio] = (0, import_react.useState)(ZOMBIE_HUG_DEFAULT_ASPECT_RATIO);
	const [jobError, setJobError] = (0, import_react.useState)("");
	const [creditError, setCreditError] = (0, import_react.useState)(null);
	const survivorInputRef = (0, import_react.useRef)(null);
	const lovedOneInputRef = (0, import_react.useRef)(null);
	const survivorUrlRef = (0, import_react.useRef)(null);
	const lovedOneUrlRef = (0, import_react.useRef)(null);
	const generationRunRef = (0, import_react.useRef)(0);
	const settingsRef = (0, import_react.useRef)(null);
	const estimatedCredits = (0, import_react.useMemo)(() => estimateGenjutsuCredits({
		durationSeconds: getZombieHugTemplateDurationSeconds(aspectRatio),
		resolution
	}), [aspectRatio, resolution]);
	(0, import_react.useEffect)(() => {
		setTemplateUrl(templateApiUrl(aspectRatio));
	}, [aspectRatio]);
	(0, import_react.useEffect)(() => {
		if (!settingsOpen) return;
		const onPointerDown = (event) => {
			if (settingsRef.current && !settingsRef.current.contains(event.target)) setSettingsOpen(false);
		};
		const onKeyDown = (event) => {
			if (event.key === "Escape") setSettingsOpen(false);
		};
		document.addEventListener("mousedown", onPointerDown);
		document.addEventListener("keydown", onKeyDown);
		return () => {
			document.removeEventListener("mousedown", onPointerDown);
			document.removeEventListener("keydown", onKeyDown);
		};
	}, [settingsOpen]);
	const busy = phase === "uploading" || phase === "starting" || phase === "generating" || phase === "saving" || phase === "locked";
	(0, import_react.useEffect)(() => {
		survivorUrlRef.current = survivorImage?.url ?? null;
	}, [survivorImage]);
	(0, import_react.useEffect)(() => {
		lovedOneUrlRef.current = lovedOneImage?.url ?? null;
	}, [lovedOneImage]);
	(0, import_react.useEffect)(() => {
		return () => {
			if (survivorUrlRef.current) URL.revokeObjectURL(survivorUrlRef.current);
			if (lovedOneUrlRef.current) URL.revokeObjectURL(lovedOneUrlRef.current);
		};
	}, []);
	const setImageAt = (slot, file) => {
		if (!file) return;
		if (!(file.type.split(";", 1)[0]?.trim().toLowerCase() || "").startsWith("image/")) {
			toast.error("Please upload a JPG, PNG, WebP, or GIF image");
			return;
		}
		if (file.size > MAX_IMAGE_BYTES) {
			toast.error("Images must be 12 MB or smaller");
			return;
		}
		const next = createMediaItem(file);
		if (slot === "survivor") setSurvivorImage((current) => {
			if (current) URL.revokeObjectURL(current.url);
			return next;
		});
		else setLovedOneImage((current) => {
			if (current) URL.revokeObjectURL(current.url);
			return next;
		});
		setCreditError(null);
	};
	const clearImageAt = (slot) => {
		if (slot === "survivor") setSurvivorImage((current) => {
			if (current) URL.revokeObjectURL(current.url);
			return null;
		});
		else setLovedOneImage((current) => {
			if (current) URL.revokeObjectURL(current.url);
			return null;
		});
	};
	const pollGeneration = (0, import_react.useCallback)(async (active, runId) => {
		let delayMs = 1500;
		let notFoundCount = 0;
		let resumeAttempts = 0;
		let preReservePolls = 0;
		const MAX_RESUME_GENERATE = 5;
		const RESUME_GRACE_POLLS = 2;
		for (let attempt = 0; attempt < 240; attempt += 1) {
			await sleep(delayMs);
			if (generationRunRef.current !== runId) return;
			let poll;
			try {
				poll = await apiGet(`/api/genjutsu/status?generationId=${encodeURIComponent(active.generationId)}`);
			} catch (cause) {
				if ((cause instanceof ApiError && cause.data && typeof cause.data === "object" ? cause.data : null)?.code === "GENERATION_NOT_FOUND") {
					notFoundCount += 1;
					if (notFoundCount >= 15) {
						localStorage.removeItem(activeGenerationKey(active.userId));
						setPhase("idle");
						setJobError("Generation was not accepted by the server. No active paid job was found.");
						return;
					}
				}
				delayMs = Math.min(5e3, Math.ceil(delayMs * 1.2));
				continue;
			}
			notFoundCount = 0;
			if (typeof poll.reservedCredits === "number" && poll.reservedCredits > 0 && poll.reservedCredits !== active.reservedCredits) {
				active.reservedCredits = poll.reservedCredits;
				localStorage.setItem(activeGenerationKey(active.userId), JSON.stringify(active));
			}
			if (poll.providerStatus === "initiated" || poll.providerStatus === "sealing" || poll.providerStatus === "ready") {
				preReservePolls += 1;
				if (preReservePolls < RESUME_GRACE_POLLS) {
					setPhase("starting");
					setJobError(poll.providerStatus === "sealing" ? "Finishing upload seal for the previous generation…" : "Waiting to confirm whether the previous generation already started…");
					delayMs = Math.min(5e3, Math.ceil(delayMs * 1.2));
					continue;
				}
				if (resumeAttempts >= MAX_RESUME_GENERATE) {
					setPhase("locked");
					setJobError("Could not confirm whether the previous generation reserved credits. This job stays locked to avoid a duplicate charge — refresh to keep checking, or contact support.");
					return;
				}
				resumeAttempts += 1;
				setPhase("starting");
				setJobError("Resuming the previous generation with the same job id…");
				try {
					const start = await apiPost("/api/zombie-hug/generate", { generationId: active.generationId });
					if (generationRunRef.current !== runId) return;
					active.generationId = start.generationId;
					active.reservedCredits = start.reservedCredits || 0;
					localStorage.setItem(activeGenerationKey(active.userId), JSON.stringify(active));
					await creditsQuery.refetch();
					if (start.status === "submission_unknown") {
						setPhase("locked");
						setJobError("Submission result is uncertain. Credits remain reserved; do not retry this generation.");
						return;
					}
					if (start.status === "refunded") {
						localStorage.removeItem(activeGenerationKey(active.userId));
						setPhase("idle");
						setJobError("Generation could not be started");
						toast.error("Generation could not be started");
						return;
					}
					setPhase("generating");
					setJobError("");
				} catch (cause) {
					if (generationRunRef.current !== runId) return;
					const data = cause instanceof ApiError && cause.data && typeof cause.data === "object" ? cause.data : null;
					const code = typeof data?.code === "string" ? data.code : void 0;
					if (code === "SUBMISSION_UNKNOWN") {
						setPhase("locked");
						setJobError(cause instanceof Error ? cause.message : "Submission result is uncertain. Credits remain reserved; do not retry this generation.");
						return;
					}
					if (code === "GENERATION_SEAL_IN_PROGRESS") {
						resumeAttempts = Math.max(0, resumeAttempts - 1);
						setPhase("starting");
						setJobError("Upload seal is still in progress. Waiting to reclaim the same job if it stalls…");
						delayMs = Math.min(5e3, Math.ceil(delayMs * 1.2));
						continue;
					}
					if (code === "TEMPLATE_NOT_CONFIGURED") {
						resumeAttempts = Math.max(0, resumeAttempts - 1);
						try {
							const verify = await apiGet(`/api/genjutsu/status?generationId=${encodeURIComponent(active.generationId)}`);
							if (generationRunRef.current !== runId) return;
							if (verify.providerStatus === "failed_preflight") {
								localStorage.removeItem(activeGenerationKey(active.userId));
								setPhase("idle");
								setJobError(cause instanceof Error ? cause.message : "Generation failed to start");
								toast.error(cause instanceof Error ? cause.message : "Generation failed to start");
								return;
							}
						} catch {}
						setPhase("starting");
						setJobError("Template check failed while a previous seal may still be running. Keeping this job locked…");
						delayMs = Math.min(5e3, Math.ceil(delayMs * 1.2));
						continue;
					}
					if (code === "INSUFFICIENT_CREDITS" || code === "GENERATION_NOT_FOUND") {
						localStorage.removeItem(activeGenerationKey(active.userId));
						setPhase("idle");
						if (code === "INSUFFICIENT_CREDITS") {
							const required = Number(data?.requiredCredits);
							const balance = Number(data?.balance);
							if (Number.isFinite(required) && required > 0 && Number.isFinite(balance) && balance >= 0) {
								setCreditError({
									required,
									balance
								});
								setJobError("");
								return;
							}
						}
						setJobError(cause instanceof Error ? cause.message : "Generation failed to start");
						toast.error(cause instanceof Error ? cause.message : "Generation failed to start");
						return;
					}
					setPhase("generating");
					setJobError("Still confirming the previous generation. Waiting before allowing another submit…");
				}
				delayMs = Math.min(5e3, Math.ceil(delayMs * 1.2));
				continue;
			}
			if (poll.providerStatus === "submission_unknown") {
				setPhase("locked");
				setJobError(poll.error || "The provider submission result is uncertain. This generation remains locked to avoid a duplicate charge.");
				return;
			}
			if (poll.providerStatus === "persisting") setPhase("saving");
			if (poll.status === "completed" && poll.videoUrl) {
				if (generationRunRef.current !== runId) return;
				localStorage.removeItem(activeGenerationKey(active.userId));
				setResultUrl(poll.videoUrl);
				setJobError("");
				setPhase("idle");
				await creditsQuery.refetch();
				toast.success("Your AI zombie hug video is ready");
				return;
			}
			if (poll.status === "failed") {
				localStorage.removeItem(activeGenerationKey(active.userId));
				setPhase("idle");
				await creditsQuery.refetch();
				if (poll.providerStatus === "insufficient_credits") {
					const required = Number(poll.requiredCredits);
					const balance = Number(poll.balance);
					if (Number.isFinite(required) && required > 0 && Number.isFinite(balance) && balance >= 0) {
						setCreditError({
							required,
							balance
						});
						setJobError("");
						return;
					}
				}
				setJobError(poll.error || "Generation failed");
				toast.error(poll.error || "Generation failed");
				return;
			}
			delayMs = Math.min(5e3, Math.ceil(delayMs * 1.2));
		}
		setPhase("locked");
		setJobError("Generation is still processing. This job remains reserved; refresh the page to resume checking it.");
	}, [creditsQuery]);
	(0, import_react.useEffect)(() => {
		const userId = session?.user?.id;
		if (!userId || phase !== "idle") return;
		try {
			const raw = localStorage.getItem(activeGenerationKey(userId));
			if (!raw) return;
			const active = JSON.parse(raw);
			if (active.userId !== userId || !active.generationId || !Number.isFinite(active.reservedCredits)) {
				localStorage.removeItem(activeGenerationKey(userId));
				return;
			}
			const runId = ++generationRunRef.current;
			setJobError("");
			setCreditError(null);
			setGenerationId(active.generationId);
			setPhase("generating");
			pollGeneration(active, runId);
		} catch {
			localStorage.removeItem(activeGenerationKey(userId));
		}
	}, [
		pollGeneration,
		session?.user?.id,
		phase
	]);
	const generate = async () => {
		if (!session?.user) {
			window.location.href = `/sign-in?callbackUrl=${encodeURIComponent("/ai-zombie-hug#generator")}`;
			return;
		}
		if (busy) return;
		if (!survivorImage || !lovedOneImage) {
			toast.error("Upload both photos: survivor and loved one");
			return;
		}
		setResultUrl(null);
		setCreditError(null);
		setJobError("");
		setPhase("uploading");
		const id = crypto.randomUUID();
		setGenerationId(id);
		const runId = ++generationRunRef.current;
		try {
			const files = [survivorImage.file, lovedOneImage.file];
			const setup = await apiPost("/api/zombie-hug/upload-url", {
				generationId: id,
				contentTypes: files.map((file) => file.type || "application/octet-stream"),
				contentLengths: files.map((file) => file.size),
				resolution,
				aspectRatio
			});
			if (setup.uploads.length !== files.length) throw new Error("Upload setup returned an incomplete file list");
			const sortedUploads = [...setup.uploads].sort((a, b) => a.index - b.index);
			for (let index = 0; index < sortedUploads.length; index += 1) {
				const upload = sortedUploads[index];
				await uploadToSignedUrl({
					url: upload.uploadUrl,
					file: files[index],
					headers: upload.uploadHeaders
				});
			}
			if (generationRunRef.current !== runId) return;
			const active = {
				userId: session.user.id,
				generationId: id,
				reservedCredits: 0
			};
			localStorage.setItem(activeGenerationKey(session.user.id), JSON.stringify(active));
			setPhase("starting");
			setResultAspectRatio(aspectRatio);
			const start = await apiPost("/api/zombie-hug/generate", { generationId: id });
			active.generationId = start.generationId;
			active.reservedCredits = start.reservedCredits || 0;
			localStorage.setItem(activeGenerationKey(session.user.id), JSON.stringify(active));
			await creditsQuery.refetch();
			if (start.status === "submission_unknown") {
				setPhase("locked");
				setJobError("Submission result is uncertain. Credits remain reserved; do not retry this generation.");
				return;
			}
			if (start.status === "refunded") {
				localStorage.removeItem(activeGenerationKey(session.user.id));
				setPhase("idle");
				throw new Error("Generation could not be started");
			}
			setPhase("generating");
			await pollGeneration(active, runId);
		} catch (error) {
			if (generationRunRef.current !== runId) return;
			const data = error instanceof ApiError && error.data && typeof error.data === "object" ? error.data : null;
			const code = typeof data?.code === "string" ? data.code : void 0;
			const safeToClear = code === "INSUFFICIENT_CREDITS" || code === "GENERATION_NOT_FOUND";
			if (code === "SUBMISSION_UNKNOWN") {
				setPhase("locked");
				setJobError(error instanceof Error ? error.message : "Submission result is uncertain. Credits remain reserved; do not retry this generation.");
				return;
			}
			if (code === "TEMPLATE_NOT_CONFIGURED") try {
				const verify = await apiGet(`/api/genjutsu/status?generationId=${encodeURIComponent(id)}`);
				if (generationRunRef.current !== runId) return;
				if (verify.providerStatus === "failed_preflight") {
					localStorage.removeItem(activeGenerationKey(session.user.id));
					setPhase("idle");
					toast.error(error instanceof Error ? error.message : "Zombie hug template is not configured in storage. Contact support.");
					return;
				}
				if (verify.providerStatus === "initiated" || verify.providerStatus === "sealing" || verify.providerStatus === "ready") {
					setPhase("generating");
					setJobError("Template check failed while sealing may still be in progress. Checking the existing job…");
					const raw = localStorage.getItem(activeGenerationKey(session.user.id));
					if (raw) {
						const active = JSON.parse(raw);
						if (active.generationId === id) {
							await pollGeneration(active, runId);
							return;
						}
					}
				}
			} catch {}
			if (error instanceof ApiError && safeToClear) {
				localStorage.removeItem(activeGenerationKey(session.user.id));
				setPhase("idle");
				if (code === "INSUFFICIENT_CREDITS") {
					const required = Number(data?.requiredCredits);
					const balance = Number(data?.balance);
					if (Number.isFinite(required) && required > 0 && Number.isFinite(balance) && balance >= 0) {
						setCreditError({
							required,
							balance
						});
						return;
					}
				}
				toast.error(error.message || "Generation failed to start");
				setJobError(error.message || "Generation failed to start");
				return;
			}
			const raw = localStorage.getItem(activeGenerationKey(session.user.id));
			if (raw) try {
				const active = JSON.parse(raw);
				if (active.generationId === id) {
					setPhase("generating");
					setJobError("Connection interrupted while starting. Checking the existing job before allowing another submission…");
					await pollGeneration(active, runId);
					return;
				}
			} catch {}
			localStorage.removeItem(activeGenerationKey(session.user.id));
			setPhase("idle");
			toast.error(error instanceof Error ? error.message : "Generation failed to start");
		}
	};
	const canGenerate = Boolean(survivorImage && lovedOneImage) && !busy && !sessionPending;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-[1120px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "overflow-hidden rounded-[26px] border border-white/10 bg-[rgba(22,24,28,0.94)] shadow-[0_30px_90px_-30px_rgba(0,0,0,0.85)] backdrop-blur-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-0 lg:grid-cols-[0.9fr_1.1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-center border-b border-white/8 p-4 sm:p-5 lg:border-r lg:border-b-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("relative mx-auto max-h-[420px] w-full overflow-hidden rounded-2xl border border-white/10 bg-black", aspectRatio === "9:16" ? "aspect-[9/16]" : "aspect-video"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
							src: templateUrl,
							controls: true,
							muted: true,
							playsInline: true,
							preload: "metadata",
							className: "size-full object-contain",
							onError: () => {
								const fallback = getZombieHugPublicTemplatePath(aspectRatio);
								if (templateUrl !== fallback) setTemplateUrl(fallback);
							}
						}, templateUrl)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-4 sm:p-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonSlot, {
							title: "Survivor (@image1)",
							note: "Uninfected / gun holder. Clear front-facing photo of you.",
							item: survivorImage,
							inputRef: survivorInputRef,
							disabled: busy,
							onPick: (file) => setImageAt("survivor", file),
							onRemove: () => clearImageAt("survivor")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonSlot, {
							title: "Loved one (@image2)",
							note: "Infected then restored. Same person in early zombie / later human shots.",
							item: lovedOneImage,
							inputRef: lovedOneInputRef,
							disabled: busy,
							onPick: (file) => setImageAt("lovedOne", file),
							onRemove: () => clearImageAt("lovedOne")
						})]
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-white/8 p-4 sm:p-5",
				children: [
					creditError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
							className: "inline-flex h-8 shrink-0 items-center justify-center rounded-lg bg-[rgb(204,144,92)] px-3 text-xs font-semibold text-[rgb(247,246,243)] transition hover:brightness-105",
							children: "Buy credits"
						})]
					}) : null,
					jobError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-4 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/60",
						children: jobError
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex flex-wrap items-center gap-1.5 sm:gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							ref: settingsRef,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								"aria-expanded": settingsOpen,
								"aria-haspopup": "dialog",
								disabled: busy,
								onClick: () => setSettingsOpen((v) => !v),
								className: cn(chipClass, "gap-1", settingsOpen && "bg-[rgba(109,112,121,0.42)]"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-foreground/90 font-medium",
										children: resolution
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-white/35",
										children: "·"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-foreground/90 font-medium",
										children: aspectRatio
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDownIcon$1, { className: cn("ml-0.5 size-3.5 opacity-60 transition-transform duration-200", settingsOpen && "rotate-180") })
								]
							}), settingsOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingPanel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
									className: "p-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "Resolution" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptionRow, { children: ZOMBIE_HUG_RESOLUTIONS.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SegmentButton, {
										selected: resolution === n,
										onClick: () => setResolution(n),
										children: n
									}, n)) })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
									className: "p-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "Aspect ratio" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptionRow, { children: ZOMBIE_HUG_ASPECT_RATIOS.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SegmentButton, {
										selected: aspectRatio === n,
										onClick: () => setAspectRatio(n),
										children: n
									}, n)) })]
								})]
							}) }) : null]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ml-auto flex w-full items-center justify-end gap-2 sm:w-auto",
							children: [estimatedCredits != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex shrink-0 items-center gap-1 text-[12px] text-white/50 tabular-nums",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: genjutsu_estimate_credits({ count: estimatedCredits.toLocaleString() }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProvider, {
									delay: 200,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
										type: "button",
										className: "inline-flex size-4 items-center justify-center rounded-full text-current/70 transition-colors hover:text-current",
										"aria-label": genjutsu_estimate_help_aria(),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleHelp, {
											className: "size-3.5",
											"aria-hidden": true
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, {
										side: "top",
										align: "end",
										className: "max-w-[240px] text-left leading-snug",
										children: genjutsu_estimate_tooltip()
									})] })
								})]
							}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								disabled: !canGenerate,
								onClick: () => void generate(),
								className: cn("relative inline-flex h-8 flex-1 items-center justify-center rounded-lg px-3.5 text-sm font-semibold tracking-wide shadow-none transition-all duration-200 active:scale-95 sm:w-auto sm:flex-none", canGenerate ? "bg-[rgb(204,144,92)] text-[rgb(247,246,243)] hover:brightness-105" : "bg-[rgba(126,128,132,0.28)] text-[rgb(237,234,222)]/38"),
								children: busy ? "Generating…" : "Generate"
							})]
						})]
					})
				]
			})]
		}), resultUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 overflow-hidden rounded-[24px] border border-white/10 bg-[rgba(18,20,24,0.94)] p-3 shadow-2xl sm:p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center justify-between gap-3 px-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold text-white/90",
					children: "Your video"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 text-xs text-white/38",
					children: "Higgsfield Genjutsu · motion transfer"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: generationId ? `/api/genjutsu/result/${encodeURIComponent(generationId)}?download=1` : resultUrl,
					download: generationId ? `ai-zombie-hug-${generationId.slice(0, 8)}.mp4` : void 0,
					className: "inline-flex h-9 items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 text-xs font-medium text-white/70 transition hover:bg-white/10 hover:text-white",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), "Download"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				src: resultUrl,
				controls: true,
				autoPlay: true,
				playsInline: true,
				className: cn("mx-auto max-h-[720px] w-full max-w-full rounded-2xl bg-black object-contain", resultAspectRatio === "9:16" ? "aspect-[9/16]" : "aspect-video")
			})]
		}) : null]
	});
}
var FAQ_ITEMS = [
	{
		question: "What is the AI zombie hug trend?",
		answer: "A two-photo AI video format where someone you love appears as a zombie, you can't shoot them, and the gray scene hard-cuts to a warm memory of you holding each other."
	},
	{
		question: "How do I make an AI zombie hug video?",
		answer: "Upload one clear photo of yourself (the survivor) and one of your loved one, then generate. This page uses a fixed motion-transfer template so you get the cold standoff, lowered gun, and warm embrace in one clip — about 10 minutes."
	},
	{
		question: "What app is used for the zombie hug trend?",
		answer: "This page runs Higgsfield Genjutsu motion transfer with a fixed zombie hug template. Tutorials online also use Dreamina or CapCut (Seedance), Kling, and Google Flow (Veo)."
	},
	{
		question: "Is there a free way to do it?",
		answer: "You can preview the template and pick photos here before spending credits. Generation uses your Genjutsu AI balance. Dreamina, CapCut, and Kling also hand out free daily credits if you build the clips yourself."
	},
	{
		question: "Why does my zombie not look like my partner?",
		answer: "The face drifts when the model has too little to work with. Use a sharp, front-facing photo, keep makeup light around the eyes, and avoid sunglasses or group shots."
	},
	{
		question: "Can I do it with my dog or cat?",
		answer: "Yes, and it's one of the most popular versions. Keep the zombie details subtle and give the pet one recognizable item, like a collar tag."
	},
	{
		question: "How long is the video?",
		answer: "The clips that travel are 15–24 seconds, vertical 9:16, with the cut landing exactly where the zombie reaches you. This preset is about 24 seconds."
	},
	{
		question: "Is it okay to turn real people into zombies with AI?",
		answer: "Only with photos of people who agreed to it, or your own pet. Don't use strangers, celebrities or other people's kids, and label it as AI-generated where the platform asks."
	}
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
		name: "How to make an AI zombie hug video",
		totalTime: "PT10M",
		step: [
			{
				"@type": "HowToStep",
				position: 1,
				name: "Pick your two photos",
				text: "One clear front-facing photo of the person who turns, and one of yourself."
			},
			{
				"@type": "HowToStep",
				position: 2,
				name: "Generate with the zombie hug template",
				text: "Upload both photos on this page. The motion-transfer template already carries the cold standoff and warm memory beat."
			},
			{
				"@type": "HowToStep",
				position: 3,
				name: "Download and post",
				text: "Download the 9:16 MP4 and post to TikTok, Reels, or Shorts. Label it as AI where the platform asks."
			}
		]
	};
}
function graphJsonLd() {
	return {
		"@context": "https://schema.org",
		"@graph": [howToJsonLd(), faqJsonLd()]
	};
}
function JsonLd({ value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
		type: "application/ld+json",
		dangerouslySetInnerHTML: { __html: JSON.stringify(value) }
	});
}
function AiZombieHugPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background text-foreground flex min-h-screen flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonLd, { value: graphJsonLd() }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-x-0 top-0 z-[260]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mx-auto w-full max-w-7xl px-4 pt-20 pb-12 text-center sm:pt-24 md:px-5 md:pb-16",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-primary/20 bg-primary/10 text-primary mx-auto mb-4 flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WandSparkles, { className: "size-3.5" }), "AI zombie hug · Genjutsu motion transfer"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-foreground mx-auto max-w-4xl text-[34px] leading-[1.08] font-bold tracking-[-1.4px] sm:text-[44px] md:text-[56px]",
							children: "AI Zombie Hug: The Two-Photo Trend Where Nobody Pulls the Trigger"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground mx-auto mt-5 max-w-3xl text-base leading-7 sm:text-lg",
							children: "The AI zombie hug is a two-photo AI video trend: someone you love appears as a zombie, you raise a gun and can't fire it, they rush at you — and the cold gray scene hard-cuts to a warm memory of the two of you holding each other. It takes about 10 minutes to make and two clear photos to start."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							id: "generator",
							className: "mt-8 scroll-mt-24 text-left sm:mt-10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZombieHugGeneratorPanel, {})
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto w-full max-w-7xl flex-1 px-4 md:px-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						id: "zombie-hug-trend",
						className: "scroll-mt-24 py-14 md:py-20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto max-w-5xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-foreground text-3xl font-semibold tracking-tight sm:text-4xl",
								children: "What Is the AI Zombie Hug Trend?"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-muted-foreground mt-5 space-y-4 text-sm leading-7 sm:text-base",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
										"The zombie hug trend (also written ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "AI zombie hug" }),
										" or",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "zombie hug AI video" }),
										") is the emotional branch of the",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: "#ai-zombie-trend",
											className: "text-primary underline-offset-2 hover:underline",
											children: "AI zombie trend"
										}),
										". Instead of a jumpscare, it plays the same story in four beats:"
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
										className: "list-decimal space-y-3 pl-5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													className: "text-foreground/80",
													children: "The impossible choice"
												}),
												" ",
												"— a gun raised at someone you love, now a zombie."
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													className: "text-foreground/80",
													children: "Still you, underneath"
												}),
												" ",
												"— one detail you recognize: a necklace, a collar tag, cloudy eyes that still look like theirs."
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													className: "text-foreground/80",
													children: "An embrace, not an ending"
												}),
												" ",
												"— the gun comes down, your arms open, they run into them."
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													className: "text-foreground/80",
													children: "Back to your best day"
												}),
												" ",
												"— the instant they reach you, the scene hard-cuts to the two of you in warm light: laughing, holding on, alive."
											] })
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
										"That reversal is why it spread so fast. If you're looking for the broader format — friends, family, pets, all of it — see the",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: "#ai-zombie-trend",
											className: "text-primary underline-offset-2 hover:underline",
											children: "AI zombie trend"
										}),
										" ",
										"notes below."
									] })
								]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "py-14 md:py-20",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mx-auto max-w-3xl text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-primary text-xs font-semibold tracking-[0.18em] uppercase",
									children: "Three steps"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-foreground mt-3 text-3xl font-semibold tracking-tight sm:text-4xl",
									children: "How to Make an AI Zombie Hug Video"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-9 grid gap-4 md:grid-cols-3",
								children: [
									{
										icon: Images,
										title: "1. Pick your two photos",
										text: "One clear, front-facing photo of the person who turns (no sunglasses, no group shots) and one of yourself. A selfie is enough. The hug needs two faces: you lowering the gun, and the two of you in the memory."
									},
									{
										icon: Sparkles,
										title: "2. Generate on this page",
										text: "Upload both photos above. The zombie hug motion template is already loaded — Genjutsu motion transfer maps your faces onto the cold standoff and the warm embrace in one clip."
									},
									{
										icon: Film,
										title: "3. Download and post",
										text: "Keep it 9:16 for TikTok, Reels and Shorts. Label the video as AI where the platform asks."
									}
								].map((step) => {
									const Icon = step.icon;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "border-border/70 bg-card/95 rounded-2xl border p-5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "bg-primary/10 text-primary flex size-10 items-center justify-center rounded-xl",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "text-foreground mt-5 text-lg font-semibold",
												children: step.title
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-muted-foreground mt-2 text-sm leading-6",
												children: step.text
											})
										]
									}, step.title);
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-border/70 bg-card/60 mx-auto mt-12 max-w-3xl rounded-2xl border p-5 sm:p-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-foreground text-lg font-semibold",
										children: "Copy-paste prompts"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-muted-foreground mt-2 text-sm leading-6",
										children: "Building the cold and warm beats yourself in CapCut or Dreamina? Use the same pose in both so the cut lands. This page skips that step — the template already carries both beats."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-muted-foreground mt-5 space-y-4 text-sm leading-6",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-foreground/85 font-medium",
											children: "Cold beat"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", {
											className: "border-border/60 bg-background/50 mt-2 rounded-xl border p-4",
											children: "Cinematic 9:16 shot, rainy empty city street at dusk. A young woman with pale gray skin, clouded eyes and a thin streak of dried blood on her cheek stands six meters away, breathing hard. In the foreground, a man's hands shake as he raises a pistol, then slowly lowers it. She screams and charges toward him. Desaturated blue-gray grade, shallow depth of field, film grain, 24 fps."
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-foreground/85 font-medium",
											children: "Warm beat (same pose)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", {
											className: "border-border/60 bg-background/50 mt-2 rounded-xl border p-4",
											children: "Cinematic 9:16 shot, golden sunset beach. The same young woman, alive and healthy, laughing as she runs into the man's open arms. He lifts her off the ground. Warm golden grade, soft lens flare, film grain, 24 fps."
										})] })]
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "py-14 md:py-20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-foreground text-3xl font-semibold tracking-tight sm:text-4xl",
							children: "Photos That Decide Whether It Works"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "border-border/70 mt-7 overflow-x-auto rounded-2xl border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full min-w-[560px] border-collapse text-left text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
									className: "bg-card text-foreground/80",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3 font-semibold",
										children: "What you need"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3 font-semibold",
										children: "Why it matters"
									})] })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
									className: "text-muted-foreground divide-border/60 divide-y",
									children: [
										["One clear, front-facing face", "The model has too little reference otherwise, and the face drifts between the two clips"],
										["Good even light", "Dark or backlit photos come back with a different person"],
										["One recognizable detail", "The necklace, the collar tag, the scar — that's the moment the gun goes down"],
										["No kids, no public figures", "Only people who agreed to it; label the video as AI where the platform asks"]
									].map(([need, why]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "text-foreground/80 px-4 py-3 font-medium",
										children: need
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3",
										children: why
									})] }, need))
								})]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "py-14 md:py-20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-foreground text-3xl font-semibold tracking-tight sm:text-4xl",
							children: "Three Versions People Are Making"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-7 grid gap-3 md:grid-cols-3",
							children: [
								["The couple version", "The original. Her photo plus his selfie, ending in the beach memory."],
								["The pet version", "A dog or cat runs into open arms instead of a person. Keep the zombie details subtle (cloudy eyes, matted fur) and give the pet one recognizable item, like a collar tag."],
								["The family version", "A parent you'd never shoot. This one lands hardest with people doing it as a memory, so keep the zombie makeup light around the eyes and mouth."]
							].map(([title, text]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-border/70 bg-card/95 rounded-2xl border p-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-foreground font-semibold",
									children: title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground mt-2 text-sm leading-6",
									children: text
								})]
							}, title))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						id: "ai-zombie-trend",
						className: "scroll-mt-24 py-14 md:py-20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto max-w-5xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-foreground text-3xl font-semibold tracking-tight sm:text-4xl",
								children: "AI Zombie Hug vs. AI Zombie Trend: What's the Difference?"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-muted-foreground mt-5 text-sm leading-7 sm:text-base",
								children: [
									"The AI zombie trend is the whole format — any loved one, any ending. The AI zombie hug is the version where the gun goes down and the story resolves in an embrace. Same engine, same two photos, one different beat. For more motion-transfer workflows beyond this preset, see",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
										href: "/",
										className: "text-primary underline-offset-2 hover:underline",
										children: "Genjutsu motion transfer"
									}),
									"."
								]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "py-14 md:py-20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-foreground text-3xl font-semibold tracking-tight sm:text-4xl",
							children: "FAQ"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "border-border/70 bg-card/60 divide-border/60 mt-7 divide-y rounded-2xl border px-5 sm:px-7",
							children: FAQ_ITEMS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
								className: "group py-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
									className: "text-foreground/85 cursor-pointer list-none pr-6 text-sm font-semibold sm:text-base",
									children: item.question
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground mt-3 max-w-3xl text-sm leading-7",
									children: item.answer
								})]
							}, item.question))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "pb-20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-border/70 bg-card/60 rounded-[26px] border p-6 text-center sm:p-10",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "text-muted-foreground mx-auto mb-5 flex max-w-xl flex-col gap-2 text-left text-sm",
									children: [
										"Two clear photos decide likeness more than the prompt",
										"The lowered gun is the emotional beat — keep one fixed detail",
										"9:16 travels farthest on TikTok, Reels, and Shorts"
									].map((tip) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "text-primary mt-0.5 size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: tip })]
									}, tip))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-foreground text-2xl font-semibold tracking-tight sm:text-3xl",
									children: "Your story starts here"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground mx-auto mt-3 max-w-2xl text-sm leading-7",
									children: "Upload two photos and get the cold standoff, the lowered gun and the warm embrace in one clip."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#generator",
									className: "mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-[rgb(204,144,92)] px-6 text-sm font-semibold text-[rgb(247,246,243)] transition hover:brightness-105",
									children: "Generate"
								})
							]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { AiZombieHugPage as component };
