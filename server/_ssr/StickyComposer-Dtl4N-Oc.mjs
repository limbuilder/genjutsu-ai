import { o as __toESM } from "../_runtime.mjs";
import { a as AccordionHeader, at as require_jsx_runtime, i as AccordionTrigger$1, nt as require_react_dom, o as AccordionItem$1, ot as require_react, r as AccordionPanel, s as AccordionRoot } from "../_libs/@base-ui/react+[...].mjs";
import { Ac as genjutsu_safety_upload_hint, Cc as genjutsu_credits_view_packs, Dc as genjutsu_estimate_seedance_tooltip, Ec as genjutsu_estimate_help_aria, Oc as genjutsu_estimate_tooltip, Sc as genjutsu_credits_required, Tc as genjutsu_estimate_credits, _c as genjutsu_credits_maybe_later, bc as genjutsu_credits_no_single_pack, fc as genjutsu_credits_balance, gc as genjutsu_credits_insufficient_title, hc as genjutsu_credits_insufficient_description, kc as genjutsu_safety_face_rejected, mc as genjutsu_credits_checkout_failed, pc as genjutsu_credits_buy_pack, vc as genjutsu_credits_need_label, wc as genjutsu_error_provider_failed, xc as genjutsu_credits_opening_checkout, yc as genjutsu_credits_need_more } from "./messages-B_Y80loh.mjs";
import { o as envConfigs } from "./schema-DWa8-2WU.mjs";
import { n as usePathname, r as useRouter$1 } from "./navigation-BgznuAML.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { n as FAQ_ITEMS } from "./content-aeUTqH7Y.mjs";
import { v as useSession } from "./client-xUgmZoCV.mjs";
import { c as collectUploadDiagnostics, d as uploadToSignedUrl, i as apiGet, n as SignedUploadError, o as apiPost, t as ApiError } from "./api-client-BXIVLJCS.mjs";
import { It as ChevronDown, Lt as Check, Nt as ChevronUp, V as Mic, Vt as ArrowUp, jt as CircleHelp, k as Plus } from "../_libs/lucide-react.mjs";
import { t as useUserCredits } from "./use-user-credits-B5TISbhc.mjs";
import { a as ImageModeIcon, c as ObjectsSwapIcon, l as PlusIcon, n as CloseIcon, r as FilmIcon, s as MotionTransferIcon, t as ChevronDownIcon$1 } from "./site-user-menu-C3Ao0HTQ.mjs";
import { s as estimateGenjutsuCreditsForProvider, t as GENJUTSU_CREDIT_PACKS, u as getSmallestSufficientCreditPack } from "./pricing-C70Iy5jq.mjs";
import { i as TooltipTrigger, n as TooltipContent, r as TooltipProvider, t as Tooltip$1 } from "./tooltip-gxwNe4KH.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog$1 } from "./dialog-B11F4Fxp.mjs";
import { t as usePublicConfig } from "./use-public-config-6tm3ISeI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/StickyComposer-Dtl4N-Oc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
function Accordion$1({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionRoot, {
		"data-slot": "accordion",
		className: cn("flex w-full flex-col", className),
		...props
	});
}
function AccordionItem({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionItem$1, {
		"data-slot": "accordion-item",
		className: cn("not-last:border-b", className),
		...props
	});
}
function AccordionTrigger({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionHeader, {
		className: "flex",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionTrigger$1, {
			"data-slot": "accordion-trigger",
			className: cn("group/accordion-trigger relative flex flex-1 items-start justify-between rounded-lg border border-transparent py-2.5 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:after:border-ring aria-disabled:pointer-events-none aria-disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-muted-foreground", className),
			...props,
			children: [
				children,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
					"data-slot": "accordion-trigger-icon",
					className: "pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, {
					"data-slot": "accordion-trigger-icon",
					className: "pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline"
				})
			]
		})
	});
}
function AccordionContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionPanel, {
		"data-slot": "accordion-content",
		className: "overflow-hidden text-sm data-open:animate-accordion-down data-closed:animate-accordion-up",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("h-(--accordion-panel-height) pt-0 pb-2.5 data-ending-style:h-0 data-starting-style:h-0 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4", className),
			children
		})
	});
}
function FaqSection({ items = FAQ_ITEMS, title = "Frequently Asked Questions", className, description }) {
	const supportEmail = envConfigs.app_support_email;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "faq",
		className: cn("py-16", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container mx-auto px-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("inline-flex items-center rounded-full border border-transparent", "bg-primary text-primary-foreground px-2.5 py-0.5 text-xs font-medium", "hover:bg-primary/80"),
						children: "FAQ"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-foreground mt-4 text-3xl font-bold tracking-tight sm:text-4xl",
						children: title
					}),
					description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-foreground/70 mx-auto mt-6 max-w-2xl text-base font-medium",
						children: description
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-foreground/70 mt-6 text-base font-medium",
						children: [
							"Have another question? Contact us at",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: `mailto:${supportEmail}`,
								className: "text-primary underline-offset-2 hover:underline",
								children: supportEmail
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion$1, {
				multiple: true,
				className: "mx-auto mt-14 grid gap-8 md:grid-cols-2 md:gap-12",
				children: items.map((item, index) => {
					const value = `faq-${index + 1}`;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionItem, {
						value,
						className: "border-none not-last:border-b-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("mt-2.5 flex size-6 shrink-0 items-center justify-center", "border-primary text-primary rounded-sm border font-mono text-xs"),
								children: index + 1
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
									className: cn("cursor-pointer items-center py-2 hover:no-underline", "text-foreground text-left text-xl font-bold"),
									children: item.question
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
									className: "text-foreground/70 pb-0 text-base leading-relaxed",
									children: item.answer
								})]
							})]
						})
					}, value);
				})
			})]
		})
	});
}
var RESOLUTIONS = [
	"480p",
	"720p",
	"1080p"
];
var MODE_OPTIONS = [{
	id: "motion-transfer",
	label: "Motion transfer",
	icon: MotionTransferIcon
}, {
	id: "objects-swap",
	label: "Objects swap",
	icon: ObjectsSwapIcon
}];
var chipClass = "inline-flex h-7 max-w-full min-w-0 shrink-0 items-center gap-1 rounded-lg border border-transparent bg-[rgba(94,96,104,0.3)] px-2 text-[12px] font-medium text-secondary-foreground/88 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-2xl transition-all duration-200 hover:bg-[rgba(109,112,121,0.36)]";
var selectedOptionClass = "border-transparent bg-[rgba(120,87,60,0.9)] text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.045)]";
var idleOptionClass = "border-transparent bg-transparent text-foreground/68 hover:bg-[rgba(98,71,51,0.28)] hover:text-foreground/88";
function createMediaItem(file) {
	return {
		id: `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2, 8)}`,
		file,
		url: URL.createObjectURL(file)
	};
}
var IMAGE_MAX = 8;
var MAX_SOURCE_VIDEO_BYTES = 200 * 1024 * 1024;
var MAX_REFERENCE_IMAGE_BYTES = 12 * 1024 * 1024;
var MIN_SOURCE_VIDEO_SECONDS = 4;
var MAX_SOURCE_VIDEO_SECONDS = 30;
function revokeItem(item) {
	if (item) URL.revokeObjectURL(item.url);
}
function revokeAll(items) {
	for (const item of items) URL.revokeObjectURL(item.url);
}
/** Read duration from a local video File via browser metadata. */
function readLocalVideoDurationSeconds(file) {
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
function ModeToggle({ mode, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "tablist",
		"aria-label": "Genjutsu mode",
		className: "inline-flex w-full max-w-full items-center gap-0.5 rounded-xl border border-white/8 bg-[rgba(28,22,18,0.92)] p-1 sm:w-auto",
		children: MODE_OPTIONS.map((opt) => {
			const selected = mode === opt.id;
			const Icon = opt.icon;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				role: "tab",
				"aria-selected": selected,
				onClick: () => onChange(opt.id),
				className: cn("inline-flex h-8 flex-1 items-center justify-center gap-1.5 rounded-[10px] px-3 text-[12px] font-medium whitespace-nowrap transition-all duration-200 sm:flex-none sm:px-3.5", selected ? "bg-[rgba(72,58,48,0.95)] text-[rgb(237,234,222)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] ring-1 ring-white/10" : "bg-transparent text-[rgb(168,157,151)] hover:text-[rgb(220,214,204)]"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5 shrink-0" }), opt.label]
			}, opt.id);
		})
	});
}
function useDragHighlight() {
	const [dragging, setDragging] = (0, import_react.useState)(false);
	const onDragOver = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setDragging(true);
	};
	const onDragLeave = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setDragging(false);
	};
	return {
		dragging,
		setDragging,
		onDragOver,
		onDragLeave
	};
}
function MediaLightbox({ item, kind, onClose }) {
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", onKey);
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			window.removeEventListener("keydown", onKey);
			document.body.style.overflow = prev;
		};
	}, [onClose]);
	if (typeof document === "undefined") return null;
	return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-[400] flex items-center justify-center p-4 sm:p-8",
		role: "dialog",
		"aria-modal": "true",
		"aria-label": kind === "video" ? "Video preview" : "Image preview",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-label": "Close preview",
			className: "absolute inset-0 bg-black/75 backdrop-blur-sm",
			onClick: onClose
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative z-10 max-h-[88vh] max-w-[min(92vw,760px)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-label": "Close",
				onClick: onClose,
				className: "absolute -top-3 -right-3 z-20 flex size-8 items-center justify-center rounded-full border border-white/15 bg-[rgba(41,30,23,0.95)] text-[rgb(237,234,222)] shadow-lg hover:bg-[rgba(60,44,34,0.98)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseIcon, { className: "size-4" })
			}), kind === "video" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				src: item.url,
				controls: true,
				className: "max-h-[88vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: item.url,
				alt: item.file.name,
				className: "max-h-[88vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
			})]
		})]
	}), document.body);
}
function EmptyUploadButton({ title, hint, icon, dragging, onClick, ariaLabel }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		"aria-label": ariaLabel,
		className: "relative block h-[96px] w-[148px] focus:ring-0 focus:outline-none sm:w-[168px]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: cn("border-primary/35 bg-primary/5 hover:border-primary/45 absolute inset-0 flex flex-col items-center justify-center gap-1 border-2 border-dashed px-2 text-[rgb(204,144,92)] shadow-[0_22px_54px_-40px_rgba(0,0,0,0.85)] transition-all duration-200 hover:-translate-y-1", dragging && "border-primary/55 bg-primary/10 -translate-y-1"),
			children: [
				icon,
				title ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-foreground/78 text-center text-[10px] leading-snug font-medium",
					children: title
				}) : null,
				hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-foreground/44 text-center text-[9px] leading-tight",
					children: hint
				}) : null
			]
		})
	});
}
function VideoUploadSlot({ item, onChange }) {
	const inputRef = (0, import_react.useRef)(null);
	const [previewOpen, setPreviewOpen] = (0, import_react.useState)(false);
	const { dragging, setDragging, onDragOver, onDragLeave } = useDragHighlight();
	const takeFile = (0, import_react.useCallback)((list) => {
		if (!list || list.length === 0) return;
		const file = Array.from(list).find((f) => f.type.startsWith("video/"));
		if (!file) return;
		if (file.size <= 0 || file.size > MAX_SOURCE_VIDEO_BYTES) {
			toast.error("Source video must be 200 MB or smaller");
			return;
		}
		(async () => {
			try {
				const durationSeconds = await readLocalVideoDurationSeconds(file);
				if (durationSeconds < MIN_SOURCE_VIDEO_SECONDS || durationSeconds > MAX_SOURCE_VIDEO_SECONDS) {
					toast.error(`Source video must be ${MIN_SOURCE_VIDEO_SECONDS}–${MAX_SOURCE_VIDEO_SECONDS} seconds (got ${durationSeconds.toFixed(1)}s)`);
					return;
				}
				revokeItem(item);
				onChange({
					...createMediaItem(file),
					durationSeconds
				});
			} catch {
				toast.error("Could not read video duration. Please use an MP4/MOV between 4 and 30 seconds.");
			}
		})();
	}, [item, onChange]);
	const clear = () => {
		revokeItem(item);
		onChange(null);
		setPreviewOpen(false);
		if (inputRef.current) inputRef.current.value = "";
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative shrink-0",
		onDragOver,
		onDragLeave,
		onDrop: (e) => {
			e.preventDefault();
			e.stopPropagation();
			setDragging(false);
			takeFile(e.dataTransfer.files);
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			ref: inputRef,
			type: "file",
			className: "hidden",
			accept: "video/*",
			"aria-label": "Add a reference video to edit",
			onChange: (e) => {
				takeFile(e.target.files);
				e.target.value = "";
			}
		}), item ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => setPreviewOpen(true),
			"aria-label": "Preview reference video",
			className: "group relative block h-[96px] w-[68px] overflow-hidden rounded-[4px] border border-[rgba(204,144,92,0.35)] shadow-[0_10px_28px_-12px_rgba(0,0,0,0.75)] focus:outline-none",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
					src: item.url,
					muted: true,
					playsInline: true,
					className: "h-full w-full object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute inset-x-0 bottom-0 bg-black/55 px-1 py-0.5 text-[9px] font-medium text-white/90",
					children: "Video"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					role: "button",
					tabIndex: 0,
					"aria-label": "Remove reference video",
					onClick: (e) => {
						e.stopPropagation();
						e.preventDefault();
						clear();
					},
					onKeyDown: (e) => {
						if (e.key === "Enter" || e.key === " ") {
							e.stopPropagation();
							e.preventDefault();
							clear();
						}
					},
					className: "absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full border border-[rgba(204,144,92,0.35)] bg-[rgba(41,30,23,0.92)] text-[rgb(204,144,92)] opacity-0 shadow-md transition-opacity group-hover:opacity-100",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseIcon, { className: "size-3" })
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyUploadButton, {
			title: "Add a reference video to edit",
			hint: "4–30s",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilmIcon, { className: "text-primary/78 size-5 shrink-0" }),
			dragging,
			onClick: () => inputRef.current?.click(),
			ariaLabel: "Add a reference video to edit"
		})]
	}), previewOpen && item ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaLightbox, {
		item,
		kind: "video",
		onClose: () => setPreviewOpen(false)
	}) : null] });
}
function isLikenessRejectionMessage(message) {
	return /images and videos cannot contain real people|likenesses of real people|real people|real person|private information that cannot be processed|human face|真人|肖像/i.test(message);
}
function isProviderFailedMessage(message) {
	return /generation failed\. please try again later/i.test(message);
}
function generationFailureUiMessage(error, errorCode) {
	if (errorCode === "PROVIDER_LIKENESS_REJECTED" || error && isLikenessRejectionMessage(error)) return genjutsu_safety_face_rejected();
	if (errorCode === "PROVIDER_FAILED" || error && isProviderFailedMessage(error)) return genjutsu_error_provider_failed();
	return error || "";
}
function providerSubmitUiMessage(cause) {
	const code = cause instanceof ApiError && cause.data && typeof cause.data === "object" && "code" in cause.data ? String(cause.data.code) : "";
	const message = cause instanceof ApiError ? cause.message : cause instanceof Error ? cause.message : typeof cause === "string" ? cause : "";
	if (code === "PROVIDER_LIKENESS_REJECTED" || isLikenessRejectionMessage(message)) return genjutsu_safety_face_rejected();
	if (code === "PROVIDER_FAILED" || isProviderFailedMessage(message)) return genjutsu_error_provider_failed();
	return message;
}
function classifyUploadFailure(cause) {
	if (cause instanceof SignedUploadError) {
		if (cause.httpStatus != null) return {
			errorCode: "UPLOAD_HTTP_ERROR",
			httpStatus: cause.httpStatus,
			diagnostics: cause.diagnostics
		};
		if (cause.cause instanceof Error && cause.cause.name === "AbortError") return {
			errorCode: "UPLOAD_ABORTED",
			httpStatus: null,
			diagnostics: cause.diagnostics
		};
		return {
			errorCode: "UPLOAD_NETWORK_ERROR",
			httpStatus: null,
			diagnostics: cause.diagnostics
		};
	}
	if (cause instanceof ApiError && Number.isInteger(cause.code) && cause.code >= 400 && cause.code <= 599) return {
		errorCode: "UPLOAD_HTTP_ERROR",
		httpStatus: cause.code,
		diagnostics: null
	};
	if (cause instanceof Error && cause.name === "AbortError") return {
		errorCode: "UPLOAD_ABORTED",
		httpStatus: null,
		diagnostics: null
	};
	return {
		errorCode: "UPLOAD_NETWORK_ERROR",
		httpStatus: null,
		diagnostics: null
	};
}
async function reportUploadFailure(params) {
	const failure = classifyUploadFailure(params.cause);
	return apiPost("/api/genjutsu/attempt-failure", {
		generationId: params.generationId,
		fileIndex: params.fileIndex,
		errorCode: failure.errorCode,
		httpStatus: failure.httpStatus,
		diagnostics: failure.diagnostics
	});
}
async function reportUploadRetrySucceeded(params) {
	return apiPost("/api/genjutsu/attempt-failure", {
		generationId: params.generationId,
		fileIndex: params.fileIndex,
		event: "retry_succeeded",
		diagnostics: collectUploadDiagnostics({
			attemptCount: params.attemptCount,
			uploadElapsedMs: params.uploadElapsedMs
		})
	});
}
function redirectToSignIn() {
	const callbackUrl = encodeURIComponent(`${window.location.pathname}${window.location.search}`);
	window.location.href = `/sign-in?callbackUrl=${callbackUrl}`;
}
function ImageUploadSlot({ items, onChange, signedIn }) {
	const inputRef = (0, import_react.useRef)(null);
	const [previewId, setPreviewId] = (0, import_react.useState)(null);
	const { dragging, setDragging, onDragOver, onDragLeave } = useDragHighlight();
	const previewItem = items.find((i) => i.id === previewId) ?? null;
	const canAdd = items.length < IMAGE_MAX;
	const openPicker = (0, import_react.useCallback)(() => {
		if (!signedIn) {
			redirectToSignIn();
			return;
		}
		inputRef.current?.click();
	}, [signedIn]);
	const mergeFiles = (0, import_react.useCallback)((list) => {
		if (!list || list.length === 0) return;
		if (!signedIn) {
			redirectToSignIn();
			return;
		}
		const incoming = Array.from(list).filter((f) => f.type.startsWith("image/"));
		if (incoming.length === 0) return;
		const room = IMAGE_MAX - items.length;
		if (room <= 0) return;
		const accepted = incoming.slice(0, room).filter((file) => {
			if (file.size <= 0 || file.size > MAX_REFERENCE_IMAGE_BYTES) {
				toast.error(`"${file.name}" must be 12 MB or smaller`);
				return false;
			}
			return true;
		}).map((file) => createMediaItem(file));
		if (accepted.length > 0) onChange([...items, ...accepted]);
	}, [
		items,
		onChange,
		signedIn
	]);
	const removeAt = (id) => {
		const target = items.find((i) => i.id === id);
		if (target) URL.revokeObjectURL(target.url);
		onChange(items.filter((i) => i.id !== id));
		if (previewId === id) setPreviewId(null);
		if (inputRef.current) inputRef.current.value = "";
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex shrink-0 flex-wrap gap-2",
		onDragOver,
		onDragLeave,
		onDrop: (e) => {
			e.preventDefault();
			e.stopPropagation();
			setDragging(false);
			mergeFiles(e.dataTransfer.files);
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: inputRef,
				type: "file",
				className: "hidden",
				accept: "image/*",
				multiple: true,
				"aria-label": "Add products, clothes, objects, or scenes",
				onChange: (e) => {
					mergeFiles(e.target.files);
					e.target.value = "";
				}
			}),
			items.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setPreviewId(item.id),
				"aria-label": `Preview Reference ${index + 1}: ${item.file.name}`,
				className: "group relative block h-[96px] w-[68px] overflow-hidden rounded-[4px] border border-[rgba(204,144,92,0.35)] shadow-[0_10px_28px_-12px_rgba(0,0,0,0.75)] focus:outline-none",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: item.url,
						alt: item.file.name,
						className: "h-full w-full object-cover",
						draggable: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "absolute inset-x-0 bottom-0 bg-black/60 px-1 py-0.5 text-center text-[8px] font-medium text-white/90",
						children: ["Reference ", index + 1]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						role: "button",
						tabIndex: 0,
						"aria-label": "Remove image",
						onClick: (e) => {
							e.stopPropagation();
							e.preventDefault();
							removeAt(item.id);
						},
						onKeyDown: (e) => {
							if (e.key === "Enter" || e.key === " ") {
								e.stopPropagation();
								e.preventDefault();
								removeAt(item.id);
							}
						},
						className: "absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full border border-[rgba(204,144,92,0.35)] bg-[rgba(41,30,23,0.92)] text-[rgb(204,144,92)] opacity-0 shadow-md transition-opacity group-hover:opacity-100",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseIcon, { className: "size-3" })
					})
				]
			}, item.id)),
			items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyUploadButton, {
				title: "Add products, clothes, objects, or scenes",
				hint: genjutsu_safety_upload_hint(),
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageModeIcon, { className: "text-primary/78 size-5 shrink-0" }),
				dragging,
				onClick: openPicker,
				ariaLabel: "Add products, clothes, objects, or scenes"
			}) : canAdd ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: openPicker,
				"aria-label": "Add more images",
				className: "relative block h-[96px] w-[68px] focus:ring-0 focus:outline-none",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: cn("border-primary/35 bg-primary/5 hover:border-primary/45 absolute inset-0 flex flex-col items-center justify-center gap-1 border-2 border-dashed text-[rgb(204,144,92)] transition-all duration-200", dragging && "border-primary/55 bg-primary/10"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlusIcon, { className: "text-primary/78 size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-foreground/44 text-[9px] leading-tight",
						children: [
							items.length,
							"/",
							IMAGE_MAX
						]
					})]
				})
			}) : null
		]
	}), previewItem ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaLightbox, {
		item: previewItem,
		kind: "image",
		onClose: () => setPreviewId(null)
	}) : null] });
}
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
function ResolutionPanel({ resolution, onResolution }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "p-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "Resolution" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptionRow, { children: RESOLUTIONS.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SegmentButton, {
				selected: resolution === n,
				onClick: () => onResolution(n),
				children: n
			}, n)) })]
		})
	});
}
var sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
var activeGenerationKey = (userId) => `genjutsu_active_generation:${userId}`;
function formatCreditPackPrice(pack) {
	return new Intl.NumberFormat(void 0, {
		style: "currency",
		currency: (pack.currency || "usd").toUpperCase()
	}).format(pack.priceCents / 100);
}
function InsufficientCreditsModal({ gate, pack, checkoutLoading, onClose, onBuy }) {
	if (!gate) return null;
	const deficit = Math.max(0, gate.requiredCredits - gate.balance);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
		open: Boolean(gate),
		onOpenChange: (open) => {
			if (!open && !checkoutLoading) onClose();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			showCloseButton: !checkoutLoading,
			overlayClassName: "z-[490] bg-black/75 backdrop-blur-sm",
			className: "z-[500] w-full max-w-[420px] gap-0 rounded-2xl border border-white/10 bg-[rgb(31,24,20)] p-5 text-[rgb(237,234,222)] shadow-2xl sm:max-w-[420px] sm:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
					className: "gap-1.5 pr-8 text-left",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "text-lg font-semibold tracking-tight",
						children: genjutsu_credits_insufficient_title()
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						className: "text-sm leading-6 text-white/55",
						children: genjutsu_credits_insufficient_description({ count: gate.requiredCredits.toLocaleString() })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 rounded-xl border border-white/8 bg-black/15 px-4 py-3 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between py-1 text-white/58",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: genjutsu_credits_balance() }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums",
								children: gate.balance.toLocaleString()
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between py-1 text-white/58",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: genjutsu_credits_required() }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums",
								children: gate.requiredCredits.toLocaleString()
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-2 h-px bg-white/8" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between py-1 font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: genjutsu_credits_need_label() }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[rgb(220,155,99)] tabular-nums",
								children: genjutsu_credits_need_more({ count: deficit.toLocaleString() })
							})]
						})
					]
				}),
				!pack ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-xs leading-5 text-white/50",
					children: genjutsu_credits_no_single_pack({ count: deficit.toLocaleString() })
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: checkoutLoading,
					onClick: onBuy,
					className: "mt-5 inline-flex h-10 w-full items-center justify-center rounded-xl bg-[rgb(204,144,92)] px-4 text-sm font-semibold text-[rgb(247,246,243)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-55",
					children: checkoutLoading ? genjutsu_credits_opening_checkout() : pack ? genjutsu_credits_buy_pack({
						count: pack.credits.toLocaleString(),
						price: formatCreditPackPrice(pack)
					}) : genjutsu_credits_view_packs()
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: checkoutLoading,
					onClick: onClose,
					className: "mt-2 inline-flex h-9 w-full items-center justify-center rounded-lg text-sm text-white/45 transition-colors hover:bg-white/5 hover:text-white/70 disabled:pointer-events-none disabled:opacity-40",
					children: genjutsu_credits_maybe_later()
				})
			]
		})
	});
}
function ResultPanel({ status, result, onDismiss }) {
	if (status === "idle") return null;
	const modeLabel = result?.mode === "objects-swap" ? "Objects swap" : "Motion transfer";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		id: "generation-result",
		className: "mt-4 scroll-mt-24 overflow-hidden rounded-xl border border-white/8 bg-[rgba(41,30,23,0.92)] shadow-[0_24px_64px_-40px_rgba(0,0,0,0.68)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3 border-b border-white/8 px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-[rgb(237,234,222)]",
						children: status === "generating" ? "Generating…" : "Result"
					}), result ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-0.5 truncate text-[11px] text-white/45",
						children: [
							modeLabel,
							" · ",
							result.resolution,
							" · ",
							result.imageCount,
							" reference",
							result.imageCount === 1 ? "" : "s",
							result.reservedCredits ? ` · ${result.reservedCredits} credits` : "",
							result.prompt ? ` · ${result.prompt}` : ""
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 text-[11px] text-white/45",
						children: "Uploading references and starting generation…"
					})]
				}), status === "done" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": "Dismiss result",
					onClick: onDismiss,
					className: "inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-white/45 hover:bg-white/8 hover:text-white",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseIcon, { className: "size-4" })
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative flex min-h-[220px] items-center justify-center bg-black/35 p-3 sm:min-h-[320px] sm:p-4",
				children: status === "generating" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center gap-3 py-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "border-primary size-9 animate-spin rounded-full border-2 border-t-transparent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-white/55",
						children: [
							"Uploading references and running Genjutsu (",
							result?.resolution ?? "…",
							")…"
						]
					})]
				}) : result ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
					src: result.previewUrl,
					controls: true,
					playsInline: true,
					className: "max-h-[min(70vh,520px)] w-full rounded-lg object-contain"
				}, result.id) : null
			}),
			status === "done" && result ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2 border-t border-white/8 px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: result.previewUrl,
					download: `genjutsu-${result.mode}-${result.resolution}.mp4`,
					className: "inline-flex h-8 items-center rounded-lg bg-[rgb(204,144,92)] px-3 text-sm font-semibold text-[rgb(247,246,243)] hover:brightness-105",
					children: "Download"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[11px] text-white/40",
					children: "Generated with Genjutsu AI"
				})]
			}) : null
		]
	});
}
function GeneratorPanel({ mode: modeProp, className, hidePromo: _hidePromo = false, onModeChange }) {
	const { data: session } = useSession();
	const creditsQuery = useUserCredits(Boolean(session?.user));
	const { data: publicConfig } = usePublicConfig();
	const [internalMode, setInternalMode] = (0, import_react.useState)("motion-transfer");
	const mode = modeProp ?? internalMode;
	const setMode = (next) => {
		if (onModeChange) onModeChange(next);
		if (modeProp === void 0) setInternalMode(next);
	};
	const [prompt, setPrompt] = (0, import_react.useState)("");
	const [settingsOpen, setSettingsOpen] = (0, import_react.useState)(false);
	const [resolution, setResolution] = (0, import_react.useState)("720p");
	const [video, setVideo] = (0, import_react.useState)(null);
	const [images, setImages] = (0, import_react.useState)([]);
	const [status, setStatus] = (0, import_react.useState)("idle");
	const [result, setResult] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	const [creditGate, setCreditGate] = (0, import_react.useState)(null);
	const [checkoutLoading, setCheckoutLoading] = (0, import_react.useState)(false);
	const settingsRef = (0, import_react.useRef)(null);
	const generationRunRef = (0, import_react.useRef)(0);
	(0, import_react.useEffect)(() => {
		setSettingsOpen(false);
	}, [mode]);
	(0, import_react.useEffect)(() => {
		if (!session?.user) return;
		const refreshCredits = () => {
			creditsQuery.refetch();
		};
		window.addEventListener("focus", refreshCredits);
		return () => window.removeEventListener("focus", refreshCredits);
	}, [creditsQuery.refetch, session?.user]);
	(0, import_react.useEffect)(() => {
		const balance = creditsQuery.data?.balance;
		if (!creditGate || typeof balance !== "number") return;
		if (balance >= creditGate.requiredCredits) {
			setCreditGate(null);
			return;
		}
		if (balance !== creditGate.balance) setCreditGate((current) => current ? {
			...current,
			balance
		} : current);
	}, [creditGate, creditsQuery.data?.balance]);
	(0, import_react.useEffect)(() => {
		return () => {
			generationRunRef.current += 1;
			revokeItem(video);
			revokeAll(images);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (!settingsOpen) return;
		const onPointerDown = (e) => {
			if (!settingsRef.current?.contains(e.target)) setSettingsOpen(false);
		};
		const onKey = (e) => {
			if (e.key === "Escape") setSettingsOpen(false);
		};
		document.addEventListener("pointerdown", onPointerDown);
		window.addEventListener("keydown", onKey);
		return () => {
			document.removeEventListener("pointerdown", onPointerDown);
			window.removeEventListener("keydown", onKey);
		};
	}, [settingsOpen]);
	const placeholder = mode === "objects-swap" ? images.length > 1 ? "e.g. Replace the man with @Image1 and the phone with @Image2 (optional)..." : "Describe what to swap. Use @Video1 / @Image1 to reference assets (optional)..." : images.length > 1 ? "e.g. Use @Image1 for the main character and @Image2 for the outfit (optional)..." : "Describe the new scene, style, product, or object. Use @Video1 / @Image1 to reference assets (optional)...";
	const pollGeneration = (0, import_react.useCallback)(async (active, runId) => {
		let delayMs = 1500;
		let notFoundCount = 0;
		for (let attempt = 0; attempt < 364; attempt += 1) {
			await sleep(delayMs);
			if (generationRunRef.current !== runId) return;
			let polled;
			try {
				polled = await apiGet(`/api/genjutsu/status?generationId=${encodeURIComponent(active.generationId)}`);
			} catch (cause) {
				if ((cause instanceof ApiError && cause.data && typeof cause.data === "object" ? cause.data : null)?.code === "GENERATION_NOT_FOUND") {
					notFoundCount += 1;
					if (notFoundCount >= 15) {
						localStorage.removeItem(activeGenerationKey(active.userId));
						setStatus("idle");
						setResult(null);
						setError("Generation was not accepted by the server. No active paid job was found.");
						return;
					}
				}
				delayMs = Math.min(5e3, Math.ceil(delayMs * 1.2));
				continue;
			}
			notFoundCount = 0;
			if (polled.providerStatus === "initiated" || polled.providerStatus === "sealing" || polled.providerStatus === "ready") {
				localStorage.removeItem(activeGenerationKey(active.userId));
				setStatus("idle");
				setResult(null);
				setCreditGate(null);
				setError(polled.providerStatus === "ready" ? "Upload completed, but generation was not started. Click Generate to try again." : "The previous upload did not finish starting a generation. Click Generate to try again.");
				return;
			}
			if (typeof polled.reservedCredits === "number" && polled.reservedCredits > 0 && polled.reservedCredits !== active.reservedCredits) {
				active.reservedCredits = polled.reservedCredits;
				localStorage.setItem(activeGenerationKey(active.userId), JSON.stringify(active));
				setResult({
					...active.draft,
					reservedCredits: polled.reservedCredits
				});
			}
			if (polled.providerStatus === "submission_unknown") {
				setError(polled.error || "The provider submission result is uncertain. This generation remains locked to avoid a duplicate charge.");
				return;
			}
			if (polled.status === "completed" && polled.videoUrl) {
				if (generationRunRef.current !== runId) return;
				localStorage.removeItem(activeGenerationKey(active.userId));
				setResult({
					...active.draft,
					reservedCredits: active.reservedCredits,
					previewUrl: polled.videoUrl
				});
				setError("");
				setStatus("done");
				return;
			}
			if (polled.status === "failed") {
				localStorage.removeItem(activeGenerationKey(active.userId));
				setStatus("idle");
				setResult(null);
				const insufficient = polled.providerStatus === "insufficient_credits";
				const requiredCredits = Number(polled.requiredCredits);
				const balance = Number(polled.balance);
				if (insufficient && Number.isFinite(requiredCredits) && Number.isFinite(balance)) {
					setCreditGate({
						requiredCredits,
						balance
					});
					setError("");
					return;
				}
				setCreditGate(null);
				setError(generationFailureUiMessage(polled.error, polled.errorCode) || `Generation failed (${polled.providerStatus})`);
				return;
			}
			delayMs = Math.min(5e3, Math.ceil(delayMs * 1.2));
		}
		setError("Generation is still processing. This job remains reserved; refresh the page to resume checking it.");
	}, []);
	(0, import_react.useEffect)(() => {
		const userId = session?.user?.id;
		if (!userId || status !== "idle") return;
		try {
			const raw = localStorage.getItem(activeGenerationKey(userId));
			if (!raw) return;
			const active = JSON.parse(raw);
			if (active.userId !== userId || !active.generationId || !active.draft || !Number.isFinite(active.reservedCredits)) {
				localStorage.removeItem(activeGenerationKey(userId));
				return;
			}
			const runId = ++generationRunRef.current;
			setError("");
			setCreditGate(null);
			setResult({
				...active.draft,
				reservedCredits: active.reservedCredits
			});
			setStatus("generating");
			pollGeneration(active, runId);
		} catch {
			localStorage.removeItem(activeGenerationKey(userId));
		}
	}, [
		pollGeneration,
		session?.user?.id,
		status
	]);
	const canGenerate = Boolean(video && images.length > 0) && status !== "generating";
	const rawProvider = mode === "motion-transfer" ? publicConfig?.genjutsu_motion_provider : publicConfig?.genjutsu_object_swap_provider;
	const pricingProvider = rawProvider === "higgsfield" || rawProvider === "seedance" || rawProvider === "seedance-volcengine" ? rawProvider : null;
	const estimatedCredits = (0, import_react.useMemo)(() => {
		const durationSeconds = video?.durationSeconds;
		if (!pricingProvider || typeof durationSeconds !== "number" || !Number.isFinite(durationSeconds) || durationSeconds <= 0) return null;
		try {
			return estimateGenjutsuCreditsForProvider({
				provider: pricingProvider,
				durationSeconds,
				resolution
			});
		} catch {
			return null;
		}
	}, [
		pricingProvider,
		resolution,
		video?.durationSeconds
	]);
	const handleGenerate = async () => {
		if (!video || images.length === 0 || status === "generating") return;
		if (!session?.user) {
			redirectToSignIn();
			return;
		}
		const runId = ++generationRunRef.current;
		const generationId = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `gen-${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
		const draft = {
			id: generationId,
			mode,
			resolution,
			prompt: prompt.trim(),
			previewUrl: "",
			imageCount: images.length,
			createdAt: Date.now()
		};
		setError("");
		setCreditGate(null);
		setResult(draft);
		setStatus("generating");
		requestAnimationFrame(() => {
			document.getElementById("generation-result")?.scrollIntoView({
				behavior: "smooth",
				block: "nearest"
			});
		});
		try {
			await apiPost("/api/genjutsu/attempt", {
				generationId,
				mode,
				resolution,
				prompt: prompt.trim()
			});
			const media = [video, ...images];
			const contentTypes = media.map((item, index) => item.file.type || (index === 0 ? "video/mp4" : "image/jpeg"));
			const contentLengths = media.map((item) => item.file.size);
			const uploadBatch = await apiPost("/api/genjutsu/upload-url", {
				generationId,
				mode,
				resolution,
				prompt: prompt.trim(),
				contentTypes,
				contentLengths
			});
			if (uploadBatch.uploads.length !== media.length) throw new Error("Storage returned an incomplete upload batch");
			for (let index = 0; index < media.length; index += 1) {
				const upload = uploadBatch.uploads[index];
				if (!upload) throw new Error("Missing storage upload URL");
				try {
					const uploaded = await uploadToSignedUrl({
						url: upload.uploadUrl,
						file: media[index].file,
						headers: upload.uploadHeaders
					});
					if (uploaded.attemptCount > 1) await reportUploadRetrySucceeded({
						generationId,
						fileIndex: index,
						attemptCount: uploaded.attemptCount,
						uploadElapsedMs: uploaded.uploadElapsedMs
					}).catch(() => void 0);
				} catch (cause) {
					if ((await reportUploadFailure({
						generationId,
						fileIndex: index,
						cause
					}).catch(() => null))?.recovered) continue;
					throw cause;
				}
			}
			if (generationRunRef.current !== runId) return;
			await apiPost("/api/genjutsu/seal-inputs", { generationId });
			const active = {
				userId: session.user.id,
				generationId,
				draft,
				reservedCredits: 0
			};
			localStorage.setItem(activeGenerationKey(session.user.id), JSON.stringify(active));
			const started = await apiPost("/api/genjutsu/generate", { generationId });
			active.generationId = started.generationId;
			active.reservedCredits = started.reservedCredits;
			localStorage.setItem(activeGenerationKey(session.user.id), JSON.stringify(active));
			setResult({
				...draft,
				reservedCredits: started.reservedCredits
			});
			await pollGeneration(active, runId);
		} catch (cause) {
			if (generationRunRef.current !== runId) return;
			const apiData = cause instanceof ApiError && cause.data && typeof cause.data === "object" ? cause.data : null;
			const insufficient = apiData?.code === "INSUFFICIENT_CREDITS";
			const submissionUnknown = apiData?.code === "SUBMISSION_UNKNOWN";
			if (cause instanceof ApiError && !submissionUnknown) {
				localStorage.removeItem(activeGenerationKey(session.user.id));
				setStatus("idle");
				setResult(null);
				if (insufficient) {
					const requiredCredits = Number(apiData?.requiredCredits);
					const balance = Number(apiData?.balance);
					if (Number.isFinite(requiredCredits) && Number.isFinite(balance)) {
						setCreditGate({
							requiredCredits,
							balance
						});
						setError("");
						return;
					}
				}
				setCreditGate(null);
				const likenessRejected = apiData?.code === "PROVIDER_LIKENESS_REJECTED" || typeof cause.message === "string" && isLikenessRejectionMessage(cause.message);
				const uiMessage = providerSubmitUiMessage(cause);
				if (likenessRejected) toast.error(uiMessage);
				setError(uiMessage);
				return;
			}
			const raw = localStorage.getItem(activeGenerationKey(session.user.id));
			if (raw) try {
				const active = JSON.parse(raw);
				setCreditGate(null);
				setResult({
					...active.draft,
					reservedCredits: active.reservedCredits
				});
				setStatus("generating");
				setError(submissionUnknown ? cause instanceof Error ? cause.message : "Generation submission result is uncertain." : "Connection lost while starting generation. Checking the existing job before allowing another submission.");
				pollGeneration(active, runId);
				return;
			} catch {
				localStorage.removeItem(activeGenerationKey(session.user.id));
			}
			setStatus("idle");
			setResult(null);
			setCreditGate(null);
			setError(cause instanceof Error ? cause.message : "Generation failed unexpectedly");
		}
	};
	const recommendedCreditPack = (0, import_react.useMemo)(() => creditGate ? getSmallestSufficientCreditPack({
		balance: creditGate.balance,
		requiredCredits: creditGate.requiredCredits,
		email: session?.user?.email
	}) : null, [creditGate, session?.user?.email]);
	const handleBuyCredits = async () => {
		if (!creditGate || checkoutLoading) return;
		if (!recommendedCreditPack) {
			const pricingWindow = window.open("/pricing", "_blank");
			if (pricingWindow) pricingWindow.opener = null;
			else window.location.href = "/pricing";
			return;
		}
		const checkoutWindow = window.open("", "_blank");
		if (checkoutWindow) checkoutWindow.opener = null;
		setCheckoutLoading(true);
		try {
			const redirect = `${window.location.pathname}${window.location.search}${window.location.hash}`;
			const checkout = await apiPost("/api/payment/checkout", {
				product_id: recommendedCreditPack.id,
				redirect
			});
			if (!checkout.checkout_url) throw new Error("Checkout URL was not returned");
			if (checkoutWindow && !checkoutWindow.closed) checkoutWindow.location.href = checkout.checkout_url;
			else window.location.href = checkout.checkout_url;
		} catch (cause) {
			if (checkoutWindow && !checkoutWindow.closed) checkoutWindow.close();
			toast.error(cause instanceof Error ? cause.message : genjutsu_credits_checkout_failed());
		} finally {
			setCheckoutLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative z-[120] mx-auto w-full max-w-[1180px] sm:rounded-2xl sm:shadow-[0_28px_72px_-42px_rgba(0,0,0,0.72)]", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-white/8 bg-[rgba(94,78,67,0.88)] px-2 py-2 shadow-[0_24px_64px_-40px_rgba(0,0,0,0.68)] sm:p-3 sm:pb-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-2 flex items-center justify-between gap-2 border-b border-white/8 pb-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeToggle, {
							mode,
							onChange: setMode
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-h-[124px] flex-col items-stretch gap-2 sm:min-h-[144px] sm:flex-row sm:gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex shrink-0 flex-wrap gap-2 self-start pt-1 sm:pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoUploadSlot, {
								item: video,
								onChange: setVideo
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageUploadSlot, {
								items: images,
								onChange: setImages,
								signedIn: Boolean(session?.user)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex min-w-0 flex-1 flex-col",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: prompt,
								onChange: (e) => setPrompt(e.target.value),
								placeholder,
								rows: 3,
								className: "placeholder:text-muted-foreground/70 min-h-[96px] w-full resize-none border-0 bg-transparent p-0 text-sm leading-relaxed text-[rgb(237,234,222)] shadow-none outline-none sm:min-h-[124px] sm:text-[14px]"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-auto flex items-end justify-between gap-3 pb-1 text-[11px] text-white/45",
								children: [images.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "max-w-[75%] leading-snug",
									children: "Use @Image1, @Image2, etc. to map each image to a target."
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "shrink-0 tabular-nums",
									children: [prompt.length, " / 2,000"]
								})]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mt-1 flex flex-wrap items-center gap-1.5 border-t border-white/8 pt-2 pb-2 sm:gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							ref: settingsRef,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								"aria-expanded": settingsOpen,
								"aria-haspopup": "dialog",
								onClick: () => setSettingsOpen((v) => !v),
								className: cn(chipClass, "gap-1", settingsOpen && "bg-[rgba(109,112,121,0.42)]"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-foreground/90 font-medium",
									children: resolution
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDownIcon$1, { className: cn("ml-0.5 size-3.5 opacity-60 transition-transform duration-200", settingsOpen && "rotate-180") })]
							}), settingsOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingPanel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResolutionPanel, {
								resolution,
								onResolution: setResolution
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
										children: pricingProvider === "higgsfield" ? genjutsu_estimate_tooltip() : genjutsu_estimate_seedance_tooltip()
									})] })
								})]
							}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								disabled: !canGenerate,
								onClick: handleGenerate,
								className: cn("relative inline-flex h-8 flex-1 items-center justify-center rounded-lg px-3.5 text-sm font-semibold tracking-wide shadow-none transition-all duration-200 active:scale-95 sm:w-auto sm:flex-none", canGenerate ? "bg-[rgb(204,144,92)] text-[rgb(247,246,243)] hover:brightness-105" : "bg-[rgba(126,128,132,0.28)] text-[rgb(237,234,222)]/38"),
								children: status === "generating" ? "Generating…" : "Generate"
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultPanel, {
				status,
				result,
				onDismiss: () => {
					setStatus("idle");
					setResult(null);
				}
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				role: "alert",
				className: "mt-3 rounded-xl border border-red-400/20 bg-red-950/25 px-4 py-3 text-sm text-red-100/90",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: "Generation failed"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-red-100/65",
					children: error
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InsufficientCreditsModal, {
				gate: creditGate,
				pack: recommendedCreditPack,
				checkoutLoading,
				onClose: () => setCreditGate(null),
				onBuy: () => void handleBuyCredits()
			})
		]
	});
}
function isPublicPackId(id) {
	return GENJUTSU_CREDIT_PACKS.some((pack) => pack.id === id);
}
function PricingSection() {
	const router = useRouter$1();
	const pathname = usePathname();
	const { data: session, isPending: sessionPending } = useSession();
	const autoBuyStarted = (0, import_react.useRef)(false);
	async function startCheckout(productId) {
		try {
			const data = await apiPost("/api/payment/checkout", {
				product_id: productId,
				redirect: `${pathname}#pricing`
			});
			if (!data?.checkout_url) throw new Error("Checkout failed");
			window.location.href = data.checkout_url;
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Checkout failed");
		}
	}
	function clearBuyQuery() {
		if (typeof window === "undefined") return;
		const url = new URL(window.location.href);
		if (!url.searchParams.has("buy")) return;
		url.searchParams.delete("buy");
		const next = `${url.pathname}${url.search}${url.hash || "#pricing"}`;
		window.history.replaceState({}, "", next);
	}
	function handleBuy(productId) {
		if (!isPublicPackId(productId)) return;
		if (!session?.user) {
			const callbackUrl = encodeURIComponent(`${pathname}?buy=${productId}#pricing`);
			router.push(`/sign-in?callbackUrl=${callbackUrl}`);
			return;
		}
		startCheckout(productId);
	}
	(0, import_react.useEffect)(() => {
		if (sessionPending || autoBuyStarted.current) return;
		if (typeof window === "undefined") return;
		const buy = new URLSearchParams(window.location.search).get("buy");
		if (!buy || !isPublicPackId(buy)) return;
		autoBuyStarted.current = true;
		clearBuyQuery();
		if (!session?.user) {
			const callbackUrl = encodeURIComponent(`${pathname}?buy=${buy}#pricing`);
			router.push(`/sign-in?callbackUrl=${callbackUrl}`);
			return;
		}
		startCheckout(buy);
	}, [
		sessionPending,
		session?.user,
		pathname
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "pricing",
		className: "scroll-mt-24 py-12 md:py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container mx-auto px-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto mb-10 max-w-3xl text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-foreground mb-4 text-3xl font-semibold lg:text-4xl",
						children: "Genjutsu AI Pricing"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground text-base",
						children: "No subscription. Choose a one-time credit pack and spend credits on Genjutsu Motion Transfer or Object Swap."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto grid max-w-[1180px] gap-4 sm:grid-cols-2 lg:grid-cols-4",
					children: GENJUTSU_CREDIT_PACKS.map((pack) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("relative flex min-h-[330px] flex-col rounded-xl border p-5", "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg", pack.highlighted ? "border-primary/80 bg-primary/[0.08] shadow-primary/20 ring-primary/25 shadow-xl ring-1" : "border-border/70 bg-card/95 ring-border/40 shadow-lg ring-1 shadow-black/10"),
						children: [
							pack.highlighted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "bg-primary text-primary-foreground absolute top-0 right-0 rounded-tr-xl rounded-bl-md px-2 py-0.5 text-[10px] font-semibold",
								children: "Popular"
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-foreground text-lg font-semibold",
								children: pack.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-foreground mt-3 text-3xl font-bold",
								children: ["$", (pack.priceCents / 100).toFixed(2)]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground text-sm",
								children: "one-time"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-primary mt-5 text-2xl font-semibold tabular-nums",
								children: [pack.credits.toLocaleString(), " credits"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "text-muted-foreground mt-5 space-y-2 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "text-primary size-4" }), "No subscription"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "text-primary size-4" }), "Motion Transfer"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "text-primary size-4" }), "Object Swap"]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => handleBuy(pack.id),
								className: cn("mt-auto flex h-10 w-full items-center justify-center rounded-lg", pack.highlighted ? "bg-primary text-primary-foreground" : "border-border bg-background text-foreground border", "text-sm font-medium transition hover:brightness-105"),
								children: "Buy credits"
							})
						]
					}, pack.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed",
					children: "Credits are calculated by the server for each generation. Longer videos and higher resolutions may require more credits, and a single pack may not cover every generation."
				})
			]
		})
	});
}
/**
* Floating bottom composer — collapsed pill while hero generator is off-screen;
* expands in place on click (matches raphael.app behavior).
*/
function StickyComposer({ observeId = "hero-generator" }) {
	const [visible, setVisible] = (0, import_react.useState)(false);
	const [expanded, setExpanded] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const target = document.getElementById(observeId);
		if (!target) return;
		const io = new IntersectionObserver(([entry]) => {
			const show = !entry?.isIntersecting;
			setVisible(show);
			if (!show) setExpanded(false);
		}, {
			threshold: .12,
			rootMargin: "0px"
		});
		io.observe(target);
		return () => io.disconnect();
	}, [observeId]);
	(0, import_react.useEffect)(() => {
		if (!expanded) return;
		const onKey = (e) => {
			if (e.key === "Escape") setExpanded(false);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [expanded]);
	if (!visible) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("fixed inset-x-0 z-[70] px-3", "bottom-[calc(1rem+env(safe-area-inset-bottom))]", expanded && "z-[75]"),
		children: [!expanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-label": "Voice input",
			className: "absolute -top-11 right-[max(1rem,calc(50%-410px+4.5rem))] flex size-9 items-center justify-center rounded-full bg-emerald-600/90 text-white shadow-lg shadow-emerald-900/40 transition hover:bg-emerald-500",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-4" })
		}) : null, expanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto w-full max-w-[820px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-label": "Collapse composer",
				className: "text-foreground/80 hover:text-foreground absolute -top-9 right-0 rounded-full border border-white/10 bg-[rgba(74,56,44,0.88)] px-3 py-1 text-xs backdrop-blur-xl",
				onClick: () => setExpanded(false),
				children: "Collapse"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-hidden rounded-[24px] border border-white/10 bg-[rgba(74,56,44,0.94)] p-2 shadow-2xl backdrop-blur-2xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GeneratorPanel, { hidePromo: true })
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "button",
			tabIndex: 0,
			"aria-label": "Open Genjutsu generator",
			className: "app-workspace-composer-collapsed-frame mx-auto flex w-full max-w-[820px] items-center gap-3 rounded-[24px] border border-white/10 bg-[rgba(74,56,44,0.88)] px-3 py-2 shadow-2xl backdrop-blur-2xl",
			onClick: () => setExpanded(true),
			onKeyDown: (e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					setExpanded(true);
				}
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					tabIndex: -1,
					className: "text-primary/85 flex size-10 items-center justify-center rounded-[10px] border border-dashed border-white/14 bg-white/[0.04]",
					"aria-hidden": true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-w-0 flex-1 text-left",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-foreground/35 truncate text-base font-medium sm:text-sm",
						children: "Add a reference video and product, clothing, object, or scene images to start..."
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					tabIndex: -1,
					"aria-label": "Generate",
					disabled: true,
					className: "bg-primary text-primary-foreground flex size-10 shrink-0 items-center justify-center rounded-full opacity-50",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "size-5" })
				})
			]
		})]
	});
}
//#endregion
export { StickyComposer as i, GeneratorPanel as n, PricingSection as r, FaqSection as t };
