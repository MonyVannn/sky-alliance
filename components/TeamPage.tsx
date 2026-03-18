"use client";

import dynamic from "next/dynamic";
import React, { Suspense, useEffect, useRef } from "react";

const Spline = dynamic(
  () => import("@splinetool/react-spline").then((mod) => mod.default),
  { ssr: false },
);

function SplineBackground() {
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
      <Spline
        scene="https://prod.spline.design/jjMMrwS3BGTZVcSx/scene.splinecode"
        className="w-full h-full"
      />
    </div>
  );
}

function TeamPage() {
  return (
    <section
      className="relative flex items-end overflow-hidden"
      style={{ backgroundColor: "#fefefe", minHeight: "62vh" }}
    >
      {/* Spline 3D background */}
      <div className="absolute inset-0 pointer-events-none">
        <Suspense fallback={null}>
          <SplineBackground />
        </Suspense>
      </div>
      )
    </section>
  );
}

export default TeamPage;
