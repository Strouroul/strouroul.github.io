(function () {
    const e = document.createElement("link").relList;
    if (e && e.supports && e.supports("modulepreload")) return;
    for (const n of document.querySelectorAll('link[rel="modulepreload"]')) s(n);
    new MutationObserver(n => {
        for (const i of n) if (i.type === "childList") for (const r of i.addedNodes) r.tagName === "LINK" && r.rel === "modulepreload" && s(r)
    }).observe(document, {childList: !0, subtree: !0});

    function t(n) {
        const i = {};
        return n.integrity && (i.integrity = n.integrity), n.referrerPolicy && (i.referrerPolicy = n.referrerPolicy), n.crossOrigin === "use-credentials" ? i.credentials = "include" : n.crossOrigin === "anonymous" ? i.credentials = "omit" : i.credentials = "same-origin", i
    }

    function s(n) {
        if (n.ep) return;
        n.ep = !0;
        const i = t(n);
        fetch(n.href, i)
    }
})();
const Ce = o => o === "true",
    L = (o, e, t = "") => (window.getComputedStyle(o).getPropertyValue(e) || t).replace(" ", ""),
    Is = (o, e, t = "") => {
        let s = "";
        return o.classList.forEach(n => {
            n.includes(e) && (s = n)
        }), s.match(/:(.*)]/) ? s.match(/:(.*)]/)[1] : t
    },
    As = () => /iPad|iPhone|iPod/.test(navigator.platform) ? !0 : navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform),
    Ls = () => navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform),
    mt = (o, e, t = "auto", s = 10, n = null) => {
        const i = e.getBoundingClientRect(), r = n ? n.getBoundingClientRect() : null, l = window.innerHeight,
            a = r ? i.top - r.top : i.top, c = (n ? r.bottom : l) - i.bottom, h = o.clientHeight + s;
        return t === "bottom" ? c >= h : t === "top" ? a >= h : a >= h || c >= h
    }, Ts = o => o instanceof HTMLInputElement || o instanceof HTMLTextAreaElement || o instanceof HTMLSelectElement,
    gt = o => o ? window.getComputedStyle(o).display === "none" ? !0 : gt(o.parentElement) : !1, Ze = (o, e = 200) => {
        let t;
        return (...s) => {
            clearTimeout(t), t = setTimeout(() => {
                o.apply(void 0, s)
            }, e)
        }
    }, E = (o, e, t = null) => {
        const s = new CustomEvent(o, {detail: {payload: t}, bubbles: !0, cancelable: !0, composed: !1});
        e.dispatchEvent(s)
    }, H = (o, e) => {
        const t = () => {
            e(), o.removeEventListener("transitionend", t, !0)
        };
        window.getComputedStyle(o, null).getPropertyValue("transition") !== (navigator.userAgent.includes("Firefox") ? "all" : "all 0s ease 0s") ? o.addEventListener("transitionend", t, !0) : e()
    }, w = o => {
        const e = document.createElement("template");
        return o = o.trim(), e.innerHTML = o, e.content.firstChild
    }, q = (o, e, t = " ", s = "add") => {
        o.split(t).forEach(i => s === "add" ? e.classList.add(i) : e.classList.remove(i))
    }, ks = {
        historyIndex: -1, addHistory(o) {
            this.historyIndex = o
        }, existsInHistory(o) {
            return o > this.historyIndex
        }, clearHistory() {
            this.historyIndex = -1
        }
    };/*
 * HSBasePlugin
 * @version: 2.1.0
 * @author: HTMLStream
 * @license: Licensed under MIT (https://preline.co/docs/license.html)
 * Copyright 2023 HTMLStream
 */
class k {
    constructor(e, t, s) {
        this.el = e, this.options = t, this.events = s, this.el = e, this.options = t, this.events = {}
    }

    createCollection(e, t) {
        var s;
        e.push({id: ((s = t == null ? void 0 : t.el) == null ? void 0 : s.id) || e.length + 1, element: t})
    }

    fireEvent(e, t = null) {
        if (this.events.hasOwnProperty(e)) return this.events[e](t)
    }

    on(e, t) {
        this.events[e] = t
    }
}/*
 * HSCopyMarkup
 * @version: 2.1.0
 * @author: HTMLStream
 * @license: Licensed under MIT (https://preline.co/docs/license.html)
 * Copyright 2023 HTMLStream
 */
class Be extends k {
    constructor(e, t) {
        super(e, t);
        const s = e.getAttribute("data-hs-copy-markup"), i = {...s ? JSON.parse(s) : {}, ...t};
        this.targetSelector = (i == null ? void 0 : i.targetSelector) || null, this.wrapperSelector = (i == null ? void 0 : i.wrapperSelector) || null, this.limit = (i == null ? void 0 : i.limit) || null, this.items = [], this.targetSelector && this.init()
    }

    static getInstance(e, t) {
        const s = window.$hsCopyMarkupCollection.find(n => n.element.el === (typeof e == "string" ? document.querySelector(e) : e));
        return s ? t ? s : s.element : null
    }

    static autoInit() {
        window.$hsCopyMarkupCollection || (window.$hsCopyMarkupCollection = []), document.querySelectorAll("[data-hs-copy-markup]:not(.--prevent-on-load-init)").forEach(e => {
            if (!window.$hsCopyMarkupCollection.find(t => {
                var s;
                return ((s = t == null ? void 0 : t.element) == null ? void 0 : s.el) === e
            })) {
                const t = e.getAttribute("data-hs-copy-markup"), s = t ? JSON.parse(t) : {};
                new Be(e, s)
            }
        })
    }

    init() {
        this.createCollection(window.$hsCopyMarkupCollection, this), this.setTarget(), this.setWrapper(), this.addPredefinedItems(), this.el.addEventListener("click", () => this.copy())
    }

    copy() {
        if (this.limit && this.items.length >= this.limit) return !1;
        this.el.hasAttribute("disabled") && this.el.setAttribute("disabled", "");
        const e = this.target.cloneNode(!0);
        this.addToItems(e), this.limit && this.items.length >= this.limit && this.el.setAttribute("disabled", "disabled"), this.fireEvent("copy", e), E("copy.hs.copyMarkup", e, e)
    }

    addPredefinedItems() {
        Array.from(this.wrapper.children).filter(e => !e.classList.contains("[--ignore-for-count]")).forEach(e => {
            this.addToItems(e)
        })
    }

    setTarget() {
        const e = typeof this.targetSelector == "string" ? document.querySelector(this.targetSelector).cloneNode(!0) : this.targetSelector.cloneNode(!0);
        e.removeAttribute("id"), this.target = e
    }

    setWrapper() {
        this.wrapper = typeof this.wrapperSelector == "string" ? document.querySelector(this.wrapperSelector) : this.wrapperSelector
    }

    addToItems(e) {
        const t = e.querySelector("[data-hs-copy-markup-delete-item]");
        this.wrapper ? this.wrapper.append(e) : this.el.before(e), t && t.addEventListener("click", () => this.delete(e)), this.items.push(e)
    }

    delete(e) {
        const t = this.items.indexOf(e);
        t !== -1 && this.items.splice(t, 1), e.remove(), this.fireEvent("delete", e), E("delete.hs.copyMarkup", e, e)
    }
}

window.addEventListener("load", () => {
    Be.autoInit()
});
typeof window < "u" && (window.HSCopyMarkup = Be);/*
 * HSAccordion
 * @version: 2.1.0
 * @author: HTMLStream
 * @license: Licensed under MIT (https://preline.co/docs/license.html)
 * Copyright 2023 HTMLStream
 */
class fe extends k {
    constructor(e, t, s) {
        super(e, t, s), this.toggle = this.el.querySelector(".hs-accordion-toggle") || null, this.content = this.el.querySelector(".hs-accordion-content") || null, this.group = this.el.closest(".hs-accordion-group") || null, this.isAlwaysOpened = this.group.hasAttribute("data-hs-accordion-always-open") || !1, this.toggle && this.content && this.init()
    }

    static getInstance(e, t) {
        const s = window.$hsAccordionCollection.find(n => n.element.el === (typeof e == "string" ? document.querySelector(e) : e));
        return s ? t ? s : s.element.el : null
    }

    static show(e) {
        const t = window.$hsAccordionCollection.find(s => s.element.el === (typeof e == "string" ? document.querySelector(e) : e));
        t && t.element.content.style.display !== "block" && t.element.show()
    }

    static hide(e) {
        const t = window.$hsAccordionCollection.find(s => s.element.el === (typeof e == "string" ? document.querySelector(e) : e));
        t && t.element.content.style.display === "block" && t.element.hide()
    }

    static autoInit() {
        window.$hsAccordionCollection || (window.$hsAccordionCollection = []), document.querySelectorAll(".hs-accordion:not(.--prevent-on-load-init)").forEach(e => {
            window.$hsAccordionCollection.find(t => {
                var s;
                return ((s = t == null ? void 0 : t.element) == null ? void 0 : s.el) === e
            }) || new fe(e)
        })
    }

    static treeView() {
        if (!document.querySelectorAll(".hs-accordion-treeview-root").length) return !1;
        this.selectable = [], document.querySelectorAll(".hs-accordion-treeview-root").forEach(e => {
            const t = e == null ? void 0 : e.getAttribute("data-hs-accordion-options"), s = t ? JSON.parse(t) : {};
            this.selectable.push({el: e, options: {...s}})
        }), this.selectable.length && this.selectable.forEach(e => {
            const {el: t} = e;
            t.querySelectorAll(".hs-accordion-selectable").forEach(s => {
                s.addEventListener("click", n => {
                    n.stopPropagation(), this.toggleSelected(e, s)
                })
            })
        })
    }

    static toggleSelected(e, t) {
        t.classList.contains("selected") ? t.classList.remove("selected") : (e.el.querySelectorAll(".hs-accordion-selectable").forEach(s => s.classList.remove("selected")), t.classList.add("selected"))
    }

    static on(e, t, s) {
        const n = window.$hsAccordionCollection.find(i => i.element.el === (typeof t == "string" ? document.querySelector(t) : t));
        n && (n.element.events[e] = s)
    }

    init() {
        this.createCollection(window.$hsAccordionCollection, this), this.toggle.addEventListener("click", e => {
            e.stopPropagation(), this.el.classList.contains("active") ? this.hide() : this.show()
        })
    }

    show() {
        if (this.group && !this.isAlwaysOpened && this.group.querySelector(":scope > .hs-accordion.active") && this.group.querySelector(":scope > .hs-accordion.active") !== this.el && window.$hsAccordionCollection.find(t => t.element.el === this.group.querySelector(":scope > .hs-accordion.active")).element.hide(), this.el.classList.contains("active")) return !1;
        this.el.classList.add("active"), this.content.style.display = "block", this.content.style.height = "0", setTimeout(() => {
            this.content.style.height = `${this.content.scrollHeight}px`
        }), H(this.content, () => {
            this.content.style.display = "block", this.content.style.height = "", this.fireEvent("open", this.el), E("open.hs.accordion", this.el, this.el)
        })
    }

    hide() {
        if (!this.el.classList.contains("active")) return !1;
        this.el.classList.remove("active"), this.content.style.height = `${this.content.scrollHeight}px`, setTimeout(() => {
            this.content.style.height = "0"
        }), H(this.content, () => {
            this.content.style.display = "", this.content.style.height = "0", this.fireEvent("close", this.el), E("close.hs.accordion", this.el, this.el)
        })
    }
}

window.addEventListener("load", () => {
    fe.autoInit(), document.querySelectorAll(".hs-accordion-treeview-root").length && fe.treeView()
});
typeof window < "u" && (window.HSAccordion = fe);/*
 * HSCarousel
 * @version: 2.1.0
 * @author: HTMLStream
 * @license: Licensed under MIT (https://preline.co/docs/license.html)
 * Copyright 2023 HTMLStream
 */
class $e extends k {
    constructor(e, t) {
        var r, l, a;
        super(e, t);
        const s = e.getAttribute("data-hs-carousel"), i = {...s ? JSON.parse(s) : {}, ...t};
        this.currentIndex = i.currentIndex || 0, this.loadingClasses = i.loadingClasses ? `${i.loadingClasses}`.split(",") : null, this.loadingClassesRemove = (r = this.loadingClasses) != null && r[0] ? this.loadingClasses[0].split(" ") : "opacity-0", this.loadingClassesAdd = (l = this.loadingClasses) != null && l[1] ? this.loadingClasses[1].split(" ") : "", this.afterLoadingClassesAdd = (a = this.loadingClasses) != null && a[2] ? this.loadingClasses[2].split(" ") : "", this.isAutoPlay = typeof i.isAutoPlay < "u" ? i.isAutoPlay : !1, this.speed = i.speed || 4e3, this.isInfiniteLoop = typeof i.isInfiniteLoop < "u" ? i.isInfiniteLoop : !0, this.inner = this.el.querySelector(".hs-carousel-body") || null, this.slides = this.el.querySelectorAll(".hs-carousel-slide") || [], this.prev = this.el.querySelector(".hs-carousel-prev") || null, this.next = this.el.querySelector(".hs-carousel-next") || null, this.dots = this.el.querySelectorAll(".hs-carousel-pagination > *") || null, this.sliderWidth = this.inner.parentElement.clientWidth, this.touchX = {
            start: 0,
            end: 0
        }, this.init()
    }

    static getInstance(e, t) {
        const s = window.$hsCarouselCollection.find(n => n.element.el === (typeof e == "string" ? document.querySelector(e) : e));
        return s ? t ? s : s.element : null
    }

    static autoInit() {
        window.$hsCarouselCollection || (window.$hsCarouselCollection = []), document.querySelectorAll("[data-hs-carousel]:not(.--prevent-on-load-init)").forEach(e => {
            window.$hsCarouselCollection.find(t => {
                var s;
                return ((s = t == null ? void 0 : t.element) == null ? void 0 : s.el) === e
            }) || new $e(e)
        })
    }

    init() {
        this.createCollection(window.$hsCarouselCollection, this), this.inner && (this.calculateWidth(), this.loadingClassesRemove && (typeof this.loadingClassesRemove == "string" ? this.inner.classList.remove(this.loadingClassesRemove) : this.inner.classList.remove(...this.loadingClassesRemove)), this.loadingClassesAdd && (typeof this.loadingClassesAdd == "string" ? this.inner.classList.add(this.loadingClassesAdd) : this.inner.classList.add(...this.loadingClassesAdd))), this.prev && this.prev.addEventListener("click", () => {
            this.goToPrev(), this.isAutoPlay && (this.resetTimer(), this.setTimer())
        }), this.next && this.next.addEventListener("click", () => {
            this.goToNext(), this.isAutoPlay && (this.resetTimer(), this.setTimer())
        }), this.dots && this.dots.forEach((e, t) => e.addEventListener("click", () => {
            this.goTo(t), this.isAutoPlay && (this.resetTimer(), this.setTimer())
        })), this.slides.length && (this.addCurrentClass(), this.isInfiniteLoop || this.addDisabledClass(), this.isAutoPlay && this.autoPlay()), this.inner && this.afterLoadingClassesAdd && setTimeout(() => {
            typeof this.afterLoadingClassesAdd == "string" ? this.inner.classList.add(this.afterLoadingClassesAdd) : this.inner.classList.add(...this.afterLoadingClassesAdd)
        }), this.el.classList.add("init"), this.el.addEventListener("touchstart", e => {
            this.touchX.start = e.changedTouches[0].screenX
        }), this.el.addEventListener("touchend", e => {
            this.touchX.end = e.changedTouches[0].screenX, this.detectDirection()
        }), this.observeResize()
    }

    observeResize() {
        new ResizeObserver(() => this.recalculateWidth()).observe(document.querySelector("body"))
    }

    calculateWidth() {
        this.inner.style.width = `${this.sliderWidth * this.slides.length}px`, this.inner.style.transform = `translate(-${this.currentIndex * this.sliderWidth}px, 0px)`, this.slides.forEach(e => {
            e.style.width = `${this.sliderWidth}px`
        })
    }

    addCurrentClass() {
        this.slides.forEach((e, t) => {
            t === this.currentIndex ? e.classList.add("active") : e.classList.remove("active")
        }), this.dots && this.dots.forEach((e, t) => {
            t === this.currentIndex ? e.classList.add("active") : e.classList.remove("active")
        })
    }

    addDisabledClass() {
        if (!this.prev || !this.next) return !1;
        this.currentIndex === 0 ? (this.next.classList.remove("disabled"), this.prev.classList.add("disabled")) : this.currentIndex === this.slides.length - 1 ? (this.prev.classList.remove("disabled"), this.next.classList.add("disabled")) : (this.prev.classList.remove("disabled"), this.next.classList.remove("disabled"))
    }

    autoPlay() {
        this.setTimer()
    }

    setTimer() {
        this.timer = setInterval(() => {
            this.currentIndex === this.slides.length - 1 ? this.goTo(0) : this.goToNext()
        }, this.speed)
    }

    resetTimer() {
        clearInterval(this.timer)
    }

    detectDirection() {
        const {start: e, end: t} = this.touchX;
        t < e && this.goToNext(), t > e && this.goToPrev()
    }

    recalculateWidth() {
        this.sliderWidth = this.inner.parentElement.clientWidth, this.calculateWidth()
    }

    goToPrev() {
        this.currentIndex === 0 && this.isInfiniteLoop ? (this.currentIndex = this.slides.length - 1, this.inner.style.transform = `translate(-${this.currentIndex * this.sliderWidth}px, 0px)`, this.addCurrentClass()) : this.currentIndex !== 0 && (this.currentIndex -= 1, this.inner.style.transform = `translate(-${this.currentIndex * this.sliderWidth}px, 0px)`, this.addCurrentClass(), this.addDisabledClass())
    }

    goToNext() {
        this.currentIndex === this.slides.length - 1 && this.isInfiniteLoop ? (this.currentIndex = 0, this.inner.style.transform = `translate(-${this.currentIndex * this.sliderWidth}px, 0px)`, this.addCurrentClass()) : this.currentIndex < this.slides.length - 1 && (this.currentIndex += 1, this.inner.style.transform = `translate(-${this.currentIndex * this.sliderWidth}px, 0px)`, this.addCurrentClass(), this.addDisabledClass())
    }

    goTo(e) {
        this.currentIndex = e, this.inner.style.transform = `translate(-${this.currentIndex * this.sliderWidth}px, 0px)`, this.addCurrentClass(), this.isInfiniteLoop || this.addDisabledClass()
    }
}

window.addEventListener("load", () => {
    $e.autoInit()
});
window.addEventListener("resize", () => {
    if (!window.$hsCarouselCollection) return !1;
    window.$hsCarouselCollection.forEach(o => {
        o.element.recalculateWidth()
    })
});
typeof window < "u" && (window.HSCarousel = $e);/*
 * HSCollapse
 * @version: 2.1.0
 * @author: HTMLStream
 * @license: Licensed under MIT (https://preline.co/docs/license.html)
 * Copyright 2023 HTMLStream
 */
class Ne extends k {
    constructor(e, t, s) {
        super(e, t, s), this.contentId = this.el.dataset.hsCollapse, this.content = document.querySelector(this.contentId), this.animationInProcess = !1, this.content && this.init()
    }

    static getInstance(e, t = !1) {
        const s = window.$hsCollapseCollection.find(n => n.element.el === (typeof e == "string" ? document.querySelector(e) : e));
        return s ? t ? s : s.element.el : null
    }

    static autoInit() {
        window.$hsCollapseCollection || (window.$hsCollapseCollection = []), document.querySelectorAll(".hs-collapse-toggle:not(.--prevent-on-load-init)").forEach(e => {
            window.$hsCollapseCollection.find(t => {
                var s;
                return ((s = t == null ? void 0 : t.element) == null ? void 0 : s.el) === e
            }) || new Ne(e)
        })
    }

    static show(e) {
        const t = window.$hsCollapseCollection.find(s => s.element.el === (typeof e == "string" ? document.querySelector(e) : e));
        t && t.element.content.classList.contains("hidden") && t.element.show()
    }

    static hide(e) {
        const t = window.$hsCollapseCollection.find(s => s.element.el === (typeof e == "string" ? document.querySelector(e) : e));
        t && !t.element.content.classList.contains("hidden") && t.element.hide()
    }

    static on(e, t, s) {
        const n = window.$hsCollapseCollection.find(i => i.element.el === (typeof t == "string" ? document.querySelector(t) : t));
        n && (n.element.events[e] = s)
    }

    init() {
        this.createCollection(window.$hsCollapseCollection, this), this.el.addEventListener("click", () => {
            this.content.classList.contains("open") ? this.hide() : this.show()
        })
    }

    hideAllMegaMenuItems() {
        this.content.querySelectorAll(".hs-mega-menu-content.block").forEach(e => {
            e.classList.remove("block"), e.classList.add("hidden")
        })
    }

    show() {
        if (this.animationInProcess || this.el.classList.contains("open")) return !1;
        this.animationInProcess = !0, this.el.classList.add("open"), this.content.classList.add("open"), this.content.classList.remove("hidden"), this.content.style.height = "0", setTimeout(() => {
            this.content.style.height = `${this.content.scrollHeight}px`, this.fireEvent("beforeOpen", this.el), E("beforeOpen.hs.collapse", this.el, this.el)
        }), H(this.content, () => {
            this.content.style.height = "", this.fireEvent("open", this.el), E("open.hs.collapse", this.el, this.el), this.animationInProcess = !1
        })
    }

    hide() {
        if (this.animationInProcess || !this.el.classList.contains("open")) return !1;
        this.animationInProcess = !0, this.el.classList.remove("open"), this.content.style.height = `${this.content.scrollHeight}px`, setTimeout(() => {
            this.content.style.height = "0"
        }), this.content.classList.remove("open"), H(this.content, () => {
            this.content.classList.add("hidden"), this.content.style.height = "", this.fireEvent("hide", this.el), E("hide.hs.collapse", this.el, this.el), this.animationInProcess = !1
        }), this.content.querySelectorAll(".hs-mega-menu-content.block").length && this.hideAllMegaMenuItems()
    }
}

window.addEventListener("load", () => {
    Ne.autoInit()
});
typeof window < "u" && (window.HSCollapse = Ne);
const Kt = {
        auto: "auto",
        "auto-start": "auto-start",
        "auto-end": "auto-end",
        top: "top",
        "top-left": "top-start",
        "top-right": "top-end",
        bottom: "bottom",
        "bottom-left": "bottom-start",
        "bottom-right": "bottom-end",
        right: "right",
        "right-start": "right-start",
        "right-end": "right-end",
        left: "left",
        "left-start": "left-start",
        "left-end": "left-end"
    }, Os = ["Escape", "ArrowUp", "ArrowDown", "Home", "End", "Enter"],
    Bs = ["ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight", "Home", "End"],
    $s = ["ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight", "Home", "End", "Escape", "Enter", "Tab"],
    Ns = ["ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight", "Home", "End", "Escape", "Enter"],
    Pt = {sm: 640, md: 768, lg: 1024, xl: 1280, "2xl": 1536};/*
 * HSComboBox
 * @version: 2.1.0
 * @author: HTMLStream
 * @license: Licensed under MIT (https://preline.co/docs/license.html)
 * Copyright 2023 HTMLStream
 */
class X extends k {
    constructor(e, t, s) {
        super(e, t, s);
        const n = e.getAttribute("data-hs-combo-box"), r = {...n ? JSON.parse(n) : {}, ...t};
        this.gap = 5, this.viewport = (typeof (r == null ? void 0 : r.viewport) == "string" ? document.querySelector(r == null ? void 0 : r.viewport) : r == null ? void 0 : r.viewport) ?? null, this.preventVisibility = (r == null ? void 0 : r.preventVisibility) ?? !1, this.apiUrl = (r == null ? void 0 : r.apiUrl) ?? null, this.apiDataPart = (r == null ? void 0 : r.apiDataPart) ?? null, this.apiQuery = (r == null ? void 0 : r.apiQuery) ?? null, this.apiSearchQuery = (r == null ? void 0 : r.apiSearchQuery) ?? null, this.apiHeaders = (r == null ? void 0 : r.apiHeaders) ?? {}, this.apiGroupField = (r == null ? void 0 : r.apiGroupField) ?? null, this.outputItemTemplate = (r == null ? void 0 : r.outputItemTemplate) ?? `<div class="cursor-pointer py-2 px-4 w-full text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800" data-hs-combo-box-output-item>
				<div class="flex justify-between items-center w-full">
					<span data-hs-combo-box-search-text></span>
					<span class="hidden hs-combo-box-selected:block">
						<svg class="flex-shrink-0 size-3.5 text-blue-600 dark:text-blue-500" xmlns="http:.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<polyline points="20 6 9 17 4 12"></polyline>
						</svg>
					</span>
				</div>
			</div>`, this.outputEmptyTemplate = (r == null ? void 0 : r.outputEmptyTemplate) ?? '<div class="py-2 px-4 w-full text-sm text-gray-800 rounded-lg dark:bg-neutral-900 dark:text-neutral-200">Nothing found...</div>', this.outputLoaderTemplate = (r == null ? void 0 : r.outputLoaderTemplate) ?? `<div class="flex justify-center items-center py-2 px-4 text-sm text-gray-800 rounded-lg bg-white dark:bg-neutral-900 dark:text-neutral-200">
				<div class="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500" role="status" aria-label="loading">
					<span class="sr-only">Loading...</span>
				</div>
			</div>`, this.groupingType = (r == null ? void 0 : r.groupingType) ?? null, this.groupingTitleTemplate = (r == null ? void 0 : r.groupingTitleTemplate) ?? (this.groupingType === "default" ? '<div class="block mb-1 text-xs font-semibold uppercase text-blue-600 dark:text-blue-500"></div>' : '<button type="button" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold whitespace-nowrap rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"></button>'), this.tabsWrapperTemplate = (r == null ? void 0 : r.tabsWrapperTemplate) ?? '<div class="overflow-x-auto p-4"></div>', this.preventSelection = (r == null ? void 0 : r.preventSelection) ?? !1, this.preventAutoPosition = (r == null ? void 0 : r.preventAutoPosition) ?? !1, this.isOpenOnFocus = (r == null ? void 0 : r.isOpenOnFocus) ?? !1, this.input = this.el.querySelector("[data-hs-combo-box-input]") ?? null, this.output = this.el.querySelector("[data-hs-combo-box-output]") ?? null, this.itemsWrapper = this.el.querySelector("[data-hs-combo-box-output-items-wrapper]") ?? null, this.items = Array.from(this.el.querySelectorAll("[data-hs-combo-box-output-item]")) ?? [], this.tabs = [], this.toggle = this.el.querySelector("[data-hs-combo-box-toggle]") ?? null, this.toggleClose = this.el.querySelector("[data-hs-combo-box-close]") ?? null, this.toggleOpen = this.el.querySelector("[data-hs-combo-box-open]") ?? null, this.outputPlaceholder = null, this.selected = this.value = this.el.querySelector("[data-hs-combo-box-input]").value ?? "", this.isOpened = !1, this.isCurrent = !1, this.animationInProcess = !1, this.selectedGroup = "all", this.init()
    }

    static getInstance(e, t) {
        const s = window.$hsComboBoxCollection.find(n => n.element.el === (typeof e == "string" ? document.querySelector(e) : e));
        return s ? t ? s : s.element : null
    }

    static autoInit() {
        window.$hsComboBoxCollection || (window.$hsComboBoxCollection = []), document.querySelectorAll("[data-hs-combo-box]:not(.--prevent-on-load-init)").forEach(e => {
            if (!window.$hsComboBoxCollection.find(t => {
                var s;
                return ((s = t == null ? void 0 : t.element) == null ? void 0 : s.el) === e
            })) {
                const t = e.getAttribute("data-hs-combo-box"), s = t ? JSON.parse(t) : {};
                new X(e, s)
            }
        }), window.$hsComboBoxCollection && (window.addEventListener("click", e => {
            const t = e.target;
            X.closeCurrentlyOpened(t)
        }), document.addEventListener("keydown", e => X.accessibility(e)))
    }

    static close(e) {
        const t = window.$hsComboBoxCollection.find(s => s.element.el === (typeof e == "string" ? document.querySelector(e) : e));
        t && t.element.isOpened && t.element.close()
    }

    static closeCurrentlyOpened(e = null) {
        if (!e.closest("[data-hs-combo-box].active")) {
            const t = window.$hsComboBoxCollection.filter(s => s.element.isOpened) || null;
            t && t.forEach(s => {
                s.element.close()
            })
        }
    }

