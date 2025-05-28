import { useState, useCallback, useEffect } from 'react';

export const useModal = (options = {}) => {
  const {
    onOpen,
    onClose,
    preventScroll = true,
    closeOnEscape = true,
    closeOnRouteChange = true,
  } = options;

  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
    onOpen?.();
  }, [onOpen]);

  const close = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

  const toggle = useCallback(() => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  }, [isOpen, open, close]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        close();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, close, closeOnEscape]);

  // Handle scroll lock
  useEffect(() => {
    if (!preventScroll) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, preventScroll]);

  // Handle route change
  useEffect(() => {
    if (closeOnRouteChange && isOpen) {
      close();
    }
  }, [closeOnRouteChange, isOpen, close]);

  return {
    isOpen,
    open,
    close,
    toggle
  };
};

// Example usage:
/*
const MyComponent = () => {
  const { isOpen, toggle, close } = useModal({
    onOpen: () => console.log('Modal opened'),
    onClose: () => console.log('Modal closed'),
    preventScroll: true,
    closeOnEscape: true,
    closeOnRouteChange: true,
  });

  return (
    <>
      <button onClick={toggle}>Toggle Modal</button>
      {isOpen && (
        <div className="modal">
          <button onClick={close}>Close</button>
          Modal content
        </div>
      )}
    </>
  );
};
*/ 