"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const REVEAL_OFFSET = 46;

function hide(el: HTMLElement, delay: number, duration = "0.9s", offset = REVEAL_OFFSET) {
  el.style.opacity = "0";
  el.style.transform = `translate3d(0,${offset}px,0)`;
  el.style.transition = `opacity ${duration} ease ${delay}ms, transform 1s cubic-bezier(.2,.7,.2,1) ${delay}ms`;
}

function show(el: HTMLElement) {
  el.style.opacity = "1";
  el.style.transform = "none";
}

/**
 * Scroll effects for the whole page: sections fade up as they enter, the hero staggers in on load,
 * and elements marked data-parallax drift at their own speed. Runs again on each route change.
 */
export function ScrollFx() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const parallax = [...document.querySelectorAll<HTMLElement>("[data-parallax]")];
    const cleanups: (() => void)[] = [];

    if (!reduce) {
      const targets = new Set<HTMLElement>();
      document
        .querySelectorAll<HTMLElement>("main section:not([data-hero]) > *")
        .forEach((el, i) => {
          el.dataset.rd = String((i % 3) * 90);
          targets.add(el);
        });
      document.querySelectorAll<HTMLElement>("[data-stagger] > *").forEach((el) => {
        const index = [...(el.parentElement?.children ?? [])].indexOf(el);
        el.dataset.rd = String(Math.min(index, 6) * 80);
        targets.add(el);
      });

      const fold = window.innerHeight * 0.9;
      targets.forEach((el) => {
        if (el.getBoundingClientRect().top < fold) targets.delete(el);
      });

      targets.forEach((el) => hide(el, Number(el.dataset.rd)));
      const observer = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            show(entry.target as HTMLElement);
            observer.unobserve(entry.target);
          }),
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
      );
      targets.forEach((el) => observer.observe(el));

      const revealAll = () => targets.forEach(show);
      window.addEventListener("beforeprint", revealAll);
      cleanups.push(() => {
        observer.disconnect();
        window.removeEventListener("beforeprint", revealAll);
        targets.forEach(show);
      });

      const hero = document.querySelector("[data-hero]");
      if (hero) {
        [...hero.children].forEach((child, i) => {
          const el = child as HTMLElement;
          const delay = 150 + i * 250;
          hide(el, delay, "1.2s", 30);
          void el.offsetWidth;
          setTimeout(() => show(el), 30);
        });
      }
    }

    let ticking = false;
    const update = () => {
      ticking = false;
      if (reduce) return;
      const vh = window.innerHeight;
      parallax.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -400 || rect.top > vh + 400) return;
        const offset =
          (rect.top + rect.height / 2 - vh / 2) * parseFloat(el.dataset.parallax ?? "0");
        el.style.transform = `translate3d(0,${offset.toFixed(1)}px,0) ${el.dataset.pbase ?? ""}`;
      });
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    cleanups.push(() => window.removeEventListener("scroll", onScroll));

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
