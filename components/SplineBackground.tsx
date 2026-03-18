"use client";

import { useRef, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";

const Spline = dynamic(
  () => import("@splinetool/react-spline").then((mod) => mod.default),
  { ssr: false },
);

interface SplineBackgroundProps {
  scene: string;
}

function SplineBackgroundRender({ scene }: SplineBackgroundProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkCanvas = setInterval(() => {
      if (wrapperRef.current) {
        const canvas = wrapperRef.current.querySelector("canvas");
        if (canvas) {
          canvas.style.background = "transparent";
          clearInterval(checkCanvas);
        }
      }
    }, 100);
    return () => clearInterval(checkCanvas);
  }, []);

  return (
    <div ref={wrapperRef} className="w-full h-full">
      <Spline scene={scene} className="w-full h-full" />
    </div>
  );
}

export default function SplineBackground({ scene }: SplineBackgroundProps) {
  return (
    <Suspense fallback={null}>
      <SplineBackgroundRender scene={scene} />
    </Suspense>
  );
}
