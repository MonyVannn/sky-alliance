import { gsap } from "gsap";

export function animateBlurredLights(container: HTMLElement) {
  const blobs = container.querySelectorAll(".blob");

  blobs.forEach((blob) => {
    (blob as HTMLElement).style.willChange = "transform";

    const duration = 6 + Math.random() * 4;
    const delay = Math.random() * 2;
    const xMove = (30 + Math.random() * 50) * (Math.random() > 0.5 ? 1 : -1);
    const yMove = (40 + Math.random() * 60) * (Math.random() > 0.5 ? 1 : -1);

    gsap.to(blob, {
      x: `+=${xMove}`,
      y: `+=${yMove}`,
      duration,
      delay,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
  });
}

export function cleanupAnimations(container: HTMLElement) {
  const blobs = container.querySelectorAll(".blob");
  blobs.forEach((blob) => {
    gsap.killTweensOf(blob);
    (blob as HTMLElement).style.willChange = "auto";
  });
}