    static getPreparedItems(e = !1, t) {
        return t ? (e ? Array.from(t.querySelectorAll(":scope > *:not(.--exclude-accessibility)")).filter(i => i.style.display !== "none").reverse() : Array.from(t.querySelectorAll(":scope > *:not(.--exclude-accessibility)")).filter(i => i.style.display !== "none")).filter(i => !i.classList.contains("disabled")) : null
    }

    static setHighlighted(e, t, s) {
        t.focus(), s.value = t.querySelector("[data-hs-combo-box-value]").getAttribute("data-hs-combo-box-search-text"), e && e.classList.remove("hs-combo-box-output-item-highlighted"), t.classList.add("hs-combo-box-output-item-highlighted")
    }

    static accessibility(e) {
        if (window.$hsComboBoxCollection.find(s => s.element.isOpened) && Ns.includes(e.code) && !e.metaKey) switch (e.code) {
            case"Escape":
                e.preventDefault(), this.onEscape();
                break;
            case"ArrowUp":
                e.preventDefault(), this.onArrow();
                break;
            case"ArrowDown":
                e.preventDefault(), this.onArrow(!1);
                break;
            case"Home":
                e.preventDefault(), this.onStartEnd();
                break;
            case"End":
                e.preventDefault(), this.onStartEnd(!1);
                break;
            case"Enter":
                e.preventDefault(), this.onEnter(e);
                break
        }
    }

    static onEscape() {
        const e = window.$hsComboBoxCollection.find(t => !t.element.preventVisibility && t.element.isOpened);
        e && (e.element.close(), e.element.input.blur())
    }

    static onArrow(e = !0) {
        const t = window.$hsComboBoxCollection.find(s => s.element.preventVisibility ? s.element.isCurrent : s.element.isOpened);
        if (t) {
            const s = t.element.itemsWrapper ?? t.element.output;
            if (!s) return !1;
            const n = X.getPreparedItems(e, s), i = s.querySelector(".hs-combo-box-output-item-highlighted");
            let r = null;
            i || n[0].classList.add("hs-combo-box-output-item-highlighted");
            let l = n.findIndex(a => a === i);
            l + 1 < n.length && l++, r = n[l], X.setHighlighted(i, r, t.element.input)
        }
    }

    static onStartEnd(e = !0) {
        const t = window.$hsComboBoxCollection.find(s => s.element.preventVisibility ? s.element.isCurrent : s.element.isOpened);
        if (t) {
            const s = t.element.itemsWrapper ?? t.element.output;
            if (!s) return !1;
            const n = X.getPreparedItems(e, s), i = s.querySelector(".hs-combo-box-output-item-highlighted");
            n.length && X.setHighlighted(i, n[0], t.element.input)
        }
    }

    static onEnter(e) {
        const t = e.target,
            s = window.$hsComboBoxCollection.find(i => !gt(i.element.el) && e.target.closest("[data-hs-combo-box]") === i.element.el),
            n = s.element.el.querySelector(".hs-combo-box-output-item-highlighted a");
        t.hasAttribute("data-hs-combo-box-input") ? (s.element.close(), t.blur()) : (s.element.preventSelection || s.element.setSelectedByValue(s.element.valuesBySelector(e.target)), s.element.preventSelection && n && window.location.assign(n.getAttribute("href")), s.element.close(s.element.preventSelection ? null : e.target.querySelector("[data-hs-combo-box-value]").getAttribute("data-hs-combo-box-search-text")))
    }

    init() {
        this.createCollection(window.$hsComboBoxCollection, this), this.build()
    }

    build() {
        this.buildInput(), this.groupingType && this.setGroups(), this.buildItems(), this.preventVisibility && (this.isOpened = !0, this.preventAutoPosition || this.recalculateDirection()), this.toggle && this.buildToggle(), this.toggleClose && this.buildToggleClose(), this.toggleOpen && this.buildToggleOpen()
    }

    setResultAndRender(e = "") {
        this.setResults(e), this.apiSearchQuery && this.itemsFromJson()
    }

    buildInput() {
        this.isOpenOnFocus && this.input.addEventListener("focus", () => {
            this.isOpened || (this.setResultAndRender(), this.open())
        }), this.input.addEventListener("input", Ze(e => {
            this.setResultAndRender(e.target.value), this.isOpened || this.open()
        }))
    }

    buildItems() {
        this.apiUrl ? this.itemsFromJson() : (this.itemsWrapper ? this.itemsWrapper.innerHTML = "" : this.output.innerHTML = "", this.itemsFromHtml())
    }

    setResults(e) {
        this.value = e, this.resultItems(), this.hasVisibleItems() ? this.destroyOutputPlaceholder() : this.buildOutputPlaceholder()
    }

    isItemExists(e) {
        return this.items.some(t => Array.from(t.querySelectorAll("[data-hs-combo-box-search-text]")).some(s => s.getAttribute("data-hs-combo-box-search-text") === e[s.getAttribute("data-hs-combo-box-output-item-field")]))
    }

    isTextExists(e, t) {
        const s = t.map(n => n.toLowerCase());
        return Array.from(e.querySelectorAll("[data-hs-combo-box-search-text]")).some(n => s.includes(n.getAttribute("data-hs-combo-box-search-text").toLowerCase()))
    }

    isTextExistsAny(e, t) {
        return Array.from(e.querySelectorAll("[data-hs-combo-box-search-text]")).some(s => s.getAttribute("data-hs-combo-box-search-text").toLowerCase().includes(t.toLowerCase()))
    }

    valuesBySelector(e) {
        return Array.from(e.querySelectorAll("[data-hs-combo-box-search-text]")).reduce((t, s) => [...t, s.getAttribute("data-hs-combo-box-search-text")], [])
    }

    buildOutputLoader() {
        if (this.outputLoader) return !1;
        this.outputLoader = w(this.outputLoaderTemplate), this.items.length || this.outputPlaceholder ? (this.outputLoader.style.position = "absolute", this.outputLoader.style.top = "0", this.outputLoader.style.bottom = "0", this.outputLoader.style.left = "0", this.outputLoader.style.right = "0", this.outputLoader.style.zIndex = "2") : (this.outputLoader.style.position = "", this.outputLoader.style.top = "", this.outputLoader.style.bottom = "", this.outputLoader.style.left = "", this.outputLoader.style.right = "", this.outputLoader.style.zIndex = "", this.outputLoader.style.height = "30px"), this.output.append(this.outputLoader)
    }

    destroyOutputLoader() {
        this.outputLoader && this.outputLoader.remove(), this.outputLoader = null
    }

    async itemsFromJson() {
        this.buildOutputLoader();
        try {
            const e = `${this.apiQuery}`, t = `${this.apiSearchQuery}=${this.value.toLowerCase()}`;
            let s = this.apiUrl;
            this.apiQuery && this.apiSearchQuery ? s += `?${t}&${e}` : this.apiQuery ? s += `?${e}` : this.apiSearchQuery && (s += `?${t}`);
            let i = await (await fetch(s, this.apiHeaders)).json();
            this.apiDataPart && (i = i[this.apiDataPart]), this.apiSearchQuery && (this.items = []), this.itemsWrapper ? this.itemsWrapper.innerHTML = "" : this.output.innerHTML = "", this.groupingType === "tabs" ? (this.setApiGroups(i), this.groupTabsRender(), this.jsonItemsRender(i)) : this.groupingType === "default" ? (this.setApiGroups(i), this.groups.forEach(r => {
                const l = w(this.groupingTitleTemplate);
                l.setAttribute("data-hs-combo-box-group-title", r.name), l.classList.add("--exclude-accessibility"), l.innerText = r.title;
                const a = i.filter(c => c[this.apiGroupField] === r.name);
                this.itemsWrapper ? this.itemsWrapper.append(l) : this.output.append(l), this.jsonItemsRender(a)
            })) : this.jsonItemsRender(i), this.setResults(this.input.value)
        } catch (e) {
            console.error(e)
        }
        this.destroyOutputLoader()
    }

    jsonItemsRender(e) {
        e.forEach((t, s) => {
            if (this.isItemExists(t)) return !1;
            const n = w(this.outputItemTemplate);
            n.querySelectorAll("[data-hs-combo-box-search-text]").forEach(i => {
                i.textContent = t[i.getAttribute("data-hs-combo-box-output-item-field")] ?? "", i.setAttribute("data-hs-combo-box-search-text", t[i.getAttribute("data-hs-combo-box-output-item-field")] ?? "")
            }), n.querySelectorAll("[data-hs-combo-box-output-item-attr]").forEach(i => {
                JSON.parse(i.getAttribute("data-hs-combo-box-output-item-attr")).forEach(l => {
                    i.setAttribute(l.attr, t[l.valueFrom])
                })
            }), n.setAttribute("tabIndex", `${s}`), (this.groupingType === "tabs" || this.groupingType === "default") && n.setAttribute("data-hs-combo-box-output-item", `{"group": {"name": "${t[this.apiGroupField]}", "title": "${t[this.apiGroupField]}"}}`), this.items = [...this.items, n], this.preventSelection || n.addEventListener("click", () => {
                this.close(n.querySelector("[data-hs-combo-box-value]").getAttribute("data-hs-combo-box-search-text")), this.setSelectedByValue(this.valuesBySelector(n))
            }), this.appendItemsToWrapper(n)
        })
    }

    setGroups() {
        const e = [];
        this.items.forEach(t => {
            const {group: s} = JSON.parse(t.getAttribute("data-hs-combo-box-output-item"));
            e.some(n => (n == null ? void 0 : n.name) === s.name) || e.push(s)
        }), this.groups = e
    }

    setCurrent() {
        window.$hsComboBoxCollection.length && (window.$hsComboBoxCollection.map(e => e.element.isCurrent = !1), this.isCurrent = !0)
    }

    setApiGroups(e) {
        const t = [];
        e.forEach(s => {
            const n = s[this.apiGroupField];
            t.some(i => i.name === n) || t.push({name: n, title: n})
        }), this.groups = t
    }

    sortItems() {
        const e = (t, s) => {
            const n = t.querySelector("[data-hs-combo-box-value]").getAttribute("data-hs-combo-box-search-text"),
                i = s.querySelector("[data-hs-combo-box-value]").getAttribute("data-hs-combo-box-search-text");
            return n < i ? -1 : n > i ? 1 : 0
        };
        return this.items.sort(e)
    }

    itemRender(e) {
        const t = e.querySelector("[data-hs-combo-box-value]").getAttribute("data-hs-combo-box-search-text");
        this.itemsWrapper ? this.itemsWrapper.append(e) : this.output.append(e), this.preventSelection || e.addEventListener("click", () => {
            this.close(t), this.setSelectedByValue(this.valuesBySelector(e))
        })
    }

    plainRender(e) {
        e.forEach(t => {
            this.itemRender(t)
        })
    }

    groupTabsRender() {
        const e = w(this.tabsWrapperTemplate), t = w('<div class="flex flex-nowrap gap-x-2"></div>');
        e.append(t), this.output.insertBefore(e, this.output.firstChild);
        const s = w(this.groupingTitleTemplate);
        s.setAttribute("data-hs-combo-box-group-title", "all"), s.classList.add("--exclude-accessibility", "active"), s.innerText = "All", this.tabs = [...this.tabs, s], t.append(s), s.addEventListener("click", () => {
            this.selectedGroup = "all";
            const n = this.tabs.find(i => i.getAttribute("data-hs-combo-box-group-title") === this.selectedGroup);
            this.tabs.forEach(i => i.classList.remove("active")), n.classList.add("active"), this.setItemsVisibility()
        }), this.groups.forEach(n => {
            const i = w(this.groupingTitleTemplate);
            i.setAttribute("data-hs-combo-box-group-title", n.name), i.classList.add("--exclude-accessibility"), i.innerText = n.title, this.tabs = [...this.tabs, i], t.append(i), i.addEventListener("click", () => {
                this.selectedGroup = n.name;
                const r = this.tabs.find(l => l.getAttribute("data-hs-combo-box-group-title") === this.selectedGroup);
                this.tabs.forEach(l => l.classList.remove("active")), r.classList.add("active"), this.setItemsVisibility()
            })
        })
    }

    groupDefaultRender() {
        this.groups.forEach(e => {
            const t = w(this.groupingTitleTemplate);
            t.setAttribute("data-hs-combo-box-group-title", e.name), t.classList.add("--exclude-accessibility"), t.innerText = e.title, this.itemsWrapper ? this.itemsWrapper.append(t) : this.output.append(t);
            const s = this.sortItems().filter(n => {
                const {group: i} = JSON.parse(n.getAttribute("data-hs-combo-box-output-item"));
                return i.name === e.name
            });
            this.plainRender(s)
        })
    }

    itemsFromHtml() {
        if (this.groupingType === "default") this.groupDefaultRender(); else if (this.groupingType === "tabs") {
            const e = this.sortItems();
            this.groupTabsRender(), this.plainRender(e)
        } else {
            const e = this.sortItems();
            this.plainRender(e)
        }
        this.setResults(this.input.value)
    }

    buildToggle() {
        this.toggle.addEventListener("click", () => {
            this.isOpened ? this.close() : this.open(this.toggle.getAttribute("data-hs-combo-box-toggle"))
        })
    }

    buildToggleClose() {
        this.toggleClose.addEventListener("click", () => this.close())
    }

    buildToggleOpen() {
        this.toggleOpen.addEventListener("click", () => this.open())
    }

    setSelectedByValue(e) {
        this.items.forEach(t => {
            this.isTextExists(t, e) ? t.classList.add("selected") : t.classList.remove("selected")
        })
    }

    setValue(e) {
        this.selected = e, this.value = e, this.input.value = e, this.fireEvent("select", this.el), E("select.hs.combobox", this.el, this.value)
    }

    setItemsVisibility() {
        this.groupingType === "tabs" && this.selectedGroup !== "all" && this.items.forEach(t => {
            t.style.display = "none"
        });
        const e = this.groupingType === "tabs" ? this.selectedGroup === "all" ? this.items : this.items.filter(t => {
            const {group: s} = JSON.parse(t.getAttribute("data-hs-combo-box-output-item"));
            return s.name === this.selectedGroup
        }) : this.items;
        this.groupingType === "tabs" && this.selectedGroup !== "all" && e.forEach(t => {
            t.style.display = "block"
        }), e.forEach(t => {
            this.isTextExistsAny(t, this.value) ? t.style.display = "block" : t.style.display = "none"
        }), this.groupingType === "default" && this.output.querySelectorAll("[data-hs-combo-box-group-title]").forEach(t => {
            const s = t.getAttribute("data-hs-combo-box-group-title");
            this.items.filter(i => {
                const {group: r} = JSON.parse(i.getAttribute("data-hs-combo-box-output-item"));
                return r.name === s && i.style.display === "block"
            }).length ? t.style.display = "block" : t.style.display = "none"
        })
    }

    hasVisibleItems() {
        return this.items.length ? this.items.some(e => e.style.display === "block") : !1
    }

    appendItemsToWrapper(e) {
        this.itemsWrapper ? this.itemsWrapper.append(e) : this.output.append(e)
    }

    buildOutputPlaceholder() {
        this.outputPlaceholder || (this.outputPlaceholder = w(this.outputEmptyTemplate)), this.appendItemsToWrapper(this.outputPlaceholder)
    }

    destroyOutputPlaceholder() {
        this.outputPlaceholder && this.outputPlaceholder.remove(), this.outputPlaceholder = null
    }

    resultItems() {
        if (!this.items.length) return !1;
        this.setItemsVisibility(), this.setSelectedByValue([this.selected])
    }

    setValueAndOpen(e) {
        this.value = e, this.items.length && this.setItemsVisibility()
    }

    open(e) {
        if (this.animationInProcess || (typeof e < "u" && this.setValueAndOpen(e), this.preventVisibility)) return !1;
        this.animationInProcess = !0, this.output.style.display = "block", this.preventAutoPosition || this.recalculateDirection(), setTimeout(() => {
            this.el.classList.add("active"), this.animationInProcess = !1
        }), this.isOpened = !0
    }

    setValueAndClear(e) {
        e ? this.setValue(e) : this.setValue(this.selected), this.outputPlaceholder && this.destroyOutputPlaceholder()
    }

    close(e) {
        if (this.animationInProcess) return !1;
        if (this.preventVisibility) return this.setValueAndClear(e), !1;
        this.animationInProcess = !0, this.el.classList.remove("active"), this.preventAutoPosition || (this.output.classList.remove("bottom-full", "top-full"), this.output.style.marginTop = "", this.output.style.marginBottom = ""), H(this.output, () => {
            this.output.style.display = "none", this.setValueAndClear(e), this.animationInProcess = !1
        }), this.isOpened = !1
    }

    recalculateDirection() {
        mt(this.output, this.input, "bottom", this.gap, this.viewport) ? (this.output.classList.remove("bottom-full"), this.output.style.marginBottom = "", this.output.classList.add("top-full"), this.output.style.marginTop = `${this.gap}px`) : (this.output.classList.remove("top-full"), this.output.style.marginTop = "", this.output.classList.add("bottom-full"), this.output.style.marginBottom = `${this.gap}px`)
    }
}

window.addEventListener("load", () => {
    X.autoInit()
});
document.addEventListener("scroll", () => {
    if (!window.$hsComboBoxCollection) return !1;
    const o = window.$hsComboBoxCollection.find(e => e.element.isOpened);
    o && !o.element.preventAutoPosition && o.element.recalculateDirection()
});
typeof window < "u" && (window.HSComboBox = X);
var P = "top", F = "bottom", z = "right", D = "left", vt = "auto", qe = [P, F, z, D], me = "start", Te = "end",
    qs = "clippingParents", Zt = "viewport", Ee = "popper", Ps = "reference", Dt = qe.reduce(function (o, e) {
        return o.concat([e + "-" + me, e + "-" + Te])
    }, []), es = [].concat(qe, [vt]).reduce(function (o, e) {
        return o.concat([e, e + "-" + me, e + "-" + Te])
    }, []), Ds = "beforeRead", Ws = "read", Ms = "afterRead", Rs = "beforeMain", Vs = "main", Hs = "afterMain",
    Fs = "beforeWrite", zs = "write", js = "afterWrite", Us = [Ds, Ws, Ms, Rs, Vs, Hs, Fs, zs, js];

function _(o) {
    return o ? (o.nodeName || "").toLowerCase() : null
}

function M(o) {
    if (o == null) return window;
    if (o.toString() !== "[object Window]") {
        var e = o.ownerDocument;
        return e && e.defaultView || window
    }
    return o
}

function he(o) {
    var e = M(o).Element;
    return o instanceof e || o instanceof Element
}

function V(o) {
    var e = M(o).HTMLElement;
    return o instanceof e || o instanceof HTMLElement
}

function yt(o) {
    if (typeof ShadowRoot > "u") return !1;
    var e = M(o).ShadowRoot;
    return o instanceof e || o instanceof ShadowRoot
}

function Xs(o) {
    var e = o.state;
    Object.keys(e.elements).forEach(function (t) {
        var s = e.styles[t] || {}, n = e.attributes[t] || {}, i = e.elements[t];
        !V(i) || !_(i) || (Object.assign(i.style, s), Object.keys(n).forEach(function (r) {
            var l = n[r];
            l === !1 ? i.removeAttribute(r) : i.setAttribute(r, l === !0 ? "" : l)
        }))
    })
}

function Js(o) {
    var e = o.state, t = {
        popper: {position: e.options.strategy, left: "0", top: "0", margin: "0"},
        arrow: {position: "absolute"},
        reference: {}
    };
    return Object.assign(e.elements.popper.style, t.popper), e.styles = t, e.elements.arrow && Object.assign(e.elements.arrow.style, t.arrow), function () {
        Object.keys(e.elements).forEach(function (s) {
            var n = e.elements[s], i = e.attributes[s] || {},
                r = Object.keys(e.styles.hasOwnProperty(s) ? e.styles[s] : t[s]), l = r.reduce(function (a, c) {
                    return a[c] = "", a
                }, {});
            !V(n) || !_(n) || (Object.assign(n.style, l), Object.keys(i).forEach(function (a) {
                n.removeAttribute(a)
            }))
        })
    }
}

const _s = {name: "applyStyles", enabled: !0, phase: "write", fn: Xs, effect: Js, requires: ["computeStyles"]};

function J(o) {
    return o.split("-")[0]
}

var ae = Math.max, et = Math.min, ge = Math.round;

function ut() {
    var o = navigator.userAgentData;
    return o != null && o.brands && Array.isArray(o.brands) ? o.brands.map(function (e) {
        return e.brand + "/" + e.version
    }).join(" ") : navigator.userAgent
}

function ts() {
    return !/^((?!chrome|android).)*safari/i.test(ut())
}

function ve(o, e, t) {
    e === void 0 && (e = !1), t === void 0 && (t = !1);
    var s = o.getBoundingClientRect(), n = 1, i = 1;
    e && V(o) && (n = o.offsetWidth > 0 && ge(s.width) / o.offsetWidth || 1, i = o.offsetHeight > 0 && ge(s.height) / o.offsetHeight || 1);
    var r = he(o) ? M(o) : window, l = r.visualViewport, a = !ts() && t, c = (s.left + (a && l ? l.offsetLeft : 0)) / n,
        h = (s.top + (a && l ? l.offsetTop : 0)) / i, d = s.width / n, v = s.height / i;
    return {width: d, height: v, top: h, right: c + d, bottom: h + v, left: c, x: c, y: h}
}

function bt(o) {
    var e = ve(o), t = o.offsetWidth, s = o.offsetHeight;
    return Math.abs(e.width - t) <= 1 && (t = e.width), Math.abs(e.height - s) <= 1 && (s = e.height), {
        x: o.offsetLeft,
        y: o.offsetTop,
        width: t,
        height: s
    }
}

function ss(o, e) {
    var t = e.getRootNode && e.getRootNode();
    if (o.contains(e)) return !0;
    if (t && yt(t)) {
        var s = e;
        do {
            if (s && o.isSameNode(s)) return !0;
            s = s.parentNode || s.host
        } while (s)
    }
    return !1
}

function G(o) {
    return M(o).getComputedStyle(o)
}

function Ys(o) {
    return ["table", "td", "th"].indexOf(_(o)) >= 0
}

function se(o) {
    return ((he(o) ? o.ownerDocument : o.document) || window.document).documentElement
}

function it(o) {
    return _(o) === "html" ? o : o.assignedSlot || o.parentNode || (yt(o) ? o.host : null) || se(o)
}

function Wt(o) {
    return !V(o) || G(o).position === "fixed" ? null : o.offsetParent
}

function Gs(o) {
    var e = /firefox/i.test(ut()), t = /Trident/i.test(ut());
    if (t && V(o)) {
        var s = G(o);
        if (s.position === "fixed") return null
    }
    var n = it(o);
    for (yt(n) && (n = n.host); V(n) && ["html", "body"].indexOf(_(n)) < 0;) {
        var i = G(n);
        if (i.transform !== "none" || i.perspective !== "none" || i.contain === "paint" || ["transform", "perspective"].indexOf(i.willChange) !== -1 || e && i.willChange === "filter" || e && i.filter && i.filter !== "none") return n;
        n = n.parentNode
    }
    return null
}

function Pe(o) {
    for (var e = M(o), t = Wt(o); t && Ys(t) && G(t).position === "static";) t = Wt(t);
    return t && (_(t) === "html" || _(t) === "body" && G(t).position === "static") ? e : t || Gs(o) || e
}

function wt(o) {
    return ["top", "bottom"].indexOf(o) >= 0 ? "x" : "y"
}

function Ae(o, e, t) {
    return ae(o, et(e, t))
}

function Qs(o, e, t) {
    var s = Ae(o, e, t);
    return s > t ? t : s
}

function is() {
    return {top: 0, right: 0, bottom: 0, left: 0}
}

function ns(o) {
    return Object.assign({}, is(), o)
}

function os(o, e) {
    return e.reduce(function (t, s) {
        return t[s] = o, t
    }, {})
}

var Ks = function (e, t) {
    return e = typeof e == "function" ? e(Object.assign({}, t.rects, {placement: t.placement})) : e, ns(typeof e != "number" ? e : os(e, qe))
};

function Zs(o) {
    var e, t = o.state, s = o.name, n = o.options, i = t.elements.arrow, r = t.modifiersData.popperOffsets,
        l = J(t.placement), a = wt(l), c = [D, z].indexOf(l) >= 0, h = c ? "height" : "width";
    if (!(!i || !r)) {
        var d = Ks(n.padding, t), v = bt(i), u = a === "y" ? P : D, x = a === "y" ? F : z,
            m = t.rects.reference[h] + t.rects.reference[a] - r[a] - t.rects.popper[h], f = r[a] - t.rects.reference[a],
            y = Pe(i), C = y ? a === "y" ? y.clientHeight || 0 : y.clientWidth || 0 : 0, A = m / 2 - f / 2, g = d[u],
            b = C - v[h] - d[x], p = C / 2 - v[h] / 2 + A, S = Ae(g, p, b), I = a;
        t.modifiersData[s] = (e = {}, e[I] = S, e.centerOffset = S - p, e)
    }
}

function ei(o) {
    var e = o.state, t = o.options, s = t.element, n = s === void 0 ? "[data-popper-arrow]" : s;
    n != null && (typeof n == "string" && (n = e.elements.popper.querySelector(n), !n) || ss(e.elements.popper, n) && (e.elements.arrow = n))
}

const ti = {
    name: "arrow",
    enabled: !0,
    phase: "main",
    fn: Zs,
    effect: ei,
    requires: ["popperOffsets"],
    requiresIfExists: ["preventOverflow"]
};

function ye(o) {
    return o.split("-")[1]
}

var si = {top: "auto", right: "auto", bottom: "auto", left: "auto"};

function ii(o, e) {
    var t = o.x, s = o.y, n = e.devicePixelRatio || 1;
    return {x: ge(t * n) / n || 0, y: ge(s * n) / n || 0}
}

function Mt(o) {
    var e, t = o.popper, s = o.popperRect, n = o.placement, i = o.variation, r = o.offsets, l = o.position,
        a = o.gpuAcceleration, c = o.adaptive, h = o.roundOffsets, d = o.isFixed, v = r.x, u = v === void 0 ? 0 : v,
        x = r.y, m = x === void 0 ? 0 : x, f = typeof h == "function" ? h({x: u, y: m}) : {x: u, y: m};
    u = f.x, m = f.y;
    var y = r.hasOwnProperty("x"), C = r.hasOwnProperty("y"), A = D, g = P, b = window;
    if (c) {
        var p = Pe(t), S = "clientHeight", I = "clientWidth";
        if (p === M(t) && (p = se(t), G(p).position !== "static" && l === "absolute" && (S = "scrollHeight", I = "scrollWidth")), p = p, n === P || (n === D || n === z) && i === Te) {
            g = F;
            var T = d && p === b && b.visualViewport ? b.visualViewport.height : p[S];
            m -= T - s.height, m *= a ? 1 : -1
        }
        if (n === D || (n === P || n === F) && i === Te) {
            A = z;
            var O = d && p === b && b.visualViewport ? b.visualViewport.width : p[I];
            u -= O - s.width, u *= a ? 1 : -1
        }
    }
    var B = Object.assign({position: l}, c && si), j = h === !0 ? ii({x: u, y: m}, M(t)) : {x: u, y: m};
    if (u = j.x, m = j.y, a) {
        var $;
        return Object.assign({}, B, ($ = {}, $[g] = C ? "0" : "", $[A] = y ? "0" : "", $.transform = (b.devicePixelRatio || 1) <= 1 ? "translate(" + u + "px, " + m + "px)" : "translate3d(" + u + "px, " + m + "px, 0)", $))
    }
    return Object.assign({}, B, (e = {}, e[g] = C ? m + "px" : "", e[A] = y ? u + "px" : "", e.transform = "", e))
}

function ni(o) {
    var e = o.state, t = o.options, s = t.gpuAcceleration, n = s === void 0 ? !0 : s, i = t.adaptive,
        r = i === void 0 ? !0 : i, l = t.roundOffsets, a = l === void 0 ? !0 : l, c = {
            placement: J(e.placement),
            variation: ye(e.placement),
            popper: e.elements.popper,
            popperRect: e.rects.popper,
            gpuAcceleration: n,
            isFixed: e.options.strategy === "fixed"
        };
    e.modifiersData.popperOffsets != null && (e.styles.popper = Object.assign({}, e.styles.popper, Mt(Object.assign({}, c, {
        offsets: e.modifiersData.popperOffsets,
        position: e.options.strategy,
        adaptive: r,
        roundOffsets: a
    })))), e.modifiersData.arrow != null && (e.styles.arrow = Object.assign({}, e.styles.arrow, Mt(Object.assign({}, c, {
        offsets: e.modifiersData.arrow,
        position: "absolute",
        adaptive: !1,
        roundOffsets: a
    })))), e.attributes.popper = Object.assign({}, e.attributes.popper, {"data-popper-placement": e.placement})
}

