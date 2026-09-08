import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface ScrollSmootherConfig {
  wrapper?: string | HTMLElement;
  content?: string | HTMLElement;
  smooth?: number;
  speed?: number;
  effects?: boolean;
  autoResize?: boolean;
  ignoreMobileResize?: boolean;
}

export class ScrollSmoother {
  private _paused = false;
  config: ScrollSmootherConfig;

  static register() {
    // GSAP plugin registration compatible stub
  }

  static refresh(_safe?: boolean) {
    ScrollTrigger.refresh();
  }

  static create(config: ScrollSmootherConfig = {}) {
    const instance = new ScrollSmoother(config);
    (window as any).smoother = instance;
    return instance;
  }

  static get() {
    return (window as any).smoother || null;
  }

  constructor(config: ScrollSmootherConfig = {}) {
    this.config = config;
  }

  scrollTop(value?: number): number {
    if (typeof value === "number") {
      window.scrollTo({ top: value, behavior: "instant" as ScrollBehavior });
      return value;
    }
    return window.scrollY || document.documentElement.scrollTop;
  }

  scrollTo(
    target: string | Element | number | null | undefined,
    smooth: boolean = true,
    _position: string = "top top"
  ) {
    if (!target) return;
    let targetY = 0;
    if (typeof target === "number") {
      targetY = target;
    } else if (typeof target === "string") {
      const el = document.querySelector(target);
      if (el) {
        const rect = el.getBoundingClientRect();
        targetY = rect.top + window.scrollY;
      }
    } else if (target instanceof Element) {
      const rect = target.getBoundingClientRect();
      targetY = rect.top + window.scrollY;
    }

    if (smooth) {
      window.scrollTo({
        top: targetY,
        behavior: "smooth",
      });
    } else {
      window.scrollTo({
        top: targetY,
        behavior: "auto",
      });
    }
  }

  paused(pause?: boolean): boolean {
    if (typeof pause === "boolean") {
      this._paused = pause;
      if (pause) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
      return pause;
    }
    return this._paused;
  }

  refresh() {
    ScrollTrigger.refresh();
  }

  kill() {
    this.paused(false);
  }
}

export default ScrollSmoother;
