import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./styles/ZebraScrollCard.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface ZebraScrollCardProps {
  containerAnim?: gsap.core.Tween | gsap.core.Timeline | gsap.core.Animation;
}

const ZebraScrollCard = ({ containerAnim }: ZebraScrollCardProps) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useGSAP(
    () => {
      if (!containerAnim || isReducedMotion) return;

      const card = cardRef.current;
      const viewport = viewportRef.current;
      const img = imgRef.current;
      if (!card || !viewport || !img) return;

      const getInitialLeft = (): number => {
        if (!card) return 0;
        const currentX = (gsap.getProperty(".work-flex", "x") as number) || 0;
        return Math.round(card.getBoundingClientRect().left - currentX);
      };

      const anim = gsap.fromTo(
        img,
        { y: 0 },
        {
          y: () => {
            if (!img || !viewport) return 0;
            const travel = img.offsetHeight - viewport.offsetHeight;
            return -Math.max(0, travel);
          },
          ease: "none",
          scrollTrigger: {
            trigger: card,
            containerAnimation: containerAnim,
            start: () => `left ${getInitialLeft()}px`,
            end: "right left",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        }
      );

      const handleImgLoad = () => {
        ScrollTrigger.refresh();
      };

      if (!img.complete) {
        img.addEventListener("load", handleImgLoad, { once: true });
      }

      return () => {
        anim.kill();
        img.removeEventListener("load", handleImgLoad);
      };
    },
    { scope: cardRef, dependencies: [containerAnim, isReducedMotion] }
  );

  return (
    <div ref={cardRef} className="zebra-scroll-card">
      <div className="zebra-card-mockup">
        {/* Compact Chrome bar */}
        <div className="zebra-card-chrome">
          <div className="zebra-card-dots">
            <span className="zebra-card-dot" />
            <span className="zebra-card-dot" />
            <span className="zebra-card-dot" />
          </div>
          <div className="zebra-card-url-pill">
            <span className="zebra-card-url-text">zebra.com / defense-solutions</span>
          </div>
          <div className="zebra-card-spacer" />
        </div>

        {/* Masked Viewport */}
        <div ref={viewportRef} className="zebra-card-viewport">
          <img
            ref={imgRef}
            src="/images/zebra-page.webp"
            alt="Zebra Defense Solutions Landing Page"
            className="zebra-card-img"
          />
        </div>
      </div>
    </div>
  );
};

export default ZebraScrollCard;
