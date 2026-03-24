"use client";

import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from "react";

export type ScreenFitTextProps = {
  children: ReactNode;
  className?: string;
  textClassName?: string;
  style?: CSSProperties;
};

export function ScreenFitText({
  children,
  className,
  textClassName,
  style,
}: ScreenFitTextProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);

  useLayoutEffect(() => {
    let cancelled = false;

    const resizeText = () => {
      const container = containerRef.current;
      const text = textRef.current;

      if (!container || !text) {
        return;
      }

      // Border box width (subpixel) — offsetWidth is integer and can mis-fit vs paint
      const containerWidth = container.getBoundingClientRect().width;
      if (containerWidth < 4) {
        return;
      }

      // Breathing room for rounding, subpixel layout, and font rasterization
      const pad = 4;
      let available = Math.max(0, containerWidth - pad);

      // Width scales ~linearly with font-size; one probe then scale (O(1))
      const probePx = 100;
      text.style.fontSize = `${probePx}px`;
      let measured = text.getBoundingClientRect().width;
      if (measured <= 0) {
        return;
      }

      let fontSize = (available / measured) * probePx;
      text.style.fontSize = `${fontSize}px`;

      // Tighten if layout still reports overflow (browser rounding, kerning edge cases)
      for (let i = 0; i < 8; i++) {
        measured = text.getBoundingClientRect().width;
        if (measured <= available + 0.25) {
          break;
        }
        fontSize *= available / measured;
        text.style.fontSize = `${fontSize}px`;
      }
    };

    resizeText();

    if (typeof document !== "undefined" && document.fonts?.ready) {
      void document.fonts.ready.then(() => {
        if (!cancelled) resizeText();
      });
    }

    const container = containerRef.current;
    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            resizeText();
          })
        : null;

    if (container && observer) {
      observer.observe(container);
    }

    window.addEventListener("resize", resizeText);

    return () => {
      cancelled = true;
      observer?.disconnect();
      window.removeEventListener("resize", resizeText);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={[
        "flex min-w-0 w-full max-w-full justify-center overflow-hidden",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span
        ref={textRef}
        className={[
          "inline-block whitespace-nowrap text-center",
          textClassName,
        ]
          .filter(Boolean)
          .join(" ")}
        style={style}
      >
        {children}
      </span>
    </div>
  );
}
