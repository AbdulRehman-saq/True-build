'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  variant?: 'up' | 'left' | 'right' | 'scale';
  delay?: number;
  threshold?: number;
}

export function ScrollReveal({
  children,
  className = '',
  variant = 'up',
  delay = 0,
  threshold = 0.15,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add('visible');
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);

  const variantClass = {
    up: 'reveal',
    left: 'reveal-left',
    right: 'reveal-right',
    scale: 'reveal-scale',
  }[variant];

  return (
    <div ref={ref} className={`${variantClass} ${className}`}>
      {children}
    </div>
  );
}

/* Stagger container — automatically reveals children with delay */
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
}

export function StaggerContainer({ children, className = '' }: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const items = el.querySelectorAll('.reveal');
          items.forEach((item) => item.classList.add('visible'));
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`stagger-children ${className}`}>
      {children}
    </div>
  );
}

/* Animated counter for stats */
interface AnimatedCounterProps {
  target: string;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({ target, suffix = '', className = '' }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          // Extract numeric part
          const numericMatch = target.match(/[\d.]+/);
          if (!numericMatch) {
            el.textContent = target + suffix;
            return;
          }

          const endValue = parseFloat(numericMatch[0]);
          const prefix = target.slice(0, target.indexOf(numericMatch[0]));
          const postfix = target.slice(target.indexOf(numericMatch[0]) + numericMatch[0].length);
          const isDecimal = numericMatch[0].includes('.');
          const duration = 1800;
          const startTime = performance.now();

          function animate(currentTime: number) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out quart
            const eased = 1 - Math.pow(1 - progress, 4);
            const current = eased * endValue;

            if (el) {
              el.textContent = prefix + (isDecimal ? current.toFixed(0) : Math.floor(current).toString()) + postfix + suffix;
            }

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else if (el) {
              el.textContent = target + suffix;
            }
          }

          requestAnimationFrame(animate);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, suffix]);

  return <span ref={ref} className={className}>0</span>;
}
