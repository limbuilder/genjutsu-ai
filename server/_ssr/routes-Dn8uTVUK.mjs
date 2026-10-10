import { at as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { o as envConfigs } from "./schema-DWa8-2WU.mjs";
import { t as Link$1 } from "./navigation-BgznuAML.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { a as GENJUTSU_CHANGE_ITEMS, c as GENJUTSU_HOW_IT_WORKS, d as TESTIMONIALS, i as GENJUTSU_CHANGE_EXAMPLES, l as GENJUTSU_PROMPT_IDEAS, o as GENJUTSU_FAQS, s as GENJUTSU_HOWTO_STEPS, u as GENJUTSU_VS_ROWS } from "./content-aeUTqH7Y.mjs";
import { F as Palette, I as Package, W as MapPin, kt as Clapperboard } from "../_libs/lucide-react.mjs";
import "./site-user-menu-C3Ao0HTQ.mjs";
import { t as SiteFooter } from "./SiteFooter-Bjzgl7AX.mjs";
import { t as SiteHeader } from "./SiteHeader-B2cCQXdM.mjs";
import { i as StickyComposer, n as GeneratorPanel, r as PricingSection, t as FaqSection } from "./StickyComposer-Dtl4N-Oc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Dn8uTVUK.js
var import_jsx_runtime = require_jsx_runtime();
var CHANGE_ICONS = [
	Package,
	Palette,
	MapPin,
	Clapperboard
];
function SectionHeading({ title, description }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-foreground text-3xl font-bold tracking-tight sm:text-4xl",
			children: title
		}), description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-foreground/70 mt-4 text-base leading-relaxed sm:text-lg",
			children: description
		}) : null]
	});
}
function WhatIsGenjutsu({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "introduction",
		className: cn("scroll-mt-24 py-16", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container mx-auto px-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, { title: "What Is Genjutsu AI?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-foreground/70 mx-auto mt-8 max-w-3xl text-center text-base leading-relaxed sm:text-lg",
				children: "Genjutsu is a video-to-video model by Higgsfield. You upload an existing clip; this site uses the model to restyle scenes, styles, products, and props around the same subject while preserving the original motion, camera movement, and timing. It is not a from-scratch text-to-video generator — and it is not a face-swap or identity-swap tool. The source take provides the motion; Genjutsu changes the world around it."
			})]
		})
	});
}
function HowGenjutsuWorks({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "how-it-works",
		className: cn("scroll-mt-24 py-16", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container mx-auto px-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				title: "How Genjutsu Works",
				description: "Three steps: keep the subject, rewrite the world around them."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mx-auto mt-12 grid max-w-[1180px] gap-8 sm:grid-cols-3",
				children: GENJUTSU_HOW_IT_WORKS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-2xl border border-white/8 bg-white/[0.03] p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("border-primary text-primary inline-flex size-8 items-center justify-center", "rounded-sm border font-mono text-xs font-semibold"),
							children: item.step
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-foreground mt-4 text-lg font-semibold",
							children: item.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-foreground/65 mt-3 text-sm leading-relaxed",
							children: item.description
						})
					]
				}, item.step))
			})]
		})
	});
}
function WhatYouCanChange({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "feature",
		className: cn("scroll-mt-24 py-16", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container mx-auto px-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					title: "What You Can Change",
					description: "Same subject — new scene, style, product, or a single object."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto mt-12 grid max-w-[1180px] gap-10 sm:grid-cols-2 lg:grid-cols-4",
					children: GENJUTSU_CHANGE_ITEMS.map((item, index) => {
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "border-primary mb-5 flex size-16 items-center justify-center rounded-full border",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CHANGE_ICONS[index] ?? Package, {
										className: "text-primary size-8",
										"aria-hidden": "true"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-foreground mb-2 text-xl font-bold",
									children: item.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-foreground/80 leading-relaxed",
									children: item.description
								})
							]
						}, item.title);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto mt-12 grid max-w-[1180px] gap-4 sm:grid-cols-2",
					children: GENJUTSU_CHANGE_EXAMPLES.map((example) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-2xl border border-white/8 bg-white/[0.03] p-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-foreground/70 text-sm leading-relaxed",
							children: example
						})
					}, example))
				})
			]
		})
	});
}
function HowToUseGenerator({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: cn("py-16", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container mx-auto px-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				title: "How to Use the Generator",
				description: "Five steps from upload to download."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mx-auto mt-12 max-w-3xl space-y-8",
				children: GENJUTSU_HOWTO_STEPS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("mt-0.5 flex size-6 shrink-0 items-center justify-center", "border-primary text-primary rounded-sm border font-mono text-xs"),
						children: item.step
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-foreground text-xl font-bold",
							children: item.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-foreground/70 mt-2 text-base leading-relaxed",
							children: item.description
						})]
					})]
				}, item.step))
			})]
		})
	});
}
function PromptIdeas({ className, showAllLink = true }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: cn("py-16", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container mx-auto px-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					title: "Genjutsu Prompt Ideas",
					description: "Scene, style, and object rewrites — keep the original subject and motion."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto mt-12 grid max-w-[1180px] gap-8 sm:grid-cols-2",
					children: GENJUTSU_PROMPT_IDEAS.slice(0, 8).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-2xl border border-white/8 bg-white/[0.03] p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-foreground text-lg font-semibold",
							children: item.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-foreground/65 mt-3 text-sm leading-relaxed",
							children: item.prompt
						})]
					}, item.title))
				}),
				showAllLink ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-8 text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
						href: "/genjutsu-prompts",
						className: "text-primary text-sm font-medium underline-offset-4 hover:underline",
						children: "Browse all Genjutsu prompt ideas"
					})
				}) : null
			]
		})
	});
}
function VsOfficial({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: cn("py-16", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container mx-auto px-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				title: "Our Tool vs the Official Higgsfield Genjutsu",
				description: "Same underlying model. Different way to pay. Use the official app if you want the full Higgsfield suite on a subscription; use this site if you prefer prepaid credits for Genjutsu jobs only."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-border/70 mx-auto mt-12 max-w-[1180px] overflow-x-auto rounded-xl border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[640px] table-fixed border-collapse text-left text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("colgroup", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("col", { className: "w-[22%]" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("col", { className: "w-[39%]" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("col", { className: "w-[39%]" })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-border/60 border-b bg-white/[0.03]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-foreground/50 px-5 py-4 font-medium",
									children: "\xA0"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-foreground px-5 py-4 font-semibold",
									children: "This site"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-foreground px-5 py-4 font-semibold",
									children: "Official Higgsfield"
								})
							]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: GENJUTSU_VS_ROWS.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-border/50 border-b last:border-b-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-foreground px-5 py-4 align-top font-medium",
									children: row.label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "text-foreground/70 px-5 py-4 align-top leading-relaxed",
									children: row.ours
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "text-foreground/70 px-5 py-4 align-top leading-relaxed",
									children: row.official
								})
							]
						}, row.label)) })
					]
				})
			})]
		})
	});
}
function BackToToolCta({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: cn("pb-24", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "container mx-auto px-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-3xl rounded-3xl border border-dashed px-6 py-12 text-center sm:px-10 sm:py-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-foreground text-3xl font-bold tracking-tight sm:text-4xl",
						children: "Ready to rewrite a clip?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-foreground/70 mx-auto mt-6 max-w-xl text-base leading-relaxed sm:text-lg",
						children: "Upload a video, write the result you want, and generate. The tool is at the top of this page."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 flex justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#hero-generator",
							className: "inline-flex h-11 items-center justify-center rounded-xl bg-[rgb(204,144,92)] px-6 text-sm font-semibold text-[rgb(247,246,243)] transition hover:brightness-105",
							children: "Back to the generator"
						})
					})
				]
			})
		})
	});
}
var DEMO_VIDEOS = [
	{
		src: "/videos/demos/two-cats-dance.mp4",
		poster: "/videos/demos/two-cats-dance-poster.jpg",
		label: "Two cats dance",
		aspect: "portrait"
	},
	{
		src: "/videos/demos/car-drop.mp4",
		poster: "/videos/demos/car-drop-poster.jpg",
		label: "Car drop",
		aspect: "portrait"
	},
	{
		src: "/videos/demos/cat-to-dog.mp4",
		poster: "/videos/demos/cat-to-dog-poster.jpg",
		label: "Cat to dog",
		aspect: "portrait"
	},
	{
		src: "/videos/demos/demodemo.mp4",
		poster: "/videos/demos/demodemo-poster.jpg",
		label: "Scene rewrite demo",
		aspect: "landscape"
	},
	{
		src: "/videos/demos/jackson-cat.mp4",
		poster: "/videos/demos/jackson-cat-poster.jpg",
		label: "Jackson cat",
		aspect: "landscape"
	}
];
function DemoTile({ demo }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figure", {
		className: "min-w-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("overflow-hidden rounded-xl border border-white/10 bg-black/40 shadow-[0_8px_24px_rgba(0,0,0,0.28)]", demo.aspect === "portrait" ? "aspect-9/16" : "aspect-video"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				className: "size-full object-cover motion-reduce:hidden",
				autoPlay: true,
				muted: true,
				loop: true,
				playsInline: true,
				preload: "metadata",
				poster: demo.poster,
				"aria-label": demo.label,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
					src: demo.src,
					type: "video/mp4"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: demo.poster,
				alt: demo.label,
				className: "hidden size-full object-cover motion-reduce:block"
			})]
		})
	});
}
function DemoVideoGallery({ className }) {
	const portraits = DEMO_VIDEOS.filter((d) => d.aspect === "portrait");
	const landscapes = DEMO_VIDEOS.filter((d) => d.aspect === "landscape");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("mt-5 space-y-2 sm:mt-6 sm:space-y-3 md:space-y-4", className),
		"aria-label": "Demo videos",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-3 gap-2 sm:gap-3 md:gap-4",
			children: portraits.map((demo) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoTile, { demo }, demo.src))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 md:gap-4",
			children: landscapes.map((demo) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoTile, { demo }, demo.src))
		})]
	});
}
var BADGES = [
	"Motion Transfer",
	"Objects Swap",
	"Up to 1080p"
];
var HERO_VIDEO_SRC = "/videos/hero-bg.mp4";
var HERO_POSTER_SRC = "/videos/hero-bg-poster.jpg";
function Hero({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("relative flex min-h-svh w-full flex-col justify-center", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-none absolute inset-0 overflow-hidden",
			"aria-hidden": true,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 bg-cover bg-center",
					style: { backgroundImage: `url(${HERO_POSTER_SRC})` }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
					className: "absolute inset-0 size-full object-cover motion-reduce:hidden",
					autoPlay: true,
					muted: true,
					loop: true,
					playsInline: true,
					preload: "metadata",
					poster: HERO_POSTER_SRC,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
						src: HERO_VIDEO_SRC,
						type: "video/mp4"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-linear-to-b from-black/65 via-black/50 to-[hsl(28_25%_10%)]" })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative z-10 mx-auto w-full max-w-[1180px] px-4 pt-20 pb-10 text-center sm:pt-24 md:px-5 md:pb-14",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[28px] leading-[1.15] font-bold tracking-[-1px] text-[rgb(237,234,222)] sm:text-[34px] md:text-[40px] md:leading-[46px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/logo.webp",
						alt: "Genjutsu AI",
						width: 48,
						height: 48,
						fetchPriority: "high",
						className: "size-9 rounded-full sm:size-10 md:size-12"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Genjutsu AI Video Generator" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mt-3 max-w-3xl text-base leading-relaxed text-white/82 sm:mt-4 sm:text-lg",
					children: "Keep your subject, change the world around them. Genjutsu transfers the original motion and timing into a new scene, style, or set of objects — without swapping who or what is in the shot."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 flex flex-wrap items-center justify-center gap-2",
					children: BADGES.map((badge) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "inline-flex h-[27px] items-center rounded-full border border-[rgba(245,158,11,0.2)] bg-[rgba(245,158,11,0.1)] px-2.5 py-0.5 text-[11px] font-medium whitespace-nowrap text-[rgb(245,158,11)] backdrop-blur-sm",
						children: badge
					}, badge))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					id: "hero-generator",
					className: "mt-5 scroll-mt-24 text-left",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GeneratorPanel, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoVideoGallery, {})]
				})
			]
		})]
	});
}
function QuoteCard({ item }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: cn("border-border w-full max-w-xs rounded-3xl border p-10", "shadow-primary/10 shadow-lg"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-foreground/90 text-sm leading-relaxed",
			children: item.quote
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: item.avatarSrc,
				alt: item.name,
				width: 40,
				height: 40,
				className: "h-10 w-10 rounded-full object-cover"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-foreground leading-5 font-medium tracking-tight",
					children: item.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "leading-5 tracking-tight opacity-60",
					children: item.role
				})]
			})]
		})]
	});
}
function ScrollColumn({ items, duration, className }) {
	const loop = [...items, ...items];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "animate-scroll bg-background flex flex-col gap-6 pb-6",
			style: { animationDuration: duration },
			children: loop.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuoteCard, { item }, `${item.name}-${index}`))
		})
	});
}
var COLUMN_DURATIONS = [
	"15s",
	"19s",
	"17s"
];
function Testimonials() {
	const columns = [
		TESTIMONIALS.slice(0, 3),
		TESTIMONIALS.slice(3, 6),
		TESTIMONIALS.slice(6, 9)
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-background relative my-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "z-10 container mx-auto px-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-3xl flex-col items-center justify-center text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("border-border/60 bg-background/50 rounded-full border px-5 py-1.5", "text-foreground/80 text-xs font-semibold backdrop-blur-sm"),
							children: "Testimonials"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-foreground mt-6 text-3xl font-bold tracking-tight sm:text-4xl",
						children: "What Creators Say About Genjutsu AI"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-foreground/80 mt-6 text-lg leading-relaxed",
						children: "Editors, producers, and short-form teams using video-to-video to keep the original motion"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("mt-10 flex max-h-[740px] justify-center gap-6 overflow-hidden", "[mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]"),
				children: columns.map((items, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollColumn, {
					items,
					duration: COLUMN_DURATIONS[index],
					className: cn(index === 1 && "hidden md:block", index === 2 && "hidden lg:block")
				}, index))
			})]
		})
	});
}
function HomePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background text-foreground flex min-h-screen flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-x-0 top-0 z-[260]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto w-full max-w-7xl flex-1 px-4 md:px-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatIsGenjutsu, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HowGenjutsuWorks, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatYouCanChange, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HowToUseGenerator, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromptIdeas, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PricingSection, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VsOfficial, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Testimonials, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaqSection, {
						items: GENJUTSU_FAQS,
						title: "Genjutsu AI FAQ",
						description: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							"Answers about video-to-video, credits, and how Genjutsu preserves motion. Contact",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: `mailto:${envConfigs.app_support_email}`,
								className: "text-primary underline-offset-2 hover:underline",
								children: envConfigs.app_support_email
							}),
							" ",
							"if you need help."
						] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackToToolCta, {})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StickyComposer, {})
		]
	});
}
//#endregion
export { HomePage as component };