const oi = {name: "computeStyles", enabled: !0, phase: "beforeWrite", fn: ni, data: {}};
var Ye = {passive: !0};

function ri(o) {
    var e = o.state, t = o.instance, s = o.options, n = s.scroll, i = n === void 0 ? !0 : n, r = s.resize,
        l = r === void 0 ? !0 : r, a = M(e.elements.popper),
        c = [].concat(e.scrollParents.reference, e.scrollParents.popper);
    return i && c.forEach(function (h) {
        h.addEventListener("scroll", t.update, Ye)
    }), l && a.addEventListener("resize", t.update, Ye), function () {
        i && c.forEach(function (h) {
            h.removeEventListener("scroll", t.update, Ye)
        }), l && a.removeEventListener("resize", t.update, Ye)
    }
}

const li = {
    name: "eventListeners", enabled: !0, phase: "write", fn: function () {
    }, effect: ri, data: {}
};
var ai = {left: "right", right: "left", bottom: "top", top: "bottom"};

function Ge(o) {
    return o.replace(/left|right|bottom|top/g, function (e) {
        return ai[e]
    })
}

var ci = {start: "end", end: "start"};

function Rt(o) {
    return o.replace(/start|end/g, function (e) {
        return ci[e]
    })
}

function St(o) {
    var e = M(o), t = e.pageXOffset, s = e.pageYOffset;
    return {scrollLeft: t, scrollTop: s}
}

function xt(o) {
    return ve(se(o)).left + St(o).scrollLeft
}

function hi(o, e) {
    var t = M(o), s = se(o), n = t.visualViewport, i = s.clientWidth, r = s.clientHeight, l = 0, a = 0;
    if (n) {
        i = n.width, r = n.height;
        var c = ts();
        (c || !c && e === "fixed") && (l = n.offsetLeft, a = n.offsetTop)
    }
    return {width: i, height: r, x: l + xt(o), y: a}
}

function di(o) {
    var e, t = se(o), s = St(o), n = (e = o.ownerDocument) == null ? void 0 : e.body,
        i = ae(t.scrollWidth, t.clientWidth, n ? n.scrollWidth : 0, n ? n.clientWidth : 0),
        r = ae(t.scrollHeight, t.clientHeight, n ? n.scrollHeight : 0, n ? n.clientHeight : 0),
        l = -s.scrollLeft + xt(o), a = -s.scrollTop;
    return G(n || t).direction === "rtl" && (l += ae(t.clientWidth, n ? n.clientWidth : 0) - i), {
        width: i,
        height: r,
        x: l,
        y: a
    }
}

function Ct(o) {
    var e = G(o), t = e.overflow, s = e.overflowX, n = e.overflowY;
    return /auto|scroll|overlay|hidden/.test(t + n + s)
}

function rs(o) {
    return ["html", "body", "#document"].indexOf(_(o)) >= 0 ? o.ownerDocument.body : V(o) && Ct(o) ? o : rs(it(o))
}

function Le(o, e) {
    var t;
    e === void 0 && (e = []);
    var s = rs(o), n = s === ((t = o.ownerDocument) == null ? void 0 : t.body), i = M(s),
        r = n ? [i].concat(i.visualViewport || [], Ct(s) ? s : []) : s, l = e.concat(r);
    return n ? l : l.concat(Le(it(r)))
}

function pt(o) {
    return Object.assign({}, o, {left: o.x, top: o.y, right: o.x + o.width, bottom: o.y + o.height})
}

function ui(o, e) {
    var t = ve(o, !1, e === "fixed");
    return t.top = t.top + o.clientTop, t.left = t.left + o.clientLeft, t.bottom = t.top + o.clientHeight, t.right = t.left + o.clientWidth, t.width = o.clientWidth, t.height = o.clientHeight, t.x = t.left, t.y = t.top, t
}

function Vt(o, e, t) {
    return e === Zt ? pt(hi(o, t)) : he(e) ? ui(e, t) : pt(di(se(o)))
}

function pi(o) {
    var e = Le(it(o)), t = ["absolute", "fixed"].indexOf(G(o).position) >= 0, s = t && V(o) ? Pe(o) : o;
    return he(s) ? e.filter(function (n) {
        return he(n) && ss(n, s) && _(n) !== "body"
    }) : []
}

function fi(o, e, t, s) {
    var n = e === "clippingParents" ? pi(o) : [].concat(e), i = [].concat(n, [t]), r = i[0],
        l = i.reduce(function (a, c) {
            var h = Vt(o, c, s);
            return a.top = ae(h.top, a.top), a.right = et(h.right, a.right), a.bottom = et(h.bottom, a.bottom), a.left = ae(h.left, a.left), a
        }, Vt(o, r, s));
    return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l
}

function ls(o) {
    var e = o.reference, t = o.element, s = o.placement, n = s ? J(s) : null, i = s ? ye(s) : null,
        r = e.x + e.width / 2 - t.width / 2, l = e.y + e.height / 2 - t.height / 2, a;
    switch (n) {
        case P:
            a = {x: r, y: e.y - t.height};
            break;
        case F:
            a = {x: r, y: e.y + e.height};
            break;
        case z:
            a = {x: e.x + e.width, y: l};
            break;
        case D:
            a = {x: e.x - t.width, y: l};
            break;
        default:
            a = {x: e.x, y: e.y}
    }
    var c = n ? wt(n) : null;
    if (c != null) {
        var h = c === "y" ? "height" : "width";
        switch (i) {
            case me:
                a[c] = a[c] - (e[h] / 2 - t[h] / 2);
                break;
            case Te:
                a[c] = a[c] + (e[h] / 2 - t[h] / 2);
                break
        }
    }
    return a
}

function ke(o, e) {
    e === void 0 && (e = {});
    var t = e, s = t.placement, n = s === void 0 ? o.placement : s, i = t.strategy, r = i === void 0 ? o.strategy : i,
        l = t.boundary, a = l === void 0 ? qs : l, c = t.rootBoundary, h = c === void 0 ? Zt : c, d = t.elementContext,
        v = d === void 0 ? Ee : d, u = t.altBoundary, x = u === void 0 ? !1 : u, m = t.padding,
        f = m === void 0 ? 0 : m, y = ns(typeof f != "number" ? f : os(f, qe)), C = v === Ee ? Ps : Ee,
        A = o.rects.popper, g = o.elements[x ? C : v],
        b = fi(he(g) ? g : g.contextElement || se(o.elements.popper), a, h, r), p = ve(o.elements.reference),
        S = ls({reference: p, element: A, strategy: "absolute", placement: n}), I = pt(Object.assign({}, A, S)),
        T = v === Ee ? I : p, O = {
            top: b.top - T.top + y.top,
            bottom: T.bottom - b.bottom + y.bottom,
            left: b.left - T.left + y.left,
            right: T.right - b.right + y.right
        }, B = o.modifiersData.offset;
    if (v === Ee && B) {
        var j = B[n];
        Object.keys(O).forEach(function ($) {
            var ie = [z, F].indexOf($) >= 0 ? 1 : -1, ne = [P, F].indexOf($) >= 0 ? "y" : "x";
            O[$] += j[ne] * ie
        })
    }
    return O
}

function mi(o, e) {
    e === void 0 && (e = {});
    var t = e, s = t.placement, n = t.boundary, i = t.rootBoundary, r = t.padding, l = t.flipVariations,
        a = t.allowedAutoPlacements, c = a === void 0 ? es : a, h = ye(s), d = h ? l ? Dt : Dt.filter(function (x) {
            return ye(x) === h
        }) : qe, v = d.filter(function (x) {
            return c.indexOf(x) >= 0
        });
    v.length === 0 && (v = d);
    var u = v.reduce(function (x, m) {
        return x[m] = ke(o, {placement: m, boundary: n, rootBoundary: i, padding: r})[J(m)], x
    }, {});
    return Object.keys(u).sort(function (x, m) {
        return u[x] - u[m]
    })
}

function gi(o) {
    if (J(o) === vt) return [];
    var e = Ge(o);
    return [Rt(o), e, Rt(e)]
}

function vi(o) {
    var e = o.state, t = o.options, s = o.name;
    if (!e.modifiersData[s]._skip) {
        for (var n = t.mainAxis, i = n === void 0 ? !0 : n, r = t.altAxis, l = r === void 0 ? !0 : r, a = t.fallbackPlacements, c = t.padding, h = t.boundary, d = t.rootBoundary, v = t.altBoundary, u = t.flipVariations, x = u === void 0 ? !0 : u, m = t.allowedAutoPlacements, f = e.options.placement, y = J(f), C = y === f, A = a || (C || !x ? [Ge(f)] : gi(f)), g = [f].concat(A).reduce(function (de, Q) {
            return de.concat(J(Q) === vt ? mi(e, {
                placement: Q,
                boundary: h,
                rootBoundary: d,
                padding: c,
                flipVariations: x,
                allowedAutoPlacements: m
            }) : Q)
        }, []), b = e.rects.reference, p = e.rects.popper, S = new Map, I = !0, T = g[0], O = 0; O < g.length; O++) {
            var B = g[O], j = J(B), $ = ye(B) === me, ie = [P, F].indexOf(j) >= 0, ne = ie ? "width" : "height",
                W = ke(e, {placement: B, boundary: h, rootBoundary: d, altBoundary: v, padding: c}),
                U = ie ? $ ? z : D : $ ? F : P;
            b[ne] > p[ne] && (U = Ge(U));
            var je = Ge(U), oe = [];
            if (i && oe.push(W[j] <= 0), l && oe.push(W[U] <= 0, W[je] <= 0), oe.every(function (de) {
                return de
            })) {
                T = B, I = !1;
                break
            }
            S.set(B, oe)
        }
        if (I) for (var Ue = x ? 3 : 1, ot = function (Q) {
            var xe = g.find(function (Je) {
                var re = S.get(Je);
                if (re) return re.slice(0, Q).every(function (rt) {
                    return rt
                })
            });
            if (xe) return T = xe, "break"
        }, Se = Ue; Se > 0; Se--) {
            var Xe = ot(Se);
            if (Xe === "break") break
        }
        e.placement !== T && (e.modifiersData[s]._skip = !0, e.placement = T, e.reset = !0)
    }
}

const yi = {name: "flip", enabled: !0, phase: "main", fn: vi, requiresIfExists: ["offset"], data: {_skip: !1}};

function Ht(o, e, t) {
    return t === void 0 && (t = {x: 0, y: 0}), {
        top: o.top - e.height - t.y,
        right: o.right - e.width + t.x,
        bottom: o.bottom - e.height + t.y,
        left: o.left - e.width - t.x
    }
}

function Ft(o) {
    return [P, z, F, D].some(function (e) {
        return o[e] >= 0
    })
}

function bi(o) {
    var e = o.state, t = o.name, s = e.rects.reference, n = e.rects.popper, i = e.modifiersData.preventOverflow,
        r = ke(e, {elementContext: "reference"}), l = ke(e, {altBoundary: !0}), a = Ht(r, s), c = Ht(l, n, i),
        h = Ft(a), d = Ft(c);
    e.modifiersData[t] = {
        referenceClippingOffsets: a,
        popperEscapeOffsets: c,
        isReferenceHidden: h,
        hasPopperEscaped: d
    }, e.attributes.popper = Object.assign({}, e.attributes.popper, {
        "data-popper-reference-hidden": h,
        "data-popper-escaped": d
    })
}

const wi = {name: "hide", enabled: !0, phase: "main", requiresIfExists: ["preventOverflow"], fn: bi};

function Si(o, e, t) {
    var s = J(o), n = [D, P].indexOf(s) >= 0 ? -1 : 1,
        i = typeof t == "function" ? t(Object.assign({}, e, {placement: o})) : t, r = i[0], l = i[1];
    return r = r || 0, l = (l || 0) * n, [D, z].indexOf(s) >= 0 ? {x: l, y: r} : {x: r, y: l}
}

function xi(o) {
    var e = o.state, t = o.options, s = o.name, n = t.offset, i = n === void 0 ? [0, 0] : n,
        r = es.reduce(function (h, d) {
            return h[d] = Si(d, e.rects, i), h
        }, {}), l = r[e.placement], a = l.x, c = l.y;
    e.modifiersData.popperOffsets != null && (e.modifiersData.popperOffsets.x += a, e.modifiersData.popperOffsets.y += c), e.modifiersData[s] = r
}

const Ci = {name: "offset", enabled: !0, phase: "main", requires: ["popperOffsets"], fn: xi};

function Ei(o) {
    var e = o.state, t = o.name;
    e.modifiersData[t] = ls({
        reference: e.rects.reference,
        element: e.rects.popper,
        strategy: "absolute",
        placement: e.placement
    })
}

const Ii = {name: "popperOffsets", enabled: !0, phase: "read", fn: Ei, data: {}};

function Ai(o) {
    return o === "x" ? "y" : "x"
}

function Li(o) {
    var e = o.state, t = o.options, s = o.name, n = t.mainAxis, i = n === void 0 ? !0 : n, r = t.altAxis,
        l = r === void 0 ? !1 : r, a = t.boundary, c = t.rootBoundary, h = t.altBoundary, d = t.padding, v = t.tether,
        u = v === void 0 ? !0 : v, x = t.tetherOffset, m = x === void 0 ? 0 : x,
        f = ke(e, {boundary: a, rootBoundary: c, padding: d, altBoundary: h}), y = J(e.placement), C = ye(e.placement),
        A = !C, g = wt(y), b = Ai(g), p = e.modifiersData.popperOffsets, S = e.rects.reference, I = e.rects.popper,
        T = typeof m == "function" ? m(Object.assign({}, e.rects, {placement: e.placement})) : m,
        O = typeof T == "number" ? {mainAxis: T, altAxis: T} : Object.assign({mainAxis: 0, altAxis: 0}, T),
        B = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null, j = {x: 0, y: 0};
    if (p) {
        if (i) {
            var $, ie = g === "y" ? P : D, ne = g === "y" ? F : z, W = g === "y" ? "height" : "width", U = p[g],
                je = U + f[ie], oe = U - f[ne], Ue = u ? -I[W] / 2 : 0, ot = C === me ? S[W] : I[W],
                Se = C === me ? -I[W] : -S[W], Xe = e.elements.arrow, de = u && Xe ? bt(Xe) : {width: 0, height: 0},
                Q = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : is(),
                xe = Q[ie], Je = Q[ne], re = Ae(0, S[W], de[W]),
                rt = A ? S[W] / 2 - Ue - re - xe - O.mainAxis : ot - re - xe - O.mainAxis,
                bs = A ? -S[W] / 2 + Ue + re + Je + O.mainAxis : Se + re + Je + O.mainAxis,
                lt = e.elements.arrow && Pe(e.elements.arrow),
                ws = lt ? g === "y" ? lt.clientTop || 0 : lt.clientLeft || 0 : 0,
                At = ($ = B == null ? void 0 : B[g]) != null ? $ : 0, Ss = U + rt - At - ws, xs = U + bs - At,
                Lt = Ae(u ? et(je, Ss) : je, U, u ? ae(oe, xs) : oe);
            p[g] = Lt, j[g] = Lt - U
        }
        if (l) {
            var Tt, Cs = g === "x" ? P : D, Es = g === "x" ? F : z, le = p[b], _e = b === "y" ? "height" : "width",
                kt = le + f[Cs], Ot = le - f[Es], at = [P, D].indexOf(y) !== -1,
                Bt = (Tt = B == null ? void 0 : B[b]) != null ? Tt : 0,
                $t = at ? kt : le - S[_e] - I[_e] - Bt + O.altAxis, Nt = at ? le + S[_e] + I[_e] - Bt - O.altAxis : Ot,
                qt = u && at ? Qs($t, le, Nt) : Ae(u ? $t : kt, le, u ? Nt : Ot);
            p[b] = qt, j[b] = qt - le
        }
        e.modifiersData[s] = j
    }
}

const Ti = {name: "preventOverflow", enabled: !0, phase: "main", fn: Li, requiresIfExists: ["offset"]};

function ki(o) {
    return {scrollLeft: o.scrollLeft, scrollTop: o.scrollTop}
}

function Oi(o) {
    return o === M(o) || !V(o) ? St(o) : ki(o)
}

function Bi(o) {
    var e = o.getBoundingClientRect(), t = ge(e.width) / o.offsetWidth || 1, s = ge(e.height) / o.offsetHeight || 1;
    return t !== 1 || s !== 1
}

function $i(o, e, t) {
    t === void 0 && (t = !1);
    var s = V(e), n = V(e) && Bi(e), i = se(e), r = ve(o, n, t), l = {scrollLeft: 0, scrollTop: 0}, a = {x: 0, y: 0};
    return (s || !s && !t) && ((_(e) !== "body" || Ct(i)) && (l = Oi(e)), V(e) ? (a = ve(e, !0), a.x += e.clientLeft, a.y += e.clientTop) : i && (a.x = xt(i))), {
        x: r.left + l.scrollLeft - a.x,
        y: r.top + l.scrollTop - a.y,
        width: r.width,
        height: r.height
    }
}

function Ni(o) {
    var e = new Map, t = new Set, s = [];
    o.forEach(function (i) {
        e.set(i.name, i)
    });

    function n(i) {
        t.add(i.name);
        var r = [].concat(i.requires || [], i.requiresIfExists || []);
        r.forEach(function (l) {
            if (!t.has(l)) {
                var a = e.get(l);
                a && n(a)
            }
        }), s.push(i)
    }

    return o.forEach(function (i) {
        t.has(i.name) || n(i)
    }), s
}

function qi(o) {
    var e = Ni(o);
    return Us.reduce(function (t, s) {
        return t.concat(e.filter(function (n) {
            return n.phase === s
        }))
    }, [])
}

function Pi(o) {
    var e;
    return function () {
        return e || (e = new Promise(function (t) {
            Promise.resolve().then(function () {
                e = void 0, t(o())
            })
        })), e
    }
}

function Di(o) {
    var e = o.reduce(function (t, s) {
        var n = t[s.name];
        return t[s.name] = n ? Object.assign({}, n, s, {
            options: Object.assign({}, n.options, s.options),
            data: Object.assign({}, n.data, s.data)
        }) : s, t
    }, {});
    return Object.keys(e).map(function (t) {
        return e[t]
    })
}

var zt = {placement: "bottom", modifiers: [], strategy: "absolute"};

function jt() {
    for (var o = arguments.length, e = new Array(o), t = 0; t < o; t++) e[t] = arguments[t];
    return !e.some(function (s) {
        return !(s && typeof s.getBoundingClientRect == "function")
    })
}

function Wi(o) {
    o === void 0 && (o = {});
    var e = o, t = e.defaultModifiers, s = t === void 0 ? [] : t, n = e.defaultOptions, i = n === void 0 ? zt : n;
    return function (l, a, c) {
        c === void 0 && (c = i);
        var h = {
            placement: "bottom",
            orderedModifiers: [],
            options: Object.assign({}, zt, i),
            modifiersData: {},
            elements: {reference: l, popper: a},
            attributes: {},
            styles: {}
        }, d = [], v = !1, u = {
            state: h, setOptions: function (y) {
                var C = typeof y == "function" ? y(h.options) : y;
                m(), h.options = Object.assign({}, i, h.options, C), h.scrollParents = {
                    reference: he(l) ? Le(l) : l.contextElement ? Le(l.contextElement) : [],
                    popper: Le(a)
                };
                var A = qi(Di([].concat(s, h.options.modifiers)));
                return h.orderedModifiers = A.filter(function (g) {
                    return g.enabled
                }), x(), u.update()
            }, forceUpdate: function () {
                if (!v) {
                    var y = h.elements, C = y.reference, A = y.popper;
                    if (jt(C, A)) {
                        h.rects = {
                            reference: $i(C, Pe(A), h.options.strategy === "fixed"),
                            popper: bt(A)
                        }, h.reset = !1, h.placement = h.options.placement, h.orderedModifiers.forEach(function (O) {
                            return h.modifiersData[O.name] = Object.assign({}, O.data)
                        });
                        for (var g = 0; g < h.orderedModifiers.length; g++) {
                            if (h.reset === !0) {
                                h.reset = !1, g = -1;
                                continue
                            }
                            var b = h.orderedModifiers[g], p = b.fn, S = b.options, I = S === void 0 ? {} : S,
                                T = b.name;
                            typeof p == "function" && (h = p({state: h, options: I, name: T, instance: u}) || h)
                        }
                    }
                }
            }, update: Pi(function () {
                return new Promise(function (f) {
                    u.forceUpdate(), f(h)
                })
            }), destroy: function () {
                m(), v = !0
            }
        };
        if (!jt(l, a)) return u;
        u.setOptions(c).then(function (f) {
            !v && c.onFirstUpdate && c.onFirstUpdate(f)
        });

        function x() {
            h.orderedModifiers.forEach(function (f) {
                var y = f.name, C = f.options, A = C === void 0 ? {} : C, g = f.effect;
                if (typeof g == "function") {
                    var b = g({state: h, name: y, instance: u, options: A}), p = function () {
                    };
                    d.push(b || p)
                }
            })
        }

        function m() {
            d.forEach(function (f) {
                return f()
            }), d = []
        }

        return u
    }
}

var Mi = [li, Ii, oi, _s, Ci, yi, Ti, ti, wi], as = Wi({defaultModifiers: Mi});/*
 * HSDropdown
 * @version: 2.1.0
 * @author: HTMLStream
 * @license: Licensed under MIT (https://preline.co/docs/license.html)
 * Copyright 2023 HTMLStream
 */
class te extends k {
    constructor(e, t, s) {
        super(e, t, s), this.toggle = this.el.querySelector(":scope > .hs-dropdown-toggle") || this.el.querySelector(":scope > .hs-dropdown-toggle-wrapper > .hs-dropdown-toggle") || this.el.children[0], this.closers = Array.from(this.el.querySelectorAll(":scope .hs-dropdown-close")) || null, this.menu = this.el.querySelector(":scope > .hs-dropdown-menu"), this.eventMode = L(this.el, "--trigger", "click"), this.closeMode = L(this.el, "--auto-close", "true"), this.animationInProcess = !1, this.toggle && this.menu && this.init()
    }

    static getInstance(e, t) {
        const s = window.$hsDropdownCollection.find(n => n.element.el === (typeof e == "string" ? document.querySelector(e) : e));
        return s ? t ? s : s.element.el : null
    }

    static autoInit() {
        if (window.$hsDropdownCollection || (window.$hsDropdownCollection = []), document.querySelectorAll(".hs-dropdown:not(.--prevent-on-load-init)").forEach(e => {
            window.$hsDropdownCollection.find(t => {
                var s;
                return ((s = t == null ? void 0 : t.element) == null ? void 0 : s.el) === e
            }) || new te(e)
        }), window.$hsDropdownCollection) {
            document.addEventListener("keydown", t => te.accessibility(t)), window.addEventListener("click", t => {
                const s = t.target;
                te.closeCurrentlyOpened(s)
            });
            let e = window.innerWidth;
            window.addEventListener("resize", () => {
                window.innerWidth !== e && (e = innerWidth, te.closeCurrentlyOpened(null, !1))
            })
        }
    }

    static open(e) {
        const t = window.$hsDropdownCollection.find(s => s.element.el === (typeof e == "string" ? document.querySelector(e) : e));
        t && t.element.menu.classList.contains("hidden") && t.element.open()
    }

    static close(e) {
        const t = window.$hsDropdownCollection.find(s => s.element.el === (typeof e == "string" ? document.querySelector(e) : e));
        t && !t.element.menu.classList.contains("hidden") && t.element.close()
    }

    static accessibility(e) {
        this.history = ks;
        const t = window.$hsDropdownCollection.find(s => s.element.el.classList.contains("open"));
        if (t && (Os.includes(e.code) || e.code.length === 4 && e.code[e.code.length - 1].match(/^[A-Z]*$/)) && !e.metaKey && !t.element.menu.querySelector("input:focus") && !t.element.menu.querySelector("textarea:focus")) switch (e.code) {
            case"Escape":
                t.element.menu.querySelector(".hs-select.active") || (e.preventDefault(), this.onEscape(e));
                break;
            case"Enter":
                !t.element.menu.querySelector(".hs-select button:focus") && !t.element.menu.querySelector(".hs-collapse-toggle:focus") && this.onEnter(e);
                break;
            case"ArrowUp":
                e.preventDefault(), this.onArrow();
                break;
            case"ArrowDown":
                e.preventDefault(), this.onArrow(!1);
                break;
            case"Home":
                e.preventDefault(), this.onStartEnd();
                break;
            case"End":
                e.preventDefault(), this.onStartEnd(!1);
                break;
            default:
                e.preventDefault(), this.onFirstLetter(e.key);
                break
        }
    }

    static onEscape(e) {
        const t = e.target.closest(".hs-dropdown.open");
        if (window.$hsDropdownCollection.find(s => s.element.el === t)) {
            const s = window.$hsDropdownCollection.find(n => n.element.el === t);
            s && (s.element.close(), s.element.toggle.focus())
        } else this.closeCurrentlyOpened()
    }

    static onEnter(e) {
        const t = e.target.parentElement;
        if (window.$hsDropdownCollection.find(s => s.element.el === t)) {
            e.preventDefault();
            const s = window.$hsDropdownCollection.find(n => n.element.el === t);
            s && s.element.open()
        }
    }

    static onArrow(e = !0) {
        const t = window.$hsDropdownCollection.find(s => s.element.el.classList.contains("open"));
        if (t) {
            const s = t.element.menu;
            if (!s) return !1;
            const i = (e ? Array.from(s.querySelectorAll("a:not([hidden]), .hs-dropdown > button:not([hidden])")).reverse() : Array.from(s.querySelectorAll("a:not([hidden]), .hs-dropdown > button:not([hidden])"))).filter(a => !a.classList.contains("disabled")),
                r = s.querySelector("a:focus, button:focus");
            let l = i.findIndex(a => a === r);
            l + 1 < i.length && l++, i[l].focus()
        }
    }

    static onStartEnd(e = !0) {
        const t = window.$hsDropdownCollection.find(s => s.element.el.classList.contains("open"));
        if (t) {
            const s = t.element.menu;
            if (!s) return !1;
            const i = (e ? Array.from(s.querySelectorAll("a")) : Array.from(s.querySelectorAll("a")).reverse()).filter(r => !r.classList.contains("disabled"));
            i.length && i[0].focus()
        }
    }

    static onFirstLetter(e) {
        const t = window.$hsDropdownCollection.find(s => s.element.el.classList.contains("open"));
        if (t) {
            const s = t.element.menu;
            if (!s) return !1;
            const n = Array.from(s.querySelectorAll("a")),
                i = () => n.findIndex((l, a) => l.innerText.toLowerCase().charAt(0) === e.toLowerCase() && this.history.existsInHistory(a));
            let r = i();
            r === -1 && (this.history.clearHistory(), r = i()), r !== -1 && (n[r].focus(), this.history.addHistory(r))
        }
    }

    static closeCurrentlyOpened(e = null, t = !0) {
        const s = e && e.closest(".hs-dropdown") && e.closest(".hs-dropdown").parentElement.closest(".hs-dropdown") ? e.closest(".hs-dropdown").parentElement.closest(".hs-dropdown") : null;
        let n = s ? window.$hsDropdownCollection.filter(i => i.element.el.classList.contains("open") && i.element.menu.closest(".hs-dropdown").parentElement.closest(".hs-dropdown") === s) : window.$hsDropdownCollection.filter(i => i.element.el.classList.contains("open"));
        e && e.closest(".hs-dropdown") && Is(e.closest(".hs-dropdown"), "--auto-close") === "inside" && (n = n.filter(i => i.element.el !== e.closest(".hs-dropdown"))), n && n.forEach(i => {
            if (i.element.closeMode === "false" || i.element.closeMode === "outside") return !1;
            i.element.close(t)
        })
    }

    static on(e, t, s) {
        const n = window.$hsDropdownCollection.find(i => i.element.el === (typeof t == "string" ? document.querySelector(t) : t));
        n && (n.element.events[e] = s)
    }

    init() {
        if (this.createCollection(window.$hsDropdownCollection, this), this.toggle.disabled) return !1;
        this.toggle.addEventListener("click", e => this.onClickHandler(e)), this.closers && this.buildClosers(), !As() && !Ls() && (this.el.addEventListener("mouseenter", () => this.onMouseEnterHandler()), this.el.addEventListener("mouseleave", () => this.onMouseLeaveHandler()))
    }

