'use client';

import React, { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from 'framer-motion';

/* ═══════════════════════════════════════════════
   SCROLL PROGRESS BAR
   ═══════════════════════════════════════════════ */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[var(--accent)] via-amber-400 to-[var(--accent-light)] origin-left z-[100] shadow-[0_0_8px_rgba(184,134,11,0.5)]"
      style={{ scaleX }}
    />
  );
}

/* ═══════════════════════════════════════════════
   MOTION REVEAL (Spring-based scroll reveal)
   ═══════════════════════════════════════════════ */
interface MotionRevealProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
}

export function MotionReveal({
  children,
  className = '',
  variant = 'up',
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  once = true,
}: MotionRevealProps) {
  const variants = {
    hidden: {
      opacity: 0,
      y: variant === 'up' ? 30 : variant === 'down' ? -30 : 0,
      x: variant === 'left' ? -30 : variant === 'right' ? 30 : 0,
      scale: variant === 'scale' ? 0.92 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   STAGGER MOTION CONTAINER
   ═══════════════════════════════════════════════ */
interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  delay?: number;
}

export function MotionStaggerContainer({
  children,
  className = '',
  staggerDelay = 0.1,
  delay = 0,
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function MotionStaggerItem({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   3D TILT CARD (Cursor tracking with glare)
   ═══════════════════════════════════════════════ */
interface Tilt3DCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
  scaleHover?: number;
  onClick?: () => void;
}

export function Tilt3DCard({
  children,
  className = '',
  maxTilt = 8,
  glare = true,
  scaleHover = 1.02,
  onClick,
}: Tilt3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 260, damping: 25 });
  const mouseY = useSpring(y, { stiffness: 260, damping: 25 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-maxTilt, maxTilt]);

  const [isHovered, setIsHovered] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    const normalizedX = currentX / width - 0.5;
    const normalizedY = currentY / height - 0.5;

    x.set(normalizedX);
    y.set(normalizedY);

    setGlarePos({
      x: (currentX / width) * 100,
      y: (currentY / height) * 100,
    });
  }

  function handleMouseLeave() {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  }

  return (
    <div
      style={{ perspective: 1000 }}
      className="transform-gpu inline-block w-full"
      onClick={onClick}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: scaleHover }}
        transition={{ duration: 0.2 }}
        className={`relative overflow-hidden ${className}`}
      >
        {children}

        {/* Dynamic Specular Glare Overlay */}
        {glare && isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 300px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.4) 0%, transparent 80%)`,
            }}
          />
        )}
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAGNETIC BUTTON
   ═══════════════════════════════════════════════ */
interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  pullFactor?: number;
  onClick?: (e: React.MouseEvent) => void;
}

export function Magnetic({
  children,
  className = '',
  pullFactor = 0.35,
  onClick,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 220, damping: 18 });
  const springY = useSpring(y, { stiffness: 220, damping: 18 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = (e.clientX - centerX) * pullFactor;
    const deltaY = (e.clientY - centerY) * pullFactor;

    x.set(deltaX);
    y.set(deltaY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   CONTINUOUS FLOATING ELEMENT
   ═══════════════════════════════════════════════ */
export function FloatingElement({
  children,
  className = '',
  duration = 4,
  yOffset = 10,
}: {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  yOffset?: number;
}) {
  return (
    <motion.div
      animate={{
        y: [-yOffset / 2, yOffset / 2, -yOffset / 2],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export { motion, AnimatePresence };
