"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  /** Display text such as "20+" or "7 / 7". Every whole number in it counts up from zero. */
  value: string;
  className?: string;
  duration?: number;
};

const NUMBER = /\d+/g;

function render(value: string, progress: number) {
  return value.replace(NUMBER, (digits) => String(Math.round(Number(digits) * progress)));
}

/** Counts the numbers in `value` up once it scrolls into view. Server markup shows the final value. */
export function CountUp({ value, className, duration = 1800 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [text, setText] = useState(value);

  useEffect(() => {
    const node = ref.current;
    if (!node || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    setText(render(value, 0));

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          setText(render(value, 1 - (1 - t) ** 3));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className} aria-label={value}>
      <span aria-hidden="true">{text}</span>
    </span>
  );
}