    resizeHandler() {
        this.eventMode = L(this.el, "--trigger", "click")
    }

    buildClosers() {
        this.closers.forEach(e => {
            e.addEventListener("click", () => this.close())
        })
    }

    onClickHandler(e) {
        this.el.classList.contains("open") && !this.menu.classList.contains("hidden") ? this.close() : this.open()
    }

    onMouseEnterHandler() {
        if (this.eventMode !== "hover") return !1;
        this.el._popper && this.forceClearState(), !this.el.classList.contains("open") && this.menu.classList.contains("hidden") && this.open()
    }

    onMouseLeaveHandler() {
        if (this.eventMode !== "hover") return !1;
        this.el.classList.contains("open") && !this.menu.classList.contains("hidden") && this.close()
    }

    destroyPopper() {
        this.menu.classList.remove("block"), this.menu.classList.add("hidden"), this.menu.style.inset = null, this.menu.style.position = null, this.el && this.el._popper && this.el._popper.destroy(), this.animationInProcess = !1
    }

    absoluteStrategyModifiers() {
        return [{
            name: "applyStyles", fn: e => {
                const t = (window.getComputedStyle(this.el).getPropertyValue("--strategy") || "absolute").replace(" ", ""),
                    s = (window.getComputedStyle(this.el).getPropertyValue("--adaptive") || "adaptive").replace(" ", "");
                e.state.elements.popper.style.position = t, e.state.elements.popper.style.transform = s === "adaptive" ? e.state.styles.popper.transform : null, e.state.elements.popper.style.top = null, e.state.elements.popper.style.bottom = null, e.state.elements.popper.style.left = null, e.state.elements.popper.style.right = null, e.state.elements.popper.style.margin = 0
            }
        }, {name: "computeStyles", options: {adaptive: !1}}]
    }

    open() {
        if (this.el.classList.contains("open") || this.animationInProcess) return !1;
        this.animationInProcess = !0;
        const e = (window.getComputedStyle(this.el).getPropertyValue("--placement") || "").replace(" ", ""),
            t = (window.getComputedStyle(this.el).getPropertyValue("--flip") || "true").replace(" ", ""),
            s = (window.getComputedStyle(this.el).getPropertyValue("--strategy") || "fixed").replace(" ", ""),
            n = parseInt((window.getComputedStyle(this.el).getPropertyValue("--offset") || "10").replace(" ", ""));
        s !== "static" && (this.el._popper = as(this.el, this.menu, {
            placement: Kt[e] || "bottom-start",
            strategy: s,
            modifiers: [...s !== "fixed" ? this.absoluteStrategyModifiers() : [], {
                name: "flip",
                enabled: t === "true"
            }, {name: "offset", options: {offset: [0, n]}}]
        })), this.menu.style.margin = null, this.menu.classList.remove("hidden"), this.menu.classList.add("block"), setTimeout(() => {
            this.el.classList.add("open"), this.animationInProcess = !1
        }), this.fireEvent("open", this.el), E("open.hs.dropdown", this.el, this.el)
    }

    close(e = !0) {
        if (this.animationInProcess || !this.el.classList.contains("open")) return !1;
        if (this.animationInProcess = !0, e) {
            const t = this.el.querySelector("[data-hs-dropdown-transition]") || this.menu;
            H(t, () => this.destroyPopper())
        } else this.destroyPopper();
        this.menu.style.margin = null, this.el.classList.remove("open"), this.fireEvent("close", this.el), E("close.hs.dropdown", this.el, this.el)
    }

    forceClearState() {
        this.destroyPopper(), this.menu.style.margin = null, this.el.classList.remove("open")
    }
}

window.addEventListener("load", () => {
    te.autoInit()
});
window.addEventListener("resize", () => {
    window.$hsDropdownCollection || (window.$hsDropdownCollection = []), window.$hsDropdownCollection.forEach(o => o.element.resizeHandler())
});
typeof window < "u" && (window.HSDropdown = te);/*
 * HSInputNumber
 * @version: 2.1.0
 * @author: HTMLStream
 * @license: Licensed under MIT (https://preline.co/docs/license.html)
 * Copyright 2023 HTMLStream
 */
class De extends k {
    constructor(e, t) {
        super(e, t), this.input = this.el.querySelector("[data-hs-input-number-input]") || null, this.increment = this.el.querySelector("[data-hs-input-number-increment]") || null, this.decrement = this.el.querySelector("[data-hs-input-number-decrement]") || null, this.input && (this.inputValue = isNaN(parseInt(this.input.value)) ? 0 : parseInt(this.input.value));
        const s = this.el.dataset.hsInputNumber, i = {...s ? JSON.parse(s) : {step: 1}, ...t};
        this.minInputValue = "min" in i ? i.min : 0, this.maxInputValue = "max" in i ? i.max : null, this.step = "step" in i && i.step > 0 ? i.step : 1, this.init()
    }

    static getInstance(e, t) {
        const s = window.$hsInputNumberCollection.find(n => n.element.el === (typeof e == "string" ? document.querySelector(e) : e));
        return s ? t ? s : s.element : null
    }

    static autoInit() {
        window.$hsInputNumberCollection || (window.$hsInputNumberCollection = []), document.querySelectorAll("[data-hs-input-number]:not(.--prevent-on-load-init)").forEach(e => {
            window.$hsInputNumberCollection.find(t => {
                var s;
                return ((s = t == null ? void 0 : t.element) == null ? void 0 : s.el) === e
            }) || new De(e)
        })
    }

    init() {
        this.createCollection(window.$hsInputNumberCollection, this), this.input && this.increment && this.build()
    }

    build() {
        this.input && this.buildInput(), this.increment && this.buildIncrement(), this.decrement && this.buildDecrement(), this.inputValue <= 0 && this.minInputValue === 0 && (this.inputValue = 0, this.input.value = "0"), (this.inputValue <= 0 || this.minInputValue < 0) && this.changeValue(), this.input.hasAttribute("disabled") && this.disableButtons()
    }

    buildInput() {
        this.input.addEventListener("input", () => this.changeValue())
    }

    buildIncrement() {
        this.increment.addEventListener("click", () => {
            this.changeValue("increment")
        })
    }

    buildDecrement() {
        this.decrement.addEventListener("click", () => {
            this.changeValue("decrement")
        })
    }

    changeValue(e = "none") {
        const t = {inputValue: this.inputValue}, s = this.minInputValue ?? Number.MIN_SAFE_INTEGER,
            n = this.maxInputValue ?? Number.MAX_SAFE_INTEGER;
        switch (this.inputValue = isNaN(this.inputValue) ? 0 : this.inputValue, e) {
            case"increment":
                const i = this.inputValue + this.step;
                this.inputValue = i >= s && i <= n ? i : n, this.input.value = this.inputValue.toString();
                break;
            case"decrement":
                const r = this.inputValue - this.step;
                this.inputValue = r >= s && r <= n ? r : s, this.input.value = this.inputValue.toString();
                break;
            default:
                const l = isNaN(parseInt(this.input.value)) ? 0 : parseInt(this.input.value);
                this.inputValue = l >= n ? n : l <= s ? s : l, this.inputValue <= s && (this.input.value = this.inputValue.toString());
                break
        }
        t.inputValue = this.inputValue, this.inputValue === s ? (this.el.classList.add("disabled"), this.decrement && this.disableButtons("decrement")) : (this.el.classList.remove("disabled"), this.decrement && this.enableButtons("decrement")), this.inputValue === n ? (this.el.classList.add("disabled"), this.increment && this.disableButtons("increment")) : (this.el.classList.remove("disabled"), this.increment && this.enableButtons("increment")), this.fireEvent("change", t), E("change.hs.inputNumber", this.el, t)
    }

    disableButtons(e = "all") {
        e === "all" ? ((this.increment.tagName === "BUTTON" || this.increment.tagName === "INPUT") && this.increment.setAttribute("disabled", "disabled"), (this.decrement.tagName === "BUTTON" || this.decrement.tagName === "INPUT") && this.decrement.setAttribute("disabled", "disabled")) : e === "increment" ? (this.increment.tagName === "BUTTON" || this.increment.tagName === "INPUT") && this.increment.setAttribute("disabled", "disabled") : e === "decrement" && (this.decrement.tagName === "BUTTON" || this.decrement.tagName === "INPUT") && this.decrement.setAttribute("disabled", "disabled")
    }

    enableButtons(e = "all") {
        e === "all" ? ((this.increment.tagName === "BUTTON" || this.increment.tagName === "INPUT") && this.increment.removeAttribute("disabled"), (this.decrement.tagName === "BUTTON" || this.decrement.tagName === "INPUT") && this.decrement.removeAttribute("disabled")) : e === "increment" ? (this.increment.tagName === "BUTTON" || this.increment.tagName === "INPUT") && this.increment.removeAttribute("disabled") : e === "decrement" && (this.decrement.tagName === "BUTTON" || this.decrement.tagName === "INPUT") && this.decrement.removeAttribute("disabled")
    }
}

window.addEventListener("load", () => {
    De.autoInit()
});
typeof window < "u" && (window.HSInputNumber = De);/*
 * HSOverlay
 * @version: 2.1.0
 * @author: HTMLStream
 * @license: Licensed under MIT (https://preline.co/docs/license.html)
 * Copyright 2023 HTMLStream
 */
class Y extends k {
    constructor(e, t, s) {
        super(e, t, s);
        const n = e.getAttribute("data-hs-overlay-options"),
            r = {...n ? JSON.parse(n) : {}, ...t};
        if (this.hiddenClass = (r == null ? void 0 : r.hiddenClass) || "hidden",
            this.isClosePrev = (r == null ? void 0 : r.isClosePrev) ?? !0,
            this.backdropClasses = (r == null ? void 0 : r.backdropClasses) ?? "hs-overlay-backdrop transition duration fixed inset-0 bg-gray-900 bg-opacity-50 dark:bg-opacity-80 dark:bg-neutral-900",
            this.backdropExtraClasses = (r == null ? void 0 : r.backdropExtraClasses) ?? "",
            this.openNextOverlay = !1, this.autoHide = null,
            //   console.log('this.isClosePrev : '+this.isClosePrev),
            //    console.log('this.backdropClasses : '+this.backdropClasses),
            //     console.log('this.backdropExtraClasses : '+this.backdropExtraClasses),
            this.overlayId = this.el.getAttribute("data-hs-overlay"),
            this.overlay = document.querySelector(this.overlayId), this.overlay) {
            this.isCloseWhenClickInside = Ce(L(this.overlay, "--close-when-click-inside", "false") || "false"),
                this.isTabAccessibilityLimited = Ce(L(this.overlay, "--tab-accessibility-limited", "true") || "true"),
                this.isLayoutAffect = Ce(L(this.overlay, "--is-layout-affect", "false") || "false"),
                this.hasAutofocus = Ce(L(this.overlay, "--has-autofocus", "true") || "true"),
                this.hasAbilityToCloseOnBackdropClick = Ce(this.overlay.getAttribute("data-hs-overlay-keyboard") || "true");


            console.log('this.overlayId : ' + this.overlayId);
            //  console.log('this.isCloseWhenClickInside : ' + this.isCloseWhenClickInside),
            //   console.log('this.hasAbilityToCloseOnBackdropClick : ' + this.hasAbilityToCloseOnBackdropClick),
            //    console.log('this.isLayoutAffect : ' + this.isLayoutAffect);


            const l = L(this.overlay, "--auto-close");
            this.autoClose = !isNaN(+l) && isFinite(+l) ? +l : Pt[l] || null;
            const a = L(this.overlay, "--opened");
            this.openedBreakpoint = (!isNaN(+a) && isFinite(+a) ? +a : Pt[a]) || null
        }
        this.overlay && this.init()
    }

    static getInstance(e, t) {
        const s = window.$hsOverlayCollection.find(n => n.element.el === (typeof e == "string" ? document.querySelector(e) : e) || n.element.overlay === (typeof e == "string" ? document.querySelector(e) : e));
        return s ? t ? s : s.element.el : null
    }

    static autoInit() {
        window.$hsOverlayCollection || (window.$hsOverlayCollection = []), document.querySelectorAll("[data-hs-overlay]:not(.--prevent-on-load-init)").forEach(e => {
            window.$hsOverlayCollection.find(t => {
                var s;
                return ((s = t == null ? void 0 : t.element) == null ? void 0 : s.el) === e
            }) || new Y(e)
        }), window.$hsOverlayCollection && document.addEventListener("keydown", e => Y.accessibility(e))
    }

    static open(e) {
        const t = window.$hsOverlayCollection.find(s => s.element.el === (typeof e == "string" ? document.querySelector(e) : e) || s.element.overlay === (typeof e == "string" ? document.querySelector(e) : e));
        t && t.element.overlay.classList.contains(t.element.hiddenClass) && t.element.open()
    }

    static close(e) {
        const t = window.$hsOverlayCollection.find(s => s.element.el === (typeof e == "string" ? document.querySelector(e) : e) || s.element.overlay === (typeof e == "string" ? document.querySelector(e) : e));
        t && !t.element.overlay.classList.contains(t.element.hiddenClass) && t.element.close()
    }

    static setOpened(e, t) {
        document.body.clientWidth >= e ? (document.body.classList.add("hs-overlay-body-open"), t.element.overlay.classList.add("opened")) : t.element.close(!0)
    }

    static accessibility(e) {
        var l, a;
        const t = window.$hsOverlayCollection.filter(c => c.element.overlay.classList.contains("open")),
            s = t[t.length - 1],
            n = (a = (l = s == null ? void 0 : s.element) == null ? void 0 : l.overlay) == null ? void 0 : a.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'),
            i = [];
        n != null && n.length && n.forEach(c => {
            gt(c) || i.push(c)
        });
        const r = s && !e.metaKey;
        if (r && !s.element.isTabAccessibilityLimited && e.code === "Tab") return !1;
        r && i.length && e.code === "Tab" && (e.preventDefault(), this.onTab(s, i)), r && e.code === "Escape" && (e.preventDefault(), this.onEscape(s))
    }

    static onEscape(e) {
        e && e.element.hasAbilityToCloseOnBackdropClick && e.element.close()
    }

    static onTab(e, t) {
        if (!t.length) return !1;
        const s = e.element.overlay.querySelector(":focus"), n = Array.from(t).indexOf(s);
        if (n > -1) {
            const i = (n + 1) % t.length;
            t[i].focus()
        } else t[0].focus()
    }

    static on(e, t, s) {
        const n = window.$hsOverlayCollection.find(i => i.element.el === (typeof t == "string" ? document.querySelector(t) : t) || i.element.overlay === (typeof t == "string" ? document.querySelector(t) : t));
        n && (n.element.events[e] = s)
    }

    init() {
        if (this.createCollection(window.$hsOverlayCollection, this), this.isLayoutAffect && this.openedBreakpoint) {
            const e = Y.getInstance(this.el, !0);
            Y.setOpened(this.openedBreakpoint, e)
        }
        this.el.addEventListener("click", () => {
            this.overlay.classList.contains("opened") ? this.close() : this.open()
        }),
            this.overlay.addEventListener("click", e => {
                e.target.id && `#${e.target.id}` === this.overlayId &&
                this.isCloseWhenClickInside &&
                this.hasAbilityToCloseOnBackdropClick &&
                this.close()
            })
    }

    hideAuto() {
        const e = parseInt(L(this.overlay, "--auto-hide", "0"));
        e && (this.autoHide = setTimeout(() => {
            this.close()
        }, e))
    }

    checkTimer() {
        this.autoHide && (clearTimeout(this.autoHide), this.autoHide = null)
    }

    buildBackdrop() {
        const e = this.overlay.classList.value.split(" "),
            t = parseInt(window.getComputedStyle(this.overlay).getPropertyValue("z-index")),
            s = this.overlay.getAttribute("data-hs-overlay-backdrop-container") || !1;
        let n = document.createElement("div"), i = `${this.backdropClasses} ${this.backdropExtraClasses}`;
        const r = L(this.overlay, "--overlay-backdrop", "true") !== "static",
            l = L(this.overlay, "--overlay-backdrop", "true") === "false";
        n.id = `${this.overlay.id}-backdrop`, "style" in n && (n.style.zIndex = `${t - 1}`);
        for (const a of e) (a.startsWith("hs-overlay-backdrop-open:") || a.includes(":hs-overlay-backdrop-open:")) && (i += ` ${a}`);
        l || (s && (n = document.querySelector(s).cloneNode(!0), n.classList.remove("hidden"), i = `${n.classList.toString()}`, n.classList.value = ""), r && n.addEventListener("click", () => this.close(), !0), n.setAttribute("data-hs-overlay-backdrop-template", ""), document.body.appendChild(n), setTimeout(() => {
            n.classList.value = i
        }))
    }

    destroyBackdrop() {
        const e = document.querySelector(`#${this.overlay.id}-backdrop`);
        e && (this.openNextOverlay && (e.style.transitionDuration = `${parseFloat(window.getComputedStyle(e).transitionDuration.replace(/[^\d.-]/g, "")) * 1.8}s`), e.classList.add("opacity-0"), H(e, () => {
            e.remove()
        }))
    }

    focusElement() {
        const e = this.overlay.querySelector("[autofocus]");
        if (e) e.focus(); else return !1
    }

    open() {
        if (!this.overlay) return !1;
        const e = document.querySelectorAll(".hs-overlay.open"),
            t = window.$hsOverlayCollection.find(n => Array.from(e).includes(n.element.overlay) && !n.element.isLayoutAffect),
            s = L(this.overlay, "--body-scroll", "false") !== "true";
        if (this.isClosePrev && t) return this.openNextOverlay = !0, t.element.close().then(() => {
            this.open(), this.openNextOverlay = !1
        });
        s && (document.body.style.overflow = "hidden"), this.buildBackdrop(), this.checkTimer(), this.hideAuto(), this.overlay.classList.remove(this.hiddenClass), this.overlay.setAttribute("aria-overlay", "true"), this.overlay.setAttribute("tabindex", "-1"), setTimeout(() => {
            if (this.overlay.classList.contains("opened")) return !1;
            this.overlay.classList.add("open", "opened"), this.isLayoutAffect && document.body.classList.add("hs-overlay-body-open"), this.fireEvent("open", this.el), E("open.hs.overlay", this.el, this.el), this.hasAutofocus && this.focusElement()
        }, 50)
    }

    close(e = !1) {
        this.isLayoutAffect && document.body.classList.remove("hs-overlay-body-open");
        const t = s => {
            if (this.overlay.classList.contains("open")) return !1;
            this.overlay.classList.add(this.hiddenClass), this.destroyBackdrop(), this.fireEvent("close", this.el), E("close.hs.overlay", this.el, this.el), document.querySelector(".hs-overlay.opened") || (document.body.style.overflow = ""), s(this.overlay)
        };
        return new Promise(s => {
            if (!this.overlay) return !1;
            this.overlay.classList.remove("open", "opened"), this.overlay.removeAttribute("aria-overlay"), this.overlay.removeAttribute("tabindex"), e ? t(s) : H(this.overlay, () => {
                t(s)
            })
        })
    }
}

const Ri = () => {
    if (!window.$hsOverlayCollection.length || !window.$hsOverlayCollection.find(e => e.element.autoClose)) return !1;
    window.$hsOverlayCollection.filter(e => e.element.autoClose).forEach(e => {
        document.body.clientWidth >= e.element.autoClose && e.element.close(!0)
    })
}, Vi = () => {
    if (!window.$hsOverlayCollection.length || !window.$hsOverlayCollection.find(e => e.element.openedBreakpoint)) return !1;
    window.$hsOverlayCollection.filter(e => e.element.openedBreakpoint).forEach(e => {
        Y.setOpened(e.element.openedBreakpoint, e)
    })
};
window.addEventListener("load", () => {
    Y.autoInit()
});
window.addEventListener("resize", () => {
    Ri(), Vi()
});
typeof window < "u" && (window.HSOverlay = Y);/*
 * HSPinInput
 * @version: 2.1.0
 * @author: HTMLStream
 * @license: Licensed under MIT (https://preline.co/docs/license.html)
 * Copyright 2023 HTMLStream
 */
class We extends k {
    constructor(e, t) {
        super(e, t);
        const s = e.getAttribute("data-hs-pin-input"), i = {...s ? JSON.parse(s) : {}, ...t};
        this.items = this.el.querySelectorAll("[data-hs-pin-input-item]"), this.currentItem = null, this.currentValue = new Array(this.items.length).fill(""), this.placeholders = [], this.availableCharsRE = new RegExp((i == null ? void 0 : i.availableCharsRE) || "^[a-zA-Z0-9]+$"), this.init()
    }

    static getInstance(e, t) {
        const s = window.$hsPinInputCollection.find(n => n.element.el === (typeof e == "string" ? document.querySelector(e) : e));
        return s ? t ? s : s.element : null
    }

    static autoInit() {
        window.$hsPinInputCollection || (window.$hsPinInputCollection = []), document.querySelectorAll("[data-hs-pin-input]:not(.--prevent-on-load-init)").forEach(e => {
            window.$hsPinInputCollection.find(t => {
                var s;
                return ((s = t == null ? void 0 : t.element) == null ? void 0 : s.el) === e
            }) || new We(e)
        })
    }

    init() {
        this.createCollection(window.$hsPinInputCollection, this), this.items.length && this.build()
    }

    build() {
        this.buildInputItems()
    }

    buildInputItems() {
        this.items.forEach((e, t) => {
            this.placeholders.push(e.getAttribute("placeholder") || ""), e.hasAttribute("autofocus") && this.onFocusIn(t), e.addEventListener("input", s => this.onInput(s, t)), e.addEventListener("paste", s => this.onPaste(s)), e.addEventListener("keydown", s => this.onKeydown(s, t)), e.addEventListener("focusin", () => this.onFocusIn(t)), e.addEventListener("focusout", () => this.onFocusOut(t))
        })
    }

    checkIfNumber(e) {
        return e.match(this.availableCharsRE)
    }

    autoFillAll(e) {
        Array.from(e).forEach((t, s) => {
            if (!(this != null && this.items[s])) return !1;
            this.items[s].value = t, this.items[s].dispatchEvent(new Event("input", {bubbles: !0}))
        })
    }

    setCurrentValue() {
        this.currentValue = Array.from(this.items).map(e => e.value)
    }

    toggleCompleted() {
        this.currentValue.includes("") ? this.el.classList.remove("active") : this.el.classList.add("active")
    }

    onInput(e, t) {
        const s = e.target.value;
        if (this.currentItem = e.target, this.currentItem.value = "", this.currentItem.value = s[s.length - 1], !this.checkIfNumber(this.currentItem.value)) return this.currentItem.value = this.currentValue[t] || "", !1;
        if (this.setCurrentValue(), this.currentItem.value) {
            if (t < this.items.length - 1 && this.items[t + 1].focus(), !this.currentValue.includes("")) {
                const n = {currentValue: this.currentValue};
                this.fireEvent("completed", n), E("completed.hs.pinInput", this.el, n)
            }
            this.toggleCompleted()
        } else t > 0 && this.items[t - 1].focus()
    }

    onKeydown(e, t) {
        e.key === "Backspace" && t > 0 && (this.items[t].value === "" ? (this.items[t - 1].value = "", this.items[t - 1].focus()) : this.items[t].value = ""), this.setCurrentValue(), this.toggleCompleted()
    }

    onFocusIn(e) {
        this.items[e].setAttribute("placeholder", "")
    }

    onFocusOut(e) {
        this.items[e].setAttribute("placeholder", this.placeholders[e])
    }

    onPaste(e) {
        e.preventDefault(), this.items.forEach(t => {
            document.activeElement === t && this.autoFillAll(e.clipboardData.getData("text"))
        })
    }
}

window.addEventListener("load", () => {
    We.autoInit()
});
typeof window < "u" && (window.HSPinInput = We);/*
 * HSRemoveElement
 * @version: 2.1.0
 * @author: HTMLStream
 * @license: Licensed under MIT (https://preline.co/docs/license.html)
 * Copyright 2023 HTMLStream
 */
class Me extends k {
    constructor(e, t) {
        super(e, t);
        const s = e.getAttribute("data-hs-remove-element-options"), i = {...s ? JSON.parse(s) : {}, ...t};
        this.removeTargetId = this.el.getAttribute("data-hs-remove-element"), this.removeTarget = document.querySelector(this.removeTargetId), this.removeTargetAnimationClass = (i == null ? void 0 : i.removeTargetAnimationClass) || "hs-removing", this.removeTarget && this.init()
    }

    static autoInit() {
        window.$hsRemoveElementCollection || (window.$hsRemoveElementCollection = []), document.querySelectorAll("[data-hs-remove-element]:not(.--prevent-on-load-init)").forEach(e => {
            window.$hsRemoveElementCollection.find(t => {
                var s;
                return ((s = t == null ? void 0 : t.element) == null ? void 0 : s.el) === e
            }) || new Me(e)
        })
    }

    init() {
        this.createCollection(window.$hsRemoveElementCollection, this), this.el.addEventListener("click", () => this.remove())
    }

    remove() {
        if (!this.removeTarget) return !1;
        this.removeTarget.classList.add(this.removeTargetAnimationClass), H(this.removeTarget, () => {
            this.removeTarget.remove()
        })
    }
}

window.addEventListener("load", () => {
    Me.autoInit()
});
typeof window < "u" && (window.HSRemoveElement = Me);/*
 * HSTogglePassword
 * @version: 2.1.0
 * @author: HTMLStream
 * @license: Licensed under MIT (https://preline.co/docs/license.html)
 * Copyright 2023 HTMLStream
 */
class nt extends k {
    constructor(e, t) {
        super(e, t);
        const s = e.getAttribute("data-hs-search-by-json"), i = {...s ? JSON.parse(s) : {}, ...t};
        this.jsonUrl = i.jsonUrl, this.minChars = i.minChars || 3, this.dropdownTemplate = i.dropdownTemplate || "<div></div>", this.dropdownClasses = i.dropdownClasses || "absolute top-full z-[1] w-full bg-white border border-gray-200 rounded-md hidden mt-2", this.dropdownItemTemplate = i.dropdownItemTemplate || "<div></div>", this.dropdownItemTemplatesByType = i.dropdownItemTemplatesByType || null, this.dropdownItemClasses = i.dropdownItemClasses || "py-2 px-4 w-full cursor-pointer text-sm hover:bg-gray-300 hover:text-black", this.highlightedTextTagName = i.highlightedTextTagName || "u", this.highlightedTextClasses = i.highlightedTextClasses || "bg-green-200", this.jsonUrl && this.fetchData().then(() => this.init())
    }

    static getInstance(e) {
        const t = window.$hsSearchByJsonCollection.find(s => s.element.el === (typeof e == "string" ? document.querySelector(e) : e));
        return t ? t.element : null
    }

    static autoInit() {
        window.$hsSearchByJsonCollection || (window.$hsSearchByJsonCollection = []), document.querySelectorAll("[data-hs-search-by-json]:not(.--prevent-on-load-init)").forEach(e => {
            window.$hsSearchByJsonCollection.find(t => {
                var s;
                return ((s = t == null ? void 0 : t.element) == null ? void 0 : s.el) === e
            }) || new nt(e)
        })
    }

    init() {
        this.createCollection(window.$hsSearchByJsonCollection, this), this.buildDropdown(), this.el.addEventListener("input", Ze(e => {
            this.val = e.target.value, this.val.length > this.minChars ? this.searchData(this.val) : this.result = [], this.result.length ? this.dropdown.classList.remove("hidden") : this.dropdown.classList.add("hidden"), this.buildItems()
        }))
    }

    async fetchData() {
        await fetch(this.jsonUrl).then(e => e.json()).then(e => this.json = e)
    }

    searchData(e) {
        this.result = this.json.filter(t => {
            const s = e.toLowerCase(), n = t.title.toLowerCase(), i = t.description.toLowerCase();
            return n.includes(s) || i.includes(s)
        })
    }

    buildDropdown() {
        this.dropdown = w(this.dropdownTemplate), this.dropdownClasses && q(this.dropdownClasses, this.dropdown), this.el.after(this.dropdown)
    }

    buildItems() {
        this.dropdown.innerHTML = "", this.result.forEach(e => {
            const t = w(`<a class="block" href="${e.url}" target="_blank"></a>`);
            t.append(this.itemTemplate(e)), this.dropdown.append(t)
        })
    }

