import { o as __toESM } from "../_runtime.mjs";
import { at as require_jsx_runtime, ot as require_react } from "../_libs/@base-ui/react+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { T as RefreshCw, at as Image, n as X, s as Upload } from "../_libs/lucide-react.mjs";
import { t as Button$1 } from "./button-RkClB0x2.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/image-uploader-BSMgxL3y.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var formatBytes = (bytes) => {
	if (!bytes) return "";
	if (bytes < 1024) return `${bytes} B`;
	const kb = bytes / 1024;
	if (kb < 1024) return `${kb.toFixed(2)} KB`;
	return `${(kb / 1024).toFixed(2)} MB`;
};
var uploadImageFile = async (file) => {
	const formData = new FormData();
	formData.append("files", file);
	const response = await fetch("/api/storage/upload-image", {
		method: "POST",
		body: formData
	});
	if (!response.ok) throw new Error(`Upload failed with status ${response.status}`);
	const result = await response.json();
	if (result.code !== 0 || !result.data?.urls?.length) throw new Error(result.message || "Upload failed");
	return result.data.urls[0];
};
function ImageUploader({ allowMultiple = false, maxImages = 1, maxSizeMB = 10, title, emptyHint, className, defaultPreviews, onChange }) {
	const inputRef = (0, import_react.useRef)(null);
	const isInitializedRef = (0, import_react.useRef)(false);
	const onChangeRef = (0, import_react.useRef)(onChange);
	const isInternalChangeRef = (0, import_react.useRef)(false);
	const replaceTargetIdRef = (0, import_react.useRef)(null);
	const dragCounterRef = (0, import_react.useRef)(0);
	const [isDragActive, setIsDragActive] = (0, import_react.useState)(false);
	const [items, setItems] = (0, import_react.useState)(() => {
		if (defaultPreviews?.length) return defaultPreviews.map((url, index) => ({
			id: `preset-${url}-${index}`,
			preview: url,
			url,
			status: "uploaded"
		}));
		return [];
	});
	const maxCount = allowMultiple ? maxImages : 1;
	const maxBytes = maxSizeMB * 1024 * 1024;
	(0, import_react.useEffect)(() => {
		onChangeRef.current = onChange;
	}, [onChange]);
	(0, import_react.useEffect)(() => {
		if (!isInitializedRef.current) return;
		if (isInternalChangeRef.current) {
			isInternalChangeRef.current = false;
			return;
		}
		const defaultUrls = defaultPreviews || [];
		setItems((currentItems) => {
			const currentUrls = currentItems.filter((item) => item.status === "uploaded" && item.url).map((item) => item.url);
			if (!(defaultUrls.length === currentUrls.length && defaultUrls.every((url, index) => url === currentUrls[index]))) return defaultUrls.map((url, index) => ({
				id: `preset-${url}-${index}`,
				preview: url,
				url,
				status: "uploaded"
			}));
			return currentItems;
		});
	}, [defaultPreviews]);
	(0, import_react.useEffect)(() => {
		return () => {
			items.forEach((item) => {
				if (item.preview.startsWith("blob:")) URL.revokeObjectURL(item.preview);
			});
		};
	}, [items]);
	(0, import_react.useEffect)(() => {
		if (!isInitializedRef.current) {
			isInitializedRef.current = true;
			return;
		}
		isInternalChangeRef.current = true;
		onChangeRef.current?.(items.map(({ id, preview, url, status, size }) => ({
			id,
			preview,
			url,
			status,
			size
		})));
	}, [items]);
	const replaceItems = (pairs) => {
		pairs.forEach(({ id, file }) => {
			const uploadKey = `${Date.now()}-${Math.random()}`;
			const nextPreview = URL.createObjectURL(file);
			setItems((prev) => prev.map((item) => {
				if (item.id !== id) return item;
				if (item.preview.startsWith("blob:")) URL.revokeObjectURL(item.preview);
				return {
					...item,
					preview: nextPreview,
					file,
					size: file.size,
					url: void 0,
					status: "uploading",
					uploadKey
				};
			}));
			uploadImageFile(file).then((url) => {
				setItems((prev) => prev.map((item) => {
					if (item.id !== id) return item;
					if (item.uploadKey !== uploadKey) return item;
					if (item.preview.startsWith("blob:")) URL.revokeObjectURL(item.preview);
					return {
						...item,
						preview: url,
						url,
						status: "uploaded",
						file: void 0
					};
				}));
			}).catch((error) => {
				console.error("Upload failed:", error);
				toast.error(error?.message ? `Upload failed: ${error.message}` : "Upload failed");
				setItems((prev) => prev.map((item) => {
					if (item.id !== id) return item;
					if (item.uploadKey !== uploadKey) return item;
					return {
						...item,
						status: "error"
					};
				}));
			}).finally(() => {
				if (inputRef.current) inputRef.current.value = "";
			});
		});
	};
	const handleFiles = (selectedFiles) => {
		const replaceTargetId = replaceTargetIdRef.current;
		if (replaceTargetId) {
			replaceTargetIdRef.current = null;
			const file = selectedFiles[0];
			if (!file) return;
			if (!file.type?.startsWith("image/")) {
				toast.error("Only image files are supported");
				if (inputRef.current) inputRef.current.value = "";
				return;
			}
			if (file.size > maxBytes) {
				toast.error(`"${file.name}" exceeds the ${maxSizeMB}MB limit`);
				if (inputRef.current) inputRef.current.value = "";
				return;
			}
			replaceItems([{
				id: replaceTargetId,
				file
			}]);
			return;
		}
		const availableSlots = maxCount - items.length;
		const filesToAdd = selectedFiles.filter((file) => {
			if (!file.type?.startsWith("image/")) {
				toast.error(`"${file.name}" is not an image`);
				return false;
			}
			if (file.size > maxBytes) {
				toast.error(`"${file.name}" exceeds the ${maxSizeMB}MB limit`);
				return false;
			}
			return true;
		}).slice(0, Math.max(availableSlots, 0));
		if (!filesToAdd.length) {
			if (items.length) {
				const normalized = selectedFiles.filter((file) => file.type?.startsWith("image/"));
				if (!normalized.length) return;
				const k = Math.min(normalized.length, items.length);
				const tail = items.slice(-k);
				const pairs = [];
				for (let i = 0; i < k; i += 1) {
					const targetId = tail[tail.length - 1 - i]?.id;
					const file = normalized[i];
					if (targetId && file) pairs.push({
						id: targetId,
						file
					});
				}
				if (pairs.length) replaceItems(pairs);
			}
			if (inputRef.current) inputRef.current.value = "";
			return;
		}
		if (availableSlots < selectedFiles.length) toast.message(`Only the first ${filesToAdd.length} image(s) will be added`);
		const newItems = filesToAdd.map((file) => ({
			id: `${file.name}-${file.lastModified}-${Math.random()}`,
			preview: URL.createObjectURL(file),
			file,
			size: file.size,
			status: "uploading",
			uploadKey: `${Date.now()}-${Math.random()}`
		}));
		setItems((prev) => [...prev, ...newItems]);
		Promise.all(newItems.map(async (item) => {
			try {
				const url = await uploadImageFile(item.file);
				setItems((prev) => prev.map((current) => {
					if (current.id !== item.id) return current;
					if (current.uploadKey && item.uploadKey && current.uploadKey !== item.uploadKey) return current;
					if (current.preview.startsWith("blob:")) URL.revokeObjectURL(current.preview);
					return {
						...current,
						preview: url,
						url,
						status: "uploaded",
						file: void 0
					};
				}));
			} catch (error) {
				console.error("Upload failed:", error);
				toast.error(error?.message ? `Upload failed: ${error.message}` : "Upload failed");
				setItems((prev) => prev.map((current) => {
					if (current.id !== item.id) return current;
					if (current.uploadKey && current.uploadKey !== item.uploadKey) return current;
					return {
						...current,
						status: "error"
					};
				}));
			}
		}));
		if (inputRef.current) inputRef.current.value = "";
	};
	const handleSelect = (event) => {
		const selectedFiles = Array.from(event.target.files || []);
		if (!selectedFiles.length) return;
		handleFiles(selectedFiles);
	};
	const handlePaste = (event) => {
		const files = Array.from(event.clipboardData?.items || []).filter((item) => item.kind === "file" && item.type.startsWith("image/")).map((item) => item.getAsFile()).filter(Boolean);
		if (!files.length) return;
		event.preventDefault();
		handleFiles(files);
	};
	const handleDragEnter = (event) => {
		event.preventDefault();
		event.stopPropagation();
		dragCounterRef.current += 1;
		setIsDragActive(true);
	};
	const handleDragOver = (event) => {
		event.preventDefault();
		event.stopPropagation();
		event.dataTransfer.dropEffect = "copy";
		if (!isDragActive) setIsDragActive(true);
	};
	const handleDragLeave = (event) => {
		event.preventDefault();
		event.stopPropagation();
		dragCounterRef.current -= 1;
		if (dragCounterRef.current <= 0) {
			dragCounterRef.current = 0;
			setIsDragActive(false);
		}
	};
	const handleDrop = (event) => {
		event.preventDefault();
		event.stopPropagation();
		dragCounterRef.current = 0;
		setIsDragActive(false);
		const files = Array.from(event.dataTransfer?.files || []).filter((file) => file.type?.startsWith("image/"));
		if (!files.length) return;
		handleFiles(files);
	};
	const handleRemove = (id) => {
		setItems((prev) => {
			const next = prev.filter((item) => item.id !== id);
			const removed = prev.find((item) => item.id === id);
			if (removed?.preview.startsWith("blob:")) URL.revokeObjectURL(removed.preview);
			return next;
		});
	};
	const openFilePicker = () => {
		inputRef.current?.click();
	};
	const openReplacePicker = (id) => {
		replaceTargetIdRef.current = id;
		openFilePicker();
	};
	const countLabel = (0, import_react.useMemo)(() => `${items.length}/${maxCount}`, [items.length, maxCount]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative focus:outline-none", isDragActive && "ring-primary/70 ring-offset-background ring-2 ring-offset-2", className),
		tabIndex: 0,
		onPaste: handlePaste,
		onDragEnter: handleDragEnter,
		onDragOver: handleDragOver,
		onDragLeave: handleDragLeave,
		onDrop: handleDrop,
		children: [
			isDragActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-0 z-30 flex items-center justify-center bg-black/10 backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-background/80 text-foreground rounded-full px-4 py-2 text-sm font-medium shadow-sm",
					children: "Drop to upload"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: inputRef,
				type: "file",
				accept: "image/*",
				multiple: allowMultiple,
				onChange: handleSelect,
				className: "hidden"
			}),
			title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-foreground mb-2 flex items-center justify-between text-sm font-medium",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "text-primary h-4 w-4" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: title }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-primary text-xs",
							children: [
								"(",
								countLabel,
								")"
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("flex flex-wrap gap-4", allowMultiple ? "flex-wrap" : "flex-nowrap"),
				children: [items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "group border-border bg-muted/50 hover:border-border hover:bg-muted relative overflow-hidden rounded-xl border p-1 shadow-sm transition",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative overflow-hidden rounded-lg",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: item.preview,
								alt: "Preview",
								className: "h-32 w-32 rounded-lg object-cover"
							}),
							item.size && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "bg-background text-muted-foreground absolute bottom-2 left-2 rounded-md px-2 py-1 text-[10px] font-medium",
								children: formatBytes(item.size)
							}),
							item.status !== "uploading" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-0 z-10 flex items-center justify-center bg-black/35 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
									type: "button",
									size: "icon",
									variant: "secondary",
									className: "bg-background/50 text-foreground hover:bg-background/50 h-10 w-10 rounded-full shadow-sm backdrop-blur focus-visible:ring-2 focus-visible:ring-white/70",
									onClick: () => openReplacePicker(item.id),
									"aria-label": "Replace image",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-5 w-5" })
								})
							}),
							item.status === "uploading" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-0 z-10 flex items-center justify-center bg-black/60 text-xs font-medium text-white",
								children: "Uploading..."
							}),
							item.status === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-0 z-10 flex items-center justify-center bg-red-500/70 text-xs font-medium text-white",
								children: "Failed"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
								type: "button",
								size: "icon",
								variant: "destructive",
								className: "absolute top-2 right-2 z-20 h-7 w-7",
								onClick: () => handleRemove(item.id),
								"aria-label": "Remove image",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
							})
						]
					})
				}, item.id)), items.length < maxCount && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "group border-border bg-muted/50 hover:border-border hover:bg-muted relative overflow-hidden rounded-xl border border-dashed p-1 shadow-sm transition",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative overflow-hidden rounded-lg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "flex h-32 w-32 flex-col items-center justify-center gap-2",
							onClick: openFilePicker,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "border-border flex h-10 w-10 items-center justify-center rounded-full border border-dashed",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-5 w-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-medium",
									children: "Upload"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-primary text-xs",
									children: [
										"Max ",
										maxSizeMB,
										"MB"
									]
								})
							]
						})
					})
				})]
			}),
			!title && emptyHint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-muted-foreground mt-2 text-xs",
				children: emptyHint
			})
		]
	});
}
//#endregion
export { ImageUploader as t };
