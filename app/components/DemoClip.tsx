"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

interface DemoClipProps {
  src: string;
  poster: string;
  label: string;
  className?: string;
}

export default function DemoClip({ src, poster, label, className = "" }: DemoClipProps) {
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotionSnapshot, getReducedMotionServerSnapshot);

  if (reducedMotion) {
    return <Image src={poster} alt={label} fill sizes="(min-width: 1024px) 52vw, 92vw" className={`${className} object-contain`} />;
  }

  return (
    <video
      src={src}
      poster={poster}
      aria-label={label}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      className={`${className} object-contain`}
    />
  );
}