    itemTemplate(e) {
        const t = new RegExp(this.val, "gi"),
            s = e.title.replace(t, `<${this.highlightedTextTagName} class="inline-block ${this.highlightedTextClasses}">${this.val}</${this.highlightedTextTagName}>`),
            n = e.description.replace(t, `<${this.highlightedTextTagName} class="inline-block ${this.highlightedTextClasses}">${this.val}</${this.highlightedTextTagName}>`),
            i = this.dropdownItemTemplatesByType ? this.dropdownItemTemplatesByType.find(c => c.type === e.type) : null,
            r = w(i ? i.markup : this.dropdownItemTemplate);
        this.dropdownItemClasses && q(this.dropdownItemClasses, r);
        const l = r.querySelector("[data-title]");
        l ? l.append(w(`<span>${s}</span>`)) : r.append(w(`<span>${s}</span>`));
        const a = r.querySelector("[data-description]");
        if (a) a.append(w(`<span>${n}</span>`)); else if (!i) {
            const c = w("<br>");
            r.append(c), r.append(w(`<span>${n}</span>`))
        }
        return r
    }
}

window.addEventListener("load", () => {
    nt.autoInit()
});
typeof window < "u" && (window.HSSearchByJson = nt);/*
 * HSScrollspy
 * @version: 2.1.0
 * @author: HTMLStream
 * @license: Licensed under MIT (https://preline.co/docs/license.html)
 * Copyright 2023 HTMLStream
 */
class Re extends k {
    constructor(e, t = {}) {
        super(e, t), this.activeSection = null, this.contentId = this.el.getAttribute("data-hs-scrollspy"), this.content = document.querySelector(this.contentId), this.links = this.el.querySelectorAll("[href]"), this.sections = [], this.scrollableId = this.el.getAttribute("data-hs-scrollspy-scrollable-parent"), this.scrollable = this.scrollableId ? document.querySelector(this.scrollableId) : document, this.init()
    }

    static getInstance(e, t = !1) {
        const s = window.$hsScrollspyCollection.find(n => n.element.el === (typeof e == "string" ? document.querySelector(e) : e));
        return s ? t ? s : s.element.el : null
    }

    static autoInit() {
        window.$hsScrollspyCollection || (window.$hsScrollspyCollection = []), document.querySelectorAll("[data-hs-scrollspy]:not(.--prevent-on-load-init)").forEach(e => {
            window.$hsScrollspyCollection.find(t => {
                var s;
                return ((s = t == null ? void 0 : t.element) == null ? void 0 : s.el) === e
            }) || new Re(e)
        })
    }

    init() {
        this.createCollection(window.$hsScrollspyCollection, this), this.links.forEach(e => {
            this.sections.push(this.scrollable.querySelector(e.getAttribute("href")))
        }), Array.from(this.sections).forEach(e => {
            if (!e.getAttribute("id")) return !1;
            this.scrollable.addEventListener("scroll", t => this.update(t, e))
        }), this.links.forEach(e => {
            e.addEventListener("click", t => {
                if (t.preventDefault(), e.getAttribute("href") === "javascript:;") return !1;
                this.scrollTo(e)
            })
        })
    }

    update(e, t) {
        const s = parseInt(L(this.el, "--scrollspy-offset", "0")), n = parseInt(L(t, "--scrollspy-offset")) || s,
            i = e.target === document ? 0 : parseInt(String(e.target.getBoundingClientRect().top)),
            r = parseInt(String(t.getBoundingClientRect().top)) - n - i, l = t.offsetHeight;
        if (r <= 0 && r + l > 0) {
            if (this.activeSection === t) return !1;
            this.links.forEach(c => {
                c.classList.remove("active")
            });
            const a = this.el.querySelector(`[href="#${t.getAttribute("id")}"]`);
            if (a) {
                a.classList.add("active");
                const c = a.closest("[data-hs-scrollspy-group]");
                if (c) {
                    const h = c.querySelector("[href]");
                    h && h.classList.add("active")
                }
            }
            this.activeSection = t
        }
    }

    scrollTo(e) {
        const t = e.getAttribute("href"), s = document.querySelector(t),
            n = parseInt(L(this.el, "--scrollspy-offset", "0")), i = parseInt(L(s, "--scrollspy-offset")) || n,
            r = this.scrollable === document ? 0 : this.scrollable.offsetTop, l = s.offsetTop - i - r,
            a = this.scrollable === document ? window : this.scrollable, c = () => {
                window.history.replaceState(null, null, e.getAttribute("href")), "scrollTo" in a && a.scrollTo({
                    top: l,
                    left: 0,
                    behavior: "smooth"
                })
            }, h = this.fireEvent("beforeScroll", this.el);
        E("beforeScroll.hs.scrollspy", this.el, this.el), h instanceof Promise ? h.then(() => c()) : c()
    }
}

window.addEventListener("load", () => {
    Re.autoInit()
});
typeof window < "u" && (window.HSScrollspy = Re);/*
 * HSSelect
 * @version: 2.1.0
 * @author: HTMLStream
 * @license: Licensed under MIT (https://preline.co/docs/license.html)
 * Copyright 2023 HTMLStream
 */
class ce extends k {
    constructor(e, t) {
        super(e, t);
        const s = e.getAttribute("data-hs-select"), i = {...s ? JSON.parse(s) : {}, ...t};
        this.value = (i == null ? void 0 : i.value) || this.el.value || null, this.placeholder = (i == null ? void 0 : i.placeholder) || "Select...", this.hasSearch = (i == null ? void 0 : i.hasSearch) || !1, this.preventSearchFocus = (i == null ? void 0 : i.preventSearchFocus) || !1, this.mode = (i == null ? void 0 : i.mode) || "default", this.viewport = typeof (i == null ? void 0 : i.viewport) < "u" ? document.querySelector(i == null ? void 0 : i.viewport) : null, this.isOpened = !!(i != null && i.isOpened) || !1, this.isMultiple = this.el.hasAttribute("multiple") || !1, this.isDisabled = this.el.hasAttribute("disabled") || !1, this.selectedItems = [], this.wrapperClasses = (i == null ? void 0 : i.wrapperClasses) || null, this.toggleTag = (i == null ? void 0 : i.toggleTag) || null, this.toggleClasses = (i == null ? void 0 : i.toggleClasses) || null, this.toggleCountText = (i == null ? void 0 : i.toggleCountText) || null, this.toggleCountTextMinItems = (i == null ? void 0 : i.toggleCountTextMinItems) || 1, this.tagsItemTemplate = (i == null ? void 0 : i.tagsItemTemplate) || null, this.tagsItemClasses = (i == null ? void 0 : i.tagsItemClasses) || null, this.tagsInputClasses = (i == null ? void 0 : i.tagsInputClasses) || null, this.dropdownTag = (i == null ? void 0 : i.dropdownTag) || null, this.dropdownClasses = (i == null ? void 0 : i.dropdownClasses) || null, this.dropdownDirectionClasses = (i == null ? void 0 : i.dropdownDirectionClasses) || null, this.dropdownSpace = (i == null ? void 0 : i.dropdownSpace) || 10, this.searchWrapperTemplate = (i == null ? void 0 : i.searchWrapperTemplate) || null, this.searchWrapperClasses = (i == null ? void 0 : i.searchWrapperClasses) || "bg-white p-2 sticky top-0", this.searchClasses = (i == null ? void 0 : i.searchClasses) || "block w-[calc(100%-2rem)] text-sm border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 py-2 px-3 my-2 mx-4", this.searchPlaceholder = (i == null ? void 0 : i.searchPlaceholder) || "Search...", this.searchNoResultText = (i == null ? void 0 : i.searchNoResultText) || "No results found", this.searchNoResultClasses = (i == null ? void 0 : i.searchNoResultClasses) || "px-4 text-sm text-gray-800 dark:text-neutral-200", this.optionTemplate = (i == null ? void 0 : i.optionTemplate) || null, this.optionTag = (i == null ? void 0 : i.optionTag) || null, this.optionClasses = (i == null ? void 0 : i.optionClasses) || null, this.extraMarkup = (i == null ? void 0 : i.extraMarkup) || null, this.descriptionClasses = (i == null ? void 0 : i.descriptionClasses) || null, this.iconClasses = (i == null ? void 0 : i.iconClasses) || null, this.isAddTagOnEnter = (i == null ? void 0 : i.isAddTagOnEnter) ?? !0, this.animationInProcess = !1, this.selectOptions = [], this.tagsInputHelper = null, this.init()
    }

    static getInstance(e, t) {
        const s = window.$hsSelectCollection.find(n => n.element.el === (typeof e == "string" ? document.querySelector(e) : e));
        return s ? t ? s : s.element : null
    }

    static autoInit() {
        window.$hsSelectCollection || (window.$hsSelectCollection = []), document.querySelectorAll("[data-hs-select]:not(.--prevent-on-load-init)").forEach(e => {
            if (!window.$hsSelectCollection.find(t => {
                var s;
                return ((s = t == null ? void 0 : t.element) == null ? void 0 : s.el) === e
            })) {
                const t = e.getAttribute("data-hs-select"), s = t ? JSON.parse(t) : {};
                new ce(e, s)
            }
        }), window.$hsSelectCollection && (window.addEventListener("click", e => {
            const t = e.target;
            ce.closeCurrentlyOpened(t)
        }), document.addEventListener("keydown", e => ce.accessibility(e)))
    }

    static close(e) {
        const t = window.$hsSelectCollection.find(s => s.element.el === (typeof e == "string" ? document.querySelector(e) : e));
        t && t.element.isOpened && t.element.close()
    }

    static closeCurrentlyOpened(e = null) {
        if (!e.closest(".hs-select.active")) {
            const t = window.$hsSelectCollection.filter(s => s.element.isOpened) || null;
            t && t.forEach(s => {
                s.element.close()
            })
        }
    }

    static accessibility(e) {
        if (window.$hsSelectCollection.find(s => s.element.isOpened) && $s.includes(e.code) && !e.metaKey) switch (e.code) {
            case"Escape":
                e.preventDefault(), this.onEscape();
                break;
            case"ArrowUp":
                e.preventDefault(), this.onArrow();
                break;
            case"ArrowDown":
                e.preventDefault(), this.onArrow(!1);
                break;
            case"Tab":
                e.preventDefault(), this.onTab(e.shiftKey);
                break;
            case"Home":
                e.preventDefault(), this.onStartEnd();
                break;
            case"End":
                e.preventDefault(), this.onStartEnd(!1);
                break;
            case"Enter":
                e.preventDefault(), this.onEnter(e);
                break
        }
    }

    static onEscape() {
        const e = window.$hsSelectCollection.find(t => t.element.isOpened);
        e && e.element.close()
    }

    static onArrow(e = !0) {
        const t = window.$hsSelectCollection.find(s => s.element.isOpened);
        if (t) {
            const s = t.element.dropdown;
            if (!s) return !1;
            const i = (e ? Array.from(s.querySelectorAll(":scope > *:not(.hidden)")).reverse() : Array.from(s.querySelectorAll(":scope > *:not(.hidden)"))).filter(a => !a.classList.contains("disabled")),
                r = s.querySelector(".hs-select-option-highlighted");
            r || i[0].classList.add("hs-select-option-highlighted");
            let l = i.findIndex(a => a === r);
            l + 1 < i.length && l++, i[l].focus(), r && r.classList.remove("hs-select-option-highlighted"), i[l].classList.add("hs-select-option-highlighted")
        }
    }

    static onTab(e = !0) {
        const t = window.$hsSelectCollection.find(s => s.element.isOpened);
        if (t) {
            const s = t.element.dropdown;
            if (!s) return !1;
            const i = (e ? Array.from(s.querySelectorAll(":scope >  *:not(.hidden)")).reverse() : Array.from(s.querySelectorAll(":scope >  *:not(.hidden)"))).filter(a => !a.classList.contains("disabled")),
                r = s.querySelector(".hs-select-option-highlighted");
            r || i[0].classList.add("hs-select-option-highlighted");
            let l = i.findIndex(a => a === r);
            if (l + 1 < i.length) l++; else return r && r.classList.remove("hs-select-option-highlighted"), t.element.close(), t.element.toggle.focus(), !1;
            i[l].focus(), r && r.classList.remove("hs-select-option-highlighted"), i[l].classList.add("hs-select-option-highlighted")
        }
    }

    static onStartEnd(e = !0) {
        const t = window.$hsSelectCollection.find(s => s.element.isOpened);
        if (t) {
            const s = t.element.dropdown;
            if (!s) return !1;
            const i = (e ? Array.from(s.querySelectorAll(":scope >  *:not(.hidden)")) : Array.from(s.querySelectorAll(":scope >  *:not(.hidden)")).reverse()).filter(l => !l.classList.contains("disabled")),
                r = s.querySelector(".hs-select-option-highlighted");
            i.length && (i[0].focus(), r && r.classList.remove("hs-select-option-highlighted"), i[0].classList.add("hs-select-option-highlighted"))
        }
    }

    static onEnter(e) {
        const t = e.target.previousSibling;
        if (window.$hsSelectCollection.find(s => s.element.el === t)) {
            const s = window.$hsSelectCollection.find(i => i.element.isOpened),
                n = window.$hsSelectCollection.find(i => i.element.el === t);
            s.element.close(), n.element.open()
        } else {
            const s = window.$hsSelectCollection.find(n => n.element.isOpened);
            s && s.element.onSelectOption(e.target.dataset.value || "")
        }
    }

    init() {
        this.createCollection(window.$hsSelectCollection, this), this.build()
    }

    build() {
        if (this.el.style.display = "none", this.el.children && Array.from(this.el.children).filter(e => e.value && e.value !== "").forEach(e => {
            const t = e.getAttribute("data-hs-select-option");
            this.selectOptions = [...this.selectOptions, {
                title: e.textContent,
                val: e.value,
                options: t !== "undefined" ? JSON.parse(t) : null
            }]
        }), this.isMultiple) {
            const e = Array.from(this.el.options).filter(t => t.selected);
            if (e) {
                const t = [];
                e.forEach(s => {
                    t.push(s.value)
                }), this.value = t
            }
        }
        this.buildWrapper(), this.mode === "tags" ? this.buildTags() : this.buildToggle(), this.buildDropdown(), this.extraMarkup && this.buildExtraMarkup()
    }

    buildWrapper() {
        this.wrapper = document.createElement("div"), this.wrapper.classList.add("hs-select", "relative"), this.mode === "tags" && this.wrapper.addEventListener("click", e => {
            !e.target.closest("[data-hs-select-dropdown]") && !e.target.closest("[data-tag-value]") && this.tagsInput.focus()
        }), this.wrapperClasses && q(this.wrapperClasses, this.wrapper), this.el.before(this.wrapper), this.wrapper.append(this.el)
    }

    buildExtraMarkup() {
        const e = t => {
            this.wrapper.append(w(t))
        };
        Array.isArray(this.extraMarkup) ? this.extraMarkup.forEach(t => e(t)) : e(this.extraMarkup)
    }

    buildToggle() {
        var s;
        let e, t;
        this.toggleTextWrapper = document.createElement("span"), this.toggleTextWrapper.classList.add("truncate"), this.toggle = w(this.toggleTag || "<div></div>"), e = this.toggle.querySelector("[data-icon]"), t = this.toggle.querySelector("[data-title]"), !this.isMultiple && e && this.setToggleIcon(), !this.isMultiple && t && this.setToggleTitle(), this.isMultiple ? this.toggleTextWrapper.innerHTML = this.value.length ? this.stringFromValue() : this.placeholder : this.toggleTextWrapper.innerHTML = ((s = this.getItemByValue(this.value)) == null ? void 0 : s.title) || this.placeholder, t || this.toggle.append(this.toggleTextWrapper), this.toggleClasses && q(this.toggleClasses, this.toggle), this.isDisabled && this.toggle.classList.add("disabled"), this.wrapper && this.wrapper.append(this.toggle), this.toggle.addEventListener("click", () => {
            if (this.isDisabled) return !1;
            this.isOpened ? this.close() : this.open()
        })
    }

    setToggleIcon() {
        var t, s;
        const e = this.toggle.querySelector("[data-icon]");
        if (e.innerHTML = "", e) {
            const n = w(((s = (t = this.getItemByValue(this.value)) == null ? void 0 : t.options) == null ? void 0 : s.icon) || "");
            e.append(n), n ? e.classList.remove("hidden") : e.classList.add("hidden")
        }
    }

    setToggleTitle() {
        var t;
        const e = this.toggle.querySelector("[data-title]");
        if (e.classList.add("truncate"), e.innerHTML = "", e) {
            const s = ((t = this.getItemByValue(this.value)) == null ? void 0 : t.title) || this.placeholder;
            e.innerHTML = s, this.toggle.append(e)
        }
    }

    buildTags() {
        this.buildTagsInput(), this.setTagsItems()
    }

    reassignTagsInputPlaceholder(e) {
        this.tagsInput.placeholder = e, this.tagsInputHelper.innerHTML = e, this.calculateInputWidth()
    }

    buildTagsItem(e) {
        var a, c, h;
        const t = this.getItemByValue(e);
        let s, n, i, r;
        const l = document.createElement("div");
        if (l.setAttribute("data-tag-value", e), this.tagsItemClasses && q(this.tagsItemClasses, l), this.tagsItemTemplate && (s = w(this.tagsItemTemplate), l.append(s)), (a = t == null ? void 0 : t.options) != null && a.icon) {
            const d = w((c = t == null ? void 0 : t.options) == null ? void 0 : c.icon);
            r = s ? s.querySelector("[data-icon]") : document.createElement("span"), r.append(d), s || l.append(r)
        }
        s && s.querySelector("[data-icon]") && !((h = t == null ? void 0 : t.options) != null && h.icon) && s.querySelector("[data-icon]").classList.add("hidden"), n = s ? s.querySelector("[data-title]") : document.createElement("span"), n.textContent = t.title || "", s || l.append(n), s ? i = s.querySelector("[data-remove]") : (i = document.createElement("span"), i.textContent = "X", l.append(i)), i.addEventListener("click", () => {
            this.value = this.value.filter(d => d !== e), this.selectedItems = this.selectedItems.filter(d => d !== e), this.value.length || this.reassignTagsInputPlaceholder(this.placeholder), this.unselectMultipleItems(), this.selectMultipleItems(), l.remove()
        }), this.wrapper.append(l)
    }

    getItemByValue(e) {
        return this.selectOptions.find(t => t.val === e)
    }

    setTagsItems() {
        this.value && this.value.forEach(e => {
            this.selectedItems.includes(e) || this.buildTagsItem(e), this.selectedItems = this.selectedItems.includes(e) ? this.selectedItems : [...this.selectedItems, e]
        })
    }

    buildTagsInput() {
        this.tagsInput = document.createElement("input"), this.tagsInputClasses && q(this.tagsInputClasses, this.tagsInput), this.tagsInput.addEventListener("focus", () => this.open()), this.tagsInput.addEventListener("input", () => this.calculateInputWidth()), this.tagsInput.addEventListener("input", Ze(e => this.searchOptions(e.target.value))), this.tagsInput.addEventListener("keydown", e => {
            if (e.key === "Enter" && this.isAddTagOnEnter) {
                const t = e.target.value;
                if (this.selectOptions.find(s => s.val === t)) return !1;
                this.addSelectOption(t, t), this.buildOption(t, t), this.dropdown.querySelector(`[data-value="${t}"]`).click(), this.resetTagsInputField()
            }
        }), this.wrapper.append(this.tagsInput), setTimeout(() => {
            this.adjustInputWidth(), this.reassignTagsInputPlaceholder(this.value.length ? "" : this.placeholder)
        })
    }

    buildDropdown() {
        this.dropdown = w(this.dropdownTag || "<div></div>"), this.dropdown.setAttribute("data-hs-select-dropdown", ""), this.dropdown.classList.add("absolute", "top-full"), this.isOpened || this.dropdown.classList.add("hidden"), this.dropdownClasses && q(this.dropdownClasses, this.dropdown), this.wrapper && this.wrapper.append(this.dropdown), this.dropdown && this.hasSearch && this.buildSearch(), this.selectOptions && this.selectOptions.forEach((e, t) => this.buildOption(e.title, e.val, e.options, `${t}`))
    }

    buildSearch() {
        let e;
        this.searchWrapper = w(this.searchWrapperTemplate || "<div></div>"), this.searchWrapperClasses && q(this.searchWrapperClasses, this.searchWrapper), e = this.searchWrapper.querySelector("[data-input]"), this.search = w('<input type="text" />'), this.search.placeholder = this.searchPlaceholder, this.searchClasses && q(this.searchClasses, this.search), this.search.addEventListener("input", Ze(t => this.searchOptions(t.target.value))), e ? e.append(this.search) : this.searchWrapper.append(this.search), this.dropdown.append(this.searchWrapper)
    }

    buildOption(e, t, s, n = "1") {
        let i = null, r = null, l = null, a = null;
        const c = w(this.optionTag || "<div></div>");
        if (c.setAttribute("data-value", t), c.setAttribute("data-title-value", e), c.setAttribute("tabIndex", n), c.classList.add("cursor-pointer"), this.optionTemplate && (i = w(this.optionTemplate), c.append(i)), i ? (r = i.querySelector("[data-title]"), r.textContent = e || "") : c.textContent = e || "", s) {
            if (s.icon) {
                const h = w(s.icon);
                if (h.classList.add("mw-full"), i) l = i.querySelector("[data-icon]"), l.append(h); else {
                    const d = w("<div></div>");
                    this.iconClasses && q(this.iconClasses, d), d.append(h), c.append(d)
                }
            }
            if (s.description) if (i) a = i.querySelector("[data-description]"), a.append(s.description); else {
                const h = w("<div></div>");
                h.textContent = s.description, this.descriptionClasses && q(this.descriptionClasses, h), c.append(h)
            }
        }
        i && i.querySelector("[data-icon]") && !s && !(s != null && s.icon) && i.querySelector("[data-icon]").classList.add("hidden"), this.value && (this.isMultiple ? this.value.includes(t) : this.value === t) && c.classList.add("selected"), c.addEventListener("click", () => this.onSelectOption(t)), this.optionClasses && q(this.optionClasses, c), this.dropdown && this.dropdown.append(c)
    }

    destroyOption(e) {
        const t = this.dropdown.querySelector(`[data-value="${e}"]`);
        if (!t) return !1;
        t.remove()
    }

    buildOriginalOption(e, t, s) {
        const n = w("<option></option>");
        n.setAttribute("value", t), n.setAttribute("data-hs-select-option", JSON.stringify(s)), n.innerText = e, this.el.append(n)
    }

    destroyOriginalOption(e) {
        const t = this.el.querySelector(`[value="${e}"]`);
        if (!t) return !1;
        t.remove()
    }

    buildTagsInputHelper() {
        this.tagsInputHelper = document.createElement("span"), this.tagsInputHelper.style.fontSize = window.getComputedStyle(this.tagsInput).fontSize, this.tagsInputHelper.style.fontFamily = window.getComputedStyle(this.tagsInput).fontFamily, this.tagsInputHelper.style.fontWeight = window.getComputedStyle(this.tagsInput).fontWeight, this.tagsInputHelper.style.letterSpacing = window.getComputedStyle(this.tagsInput).letterSpacing, this.tagsInputHelper.style.visibility = "hidden", this.tagsInputHelper.style.whiteSpace = "pre", this.tagsInputHelper.style.position = "absolute", this.wrapper.appendChild(this.tagsInputHelper)
    }

    calculateInputWidth() {
        this.tagsInputHelper.textContent = this.tagsInput.value || this.tagsInput.placeholder;
        const e = parseInt(window.getComputedStyle(this.tagsInput).paddingLeft) + parseInt(window.getComputedStyle(this.tagsInput).paddingRight),
            t = parseInt(window.getComputedStyle(this.tagsInput).borderLeftWidth) + parseInt(window.getComputedStyle(this.tagsInput).borderRightWidth),
            s = this.tagsInputHelper.offsetWidth + e + t,
            n = this.wrapper.offsetWidth - (parseInt(window.getComputedStyle(this.wrapper).paddingLeft) + parseInt(window.getComputedStyle(this.wrapper).paddingRight));
        this.tagsInput.style.width = `${Math.min(s, n) + 2}px`
    }

    adjustInputWidth() {
        this.buildTagsInputHelper(), this.calculateInputWidth()
    }

    onSelectOption(e) {
        if (this.clearSelections(), this.isMultiple ? (this.value = this.value.includes(e) ? Array.from(this.value).filter(t => t !== e) : [...Array.from(this.value), e], this.selectMultipleItems(), this.setNewValue()) : (this.value = e, this.selectSingleItem(), this.setNewValue()), this.fireEvent("change", this.value), E("change.hs.select", this.el, this.value), this.mode === "tags") {
            const t = this.selectedItems.filter(s => !this.value.includes(s));
            t.length && t.forEach(s => {
                this.selectedItems = this.selectedItems.filter(n => n !== s), this.wrapper.querySelector(`[data-tag-value="${s}"]`).remove()
            }), this.resetTagsInputField()
        }
        this.isMultiple || (this.toggle.querySelector("[data-icon]") && this.setToggleIcon(), this.toggle.querySelector("[data-title]") && this.setToggleTitle(), this.close()), !this.value.length && this.mode === "tags" && this.reassignTagsInputPlaceholder(this.placeholder), this.isOpened && this.mode === "tags" && this.tagsInput && this.tagsInput.focus(), this.triggerChangeEventForNativeSelect()
    }

    triggerChangeEventForNativeSelect() {
        this.el.value = `${this.value}`;
        const e = new Event("change", {bubbles: !0});
        this.el.dispatchEvent(e)
    }

    addSelectOption(e, t, s) {
        this.selectOptions = [...this.selectOptions, {title: e, val: t, options: s}]
    }

    removeSelectOption(e) {
        if (!!!this.selectOptions.some(s => s.val === e)) return !1;
        this.selectOptions = this.selectOptions.filter(s => s.val !== e)
    }

    resetTagsInputField() {
        this.tagsInput.value = "", this.reassignTagsInputPlaceholder(""), this.searchOptions("")
    }

    clearSelections() {
        Array.from(this.dropdown.children).forEach(e => {
            e.classList.contains("selected") && e.classList.remove("selected")
        }), Array.from(this.el.children).forEach(e => {
            e.selected && (e.selected = !1)
        })
    }

    setNewValue() {
        this.mode === "tags" ? this.setTagsItems() : this.value.length ? this.toggleTextWrapper.innerHTML = this.stringFromValue() : this.toggleTextWrapper.innerHTML = this.placeholder
    }

    stringFromValue() {
        const e = [];
        return this.selectOptions.forEach(t => {
            this.isMultiple ? this.value.includes(t.val) && e.push(t.title) : this.value === t.val && e.push(t.title)
        }), this.toggleCountText && this.toggleCountText !== "" && e.length >= this.toggleCountTextMinItems ? `${e.length} ${this.toggleCountText}` : e.join(", ")
    }

    selectSingleItem() {
        const e = Array.from(this.el.children).find(s => this.value === s.value);
        e.selected = !0, Array.from(this.dropdown.children).find(s => this.value === s.getAttribute("data-value")).classList.add("selected")
    }

    selectMultipleItems() {
        Array.from(this.dropdown.children).filter(e => this.value.includes(e.getAttribute("data-value"))).forEach(e => e.classList.add("selected")), Array.from(this.el.children).filter(e => this.value.includes(e.value)).forEach(e => e.selected = !0)
    }

    unselectMultipleItems() {
        Array.from(this.dropdown.children).forEach(e => e.classList.remove("selected")), Array.from(this.el.children).forEach(e => e.selected = !1)
    }

    searchOptions(e) {
        this.searchNoResult && (this.searchNoResult.remove(), this.searchNoResult = null), this.searchNoResult = w("<span></span>"), this.searchNoResult.innerText = this.searchNoResultText, q(this.searchNoResultClasses, this.searchNoResult);
        const t = this.dropdown.querySelectorAll("[data-value]");
        let s = !1;
        t.forEach(n => {
            n.getAttribute("data-title-value").toLocaleLowerCase().includes(e.toLocaleLowerCase()) ? (n.classList.remove("hidden"), s = !0) : n.classList.add("hidden")
        }), s || this.dropdown.append(this.searchNoResult)
    }

    eraseToggleIcon() {
        const e = this.toggle.querySelector("[data-icon]");
        e && (e.innerHTML = null, e.classList.add("hidden"))
    }

    eraseToggleTitle() {
        const e = this.toggle.querySelector("[data-title]");
        e ? e.innerHTML = this.placeholder : this.toggleTextWrapper.innerHTML = this.placeholder
    }

