const SCROLL_POSITIONS = new Map();

export const scrollManager = {
  savePosition: (key) => {
    SCROLL_POSITIONS.set(key, {
      x: window.scrollX,
      y: window.scrollY,
      timestamp: Date.now()
    });
  },

  restorePosition: (key, smooth = true) => {
    const position = SCROLL_POSITIONS.get(key);
    if (!position) return;

    window.scrollTo({
      left: position.x,
      top: position.y,
      behavior: smooth ? 'smooth' : 'auto'
    });
  },

  // Scroll to top of the page
  scrollToTop: (smooth = true) => {
    window.scrollTo({
      top: 0,
      behavior: smooth ? 'smooth' : 'auto'
    });
  },

  // Scroll to a specific element
  scrollToElement: (element, offset = 0, smooth = true) => {
    if (!element) return;

    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: smooth ? 'smooth' : 'auto'
    });
  },

  // Clear saved positions older than 30 minutes
  cleanup: () => {
    const thirtyMinutes = 30 * 60 * 1000;
    const now = Date.now();

    for (const [key, value] of SCROLL_POSITIONS.entries()) {
      if (now - value.timestamp > thirtyMinutes) {
        SCROLL_POSITIONS.delete(key);
      }
    }
  }
};

setInterval(scrollManager.cleanup, 30 * 60 * 1000);