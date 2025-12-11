import React, { useEffect, useRef, useState } from 'react';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRefPos = useRef({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // 1. Feature Detection: Disable on touch devices
    if (typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      
      // Show cursor when moving
      setIsVisible(true);

      // Reset fade-out timer
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 100); // Start fading out after 100ms of inactivity
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check for clickable elements
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    // Animation Loop
    let animationFrameId: number;

    const animate = () => {
      if (!cursorRef.current) return;

      // Linear Interpolation (Lerp) for smooth following
      // The lower the factor (0.15), the more "lag" / smoothness
      const lerpFactor = 0.15;
      
      cursorRefPos.current.x += (mouseRef.current.x - cursorRefPos.current.x) * lerpFactor;
      cursorRefPos.current.y += (mouseRef.current.y - cursorRefPos.current.y) * lerpFactor;

      cursorRef.current.style.transform = `translate3d(${cursorRefPos.current.x}px, ${cursorRefPos.current.y}px, 0) translate(-50%, -50%)`;

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      if (timerRef.current) clearTimeout(timerRef.current);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Don't render on touch devices (initial render check)
  if (typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-[9999] rounded-full transition-all duration-300 ease-out will-change-transform
        ${isVisible ? 'opacity-100' : 'opacity-0'}
        ${isHovering ? 'w-5 h-5 bg-purple-400/80 shadow-[0_0_20px_rgba(192,132,252,0.9)]' : 'w-3 h-3 bg-purple-400/60 shadow-[0_0_10px_rgba(192,132,252,0.6)]'}
      `}
      style={{
        left: 0,
        top: 0,
      }}
    />
  );
};

export default CustomCursor;