    destroy() {
        const e = this.el.parentElement.parentElement;
        this.el.classList.remove("hidden"), this.el.style.display = "", e.prepend(this.el), e.querySelector(".hs-select").remove(), this.wrapper = null
    }

    open() {
        if (this.animationInProcess) return !1;
        this.animationInProcess = !0, this.dropdown.classList.remove("hidden"), this.recalculateDirection(), setTimeout(() => {
            this.wrapper.classList.add("active"), this.dropdown.classList.add("opened"), this.hasSearch && !this.preventSearchFocus && this.search.focus(), this.animationInProcess = !1
        }), this.isOpened = !0
    }

    close() {
        var e, t, s;
        if (this.animationInProcess) return !1;
        this.animationInProcess = !0, this.wrapper.classList.remove("active"), this.dropdown.classList.remove("opened", "bottom-full", "top-full"), (e = this.dropdownDirectionClasses) != null && e.bottom && this.dropdown.classList.remove(this.dropdownDirectionClasses.bottom), (t = this.dropdownDirectionClasses) != null && t.top && this.dropdown.classList.remove(this.dropdownDirectionClasses.top), this.dropdown.style.marginTop = "", this.dropdown.style.marginBottom = "", H(this.dropdown, () => {
            this.dropdown.classList.add("hidden"), this.hasSearch && (this.search.value = "", this.search.dispatchEvent(new Event("input", {bubbles: !0})), this.search.blur()), this.animationInProcess = !1
        }), (s = this.dropdown.querySelector(".hs-select-option-highlighted")) == null || s.classList.remove("hs-select-option-highlighted"), this.isOpened = !1
    }

    addOption(e) {
        let t = `${this.selectOptions.length}`;
        const s = n => {
            const {title: i, val: r, options: l} = n;
            !!this.selectOptions.some(c => c.val === r) || (this.addSelectOption(i, r, l), this.buildOption(i, r, l, t), this.buildOriginalOption(i, r, l))
        };
        Array.isArray(e) ? e.forEach(n => {
            s(n)
        }) : s(e)
    }

    removeOption(e) {
        const t = s => {
            !!this.selectOptions.some(i => i.val === s) && (this.removeSelectOption(s), this.destroyOption(s), this.destroyOriginalOption(s), this.value === s && (this.value = null, this.eraseToggleTitle(), this.eraseToggleIcon()))
        };
        Array.isArray(e) ? e.forEach(s => {
            t(s)
        }) : t(e)
    }

    recalculateDirection() {
        var e, t, s, n;
        mt(this.dropdown, this.toggle || this.tagsInput, "bottom", this.dropdownSpace, this.viewport) ? (this.dropdown.classList.remove("bottom-full"), (e = this.dropdownDirectionClasses) != null && e.bottom && this.dropdown.classList.remove(this.dropdownDirectionClasses.bottom), this.dropdown.style.marginBottom = "", this.dropdown.classList.add("top-full"), (t = this.dropdownDirectionClasses) != null && t.top && this.dropdown.classList.add(this.dropdownDirectionClasses.top), this.dropdown.style.marginTop = `${this.dropdownSpace}px`) : (this.dropdown.classList.remove("top-full"), (s = this.dropdownDirectionClasses) != null && s.top && this.dropdown.classList.remove(this.dropdownDirectionClasses.top), this.dropdown.style.marginTop = "", this.dropdown.classList.add("bottom-full"), (n = this.dropdownDirectionClasses) != null && n.bottom && this.dropdown.classList.add(this.dropdownDirectionClasses.bottom), this.dropdown.style.marginBottom = `${this.dropdownSpace}px`)
    }
}

window.addEventListener("load", () => {
    ce.autoInit()
});
document.addEventListener("scroll", () => {
    if (!window.$hsSelectCollection) return !1;
    const o = window.$hsSelectCollection.find(e => e.element.isOpened);
    o && o.element.recalculateDirection()
});
typeof window < "u" && (window.HSSelect = ce);/*
 * HSStepper
 * @version: 2.1.0
 * @author: HTMLStream
 * @license: Licensed under MIT (https://preline.co/docs/license.html)
 * Copyright 2023 HTMLStream
 */
class Ve extends k {
    constructor(e, t) {
        super(e, t);
        const s = e.getAttribute("data-hs-stepper"), i = {...s ? JSON.parse(s) : {}, ...t};
        this.currentIndex = (i == null ? void 0 : i.currentIndex) || 1, this.mode = (i == null ? void 0 : i.mode) || "linear", this.isCompleted = typeof (i == null ? void 0 : i.isCompleted) < "u" ? i == null ? void 0 : i.isCompleted : !1, this.totalSteps = 1, this.navItems = [], this.contentItems = [], this.init()
    }

    static getInstance(e, t) {
        const s = window.$hsStepperCollection.find(n => n.element.el === (typeof e == "string" ? document.querySelector(e) : e));
        return s ? t ? s : s.element : null
    }

    static autoInit() {
        window.$hsStepperCollection || (window.$hsStepperCollection = []), document.querySelectorAll("[data-hs-stepper]:not(.--prevent-on-load-init)").forEach(e => {
            window.$hsStepperCollection.find(t => {
                var s;
                return ((s = t == null ? void 0 : t.element) == null ? void 0 : s.el) === e
            }) || new Ve(e)
        })
    }

    init() {
        this.createCollection(window.$hsStepperCollection, this), this.buildNav(), this.buildContent(), this.buildButtons(), this.setTotalSteps()
    }

    getUncompletedSteps(e = !1) {
        return this.navItems.filter(({isCompleted: t, isSkip: s}) => e ? !t || s : !t && !s)
    }

    setTotalSteps() {
        this.navItems.forEach(e => {
            const {index: t} = e;
            t > this.totalSteps && (this.totalSteps = t)
        })
    }

    buildNav() {
        this.el.querySelectorAll("[data-hs-stepper-nav-item]").forEach(e => this.addNavItem(e)), this.navItems.forEach(e => this.buildNavItem(e))
    }

    buildNavItem(e) {
        const {index: t, isDisabled: s, el: n} = e;
        t === this.currentIndex && this.setCurrentNavItem(), (this.mode !== "linear" || s) && n.addEventListener("click", () => this.handleNavItemClick(e))
    }

    addNavItem(e) {
        const {
            index: t,
            isFinal: s = !1,
            isCompleted: n = !1,
            isSkip: i = !1,
            isOptional: r = !1,
            isDisabled: l = !1,
            isProcessed: a = !1,
            hasError: c = !1
        } = JSON.parse(e.getAttribute("data-hs-stepper-nav-item"));
        n && e.classList.add("success"), i && e.classList.add("skipped"), l && ((e.tagName === "BUTTON" || e.tagName === "INPUT") && e.setAttribute("disabled", "disabled"), e.classList.add("disabled")), c && e.classList.add("error"), this.navItems.push({
            index: t,
            isFinal: s,
            isCompleted: n,
            isSkip: i,
            isOptional: r,
            isDisabled: l,
            isProcessed: a,
            hasError: c,
            el: e
        })
    }

    setCurrentNavItem() {
        this.navItems.forEach(e => {
            const {index: t, el: s} = e;
            t === this.currentIndex ? this.setCurrentNavItemActions(s) : this.unsetCurrentNavItemActions(s)
        })
    }

    setCurrentNavItemActions(e) {
        e.classList.add("active"), this.fireEvent("active", this.currentIndex), E("active.hs.stepper", this.el, this.currentIndex)
    }

    getNavItem(e = this.currentIndex) {
        return this.navItems.find(({index: t}) => t === e)
    }

    setProcessedNavItemActions(e) {
        e.isProcessed = !0, e.el.classList.add("processed")
    }

    setErrorNavItemActions(e) {
        e.hasError = !0, e.el.classList.add("error")
    }

    unsetCurrentNavItemActions(e) {
        e.classList.remove("active")
    }

    handleNavItemClick(e) {
        const {index: t} = e;
        this.currentIndex = t, this.setCurrentNavItem(), this.setCurrentContentItem(), this.checkForTheFirstStep()
    }

    buildContent() {
        this.el.querySelectorAll("[data-hs-stepper-content-item]").forEach(e => this.addContentItem(e)), this.navItems.forEach(e => this.buildContentItem(e))
    }

    buildContentItem(e) {
        const {index: t} = e;
        t === this.currentIndex && this.setCurrentContentItem()
    }

    addContentItem(e) {
        const {
            index: t,
            isFinal: s = !1,
            isCompleted: n = !1,
            isSkip: i = !1
        } = JSON.parse(e.getAttribute("data-hs-stepper-content-item"));
        n && e.classList.add("success"), i && e.classList.add("skipped"), this.contentItems.push({
            index: t,
            isFinal: s,
            isCompleted: n,
            isSkip: i,
            el: e
        })
    }

    setCurrentContentItem() {
        if (this.isCompleted) {
            const e = this.contentItems.find(({isFinal: s}) => s), t = this.contentItems.filter(({isFinal: s}) => !s);
            return e.el.style.display = "", t.forEach(({el: s}) => s.style.display = "none"), !1
        }
        this.contentItems.forEach(e => {
            const {index: t, el: s} = e;
            t === this.currentIndex ? this.setCurrentContentItemActions(s) : this.unsetCurrentContentItemActions(s)
        })
    }

    hideAllContentItems() {
        this.contentItems.forEach(({el: e}) => e.style.display = "none")
    }

    setCurrentContentItemActions(e) {
        e.style.display = ""
    }

    unsetCurrentContentItemActions(e) {
        e.style.display = "none"
    }

    disableAll() {
        const e = this.getNavItem(this.currentIndex);
        e.hasError = !1, e.isCompleted = !1, e.isDisabled = !1, e.el.classList.remove("error", "success"), this.disableButtons()
    }

    disableNavItemActions(e) {
        e.isDisabled = !0, e.el.classList.add("disabled")
    }

    enableNavItemActions(e) {
        e.isDisabled = !1, e.el.classList.remove("disabled")
    }

    buildButtons() {
        this.backBtn = this.el.querySelector("[data-hs-stepper-back-btn]"), this.nextBtn = this.el.querySelector("[data-hs-stepper-next-btn]"), this.skipBtn = this.el.querySelector("[data-hs-stepper-skip-btn]"), this.completeStepBtn = this.el.querySelector("[data-hs-stepper-complete-step-btn]"), this.finishBtn = this.el.querySelector("[data-hs-stepper-finish-btn]"), this.resetBtn = this.el.querySelector("[data-hs-stepper-reset-btn]"), this.buildBackButton(), this.buildNextButton(), this.buildSkipButton(), this.buildCompleteStepButton(), this.buildFinishButton(), this.buildResetButton()
    }

    buildBackButton() {
        this.backBtn && (this.checkForTheFirstStep(), this.backBtn.addEventListener("click", () => {
            if (this.handleBackButtonClick(), this.mode === "linear") {
                const e = this.navItems.find(({index: s}) => s === this.currentIndex),
                    t = this.contentItems.find(({index: s}) => s === this.currentIndex);
                if (!e || !t) return;
                e.isCompleted && (e.isCompleted = !1, e.isSkip = !1, e.el.classList.remove("success", "skipped")), t.isCompleted && (t.isCompleted = !1, t.isSkip = !1, t.el.classList.remove("success", "skipped")), this.mode === "linear" && this.currentIndex !== this.totalSteps && (this.nextBtn && (this.nextBtn.style.display = ""), this.completeStepBtn && (this.completeStepBtn.style.display = "")), this.showSkipButton(), this.showFinishButton(), this.showCompleteStepButton()
            }
        }))
    }

    handleBackButtonClick() {
        this.currentIndex !== 1 && (this.mode === "linear" && this.removeOptionalClasses(), this.currentIndex--, this.mode === "linear" && this.removeOptionalClasses(), this.setCurrentNavItem(), this.setCurrentContentItem(), this.checkForTheFirstStep(), this.completeStepBtn && this.changeTextAndDisableCompleteButtonIfStepCompleted(), this.fireEvent("back", this.currentIndex), E("back.hs.stepper", this.el, this.currentIndex))
    }

    checkForTheFirstStep() {
        this.currentIndex === 1 ? this.setToDisabled(this.backBtn) : this.setToNonDisabled(this.backBtn)
    }

    setToDisabled(e) {
        (e.tagName === "BUTTON" || e.tagName === "INPUT") && e.setAttribute("disabled", "disabled"), e.classList.add("disabled")
    }

    setToNonDisabled(e) {
        (e.tagName === "BUTTON" || e.tagName === "INPUT") && e.removeAttribute("disabled"), e.classList.remove("disabled")
    }

    buildNextButton() {
        this.nextBtn && this.nextBtn.addEventListener("click", () => {
            var e;
            if (this.fireEvent("beforeNext", this.currentIndex), E("beforeNext.hs.stepper", this.el, this.currentIndex), (e = this.getNavItem(this.currentIndex)) != null && e.isProcessed) return this.disableAll(), !1;
            this.goToNext()
        })
    }

    unsetProcessedNavItemActions(e) {
        e.isProcessed = !1, e.el.classList.remove("processed")
    }

    handleNextButtonClick(e = !0) {
        if (e) this.currentIndex === this.totalSteps ? this.currentIndex = 1 : this.currentIndex++; else {
            const t = this.getUncompletedSteps();
            if (t.length === 1) {
                const {index: s} = t[0];
                this.currentIndex = s
            } else {
                if (this.currentIndex === this.totalSteps) return;
                this.currentIndex++
            }
        }
        this.mode === "linear" && this.removeOptionalClasses(), this.setCurrentNavItem(), this.setCurrentContentItem(), this.checkForTheFirstStep(), this.completeStepBtn && this.changeTextAndDisableCompleteButtonIfStepCompleted(), this.showSkipButton(), this.showFinishButton(), this.showCompleteStepButton(), this.fireEvent("next", this.currentIndex), E("next.hs.stepper", this.el, this.currentIndex)
    }

    removeOptionalClasses() {
        const e = this.navItems.find(({index: s}) => s === this.currentIndex),
            t = this.contentItems.find(({index: s}) => s === this.currentIndex);
        e.isSkip = !1, e.hasError = !1, e.isDisabled = !1, t.isSkip = !1, e.el.classList.remove("skipped", "success", "error"), t.el.classList.remove("skipped", "success", "error")
    }

    buildSkipButton() {
        this.skipBtn && (this.showSkipButton(), this.skipBtn.addEventListener("click", () => {
            this.handleSkipButtonClick(), this.mode === "linear" && this.currentIndex === this.totalSteps && (this.nextBtn && (this.nextBtn.style.display = "none"), this.completeStepBtn && (this.completeStepBtn.style.display = "none"), this.finishBtn && (this.finishBtn.style.display = ""))
        }))
    }

    setSkipItem(e) {
        const t = this.navItems.find(({index: n}) => n === (e || this.currentIndex)),
            s = this.contentItems.find(({index: n}) => n === (e || this.currentIndex));
        !t || !s || (this.setSkipItemActions(t), this.setSkipItemActions(s))
    }

    setSkipItemActions(e) {
        e.isSkip = !0, e.el.classList.add("skipped")
    }

    showSkipButton() {
        if (!this.skipBtn) return;
        const {isOptional: e} = this.navItems.find(({index: t}) => t === this.currentIndex);
        e ? this.skipBtn.style.display = "" : this.skipBtn.style.display = "none"
    }

    handleSkipButtonClick() {
        this.setSkipItem(), this.handleNextButtonClick(), this.fireEvent("skip", this.currentIndex), E("skip.hs.stepper", this.el, this.currentIndex)
    }

    buildCompleteStepButton() {
        this.completeStepBtn && (this.completeStepBtnDefaultText = this.completeStepBtn.innerText, this.completeStepBtn.addEventListener("click", () => this.handleCompleteStepButtonClick()))
    }

    changeTextAndDisableCompleteButtonIfStepCompleted() {
        const e = this.navItems.find(({index: s}) => s === this.currentIndex), {completedText: t} = JSON.parse(this.completeStepBtn.getAttribute("data-hs-stepper-complete-step-btn"));
        e && (e.isCompleted ? (this.completeStepBtn.innerText = t || this.completeStepBtnDefaultText, this.completeStepBtn.setAttribute("disabled", "disabled"), this.completeStepBtn.classList.add("disabled")) : (this.completeStepBtn.innerText = this.completeStepBtnDefaultText, this.completeStepBtn.removeAttribute("disabled"), this.completeStepBtn.classList.remove("disabled")))
    }

    setCompleteItem(e) {
        const t = this.navItems.find(({index: n}) => n === (e || this.currentIndex)),
            s = this.contentItems.find(({index: n}) => n === (e || this.currentIndex));
        !t || !s || (this.setCompleteItemActions(t), this.setCompleteItemActions(s))
    }

    setCompleteItemActions(e) {
        e.isCompleted = !0, e.el.classList.add("success")
    }

    showCompleteStepButton() {
        if (!this.completeStepBtn) return;
        this.getUncompletedSteps().length === 1 ? this.completeStepBtn.style.display = "none" : this.completeStepBtn.style.display = ""
    }

    handleCompleteStepButtonClick() {
        this.setCompleteItem(), this.fireEvent("complete", this.currentIndex), E("complete.hs.stepper", this.el, this.currentIndex), this.handleNextButtonClick(!1), this.showFinishButton(), this.showCompleteStepButton(), this.checkForTheFirstStep(), this.completeStepBtn && this.changeTextAndDisableCompleteButtonIfStepCompleted(), this.showSkipButton()
    }

    buildFinishButton() {
        this.finishBtn && (this.isCompleted && this.setCompleted(), this.finishBtn.addEventListener("click", () => this.handleFinishButtonClick()))
    }

    setCompleted() {
        this.el.classList.add("completed")
    }

    unsetCompleted() {
        this.el.classList.remove("completed")
    }

    showFinishButton() {
        if (!this.finishBtn) return;
        this.getUncompletedSteps().length === 1 ? this.finishBtn.style.display = "" : this.finishBtn.style.display = "none"
    }

    handleFinishButtonClick() {
        const e = this.getUncompletedSteps(),
            t = this.getUncompletedSteps(!0), {el: s} = this.contentItems.find(({isFinal: r}) => r);
        e.length && e.forEach(({index: r}) => this.setCompleteItem(r)), this.currentIndex = this.totalSteps, this.setCurrentNavItem(), this.hideAllContentItems();
        const n = this.navItems.find(({index: r}) => r === this.currentIndex);
        (n ? n.el : null).classList.remove("active"), s.style.display = "block", this.backBtn && (this.backBtn.style.display = "none"), this.nextBtn && (this.nextBtn.style.display = "none"), this.skipBtn && (this.skipBtn.style.display = "none"), this.completeStepBtn && (this.completeStepBtn.style.display = "none"), this.finishBtn && (this.finishBtn.style.display = "none"), this.resetBtn && (this.resetBtn.style.display = ""), t.length <= 1 && (this.isCompleted = !0, this.setCompleted()), this.fireEvent("finish", this.currentIndex), E("finish.hs.stepper", this.el, this.currentIndex)
    }

    buildResetButton() {
        this.resetBtn && this.resetBtn.addEventListener("click", () => this.handleResetButtonClick())
    }

    handleResetButtonClick() {
        this.backBtn && (this.backBtn.style.display = ""), this.nextBtn && (this.nextBtn.style.display = ""), this.completeStepBtn && (this.completeStepBtn.style.display = "", this.completeStepBtn.innerText = this.completeStepBtnDefaultText, this.completeStepBtn.removeAttribute("disabled"), this.completeStepBtn.classList.remove("disabled")), this.resetBtn && (this.resetBtn.style.display = "none"), this.navItems.forEach(e => {
            const {el: t} = e;
            e.isSkip = !1, e.isCompleted = !1, this.unsetCurrentNavItemActions(t), t.classList.remove("success", "skipped")
        }), this.contentItems.forEach(e => {
            const {el: t} = e;
            e.isSkip = !1, e.isCompleted = !1, this.unsetCurrentContentItemActions(t), t.classList.remove("success", "skipped")
        }), this.currentIndex = 1, this.setCurrentNavItem(), this.setCurrentContentItem(), this.showFinishButton(), this.showCompleteStepButton(), this.checkForTheFirstStep(), this.unsetCompleted(), this.isCompleted = !1, this.fireEvent("reset", this.currentIndex), E("reset.hs.stepper", this.el, this.currentIndex)
    }

    setProcessedNavItem(e) {
        const t = this.getNavItem(e);
        t && this.setProcessedNavItemActions(t)
    }

    unsetProcessedNavItem(e) {
        const t = this.getNavItem(e);
        t && this.unsetProcessedNavItemActions(t)
    }

    goToNext() {
        this.mode === "linear" && this.setCompleteItem(), this.handleNextButtonClick(this.mode !== "linear"), this.mode === "linear" && this.currentIndex === this.totalSteps && (this.nextBtn && (this.nextBtn.style.display = "none"), this.completeStepBtn && (this.completeStepBtn.style.display = "none"))
    }

    disableButtons() {
        this.backBtn && this.setToDisabled(this.backBtn), this.nextBtn && this.setToDisabled(this.nextBtn)
    }

    enableButtons() {
        this.backBtn && this.setToNonDisabled(this.backBtn), this.nextBtn && this.setToNonDisabled(this.nextBtn)
    }

    setErrorNavItem(e) {
        const t = this.getNavItem(e);
        t && this.setErrorNavItemActions(t)
    }
}

window.addEventListener("load", () => {
    Ve.autoInit()
});
typeof window < "u" && (window.HSStepper = Ve);/*
 * HSStrongPassword
 * @version: 2.1.0
 * @author: HTMLStream
 * @license: Licensed under MIT (https://preline.co/docs/license.html)
 * Copyright 2023 HTMLStream
 */
class He extends k {
    constructor(e, t) {
        super(e, t), this.isOpened = !1, this.strength = 0, this.passedRules = new Set;
        const s = e.getAttribute("data-hs-strong-password"), i = {...s ? JSON.parse(s) : {}, ...t};
        this.target = i != null && i.target ? typeof (i == null ? void 0 : i.target) == "string" ? document.querySelector(i.target) : i.target : null, this.hints = i != null && i.hints ? typeof (i == null ? void 0 : i.hints) == "string" ? document.querySelector(i.hints) : i.hints : null, this.stripClasses = (i == null ? void 0 : i.stripClasses) || null, this.minLength = (i == null ? void 0 : i.minLength) || 6, this.mode = (i == null ? void 0 : i.mode) || "default", this.popoverSpace = (i == null ? void 0 : i.popoverSpace) || 10, this.checksExclude = (i == null ? void 0 : i.checksExclude) || [], this.availableChecks = ["lowercase", "uppercase", "numbers", "special-characters", "min-length"].filter(r => !this.checksExclude.includes(r)), this.specialCharactersSet = (i == null ? void 0 : i.specialCharactersSet) || "!\"#$%&'()*+,-./:;<=>?@[\\\\\\]^_`{|}~", this.target && this.init()
    }

    static getInstance(e) {
        const t = window.$hsStrongPasswordCollection.find(s => s.element.el === (typeof e == "string" ? document.querySelector(e) : e));
        return t ? t.element : null
    }

    static autoInit() {
        window.$hsStrongPasswordCollection || (window.$hsStrongPasswordCollection = []), document.querySelectorAll("[data-hs-strong-password]:not(.--prevent-on-load-init)").forEach(e => {
            if (!window.$hsStrongPasswordCollection.find(t => {
                var s;
                return ((s = t == null ? void 0 : t.element) == null ? void 0 : s.el) === e
            })) {
                const t = e.getAttribute("data-hs-strong-password"), s = t ? JSON.parse(t) : {};
                new He(e, s)
            }
        })
    }

    init() {
        this.createCollection(window.$hsStrongPasswordCollection, this), this.availableChecks.length && this.build()
    }

    build() {
        this.buildStrips(), this.hints && this.buildHints(), this.setStrength(this.target.value), this.target.addEventListener("input", e => {
            this.setStrength(e.target.value)
        })
    }

    buildStrips() {
        if (this.el.innerHTML = "", this.stripClasses) for (let e = 0; e < this.availableChecks.length; e++) {
            const t = w("<div></div>");
            q(this.stripClasses, t), this.el.append(t)
        }
    }

    buildHints() {
        this.weakness = this.hints.querySelector("[data-hs-strong-password-hints-weakness-text]") || null, this.rules = Array.from(this.hints.querySelectorAll("[data-hs-strong-password-hints-rule-text]")) || null, this.rules.forEach(e => {
            var s;
            const t = e.getAttribute("data-hs-strong-password-hints-rule-text");
            (s = this.checksExclude) != null && s.includes(t) && e.remove()
        }), this.weakness && this.buildWeakness(), this.rules && this.buildRules(), this.mode === "popover" && (this.target.addEventListener("focus", () => {
            this.isOpened = !0, this.hints.classList.remove("hidden"), this.hints.classList.add("block"), this.recalculateDirection()
        }), this.target.addEventListener("blur", () => {
            this.isOpened = !1, this.hints.classList.remove("block", "bottom-full", "top-full"), this.hints.classList.add("hidden"), this.hints.style.marginTop = "", this.hints.style.marginBottom = ""
        }))
    }

    buildWeakness() {
        this.checkStrength(this.target.value), this.setWeaknessText(), this.target.addEventListener("input", () => setTimeout(() => this.setWeaknessText()))
    }

    buildRules() {
        this.setRulesText(), this.target.addEventListener("input", () => setTimeout(() => this.setRulesText()))
    }

    setWeaknessText() {
        const e = this.weakness.getAttribute("data-hs-strong-password-hints-weakness-text"), t = JSON.parse(e);
        this.weakness.textContent = t[this.strength]
    }

    setRulesText() {
        this.rules.forEach(e => {
            const t = e.getAttribute("data-hs-strong-password-hints-rule-text");
            this.checkIfPassed(e, this.passedRules.has(t))
        })
    }

    togglePopover() {
        const e = this.el.querySelector(".popover");
        e && e.classList.toggle("show")
    }

    checkStrength(e) {
        const t = new Set, s = {
            lowercase: /[a-z]+/,
            uppercase: /[A-Z]+/,
            numbers: /[0-9]+/,
            "special-characters": new RegExp(`[${this.specialCharactersSet}]`)
        };
        let n = 0;
        return this.availableChecks.includes("lowercase") && e.match(s.lowercase) && (n += 1, t.add("lowercase")), this.availableChecks.includes("uppercase") && e.match(s.uppercase) && (n += 1, t.add("uppercase")), this.availableChecks.includes("numbers") && e.match(s.numbers) && (n += 1, t.add("numbers")), this.availableChecks.includes("special-characters") && e.match(s["special-characters"]) && (n += 1, t.add("special-characters")), this.availableChecks.includes("min-length") && e.length >= this.minLength && (n += 1, t.add("min-length")), e.length || (n = 0), n === this.availableChecks.length ? this.el.classList.add("accepted") : this.el.classList.remove("accepted"), this.strength = n, this.passedRules = t, {
            strength: this.strength,
            rules: this.passedRules
        }
    }

    checkIfPassed(e, t = !1) {
        const s = e.querySelector("[data-check]"), n = e.querySelector("[data-uncheck]");
        t ? (e.classList.add("active"), s.classList.remove("hidden"), n.classList.add("hidden")) : (e.classList.remove("active"), s.classList.add("hidden"), n.classList.remove("hidden"))
    }

    setStrength(e) {
        const {strength: t, rules: s} = this.checkStrength(e), n = {strength: t, rules: s};
        this.hideStrips(t), this.fireEvent("change", n), E("change.hs.strongPassword", this.el, n)
    }

    hideStrips(e) {
        Array.from(this.el.children).forEach((t, s) => {
            s < e ? t.classList.add("passed") : t.classList.remove("passed")
        })
    }

    recalculateDirection() {
        mt(this.hints, this.target, "bottom", this.popoverSpace) ? (this.hints.classList.remove("bottom-full"), this.hints.classList.add("top-full"), this.hints.style.marginBottom = "", this.hints.style.marginTop = `${this.popoverSpace}px`) : (this.hints.classList.remove("top-full"), this.hints.classList.add("bottom-full"), this.hints.style.marginTop = "", this.hints.style.marginBottom = `${this.popoverSpace}px`)
    }
}

window.addEventListener("load", () => {
    He.autoInit()
});
document.addEventListener("scroll", () => {
    if (!window.$hsStrongPasswordCollection) return !1;
    const o = window.$hsStrongPasswordCollection.find(e => e.element.isOpened);
    o && o.element.recalculateDirection()
});
typeof window < "u" && (window.HSStrongPassword = He);/*
 * HSTabs
 * @version: 2.1.0
 * @author: HTMLStream
 * @license: Licensed under MIT (https://preline.co/docs/license.html)
 * Copyright 2023 HTMLStream
 */
