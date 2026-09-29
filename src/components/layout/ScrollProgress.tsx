"use client";

import { useEffect, useRef } from "react";

const cap = "absolute left-1/2 size-[7px] -translate-x-1/2 rounded-full border border-gold bg-page";

/** Vertical page progress gauge fixed to the right edge on wide screens. */
export function ScrollProgress() {
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const thumb = thumbRef.current;
      if (!thumb) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      thumb.style.top = `calc(${(progress * 82).toFixed(2)}% + 1px)`;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-1/2 right-3.5 z-[25] hidden h-[38vh] w-2 -translate-y-1/2 rounded border border-frame bg-rail-bg nav:block"
    >
      <span className={`${cap} -top-[9px]`} />
      <div
        ref={thumbRef}
        className="absolute inset-x-px top-px h-[18%] rounded-[3px] bg-linear-to-b from-aqua to-aqua-deep shadow-aqua"
      />
      <span className={`${cap} -bottom-[9px]`} />
    </div>
  );
}
