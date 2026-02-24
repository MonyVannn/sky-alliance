"use client";

import { createContext, useContext, useState, useCallback } from "react";

interface SplineLoadingContextValue {
  splineLoaded: boolean;
  notifySplineLoaded: () => void;
}

const SplineLoadingContext = createContext<SplineLoadingContextValue>({
  splineLoaded: false,
  notifySplineLoaded: () => {},
});

export function SplineLoadingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [splineLoaded, setSplineLoaded] = useState(false);

  const notifySplineLoaded = useCallback(() => {
    setTimeout(() => setSplineLoaded(true), 150);
  }, []);

  return (
    <SplineLoadingContext.Provider value={{ splineLoaded, notifySplineLoaded }}>
      {children}
    </SplineLoadingContext.Provider>
  );
}

export function useSplineLoading() {
  return useContext(SplineLoadingContext);
}