class be extends k {
    constructor(e, t, s) {
        super(e, t, s), this.toggles = this.el.querySelectorAll("[data-hs-tab]"), this.extraToggleId = this.el.getAttribute("hs-data-tab-select"), this.extraToggle = document.querySelector(this.extraToggleId), this.current = Array.from(this.toggles).find(n => n.classList.contains("active")), this.currentContentId = this.current.getAttribute("data-hs-tab"), this.currentContent = document.querySelector(this.currentContentId), this.prev = null, this.prevContentId = null, this.prevContent = null, this.init()
    }

    static getInstance(e, t) {
        const s = window.$hsTabsCollection.find(n => n.element.el === (typeof e == "string" ? document.querySelector(e) : e));
        return s ? t ? s : s.element : null
    }

    static autoInit() {
        window.$hsTabsCollection || (window.$hsTabsCollection = []), document.querySelectorAll('[role="tablist"]:not(select):not(.--prevent-on-load-init)').forEach(e => {
            window.$hsTabsCollection.find(t => {
                var s;
                return ((s = t == null ? void 0 : t.element) == null ? void 0 : s.el) === e
            }) || new be(e)
        }), window.$hsTabsCollection && document.addEventListener("keydown", e => be.accessibility(e))
    }

    static open(e) {
        const t = window.$hsTabsCollection.find(n => Array.from(n.element.toggles).includes(typeof e == "string" ? document.querySelector(e) : e)),
            s = Array.from(t.element.toggles).find(n => n === (typeof e == "string" ? document.querySelector(e) : e));
        s && !s.classList.contains("active") && t.element.open(s)
    }

    static accessibility(e) {
        const t = document.querySelector("[data-hs-tab]:focus");
        if (t && Bs.includes(e.code) && !e.metaKey) {
            const s = t.closest('[role="tablist"]').getAttribute("data-hs-tabs-vertical");
            switch (e.preventDefault(), e.code) {
                case(s === "true" ? "ArrowUp" : "ArrowLeft"):
                    this.onArrow();
                    break;
                case(s === "true" ? "ArrowDown" : "ArrowRight"):
                    this.onArrow(!1);
                    break;
                case"Home":
                    this.onStartEnd();
                    break;
                case"End":
                    this.onStartEnd(!1);
                    break
            }
        }
    }

    static onArrow(e = !0) {
        const t = document.querySelector("[data-hs-tab]:focus").closest('[role="tablist"]'),
            s = window.$hsTabsCollection.find(n => n.element.el === t);
        if (s) {
            const n = e ? Array.from(s.element.toggles).reverse() : Array.from(s.element.toggles),
                i = n.find(l => document.activeElement === l);
            let r = n.findIndex(l => l === i);
            r = r + 1 < n.length ? r + 1 : 0, n[r].focus(), n[r].click()
        }
    }

    static onStartEnd(e = !0) {
        const t = document.querySelector("[data-hs-tab]:focus").closest('[role="tablist"]'),
            s = window.$hsTabsCollection.find(n => n.element.el === t);
        if (s) {
            const n = e ? Array.from(s.element.toggles) : Array.from(s.element.toggles).reverse();
            n.length && (n[0].focus(), n[0].click())
        }
    }

    static on(e, t, s) {
        const n = window.$hsTabsCollection.find(i => Array.from(i.element.toggles).includes(typeof t == "string" ? document.querySelector(t) : t));
        n && (n.element.events[e] = s)
    }

    init() {
        this.createCollection(window.$hsTabsCollection, this), this.toggles.forEach(e => {
            e.addEventListener("click", () => this.open(e))
        }), this.extraToggle && this.extraToggle.addEventListener("change", e => this.change(e))
    }

    open(e) {
        this.prev = this.current, this.prevContentId = this.currentContentId, this.prevContent = this.currentContent, this.current = e, this.currentContentId = this.current.getAttribute("data-hs-tab"), this.currentContent = document.querySelector(this.currentContentId), this.prev.classList.remove("active"), this.prevContent.classList.add("hidden"), this.current.classList.add("active"), this.currentContent.classList.remove("hidden"), this.fireEvent("change", {
            el: e,
            prev: this.prevContentId,
            current: this.currentContentId
        }), E("change.hs.tab", e, {el: e, prev: this.prevContentId, current: this.currentContentId})
    }

    change(e) {
        const t = document.querySelector(`[data-hs-tab="${e.target.value}"]`);
        t && t.click()
    }
}

window.addEventListener("load", () => {
    be.autoInit()
});
typeof window < "u" && (window.HSTabs = be);/*
 * HSThemeSwitch
 * @version: 2.1.0
 * @author: HTMLStream
 * @license: Licensed under MIT (https://preline.co/docs/license.html)
 * Copyright 2023 HTMLStream
 */
class Oe extends k {
    constructor(e, t) {
        super(e, t);
        const s = e.getAttribute("data-hs-theme-switch"), i = {...s ? JSON.parse(s) : {}, ...t};
        this.theme = (i == null ? void 0 : i.theme) || localStorage.getItem("hs_theme") || "default",
            this.themeSet = ["light", "dark", "default"],
            this.init()
    }

    static getInstance(e) {
        const t = window.$hsThemeSwitchCollection.find(s => s.element.el === (typeof e == "string" ? document.querySelector(e) : e));
        return t ? t.element : null
    }

    static autoInit() {
        window.$hsThemeSwitchCollection || (window.$hsThemeSwitchCollection = []);
        const e = t => {
            localStorage.getItem("hs_theme") === "auto" ?
                t.addSystemThemeObserver() : t.removeSystemThemeObserver()
        };

        document.querySelectorAll("[data-hs-theme-switch]:not(.--prevent-on-load-init)").forEach(t => {
            if (!window.$hsThemeSwitchCollection.find(s => {
                var n;
                return ((n = s == null ? void 0 : s.element) == null ? void 0 : n.el) === t
            })) {
                const s = new Oe(t);
                s.el.checked = s.theme === "dark", e(s), s.el.addEventListener("change", n => {
                    const i = n.target.checked ? "dark" : "default";
                    s.setAppearance(i), e(s)
                })
            }
        }), document.querySelectorAll("[data-hs-theme-click-value]:not(.--prevent-on-load-init)").forEach(t => {
            const s = t.getAttribute("data-hs-theme-click-value"), n = new Oe(t);
            e(n), n.el.addEventListener("click", () => {
                n.setAppearance(s), e(n)
            })
        })
    }

    init() {
        this.createCollection(window.$hsThemeSwitchCollection, this),
        this.theme !== "default" && this.setAppearance()
    }

    setResetStyles() {
        const e = document.createElement("style");
        return e.innerText = "*{transition: unset !important;}", e.setAttribute("data-hs-appearance-onload-styles", ""), document.head.appendChild(e), e
    }

    addSystemThemeObserver() {
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", ({matches: e}) => {
            e ? this.setAppearance("dark", !1) : this.setAppearance("default", !1)
        })
    }

    removeSystemThemeObserver() {
        window.matchMedia("(prefers-color-scheme: dark)").removeEventListener
    }

    setAppearance(e = this.theme, t = !0, s = !0) {
        const n = document.querySelector("html"), i = this.setResetStyles();
        t && localStorage.setItem("hs_theme", e), e === "auto" && (e = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "default"), n.classList.remove("light", "dark", "default", "auto"), n.classList.add(e), setTimeout(() => i.remove()), s && window.dispatchEvent(new CustomEvent("on-hs-appearance-change", {detail: e}))
    }
}

window.addEventListener("load", () => {
    Oe.autoInit()
});
window.$hsThemeSwitchCollection && window.addEventListener("on-hs-appearance-change", o => {
    window.$hsThemeSwitchCollection.forEach(e => {
        e.element.el.checked = o.detail === "dark"
    })
});
typeof window < "u" && (window.HSThemeSwitch = Oe);/*
 * HSToggleCount
 * @version: 2.1.0
 * @author: HTMLStream
 * @license: Licensed under MIT (https://preline.co/docs/license.html)
 * Copyright 2023 HTMLStream
 */
class Fe extends k {
    constructor(e, t) {
        super(e, t);
        const s = e.getAttribute("data-hs-toggle-count"), i = {...s ? JSON.parse(s) : {}, ...t};
        this.target = i != null && i.target ? typeof (i == null ? void 0 : i.target) == "string" ? document.querySelector(i.target) : i.target : null, this.min = (i == null ? void 0 : i.min) || 0, this.max = (i == null ? void 0 : i.max) || 0, this.duration = (i == null ? void 0 : i.duration) || 700, this.isChecked = this.target.checked || !1, this.target && this.init()
    }

    static getInstance(e, t) {
        const s = window.$hsToggleCountCollection.find(n => n.element.el === (typeof e == "string" ? document.querySelector(e) : e));
        return s ? t ? s : s.element : null
    }

    static autoInit() {
        window.$hsToggleCountCollection || (window.$hsToggleCountCollection = []), document.querySelectorAll("[data-hs-toggle-count]:not(.--prevent-on-load-init)").forEach(e => {
            window.$hsToggleCountCollection.find(t => {
                var s;
                return ((s = t == null ? void 0 : t.element) == null ? void 0 : s.el) === e
            }) || new Fe(e)
        })
    }

    init() {
        this.createCollection(window.$hsToggleCountCollection, this), this.isChecked && (this.el.innerText = String(this.max)), this.target.addEventListener("change", () => {
            this.isChecked = !this.isChecked, this.toggle()
        })
    }

    toggle() {
        this.isChecked ? this.countUp() : this.countDown()
    }

    animate(e, t) {
        let s = 0;
        const n = i => {
            s || (s = i);
            const r = Math.min((i - s) / this.duration, 1);
            this.el.innerText = String(Math.floor(r * (t - e) + e)), r < 1 && window.requestAnimationFrame(n)
        };
        window.requestAnimationFrame(n)
    }

    countUp() {
        this.animate(this.min, this.max)
    }

    countDown() {
        this.animate(this.max, this.min)
    }
}

window.addEventListener("load", () => {
    Fe.autoInit()
});
typeof window < "u" && (window.HSToggleCount = Fe);/*
 * HSTogglePassword
 * @version: 2.1.0
 * @author: HTMLStream
 * @license: Licensed under MIT (https://preline.co/docs/license.html)
 * Copyright 2023 HTMLStream
 */
class we extends k {
    constructor(e, t) {
        super(e, t);
        const s = e.getAttribute("data-hs-toggle-password"), i = {...s ? JSON.parse(s) : {}, ...t}, r = [];
        i != null && i.target && typeof (i == null ? void 0 : i.target) == "string" ? (i == null ? void 0 : i.target.split(",")).forEach(a => {
            r.push(document.querySelector(a))
        }) : i != null && i.target && typeof (i == null ? void 0 : i.target) == "object" ? i.target.forEach(l => r.push(document.querySelector(l))) : i.target.forEach(l => r.push(l)), this.target = r, this.isShown = this.el.hasAttribute("type") ? this.el.checked : !1, this.eventType = Ts(this.el) ? "change" : "click", this.isMultiple = this.target.length > 1 && !!this.el.closest("[data-hs-toggle-password-group]"), this.target && this.init()
    }

    static getInstance(e, t) {
        const s = window.$hsTogglePasswordCollection.find(n => n.element.el === (typeof e == "string" ? document.querySelector(e) : e));
        return s ? t ? s : s.element : null
    }

    static autoInit() {
        window.$hsTogglePasswordCollection || (window.$hsTogglePasswordCollection = []), document.querySelectorAll("[data-hs-toggle-password]:not(.--prevent-on-load-init)").forEach(e => {
            window.$hsTogglePasswordCollection.find(t => {
                var s;
                return ((s = t == null ? void 0 : t.element) == null ? void 0 : s.el) === e
            }) || new we(e)
        })
    }

    init() {
        this.createCollection(window.$hsTogglePasswordCollection, this), this.isShown ? this.show() : this.hide(), this.el.addEventListener(this.eventType, () => {
            this.isShown ? this.hide() : this.show(), this.fireEvent("toggle", this.target), E("toggle.hs.toggle-select", this.el, this.target)
        })
    }

    getMultipleToggles() {
        const t = this.el.closest("[data-hs-toggle-password-group]").querySelectorAll("[data-hs-toggle-password]"),
            s = [];
        return t.forEach(n => {
            s.push(we.getInstance(n))
        }), s
    }

    show() {
        this.isMultiple ? (this.getMultipleToggles().forEach(t => t ? t.isShown = !0 : !1), this.el.closest("[data-hs-toggle-password-group]").classList.add("active")) : (this.isShown = !0, this.el.classList.add("active")), this.target.forEach(e => {
            e.type = "text"
        })
    }

    hide() {
        this.isMultiple ? (this.getMultipleToggles().forEach(t => t ? t.isShown = !1 : !1), this.el.closest("[data-hs-toggle-password-group]").classList.remove("active")) : (this.isShown = !1, this.el.classList.remove("active")), this.target.forEach(e => {
            e.type = "password"
        })
    }
}

window.addEventListener("load", () => {
    we.autoInit()
});
typeof window < "u" && (window.HSTogglePassword = we);/*
 * HSTooltip
 * @version: 2.1.0
 * @author: HTMLStream
 * @license: Licensed under MIT (https://preline.co/docs/license.html)
 * Copyright 2023 HTMLStream
 */
class ze extends k {
    constructor(e, t, s) {
        super(e, t, s), this.el && (this.toggle = this.el.querySelector(".hs-tooltip-toggle") || this.el, this.content = this.el.querySelector(".hs-tooltip-content"), this.eventMode = L(this.el, "--trigger") || "hover", this.preventPopper = L(this.el, "--prevent-popper", "false"), this.placement = L(this.el, "--placement"), this.strategy = L(this.el, "--strategy")), this.el && this.toggle && this.content && this.init()
    }

    static getInstance(e, t = !1) {
        const s = window.$hsTooltipCollection.find(n => n.element.el === (typeof e == "string" ? document.querySelector(e) : e));
        return s ? t ? s : s.element.el : null
    }

    static autoInit() {
        window.$hsTooltipCollection || (window.$hsTooltipCollection = []), document.querySelectorAll(".hs-tooltip").forEach(e => {
            window.$hsTooltipCollection.find(t => {
                var s;
                return ((s = t == null ? void 0 : t.element) == null ? void 0 : s.el) === e
            }) || new ze(e)
        })
    }

    static show(e) {
        const t = window.$hsTooltipCollection.find(s => s.element.el === (typeof e == "string" ? document.querySelector(e) : e));
        if (t) switch (t.element.eventMode) {
            case"click":
                t.element.click();
                break;
            case"focus":
                t.element.focus();
                break;
            default:
                t.element.enter();
                break
        }
    }

    static hide(e) {
        const t = window.$hsTooltipCollection.find(s => s.element.el === (typeof e == "string" ? document.querySelector(e) : e));
        t && t.element.hide()
    }

    static on(e, t, s) {
        const n = window.$hsTooltipCollection.find(i => i.element.el === (typeof t == "string" ? document.querySelector(t) : t));
        n && (n.element.events[e] = s)
    }

    init() {
        this.createCollection(window.$hsTooltipCollection, this), this.eventMode === "click" ? this.toggle.addEventListener("click", () => this.click()) : this.eventMode === "focus" ? this.toggle.addEventListener("click", () => this.focus()) : this.eventMode === "hover" && (this.toggle.addEventListener("mouseenter", () => this.enter()), this.toggle.addEventListener("mouseleave", () => this.leave())), this.preventPopper === "false" && this.buildPopper()
    }

    enter() {
        this.show()
    }

    leave() {
        this.hide()
    }

    click() {
        if (this.el.classList.contains("show")) return !1;
        this.show();
        const e = () => {
            setTimeout(() => {
                this.hide(), this.toggle.removeEventListener("click", e, !0), this.toggle.removeEventListener("blur", e, !0)
            })
        };
        this.toggle.addEventListener("click", e, !0), this.toggle.addEventListener("blur", e, !0)
    }

    focus() {
        this.show();
        const e = () => {
            this.hide(), this.toggle.removeEventListener("blur", e, !0)
        };
        this.toggle.addEventListener("blur", e, !0)
    }

    buildPopper() {
        this.popperInstance = as(this.toggle, this.content, {
            placement: Kt[this.placement] || "top",
            strategy: this.strategy || "fixed",
            modifiers: [{name: "offset", options: {offset: [0, 5]}}]
        })
    }

    show() {
        this.content.classList.remove("hidden"), this.preventPopper === "false" && (this.popperInstance.setOptions(e => ({
            ...e,
            modifiers: [...e.modifiers, {name: "eventListeners", enabled: !0}]
        })), this.popperInstance.update()), setTimeout(() => {
            this.el.classList.add("show"), this.fireEvent("show", this.el), E("show.hs.tooltip", this.el, this.el)
        })
    }

    hide() {
        this.el.classList.remove("show"), this.preventPopper === "false" && this.popperInstance.setOptions(e => ({
            ...e,
            modifiers: [...e.modifiers, {name: "eventListeners", enabled: !1}]
        })), this.fireEvent("hide", this.el), E("hide.hs.tooltip", this.el, this.el), H(this.content, () => {
            if (this.el.classList.contains("show")) return !1;
            this.content.classList.add("hidden")
        })
    }
}

window.addEventListener("load", () => {
    ze.autoInit()
});
typeof window < "u" && (window.HSTooltip = ze);
const Ut = [{key: "copy-markup", fn: Be}, {key: "accordion", fn: fe}, {key: "carousel", fn: $e}, {
    key: "collapse",
    fn: Ne
}, {key: "combobox", fn: X}, {key: "dropdown", fn: te}, {key: "input-number", fn: De}, {
    key: "overlay",
    fn: Y
}, {key: "pin-input", fn: We}, {key: "remove-element", fn: Me}, {key: "scrollspy", fn: Re}, {
    key: "select",
    fn: ce
}, {key: "stepper", fn: Ve}, {key: "strong-password", fn: He}, {key: "tabs", fn: be}, {
    key: "toggle-count",
    fn: Fe
}, {key: "toggle-password", fn: we}, {key: "tooltip", fn: ze}];/*
 * HSStaticMethods
 * @version: 2.1.0
 * @author: HTMLStream
 * @license: Licensed under MIT (https://preline.co/docs/license.html)
 * Copyright 2023 HTMLStream
 */
const Hi = {
    getClassProperty: L, afterTransition: H, autoInit(o = "all") {
        o === "all" ? Ut.forEach(({fn: e}) => {
            e == null || e.autoInit()
        }) : Ut.forEach(({key: e, fn: t}) => {
            o.includes(e) && (t == null || t.autoInit())
        })
    }
};
typeof window < "u" && (window.HSStaticMethods = Hi);

function Fi() {
    const o = document.querySelector('[data-toggle="back-to-top"]');
    window.addEventListener("scroll", function () {
        o && (window.scrollY > 72 ? o.classList.remove("translate-y-16") : o.classList.add("translate-y-16"))
    }), o && o.addEventListener("click", function (e) {
        e.preventDefault(), window.scrollTo({top: 0, behavior: "smooth"})
    })
}

function cs() {
    var o = document.documentElement;
    o.getAttribute("dir") === "ltr" ? o.setAttribute("dir", "rtl") : o.setAttribute("dir", "ltr")
}

var Qt;
(Qt = document.getElementById("toggleButton")) == null || Qt.addEventListener("click", cs);
Fi();
cs();
var zi = typeof global == "object" && global && global.Object === Object && global;
const ji = zi;
var Ui = typeof self == "object" && self && self.Object === Object && self, Xi = ji || Ui || Function("return this")();
const hs = Xi;
var Ji = hs.Symbol;
const tt = Ji;
var ds = Object.prototype, _i = ds.hasOwnProperty, Yi = ds.toString, Ie = tt ? tt.toStringTag : void 0;

function Gi(o) {
    var e = _i.call(o, Ie), t = o[Ie];
    try {
        o[Ie] = void 0;
        var s = !0
    } catch {
    }
    var n = Yi.call(o);
    return s && (e ? o[Ie] = t : delete o[Ie]), n
}

var Qi = Object.prototype, Ki = Qi.toString;

function Zi(o) {
    return Ki.call(o)
}

var en = "[object Null]", tn = "[object Undefined]", Xt = tt ? tt.toStringTag : void 0;

function sn(o) {
    return o == null ? o === void 0 ? tn : en : Xt && Xt in Object(o) ? Gi(o) : Zi(o)
}

function nn(o) {
    return o != null && typeof o == "object"
}

var on = "[object Symbol]";

function rn(o) {
    return typeof o == "symbol" || nn(o) && sn(o) == on
}

var ln = /\s/;

function an(o) {
    for (var e = o.length; e-- && ln.test(o.charAt(e));) ;
    return e
}

var cn = /^\s+/;

function hn(o) {
    return o && o.slice(0, an(o) + 1).replace(cn, "")
}

function st(o) {
    var e = typeof o;
    return o != null && (e == "object" || e == "function")
}

var Jt = 0 / 0, dn = /^[-+]0x[0-9a-f]+$/i, un = /^0b[01]+$/i, pn = /^0o[0-7]+$/i, fn = parseInt;

function _t(o) {
    if (typeof o == "number") return o;
    if (rn(o)) return Jt;
    if (st(o)) {
        var e = typeof o.valueOf == "function" ? o.valueOf() : o;
        o = st(e) ? e + "" : e
    }
    if (typeof o != "string") return o === 0 ? o : +o;
    o = hn(o);
    var t = un.test(o);
    return t || pn.test(o) ? fn(o.slice(2), t ? 2 : 8) : dn.test(o) ? Jt : +o
}

var mn = function () {
    return hs.Date.now()
};
const ct = mn;
var gn = "Expected a function", vn = Math.max, yn = Math.min;

function Qe(o, e, t) {
    var s, n, i, r, l, a, c = 0, h = !1, d = !1, v = !0;
    if (typeof o != "function") throw new TypeError(gn);
    e = _t(e) || 0, st(t) && (h = !!t.leading, d = "maxWait" in t, i = d ? vn(_t(t.maxWait) || 0, e) : i, v = "trailing" in t ? !!t.trailing : v);

    function u(p) {
        var S = s, I = n;
        return s = n = void 0, c = p, r = o.apply(I, S), r
    }

    function x(p) {
        return c = p, l = setTimeout(y, e), h ? u(p) : r
    }

    function m(p) {
        var S = p - a, I = p - c, T = e - S;
        return d ? yn(T, i - I) : T
    }

    function f(p) {
        var S = p - a, I = p - c;
        return a === void 0 || S >= e || S < 0 || d && I >= i
    }

    function y() {
        var p = ct();
        if (f(p)) return C(p);
        l = setTimeout(y, m(p))
    }

    function C(p) {
        return l = void 0, v && s ? u(p) : (s = n = void 0, r)
    }

    function A() {
        l !== void 0 && clearTimeout(l), c = 0, s = a = n = l = void 0
    }

    function g() {
        return l === void 0 ? r : C(ct())
    }

    function b() {
        var p = ct(), S = f(p);
        if (s = arguments, n = this, a = p, S) {
            if (l === void 0) return x(a);
            if (d) return clearTimeout(l), l = setTimeout(y, e), u(a)
        }
        return l === void 0 && (l = setTimeout(y, e)), r
    }

    return b.cancel = A, b.flush = g, b
}

var bn = "Expected a function";

function wn(o, e, t) {
    var s = !0, n = !0;
    if (typeof o != "function") throw new TypeError(bn);
    return st(t) && (s = "leading" in t ? !!t.leading : s, n = "trailing" in t ? !!t.trailing : n), Qe(o, e, {
        leading: s,
        maxWait: e,
        trailing: n
    })
}

var pe = function () {
    return pe = Object.assign || function (e) {
        for (var t, s = 1, n = arguments.length; s < n; s++) {
            t = arguments[s];
            for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i])
        }
        return e
    }, pe.apply(this, arguments)
};

function us(o) {
    return !o || !o.ownerDocument || !o.ownerDocument.defaultView ? window : o.ownerDocument.defaultView
}

function ps(o) {
    return !o || !o.ownerDocument ? document : o.ownerDocument
}

var fs = function (o) {
    var e = {}, t = Array.prototype.reduce.call(o, function (s, n) {
        var i = n.name.match(/data-simplebar-(.+)/);
        if (i) {
            var r = i[1].replace(/\W+(.)/g, function (l, a) {
                return a.toUpperCase()
            });
            switch (n.value) {
                case"true":
                    s[r] = !0;
                    break;
                case"false":
                    s[r] = !1;
                    break;
                case void 0:
                    s[r] = !0;
                    break;
                default:
                    s[r] = n.value
            }
        }
        return s
    }, e);
    return t
};

function ms(o, e) {
    var t;
    o && (t = o.classList).add.apply(t, e.split(" "))
}

function gs(o, e) {
    o && e.split(" ").forEach(function (t) {
        o.classList.remove(t)
    })
}

function vs(o) {
    return ".".concat(o.split(" ").join("."))
}

var Et = !!(typeof window < "u" && window.document && window.document.createElement), Sn = Object.freeze({
    __proto__: null,
    addClasses: ms,
    canUseDOM: Et,
    classNamesToQuery: vs,
    getElementDocument: ps,
    getElementWindow: us,
    getOptions: fs,
    removeClasses: gs
}), ue = null, Yt = null;
Et && window.addEventListener("resize", function () {
    Yt !== window.devicePixelRatio && (Yt = window.devicePixelRatio, ue = null)
});

function Gt() {
    if (ue === null) {
        if (typeof document > "u") return ue = 0, ue;
        var o = document.body, e = document.createElement("div");
        e.classList.add("simplebar-hide-scrollbar"), o.appendChild(e);
        var t = e.getBoundingClientRect().right;
        o.removeChild(e), ue = t
    }
    return ue
}

