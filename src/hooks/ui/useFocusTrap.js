import { useEffect, useRef } from 'react';

export const useFocusTrap = (isActive = true) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;

    const container = containerRef.current;
    if (!container) return;

    // Get all focusable elements
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Save the element that was focused before the modal opened
    const previousActiveElement = document.activeElement;

    // Focus the first element when the trap is activated
    firstElement?.focus();

    const handleKeyDown = (e) => {
      if (e.key !== 'Tab') return;

      // If shift + tab
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      }
      // If just tab
      else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
      // Restore focus when the trap is deactivated
      previousActiveElement?.focus();
    };
  }, [isActive]);

  return containerRef;
}; 