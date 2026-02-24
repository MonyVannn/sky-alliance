import { gsap } from "gsap";

export function animateBlurredLights(container: HTMLElement) {
  const blobs = container.querySelectorAll(".blob");
  const easingFunctions = [
    "sine.inOut",
    "power1.inOut",
    "power2.inOut",
    "power3.inOut",
    "expo.inOut",
    "back.inOut",
  ];

  // Use will-change for better performance
  blobs.forEach((blob) => {
    (blob as HTMLElement).style.willChange = "transform, opacity";
  });

  blobs.forEach((blob, index) => {
    // Completely randomized parameters for each blob
    const baseDuration = 5 + Math.random() * 4; // 5-9 seconds (slow and steady)
    const delay = Math.random() * 2; // Random delay 0-2 seconds

    // Different movement patterns for each blob
    const xMovement = 30 + Math.random() * 50; // 30-80px horizontal movement
    const yMovement = 40 + Math.random() * 60; // 40-100px vertical movement

    // Randomize movement direction (some move more horizontally, others vertically)
    const horizontalBias = Math.random(); // 0-1, determines if blob moves more horizontally
    const xDirection = Math.random() > 0.3 ? 1 : -1; // Mostly positive (right side), but some variation
    const yDirection = Math.random() > 0.5 ? 1 : -1; // Random up/down

    // Different scale variations
    const scaleVariation = 0.1 + Math.random() * 0.2; // 0.1-0.3 scale change
    const baseScale = 0.9 + Math.random() * 0.2; // 0.9-1.1 base scale

    // Different opacity variations
    const opacityVariation = 0.2 + Math.random() * 0.3; // 0.2-0.5 opacity change
    const baseOpacity = 0.4 + Math.random() * 0.3; // 0.4-0.7 base opacity

    // Random easing function for each blob
    const ease =
      easingFunctions[Math.floor(Math.random() * easingFunctions.length)];

    // Create primary floating animation with randomized parameters
    gsap.to(blob, {
      x: `+=${xDirection * xMovement * (horizontalBias > 0.5 ? 10 : 8.6)}`,
      y: `+=${yDirection * yMovement * (horizontalBias > 0.5 ? 8.6 : 10)}`,
      scale: baseScale + scaleVariation,
      opacity: baseOpacity + opacityVariation,
      duration: baseDuration,
      delay: delay,
      ease: ease,
      repeat: -1,
      yoyo: true,
    });

    // Secondary subtle movement with different timing for more chaos
    const secondaryDuration = baseDuration * (0.7 + Math.random() * 0.6); // 70%-130% of base duration
    gsap.to(blob, {
      x: `+=${xDirection * xMovement * 1.3 * (Math.random() - 0.5)}`,
      y: `+=${yDirection * yMovement * 1.4 * (Math.random() - 0.5)}`,
      duration: secondaryDuration,
      delay: delay + Math.random() * 1,
      ease: easingFunctions[Math.floor(Math.random() * easingFunctions.length)],
      repeat: -1,
      yoyo: true,
    });

    // Rotation with completely different timing and direction
    const rotationDirection = Math.random() > 0.5 ? 1 : -1;
    const rotationSpeed = 0.5 + Math.random() * 1.5; // 0.5-2x speed variation
    gsap.to(blob, {
      rotation: 360 * rotationDirection,
      duration: baseDuration * rotationSpeed * (2 + Math.random()),
      delay: delay,
      ease: "none",
      repeat: -1,
    });

    // Subtle pulsing effect with different timing
    const pulseDuration = baseDuration * (0.5 + Math.random() * 0.8);
    gsap.to(blob, {
      scale: `+=${scaleVariation * 0.5}`,
      opacity: `+=${opacityVariation * 0.3}`,
      duration: pulseDuration,
      delay: delay + Math.random() * 2,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
  });
}

// Cleanup function for performance
export function cleanupAnimations(container: HTMLElement) {
  const clouds = container.querySelectorAll(".cloud");
  clouds.forEach((cloud) => {
    gsap.killTweensOf(cloud);
    (cloud as HTMLElement).style.willChange = "auto";
  });

  // Clear collision detection interval
  if ((container as any).__collisionInterval) {
    clearInterval((container as any).__collisionInterval);
  }
}
