import { useEffect } from 'react';
import Lenis from 'lenis';

export const useSmoothScroll = (options = {}) => {
  useEffect(() => {
    if (import.meta.env.VITE_ENABLE_SMOOTH_SCROLL !== 'true') {
      return;
    }

    const lenis = new Lenis({
      duration: parseFloat(import.meta.env.VITE_ANIMATION_DURATION || 1.2),
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      ...options,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, [options]);
};

// Example usage:
/*
function App() {
  useSmoothScroll({
    // Optional custom options
    duration: 1.5,
    smoothWheel: false,
  });

  return <div>Your app content</div>;
}
*/ 