var K = us, ht = ps, xn = fs, Z = ms, ee = gs, N = vs, Ke = function () {
    function o(e, t) {
        t === void 0 && (t = {});
        var s = this;
        if (this.removePreventClickId = null, this.minScrollbarWidth = 20, this.stopScrollDelay = 175, this.isScrolling = !1, this.isMouseEntering = !1, this.isDragging = !1, this.scrollXTicking = !1, this.scrollYTicking = !1, this.wrapperEl = null, this.contentWrapperEl = null, this.contentEl = null, this.offsetEl = null, this.maskEl = null, this.placeholderEl = null, this.heightAutoObserverWrapperEl = null, this.heightAutoObserverEl = null, this.rtlHelpers = null, this.scrollbarWidth = 0, this.resizeObserver = null, this.mutationObserver = null, this.elStyles = null, this.isRtl = null, this.mouseX = 0, this.mouseY = 0, this.onMouseMove = function () {
        }, this.onWindowResize = function () {
        }, this.onStopScrolling = function () {
        }, this.onMouseEntered = function () {
        }, this.onScroll = function () {
            var n = K(s.el);
            s.scrollXTicking || (n.requestAnimationFrame(s.scrollX), s.scrollXTicking = !0), s.scrollYTicking || (n.requestAnimationFrame(s.scrollY), s.scrollYTicking = !0), s.isScrolling || (s.isScrolling = !0, Z(s.el, s.classNames.scrolling)), s.showScrollbar("x"), s.showScrollbar("y"), s.onStopScrolling()
        }, this.scrollX = function () {
            s.axis.x.isOverflowing && s.positionScrollbar("x"), s.scrollXTicking = !1
        }, this.scrollY = function () {
            s.axis.y.isOverflowing && s.positionScrollbar("y"), s.scrollYTicking = !1
        }, this._onStopScrolling = function () {
            ee(s.el, s.classNames.scrolling), s.options.autoHide && (s.hideScrollbar("x"), s.hideScrollbar("y")), s.isScrolling = !1
        }, this.onMouseEnter = function () {
            s.isMouseEntering || (Z(s.el, s.classNames.mouseEntered), s.showScrollbar("x"), s.showScrollbar("y"), s.isMouseEntering = !0), s.onMouseEntered()
        }, this._onMouseEntered = function () {
            ee(s.el, s.classNames.mouseEntered), s.options.autoHide && (s.hideScrollbar("x"), s.hideScrollbar("y")), s.isMouseEntering = !1
        }, this._onMouseMove = function (n) {
            s.mouseX = n.clientX, s.mouseY = n.clientY, (s.axis.x.isOverflowing || s.axis.x.forceVisible) && s.onMouseMoveForAxis("x"), (s.axis.y.isOverflowing || s.axis.y.forceVisible) && s.onMouseMoveForAxis("y")
        }, this.onMouseLeave = function () {
            s.onMouseMove.cancel(), (s.axis.x.isOverflowing || s.axis.x.forceVisible) && s.onMouseLeaveForAxis("x"), (s.axis.y.isOverflowing || s.axis.y.forceVisible) && s.onMouseLeaveForAxis("y"), s.mouseX = -1, s.mouseY = -1
        }, this._onWindowResize = function () {
            s.scrollbarWidth = s.getScrollbarWidth(), s.hideNativeScrollbar()
        }, this.onPointerEvent = function (n) {
            if (!(!s.axis.x.track.el || !s.axis.y.track.el || !s.axis.x.scrollbar.el || !s.axis.y.scrollbar.el)) {
                var i, r;
                s.axis.x.track.rect = s.axis.x.track.el.getBoundingClientRect(), s.axis.y.track.rect = s.axis.y.track.el.getBoundingClientRect(), (s.axis.x.isOverflowing || s.axis.x.forceVisible) && (i = s.isWithinBounds(s.axis.x.track.rect)), (s.axis.y.isOverflowing || s.axis.y.forceVisible) && (r = s.isWithinBounds(s.axis.y.track.rect)), (i || r) && (n.stopPropagation(), n.type === "pointerdown" && n.pointerType !== "touch" && (i && (s.axis.x.scrollbar.rect = s.axis.x.scrollbar.el.getBoundingClientRect(), s.isWithinBounds(s.axis.x.scrollbar.rect) ? s.onDragStart(n, "x") : s.onTrackClick(n, "x")), r && (s.axis.y.scrollbar.rect = s.axis.y.scrollbar.el.getBoundingClientRect(), s.isWithinBounds(s.axis.y.scrollbar.rect) ? s.onDragStart(n, "y") : s.onTrackClick(n, "y"))))
            }
        }, this.drag = function (n) {
            var i, r, l, a, c, h, d, v, u, x, m;
            if (!(!s.draggedAxis || !s.contentWrapperEl)) {
                var f, y = s.axis[s.draggedAxis].track,
                    C = (r = (i = y.rect) === null || i === void 0 ? void 0 : i[s.axis[s.draggedAxis].sizeAttr]) !== null && r !== void 0 ? r : 0,
                    A = s.axis[s.draggedAxis].scrollbar,
                    g = (a = (l = s.contentWrapperEl) === null || l === void 0 ? void 0 : l[s.axis[s.draggedAxis].scrollSizeAttr]) !== null && a !== void 0 ? a : 0,
                    b = parseInt((h = (c = s.elStyles) === null || c === void 0 ? void 0 : c[s.axis[s.draggedAxis].sizeAttr]) !== null && h !== void 0 ? h : "0px", 10);
                n.preventDefault(), n.stopPropagation(), s.draggedAxis === "y" ? f = n.pageY : f = n.pageX;
                var p = f - ((v = (d = y.rect) === null || d === void 0 ? void 0 : d[s.axis[s.draggedAxis].offsetAttr]) !== null && v !== void 0 ? v : 0) - s.axis[s.draggedAxis].dragOffset;
                p = s.draggedAxis === "x" && s.isRtl ? ((x = (u = y.rect) === null || u === void 0 ? void 0 : u[s.axis[s.draggedAxis].sizeAttr]) !== null && x !== void 0 ? x : 0) - A.size - p : p;
                var S = p / (C - A.size), I = S * (g - b);
                s.draggedAxis === "x" && s.isRtl && (I = !((m = o.getRtlHelpers()) === null || m === void 0) && m.isScrollingToNegative ? -I : I), s.contentWrapperEl[s.axis[s.draggedAxis].scrollOffsetAttr] = I
            }
        }, this.onEndDrag = function (n) {
            s.isDragging = !1;
            var i = ht(s.el), r = K(s.el);
            n.preventDefault(), n.stopPropagation(), ee(s.el, s.classNames.dragging), s.onStopScrolling(), i.removeEventListener("mousemove", s.drag, !0), i.removeEventListener("mouseup", s.onEndDrag, !0), s.removePreventClickId = r.setTimeout(function () {
                i.removeEventListener("click", s.preventClick, !0), i.removeEventListener("dblclick", s.preventClick, !0), s.removePreventClickId = null
            })
        }, this.preventClick = function (n) {
            n.preventDefault(), n.stopPropagation()
        }, this.el = e, this.options = pe(pe({}, o.defaultOptions), t), this.classNames = pe(pe({}, o.defaultOptions.classNames), t.classNames), this.axis = {
            x: {
                scrollOffsetAttr: "scrollLeft",
                sizeAttr: "width",
                scrollSizeAttr: "scrollWidth",
                offsetSizeAttr: "offsetWidth",
                offsetAttr: "left",
                overflowAttr: "overflowX",
                dragOffset: 0,
                isOverflowing: !0,
                forceVisible: !1,
                track: {size: null, el: null, rect: null, isVisible: !1},
                scrollbar: {size: null, el: null, rect: null, isVisible: !1}
            },
            y: {
                scrollOffsetAttr: "scrollTop",
                sizeAttr: "height",
                scrollSizeAttr: "scrollHeight",
                offsetSizeAttr: "offsetHeight",
                offsetAttr: "top",
                overflowAttr: "overflowY",
                dragOffset: 0,
                isOverflowing: !0,
                forceVisible: !1,
                track: {size: null, el: null, rect: null, isVisible: !1},
                scrollbar: {size: null, el: null, rect: null, isVisible: !1}
            }
        }, typeof this.el != "object" || !this.el.nodeName) throw new Error("Argument passed to SimpleBar must be an HTML element instead of ".concat(this.el));
        this.onMouseMove = wn(this._onMouseMove, 64), this.onWindowResize = Qe(this._onWindowResize, 64, {leading: !0}), this.onStopScrolling = Qe(this._onStopScrolling, this.stopScrollDelay), this.onMouseEntered = Qe(this._onMouseEntered, this.stopScrollDelay), this.init()
    }

    return o.getRtlHelpers = function () {
        if (o.rtlHelpers) return o.rtlHelpers;
        var e = document.createElement("div");
        e.innerHTML = '<div class="simplebar-dummy-scrollbar-size"><div></div></div>';
        var t = e.firstElementChild, s = t == null ? void 0 : t.firstElementChild;
        if (!s) return null;
        document.body.appendChild(t), t.scrollLeft = 0;
        var n = o.getOffset(t), i = o.getOffset(s);
        t.scrollLeft = -999;
        var r = o.getOffset(s);
        return document.body.removeChild(t), o.rtlHelpers = {
            isScrollOriginAtZero: n.left !== i.left,
            isScrollingToNegative: i.left !== r.left
        }, o.rtlHelpers
    }, o.prototype.getScrollbarWidth = function () {
        try {
            return this.contentWrapperEl && getComputedStyle(this.contentWrapperEl, "::-webkit-scrollbar").display === "none" || "scrollbarWidth" in document.documentElement.style || "-ms-overflow-style" in document.documentElement.style ? 0 : Gt()
        } catch {
            return Gt()
        }
    }, o.getOffset = function (e) {
        var t = e.getBoundingClientRect(), s = ht(e), n = K(e);
        return {
            top: t.top + (n.pageYOffset || s.documentElement.scrollTop),
            left: t.left + (n.pageXOffset || s.documentElement.scrollLeft)
        }
    }, o.prototype.init = function () {
        Et && (this.initDOM(), this.rtlHelpers = o.getRtlHelpers(), this.scrollbarWidth = this.getScrollbarWidth(), this.recalculate(), this.initListeners())
    }, o.prototype.initDOM = function () {
        var e, t;
        this.wrapperEl = this.el.querySelector(N(this.classNames.wrapper)), this.contentWrapperEl = this.options.scrollableNode || this.el.querySelector(N(this.classNames.contentWrapper)), this.contentEl = this.options.contentNode || this.el.querySelector(N(this.classNames.contentEl)), this.offsetEl = this.el.querySelector(N(this.classNames.offset)), this.maskEl = this.el.querySelector(N(this.classNames.mask)), this.placeholderEl = this.findChild(this.wrapperEl, N(this.classNames.placeholder)), this.heightAutoObserverWrapperEl = this.el.querySelector(N(this.classNames.heightAutoObserverWrapperEl)), this.heightAutoObserverEl = this.el.querySelector(N(this.classNames.heightAutoObserverEl)), this.axis.x.track.el = this.findChild(this.el, "".concat(N(this.classNames.track)).concat(N(this.classNames.horizontal))), this.axis.y.track.el = this.findChild(this.el, "".concat(N(this.classNames.track)).concat(N(this.classNames.vertical))), this.axis.x.scrollbar.el = ((e = this.axis.x.track.el) === null || e === void 0 ? void 0 : e.querySelector(N(this.classNames.scrollbar))) || null, this.axis.y.scrollbar.el = ((t = this.axis.y.track.el) === null || t === void 0 ? void 0 : t.querySelector(N(this.classNames.scrollbar))) || null, this.options.autoHide || (Z(this.axis.x.scrollbar.el, this.classNames.visible), Z(this.axis.y.scrollbar.el, this.classNames.visible))
    }, o.prototype.initListeners = function () {
        var e = this, t, s = K(this.el);
        if (this.el.addEventListener("mouseenter", this.onMouseEnter), this.el.addEventListener("pointerdown", this.onPointerEvent, !0), this.el.addEventListener("mousemove", this.onMouseMove), this.el.addEventListener("mouseleave", this.onMouseLeave), (t = this.contentWrapperEl) === null || t === void 0 || t.addEventListener("scroll", this.onScroll), s.addEventListener("resize", this.onWindowResize), !!this.contentEl) {
            if (window.ResizeObserver) {
                var n = !1, i = s.ResizeObserver || ResizeObserver;
                this.resizeObserver = new i(function () {
                    n && s.requestAnimationFrame(function () {
                        e.recalculate()
                    })
                }), this.resizeObserver.observe(this.el), this.resizeObserver.observe(this.contentEl), s.requestAnimationFrame(function () {
                    n = !0
                })
            }
            this.mutationObserver = new s.MutationObserver(function () {
                s.requestAnimationFrame(function () {
                    e.recalculate()
                })
            }), this.mutationObserver.observe(this.contentEl, {childList: !0, subtree: !0, characterData: !0})
        }
    }, o.prototype.recalculate = function () {
        if (!(!this.heightAutoObserverEl || !this.contentEl || !this.contentWrapperEl || !this.wrapperEl || !this.placeholderEl)) {
            var e = K(this.el);
            this.elStyles = e.getComputedStyle(this.el), this.isRtl = this.elStyles.direction === "rtl";
            var t = this.contentEl.offsetWidth, s = this.heightAutoObserverEl.offsetHeight <= 1,
                n = this.heightAutoObserverEl.offsetWidth <= 1 || t > 0, i = this.contentWrapperEl.offsetWidth,
                r = this.elStyles.overflowX, l = this.elStyles.overflowY;
            this.contentEl.style.padding = "".concat(this.elStyles.paddingTop, " ").concat(this.elStyles.paddingRight, " ").concat(this.elStyles.paddingBottom, " ").concat(this.elStyles.paddingLeft), this.wrapperEl.style.margin = "-".concat(this.elStyles.paddingTop, " -").concat(this.elStyles.paddingRight, " -").concat(this.elStyles.paddingBottom, " -").concat(this.elStyles.paddingLeft);
            var a = this.contentEl.scrollHeight, c = this.contentEl.scrollWidth;
            this.contentWrapperEl.style.height = s ? "auto" : "100%", this.placeholderEl.style.width = n ? "".concat(t || c, "px") : "auto", this.placeholderEl.style.height = "".concat(a, "px");
            var h = this.contentWrapperEl.offsetHeight;
            this.axis.x.isOverflowing = t !== 0 && c > t, this.axis.y.isOverflowing = a > h, this.axis.x.isOverflowing = r === "hidden" ? !1 : this.axis.x.isOverflowing, this.axis.y.isOverflowing = l === "hidden" ? !1 : this.axis.y.isOverflowing, this.axis.x.forceVisible = this.options.forceVisible === "x" || this.options.forceVisible === !0, this.axis.y.forceVisible = this.options.forceVisible === "y" || this.options.forceVisible === !0, this.hideNativeScrollbar();
            var d = this.axis.x.isOverflowing ? this.scrollbarWidth : 0,
                v = this.axis.y.isOverflowing ? this.scrollbarWidth : 0;
            this.axis.x.isOverflowing = this.axis.x.isOverflowing && c > i - v, this.axis.y.isOverflowing = this.axis.y.isOverflowing && a > h - d, this.axis.x.scrollbar.size = this.getScrollbarSize("x"), this.axis.y.scrollbar.size = this.getScrollbarSize("y"), this.axis.x.scrollbar.el && (this.axis.x.scrollbar.el.style.width = "".concat(this.axis.x.scrollbar.size, "px")), this.axis.y.scrollbar.el && (this.axis.y.scrollbar.el.style.height = "".concat(this.axis.y.scrollbar.size, "px")), this.positionScrollbar("x"), this.positionScrollbar("y"), this.toggleTrackVisibility("x"), this.toggleTrackVisibility("y")
        }
    }, o.prototype.getScrollbarSize = function (e) {
        var t, s;
        if (e === void 0 && (e = "y"), !this.axis[e].isOverflowing || !this.contentEl) return 0;
        var n = this.contentEl[this.axis[e].scrollSizeAttr],
            i = (s = (t = this.axis[e].track.el) === null || t === void 0 ? void 0 : t[this.axis[e].offsetSizeAttr]) !== null && s !== void 0 ? s : 0,
            r = i / n, l;
        return l = Math.max(~~(r * i), this.options.scrollbarMinSize), this.options.scrollbarMaxSize && (l = Math.min(l, this.options.scrollbarMaxSize)), l
    }, o.prototype.positionScrollbar = function (e) {
        var t, s, n;
        e === void 0 && (e = "y");
        var i = this.axis[e].scrollbar;
        if (!(!this.axis[e].isOverflowing || !this.contentWrapperEl || !i.el || !this.elStyles)) {
            var r = this.contentWrapperEl[this.axis[e].scrollSizeAttr],
                l = ((t = this.axis[e].track.el) === null || t === void 0 ? void 0 : t[this.axis[e].offsetSizeAttr]) || 0,
                a = parseInt(this.elStyles[this.axis[e].sizeAttr], 10),
                c = this.contentWrapperEl[this.axis[e].scrollOffsetAttr];
            c = e === "x" && this.isRtl && (!((s = o.getRtlHelpers()) === null || s === void 0) && s.isScrollOriginAtZero) ? -c : c, e === "x" && this.isRtl && (c = !((n = o.getRtlHelpers()) === null || n === void 0) && n.isScrollingToNegative ? c : -c);
            var h = c / (r - a), d = ~~((l - i.size) * h);
            d = e === "x" && this.isRtl ? -d + (l - i.size) : d, i.el.style.transform = e === "x" ? "translate3d(".concat(d, "px, 0, 0)") : "translate3d(0, ".concat(d, "px, 0)")
        }
    }, o.prototype.toggleTrackVisibility = function (e) {
        e === void 0 && (e = "y");
        var t = this.axis[e].track.el, s = this.axis[e].scrollbar.el;
        !t || !s || !this.contentWrapperEl || (this.axis[e].isOverflowing || this.axis[e].forceVisible ? (t.style.visibility = "visible", this.contentWrapperEl.style[this.axis[e].overflowAttr] = "scroll", this.el.classList.add("".concat(this.classNames.scrollable, "-").concat(e))) : (t.style.visibility = "hidden", this.contentWrapperEl.style[this.axis[e].overflowAttr] = "hidden", this.el.classList.remove("".concat(this.classNames.scrollable, "-").concat(e))), this.axis[e].isOverflowing ? s.style.display = "block" : s.style.display = "none")
    }, o.prototype.showScrollbar = function (e) {
        e === void 0 && (e = "y"), this.axis[e].isOverflowing && !this.axis[e].scrollbar.isVisible && (Z(this.axis[e].scrollbar.el, this.classNames.visible), this.axis[e].scrollbar.isVisible = !0)
    }, o.prototype.hideScrollbar = function (e) {
        e === void 0 && (e = "y"), !this.isDragging && this.axis[e].isOverflowing && this.axis[e].scrollbar.isVisible && (ee(this.axis[e].scrollbar.el, this.classNames.visible), this.axis[e].scrollbar.isVisible = !1)
    }, o.prototype.hideNativeScrollbar = function () {
        this.offsetEl && (this.offsetEl.style[this.isRtl ? "left" : "right"] = this.axis.y.isOverflowing || this.axis.y.forceVisible ? "-".concat(this.scrollbarWidth, "px") : "0px", this.offsetEl.style.bottom = this.axis.x.isOverflowing || this.axis.x.forceVisible ? "-".concat(this.scrollbarWidth, "px") : "0px")
    }, o.prototype.onMouseMoveForAxis = function (e) {
        e === void 0 && (e = "y");
        var t = this.axis[e];
        !t.track.el || !t.scrollbar.el || (t.track.rect = t.track.el.getBoundingClientRect(), t.scrollbar.rect = t.scrollbar.el.getBoundingClientRect(), this.isWithinBounds(t.track.rect) ? (this.showScrollbar(e), Z(t.track.el, this.classNames.hover), this.isWithinBounds(t.scrollbar.rect) ? Z(t.scrollbar.el, this.classNames.hover) : ee(t.scrollbar.el, this.classNames.hover)) : (ee(t.track.el, this.classNames.hover), this.options.autoHide && this.hideScrollbar(e)))
    }, o.prototype.onMouseLeaveForAxis = function (e) {
        e === void 0 && (e = "y"), ee(this.axis[e].track.el, this.classNames.hover), ee(this.axis[e].scrollbar.el, this.classNames.hover), this.options.autoHide && this.hideScrollbar(e)
    }, o.prototype.onDragStart = function (e, t) {
        var s;
        t === void 0 && (t = "y"), this.isDragging = !0;
        var n = ht(this.el), i = K(this.el), r = this.axis[t].scrollbar, l = t === "y" ? e.pageY : e.pageX;
        this.axis[t].dragOffset = l - (((s = r.rect) === null || s === void 0 ? void 0 : s[this.axis[t].offsetAttr]) || 0), this.draggedAxis = t, Z(this.el, this.classNames.dragging), n.addEventListener("mousemove", this.drag, !0), n.addEventListener("mouseup", this.onEndDrag, !0), this.removePreventClickId === null ? (n.addEventListener("click", this.preventClick, !0), n.addEventListener("dblclick", this.preventClick, !0)) : (i.clearTimeout(this.removePreventClickId), this.removePreventClickId = null)
    }, o.prototype.onTrackClick = function (e, t) {
        var s = this, n, i, r, l;
        t === void 0 && (t = "y");
        var a = this.axis[t];
        if (!(!this.options.clickOnTrack || !a.scrollbar.el || !this.contentWrapperEl)) {
            e.preventDefault();
            var c = K(this.el);
            this.axis[t].scrollbar.rect = a.scrollbar.el.getBoundingClientRect();
            var h = this.axis[t].scrollbar,
                d = (i = (n = h.rect) === null || n === void 0 ? void 0 : n[this.axis[t].offsetAttr]) !== null && i !== void 0 ? i : 0,
                v = parseInt((l = (r = this.elStyles) === null || r === void 0 ? void 0 : r[this.axis[t].sizeAttr]) !== null && l !== void 0 ? l : "0px", 10),
                u = this.contentWrapperEl[this.axis[t].scrollOffsetAttr],
                x = t === "y" ? this.mouseY - d : this.mouseX - d, m = x < 0 ? -1 : 1, f = m === -1 ? u - v : u + v,
                y = 40, C = function () {
                    s.contentWrapperEl && (m === -1 ? u > f && (u -= y, s.contentWrapperEl[s.axis[t].scrollOffsetAttr] = u, c.requestAnimationFrame(C)) : u < f && (u += y, s.contentWrapperEl[s.axis[t].scrollOffsetAttr] = u, c.requestAnimationFrame(C)))
                };
            C()
        }
    }, o.prototype.getContentElement = function () {
        return this.contentEl
    }, o.prototype.getScrollElement = function () {
        return this.contentWrapperEl
    }, o.prototype.removeListeners = function () {
        var e = K(this.el);
        this.el.removeEventListener("mouseenter", this.onMouseEnter), this.el.removeEventListener("pointerdown", this.onPointerEvent, !0), this.el.removeEventListener("mousemove", this.onMouseMove), this.el.removeEventListener("mouseleave", this.onMouseLeave), this.contentWrapperEl && this.contentWrapperEl.removeEventListener("scroll", this.onScroll), e.removeEventListener("resize", this.onWindowResize), this.mutationObserver && this.mutationObserver.disconnect(), this.resizeObserver && this.resizeObserver.disconnect(), this.onMouseMove.cancel(), this.onWindowResize.cancel(), this.onStopScrolling.cancel(), this.onMouseEntered.cancel()
    }, o.prototype.unMount = function () {
        this.removeListeners()
    }, o.prototype.isWithinBounds = function (e) {
        return this.mouseX >= e.left && this.mouseX <= e.left + e.width && this.mouseY >= e.top && this.mouseY <= e.top + e.height
    }, o.prototype.findChild = function (e, t) {
        var s = e.matches || e.webkitMatchesSelector || e.mozMatchesSelector || e.msMatchesSelector;
        return Array.prototype.filter.call(e.children, function (n) {
            return s.call(n, t)
        })[0]
    }, o.rtlHelpers = null, o.defaultOptions = {
        forceVisible: !1,
        clickOnTrack: !0,
        scrollbarMinSize: 25,
        scrollbarMaxSize: 0,
        ariaLabel: "scrollable content",
        tabIndex: 0,
        classNames: {
            contentEl: "simplebar-content",
            contentWrapper: "simplebar-content-wrapper",
            offset: "simplebar-offset",
            mask: "simplebar-mask",
            wrapper: "simplebar-wrapper",
            placeholder: "simplebar-placeholder",
            scrollbar: "simplebar-scrollbar",
            track: "simplebar-track",
            heightAutoObserverWrapperEl: "simplebar-height-auto-observer-wrapper",
            heightAutoObserverEl: "simplebar-height-auto-observer",
            visible: "simplebar-visible",
            horizontal: "simplebar-horizontal",
            vertical: "simplebar-vertical",
            hover: "simplebar-hover",
            dragging: "simplebar-dragging",
            scrolling: "simplebar-scrolling",
            scrollable: "simplebar-scrollable",
            mouseEntered: "simplebar-mouse-entered"
        },
        scrollableNode: null,
        contentNode: null,
        autoHide: !0
    }, o.getOptions = xn, o.helpers = Sn, o
}(), ft = function (o, e) {
    return ft = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (t, s) {
        t.__proto__ = s
    } || function (t, s) {
        for (var n in s) Object.prototype.hasOwnProperty.call(s, n) && (t[n] = s[n])
    }, ft(o, e)
};

function Cn(o, e) {
    if (typeof e != "function" && e !== null) throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
    ft(o, e);

    function t() {
        this.constructor = o
    }

    o.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t)
}

var It = Ke.helpers, dt = It.getOptions, R = It.addClasses, En = It.canUseDOM, ys = function (o) {
    Cn(e, o);

    function e() {
        for (var t = [], s = 0; s < arguments.length; s++) t[s] = arguments[s];
        var n = o.apply(this, t) || this;
        return e.instances.set(t[0], n), n
    }

    return e.initDOMLoadedElements = function () {
        document.removeEventListener("DOMContentLoaded", this.initDOMLoadedElements), window.removeEventListener("load", this.initDOMLoadedElements), Array.prototype.forEach.call(document.querySelectorAll("[data-simplebar]"), function (t) {
            t.getAttribute("data-simplebar") !== "init" && !e.instances.has(t) && new e(t, dt(t.attributes))
        })
    }, e.removeObserver = function () {
        var t;
        (t = e.globalObserver) === null || t === void 0 || t.disconnect()
    }, e.prototype.initDOM = function () {
        var t = this, s, n, i;
        if (!Array.prototype.filter.call(this.el.children, function (a) {
            return a.classList.contains(t.classNames.wrapper)
        }).length) {
            for (this.wrapperEl = document.createElement("div"), this.contentWrapperEl = document.createElement("div"), this.offsetEl = document.createElement("div"), this.maskEl = document.createElement("div"), this.contentEl = document.createElement("div"), this.placeholderEl = document.createElement("div"), this.heightAutoObserverWrapperEl = document.createElement("div"), this.heightAutoObserverEl = document.createElement("div"), R(this.wrapperEl, this.classNames.wrapper), R(this.contentWrapperEl, this.classNames.contentWrapper), R(this.offsetEl, this.classNames.offset), R(this.maskEl, this.classNames.mask), R(this.contentEl, this.classNames.contentEl), R(this.placeholderEl, this.classNames.placeholder), R(this.heightAutoObserverWrapperEl, this.classNames.heightAutoObserverWrapperEl), R(this.heightAutoObserverEl, this.classNames.heightAutoObserverEl); this.el.firstChild;) this.contentEl.appendChild(this.el.firstChild);
            this.contentWrapperEl.appendChild(this.contentEl), this.offsetEl.appendChild(this.contentWrapperEl), this.maskEl.appendChild(this.offsetEl), this.heightAutoObserverWrapperEl.appendChild(this.heightAutoObserverEl), this.wrapperEl.appendChild(this.heightAutoObserverWrapperEl), this.wrapperEl.appendChild(this.maskEl), this.wrapperEl.appendChild(this.placeholderEl), this.el.appendChild(this.wrapperEl), (s = this.contentWrapperEl) === null || s === void 0 || s.setAttribute("tabindex", this.options.tabIndex.toString()), (n = this.contentWrapperEl) === null || n === void 0 || n.setAttribute("role", "region"), (i = this.contentWrapperEl) === null || i === void 0 || i.setAttribute("aria-label", this.options.ariaLabel)
        }
        if (!this.axis.x.track.el || !this.axis.y.track.el) {
            var r = document.createElement("div"), l = document.createElement("div");
            R(r, this.classNames.track), R(l, this.classNames.scrollbar), r.appendChild(l), this.axis.x.track.el = r.cloneNode(!0), R(this.axis.x.track.el, this.classNames.horizontal), this.axis.y.track.el = r.cloneNode(!0), R(this.axis.y.track.el, this.classNames.vertical), this.el.appendChild(this.axis.x.track.el), this.el.appendChild(this.axis.y.track.el)
        }
        Ke.prototype.initDOM.call(this), this.el.setAttribute("data-simplebar", "init")
    }, e.prototype.unMount = function () {
        Ke.prototype.unMount.call(this), e.instances.delete(this.el)
    }, e.initHtmlApi = function () {
        this.initDOMLoadedElements = this.initDOMLoadedElements.bind(this), typeof MutationObserver < "u" && (this.globalObserver = new MutationObserver(e.handleMutations), this.globalObserver.observe(document, {
            childList: !0,
            subtree: !0
        })), document.readyState === "complete" || document.readyState !== "loading" && !document.documentElement.doScroll ? window.setTimeout(this.initDOMLoadedElements) : (document.addEventListener("DOMContentLoaded", this.initDOMLoadedElements), window.addEventListener("load", this.initDOMLoadedElements))
    }, e.handleMutations = function (t) {
        t.forEach(function (s) {
            s.addedNodes.forEach(function (n) {
                n.nodeType === 1 && (n.hasAttribute("data-simplebar") ? !e.instances.has(n) && document.documentElement.contains(n) && new e(n, dt(n.attributes)) : n.querySelectorAll("[data-simplebar]").forEach(function (i) {
                    i.getAttribute("data-simplebar") !== "init" && !e.instances.has(i) && document.documentElement.contains(i) && new e(i, dt(i.attributes))
                }))
            }), s.removedNodes.forEach(function (n) {
                var i;
                n.nodeType === 1 && (n.getAttribute("data-simplebar") === "init" ? !document.documentElement.contains(n) && ((i = e.instances.get(n)) === null || i === void 0 || i.unMount()) : Array.prototype.forEach.call(n.querySelectorAll('[data-simplebar="init"]'), function (r) {
                    var l;
                    !document.documentElement.contains(r) && ((l = e.instances.get(r)) === null || l === void 0 || l.unMount())
                }))
            })
        })
    }, e.instances = new WeakMap, e
}(Ke);
En && ys.initHtmlApi();
window.SimpleBar = ys;
