import { useEffect, useRef } from 'react';

/**
 * Custom hook for fast-triggering scroll reveal animations.
 * Threshold: 0.05, rootMargin: '0px 0px -40px'
 * Adds 'reveal-visible' class promptly on entry.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      element.classList.add('reveal-visible');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -40px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return elementRef;
}
